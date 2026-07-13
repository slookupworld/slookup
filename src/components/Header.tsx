/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Compass, Chrome, Cpu, BookOpen, AlertCircle, GitCompare } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onNavigateToTech: (slug: string) => void;
}

export default function Header({ currentTab, setTab }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#DADCE0] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div 
          onClick={() => setTab('home')} 
          className="flex cursor-pointer items-center space-x-2"
          id="header-logo-container"
        >
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#1A73E8] text-white shadow-sm shadow-[#1A73E8]/20 flex-shrink-0">
            <Cpu className="h-4 w-4" />
          </div>
          <div className="flex items-center">
            <span className="font-sans text-base sm:text-lg font-extrabold tracking-tight text-[#202124]">
              Stack<span className="text-[#1A73E8]">Lookup</span>
            </span>
            <span className="hidden sm:inline-block ml-1.5 rounded-full bg-[#EEF4FF] px-2 py-0.5 text-[9px] font-bold text-[#1A73E8] border border-[#1A73E8]/10 tracking-wide">
              v2.0
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center md:space-x-0.5 lg:space-x-1" id="desktop-nav">
          <button
            onClick={() => setTab('home')}
            className={`flex items-center space-x-1 px-2 py-1.5 lg:space-x-2 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
              currentTab === 'home' || currentTab === 'scan' || currentTab === 'dashboard'
                ? 'bg-[#EEF4FF] text-[#1A73E8]'
                : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
            }`}
            id="nav-btn-web-profiler"
          >
            <Compass className="h-4 w-4" />
            <span>Web Scanner</span>
          </button>

          <button
            onClick={() => setTab('compare')}
            className={`flex items-center space-x-1 px-2 py-1.5 lg:space-x-2 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
              currentTab === 'compare'
                ? 'bg-[#EEF4FF] text-[#1A73E8]'
                : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
            }`}
            id="nav-btn-compare"
          >
            <GitCompare className="h-4 w-4" />
            <span>Compare Stacks</span>
          </button>

          <button
            onClick={() => setTab('directory')}
            className={`flex items-center space-x-1 px-2 py-1.5 lg:space-x-2 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
              currentTab === 'directory' || currentTab.startsWith('tech-')
                ? 'bg-[#EEF4FF] text-[#1A73E8]'
                : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
            }`}
            id="nav-btn-directory"
          >
            <Search className="h-4 w-4" />
            <span>Registry Hub</span>
          </button>

          <button
            onClick={() => setTab('blog')}
            className={`flex items-center space-x-1 px-2 py-1.5 lg:space-x-2 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
              currentTab === 'blog'
                ? 'bg-[#EEF4FF] text-[#1A73E8]'
                : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
            }`}
            id="nav-btn-blog"
          >
            <BookOpen className="h-4 w-4" />
            <span>Tech Blog</span>
          </button>

          <button
            onClick={() => setTab('about')}
            className={`flex items-center space-x-1 px-2 py-1.5 lg:space-x-2 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
              currentTab === 'about'
                ? 'bg-[#EEF4FF] text-[#1A73E8]'
                : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
            }`}
            id="nav-btn-about"
          >
            <AlertCircle className="h-4 w-4" />
            <span>About</span>
          </button>
        </nav>

        {/* Action button */}
        <div className="flex items-center space-x-2">
          {/* Ko-fi Tip Button */}
          <a
            href="https://ko-fi.com/stacklookup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 rounded-full bg-[#FF5E5B] px-4 py-2 text-sm font-medium text-white hover:bg-[#FF4E4B] transition-all hover:scale-[1.03] active:scale-95 shadow-sm shadow-[#FF5E5B]/20"
            id="header-kofi-tip-btn"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.881 8.948c-.773-4.085-4.859-4.582-4.859-4.582H1.441S.122 4.41.018 6.02c-.106 1.611-.018 10.985-.018 10.985s-.208 3.518 3.491 3.518h10.373s3.491.24 3.491-3.518c0 0 3.731-.54 4.58-4.582.85-4.043 1.946-8.475 1.946-8.475zm-5.465 5.166s-.461 1.86-1.866 1.86h-1.44s-1.042.083-1.042-1.011V6.166h4.348s2.003-.105 1.866 4.348c-.066 2.169-.433 3.6-1.866 3.6zM11.685 8.16a2.022 2.022 0 0 0-2.859 0l-.41.41-.41-.41a2.022 2.022 0 1 0-2.859 2.859l3.269 3.269 3.269-3.269a2.022 2.022 0 0 0 0-2.859z" />
            </svg>
            <span className="hidden sm:inline">Any Tips</span>
            <span className="sm:hidden">Tip</span>
          </a>

          <button
            onClick={() => setTab('extension')}
            className="hidden lg:inline-flex items-center space-x-1.5 rounded-full bg-[#1A73E8] px-4 py-2 text-sm font-medium text-white hover:bg-[#1557B0] transition-colors shadow-sm shadow-[#1A73E8]/10"
            id="header-install-ext-btn"
          >
            <Chrome className="h-4 w-4" />
            <span>Extension</span>
          </button>
        </div>

      </div>

      {/* Mobile Sticky Secondary Navigation */}
      <div className="flex md:hidden border-t border-[#DADCE0] bg-white px-2 py-1 justify-around text-center overflow-x-auto whitespace-nowrap scrollbar-none">
        <button
          onClick={() => setTab('home')}
          className={`flex flex-col items-center px-3 py-1 text-xs font-medium ${
            currentTab === 'home' || currentTab === 'scan' || currentTab === 'dashboard' ? 'text-[#1A73E8]' : 'text-[#5F6368]'
          }`}
        >
          <Compass className="h-4 w-4 mb-0.5" />
          <span>Scanner</span>
        </button>
        <button
          onClick={() => setTab('compare')}
          className={`flex flex-col items-center px-3 py-1 text-xs font-medium ${
            currentTab === 'compare' ? 'text-[#1A73E8]' : 'text-[#5F6368]'
          }`}
        >
          <GitCompare className="h-4 w-4 mb-0.5" />
          <span>Compare</span>
        </button>

        <button
          onClick={() => setTab('directory')}
          className={`flex flex-col items-center px-3 py-1 text-xs font-medium ${
            currentTab === 'directory' || currentTab.startsWith('tech-') ? 'text-[#1A73E8]' : 'text-[#5F6368]'
          }`}
        >
          <Search className="h-4 w-4 mb-0.5" />
          <span>Registry</span>
        </button>
        <button
          onClick={() => setTab('blog')}
          className={`flex flex-col items-center px-3 py-1 text-xs font-medium ${
            currentTab === 'blog' ? 'text-[#1A73E8]' : 'text-[#5F6368]'
          }`}
        >
          <BookOpen className="h-4 w-4 mb-0.5" />
          <span>Blog</span>
        </button>
        <button
          onClick={() => setTab('about')}
          className={`flex flex-col items-center px-3 py-1 text-xs font-medium ${
            currentTab === 'about' ? 'text-[#1A73E8]' : 'text-[#5F6368]'
          }`}
        >
          <AlertCircle className="h-4 w-4 mb-0.5" />
          <span>About</span>
        </button>
      </div>
    </header>
  );
}
