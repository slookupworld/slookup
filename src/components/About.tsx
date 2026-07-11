/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, CheckCircle, Heart, Info, Code, FileText, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-4">
          About StackLookup
        </h1>
        <p className="text-lg text-[#5F6368] max-w-2xl mx-auto">
          Providing engineers, sales teams, and security researchers with beautiful, near-instant website technology audits.
        </p>
      </div>

      {/* Core Mission */}
      <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 sm:p-8 mb-8 shadow-sm">
        <h2 className="flex items-center text-xl font-bold text-[#202124] mb-4">
          <Info className="h-5 w-5 text-[#1A73E8] mr-2" />
          Our Mission
        </h2>
        <p className="text-[#5F6368] leading-relaxed mb-4">
          StackLookup was built with a clear vision: the web is evolving at an unprecedented pace, and understanding how it's built shouldn't require complex, bloated software. We supply a lightning-fast technology detector that processes DOM markers, headers, cookies, scripts, and meta signatures instantly.
        </p>
        <p className="text-[#5F6368] leading-relaxed">
          Through a unified matching dictionary, we ensure identical parsing accuracy across both our web portal and our high-performance Chrome Extension.
        </p>
      </div>

      {/* Legal Compliance Banner - REQUIRED STRING */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <Shield className="h-6 w-6 text-[#FBBC05]" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-semibold text-amber-900">Legal Compliance Notice</h3>
            <div className="mt-2 text-sm text-amber-800 leading-relaxed">
              <p className="font-medium" id="compliance-notice-block">
                "StackLookup is an independent web technology analyzer and is not affiliated with, endorsed by, or sponsored by Google, Chrome, Wappalyzer, BuiltWith, or any technology vendor."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Specifications & Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="border border-[#DADCE0] bg-white rounded-2xl p-6">
          <h3 className="flex items-center text-md font-semibold text-[#202124] mb-3">
            <CheckCircle className="h-5 w-5 text-[#34A853] mr-2" />
            100% Client-Side Privacy
          </h3>
          <p className="text-sm text-[#5F6368] leading-relaxed">
            All matching operates instantly within your sandbox or browser runtime. We do not track searched URLs or extract sensitive user cookies.
          </p>
        </div>

        <div className="border border-[#DADCE0] bg-white rounded-2xl p-6">
          <h3 className="flex items-center text-md font-semibold text-[#202124] mb-3">
            <Code className="h-5 w-5 text-[#1A73E8] mr-2" />
            Unified Signature Engine
          </h3>
          <p className="text-sm text-[#5F6368] leading-relaxed">
            Using a single-source configuration, the exact same regex engines analyze signatures whether inside our website sandbox or running inside the background worker.
          </p>
        </div>
      </div>

      {/* Architectural Stack representation */}
      <div className="border border-[#DADCE0] bg-[#F8F9FA] rounded-2xl p-6 mb-12 text-center">
        <h3 className="font-sans text-md font-bold text-[#202124] mb-4">The StackLookup Architecture</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-mono text-[#5F6368]">
          <div className="bg-white border border-[#DADCE0] px-4 py-2.5 rounded-xl shadow-sm">
            <Globe className="h-4 w-4 inline mr-1.5 text-[#1A73E8]" />
            React 19 Frontend
          </div>
          <span className="hidden sm:inline">➔</span>
          <div className="bg-white border border-[#DADCE0] px-4 py-2.5 rounded-xl shadow-sm">
            <Code className="h-4 w-4 inline mr-1.5 text-[#34A853]" />
            Unified Regex Library
          </div>
          <span className="hidden sm:inline">➔</span>
          <div className="bg-white border border-[#DADCE0] px-4 py-2.5 rounded-xl shadow-sm">
            <FileText className="h-4 w-4 inline mr-1.5 text-[#EA4335]" />
            Chrome Extension V3
          </div>
        </div>
      </div>

    </div>
  );
}
