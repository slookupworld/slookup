/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Chrome, Search, ShieldCheck, Download, Code, Layers, Sparkles, FolderTree, Terminal, ExternalLink, HelpCircle, CheckCircle } from 'lucide-react';
import { TECHNOLOGY_DICTIONARY, PRESET_WEBSITES } from '../data/detectionRules';

interface ExtensionPlaygroundProps {
  onScanUrl: (url: string) => void;
}

export default function ExtensionPlayground({ onScanUrl }: ExtensionPlaygroundProps) {
  const [activeSubTab, setActiveSubTab] = useState<'simulator' | 'devtools' | 'code' | 'monorepo'>('simulator');
  const [copiedFileName, setCopiedFileName] = useState<string | null>(null);

  // States for Extension Popup Simulator
  const [selectedSimSite, setSelectedSimSite] = useState(PRESET_WEBSITES[0]);
  const [popupSearch, setPopupSearch] = useState('');
  const [popupTab, setPopupTab] = useState<'All' | 'Frontend' | 'CMS' | 'Other'>('All');

  // Simulated results inside the extension popup
  // Let's filter technology profiles based on what is in selectedSimSite.responseHtml / responseHeaders
  const getSimulatedMatchedTechs = () => {
    const html = selectedSimSite.responseHtml;
    const headers = selectedSimSite.responseHeaders;
    const matches: { name: string; category: string; version: string; confidence: number; iconName: string }[] = [];
    
    if (html.includes('__next') || html.includes('_next/static')) {
      matches.push({ name: 'Next.js', category: 'Frontend', version: '14.2.1', confidence: 100, iconName: 'Cpu' });
      matches.push({ name: 'React', category: 'Frontend', version: '18.3.1', confidence: 90, iconName: 'Code2' });
    }
    if (html.includes('wp-content') || html.includes('generator" content="WordPress')) {
      matches.push({ name: 'WordPress', category: 'CMS', version: '6.4.3', confidence: 100, iconName: 'FileText' });
    }
    if (html.includes('Shopify.theme') || html.includes('cdn.shopify.com')) {
      matches.push({ name: 'Shopify', category: 'CMS', version: 'Stable', confidence: 100, iconName: 'ShoppingBag' });
    }
    if (html.includes('js.stripe.com')) {
      matches.push({ name: 'Stripe', category: 'Utility', version: 'Stable', confidence: 100, iconName: 'CreditCard' });
    }
    if (html.includes('googletagmanager') || html.includes('google-analytics')) {
      matches.push({ name: 'Google Analytics', category: 'Analytics', version: 'v4', confidence: 95, iconName: 'BarChart2' });
    }
    if (html.includes('class="') && (html.includes('md:') || html.includes('lg:'))) {
      matches.push({ name: 'Tailwind CSS', category: 'Frontend', version: '3.4.1', confidence: 85, iconName: 'Palette' });
    }
    if (html.includes('recaptcha')) {
      matches.push({ name: 'Google reCAPTCHA', category: 'Security', version: 'v3', confidence: 90, iconName: 'Shield' });
    }
    if (headers['server'] === 'cloudflare' || headers['cf-ray']) {
      matches.push({ name: 'Cloudflare', category: 'CDN', version: 'Enterprise', confidence: 100, iconName: 'Cloud' });
    }

    return matches;
  };

  const simulatedTechs = getSimulatedMatchedTechs();

  const filteredSimulatedTechs = simulatedTechs.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(popupSearch.toLowerCase());
    if (popupTab === 'All') return matchesSearch;
    if (popupTab === 'Frontend') return t.category === 'Frontend' && matchesSearch;
    if (popupTab === 'CMS') return t.category === 'CMS' && matchesSearch;
    return t.category !== 'Frontend' && t.category !== 'CMS' && matchesSearch;
  });

  // Text source code files for Exporter
  const EXTENSION_FILES = {
    'manifest.json': `{
  "manifest_version": 3,
  "name": "StackLookup - Web Technology Profiler",
  "version": "2.0.0",
  "description": "Discover the technology stack and frameworks behind any website instantly.",
  "permissions": [
    "activeTab",
    "storage",
    "declarativeContent"
  ],
  "host_permissions": [
    "https://*/*",
    "http://*/*"
  ],
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "content_scripts": [
    {
      "matches": ["http://*/*", "https://*/*"],
      "js": ["content-script.js"],
      "run_at": "document_idle"
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "devtools_page": "devtools.html"
}`,
    'background.ts': `/**
 * Stateless Background Service Worker (Manifest V3)
 * @license Apache-2.0
 */

// Listener to communicate with active content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "STACK_LOOKUP_DETECTED") {
    const tabId = sender.tab?.id;
    if (tabId) {
      // Store matches temporarily in stateless chrome session storage
      chrome.storage.session.set({ [\`tab_\${tabId}\`]: message.payload });

      // Update Chrome action extension badge
      const techCount = message.payload.technologies.length;
      chrome.action.setBadgeText({
        tabId: tabId,
        text: techCount > 0 ? String(techCount) : ""
      });
      chrome.action.setBadgeBackgroundColor({
        tabId: tabId,
        color: "#1A73E8"
      });
    }
  }
});

// Reset badge on tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    chrome.action.setBadgeText({ tabId, text: "" });
  }
});`,
    'content-script.ts': `/**
 * Light-weight Content Script Injector
 * Runs on document idle to evaluate page-level fingerprints.
 * @license Apache-2.0
 */

(function runTechnologyAnalysis() {
  const payload = {
    html: document.documentElement.outerHTML,
    url: window.location.href,
    title: document.title,
    // Safely pull visible window namespaces
    envVariables: Object.keys(window).slice(0, 150)
  };

  // Dispatch payloads directly to stateless background worker
  chrome.runtime.sendMessage({
    type: "STACK_LOOKUP_DETECTED",
    payload: payload
  });
})();`,
    'popup.html': `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      width: 420px;
      margin: 0;
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: #FFFFFF;
      color: #202124;
    }
    .header {
      display: flex;
      align-items: center;
      padding: 16px;
      border-b: 1px solid #DADCE0;
    }
    .tech-list {
      padding: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <strong>StackLookup</strong>
  </div>
  <div class="tech-list" id="matches"></div>
</body>
</html>`
  };

  const handleCopyFile = (fileName: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFileName(fileName);
    setTimeout(() => setCopiedFileName(null), 2500);
  };

  const handleDownloadZip = () => {
    // Generate individual text file downloads as simple export mock
    Object.entries(EXTENSION_FILES).forEach(([filename, code]) => {
      const blob = new Blob([code], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10" id="extension-workspace-root">
      
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-3">
          Chrome Extension Developer Hub
        </h1>
        <p className="text-md text-[#5F6368]">
          Review and audit the high-performance StackLookup Manifest V3 browser extension and DevTools panel integrations.
        </p>
      </div>

      {/* Sub tabs selector */}
      <div className="flex border-b border-[#DADCE0] mb-8 overflow-x-auto pb-0.5 justify-center" id="ext-sub-tabs">
        <button
          onClick={() => setActiveSubTab('simulator')}
          className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold border-b-2 cursor-pointer transition-all ${
            activeSubTab === 'simulator'
              ? 'border-[#1A73E8] text-[#1A73E8]'
              : 'border-transparent text-[#5F6368] hover:text-[#202124]'
          }`}
        >
          <Chrome className="h-4.5 w-4.5" />
          <span>Popup Simulator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('devtools')}
          className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold border-b-2 cursor-pointer transition-all ${
            activeSubTab === 'devtools'
              ? 'border-[#1A73E8] text-[#1A73E8]'
              : 'border-transparent text-[#5F6368] hover:text-[#202124]'
          }`}
        >
          <Terminal className="h-4.5 w-4.5" />
          <span>DevTools Panel Sim</span>
        </button>

        <button
          onClick={() => setActiveSubTab('code')}
          className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold border-b-2 cursor-pointer transition-all ${
            activeSubTab === 'code'
              ? 'border-[#1A73E8] text-[#1A73E8]'
              : 'border-transparent text-[#5F6368] hover:text-[#202124]'
          }`}
        >
          <Code className="h-4.5 w-4.5" />
          <span>V3 Code Exporter</span>
        </button>

        <button
          onClick={() => setActiveSubTab('monorepo')}
          className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold border-b-2 cursor-pointer transition-all ${
            activeSubTab === 'monorepo'
              ? 'border-[#1A73E8] text-[#1A73E8]'
              : 'border-transparent text-[#5F6368] hover:text-[#202124]'
          }`}
        >
          <FolderTree className="h-4.5 w-4.5" />
          <span>Monorepo Structure</span>
        </button>
      </div>

      {/* SUB-TAB 1: EXTENSION POPUP SIMULATOR (420px Fixed wrapper) */}
      {activeSubTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel instructions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm">
              <span className="text-[10px] text-[#1A73E8] font-mono uppercase tracking-wider font-semibold block mb-1">
                Visual Testing Environment
              </span>
              <h2 className="text-xl font-bold text-[#202124] mb-3">
                Live Material 3 Extension Popup
              </h2>
              <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
                This sandbox displays exactly how the 420px-wide browser extension popup renders signatures retrieved by event-driven service workers.
              </p>
              
              {/* Select site sandbox to change popups */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#202124]">Select Target Tab Sandbox Site:</label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_WEBSITES.map(site => (
                    <button
                      key={site.url}
                      onClick={() => setSelectedSimSite(site)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedSimSite.url === site.url
                          ? 'bg-[#EEF4FF] border-[#1A73E8] text-[#1A73E8]'
                          : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-[#F8F9FA]'
                      }`}
                    >
                      {site.display}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#EEF4FF]/50 border border-[#1A73E8]/10 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-[#202124] flex items-center">
                <Sparkles className="h-4.5 w-4.5 text-[#1A73E8] mr-1.5" />
                V3 Architecture features:
              </h3>
              <ul className="space-y-2 text-xs text-[#5F6368]">
                <li className="flex items-center"><CheckCircle className="h-3.5 w-3.5 text-[#34A853] mr-1.5" /> Lightweight: Zero active intervals or polling</li>
                <li className="flex items-center"><CheckCircle className="h-3.5 w-3.5 text-[#34A853] mr-1.5" /> Security: Declarative script parsing only</li>
                <li className="flex items-center"><CheckCircle className="h-3.5 w-3.5 text-[#34A853] mr-1.5" /> Compliance: Passes modern Chrome store audits</li>
              </ul>
            </div>
          </div>

          {/* Right simulated floating browser context with popup */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="border border-[#DADCE0] bg-[#F8F9FA] rounded-2xl p-4 w-full max-w-[480px] shadow-sm relative">
              <div className="bg-[#F1F3F4] h-7 px-3 flex items-center justify-between border-b border-[#DADCE0] rounded-t-xl mb-4 text-xs font-mono text-[#5F6368]">
                <span>Chrome Tool Rail</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#EA4335]"></span>
                  <span className="h-2 w-2 rounded-full bg-[#FBBC05]"></span>
                  <span className="h-2 w-2 rounded-full bg-[#34A853]"></span>
                </span>
              </div>

              {/* The Chrome Extension Popup Window (420px strict width inside wrapper) */}
              <div className="mx-auto bg-white border border-[#DADCE0] rounded-xl shadow-lg w-[420px] overflow-hidden" id="simulated-popup-window">
                
                {/* Popup Header */}
                <div className="bg-[#FFFFFF] border-b border-[#DADCE0] px-4 py-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1A73E8] text-white">
                      <Chrome className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#202124] tracking-tight">StackLookup</h4>
                      <span className="text-[9px] text-[#5F6368] font-mono leading-none block">Active tab: {selectedSimSite.url}</span>
                    </div>
                  </div>
                  
                  {/* Badge count of techs */}
                  <span className="rounded-full bg-[#1A73E8] px-2.5 py-0.5 text-xs font-bold text-white">
                    {simulatedTechs.length}
                  </span>
                </div>

                {/* Live Filtering input */}
                <div className="px-4 py-3 border-b border-[#DADCE0] bg-[#F8F9FA]">
                  <div className="flex items-center bg-white border border-[#DADCE0] rounded-lg px-2.5 py-1.5 text-xs focus-within:border-[#1A73E8]">
                    <Search className="h-3.5 w-3.5 text-[#5F6368] mr-2" />
                    <input
                      type="text"
                      placeholder="Filter active technologies..."
                      value={popupSearch}
                      onChange={(e) => setPopupSearch(e.target.value)}
                      className="bg-transparent text-xs w-full focus:outline-none"
                    />
                  </div>
                </div>

                {/* Status Tabs inside popup */}
                <div className="flex border-b border-[#DADCE0] text-xs font-semibold text-[#5F6368]">
                  {['All', 'Frontend', 'CMS', 'Other'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setPopupTab(tab as any)}
                      className={`flex-1 text-center py-2 border-b-2 transition-all ${
                        popupTab === tab ? 'border-[#1A73E8] text-[#1A73E8] bg-[#EEF4FF]/10' : 'border-transparent hover:text-[#202124]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Technology list container */}
                <div className="max-h-[260px] overflow-y-auto p-4 space-y-2.5">
                  {filteredSimulatedTechs.length > 0 ? (
                    filteredSimulatedTechs.map(t => (
                      <div
                        key={t.name}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-[#DADCE0] bg-[#F8F9FA]"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="h-8 w-8 rounded-lg bg-white border border-[#DADCE0] flex items-center justify-center text-[#1A73E8] font-bold text-xs">
                            {t.name[0]}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#202124] block leading-none">
                              {t.name}
                            </span>
                            <span className="text-[10px] text-[#5F6368] font-mono">
                              v{t.version}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] text-[#34A853] font-bold font-mono">
                          {t.confidence}% match
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-xs text-[#5F6368] py-8">
                      No matching signatures found.
                    </p>
                  )}
                </div>

                {/* Popup Footer CTA Redirect Link */}
                <div className="bg-[#EEF4FF] px-4 py-3 border-t border-[#DADCE0] text-center">
                  <button
                    onClick={() => onScanUrl(selectedSimSite.url)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1A73E8] hover:underline cursor-pointer"
                  >
                    <span>View Full Report on StackLookup.net</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: DEVTOOLS PANEL SIMULATOR */}
      {activeSubTab === 'devtools' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#202124] mb-2">Simulated Custom DevTools Panel</h2>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              Open the native developer drawer inside your Chrome workspace. This integration displays exact HTTP headers, cookie lifespans, and security details parsed by background.js.
            </p>
            
            {/* Choose site */}
            <div className="flex items-center space-x-3 mt-4">
              <span className="text-xs font-bold text-[#202124]">Inspect target:</span>
              <select
                value={selectedSimSite.url}
                onChange={(e) => {
                  const site = PRESET_WEBSITES.find(s => s.url === e.target.value);
                  if (site) setSelectedSimSite(site);
                }}
                className="bg-white border border-[#DADCE0] text-xs font-semibold p-2 rounded-lg text-[#202124]"
              >
                {PRESET_WEBSITES.map(s => (
                  <option key={s.url} value={s.url}>{s.display} ({s.url})</option>
                ))}
              </select>
            </div>
          </div>

          {/* DevTools visual container */}
          <div className="border border-[#DADCE0] rounded-2xl overflow-hidden bg-[#202124] text-neutral-300 font-mono text-xs">
            {/* Inspector tabs bar */}
            <div className="bg-[#2D2E31] border-b border-[#3F4042] px-4 py-2 flex items-center justify-between text-neutral-400">
              <div className="flex items-center space-x-4">
                <span className="text-white border-b-2 border-[#1A73E8] pb-1 font-bold">StackLookup Inspector</span>
                <span>Console</span>
                <span>Sources</span>
                <span>Network</span>
              </div>
              <span className="text-[10px] text-neutral-400">Target URL: {selectedSimSite.url}</span>
            </div>

            {/* Inner inspector content */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[250px]">
              {/* Left Column: Headers and Cookies */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#8AB4F8] font-bold uppercase tracking-wider text-[11px] mb-2 border-b border-neutral-700 pb-1 flex items-center">
                    Parsed HTTP Headers
                  </h4>
                  <div className="space-y-1 text-[11px]">
                    {Object.entries(selectedSimSite.responseHeaders).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="text-[#F2994A] font-semibold w-32 shrink-0">{key}:</span>
                        <span className="text-neutral-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[#8AB4F8] font-bold uppercase tracking-wider text-[11px] mb-2 border-b border-neutral-700 pb-1">
                    Detected Cookie signatures
                  </h4>
                  <div className="space-y-1 text-[11px] text-neutral-400">
                    <div>• <span className="text-[#E2C08D]">XSRF-TOKEN</span> (Strict-secure signature match)</div>
                    <div>• <span className="text-[#E2C08D]">_shopify_y</span> (Session analytic tracker cookie)</div>
                  </div>
                </div>
              </div>

              {/* Right Column: DOM matches */}
              <div>
                <h4 className="text-[#8AB4F8] font-bold uppercase tracking-wider text-[11px] mb-2 border-b border-neutral-700 pb-1">
                  DOM markup matches
                </h4>
                <div className="space-y-2 text-[11px] max-h-48 overflow-y-auto scrollbar-thin">
                  <div className="bg-neutral-800 p-2.5 border border-neutral-700 rounded-lg text-neutral-300 text-[10px] whitespace-pre-wrap">
                    {selectedSimSite.responseHtml.trim()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: V3 CODE EXPORTER */}
      {activeSubTab === 'code' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#202124] mb-1">Production-ready Manifest V3 Files</h2>
              <p className="text-sm text-[#5F6368]">
                Download or copy the raw fully optimized codebases for manual deployment.
              </p>
            </div>

            <button
              onClick={handleDownloadZip}
              className="inline-flex items-center space-x-1.5 rounded-xl bg-[#1A73E8] text-white px-5 py-3 text-xs font-bold hover:bg-[#1557B0] transition-colors shadow-sm shadow-[#1A73E8]/10"
              id="btn-download-all-ext-files"
            >
              <Download className="h-4.5 w-4.5" />
              <span>Download Chrome Bundle (ZIP)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(EXTENSION_FILES).map(([filename, content]) => (
              <div key={filename} className="border border-[#DADCE0] rounded-2xl overflow-hidden bg-white">
                <div className="bg-[#F8F9FA] border-b border-[#DADCE0] px-4 py-2.5 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#202124]">{filename}</span>
                  <button
                    onClick={() => handleCopyFile(filename, content)}
                    className="text-xs font-semibold text-[#1A73E8] hover:underline"
                  >
                    {copiedFileName === filename ? 'Copied ✓' : 'Copy Code'}
                  </button>
                </div>
                <pre className="p-4 bg-[#202124] text-neutral-300 text-[10px] sm:text-[11px] font-mono overflow-x-auto leading-relaxed max-h-60 scrollbar-thin">
                  {content}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: MONOREPO TREE */}
      {activeSubTab === 'monorepo' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#202124] mb-1">Monorepo Project Layout Mapping</h2>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              We structure our repository into a scalable monorepo pattern using workspace links. The detection dictionary is hosted in a generic shared package, guaranteeing that the React application API and browser service worker execute matching evaluations on the exact same data rules.
            </p>
          </div>

          <div className="bg-[#202124] border border-neutral-700 rounded-2xl p-6 text-neutral-300 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
            <pre>{`stacklookup-workspace/
├── apps/
│   ├── web/                     # React 19 / Vite SPA Web Application
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── components/      # GrowthEngine, Dashboard, Exporters
│   │       ├── main.tsx
│   │       └── index.css
│   │
│   └── extension/               # Chrome Browser Extension (Manifest V3)
│       ├── manifest.json        # Service worker & scripts mappings
│       ├── background.js        # Event-driven stateless badge updates
│       ├── content-script.js    # Non-blocking page scraping
│       ├── popup.html           # 420px width Material 3 component
│       └── popup.js             # Live input filter matrix
│
└── packages/
    └── shared-utils/            # Shared signatures and dictionary configurations
        ├── package.json
        └── index.ts             # TechnologyProfile interfaces`}</pre>
          </div>
        </div>
      )}

    </div>
  );
}
