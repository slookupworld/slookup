/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TECHNOLOGY_DICTIONARY } from '../data/detectionRules';
import { TechnologyProfile } from '../types';
import TechLogo from './TechLogo';
import { Cpu, ArrowRight, CheckCircle, ChevronRight, RefreshCw, Layers, Database, Shield, Globe, Terminal, FileText, Compass, Search } from 'lucide-react';

interface SeoHubProps {
  onScanTech: (slug: string) => void;
  selectedTechSlug?: string;
  setSelectedTechSlug: (slug: string | undefined) => void;
}

export default function SeoHub({ onScanTech, selectedTechSlug, setSelectedTechSlug }: SeoHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'CMS', 'CDN', 'Security', 'Marketing', 'Infrastructure', 'Analytics', 'Utility', 'PaaS', 'Database', 'Blogs', 'Advertising Network'];

  const filteredTech = selectedCategory === 'All' 
    ? TECHNOLOGY_DICTIONARY 
    : TECHNOLOGY_DICTIONARY.filter(t => t.category === selectedCategory);

  const activeTech = TECHNOLOGY_DICTIONARY.find(t => t.slug === selectedTechSlug);

  // Map slugs to simple Lucide icons
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="h-5 w-5" />;
      case 'Code2': return <Terminal className="h-5 w-5" />;
      case 'FileText': return <FileText className="h-5 w-5" />;
      case 'ShoppingBag': return <Layers className="h-5 w-5" />;
      case 'Cloud': return <Globe className="h-5 w-5" />;
      case 'BarChart2': return <Compass className="h-5 w-5" />;
      case 'Palette': return <Layers className="h-5 w-5" />;
      case 'CreditCard': return <Database className="h-5 w-5" />;
      case 'Megaphone': return <Globe className="h-5 w-5" />;
      case 'ShieldAlert': return <Shield className="h-5 w-5" />;
      case 'Server': return <Shield className="h-5 w-5" />;
      case 'Grid': return <Layers className="h-5 w-5" />;
      default: return <Cpu className="h-5 w-5" />;
    }
  };

  // Switch to specific detail vendor page (programmatic SEO layout)
  if (activeTech) {
    // Generate static JSON-LD for testing SEO metrics
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": activeTech.name,
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": activeTech.description
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://stacklookup.net"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Detector",
              "item": "https://stacklookup.net/detector"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": activeTech.name,
              "item": `https://stacklookup.net/detector/${activeTech.slug}`
            }
          ]
        }
      ]
    };

    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center space-x-1 text-xs text-[#5F6368] mb-8 font-medium">
          <button onClick={() => setSelectedTechSlug(undefined)} className="hover:text-[#1A73E8]">
            Registry Home
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#5F6368]">{activeTech.category}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#202124] font-semibold">{activeTech.name}</span>
        </nav>

        {/* Vendor Profile Main Card */}
        <div className="bg-white border border-[#DADCE0] rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#DADCE0]">
            <div className="flex items-center space-x-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-transparent group-hover:scale-105 transition-transform overflow-hidden">
                <TechLogo slug={activeTech.slug} className="h-14 w-14" />
              </div>
              <div>
                <span className="inline-flex items-center rounded-full bg-[#EEF4FF] px-2.5 py-0.5 text-xs font-semibold text-[#1A73E8] mb-1.5 border border-[#1A73E8]/10">
                  {activeTech.category} Tech-Stack
                </span>
                <h1 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202124]">
                  {activeTech.name} Technology Detector
                </h1>
              </div>
            </div>

            <button
              onClick={() => onScanTech(activeTech.slug)}
              className="inline-flex items-center justify-center space-x-2 rounded-xl bg-[#1A73E8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1557B0] transition-colors shadow-sm shadow-[#1A73E8]/10"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Simulate Scan Sandbox</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-sm font-bold text-[#202124] uppercase tracking-wider mb-2">Canonical Description</h2>
                <p className="text-md text-[#3C4043] leading-relaxed">
                  {activeTech.description}
                </p>
              </div>

              {/* Advantages List */}
              <div>
                <h3 className="text-sm font-bold text-[#202124] uppercase tracking-wider mb-3">Core Engineering Advantages</h3>
                <ul className="space-y-2.5 text-sm text-[#5F6368]">
                  {activeTech.advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-4.5 w-4.5 text-[#34A853] mr-2.5 mt-0.5 flex-shrink-0" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Metadata Panel */}
            <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-[#202124] uppercase tracking-wider">Detection Parameters</h3>
              <div className="text-xs space-y-2.5 font-mono text-[#5F6368]">
                <div className="flex justify-between border-b border-[#DADCE0]/50 pb-2">
                  <span>Confidence Level</span>
                  <span className="text-[#34A853] font-semibold">{activeTech.confidence}%</span>
                </div>
                <div className="flex justify-between border-b border-[#DADCE0]/50 pb-2">
                  <span>Detection Method</span>
                  <span className="text-[#1A73E8]">Regex Pattern Matrix</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>Official Website</span>
                  <a href={activeTech.website} target="_blank" rel="noreferrer" className="text-[#1A73E8] underline truncate max-w-[120px]">
                    {activeTech.website.replace('https://', '')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Competitive cross-link map */}
        <div className="bg-white border border-[#DADCE0] rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
          <h3 className="text-sm font-bold text-[#202124] uppercase tracking-wider mb-4">Alternatives & Competitors</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeTech.alternatives.map((altSlug) => {
              const altTech = TECHNOLOGY_DICTIONARY.find(t => t.slug === altSlug);
              return (
                <div
                  key={altSlug}
                  onClick={() => setSelectedTechSlug(altSlug)}
                  className="group cursor-pointer rounded-xl border border-[#DADCE0] p-4 bg-white hover:border-[#1A73E8] hover:bg-[#EEF4FF]/30 transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs text-[#5F6368] font-medium block">Explore Alternative</span>
                    <span className="text-sm font-bold text-[#202124] group-hover:text-[#1A73E8] transition-colors">
                      {altTech ? altTech.name : altSlug.toUpperCase()}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#5F6368] group-hover:translate-x-1 transition-transform" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Structured Meta Schema Indicator (Technical transparency) */}
        <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl p-6">
          <div className="flex items-start space-x-3 mb-4">
            <Search className="h-5 w-5 text-[#1A73E8] mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-[#202124]">Programmatic SEO JSON-LD Schema Graph</h3>
              <p className="text-xs text-[#5F6368] mt-0.5 leading-normal">
                This structured graph is dynamically generated and served in head tags for Google Search Console index spiders to optimize indexing efficiency.
              </p>
            </div>
          </div>
          <pre className="bg-[#202124] text-neutral-300 text-[11px] font-mono rounded-xl p-4 overflow-x-auto leading-relaxed max-h-48 scrollbar-thin">
            {JSON.stringify(jsonLd, null, 2)}
          </pre>
        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-4">
          Technology Registry Directory
        </h1>
        <p className="text-lg text-[#5F6368] max-w-2xl mx-auto">
          Explore and analyze core configurations, development benchmarks, and deployment patterns across {TECHNOLOGY_DICTIONARY.length} leading tech systems.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none" id="seo-category-container">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#1A73E8] text-white shadow-sm shadow-[#1A73E8]/15'
                : 'bg-white text-[#5F6368] border border-[#DADCE0] hover:bg-[#F8F9FA]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Registry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {filteredTech.map((tech) => (
          <div
            key={tech.slug}
            onClick={() => setSelectedTechSlug(tech.slug)}
            className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-[#DADCE0] bg-white p-5 hover:border-[#1A73E8]/60 hover:shadow-sm transition-all"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-transparent group-hover:scale-105 transition-transform overflow-hidden">
                  <TechLogo slug={tech.slug} className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#202124] group-hover:text-[#1A73E8] transition-colors">
                    {tech.name}
                  </h3>
                  <span className="text-[10px] text-[#5F6368] font-medium uppercase tracking-wider">
                    {tech.category}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#5F6368] leading-relaxed mb-4">
                {tech.description.slice(0, 110)}...
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DADCE0]/50 pt-3 text-xs">
              <span className="text-[#34A853] font-mono font-bold">{tech.confidence}% confidence</span>
              <span className="inline-flex items-center font-bold text-[#1A73E8]">
                Explore profiles <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
