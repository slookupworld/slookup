/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GrowthEngine from './components/GrowthEngine';
import Scanner from './components/Scanner';
import Dashboard from './components/Dashboard';
import ExtensionPlayground from './components/ExtensionPlayground';
import SeoHub from './components/SeoHub';
import Blog from './components/Blog';
import About from './components/About';
import Compare from './components/Compare';
import { ScanResult, WebpageMetadata, TechnologyProfile } from './types';
import { PRESET_WEBSITES, runDetection, TECHNOLOGY_DICTIONARY } from './data/detectionRules';

export default function App() {
  // Parse initial query parameters from URL for direct deep-linking and indexing
  const getInitialState = () => {
    if (typeof window === 'undefined') return { tab: 'home', tech: undefined, query: '' };
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') || 'home';
    const techParam = params.get('tech') || undefined;
    const queryParam = params.get('search') || params.get('url') || '';
    return { tab: tabParam, tech: techParam, query: queryParam };
  };

  const initial = getInitialState();
  const [currentTab, setCurrentTab] = useState<string>(initial.tab);
  const [scannedUrl, setScannedUrl] = useState<string>(initial.query);
  const [currentScanResult, setCurrentScanResult] = useState<ScanResult | null>(null);
  
  // Track selected technology for Programmatic SEO pages
  const [selectedTechSlug, setSelectedTechSlug] = useState<string | undefined>(initial.tech);

  // Sync state to URL and manage Document Title for SEO/AEO
  React.useEffect(() => {
    let title = 'StackLookup: Website Technology Analyzer, CMS & Tech Stack Checker | Free Instant Lookup';
    
    if (currentTab === 'extension') {
      title = 'Chrome Extension Developer Hub - StackLookup';
    } else if (currentTab === 'directory') {
      if (selectedTechSlug) {
        const matchedTech = TECHNOLOGY_DICTIONARY.find(t => t.slug === selectedTechSlug);
        const techName = matchedTech ? matchedTech.name : (selectedTechSlug.charAt(0).toUpperCase() + selectedTechSlug.slice(1));
        title = `${techName} Detection & Tech Profile | Free StackLookup Analyzer`;
      } else {
        title = 'Web Technology Directory & CMS Classifications - StackLookup';
      }
    } else if (currentTab === 'compare') {
      title = 'Compare Website Tech Stacks with AI Architecture Reports | StackLookup';
    } else if (currentTab === 'blog') {
      title = 'Web Technology, CMS & Performance Engineering Insights | StackLookup Blog';
    } else if (currentTab === 'about') {
      title = 'About StackLookup - Website Technology Detection Engine';
    } else if (currentTab === 'dashboard' && currentScanResult) {
      const targetUrl = currentScanResult.metadata?.url || '';
      const displayUrl = targetUrl.replace('https://', '').replace('http://', '').split('/')[0];
      title = displayUrl ? `Tech Stack Analysis for ${displayUrl} | StackLookup` : 'Website Tech Stack Analysis | StackLookup';
    }
    document.title = title;

    // Update URL query parameters without reloading
    if (typeof window !== 'undefined' && window.history) {
      const params = new URLSearchParams();
      if (currentTab !== 'home') params.set('tab', currentTab);
      if (currentTab === 'directory' && selectedTechSlug) params.set('tech', selectedTechSlug);
      
      const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [currentTab, selectedTechSlug, currentScanResult]);

  // Triggered when a scan is launched from the homepage or directory
  const handleStartScan = (url: string) => {
    // Basic domain normalization
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    setScannedUrl(cleanUrl);
    setCurrentTab('scan');
  };

  // Called after intermediate loader completes
  const handleScanFinished = (result: ScanResult) => {
    setCurrentScanResult(result);
    setCurrentTab('dashboard');
  };

  // Trigger sandbox simulation matching a specific technology slug
  const handleScanForSpecificTech = (techSlug: string) => {
    // Pick a preset site that contains that technology
    let matchedPreset = PRESET_WEBSITES[0]; // default Nextjs
    
    if (techSlug === 'wordpress') {
      matchedPreset = PRESET_WEBSITES.find(p => p.url.includes('techcrunch')) || PRESET_WEBSITES[0];
    } else if (techSlug === 'shopify' || techSlug === 'stripe') {
      matchedPreset = PRESET_WEBSITES.find(p => p.url.includes('gymshark')) || PRESET_WEBSITES[0];
    }

    setScannedUrl(matchedPreset.url);
    setCurrentTab('scan');
  };

  // Navigates and focuses on a tech slug inside the Registry (Programmatic Hub)
  const handleNavigateToTech = (slug: string) => {
    setSelectedTechSlug(slug);
    setCurrentTab('directory');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-sans selection:bg-[#EEF4FF] selection:text-[#1A73E8]">
      
      {/* Persistant Top Header */}
      <Header 
        currentTab={currentTab} 
        setTab={(tab) => {
          setCurrentTab(tab);
          // Clean slug states when clicking standard main menu tabs
          if (tab !== 'directory') setSelectedTechSlug(undefined);
        }}
        onNavigateToTech={handleNavigateToTech}
      />

      {/* Main Contents Panel */}
      <main className="flex-grow">
        <div className="animate-fade-in">
          
          {currentTab === 'home' && (
            <GrowthEngine 
              onStartScan={handleStartScan} 
              setTab={(tab) => {
                setCurrentTab(tab);
                if (tab !== 'directory') setSelectedTechSlug(undefined);
              }}
              setSelectedTechSlug={setSelectedTechSlug}
            />
          )}

          {currentTab === 'scan' && (
            <Scanner 
              targetUrl={scannedUrl} 
              onScanComplete={handleScanFinished} 
            />
          )}

          {currentTab === 'dashboard' && currentScanResult && (
            <Dashboard 
              scanResult={currentScanResult}
              onNavigateToTech={handleNavigateToTech}
              onReset={() => setCurrentTab('home')}
            />
          )}

          {currentTab === 'compare' && (
            <Compare onNavigateToTech={handleNavigateToTech} />
          )}

          {currentTab === 'extension' && (
            <ExtensionPlayground 
              onScanUrl={(url) => {
                setScannedUrl(url);
                setCurrentTab('scan');
              }}
            />
          )}

          {currentTab === 'directory' && (
            <SeoHub 
              onScanTech={handleScanForSpecificTech}
              selectedTechSlug={selectedTechSlug}
              setSelectedTechSlug={setSelectedTechSlug}
            />
          )}

          {currentTab === 'blog' && (
            <Blog />
          )}

          {currentTab === 'about' && (
            <About />
          )}

        </div>
      </main>

      {/* Persistent Footer */}
      <Footer setTab={(tab) => {
        setCurrentTab(tab);
        if (tab !== 'directory') setSelectedTechSlug(undefined);
      }} />

    </div>
  );
}
