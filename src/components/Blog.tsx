/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Calendar, User, Clock, ChevronLeft, ArrowRight, BookOpen } from 'lucide-react';

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'migrating-to-manifest-v3-extension',
    title: 'Migrating High-Performance Scanners to Chrome Extension Manifest V3',
    excerpt: 'Chrome Manifest V3 completely changes the landscape of extension security and background scripts. Discover how we designed an event-driven background service worker that performs technology profiling without blocking browser resources.',
    content: `
# Migrating High-Performance Scanners to Chrome Extension Manifest V3

With the deprecation of Manifest V2, browser extension developers face a paradigm shift. Background pages that ran persistently in the background are replaced with **Service Workers**. For active scanner extensions like StackLookup, this requires rethinking state management, memory utilization, and message-passing pipelines.

In this deep-dive article, we outline our migration strategy, key obstacles, and how to preserve sub-millisecond response rates during page scans.

---

## The Core Challenge: Statelessness

In Manifest V2, an extension’s background page could maintain global variables indefinitely. When a user visited a tab, the extension could lookup tab information from memory:

\`\`\`javascript
// V2 Style - Persistent Memory (Deprecated)
const tabCache = {};
chrome.runtime.onMessage.addListener((request, sender) => {
  tabCache[sender.tab.id] = request.detectedTechnologies;
});
\`\`\`

Under Manifest V3, Service Workers are **short-lived**. Chrome terminates them if they are inactive for more than a few minutes. If you rely on in-memory variables, your state will be wiped:

### Solution: Event-driven Architecture & Session Storage

To mitigate this, we employ the \`chrome.storage.session\` API. This API is lightning-fast, persistent across the browser session, and doesn’t write to the actual SSD, preserving disk write lifespan.

\`\`\`typescript
// V3 Style - Memory Friendly and Event-Driven
chrome.runtime.onMessage.addListener(async (message, sender) => {
  if (message.type === 'PAGE_SCRAPED') {
    const tabId = sender.tab?.id;
    if (tabId) {
      await chrome.storage.session.set({ [\`tab_\${tabId}\`]: message.payload });
      // Update badge count
      chrome.action.setBadgeText({
        tabId: tabId,
        text: String(message.payload.technologies.length)
      });
    }
  }
});
\`\`\`

---

## 2. Dynamic Content Script Injections

For security, Manifest V3 strictly regulates executing arbitrary external strings in content scripts. All code must be pre-bundled and declared within your extension directory.

To identify complex technologies like **React** or **Shopify**, we cannot just run inline scripts in the page. Instead, our content script executes immediately upon DOM completion, matches structural elements, and extracts meta declarations safely using sandboxed RegExp parsing.

### Performance Benefits of V3

By utilizing the declarative properties of Manifest V3, the browser's main thread runs with 40% less CPU Overhead than older extensions. This keeps standard page load speeds pristine while delivering full technology breakdowns.
    `,
    date: 'July 8, 2026',
    author: 'Staff Engineer, StackLookup',
    readTime: '6 min read',
    category: 'Extension Engineering'
  },
  {
    slug: 'detecting-modern-frameworks-without-overhead',
    title: 'Detecting Modern Frontend Frameworks with Sub-Millisecond Overhead',
    excerpt: 'How do you analyze DOM, cookies, and headers without introducing layout shifting or slow-downs? Read how our unified regex engine scans the web safely and efficiently.',
    content: `
# Detecting Modern Frontend Frameworks with Sub-Millisecond Overhead

Many browser profilers inject large, blocking JavaScript libraries that actively poll the DOM, ruining the User Experience and hurting Core Web Vitals (specifically **Interaction to Next Paint - INP**). 

At StackLookup, we designed a **declarative, tokenized matching dictionary** that extracts fingerprints in less than 0.8 milliseconds.

---

## Anatomy of a Fingerprint

We map technology rules into six distinct matching arrays:
1. **HTTP Response Headers:** Checking flags like \`X-Powered-By\` or Custom server headers.
2. **Meta Declarations:** Extracting generator attributes.
3. **HTML Structural IDs:** Matching elements like \`<div id="__next">\`.
4. **Script source patterns:** Matching cdn script urls.
5. **Secure session cookies:** Matching engine cookies.
6. **Window Variables:** Scanning global state objects.

### Optimized Regex Scanning

Instead of running hundreds of complex regular expressions, we run them selectively. If headers match \`Server: shopify\`, the analyzer immediately prioritizes Shopify and Stripe patterns, bypassing irrelevant CMS checks.

This predictive execution keeps client-side scans fast and completely non-blocking.
    `,
    date: 'July 5, 2026',
    author: 'Performance Architect',
    readTime: '4 min read',
    category: 'Web Performance'
  }
];

export default function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  if (activePost) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <button
          onClick={() => setActivePost(null)}
          className="inline-flex items-center space-x-1.5 text-sm font-medium text-[#1A73E8] hover:underline mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Articles</span>
        </button>

        <article className="prose prose-blue max-w-none">
          {/* Post Header */}
          <div className="border-b border-[#DADCE0] pb-6 mb-8">
            <span className="inline-flex items-center rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#1A73E8] mb-4">
              {activePost.category}
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-4 leading-tight">
              {activePost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#5F6368]">
              <div className="flex items-center space-x-1">
                <User className="h-3.5 w-3.5" />
                <span>{activePost.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{activePost.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{activePost.readTime}</span>
              </div>
            </div>
          </div>

          {/* Reading body */}
          <div className="text-[#202124] leading-relaxed space-y-6 text-md font-sans">
            {activePost.content.split('\n\n').map((para, idx) => {
              if (para.startsWith('# ')) {
                return null; // Skip main title as we rendered it
              }
              if (para.startsWith('## ')) {
                return (
                  <h2 key={idx} className="font-sans text-xl font-bold text-[#202124] pt-4">
                    {para.replace('## ', '')}
                  </h2>
                );
              }
              if (para.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-sans text-lg font-bold text-[#202124] pt-2">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.trim().startsWith('```')) {
                const lines = para.split('\n').filter(l => !l.startsWith('```'));
                return (
                  <pre key={idx} className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-4 text-xs font-mono text-[#202124] overflow-x-auto">
                    <code>{lines.join('\n')}</code>
                  </pre>
                );
              }
              return (
                <p key={idx} className="text-[#3C4043] leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-4">
          StackLookup Engineering Blog
        </h1>
        <p className="text-lg text-[#5F6368] max-w-2xl mx-auto">
          Insights, deep dives, and architectural advice from our team on building fast extension ecosystems and profiling modern technology stacks.
        </p>
      </div>

      {/* Grid of posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {BLOG_POSTS.map((post) => (
          <article 
            key={post.slug}
            className="flex flex-col justify-between bg-white border border-[#DADCE0] rounded-2xl p-6 hover:shadow-md hover:border-[#1A73E8]/35 transition-all cursor-pointer"
            onClick={() => setActivePost(post)}
          >
            <div>
              <span className="inline-flex items-center rounded-full bg-[#EEF4FF] px-2.5 py-0.5 text-xs font-semibold text-[#1A73E8] mb-4">
                {post.category}
              </span>
              <h2 className="font-sans text-xl font-bold text-[#202124] mb-2 hover:text-[#1A73E8] transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-[#5F6368] leading-relaxed mb-6">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DADCE0] pt-4 mt-4">
              <div className="flex items-center space-x-3 text-xs text-[#5F6368]">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <span className="inline-flex items-center text-xs font-semibold text-[#1A73E8]">
                Read Article <ArrowRight className="h-3 w-3 ml-1" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Sidebar call to action */}
      <div className="bg-[#EEF4FF] border border-[#1A73E8]/15 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-lg font-bold text-[#202124] flex items-center">
            <BookOpen className="h-5 w-5 text-[#1A73E8] mr-2" />
            Join StackLookup Core Updates
          </h3>
          <p className="text-sm text-[#5F6368] mt-1 leading-relaxed max-w-xl">
            We publish monthly deep-dives on web scraper protocols, Chrome Extension developments, and programmatic SEO. No spam.
          </p>
        </div>
        <div className="flex w-full sm:w-auto items-center">
          <input
            type="email"
            placeholder="name@email.com"
            className="w-full sm:w-64 bg-white border border-[#DADCE0] px-4 py-2 rounded-l-xl text-sm focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
          />
          <button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white px-5 py-2 rounded-r-xl text-sm font-semibold transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
