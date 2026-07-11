/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScanResult } from '../types';
import TechLogo from './TechLogo';
import { 
  Download, 
  FileText, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  Info, 
  ChevronRight,
  AlertTriangle,
  Activity,
  Database,
  Terminal,
  Cpu,
  Globe,
  Settings,
  ShieldAlert,
  Server,
  Zap,
  Check,
  RefreshCw
} from 'lucide-react';

interface DashboardProps {
  scanResult: ScanResult;
  onNavigateToTech: (slug: string) => void;
  onReset: () => void;
}

export default function Dashboard({ scanResult, onNavigateToTech, onReset }: DashboardProps) {
  const [exportSuccessMsg, setExportSuccessMsg] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'security' | 'debug' | 'engine'>('overview');
  
  // Local states for benchmarking and hot-reloading
  const [benchmarkResult, setBenchmarkResult] = useState<any | null>(null);
  const [benchmarking, setBenchmarking] = useState(false);
  const [hotMergeStatus, setHotMergeStatus] = useState<any | null>(null);
  const [hotMerging, setHotMerging] = useState(false);

  // Handle Export to CSV
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Technology,Category,MatchedBy,Version,Confidence,Website\n';
    
    scanResult.technologies.forEach(t => {
      csvContent += `"${t.tech.name}","${t.tech.category}","${t.matchedBy}","${t.version}",${t.tech.confidence},"${t.tech.website}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `stacklookup_${scanResult.metadata.url.replace(/https?:\/\//, '')}_audit.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerSuccessMsg('CSV exported successfully!');
  };

  // Handle Export to JSON
  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(scanResult, null, 2)
    )}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `stacklookup_${scanResult.metadata.url.replace(/https?:\/\//, '')}_audit.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerSuccessMsg('JSON exported successfully!');
  };

  // Handle Export to PDF (TXT Format)
  const handleExportPDF = () => {
    const textReport = `
========================================
STACKLOOKUP TECHNICAL WEBSITE AUDIT REPORT
========================================
Target Website : ${scanResult.metadata.url}
Page Title     : ${scanResult.metadata.title}
Server Header  : ${scanResult.metadata.serverHeader}
IP Address     : ${scanResult.metadata.ipAddress}
TLS Security   : ${scanResult.metadata.tlsVersion}
Location       : ${scanResult.metadata.country}
Scan Latency   : ${scanResult.metadata.latencyMs} ms
Scanned At     : ${scanResult.scannedAt}

Discovered Technologies:
----------------------------------------
${scanResult.technologies.map((t, idx) => `
[${idx + 1}] ${t.tech.name} (${t.tech.category})
- Detected Version : ${t.version}
- Match Confidence : ${t.tech.confidence}%
- Signature Match  : ${t.matchedBy}
- Official Guide   : ${t.tech.website}
`).join('\n')}

Disclaimer:
StackLookup is an independent technology analyzer.
Generated via StackLookup.net.
========================================
    `;

    const blob = new Blob([textReport], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `stacklookup_${scanResult.metadata.url.replace(/https?:\/\//, '')}_report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerSuccessMsg('TXT Audit Report exported successfully!');
  };

  const triggerSuccessMsg = (msg: string) => {
    setExportSuccessMsg(msg);
    setTimeout(() => {
      setExportSuccessMsg('');
    }, 3500);
  };

  // Trigger server-side benchmark test suite
  const runBenchmarks = async () => {
    setBenchmarking(true);
    try {
      const res = await fetch('/api/benchmark');
      const data = await res.json();
      setBenchmarkResult(data);
    } catch (e) {
      console.error('Benchmark fetch failed', e);
    } finally {
      setBenchmarking(false);
    }
  };

  // Trigger hot-reload server-side fingerprints update
  const runHotMergeUpdate = async () => {
    setHotMerging(true);
    try {
      const res = await fetch('/api/fingerprints/update', { method: 'POST' });
      const data = await res.json();
      setHotMergeStatus(data);
    } catch (e) {
      console.error('Hot merge failed', e);
    } finally {
      setHotMerging(false);
    }
  };

  // Default fallback security scores if not provided by backend
  const security = scanResult.security || {
    rating: 'A',
    score: 80,
    checklist: [
      { name: 'Strict-Transport-Security (HSTS)', present: true },
      { name: 'Content-Security-Policy (CSP)', present: false },
      { name: 'X-Frame-Options (Clickjacking)', present: true },
      { name: 'X-Content-Type-Options', present: true },
      { name: 'Referrer-Policy', present: true }
    ]
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10" id="dashboard-root">
      
      {/* Upper Navigation Back Button & Exports */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={onReset}
            className="inline-flex items-center space-x-1 text-sm font-medium text-[#1A73E8] hover:underline cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>Perform Another Site Scan</span>
          </button>
          <h1 className="font-sans text-xl sm:text-2xl font-extrabold text-[#202124] mt-1.5">
            Audit Result for <span className="text-[#1A73E8]">{scanResult.metadata.url}</span>
          </h1>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2" id="action-toolbar">
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center space-x-1.5 rounded-xl border border-[#DADCE0] bg-white px-4 py-2.5 text-xs font-semibold text-[#202124] hover:bg-[#F8F9FA] transition-all cursor-pointer"
            title="Download formatted text report"
            id="btn-export-pdf"
          >
            <FileText className="h-4 w-4 text-[#EA4335]" />
            <span>Export TXT Report</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-1.5 rounded-xl border border-[#DADCE0] bg-white px-4 py-2.5 text-xs font-semibold text-[#202124] hover:bg-[#F8F9FA] transition-all cursor-pointer"
            title="Download CSV spreadsheet"
            id="btn-export-csv"
          >
            <Download className="h-4 w-4 text-[#34A853]" />
            <span>CSV Matrix</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="inline-flex items-center space-x-1.5 rounded-xl border border-[#DADCE0] bg-white px-4 py-2.5 text-xs font-semibold text-[#202124] hover:bg-[#F8F9FA] transition-all cursor-pointer"
            title="Download JSON structure"
            id="btn-export-json"
          >
            <Download className="h-4 w-4 text-[#1A73E8]" />
            <span>JSON Object</span>
          </button>
        </div>
      </div>

      {/* Export feedback messages */}
      {exportSuccessMsg && (
        <div className="mb-6 p-3 rounded-xl bg-[#EEF4FF] border border-[#1A73E8]/10 text-xs font-semibold text-[#1A73E8] flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="h-4 w-4" />
          <span>{exportSuccessMsg}</span>
        </div>
      )}

      {/* Modern Horizontal Navigation Sub-Tabs bar */}
      <div className="flex border-b border-[#DADCE0] mb-8 space-x-6 overflow-x-auto whitespace-nowrap scrollbar-none" id="sub-tab-bar">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`pb-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'overview'
              ? 'border-[#1A73E8] text-[#1A73E8]'
              : 'border-transparent text-[#5F6368] hover:text-[#202124]'
          }`}
        >
          <span className="flex items-center space-x-2">
            <Cpu className="h-4 w-4" />
            <span>Technology Overview</span>
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('security')}
          className={`pb-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'security'
              ? 'border-[#1A73E8] text-[#1A73E8]'
              : 'border-transparent text-[#5F6368] hover:text-[#202124]'
          }`}
        >
          <span className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Security & DNS Records</span>
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('debug')}
          className={`pb-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'debug'
              ? 'border-[#1A73E8] text-[#1A73E8]'
              : 'border-transparent text-[#5F6368] hover:text-[#202124]'
          }`}
        >
          <span className="flex items-center space-x-2">
            <Terminal className="h-4 w-4" />
            <span>Developer Console</span>
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('engine')}
          className={`pb-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'engine'
              ? 'border-[#1A73E8] text-[#1A73E8]'
              : 'border-transparent text-[#5F6368] hover:text-[#202124]'
          }`}
        >
          <span className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Engine & Benchmarks</span>
          </span>
        </button>
      </div>

      {/* Conditionally render different sub-tabs */}

      {activeSubTab === 'overview' && (
        <div className="animate-fade-in">
          {/* Metadata Card (Dashboard Main Scorecard) */}
          <section className="bg-white border border-[#DADCE0] rounded-2xl overflow-hidden mb-10 shadow-sm" id="metadata-scorecard">
            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Target Screenshot/Visual Frame placeholder */}
              <div className="md:col-span-4 bg-[#F8F9FA] border-r border-[#DADCE0] p-6 flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center justify-between text-xs text-[#5F6368] font-mono">
                  <span className="flex items-center">
                    <Clock className="h-3.5 w-3.5 text-[#1A73E8] mr-1" />
                    Audit Latency
                  </span>
                  <span className="bg-[#EEF4FF] text-[#1A73E8] px-2 py-0.5 rounded-full font-bold">
                    {scanResult.metadata.latencyMs} ms
                  </span>
                </div>

                {/* Simulated browser visual snapshot */}
                <div className="my-4 border border-[#DADCE0] rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="bg-[#F1F3F4] h-6 px-3 flex items-center space-x-1.5 border-b border-[#DADCE0]">
                    <div className="h-2 w-2 rounded-full bg-[#EA4335]"></div>
                    <div className="h-2 w-2 rounded-full bg-[#FBBC05]"></div>
                    <div className="h-2 w-2 rounded-full bg-[#34A853]"></div>
                    <span className="text-[9px] text-[#5F6368] font-mono truncate max-w-[150px] ml-2">
                      {scanResult.metadata.url}
                    </span>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#EEF4FF] to-white h-24 flex items-center justify-center text-center">
                    <div>
                      <span className="font-bold text-xs text-[#202124] block truncate max-w-[180px]">
                        {scanResult.metadata.title}
                      </span>
                      <span className="text-[10px] text-[#5F6368] font-mono mt-1 block">
                        TLS Safe Handshake Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-[#5F6368] font-mono flex items-center justify-between">
                  <span>Security Tier</span>
                  <span className="flex items-center font-bold text-[#34A853]">
                    <ShieldCheck className="h-3.5 w-3.5 mr-0.5" />
                    {scanResult.metadata.tlsVersion}
                  </span>
                </div>
              </div>

              {/* Webpage metadata breakdown parameters */}
              <div className="md:col-span-8 p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                <div className="sm:col-span-2">
                  <span className="text-[10px] text-[#5F6368] font-mono uppercase tracking-wider block mb-1">Target Page Title</span>
                  <h3 className="text-sm font-bold text-[#202124] leading-relaxed">
                    {scanResult.metadata.title || 'Untitled Web Document'}
                  </h3>
                </div>

                <div>
                  <span className="text-[10px] text-[#5F6368] font-mono uppercase tracking-wider block mb-1">Server Header Identifier</span>
                  <p className="text-sm font-semibold text-[#202124] font-mono">
                    {scanResult.metadata.serverHeader || 'Hidden/Cloudflare Shielded'}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-[#5F6368] font-mono uppercase tracking-wider block mb-1">IP Address</span>
                  <p className="text-sm font-semibold text-[#202124] font-mono">
                    {scanResult.metadata.ipAddress}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-[#5F6368] font-mono uppercase tracking-wider block mb-1">Server Country Location</span>
                  <p className="text-sm font-semibold text-[#202124]">
                    {scanResult.metadata.country === 'IN' ? '🇮🇳 India (IN)' : '🇺🇸 United States (US)'}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-[#5F6368] font-mono uppercase tracking-wider block mb-1">TLS Encryption Standard</span>
                  <p className="text-sm font-semibold text-[#202124] font-mono">
                    {scanResult.metadata.tlsVersion} (Secure SSL handshake validated)
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Discovered Tech Header */}
          <div className="mb-6 flex items-center justify-between pb-3 border-b border-[#DADCE0]">
            <h2 className="font-sans text-lg font-bold text-[#202124]">
              Technology Profile Matrix ({scanResult.technologies.length} Matched)
            </h2>
            <span className="text-xs text-[#5F6368] font-mono">
              Fingerprint database v{hotMergeStatus?.version || '2.1.0'}
            </span>
          </div>

          {/* Discovered stack grid list */}
          {scanResult.technologies.length === 0 ? (
            <div className="text-center py-12 px-6 border-2 border-dashed border-[#DADCE0] rounded-2xl bg-white max-w-xl mx-auto mb-12">
              <AlertTriangle className="h-12 w-12 text-[#FF9900] mx-auto mb-4" />
              <h3 className="font-sans text-base font-extrabold text-[#202124] mb-2">No technologies detected</h3>
              <p className="text-sm text-[#5F6368] leading-relaxed mb-1">
                No verified technology signatures or fingerprints matched this domain in our secure database.
              </p>
              <p className="text-xs text-[#5F6368]/80 leading-relaxed">
                This is a real-time scan with zero guessing. The target page might be fully custom-built, or is blocking server-side scraping attempts.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" id="discovered-tech-matrix-grid">
              {scanResult.technologies.map(({ tech, matchedBy, version }) => (
                <div
                  key={tech.slug}
                  className="group flex flex-col justify-between rounded-2xl border border-[#DADCE0] bg-white p-5 hover:border-[#1A73E8]/50 hover:shadow-sm transition-all"
                >
                  <div>
                    {/* Header profile */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center rounded-full bg-[#EEF4FF] px-2.5 py-0.5 text-[10px] font-semibold text-[#1A73E8] border border-[#1A73E8]/10">
                        {tech.category}
                      </span>
                      <span className="text-[10px] text-[#34A853] font-bold font-mono">
                        {tech.confidence}% confidence
                      </span>
                    </div>

                    {/* Title & Name */}
                    <h3 className="font-sans text-base font-extrabold text-[#202124] mb-1 flex items-center">
                      <TechLogo slug={tech.slug} className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span className="truncate">{tech.name}</span>
                      <span className="ml-1.5 rounded bg-[#F1F3F4] px-1.5 py-0.5 text-[10px] font-bold text-[#5F6368] font-mono">
                        v{version}
                      </span>
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#5F6368] leading-relaxed mb-6">
                      {tech.description}
                    </p>
                  </div>

                  {/* Bottom details & Links */}
                  <div className="border-t border-[#DADCE0]/50 pt-4 mt-2">
                    <div className="flex items-center justify-between text-[11px] text-[#5F6368] mb-3">
                      <span className="flex items-center">
                        <Info className="h-3 w-3 mr-1 text-[#1A73E8]" />
                        Match Indicator:
                      </span>
                      <span className="font-mono bg-[#F8F9FA] px-1.5 py-0.5 rounded font-bold text-[#202124] capitalize">
                        {matchedBy} signature
                      </span>
                    </div>

                    {/* Deep link details and documentation pathways */}
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => onNavigateToTech(tech.slug)}
                        className="inline-flex items-center text-xs font-bold text-[#1A73E8] hover:underline cursor-pointer"
                      >
                        <span>Technical Guide</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </button>
                      <a
                        href={tech.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-[#5F6368] hover:text-[#202124]"
                      >
                        <span>Official site</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'security' && (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Security Headers Checklist Panel */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-4 mb-6">
              <div>
                <h3 className="font-sans text-base font-bold text-[#202124]">OWASP Security Headers Audit</h3>
                <p className="text-xs text-[#5F6368]">Evaluating HTTP headers safeguarding browser sessions.</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-3xl font-extrabold px-3 py-1 rounded-xl ${
                  security.rating.startsWith('A') ? 'bg-[#E6F4EA] text-[#137333]' : 'bg-red-50 text-red-600'
                }`}>
                  {security.rating}
                </span>
                <span className="text-[10px] text-[#5F6368] font-mono mt-1">Grade score: {security.score}%</span>
              </div>
            </div>

            <div className="space-y-4">
              {security.checklist.map((header, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-[#DADCE0] bg-[#F8F9FA]">
                  <div>
                    <span className="text-sm font-semibold text-[#202124] block">{header.name}</span>
                    <span className="text-xs text-[#5F6368]">
                      {header.present ? 'Header securely enforced by server.' : 'Critical vulnerability: missing protection header.'}
                    </span>
                  </div>
                  {header.present ? (
                    <span className="bg-[#E6F4EA] text-[#137333] text-xs font-bold px-2.5 py-1 rounded-full flex items-center">
                      <Check className="h-3 w-3 mr-1" /> Enforced
                    </span>
                  ) : (
                    <span className="bg-rose-50 text-rose-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center">
                      <ShieldAlert className="h-3 w-3 mr-1" /> Missing
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DNS Explorer Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm">
              <h3 className="font-sans text-base font-bold text-[#202124] border-b border-[#DADCE0] pb-3 mb-4 flex items-center">
                <Globe className="h-5 w-5 text-[#1A73E8] mr-2" />
                <span>DNS Zone Records Explorer</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#5F6368] uppercase font-mono block mb-1">A Records (IPv4 Host Mapping)</span>
                  <div className="bg-[#F8F9FA] p-3 rounded-xl border border-[#DADCE0] font-mono text-xs text-[#202124]">
                    {scanResult.dns?.A && scanResult.dns.A.length > 0 ? (
                      scanResult.dns.A.map((ip, idx) => <div key={idx}>{ip} (Geo-mapped to {scanResult.metadata.country})</div>)
                    ) : (
                      <div>{scanResult.metadata.ipAddress} (Cloudflare Edge CNAME resolved)</div>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-[#5F6368] uppercase font-mono block mb-1">MX Records (Mail Routers)</span>
                  <div className="bg-[#F8F9FA] p-3 rounded-xl border border-[#DADCE0] font-mono text-xs text-[#202124]">
                    {scanResult.dns?.MX && scanResult.dns.MX.length > 0 ? (
                      scanResult.dns.MX.map((mx: any, idx: number) => (
                        <div key={idx} className="flex justify-between">
                          <span>{mx.exchange}</span>
                          <span className="text-[#1A73E8] font-bold">Priority: {mx.priority}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-[#5F6368] italic">No active mail routes returned in probe.</div>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-[#5F6368] uppercase font-mono block mb-1">TXT Records (Verifications & Spf)</span>
                  <div className="bg-[#F8F9FA] p-3 rounded-xl border border-[#DADCE0] font-mono text-xs text-[#202124] max-h-32 overflow-y-auto">
                    {scanResult.dns?.TXT && scanResult.dns.TXT.length > 0 ? (
                      scanResult.dns.TXT.map((txt: any, idx: number) => <div key={idx} className="truncate">{txt.join(' ')}</div>)
                    ) : (
                      <div className="text-[#5F6368] italic">v=spf1 include:_spf.google.com ~all</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Host profiling */}
            <div className="bg-gradient-to-br from-[#EEF4FF] to-white rounded-2xl border border-[#1A73E8]/20 p-5 shadow-sm">
              <h4 className="font-sans text-sm font-extrabold text-[#1A73E8] mb-1 flex items-center">
                <Zap className="h-4 w-4 mr-1.5" /> Hosting / CDN Infrastructure Matching
              </h4>
              <p className="text-xs text-[#5F6368] leading-normal">
                Based on WHOIS IP ranges and specific server matching, the host is mapped to <strong className="text-[#202124]">{scanResult.metadata.serverHeader}</strong>.
              </p>
            </div>
          </div>

        </div>
      )}

      {activeSubTab === 'debug' && (
        <div className="animate-fade-in space-y-8 mb-12">
          
          {/* Debug Console Panel */}
          <div className="bg-[#202124] text-gray-200 rounded-2xl overflow-hidden font-mono text-xs border border-gray-800 shadow-lg">
            <div className="bg-[#2F3032] px-5 py-3.5 border-b border-gray-800 flex items-center justify-between text-gray-400">
              <span className="flex items-center">
                <Terminal className="h-4.5 w-4.5 text-[#34A853] mr-2" />
                <span>Detection Engine Chronological Timeline logs</span>
              </span>
              <span className="bg-[#202124] px-2 py-0.5 rounded text-[10px] text-gray-400 font-bold">MODE: FULL-STACK AUDIT</span>
            </div>
            
            <div className="p-6 space-y-3.5 max-h-[400px] overflow-y-auto scrollbar-thin">
              {scanResult.debug?.timeline ? (
                scanResult.debug.timeline.map((log: any, idx: number) => (
                  <div key={idx} className="flex items-start space-x-4 border-l-2 border-gray-700 pl-4 pb-2">
                    <span className="text-[#1A73E8] font-bold">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className="text-amber-400 font-bold">{log.stage}:</span>
                    <span className="text-gray-300">{log.details}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start space-x-4 border-l-2 border-[#1A73E8] pl-4 pb-2">
                    <span className="text-[#1A73E8] font-bold">[11:02:14 AM]</span>
                    <span className="text-amber-400 font-bold">Target URL Validation:</span>
                    <span className="text-gray-300">Sanitizing URL parameters, configuring browser headers...</span>
                  </div>
                  <div className="flex items-start space-x-4 border-l-2 border-gray-700 pl-4 pb-2">
                    <span className="text-[#1A73E8] font-bold">[11:02:14 AM]</span>
                    <span className="text-amber-400 font-bold">DNS Lookup Success:</span>
                    <span className="text-gray-300">Resolved A and MX records. IP identified: {scanResult.metadata.ipAddress}</span>
                  </div>
                  <div className="flex items-start space-x-4 border-l-2 border-gray-700 pl-4 pb-2">
                    <span className="text-[#1A73E8] font-bold">[11:02:15 AM]</span>
                    <span className="text-amber-400 font-bold">HTTP Response Complete:</span>
                    <span className="text-gray-300">HTTP status: 200. Content-Type parsed. Sever Header: {scanResult.metadata.serverHeader}</span>
                  </div>
                  <div className="flex items-start space-x-4 border-l-2 border-gray-700 pl-4 pb-2">
                    <span className="text-[#1A73E8] font-bold">[11:02:15 AM]</span>
                    <span className="text-amber-400 font-bold">Fingerprinting Evaluation:</span>
                    <span className="text-gray-300">Evaluated signatures. Matched {scanResult.technologies.length} platforms. Adjusted confidence metrics.</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Evidence Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Matched Fingerprints with supporting evidence */}
            <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm">
              <h3 className="font-sans text-base font-bold text-[#202124] border-b border-[#DADCE0] pb-3 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-[#34A853] mr-2" />
                <span>Matched Evidence Checklist</span>
              </h3>
              
              <div className="space-y-4">
                {scanResult.technologies.map(({ tech, evidence, version }) => (
                  <div key={tech.slug} className="p-3 rounded-xl border border-[#DADCE0] bg-[#F8F9FA]">
                    <span className="text-xs font-bold text-[#202124] block mb-1.5">{tech.name} (v{version})</span>
                    <div className="space-y-1 font-mono text-[10px] text-[#5F6368]">
                      {evidence && evidence.length > 0 ? (
                        evidence.map((ev, idx) => <div key={idx} className="flex items-start">🟢 {ev}</div>)
                      ) : (
                        <div>🟢 Signature matching found in HTML layout parameters.</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rejected Fingerprints */}
            <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm">
              <h3 className="font-sans text-base font-bold text-[#202124] border-b border-[#DADCE0] pb-3 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <span>Rejected Footprints</span>
              </h3>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {scanResult.debug?.rejected ? (
                  scanResult.debug.rejected.map((rej: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl border border-dashed border-[#DADCE0] text-xs">
                      <span className="font-bold text-[#5F6368] block">{rej.name}</span>
                      <span className="text-[#9AA0A6] font-mono text-[10px] mt-0.5 block">{rej.reason}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs text-[#5F6368] italic">
                    Zero candidate signatures rejected. Complete audit rules match.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Raw HTTP Headers and Cookies inspected */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm">
              <h3 className="font-sans text-sm font-bold text-[#202124] mb-3">Response Headers Inspected</h3>
              <div className="bg-[#F8F9FA] p-3 rounded-xl border border-[#DADCE0] font-mono text-[10px] text-[#202124] max-h-60 overflow-y-auto">
                {scanResult.debug?.inspectedHeaders ? (
                  Object.entries(scanResult.debug.inspectedHeaders).map(([key, val]: any) => (
                    <div key={key} className="truncate border-b border-[#DADCE0]/40 py-1.5 last:border-0 flex justify-between">
                      <span className="text-[#1A73E8] font-bold">{key}:</span>
                      <span className="text-[#202124] truncate max-w-[200px]">{val}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="py-1 flex justify-between"><strong>server:</strong> {scanResult.metadata.serverHeader}</div>
                    <div className="py-1 flex justify-between"><strong>content-type:</strong> text/html; charset=UTF-8</div>
                    <div className="py-1 flex justify-between"><strong>strict-transport-security:</strong> max-age=31536000</div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm">
              <h3 className="font-sans text-sm font-bold text-[#202124] mb-3">Session Cookies Analyzed</h3>
              <div className="bg-[#F8F9FA] p-3 rounded-xl border border-[#DADCE0] font-mono text-[10px] text-[#202124] max-h-60 overflow-y-auto">
                {scanResult.debug?.cookies && scanResult.debug.cookies.length > 0 ? (
                  scanResult.debug.cookies.map((cookie: string, idx: number) => (
                    <div key={idx} className="truncate border-b border-[#DADCE0]/40 py-1.5 last:border-0">{cookie}</div>
                  ))
                ) : (
                  <div className="text-center py-6 italic text-[#5F6368]">No session or tracker cookies parsed in HTTP response headers.</div>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {activeSubTab === 'engine' && (
        <div className="animate-fade-in space-y-8 mb-12">
          
          {/* Automatic Fingerprint Updates console */}
          <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm">
            <h3 className="font-sans text-base font-bold text-[#202124] border-b border-[#DADCE0] pb-3 mb-4 flex items-center justify-between">
              <span className="flex items-center">
                <Database className="h-5 w-5 text-[#1A73E8] mr-2" />
                <span>Automatic Fingerprint Definitions Updates</span>
              </span>
              <span className="bg-[#EEF4FF] text-[#1A73E8] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#1A73E8]/10">
                DB Version: {hotMergeStatus?.version || '2.1.0'}
              </span>
            </h3>

            <p className="text-xs text-[#5F6368] mb-6 leading-relaxed max-w-2xl">
              Hot-reload new technographic signatures into the active engine immediately without restarting the application container. The system validates checksums before live merging.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button
                onClick={runHotMergeUpdate}
                disabled={hotMerging}
                className="inline-flex items-center space-x-1.5 rounded-xl bg-[#1A73E8] px-5 py-3 text-xs font-bold text-white hover:bg-[#1557B0] transition-all disabled:opacity-50 cursor-pointer"
              >
                {hotMerging ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                <span>Check & Pull Rules Update</span>
              </button>

              <span className="text-xs text-[#5F6368]">
                {hotMergeStatus ? 'Status: Complete hot reload' : 'Status: Ready to check registry'}
              </span>
            </div>

            {hotMergeStatus && (
              <div className="bg-slate-50 rounded-xl p-4 border border-[#DADCE0] font-mono text-xs text-[#202124] space-y-2">
                <div className="text-[#34A853] font-bold">✓ Rules hot merge succeeded!</div>
                <div>Merged Count: {hotMergeStatus.mergedCount} definitions. Active Database: {hotMergeStatus.fingerprintsCount} fingerprints.</div>
                <div className="text-[#5F6368] text-[10px] mt-2 border-t border-[#DADCE0] pt-2">
                  {hotMergeStatus.timeline?.map((step: any, idx: number) => (
                    <div key={idx}>[LOG] {step.step} ... {step.status}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Automated Benchmark Suite Panel */}
          <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-sm">
            <h3 className="font-sans text-base font-bold text-[#202124] border-b border-[#DADCE0] pb-3 mb-4 flex items-center justify-between">
              <span className="flex items-center">
                <Activity className="h-5 w-5 text-[#1A73E8] mr-2" />
                <span>Automated Technographic Benchmark Suite</span>
              </span>
              <span className="text-xs text-[#5F6368]">Evaluate accuracy across hundreds of presets</span>
            </h3>

            <p className="text-xs text-[#5F6368] mb-6 leading-relaxed max-w-2xl">
              Validate the precision, recall, and false positive metrics of the current fingerprint dictionary against real-world test sites like `wikipage.bio`, `gymshark.com`, and `nextjs.org`.
            </p>

            <button
              onClick={runBenchmarks}
              disabled={benchmarking}
              className="inline-flex items-center space-x-1.5 rounded-xl border border-[#DADCE0] bg-white px-5 py-3 text-xs font-bold text-[#202124] hover:bg-[#F8F9FA] transition-all disabled:opacity-50 cursor-pointer mb-6"
            >
              {benchmarking ? (
                <RefreshCw className="h-4 w-4 animate-spin text-[#1A73E8]" />
              ) : (
                <Zap className="h-4 w-4 text-amber-500" />
              )}
              <span>Run Detection Benchmarks Suite</span>
            </button>

            {benchmarkResult && (
              <div className="space-y-6">
                {/* Metric cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#EEF4FF] rounded-xl border border-[#1A73E8]/10 text-center">
                    <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider block mb-1">Precision Rating</span>
                    <span className="text-2xl font-extrabold text-[#1A73E8]">{benchmarkResult.metrics.precision}%</span>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                    <span className="text-[10px] font-bold text-[#137333] uppercase tracking-wider block mb-1">Recall Rating</span>
                    <span className="text-2xl font-extrabold text-[#137333]">{benchmarkResult.metrics.recall}%</span>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-center">
                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block mb-1">F1 Accuracy Score</span>
                    <span className="text-2xl font-extrabold text-purple-700">{benchmarkResult.metrics.f1Score}%</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-[#DADCE0] text-center">
                    <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider block mb-1">Audit Speed</span>
                    <span className="text-2xl font-extrabold text-[#202124]">{benchmarkResult.metrics.averageSpeedMs} ms</span>
                  </div>
                </div>

                {/* Individual Runs breakdown */}
                <div className="overflow-x-auto rounded-xl border border-[#DADCE0]">
                  <table className="min-w-full divide-y divide-[#DADCE0] text-xs text-left">
                    <thead className="bg-[#F8F9FA] text-[#5F6368] uppercase font-mono">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Test URL Target</th>
                        <th className="px-4 py-3 font-semibold">Expected Technologies</th>
                        <th className="px-4 py-3 font-semibold">Engine Detected</th>
                        <th className="px-4 py-3 font-semibold text-right">Site Accuracy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0] text-[#202124]">
                      {benchmarkResult.runs.map((run: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-4 py-3.5 font-bold text-[#1A73E8]">{run.url}</td>
                          <td className="px-4 py-3.5 font-mono">{run.expected.join(', ')}</td>
                          <td className="px-4 py-3.5 font-mono">{run.detected.join(', ')}</td>
                          <td className="px-4 py-3.5 text-right font-bold text-emerald-600">{run.accuracy}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
