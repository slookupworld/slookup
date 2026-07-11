/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TechnologyProfile {
  slug: string;
  name: string;
  category: 'Frontend' | 'CMS' | 'CDN' | 'Security' | 'Marketing' | 'Infrastructure' | 'Analytics' | 'Database' | 'Utility' | 'PaaS' | 'Blogs' | 'Advertising Network';
  iconName: string; // Map to a Lucide icon
  description: string;
  confidence: number; // base confidence percentage (e.g., 90-100)
  website: string;
  advantages: string[];
  alternatives: string[];
  
  // Detection rules
  patterns: {
    headers?: { [key: string]: string }; // header key -> regex string pattern
    html?: string[]; // regex string patterns inside HTML
    scripts?: string[]; // script src pattern regex strings
    meta?: { [key: string]: string }; // meta tag name/property -> content regex string
    cookies?: string[]; // cookie names
    env?: string[]; // global window variables (for content scripts)
  };
}

export interface WebpageMetadata {
  url: string;
  title: string;
  description: string;
  ipAddress: string;
  tlsVersion: string;
  country: string;
  serverHeader: string;
  latencyMs: number;
  screenshotUrl?: string;
}

export interface ScanResult {
  metadata: WebpageMetadata;
  technologies: {
    tech: TechnologyProfile;
    matchedBy: 'headers' | 'html' | 'scripts' | 'meta' | 'cookies' | 'env';
    version: string;
    evidence?: string[];
  }[];
  scannedAt: string;
  security?: {
    rating: string;
    checklist: { name: string; present: boolean }[];
    score: number;
  };
  dns?: {
    A?: string[];
    MX?: any[];
    TXT?: any[];
  };
  debug?: {
    timeline: { stage: string; timestamp: number; details: string }[];
    rejected: { slug: string; name: string; reason: string }[];
    inspectedHeaders: Record<string, string>;
    cookies: string[];
    scripts: string[];
    meta: Record<string, string>;
  };
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}
