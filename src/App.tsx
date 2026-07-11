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
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [scannedUrl, setScannedUrl] = useState<string>('');
  const [currentScanResult, setCurrentScanResult] = useState<ScanResult | null>(null);
  
  // Track selected technology for Programmatic SEO pages
  const [selectedTechSlug, setSelectedTechSlug] = useState<string | undefined>(undefined);

  // Dynamic Page Title Updater for SEO, AEO and Generative Engines
  React.useEffect(() => {
    let title = 'StackLookup - Web Technology Profiler & CMS Detector';
    if (currentTab === 'extension') {
      title = 'Chrome Extension Developer Hub - StackLookup';
    } else if (currentTab === 'directory') {
      title = selectedTechSlug 
        ? `${selectedTechSlug.charAt(0).toUpperCase() + selectedTechSlug.slice(1)} Technology Profile | StackLookup`
        : 'Web Technology Directory & Fingerprint Classifications - StackLookup';
    } else if (currentTab === 'blog') {
      title = 'Latest Web Development & Security Insights - StackLookup Blog';
    } else if (currentTab === 'about') {
      title = 'About StackLookup - Our Technology Discovery Mission';
    } else if (currentTab === 'dashboard' && currentScanResult) {
      const targetUrl = currentScanResult.metadata?.url || '';
      const displayUrl = targetUrl.replace('https://', '').replace('http://', '').split('/')[0];
      title = displayUrl ? `Technology Stack Analysis for ${displayUrl} | StackLookup` : 'Technology Stack Analysis | StackLookup';
    }
    document.title = title;
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
