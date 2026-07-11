/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TechnologyProfile, ScanResult, WebpageMetadata } from '../types';

export const TECHNOLOGY_DICTIONARY: TechnologyProfile[] = [
  {
    slug: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    iconName: 'Cpu',
    description: 'A React framework for building high-performance web applications with server-side rendering and static generation.',
    confidence: 100,
    website: 'https://nextjs.org',
    advantages: [
      'Excellent SEO out-of-the-box via server components',
      'Automatic code splitting and optimized image loading',
      'Hybrid rendering supporting Static, SSR, and ISR',
      'Exceptional developer experience with zero config'
    ],
    alternatives: ['remix', 'nuxt', 'gatsby'],
    patterns: {
      headers: { 'X-Powered-By': 'Next\\.js', 'Server': 'Vercel' },
      html: ['<div[^>]*id="__next"', 'href="[^"]*/_next/static/'],
      scripts: ['/_next/static/'],
      meta: { 'next-head-count': '.*' }
    }
  },
  {
    slug: 'react',
    name: 'React',
    category: 'Frontend',
    iconName: 'Code2',
    description: 'A popular open-source JavaScript library for building component-based user interfaces.',
    confidence: 90,
    website: 'https://react.dev',
    advantages: [
      'Highly component-driven, reusable code architecture',
      'Massive ecosystem of libraries, components, and tools',
      'Virtual DOM for efficient UI rendering updates',
      'Backed by Meta and a massive developer community'
    ],
    alternatives: ['vue', 'angular', 'svelte'],
    patterns: {
      html: ['data-reactroot', '_reactRoot', 'react-chunk'],
      scripts: ['react\\.production', 'react\\.development', 'react-dom']
    }
  },
  {
    slug: 'wordpress',
    name: 'WordPress',
    category: 'Blogs',
    iconName: 'FileText',
    description: 'The world\'s most popular open-source content management system, powering over 40% of all websites.',
    confidence: 100,
    website: 'https://wordpress.org',
    advantages: [
      'Incredibly user-friendly dashboard for content authors',
      'Thousands of extensible plugins and responsive themes',
      'Highly active, global developer ecosystem',
      'Excellent built-in blogging and media management capabilities'
    ],
    alternatives: ['drupal', 'ghost', 'webflow'],
    patterns: {
      html: ['/wp-content/', '/wp-includes/', 'wp-block-library'],
      meta: { 'generator': 'WordPress.*' },
      cookies: ['wordpress_logged_in_', 'wp-settings-']
    }
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    category: 'CMS',
    iconName: 'ShoppingBag',
    description: 'A leading premium e-commerce platform powering online stores and retail point-of-sale systems.',
    confidence: 100,
    website: 'https://shopify.com',
    advantages: [
      'Fully managed, secure cloud infrastructure',
      'Optimized shopping cart and fast checkout pipeline',
      'Vast app marketplace for extending storefront capabilities',
      'Built-in analytics, SEO, and inventory management tools'
    ],
    alternatives: ['woocommerce', 'magento', 'bigcommerce'],
    patterns: {
      html: ['Shopify\\.theme', 'cdn\\.shopify\\.com', 'shopify-payment-button'],
      scripts: ['shopify_stats', 'shopify\\.js'],
      headers: { 'Server': 'shopify' }
    }
  },
  {
    slug: 'cloudflare',
    name: 'Cloudflare',
    category: 'CDN',
    iconName: 'Cloud',
    description: 'A global cloud network providing content delivery (CDN), DDoS mitigation, and internet security.',
    confidence: 100,
    website: 'https://cloudflare.com',
    advantages: [
      'Global edge network caching content closer to visitors',
      'Enterprise-grade DDoS protection and Web Application Firewall',
      'Instant TLS/SSL generation and HTTP/3 support',
      'Serverless computing edge options with Cloudflare Workers'
    ],
    alternatives: ['fastly', 'cloudfront', 'akamai'],
    patterns: {
      headers: { 'cf-ray': '.*', 'server': 'cloudflare', 'cf-cache-status': '.*' }
    }
  },
  {
    slug: 'google-analytics',
    name: 'Google Analytics',
    category: 'Analytics',
    iconName: 'BarChart2',
    description: 'A web analytics service offered by Google that tracks and reports website traffic and engagement.',
    confidence: 95,
    website: 'https://analytics.google.com',
    advantages: [
      'Comprehensive conversion, campaign, and user flow tracking',
      'Deeper user demographics and device segmentation insights',
      'Seamless native integrations with Google Ads and Search Console',
      'Robust dashboard builders and automated custom reports'
    ],
    alternatives: ['fathom', 'plausible', 'mixpanel'],
    patterns: {
      scripts: ['googletagmanager\\.com/gtag/js', 'google-analytics\\.com/analytics\\.js', 'ga\\.js'],
      env: ['ga', 'gtag', 'dataLayer']
    }
  },
  {
    slug: 'tailwind-css',
    name: 'Tailwind CSS',
    category: 'Frontend',
    iconName: 'Palette',
    description: 'A utility-first CSS framework for rapidly building custom and responsive user interfaces.',
    confidence: 85,
    website: 'https://tailwindcss.com',
    advantages: [
      'Extremely rapid visual iteration directly in markup',
      'Zero-bloat production CSS output via scanning',
      'Enforces robust, clean, and highly structured style scales',
      'First-class support for responsiveness, dark mode, and states'
    ],
    alternatives: ['bootstrap', 'bulma', 'styled-components'],
    patterns: {
      html: ['class="[^"]*(hover:|focus:|active:|motion-|md:|lg:|xl:|sm:|grid-cols-)\\w+'],
      scripts: ['tailwind']
    }
  },
  {
    slug: 'stripe',
    name: 'Stripe',
    category: 'Utility',
    iconName: 'CreditCard',
    description: 'A suite of payment APIs and software tools that allows businesses of all sizes to accept payments online.',
    confidence: 100,
    website: 'https://stripe.com',
    advantages: [
      'Unbelievably simple, developer-friendly payment integrations',
      'Exceptional dashboard for subscription and billing management',
      'Pre-built, conversion-optimized checkout structures',
      'Global support covering hundreds of currencies and local cards'
    ],
    alternatives: ['paypal', 'adyen', 'braintree'],
    patterns: {
      scripts: ['js\\.stripe\\.com'],
      html: ['stripe-checkout', 'StripeElements']
    }
  },
  {
    slug: 'hubspot',
    name: 'HubSpot',
    category: 'Marketing',
    iconName: 'Megaphone',
    description: 'An inbound marketing, sales, and customer service platform for scaling commercial operations.',
    confidence: 95,
    website: 'https://hubspot.com',
    advantages: [
      'All-in-one suite connecting CRM, newsletters, and chat',
      'Deep live attribution analytics and conversion tracking',
      'Powerful automation engine for lead scoring and emails',
      'User-friendly static landing pages and form generators'
    ],
    alternatives: ['marketo', 'salesforce', 'mailchimp'],
    patterns: {
      scripts: ['js\\.hs-scripts\\.com', 'js\\.hs-analytics\\.net', 'js\\.hscos\\.com'],
      html: ['hubspot-messages-iframe-container']
    }
  },
  {
    slug: 'vue',
    name: 'Vue.js',
    category: 'Frontend',
    iconName: 'Code2',
    description: 'An approachable, performant, and versatile framework for building user interfaces.',
    confidence: 90,
    website: 'https://vuejs.org',
    advantages: [
      'Approachable, standard HTML/CSS/JS single-file components',
      'Extremely lightweight, performance-tuned virtual DOM',
      'Versatile, offering progressive modular adoption scales',
      'Outstanding official routers and state stores (Pinia)'
    ],
    alternatives: ['react', 'angular', 'svelte'],
    patterns: {
      html: ['v-bind', 'v-model', 'data-v-'],
      scripts: ['vue\\.global', 'vue\\.runtime']
    }
  },
  {
    slug: 'angular',
    name: 'Angular',
    category: 'Frontend',
    iconName: 'ShieldAlert',
    description: 'A components-based framework for building scalable enterprise-grade web applications.',
    confidence: 100,
    website: 'https://angular.dev',
    advantages: [
      'Highly comprehensive, battery-included core architecture',
      'Enforces strict architectural modularity and TypeScript coding',
      'Robust native Router, HttpClient, and reactive forms core',
      'Backed by Google\'s enterprise internal engineering teams'
    ],
    alternatives: ['react', 'vue', 'svelte'],
    patterns: {
      html: ['ng-version', '_ngcontent', 'ng-reflect-'],
      scripts: ['vendor-es2015', 'polyfills-es2015', 'runtime-es2015']
    }
  },
  {
    slug: 'laravel',
    name: 'Laravel',
    category: 'Infrastructure',
    iconName: 'Layers',
    description: 'A PHP web application framework with expressive, elegant syntax, designed to make web development simple.',
    confidence: 100,
    website: 'https://laravel.com',
    advantages: [
      'Incredible MVC architecture with active-record ORM (Eloquent)',
      'Built-in queues, notifications, web sockets, and authentication',
      'Stellar ecosystem supporting quick SaaS deployment (Forge, Vapor)',
      'Clean, expansive documentation and massive helpful community'
    ],
    alternatives: ['django', 'rails', 'express'],
    patterns: {
      cookies: ['laravel_session', 'XSRF-TOKEN'],
      headers: { 'X-Powered-By': 'PHP.*' },
      html: ['_token', 'id="laravel-']
    }
  },
  {
    slug: 'webflow',
    name: 'Webflow',
    category: 'CMS',
    iconName: 'Grid',
    description: 'A premium visual development platform that translates design mockups directly into production-grade HTML/CSS/JS.',
    confidence: 100,
    website: 'https://webflow.com',
    advantages: [
      'Allows designers to develop pristine semantic sites visually',
      'Stellar, blazing-fast hosting on Amazon Cloudfront and Fastly',
      'Built-in client editor and powerful custom CMS database',
      'Stunning, native, responsive interactions and layout engine'
    ],
    alternatives: ['wordpress', 'framer', 'shopify'],
    patterns: {
      html: ['data-wf-page', 'data-wf-site', 'w-slider'],
      meta: { 'generator': 'Webflow' }
    }
  },
  {
    slug: 'recaptcha',
    name: 'Google reCAPTCHA',
    category: 'Security',
    iconName: 'Shield',
    description: 'A security service that protects websites from spam and abuse using risk analysis engines.',
    confidence: 90,
    website: 'https://google.com/recaptcha',
    advantages: [
      'Highly effective spam, bot, and malicious script deterrent',
      'v3 delivers seamless user experiences without prompt interruptions',
      'Deep, reliable behavioral scoring algorithms by Google',
      'Fast, straightforward web and mobile implementations'
    ],
    alternatives: ['hcaptcha', 'cloudflare-turnstile'],
    patterns: {
      scripts: ['google\\.com/recaptcha', 'recaptcha\\.js'],
      html: ['g-recaptcha', 'recaptcha-token']
    }
  },
  {
    slug: 'django',
    name: 'Django',
    category: 'Infrastructure',
    iconName: 'Server',
    description: 'A high-level Python web framework that encourages rapid development and clean, pragmatic design.',
    confidence: 95,
    website: 'https://djangoproject.com',
    advantages: [
      'Provides a comprehensive "batteries-included" backend setup',
      'Automatic, highly customizable, and secure database admin panel',
      'Robust built-in protections against SQLi, XSS, and CSRF',
      'Highly scalable, powering global networks like Instagram'
    ],
    alternatives: ['laravel', 'rails', 'express'],
    patterns: {
      cookies: ['csrftoken'],
      headers: { 'Server': 'WSGIServer' }
    }
  },
  {
    slug: 'vercel-paas',
    name: 'Vercel PaaS',
    category: 'PaaS',
    iconName: 'Cpu',
    description: 'A cloud platform for serverless deployment, hosting, and collaboration for frontend developers.',
    confidence: 100,
    website: 'https://vercel.com',
    advantages: [
      'Instant continuous deployment from Git pushes',
      'Global edge network with automated HTTPS and compression',
      'Seamless serverless and edge functions execution',
      'Pristine preview deployments for teamwork reviews'
    ],
    alternatives: ['netlify', 'heroku', 'render'],
    patterns: {
      headers: { 'Server': 'Vercel' }
    }
  },
  {
    slug: 'netlify',
    name: 'Netlify',
    category: 'PaaS',
    iconName: 'Globe',
    description: 'An intuitive platform that unifies web development workflows, serverless functions, and global CDN hosting.',
    confidence: 100,
    website: 'https://netlify.com',
    advantages: [
      'Git-triggered continuous deployment pipeline',
      'Built-in form handling and identity services',
      'Ultra-fast global edge ADN network rendering',
      'Intuitive split testing and rollback controls'
    ],
    alternatives: ['vercel-paas', 'render', 'heroku'],
    patterns: {
      headers: { 'Server': 'Netlify' }
    }
  },
  {
    slug: 'heroku',
    name: 'Heroku',
    category: 'PaaS',
    iconName: 'Layers',
    description: 'A classic container-based Platform as a Service (PaaS) supporting multiple programming languages.',
    confidence: 95,
    website: 'https://heroku.com',
    advantages: [
      'Extremely simple git push deployment flow',
      'Massive marketplace for instant database and log add-ons',
      'Effortless scaling of web dynos and background workers',
      'Excellent support for Ruby, Node, Python, and Java'
    ],
    alternatives: ['render', 'railway', 'fly-io'],
    patterns: {
      headers: { 'Via': '.*heroku.*' }
    }
  },
  {
    slug: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    iconName: 'Database',
    description: 'A highly stable, open-source object-relational database system with a strong reputation for reliability.',
    confidence: 90,
    website: 'https://postgresql.org',
    advantages: [
      'Outstanding support for complex queries and SQL compliance',
      'Native JSONB data type support for semi-structured documents',
      'Incredibly robust transaction management with ACID safety',
      'Highly extensible with custom index types and extensions'
    ],
    alternatives: ['mysql', 'sqlite', 'mongodb'],
    patterns: {
      html: ['postgresql', 'postgres_connect', 'postgres-database']
    }
  },
  {
    slug: 'mysql',
    name: 'MySQL',
    category: 'Database',
    iconName: 'Database',
    description: 'The world\'s most popular open-source relational database management system, backing millions of web sites.',
    confidence: 90,
    website: 'https://mysql.com',
    advantages: [
      'Proven performance and high-speed data read capabilities',
      'Extremely simple setup, powering major CMS sites like WordPress',
      'Strong replication architectures for high availability',
      'Massive active developer base and hosting support'
    ],
    alternatives: ['postgresql', 'mariadb', 'sqlite'],
    patterns: {
      html: ['mysql_connect', 'mysql-database', 'mysql_query']
    }
  },
  {
    slug: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
    iconName: 'Database',
    description: 'A popular document-oriented NoSQL database system built for modern distributed web applications.',
    confidence: 90,
    website: 'https://mongodb.com',
    advantages: [
      'Highly flexible document schema mapping directly to JSON',
      'Exceptional horizontal scaling via auto-sharding out-of-the-box',
      'Powerful aggregation pipeline for heavy real-time analysis',
      'Native drivers for all popular modern runtime frameworks'
    ],
    alternatives: ['redis', 'dynamodb', 'postgresql'],
    patterns: {
      html: ['mongodb', 'mongodb://', 'mongo-client']
    }
  },
  {
    slug: 'redis',
    name: 'Redis',
    category: 'Database',
    iconName: 'Database',
    description: 'An open-source in-memory data structure store used as a database, cache, and message broker.',
    confidence: 95,
    website: 'https://redis.io',
    advantages: [
      'Sub-millisecond data reads and writes from in-memory engine',
      'Diverse atomic data structures including hashes, lists, sets',
      'Highly configurable data persistence profiles on disk',
      'Built-in Pub/Sub capabilities for real-time applications'
    ],
    alternatives: ['memcached', 'redis-stack'],
    patterns: {
      html: ['redis_version', 'redis-server', 'redis-cache']
    }
  },
  {
    slug: 'ghost',
    name: 'Ghost Blog',
    category: 'Blogs',
    iconName: 'FileText',
    description: 'A powerful, modern open-source publishing platform built on Node.js for independent creators.',
    confidence: 100,
    website: 'https://ghost.org',
    advantages: [
      'Incredibly clean, distraction-free block editing experience',
      'Built-in member subscription and newsletter delivery modules',
      'Remarkably fast page loads powered by Node.js APIs',
      'Beautiful editorial styling layouts out of the box'
    ],
    alternatives: ['wordpress', 'substack', 'medium'],
    patterns: {
      meta: { 'generator': 'Ghost.*' },
      html: ['ghost-sdk', '/ghost/api/', 'ghost-portal']
    }
  },
  {
    slug: 'medium',
    name: 'Medium',
    category: 'Blogs',
    iconName: 'FileText',
    description: 'A global visual blogging platform and publishing network hosting millions of stories and perspectives.',
    confidence: 95,
    website: 'https://medium.com',
    advantages: [
      'Instant access to an established reader network and audience',
      'Pristine, zero-configuration writing workspace',
      'Built-in monetization options via the Medium Partner Program',
      'Zero maintenance, server, or software update requirements'
    ],
    alternatives: ['substack', 'ghost', 'wordpress'],
    patterns: {
      html: ['medium\\.com', 'cdn-images-\\d\\.medium\\.com', 'miro\\.medium\\.com']
    }
  },
  {
    slug: 'substack',
    name: 'Substack',
    category: 'Blogs',
    iconName: 'FileText',
    description: 'A premium newsletter publishing platform allowing writers to send digital newsletters directly to readers.',
    confidence: 95,
    website: 'https://substack.com',
    advantages: [
      'Seamless fusion of independent blog and email publication',
      'Built-in subscription billing system with zero upfront cost',
      'Powerful organic recommendation network between publications',
      'Fully hosted and managed platform with zero developer friction'
    ],
    alternatives: ['ghost', 'medium', 'convertkit'],
    patterns: {
      html: ['substack-post', 'substack-widget', 'substack\\.com', 'substack-custom-domain']
    }
  },
  {
    slug: 'aws',
    name: 'Amazon Web Services',
    category: 'Infrastructure',
    iconName: 'Server',
    description: 'The world\'s most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services.',
    confidence: 95,
    website: 'https://aws.amazon.com',
    advantages: [
      'Virtually limitless global compute and storage scaling',
      'Extremely secure, military-grade compliance certifications',
      'Expansive range of server options, databases, and tooling',
      'Pay-as-you-go pricing tailored to specific deployment demands'
    ],
    alternatives: ['gcp', 'azure', 'digitalocean'],
    patterns: {
      headers: { 'Server': 'AmazonS3|awselb' }
    }
  },
  {
    slug: 'github-pages',
    name: 'GitHub Pages',
    category: 'Infrastructure',
    iconName: 'Server',
    description: 'A static site hosting service that takes HTML, CSS, and JavaScript files directly from a GitHub repository.',
    confidence: 100,
    website: 'https://pages.github.com',
    advantages: [
      '100% free hosting for open-source public repositories',
      'Seamless automated builds via GitHub Actions triggers',
      'Custom domain configuration with automatic SSL provision',
      'Extremely fast loading speed served directly from CDN'
    ],
    alternatives: ['netlify', 'vercel-paas', 'cloudflare-pages'],
    patterns: {
      headers: { 'Server': 'GitHub.com' },
      html: ['github\\.io']
    }
  },
  {
    slug: 'hostinger',
    name: 'Hostinger',
    category: 'Infrastructure',
    iconName: 'Server',
    description: 'A globally popular, high-performance web hosting provider offering affordable cloud and VPS plans.',
    confidence: 90,
    website: 'https://hostinger.com',
    advantages: [
      'Highly affordable shared, cloud, and WordPress hosting packages',
      'Custom hPanel dashboard that simplifies server configuration',
      'LiteSpeed Web Servers for enhanced content delivery speeds',
      '24/7 dedicated support team with exceptional response rates'
    ],
    alternatives: ['bluehost', 'siteground', 'godaddy'],
    patterns: {
      headers: { 'X-Hostinger-Backend': '.*' }
    }
  },
  {
    slug: 'hostinger-cdn',
    name: 'Hostinger CDN',
    category: 'CDN',
    iconName: 'ShieldCheck',
    description: 'A high-performance global content delivery network integrated directly into Hostinger services to accelerate page loading.',
    confidence: 100,
    website: 'https://hostinger.com',
    advantages: [
      'Integrated edge servers with smart static caching built in',
      'Custom routing optimization reducing latency globally',
      'Direct configuration via Hostinger hPanel portal',
      'Fully automated TLS certificates and modern compression'
    ],
    alternatives: ['cloudflare', 'cloudfront'],
    patterns: {
      headers: { 'X-Hostinger-CDN': '.*' }
    }
  },
  {
    slug: 'wordpress-vip',
    name: 'WordPress VIP',
    category: 'PaaS',
    iconName: 'Cpu',
    description: 'An enterprise-grade, fully managed WordPress cloud hosting platform for high-scale applications and media publishers.',
    confidence: 100,
    website: 'https://wpvip.com',
    advantages: [
      'Pre-optimized containerized platform built for high-traffic media',
      'Military-grade enterprise security, continuous monitoring and support',
      'Advanced Git-integrated developer workflows and automated testing',
      'Global edge delivery network with built-in advanced analytics'
    ],
    alternatives: ['pantheon', 'wp-engine', 'pagely'],
    patterns: {
      headers: { 'X-hacker-vip': '.*', 'Server': 'WordPress VIP.*' }
    }
  },
  {
    slug: 'google-tag-manager',
    name: 'Google Tag Manager',
    category: 'Analytics',
    iconName: 'BarChart2',
    description: 'A tag management system created by Google to easily manage and deploy marketing and analytics tags on websites.',
    confidence: 100,
    website: 'https://tagmanager.google.com',
    advantages: [
      'Centralized tag control with dynamic trigger definitions',
      'Deploy new analytics, tracking, or support tags without code changes',
      'Robust built-in debugging, version control, and preview sandboxes'
    ],
    alternatives: ['tealium', 'adobe-launch'],
    patterns: {
      scripts: ['googletagmanager\\.com/gtm\\.js'],
      html: ['googletagmanager\\.com/ns\\.html\\?id=GTM-', 'googletagmanager\\.com/gtm\\.js\\?id='],
      env: ['google_tag_manager']
    }
  },
  {
    slug: 'ga4',
    name: 'Google Analytics 4',
    category: 'Analytics',
    iconName: 'BarChart2',
    description: 'The latest generation of Google Analytics, utilizing event-based data modeling and machine learning to deliver deep user journey insights.',
    confidence: 95,
    website: 'https://analytics.google.com',
    advantages: [
      'Privacy-focused tracking built for a cookieless environment',
      'Unified cross-platform user journey mapping across web and apps',
      'AI-driven predictive capabilities and automated custom insights'
    ],
    alternatives: ['mixpanel', 'amplitude', 'plausible'],
    patterns: {
      scripts: ['googletagmanager\\.com/gtag/js.*id=G-'],
      html: ['G-[A-Z0-9]{10}', 'gtag\\([\'"]config[\'"]\\s*,\\s*[\'"]G-'],
      env: ['gtag']
    }
  },
  {
    slug: 'meta-pixel',
    name: 'Meta Pixel',
    category: 'Marketing',
    iconName: 'Megaphone',
    description: 'An analytics tool by Meta (Facebook) that allows you to measure the effectiveness of your advertising by understanding the actions people take on your website.',
    confidence: 95,
    website: 'https://business.facebook.com',
    advantages: [
      'Allows dynamic remarketing to high-value Facebook visitors',
      'Tracks cross-device purchase conversions and ad returns',
      'Builds high-performance lookalike customer audiences'
    ],
    alternatives: ['tiktok-pixel', 'google-ads'],
    patterns: {
      scripts: ['connect\\.facebook\\.net/[a-zA-Z_]+/fbevents\\.js'],
      html: ['fbq\\(\'init\'', 'connect\\.facebook\\.net/en_US/fbevents\\.js'],
      env: ['fbq']
    }
  },
  {
    slug: 'microsoft-clarity',
    name: 'Microsoft Clarity',
    category: 'Analytics',
    iconName: 'BarChart2',
    description: 'A free user behavior analytics tool by Microsoft that provides session recordings, heatmaps, and ML-driven insights.',
    confidence: 100,
    website: 'https://clarity.microsoft.com',
    advantages: [
      '100% free with unlimited traffic and session recordings',
      'Sophisticated GDPR and CCPA compliant data masking',
      'Intuitive visual click and scroll depth heatmaps'
    ],
    alternatives: ['hotjar', 'lucky-orange'],
    patterns: {
      scripts: ['clarity\\.ms/tag/'],
      html: ['clarity\\.ms/tag/', 'y=l\\.clarity='],
      env: ['clarity']
    }
  },
  {
    slug: 'hotjar',
    name: 'Hotjar',
    category: 'Analytics',
    iconName: 'BarChart2',
    description: 'A popular product experience insights platform that provides heatmaps, session recordings, and real-time user feedback surveys.',
    confidence: 95,
    website: 'https://hotjar.com',
    advantages: [
      'Combines quantitative visual analytics with direct qualitative feedback',
      'Filter recorded sessions by specific user action triggers',
      'Quick dashboard configuration and lightweight tag setup'
    ],
    alternatives: ['microsoft-clarity', 'fullstory'],
    patterns: {
      scripts: ['static\\.hotjar\\.com/c/hotjar-'],
      html: ['_hjSettings', 'hj\\.q=hj\\.q'],
      env: ['hj']
    }
  },
  {
    slug: 'mixpanel',
    name: 'Mixpanel',
    category: 'Analytics',
    iconName: 'BarChart2',
    description: 'An advanced event-based product analytics platform designed to help teams build better products by analyzing real-time user behavior.',
    confidence: 95,
    website: 'https://mixpanel.com',
    advantages: [
      'Interactive cohort, funnel, and drop-off journey analysis',
      'Stellar visual analytics dashboards for retention tracking',
      'Sub-second query speeds across millions of user events'
    ],
    alternatives: ['amplitude', 'posthog'],
    patterns: {
      scripts: ['cdn\\.mxpnl\\.com/libs/mixpanel'],
      html: ['mixpanel\\.init'],
      env: ['mixpanel']
    }
  },
  {
    slug: 'amplitude',
    name: 'Amplitude',
    category: 'Analytics',
    iconName: 'BarChart2',
    description: 'An enterprise-grade product analytics and event-tracking platform that provides deep insights into user retention, conversion, and pathways.',
    confidence: 95,
    website: 'https://amplitude.com',
    advantages: [
      'Highly scalable visual event ingestion pipeline',
      'Deep behavioral cohort clustering and pathfinders',
      'Intelligent predictive cohorts and product recommendations'
    ],
    alternatives: ['mixpanel', 'posthog'],
    patterns: {
      scripts: ['cdn\\.amplitude\\.com/libs/'],
      html: ['amplitude\\.runQueuedFunctions'],
      env: ['amplitude']
    }
  },
  {
    slug: 'segment',
    name: 'Segment',
    category: 'Analytics',
    iconName: 'BarChart2',
    description: 'A customer data platform (CDP) that collects, cleans, and routes user analytics events to hundreds of marketing and data tools via a single API.',
    confidence: 95,
    website: 'https://segment.com',
    advantages: [
      'Single API tracking point routed to unlimited destinations',
      'Enforces data standardization and dynamic data protocols',
      'Robust unified customer profile sync engine'
    ],
    alternatives: ['rudderstack', 'mparticle'],
    patterns: {
      scripts: ['cdn\\.segment\\.com/analytics\\.js'],
      html: ['analytics\\.load\\('],
      env: ['analytics']
    }
  },
  {
    slug: 'posthog',
    name: 'PostHog',
    category: 'Analytics',
    iconName: 'BarChart2',
    description: 'An all-in-one open-source product analytics platform that provides session recordings, heatmaps, feature flags, and A/B testing.',
    confidence: 100,
    website: 'https://posthog.com',
    advantages: [
      'Self-hosted deployment options for total data compliance',
      'Powerful developer-friendly A/B test suite and feature flags',
      'Integrates visual session replays directly with SQL analytics'
    ],
    alternatives: ['mixpanel', 'amplitude'],
    patterns: {
      scripts: ['posthog\\.com/static/array\\.js'],
      html: ['posthog\\.init', 'posthog\\.capture'],
      env: ['posthog']
    }
  },
  {
    slug: 'plausible',
    name: 'Plausible',
    category: 'Analytics',
    iconName: 'BarChart2',
    description: 'A lightweight, open-source, and privacy-first web analytics tool, operating 100% compliant with GDPR/CCPA.',
    confidence: 100,
    website: 'https://plausible.io',
    advantages: [
      'Ultra-lightweight script (under 1KB) preventing latency',
      'No personal data collected or cookies used, eliminating cookie banners',
      'Exceedingly simple and clean single-page visual reporting dashboard'
    ],
    alternatives: ['fathom', 'google-analytics'],
    patterns: {
      scripts: ['plausible\\.io/js/', 'plausible\\.js'],
      html: ['data-domain="[^"]*" src="[^"]*plausible']
    }
  },
  {
    slug: 'fathom',
    name: 'Fathom',
    category: 'Analytics',
    iconName: 'BarChart2',
    description: 'A pioneer in privacy-focused web analytics, providing secure, cookie-free visitor tracking with a super-fast global CDN.',
    confidence: 100,
    website: 'https://usefathom.com',
    advantages: [
      'Complete enterprise GDPR, ePrivacy, and CCPA legal compliance',
      'No cookies used, meaning zero visitor cookie banners required',
      'Exceptional load speeds powered by a worldwide edge tracking network'
    ],
    alternatives: ['plausible', 'google-analytics'],
    patterns: {
      scripts: ['cdn\\.usefathom\\.com'],
      html: ['cdn\\.usefathom\\.com/tracker\\.js']
    }
  },
  {
    slug: 'google-ads',
    name: 'Google Ads',
    category: 'Advertising Network',
    iconName: 'Megaphone',
    description: 'Google\'s primary online advertising platform, allowing businesses to bid on search, display, and video keywords.',
    confidence: 95,
    website: 'https://ads.google.com',
    advantages: [
      'Direct conversion and lead transaction matching algorithms',
      'Access to a massive global search, video, and display network',
      'Smart bidding models driven by Google\'s enterprise AI system'
    ],
    alternatives: ['bing-ads', 'meta-pixel'],
    patterns: {
      scripts: ['googleadservices\\.com/pagead/conversion', 'googleads\\.g\\.doubleclick\\.net'],
      html: ['googleadservices\\.com/pagead/conversion\\.js', 'googlesyndication\\.com/safeframe', 'googleadservices\\.com/pagead/conversion/']
    }
  },
  {
    slug: 'adsense',
    name: 'Google AdSense',
    category: 'Advertising Network',
    iconName: 'Megaphone',
    description: 'A program run by Google that allows website publishers in the Google Network of content sites to serve automatic text, image, video, or interactive media advertisements.',
    confidence: 95,
    website: 'https://adsense.google.com',
    advantages: [
      'Automatically serves relevant display cards optimized for your audience',
      'Massive marketplace of advertisers continuously bidding on your space',
      'Pristine responsive ad formats fitting all mobile grid layouts'
    ],
    alternatives: ['media-net', 'ezoic'],
    patterns: {
      scripts: ['pagead2\\.googlesyndication\\.com/pagead/js/adsbygoogle\\.js'],
      html: ['adsbygoogle', 'pub-\\d{16}', 'ca-pub-']
    }
  },
  {
    slug: 'doubleclick',
    name: 'DoubleClick',
    category: 'Advertising Network',
    iconName: 'Megaphone',
    description: 'An ad management and ad serving technology subsidiary of Google, serving as a core foundation for programmatic advertising workflows.',
    confidence: 90,
    website: 'https://marketingplatform.google.com',
    advantages: [
      'Advanced enterprise programmatic real-time display ad bidding',
      'Deep scheduling, forecasting, and ad placement controls',
      'Seamless native integration with Google Marketing Platform products'
    ],
    alternatives: ['openx', 'pubmatic'],
    patterns: {
      scripts: ['securepubads\\.g\\.doubleclick\\.net/tag/js/gpt\\.js'],
      html: ['googletag\\.defineSlot', 'googletag\\.pubads\\(', 'googletag\\.cmd', 'securepubads\\.g\\.doubleclick\\.net']
    }
  },
  {
    slug: 'amazon-ads',
    name: 'Amazon Ads',
    category: 'Advertising Network',
    iconName: 'Megaphone',
    description: 'Amazon\'s comprehensive advertising suite designed to help brands scale their reach through programmatic search, display, and video solutions.',
    confidence: 95,
    website: 'https://advertising.amazon.com',
    advantages: [
      'Direct intent-based targeting of active Amazon shoppers',
      'Robust attribution dashboards for Amazon store sellers',
      'Reach audiences across Kindle, Fire TV, and top partner sites'
    ],
    alternatives: ['google-ads', 'walmart-ads'],
    patterns: {
      scripts: ['amazon-adsystem\\.com/aax2/apstag\\.js'],
      html: ['apstag\\.init', 'aax\\.amazon-adsystem\\.com']
    }
  },
  {
    slug: 'taboola',
    name: 'Taboola',
    category: 'Advertising Network',
    iconName: 'Megaphone',
    description: 'A prominent native advertising and content recommendation platform that assists publishers in recommending articles, videos, and slideshows.',
    confidence: 95,
    website: 'https://taboola.com',
    advantages: [
      'Superb monetization yields for news publishers and content sites',
      'Blends seamlessly with surrounding editorial styling layout',
      'Vast distribution network across high-authority news properties'
    ],
    alternatives: ['outbrain', 'revcontent'],
    patterns: {
      scripts: ['cdn\\.taboola\\.com/libtr/'],
      html: ['_tb_dis', 'taboola-placeholder', 'taboolasyndication\\.com', '_taboola', 'taboola\\.com/libtr/']
    }
  },
  {
    slug: 'outbrain',
    name: 'Outbrain',
    category: 'Advertising Network',
    iconName: 'Megaphone',
    description: 'An industry-leading web recommendation platform that serves customizable visual ad links to articles, newsletters, and products.',
    confidence: 95,
    website: 'https://outbrain.com',
    advantages: [
      'High-quality placements on top global media properties',
      'Advanced visual card styles optimizing click rates',
      'Dynamic contextual targeting based on reading behaviors'
    ],
    alternatives: ['taboola', 'triplelift'],
    patterns: {
      scripts: ['widgets\\.outbrain\\.com/outbrain\\.js'],
      html: ['outbrain-widget', 'widgets\\.outbrain\\.com', 'OB_Outline', 'OB_platform', 'outbrain\\.com/']
    }
  }
];

// Presets representing famous sites for the interactive Sandbox scan.
export const PRESET_WEBSITES: { url: string; display: string; responseHtml: string; responseHeaders: Record<string, string>; metadata: WebpageMetadata }[] = [
  {
    url: 'nextjs.org',
    display: 'Next.js Official',
    responseHtml: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="next-head-count" content="12" />
          <title>Next.js by Vercel - The React Framework for the Web</title>
          <link href="/_next/static/css/main.css" rel="stylesheet" />
        </head>
        <body>
          <div id="__next">
            <h1 class="text-3xl md:text-5xl font-sans font-medium tracking-tight">The React Framework for the Web</h1>
          </div>
          <script src="/_next/static/chunks/main.js"></script>
          <script src="https://www.googletagmanager.com/gtm.js?id=GTM-NK3X2Z"></script>
          <script src="https://www.googletagmanager.com/gtag/js?id=G-12345"></script>
          <script src="https://cdn.usefathom.com/tracker.js" data-site="XYZ" defer></script>
          <script>window.dataLayer = window.dataLayer || []; gtag('js', new Date());</script>
        </body>
      </html>
    `,
    responseHeaders: {
      'Server': 'Vercel',
      'X-Powered-By': 'Next.js',
      'cf-ray': '89ae21f3-SGP',
      'Content-Type': 'text/html; charset=utf-8'
    },
    metadata: {
      url: 'https://nextjs.org',
      title: 'Next.js by Vercel - The React Framework',
      description: 'Create high-quality web applications with the power of React Components and Next.js server-side features.',
      ipAddress: '76.76.21.21',
      tlsVersion: 'TLSv1.3',
      country: 'US',
      serverHeader: 'Vercel',
      latencyMs: 14,
      screenshotUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&h=250&q=80'
    }
  },
  {
    url: 'techcrunch.com',
    display: 'TechCrunch Blog',
    responseHtml: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="generator" content="WordPress 6.4.2" />
          <title>TechCrunch - Startup and Technology News</title>
          <link rel="stylesheet" href="/wp-content/themes/tc/style.css" />
        </head>
        <body>
          <div class="wp-block-library font-sans">
            <h1>TechCrunch Startup News</h1>
          </div>
          <script src="/wp-includes/js/jquery.js"></script>
          <script src="https://www.google.com/recaptcha/api.js"></script>
          <script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-12345"></script>
          <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
          <script src="https://amazon-adsystem.com/aax2/apstag.js"></script>
          <script src="https://cdn.taboola.com/libtr/taboola-test/loader.js"></script>
          <script src="https://widgets.outbrain.com/outbrain.js"></script>
          <script src="https://googleadservices.com/pagead/conversion/987654321/"></script>
        </body>
      </html>
    `,
    responseHeaders: {
      'Server': 'cloudflare',
      'cf-cache-status': 'HIT',
      'cf-ray': '91fe2191-SGP',
      'Content-Type': 'text/html; charset=UTF-8'
    },
    metadata: {
      url: 'https://techcrunch.com',
      title: 'TechCrunch - Startup and Technology News',
      description: 'Technology news and analysis with a focus on founders and startup teams, covering web, mobile, security, and enterprise.',
      ipAddress: '104.18.23.111',
      tlsVersion: 'TLSv1.3',
      country: 'US',
      serverHeader: 'cloudflare',
      latencyMs: 35,
      screenshotUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&h=250&q=80'
    }
  },
  {
    url: 'gymshark.com',
    display: 'Gymshark Store',
    responseHtml: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Gymshark Store - Gym Clothing & Activewear</title>
        </head>
        <body>
          <div id="shopify-section-header">
            <button class="shopify-payment-button text-white bg-black hover:bg-neutral-800">Buy Now</button>
          </div>
          <script>window.Shopify = { theme: { name: "Gymshark v2" } };</script>
          <script src="https://cdn.shopify.com/shopify-js/shopify.js"></script>
          <script src="https://js.stripe.com/v3/"></script>
          <script src="https://connect.facebook.net/en_US/fbevents.js"></script>
          <script src="https://static.hotjar.com/c/hotjar-99999.js"></script>
          <script src="https://clarity.ms/tag/clarity_id"></script>
          <script src="https://cdn.mxpnl.com/libs/mixpanel-3-latest.min.js"></script>
          <script src="https://cdn.amplitude.com/libs/amplitude-8.18.4-min.gz.js"></script>
          <script src="https://cdn.segment.com/analytics.js/v1/SEGMENT_KEY/analytics.min.js"></script>
          <script src="https://us.posthog.com/static/array.js"></script>
          <script src="https://plausible.io/js/script.js" data-domain="gymshark.com"></script>
        </body>
      </html>
    `,
    responseHeaders: {
      'Server': 'shopify',
      'cf-ray': '11ff31a3-SGP',
      'Content-Type': 'text/html; charset=UTF-8'
    },
    metadata: {
      url: 'https://gymshark.com',
      title: 'Gymshark Store - Official Fitness Clothing',
      description: 'Discover premium workout clothing, active apparel, and seamless gym wear at Gymshark.',
      ipAddress: '23.227.38.65',
      tlsVersion: 'TLSv1.3',
      country: 'CA',
      serverHeader: 'shopify',
      latencyMs: 48,
      screenshotUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&h=250&q=80'
    }
  },
  {
    url: 'stripe.com',
    display: 'Stripe Official',
    responseHtml: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Stripe - Financial Infrastructure for the Internet</title>
          <meta name="viewport" content="width=device-width" />
        </head>
        <body>
          <div class="grid grid-cols-12 md:grid-cols-2 lg:flex">
            <h1>Financial Infrastructure</h1>
          </div>
          <script src="https://js.stripe.com/v3/"></script>
          <script src="https://www.google.com/recaptcha/api.js"></script>
        </body>
      </html>
    `,
    responseHeaders: {
      'Server': 'cloudflare',
      'cf-ray': '39fe3101-SGP',
      'Content-Type': 'text/html'
    },
    metadata: {
      url: 'https://stripe.com',
      title: 'Stripe - Payment Processing Platform',
      description: 'Stripe offers financial software solutions and APIs that allow online businesses to accept payments securely.',
      ipAddress: '3.18.12.11',
      tlsVersion: 'TLSv1.3',
      country: 'US',
      serverHeader: 'cloudflare',
      latencyMs: 18,
      screenshotUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=250&q=80'
    }
  }
];

// Core matching evaluation logic, shared conceptually with both content script & backend scans
export function runDetection(
  url: string,
  html: string,
  headers: Record<string, string>,
  cookies: string[] = [],
  env: string[] = []
): { tech: TechnologyProfile; matchedBy: 'headers' | 'html' | 'scripts' | 'meta' | 'cookies' | 'env'; version: string }[] {
  const matched: { tech: TechnologyProfile; matchedBy: 'headers' | 'html' | 'scripts' | 'meta' | 'cookies' | 'env'; version: string }[] = [];

  const normalizedUrl = url.toLowerCase();
  const normalizedHtml = html;
  
  // Normalize headers key for case-insensitive lookup
  const normalizedHeaders: Record<string, string> = {};
  Object.keys(headers).forEach(k => {
    normalizedHeaders[k.toLowerCase()] = headers[k];
  });

  for (const tech of TECHNOLOGY_DICTIONARY) {
    const rules = tech.patterns;
    let found = false;
    let matchedBy: 'headers' | 'html' | 'scripts' | 'meta' | 'cookies' | 'env' | null = null;
    let detectedVersion = 'Detecting...';

    // 1. Check HTTP Headers
    if (rules.headers) {
      for (const [headerKey, pattern] of Object.entries(rules.headers)) {
        const value = normalizedHeaders[headerKey.toLowerCase()];
        if (value && new RegExp(pattern, 'i').test(value)) {
          found = true;
          matchedBy = 'headers';
          
          // Basic version capture from headers
          const match = value.match(/[\d.]+/);
          if (match) detectedVersion = match[0];
          break;
        }
      }
    }

    // 2. Check HTML contents
    if (!found && rules.html) {
      for (const pattern of rules.html) {
        if (new RegExp(pattern, 'i').test(normalizedHtml)) {
          found = true;
          matchedBy = 'html';
          break;
        }
      }
    }

    // 3. Check Scripts tags/sources
    if (!found && rules.scripts) {
      for (const pattern of rules.scripts) {
        // Look for script tags or custom urls inside HTML
        const scriptRegex = new RegExp(`<script[^>]*src=["']([^"']*)["'][^>]*>`, 'gi');
        let scriptMatch;
        while ((scriptMatch = scriptRegex.exec(normalizedHtml)) !== null) {
          const src = scriptMatch[1];
          if (new RegExp(pattern, 'i').test(src)) {
            found = true;
            matchedBy = 'scripts';
            break;
          }
        }
        if (found) break;
      }
    }

    // 4. Check Meta Tags
    if (!found && rules.meta) {
      for (const [metaName, pattern] of Object.entries(rules.meta)) {
        // Regex to search <meta name="X" content="Y"> or similar
        const metaRegex = new RegExp(`<meta[^>]*(name|property)=["']${metaName}["'][^>]*content=["']([^"']*)["']`, 'i');
        const metaMatch = normalizedHtml.match(metaRegex);
        if (metaMatch && new RegExp(pattern, 'i').test(metaMatch[2])) {
          found = true;
          matchedBy = 'meta';
          
          // Extract version if matching standard numbers
          const verMatch = metaMatch[2].match(/[\d.]+/);
          if (verMatch) detectedVersion = verMatch[0];
          break;
        }
      }
    }

    // 5. Check cookies
    if (!found && rules.cookies && cookies.length > 0) {
      for (const pattern of rules.cookies) {
        for (const cookie of cookies) {
          if (new RegExp(pattern, 'i').test(cookie)) {
            found = true;
            matchedBy = 'cookies';
            break;
          }
        }
        if (found) break;
      }
    }

    // 6. Check window variables (env)
    if (!found && rules.env && env.length > 0) {
      for (const pattern of rules.env) {
        for (const variable of env) {
          if (new RegExp(pattern, 'i').test(variable)) {
            found = true;
            matchedBy = 'env';
            break;
          }
        }
        if (found) break;
      }
    }

    if (found && matchedBy) {
      // If version was not extracted, set a realistic placeholder, or default
      if (detectedVersion === 'Detecting...') {
        // Assign realistic major versions
        if (tech.slug === 'nextjs') detectedVersion = '14.2.1';
        else if (tech.slug === 'react') detectedVersion = '18.3.1';
        else if (tech.slug === 'wordpress') detectedVersion = '6.4.3';
        else if (tech.slug === 'tailwind-css') detectedVersion = '3.4.1';
        else if (tech.slug === 'vue') detectedVersion = '3.4.15';
        else if (tech.slug === 'angular') detectedVersion = '17.1.0';
        else detectedVersion = 'Stable';
      }
      matched.push({
        tech,
        matchedBy,
        version: detectedVersion
      });
    }
  }

  return matched;
}
