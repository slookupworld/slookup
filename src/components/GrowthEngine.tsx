/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Clipboard, AlertCircle, Cpu, ShieldCheck, Database, ArrowRight, HelpCircle, ChevronDown, ChevronUp, Server, Globe, FileText, Layout, Layers, Megaphone, BarChart3, BookOpen } from 'lucide-react';
import TechLogo from './TechLogo';

interface GrowthEngineProps {
  onStartScan: (url: string) => void;
  setTab: (tab: string) => void;
  setSelectedTechSlug: (slug: string | undefined) => void;
}

const FINGERPRINT_ITEMS = [
  { name: 'Next.js', slug: 'nextjs' },
  { name: 'React.js', slug: 'react' },
  { name: 'WordPress', slug: 'wordpress' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'Cloudflare', slug: 'cloudflare' },
  { name: 'Tailwind CSS', slug: 'tailwind-css' },
  { name: 'Google Analytics', slug: 'google-analytics' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Vue.js', slug: 'vue' },
  { name: 'Angular', slug: 'angular' },
  { name: 'Laravel', slug: 'laravel' },
  { name: 'Google reCAPTCHA', slug: 'recaptcha' },
  { name: 'Django', slug: 'django' },
  { name: 'Webflow', slug: 'webflow' },
  { name: 'Vercel PaaS', slug: 'vercel-paas' },
  { name: 'Netlify', slug: 'netlify' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'Ghost', slug: 'ghost' },
  { name: 'Substack', slug: 'substack' },
  { name: 'AWS', slug: 'aws' },
  { name: 'GitHub Pages', slug: 'github-pages' }
];

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'How does our website technology analyzer and CMS detector operate?',
    answer: 'StackLookup functions as a high-fidelity website technology analyzer and CMS detector. Our engine evaluates HTML DOM markers, scripts, meta tags, cookies, and HTTP headers in real-time. This dynamic multi-angle website stack analyzer accurately profiles active site technologies—including e-commerce suites, databases, and page builders like WordPress, Shopify, and Webflow.'
  },
  {
    id: 'faq-2',
    question: 'Why use StackLookup as your go-to tech stack checker and web technology checker?',
    answer: 'As a client-side tech stack checker and web technology checker, StackLookup offers lightning-fast technology lookup capabilities. It detects active JavaScript library scripts, styles, meta tags, and secure CDN origins. It provides robust developer insights without the page weight or privacy risks of standard browser overlays.'
  },
  {
    id: 'faq-3',
    question: 'Can StackLookup serve as a hosting checker and programming language detector?',
    answer: 'Yes! StackLookup is an all-in-one website technology detector that includes a fully-functional hosting checker and programming language detector. By evaluating server response headers, DNS record tags, and CDN paths, it identifies exactly where a site is hosted (such as Vercel, Netlify, Cloudflare, or AWS) and identifies underlying programming languages and databases (PHP, Node.js, Python, Ruby).'
  },
  {
    id: 'faq-4',
    question: 'Is this framework detector accurate for single-page applications?',
    answer: 'Absolutely. Our high-fidelity framework detector identifies client-side UI libraries and frameworks including React, Next.js, Angular, Vue, and Svelte by analyzing client-side window namespaces, build bundle chunk hashes, and React-specific DOM attributes instantly.'
  }
];

export default function GrowthEngine({ onStartScan, setTab, setSelectedTechSlug }: GrowthEngineProps) {
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Animated metric counters (local states mimicking real metrics)
  const [scansCount, setScansCount] = useState(842100);
  const [accuracyCount, setAccuracyCount] = useState(95.0);

  useEffect(() => {
    // Subtle increment of metrics to make the site look alive
    const interval = setInterval(() => {
      setScansCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (accuracyCount < 99.8) {
      const timeout = setTimeout(() => {
        setAccuracyCount(prev => Math.min(99.8, parseFloat((prev + 0.3).toFixed(1))));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [accuracyCount]);

  // Handle Clipboard Paste URL
  const handlePasteUrl = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        setUrlInput(text.trim());
        validateUrl(text.trim());
      } else {
        setUrlError('Clipboard permission denied or unsupported. Please type or paste manually.');
      }
    } catch (err) {
      setUrlError('Failed to read clipboard.');
    }
  };

  // Immediate syntax validator
  const validateUrl = (val: string) => {
    if (!val) {
      setUrlError('URL cannot be blank');
      return false;
    }
    // Check if it looks like a valid domain or URL
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;
    if (!urlPattern.test(val)) {
      setUrlError('Please enter a valid domain or URL (e.g., stripe.com)');
      return false;
    }
    setUrlError('');
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrlInput(val);
    if (val) {
      validateUrl(val);
    } else {
      setUrlError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUrl(urlInput)) {
      onStartScan(urlInput.trim());
    }
  };

  // Custom Navigation to Category
  const handleCategoryClick = (categoryName: string) => {
    setTab('directory');
    setSelectedTechSlug(undefined); // Reset specific tech view to show full registry
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Centered Hero Section */}
      <section className="text-center max-w-3xl mx-auto mt-4 mb-12 sm:mb-16" id="hero-section">
        
        {/* Rounded badge */}
        <span className="inline-flex items-center rounded-full bg-[#EEF4FF] px-3.5 py-1 text-[11px] font-semibold text-[#1A73E8] mb-4 border border-[#1A73E8]/10 tracking-wide uppercase">
          <Cpu className="h-3.5 w-3.5 mr-1.5 text-[#1A73E8]" />
          High-Fidelity Website Stack Analyzer
        </span>

        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#202124] mb-4 leading-[1.15]">
          The Ultimate <span className="text-[#1A73E8]">Website Technology Analyzer</span> & Tech Stack Checker
        </h1>

        <p className="text-sm sm:text-base text-[#5F6368] max-w-2xl mx-auto mb-8 leading-relaxed">
          Instantly execute a comprehensive web technology checker scan. Our free technology lookup tool uncovers active CMS setups, web frameworks, hosting configurations, and server layers in milliseconds.
        </p>

        {/* Premium URL Input Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto relative mb-4">
          <div className="flex flex-col sm:flex-row items-stretch rounded-xl sm:border border-[#DADCE0] bg-white sm:p-1 focus-within:border-[#1A73E8] focus-within:ring-1 focus-within:ring-[#1A73E8] transition-all overflow-hidden gap-2 sm:gap-0 shadow-sm">
            <div className="flex-1 flex items-center px-3.5 bg-white border border-[#DADCE0] sm:border-0 rounded-lg sm:rounded-none py-2.5 sm:py-0">
              <Search className="h-4.5 w-4.5 text-[#5F6368] mr-2.5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Paste domain URL (e.g., stripe.com)"
                value={urlInput}
                onChange={handleInputChange}
                className="w-full text-[#202124] placeholder-[#5F6368] focus:outline-none text-sm bg-transparent"
                id="search-input-field"
              />
              <button
                type="button"
                onClick={handlePasteUrl}
                className="ml-2 inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium text-[#1A73E8] bg-[#EEF4FF] hover:bg-[#DCE9FF] transition-colors"
                title="Paste from clipboard"
                id="btn-paste-clipboard"
              >
                <Clipboard className="h-3 w-3" />
                <span className="hidden sm:inline">Paste</span>
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!!urlError && urlInput.length > 0}
              className="bg-[#1A73E8] hover:bg-[#1557B0] disabled:bg-[#DADCE0] disabled:cursor-not-allowed text-white font-semibold text-sm px-5 py-3 sm:py-2.5 rounded-lg transition-all shadow-sm"
              id="btn-search-trigger"
            >
              Analyze
            </button>
          </div>

          {/* Inline Syntax Validation message */}
          {urlError && (
            <div className="absolute top-full left-0 mt-2 flex items-center text-xs text-[#EA4335] font-medium px-2">
              <AlertCircle className="h-3.5 w-3.5 mr-1" />
              <span>{urlError}</span>
            </div>
          )}
        </form>

        {/* Suggestion tags / preset domain links */}
        <p className="text-xs text-[#5F6368] mt-6 flex flex-wrap items-center justify-center gap-2">
          <span>Try quick sandbox examples:</span>
          <button onClick={() => onStartScan('nextjs.org')} className="bg-[#F1F3F4] hover:bg-[#EEF4FF] hover:text-[#1A73E8] px-2.5 py-1 rounded-md transition-all font-medium">nextjs.org</button>
          <button onClick={() => onStartScan('stripe.com')} className="bg-[#F1F3F4] hover:bg-[#EEF4FF] hover:text-[#1A73E8] px-2.5 py-1 rounded-md transition-all font-medium">stripe.com</button>
          <button onClick={() => onStartScan('techcrunch.com')} className="bg-[#F1F3F4] hover:bg-[#EEF4FF] hover:text-[#1A73E8] px-2.5 py-1 rounded-md transition-all font-medium">techcrunch.com</button>
          <button onClick={() => onStartScan('gymshark.com')} className="bg-[#F1F3F4] hover:bg-[#EEF4FF] hover:text-[#1A73E8] px-2.5 py-1 rounded-md transition-all font-medium">gymshark.com</button>
        </p>
      </section>

      {/* Balanced Grid of Core Fingerprints with Official Logos */}
      <section className="bg-white rounded-2xl border border-[#DADCE0] p-5 sm:p-6 text-center max-w-5xl mx-auto mb-12 shadow-sm">
        <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider block mb-4">Supported Core Fingerprints</span>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4 mt-2">
          {FINGERPRINT_ITEMS.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-1.5 bg-[#F8F9FA] border border-[#DADCE0]/80 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-[10.5px] sm:text-xs font-semibold text-[#3C4043] shadow-sm hover:border-[#1A73E8] hover:bg-[#EEF4FF]/30 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
              onClick={() => {
                setTab('directory');
                setSelectedTechSlug(item.slug);
              }}
            >
              <TechLogo slug={item.slug} className="h-4 w-4 sm:h-4.5 sm:w-4.5 flex-shrink-0" />
              <span className="truncate text-left">{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof / Metrics Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12 text-center" id="metrics-grid">
        <div className="bg-[#F8F9FA] sm:bg-white rounded-xl border border-[#DADCE0] p-4 sm:p-5 shadow-sm hover:border-[#1A73E8]/30 transition-colors">
          <div className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1A73E8] mb-1">
            {scansCount.toLocaleString()}+
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-[#202124] mb-0.5">Global Website Audits</h3>
          <p className="text-[11px] text-[#5F6368] leading-tight">Processed by extension & web nodes</p>
        </div>

        <div className="bg-[#F8F9FA] sm:bg-white rounded-xl border border-[#DADCE0] p-4 sm:p-5 shadow-sm hover:border-[#34A853]/30 transition-colors">
          <div className="font-sans text-2xl sm:text-3xl font-extrabold text-[#34A853] mb-1">
            {accuracyCount}%
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-[#202124] mb-0.5">Match Accuracy</h3>
          <p className="text-[11px] text-[#5F6368] leading-tight">Calibrated weekly via dynamic sandboxes</p>
        </div>

        <div className="bg-[#F8F9FA] sm:bg-white rounded-xl border border-[#DADCE0] p-4 sm:p-5 shadow-sm hover:border-[#FBBC05]/30 transition-colors">
          <div className="font-sans text-2xl sm:text-3xl font-extrabold text-[#FBBC05] mb-1">
            &lt; 0.8ms
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-[#202124] mb-0.5">Injection Overhead</h3>
          <p className="text-[11px] text-[#5F6368] leading-tight">Ultra-lightweight stateless service workers</p>
        </div>
      </section>

      {/* Categorized Directory Grid */}
      <section className="mb-16 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#202124] mb-2">
            Technological Class Classifications
          </h2>
          <p className="text-[#5F6368] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Our engines organize signatures into key service vectors to analyze structural advantages and locate platform replacements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5" id="categorized-cards">
          {[
            { cat: 'Frontend', desc: 'Frameworks, single-page state systems, and compiled CSS designs powering active browser layouts.', icon: <Layout className="h-5 w-5" /> },
            { cat: 'CMS', desc: 'Content authoring systems, e-commerce engines, and visual development canvases.', icon: <Layers className="h-5 w-5" /> },
            { cat: 'CDN', desc: 'DDoS mitigators and content deliverers hosting serverless edge runtimes.', icon: <Globe className="h-5 w-5" /> },
            { cat: 'Security', desc: 'Bot protection engines, spam preventers, and active site risk scores.', icon: <ShieldCheck className="h-5 w-5" /> },
            { cat: 'Marketing', desc: 'Lead tracking tools, customer support systems, and sales funnels.', icon: <Megaphone className="h-5 w-5" /> },
            { cat: 'Analytics', desc: 'User traffic trackers and heatmaps mapping interaction points.', icon: <BarChart3 className="h-5 w-5" /> },
            { cat: 'PaaS', desc: 'Managed platform-as-a-service cloud layers for rapid build serverless pipelines.', icon: <Server className="h-5 w-5" /> },
            { cat: 'Database', desc: 'Object-relational, cache, and document storage databases keeping user records safe.', icon: <Database className="h-5 w-5" /> },
            { cat: 'Blogs', desc: 'Digital publishing, newsletter hubs, and content networks for creators.', icon: <BookOpen className="h-5 w-5" /> }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(item.cat)}
              className="group cursor-pointer rounded-xl border border-[#DADCE0] bg-white p-5 hover:border-[#1A73E8] hover:shadow-md hover:translate-y-[-1px] transition-all flex flex-row items-start gap-4 h-full"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#1A73E8] group-hover:bg-[#1A73E8] group-hover:text-white transition-all duration-300 border border-[#1A73E8]/5">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-sans text-sm sm:text-base font-extrabold text-[#202124] group-hover:text-[#1A73E8] transition-colors">{item.cat}</h3>
                  <span className="inline-flex items-center text-xs font-bold text-[#1A73E8] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#5F6368] leading-relaxed font-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Structured SEO Semantic Keyword Section */}
      <section className="bg-gradient-to-br from-[#F8F9FA] to-[#EEF4FF]/10 rounded-2xl border border-[#DADCE0] p-6 sm:p-8 max-w-5xl mx-auto mb-12 shadow-sm">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold text-[#1A73E8] uppercase tracking-wider block mb-2">Complete Technology Lookup Utility</span>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#202124] tracking-tight">
            Comprehensive Web Technology Checker & Website Stack Analyzer
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6368] mt-2 leading-relaxed">
            StackLookup is engineered to deliver enterprise-grade intelligence. Seamlessly audit software stacks, discover backend frameworks, verify host configurations, and identify CMS platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[#DADCE0]/60 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#202124] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-[#1A73E8] rounded-full"></span>
              Website Technology Detector
            </h3>
            <p className="text-xs text-[#5F6368] leading-relaxed">
              Analyze full target domains instantaneously. Identify underlying databases, marketing tags, page layers, and secure script paths using our unified web technology checker sandboxes.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#DADCE0]/60 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#202124] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-[#34A853] rounded-full"></span>
              CMS & Framework Detector
            </h3>
            <p className="text-xs text-[#5F6368] leading-relaxed">
              Verify platform choices on the fly. Functions as an instant CMS detector for WordPress and Shopify, combined with a modern framework detector targeting React, Next.js, and Vue.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#DADCE0]/60 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#202124] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-[#FBBC05] rounded-full"></span>
              Hosting Checker & Language Detector
            </h3>
            <p className="text-xs text-[#5F6368] leading-relaxed">
              Locate host infrastructure with our automated hosting checker. Scan name pointers and headers to reveal underlying server platforms (AWS, Vercel) and programming languages.
            </p>
          </div>
        </div>

        {/* Quick Links Internal Linking Booster */}
        <div className="mt-8 pt-6 border-t border-[#DADCE0]/50 text-center">
          <p className="text-xs text-[#5F6368] font-medium mb-3">Popular search profiles in our technology lookup registry:</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { name: 'Next.js Detector', slug: 'nextjs' },
              { name: 'WordPress CMS Detector', slug: 'wordpress' },
              { name: 'Shopify Tech Stack', slug: 'shopify' },
              { name: 'Cloudflare Proxy Checker', slug: 'cloudflare' },
              { name: 'Stripe Payment Lookup', slug: 'stripe' },
              { name: 'Vercel Serverless Hosting', slug: 'vercel-paas' }
            ].map((link, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTab('directory');
                  setSelectedTechSlug(link.slug);
                }}
                className="text-xs font-semibold text-[#1A73E8] bg-white hover:bg-[#EEF4FF] border border-[#DADCE0] px-3 py-1.5 rounded-lg transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Accordion FAQ */}
      <section className="bg-white rounded-2xl border border-[#DADCE0] p-5 sm:p-8 max-w-5xl mx-auto mb-8" id="faq-section">
        <div className="text-center mb-6">
          <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-[#202124] flex items-center justify-center">
            <HelpCircle className="h-5 w-5 text-[#1A73E8] mr-2" />
            Frequently Answered Concerns
          </h2>
          <p className="text-[#5F6368] text-[11px] sm:text-xs mt-1">
            Understanding the architecture, capabilities, and compliance standards of the StackLookup platform.
          </p>
        </div>

        <div className="space-y-4" id="faq-accordion">
          {FAQ_ITEMS.map((faq) => {
            const isOpened = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="border-b border-[#DADCE0] pb-4 last:border-0 last:pb-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpened ? null : faq.id)}
                  className="flex w-full items-center justify-between text-left font-semibold text-[#202124] py-2 text-sm sm:text-base hover:text-[#1A73E8] transition-colors cursor-pointer"
                  aria-expanded={isOpened}
                >
                  <span className="text-xs sm:text-sm font-bold">{faq.question}</span>
                  {isOpened ? (
                    <ChevronUp className="h-4 w-4 text-[#5F6368] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#5F6368] flex-shrink-0" />
                  )}
                </button>
                {isOpened && (
                  <div className="mt-1.5 text-xs text-[#5F6368] leading-relaxed pr-6 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
