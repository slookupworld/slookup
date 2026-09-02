/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TechLogoProps {
  slug: string;
  className?: string;
}

export default function TechLogo({ slug, className = "h-5 w-5" }: TechLogoProps) {
  // Normalize slug to match keys
  const key = slug.toLowerCase().replace('.js', '').replace(' ', '-');

  // Direct high-fidelity colorful SVG maps
  switch (key) {
    case 'nextjs':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="64" fill="black" />
          <path d="M102.5 102.5L52.1 38.4H42.6V89.6H50.1V47.9L95 105.1C97.7 104.3 100.2 103.5 102.5 102.5Z" fill="white" />
          <rect x="82.1" y="38.4" width="7.5" height="51.2" fill="white" />
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'wordpress':
    case 'wordpress-vip':
      return (
        <svg viewBox="0 0 512 512" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="256" cy="256" r="256" fill="#21759B" />
          <path d="M256 26.5C129.5 26.5 26.5 129.5 26.5 256s103 229.5 229.5 229.5S485.5 382.5 485.5 256 382.5 26.5 256 26.5zm-5.5 391.2c-47.5 0-90.1-17.1-123.4-45.3l85.2-233.1 48.7 133.5 23.3-68.5-4.5-12.2h15.9l17.7 51.5 17-51.5h15.5l-21.7 60.1 23 68.5 42-123.4h11.9c.7 2.3 1.1 5.4.1 8.2-1.7 4.8-13.4 34.3-17.7 45.3L287.1 405c-11.2 8.3-24.1 12.7-36.6 12.7zm116.3-233.1c20.3-.7 31.8 17.5 31.8 38.6s-16.1 41-35 41c-15.5 0-25.1-13-25.1-30.7 0-19.1 11.2-48.9 28.3-48.9zM256 48.9c37.5 0 71.8 11 100.9 29.8l-52.7 151.4-32.9-90.1c4.8-.4 10.1-.6 10.1-.6 12.2-.7 12.2-19.1 0-18.4H214.3c-12.2-.7-12.2 17.7 0 18.4 0 0 7.8.2 12.9.4l41.6 113.8-24.7 72-74-216.5c24.5-18.1 54.4-28.8 85.9-28.8zm-162.2 207c0-26.1 6.5-50.6 17.8-72.3l74.9 218.4c-53.6-32.2-92.7-89.6-92.7-146.1z" fill="white" />
        </svg>
      );
    case 'shopify':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M112.5 35.8L93.1 12.2C91.4 10.1 88.8 8.9 86.1 8.9H41.9C39.2 8.9 36.6 10.1 34.9 12.2L15.5 35.8C14.5 37 14 38.5 14 40.1V109.1C14 114.6 18.5 119.1 24 119.1H104C109.5 119.1 114 114.6 114 109.1V40.1C114 38.5 113.5 37 112.5 35.8Z" fill="#96BF48" />
          <path d="M64 8.9C52.4 8.9 43 18.3 43 29.9V35.8H85V29.9C85 18.3 75.6 8.9 64 8.9ZM51.5 29.9C51.5 23 57.1 17.4 64 17.4C70.9 17.4 76.5 23 76.5 29.9V35.8H51.5V29.9Z" fill="#5E8E2D" />
          <path d="M46.5 73.1C46.5 60.1 54.2 55.4 64 55.4C73.8 55.4 81.5 60.1 81.5 73.1C81.5 83.9 74.3 88.9 69.1 91.4C63.2 94.2 58.4 96.1 58.4 100.9H51.9C51.9 92.4 56.4 89.2 61.5 86.8C67 84.2 75 80.9 75 73.1C75 64.9 69.8 61.9 64 61.9C58.2 61.9 53 64.9 53 73.1H46.5Z" fill="white" />
        </svg>
      );
    case 'cloudflare':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M117 63.8c0-10.2-8.3-18.4-18.5-18.4-1.2 0-2.4.1-3.6.4-3.6-11.4-14.2-19.8-26.8-19.8-9.9 0-18.6 5.1-23.7 12.9-2.3-1.6-5-2.6-8-2.6-7.5 0-13.6 6.1-13.6 13.6 0 .5.1 1 .2 1.5C14.7 54.9 8 62.1 8 70.8c0 9.7 7.9 17.6 17.6 17.6H114c7.7 0 14-6.3 14-14 0-4.8-2.4-9-6.1-11.5 2.1-2.2 3.1-5.1 3.1-7.1z" fill="#F38020" />
          <path d="M103.5 88.4H37.8c-1.4 0-2.6-1.1-2.6-2.6V63.5c0-1.4 1.1-2.6 2.6-2.6h65.7c1.4 0 2.6 1.1 2.6 2.6v22.3c0 1.5-1.2 2.6-2.6 2.6z" fill="none" />
        </svg>
      );
    case 'google-analytics':
    case 'ga4':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M108 108H20V20C20 15.6 23.6 12 28 12H100C104.4 12 108 15.6 108 20V108Z" fill="#F9AB00" fillOpacity="0.1" />
          <path d="M38 100V72C38 68.1 41.1 65 45 65C48.9 65 52 68.1 52 72V100H38Z" fill="#F9AB00" />
          <path d="M59 100V52C59 48.1 62.1 45 66 45C69.9 45 73 48.1 73 52V100H59Z" fill="#E37400" />
          <path d="M80 100V32C80 28.1 83.1 25 87 25C90.9 25 94 28.1 94 32V100H80Z" fill="#FFE082" />
        </svg>
      );
    case 'tailwind-css':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 42.6C48 42.6 37.3 50.6 32 66.6C42.7 56 50.7 58.6 56 64C61.3 69.3 69.3 77.3 85.3 77.3C101.3 77.3 112 69.3 117.3 53.3C106.7 64 98.7 61.3 93.3 56C88 50.6 80 42.6 64 42.6ZM32 77.3C16 77.3 5.3 85.3 0 101.3C10.7 90.7 18.7 93.3 24 98.6C29.3 104 37.3 112 53.3 112C69.3 112 80 104 85.3 88C74.7 98.6 66.7 96 61.3 90.6C56 85.3 48 77.3 32 77.3Z" fill="#38BDF8" />
        </svg>
      );
    case 'stripe':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#635BFF" />
          <path d="M68.5 45.4C68.5 41.5 65.1 39.8 59.8 39.8C52.4 39.8 45.9 42.6 45.9 42.6L43 32C43 32 50.9 28.4 61.3 28.4C75.8 28.4 82.5 35.6 82.5 45.2C82.5 60.1 62.3 62.4 62.3 69C62.3 72.1 65 73.7 69.7 73.7C76.9 73.7 84 70.3 84 70.3L86.9 81C86.9 81 78.5 85 68.6 85C54.4 85 48.3 78.1 48.3 68.9C48.3 53.4 68.5 51.5 68.5 45.4Z" fill="white" />
        </svg>
      );
    case 'hubspot':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="36" r="16" fill="#FF7A59" />
          <circle cx="36" cy="84" r="16" fill="#FF7A59" />
          <circle cx="92" cy="84" r="16" fill="#FF7A59" />
          <line x1="64" y1="36" x2="36" y2="84" stroke="#FF7A59" strokeWidth="8" />
          <line x1="64" y1="36" x2="92" y2="84" stroke="#FF7A59" strokeWidth="8" />
          <line x1="36" y1="84" x2="92" y2="84" stroke="#FF7A59" strokeWidth="8" />
          <circle cx="64" cy="68" r="10" fill="white" stroke="#FF7A59" strokeWidth="6" />
        </svg>
      );
    case 'svelte':
    case 'sveltekit':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M107 43.5c-4.8-13.8-17.5-23.7-32.3-25.1-4.8-.4-9.7.2-14.3 1.9-4 1.5-8.2 4.4-11.8 7.3l-18 15.3c-7.7 6.6-12.7 15.4-14.1 25.1-1.8 12.3 2.5 24.3 11.2 32.5 4.8 4.5 10.9 7.7 17.4 9 3.5.7 7.2.7 10.7 0 4.1-.8 7.9-2.6 11.4-4.8l18.5-12.5c6.3-4.3 11-10.4 13.5-17.4 3.1-8.7 2.4-18.4-2.2-26.3z" fill="#FF3E00" />
          <path d="M57.6 100.2c-5.8 0-11.3-2.6-14.9-7-3.8-4.7-5.1-11-3.6-16.8.8-3 2.3-5.7 4.5-7.9l18-15.3c3.2-2.7 6.9-4.8 11-5.9 4-.9 8.2-.8 12.1.5 5 1.7 9.1 5.3 11.4 10 1.9 3.8 2.3 8.2 1.3 12.3-1.1 4.7-3.9 8.7-7.8 11.3L69.1 94c-3.4 2.3-7.4 3.7-11.5 6.2z" fill="white" />
        </svg>
      );
    case 'astro':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#0C0F14" />
          <path d="M44 94c-2-2-4-5-4-9 0-7 6-12 12-12 4 0 7 2 9 4l15-28h-9c-2 0-3-1-3-3s1-3 3-3h15c2 0 3 1 3 3l-1 2-25 47c-2 4-6 6-10 6-3 0-5-1-7-3z" fill="#FF5D01" />
          <path d="M84 94c2-2 4-5 4-9 0-7-6-12-12-12-4 0-7 2-9 4l-15-28h9c2 0 3-1 3-3s-1-3-3-3H46c-2 0-3 1-3 3l1 2 25 47c2 4 6 6 10 6 3 0 5-1 7-3z" fill="#BC52EE" />
        </svg>
      );
    case 'remix':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#121212" />
          <path d="M36 36h28c14 0 24 9 24 22 0 9-5 16-13 20l17 22H76L61 80H50v20H36V36zm14 32h14c6 0 10-4 10-10s-4-10-10-10H50v20z" fill="white" />
        </svg>
      );
    case 'jquery':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#0769AD" />
          <path d="M64 24c22 0 40 18 40 40s-18 40-40 40c-12 0-23-5-30-14l10-8c5 6 13 10 20 10 15 0 28-13 28-28s-13-28-28-28c-10 0-19 5-24 13l-10-6C38 31 50 24 64 24z" fill="#78CFF5" />
          <path d="M42 64c0-4 3-7 7-7s7 3 7 7-3 7-7 7-7-3-7-7z" fill="white" />
        </svg>
      );
    case 'bootstrap':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#7952B3" />
          <path d="M46 36h26c11 0 18 6 18 14 0 6-3 10-9 12 8 2 12 7 12 14 0 9-8 16-20 16H46V36zm13 20h12c4 0 7-2 7-6s-3-6-7-6H59v12zm0 24h14c5 0 8-2 8-7s-3-7-8-7H59v14z" fill="white" />
        </svg>
      );
    case 'woocommerce':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#96588A" />
          <path d="M30 46h16l10 28 10-28h16l10 28 10-28h16l-18 48H84L74 66 64 94H48L30 46z" fill="white" />
        </svg>
      );
    case 'fastly':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#FF282D" />
          <path d="M44 38h40v14H44V38zm0 22h32v14H44V60zm0 22h24v14H44V82z" fill="white" />
        </svg>
      );
    case 'nginx':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#009639" />
          <path d="M42 36l22 28v28H50V56L42 46v46H30V36h12zm44 0h12v56H86L64 64v36h-8V36h12l22 28V36h8z" fill="white" />
        </svg>
      );
    case 'apache':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#D22128" />
          <path d="M64 24l28 80H78l-6-18H56l-6 18H36l28-80zm5 48L64 48l-5 24h10z" fill="white" />
        </svg>
      );
    case 'litespeed':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#0066CC" />
          <path d="M68 28L36 68h24l-4 32 36-44H68l4-28z" fill="#00FFCC" />
        </svg>
      );
    case 'php':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#777BB4" />
          <ellipse cx="64" cy="64" rx="46" ry="26" fill="#4F5B93" />
          <text x="64" y="73" fill="white" fontSize="26" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PHP</text>
        </svg>
      );
    case 'nodejs':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#339933" />
          <path d="M64 28l32 18v36L64 100 32 82V46l32-18zm0 10L40 52v24l24 14 24-14V52L64 38z" fill="white" />
        </svg>
      );
    case 'sentry':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#362D59" />
          <path d="M78 36c14 8 20 25 14 40-5 13-17 22-31 24l-3-8c10-2 19-8 23-18 4-11 0-24-10-30L78 36z" fill="#FB4226" />
          <circle cx="56" cy="68" r="8" fill="#FB4226" />
        </svg>
      );
    case 'vite':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#646CFF" />
          <path d="M96 32L64 96 32 32h64z" fill="#FFD62E" />
          <path d="M64 32l16 32-16 32-16-32 16-32z" fill="#BD34FE" />
        </svg>
      );
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 110L114 23.4H93.1L64 73.7L34.9 23.4H14L64 110Z" fill="#41B883" />
          <path d="M64 110L93.1 23.4H74.9L64 42.1L53.1 23.4H34.9L64 110Z" fill="#35495E" />
        </svg>
      );
    case 'angular':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 10L114 27.9L106.3 90.7L64 118L21.7 90.7L14 27.9L64 10Z" fill="#DD0031" />
          <path d="M64 10V118L106.3 90.7L114 27.9L64 10Z" fill="#C3002F" />
          <path d="M64 26L95.5 96.6H84.3L77.9 80.6H50L43.6 96.6H32.4L64 26ZM64 45L54.7 68.4H73.2L64 45Z" fill="white" />
        </svg>
      );
    case 'laravel':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#FF2D20" />
          <path d="M96.4 86.8L64.2 68.3V31.2L96.4 12.8V86.8ZM49.4 49.2L31.6 38.9V91L63.8 109.5V86.8L49.4 78.5V49.2Z" fill="white" fillOpacity="0.9" />
        </svg>
      );
    case 'webflow':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#4353FF" />
          <path d="M26 40H44L56 78L68 40H86L74 78L86 116H68L56 78L44 116H26L38 78L26 40Z" fill="white" />
        </svg>
      );
    case 'recaptcha':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 16C37.5 16 16 37.5 16 64C16 77.2 21.3 89.2 30 98L41.3 86.7C35.6 80.9 32 72.9 32 64C32 46.3 46.3 32 64 32C81.7 32 96 46.3 96 64H112C112 37.5 90.5 16 64 16ZM64 96C55.1 96 47.1 92.4 41.3 86.7L30 98C38.8 106.7 50.8 112 64 112C90.5 112 112 90.5 112 64H96C96 81.7 81.7 96 64 96Z" fill="#4285F4" />
          <path d="M48 64H24L36 84L48 64ZM104 64H80L92 84L104 64Z" fill="#34A853" />
        </svg>
      );
    case 'django':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#092E20" />
          <text x="64" y="80" fill="white" fontSize="48" fontWeight="bold" fontFamily="monospace" textAnchor="middle">dj</text>
        </svg>
      );
    case 'vercel-paas':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 18L114 105H14L64 18Z" fill="black" />
        </svg>
      );
    case 'netlify':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 12L24 44V84L64 116L104 84V44L64 12Z" fill="#00AD9F" fillOpacity="0.1" />
          <path d="M64 12L24 44H104L64 12ZM24 44V84L64 64L24 44ZM104 44L64 64L104 84V44ZM64 64V116L104 84L64 64ZM64 64L24 84L64 116V64Z" fill="#00AD9F" stroke="#00AD9F" strokeWidth="4" />
        </svg>
      );
    case 'heroku':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#430098" />
          <path d="M42 32H58V96H42V32ZM70 32H86V96H70V32ZM42 56H86V72H42V56Z" fill="white" />
        </svg>
      );
    case 'postgresql':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#336791" />
          {/* Simplified elephant core icon for high-contrast visibility */}
          <circle cx="60" cy="55" r="28" fill="white" />
          <path d="M84 55C84 75 70 85 55 85C40 85 28 75 28 55C28 35 44 28 60 28C76 28 84 35 84 55Z" fill="white" />
          <path d="M44 80C44 80 40 98 24 98V92C32 92 40 85 44 80Z" fill="#336791" stroke="#336791" strokeWidth="4" />
          <circle cx="50" cy="46" r="4.5" fill="#336791" />
        </svg>
      );
    case 'mysql':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#00758F" />
          <path d="M88 44C88 32 72 26 58 32C44 38 38 52 44 68C50 84 70 94 88 94V84C72 84 58 76 54 64C50 52 54 44 64 40C74 36 88 40 88 44Z" fill="#F29111" />
          <path d="M50 44C50 44 32 46 22 56L26 62C36 52 50 44 50 44Z" fill="white" />
        </svg>
      );
    case 'mongodb':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 12C64 12 36 38 36 68C36 92 48 112 64 116C80 112 92 92 92 68C92 38 64 12 64 12ZM64 104V24C76 36 84 56 84 68C84 84 76 96 64 104Z" fill="#47A248" />
          <path d="M64 12V116" stroke="#3F3F3F" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case 'redis':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#D82C20" />
          <path d="M28 40L64 22L100 40L64 58L28 40Z" fill="white" fillOpacity="0.9" />
          <path d="M28 62L64 44L100 62L64 80L28 62Z" fill="white" fillOpacity="0.7" />
          <path d="M28 84L64 66L100 84L64 102L28 84Z" fill="white" fillOpacity="0.5" />
        </svg>
      );
    case 'ghost':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#15171A" />
          <circle cx="64" cy="54" r="26" fill="white" />
          <rect x="38" y="54" width="52" height="32" fill="white" />
          <circle cx="52" cy="54" r="5" fill="#15171A" />
          <circle cx="76" cy="54" r="5" fill="#15171A" />
          <path d="M38 86C42 80 48 80 51 86C54 80 60 80 64 86C68 80 74 80 77 86C80 80 86 80 90 86" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'medium':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="black" />
          <ellipse cx="40" cy="64" rx="22" ry="22" fill="white" />
          <ellipse cx="80" cy="64" rx="11" ry="22" fill="white" />
          <ellipse cx="106" cy="64" rx="4" ry="22" fill="white" />
        </svg>
      );
    case 'substack':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#FF6719" />
          <path d="M32 32H96V44H32V32ZM32 52H96V64H32V52ZM32 72L64 88L96 72V104L64 88L32 104V72Z" fill="white" />
        </svg>
      );
    case 'aws':
    case 'amazon-ads':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#232F3E" />
          <path d="M32 40H46V84H32V40ZM50 56C50 48 58 44 68 44C78 44 86 48 86 56V84H74V76C70 82 64 85 58 85C52 85 50 80 50 74C50 66 58 62 68 62H84V58C84 52 78 49 68 49C58 49 52 52 52 52L50 56ZM68 70C68 70 58 72 58 76C58 80 62 81 66 81C72 81 84 76 84 70V67H68V70Z" fill="white" />
          <path d="M28 92C50 106 78 106 100 92L94 86C76 98 52 98 34 86L28 92Z" fill="#FF9900" stroke="#FF9900" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'github-pages':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#181717" />
          <path d="M64 18C38.6 18 18 38.6 18 64C18 84.3 31.2 101.5 49.5 107.6C51.8 108 52.6 106.6 52.6 105.4C52.6 104.3 52.6 100.6 52.6 96.5C40 99.1 37.2 91.1 37.2 91.1C35.1 85.9 32.1 84.5 32.1 84.5C28 81.7 32.4 81.8 32.4 81.8C36.9 82.1 39.3 86.4 39.3 86.4C43.3 93.3 49.9 91.3 52.5 90.1C52.9 87.2 54.1 85.2 55.4 84.1C45.2 82.9 34.5 79 34.5 61.5C34.5 56.5 36.3 52.4 39.2 49.2C38.7 48 37.1 43.3 39.7 37.1C39.7 37.1 43.6 35.9 52.5 41.9C56.2 40.9 60.1 40.4 64 40.4C67.9 40.4 71.8 40.9 75.5 41.9C84.4 35.9 88.3 37.1 88.3 37.1C90.9 43.3 89.3 48 88.8 49.2C91.7 52.4 93.5 56.5 93.5 61.5C93.5 79.1 82.7 82.9 72.5 84C74.1 85.4 75.5 88.2 75.5 92.5C75.5 98.7 75.5 103.7 75.5 105.2C75.5 106.4 76.3 107.8 78.6 107.4C96.8 101.3 110 84.2 110 64C110 38.6 89.4 18 64 18Z" fill="white" />
        </svg>
      );
    case 'hostinger':
    case 'hostinger-cdn':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#673DE6" />
          <path d="M32 40H96V50H32V40ZM32 58H96V68H32V58ZM32 76H96V86H32V76Z" fill="white" fillOpacity="0.9" />
          <circle cx="42" cy="45" r="2.5" fill="#673DE6" />
          <circle cx="42" cy="63" r="2.5" fill="#673DE6" />
          <circle cx="42" cy="81" r="2.5" fill="#673DE6" />
        </svg>
      );
    case 'google-tag-manager':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#246FDB" />
          <path d="M40 32L64 56L88 32H40Z" fill="white" fillOpacity="0.7" />
          <path d="M40 96L64 72L88 96H40Z" fill="white" fillOpacity="0.9" />
          <circle cx="64" cy="64" r="12" fill="white" />
        </svg>
      );
    case 'meta-pixel':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="url(#metaGrad)" />
          <defs>
            <linearGradient id="metaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0064E0" />
              <stop offset="100%" stop-color="#00B2FF" />
            </linearGradient>
          </defs>
          <path d="M64 42C48 42 36 50 36 64C36 78 48 86 64 86C80 86 92 78 92 64C92 50 80 42 64 42ZM64 76C54 76 46 70 46 64C46 58 54 52 64 52C74 52 82 58 82 64C82 70 74 76 64 76Z" fill="white" />
        </svg>
      );
    case 'microsoft-clarity':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#0078D4" />
          <path d="M38 38H64V90H38V38ZM64 38H90V64H64V38ZM64 64H90V90H64V64Z" fill="white" fillOpacity="0.9" />
        </svg>
      );
    case 'hotjar':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#FF5C35" />
          <path d="M42 96C42 96 46 66 64 46C82 66 86 96 86 96H42Z" fill="white" />
          <circle cx="64" cy="32" r="10" fill="white" />
        </svg>
      );
    case 'mixpanel':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#4F46E5" />
          <circle cx="48" cy="64" r="16" fill="white" fillOpacity="0.9" />
          <circle cx="80" cy="64" r="16" fill="white" fillOpacity="0.6" />
          <circle cx="64" cy="40" r="12" fill="white" fillOpacity="0.8" />
          <circle cx="64" cy="88" r="12" fill="white" fillOpacity="0.4" />
        </svg>
      );
    case 'amplitude':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#1C1E3A" />
          <path d="M32 90V64H44V90H32ZM50 90V38H62V90H50ZM68 90V52H80V90H68ZM86 90V26H98V90H86Z" fill="#22D3EE" />
        </svg>
      );
    case 'segment':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#52BD95" />
          <circle cx="44" cy="44" r="12" fill="white" />
          <circle cx="84" cy="44" r="12" fill="white" />
          <circle cx="64" cy="84" r="12" fill="white" />
          <line x1="44" y1="44" x2="84" y2="44" stroke="white" strokeWidth="6" />
          <line x1="44" y1="44" x2="64" y2="84" stroke="white" strokeWidth="6" />
        </svg>
      );
    case 'posthog':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#F4511E" />
          {/* Hedgehog profile silhouette representation */}
          <circle cx="64" cy="64" r="28" fill="white" />
          <polygon points="64,30 52,48 76,48" fill="white" />
          <polygon points="40,50 32,68 50,60" fill="white" />
          <polygon points="88,50 96,68 78,60" fill="white" />
          <circle cx="56" cy="60" r="3.5" fill="#F4511E" />
          <circle cx="72" cy="60" r="3.5" fill="#F4511E" />
        </svg>
      );
    case 'plausible':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#7C3AED" />
          <path d="M32 90V76H46V90H32ZM52 90V58H66V90H52ZM72 90V34H86V90H72ZM92 90V20H106V90H92Z" fill="white" />
        </svg>
      );
    case 'fathom':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#3B82F6" />
          <path d="M32 84C44 56 64 44 96 44V56C72 56 56 64 44 84H32Z" fill="white" />
          <circle cx="96" cy="44" r="8" fill="white" />
        </svg>
      );
    case 'google-ads':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#4285F4" />
          <path d="M40 88L88 40" stroke="#FBBC05" strokeWidth="16" strokeLinecap="round" />
          <path d="M40 40L88 88" stroke="#34A853" strokeWidth="16" strokeLinecap="round" />
        </svg>
      );
    case 'adsense':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#F9BC15" />
          <rect x="36" y="36" width="56" height="56" rx="8" fill="#4285F4" />
          <rect x="46" y="46" width="36" height="36" rx="4" fill="white" />
        </svg>
      );
    case 'doubleclick':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#D62D20" />
          <circle cx="50" cy="64" r="18" fill="white" />
          <circle cx="78" cy="64" r="18" fill="white" />
          <circle cx="50" cy="64" r="8" fill="#D62D20" />
          <circle cx="78" cy="64" r="8" fill="#D62D20" />
        </svg>
      );
    case 'taboola':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#005A9C" />
          <circle cx="64" cy="64" r="24" stroke="white" strokeWidth="6" fill="none" />
          <circle cx="64" cy="64" r="10" fill="white" />
        </svg>
      );
    case 'outbrain':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#EC6608" />
          <circle cx="64" cy="64" r="24" fill="white" fillOpacity="0.2" />
          <path d="M46 64C46 54 54 46 64 46C74 46 82 54 82 64H46Z" fill="white" />
        </svg>
      );
    default:
      // High-quality generic fallback matching our brand
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#F1F3F4" stroke="#DADCE0" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
}
