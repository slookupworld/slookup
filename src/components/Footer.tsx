/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Cpu, Chrome, ShieldCheck, Heart, X, Mail, FileText, CheckCircle, Send, AlertCircle } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const [activeModal, setActiveModal] = useState<'contact' | 'privacy' | 'terms' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('https://formsubmit.co/ajax/hello.stacklookup@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          name, 
          email, 
          message,
          _subject: `New StackLookup Contact Form Submission from ${name}`
        })
      });
      if (response.ok) {
        setContactSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const errData = await response.json();
        setSubmitError(errData.message || 'Failed to send your message via FormSubmit. Please try again.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitError('An unexpected networking error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-[#DADCE0] bg-[#F8F9FA] text-[#5F6368] pt-10 pb-6 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A73E8] text-white shadow-sm shadow-[#1A73E8]/25">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <span className="font-sans text-lg font-black tracking-tight text-[#202124]">
                Stack<span className="text-[#1A73E8]">Lookup</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
              Discover the technologies behind any website instantly. Optimized with Material 3 rigor for technical users and developers.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-[#3C4043] font-medium">
              <ShieldCheck className="h-4 w-4 text-[#34A853]" />
              <span>Compliant with Manifest V3 policies</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col">
            <h3 className="text-xs font-bold text-[#202124] uppercase tracking-wider mb-3.5">Product Ecosystem</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => setTab('home')} 
                  className="text-[#5F6368] hover:text-[#1A73E8] font-medium transition-colors cursor-pointer duration-200"
                >
                  Web Scanner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setTab('extension')} 
                  className="text-[#5F6368] hover:text-[#1A73E8] font-medium transition-colors cursor-pointer duration-200"
                >
                  Chrome Extension
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setTab('extension')} 
                  className="text-[#5F6368] hover:text-[#1A73E8] font-medium transition-colors cursor-pointer duration-200"
                >
                  DevTools Panel Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Directory & Resources */}
          <div className="flex flex-col">
            <h3 className="text-xs font-bold text-[#202124] uppercase tracking-wider mb-3.5">Resources</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => setTab('directory')} 
                  className="text-[#5F6368] hover:text-[#1A73E8] font-medium transition-colors cursor-pointer duration-200"
                >
                  Technology Registry
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setTab('blog')} 
                  className="text-[#5F6368] hover:text-[#1A73E8] font-medium transition-colors cursor-pointer duration-200"
                >
                  Engineering Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setTab('about')} 
                  className="text-[#5F6368] hover:text-[#1A73E8] font-medium transition-colors cursor-pointer duration-200"
                >
                  Compliance & About
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Standard */}
          <div>
            <h3 className="text-xs font-bold text-[#202124] uppercase tracking-wider mb-3.5">Platform Standard</h3>
            <div className="rounded-xl border border-[#DADCE0] bg-white p-4 shadow-sm hover:border-[#1A73E8]/30 transition-colors duration-300 space-y-2">
              <span className="inline-flex items-center rounded-full bg-[#EEF4FF] px-2.5 py-0.5 text-[10px] font-bold text-[#1A73E8] border border-[#1A73E8]/15 tracking-wide uppercase">
                WCAG 2.1 AA Compliant
              </span>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Designed to strict contrast and typography standards. Secure and sandbox-tested.
              </p>
            </div>
          </div>

        </div>

        {/* Minimal Copyright & Metadata Area (With Contact, Privacy Policy, and Terms of Use) */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-xs text-[#80868B] pt-4 border-t border-[#DADCE0]/40">
          <div className="font-medium text-center sm:text-left">
            &copy; {new Date().getFullYear()} StackLookup.net. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-3 sm:mt-0 font-semibold text-[#5F6368]">
            <button 
              onClick={() => {
                setActiveModal('contact');
                setContactSubmitted(false);
                setSubmitError(null);
              }}
              className="hover:text-[#1A73E8] cursor-pointer transition-colors duration-200"
              id="footer-link-contact"
            >
              Contact
            </button>
            <span className="text-[#DADCE0] select-none">|</span>
            <button 
              onClick={() => {
                setActiveModal('privacy');
                setSubmitError(null);
              }}
              className="hover:text-[#1A73E8] cursor-pointer transition-colors duration-200"
              id="footer-link-privacy"
            >
              Privacy Policy
            </button>
            <span className="text-[#DADCE0] select-none">|</span>
            <button 
              onClick={() => {
                setActiveModal('terms');
                setSubmitError(null);
              }}
              className="hover:text-[#1A73E8] cursor-pointer transition-colors duration-200"
              id="footer-link-terms"
            >
              Terms of Use
            </button>
          </div>
        </div>

      </div>

      {/* Modern Dialog Modals for Contact, Privacy, and Terms */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="relative w-full max-w-xl bg-white rounded-2xl border border-[#DADCE0] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#DADCE0]/60 flex-shrink-0">
              <div className="flex items-center space-x-2.5">
                {activeModal === 'contact' && <Mail className="h-5 w-5 text-[#1A73E8]" />}
                {activeModal === 'privacy' && <ShieldCheck className="h-5 w-5 text-[#34A853]" />}
                {activeModal === 'terms' && <FileText className="h-5 w-5 text-[#EA4335]" />}
                <h2 className="text-base sm:text-lg font-bold text-[#202124]">
                  {activeModal === 'contact' && 'Contact Support & Inquiries'}
                  {activeModal === 'privacy' && 'Privacy Policy'}
                  {activeModal === 'terms' && 'Terms of Use'}
                </h2>
              </div>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setContactSubmitted(false);
                  setSubmitError(null);
                }}
                className="p-1 rounded-full text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124] transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto pr-1 text-[#5F6368] text-xs sm:text-sm leading-relaxed space-y-4 flex-grow">
              {activeModal === 'contact' && (
                <>
                  {contactSubmitted ? (
                    <div className="text-center py-8 px-4 flex flex-col items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-[#E6F4EA] text-[#137333] flex items-center justify-center mb-4 border border-[#34A853]/20">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <h3 className="text-base font-bold text-[#202124] mb-2">Message Sent Successfully!</h3>
                      <p className="text-sm text-[#5F6368] max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out to StackLookup. Our engineering team has received your inquiry. We typically review and respond within 24 business hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <p className="text-xs sm:text-sm text-[#5F6368]">
                        Have a suggestion, custom fingerprint addition request, or developer question? Send us a line below and we will get back to you shortly.
                      </p>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-[#202124] uppercase tracking-wider">Your Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Jane Doe"
                          className="w-full rounded-xl border border-[#DADCE0] bg-white px-4 py-2.5 text-xs sm:text-sm text-[#202124] focus:border-[#1A73E8] focus:outline-none focus:ring-1 focus:ring-[#1A73E8] transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-[#202124] uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. jane@company.com"
                          className="w-full rounded-xl border border-[#DADCE0] bg-white px-4 py-2.5 text-xs sm:text-sm text-[#202124] focus:border-[#1A73E8] focus:outline-none focus:ring-1 focus:ring-[#1A73E8] transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-[#202124] uppercase tracking-wider">Message</label>
                        <textarea
                          required
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us what you need help with..."
                          className="w-full rounded-xl border border-[#DADCE0] bg-white px-4 py-2.5 text-xs sm:text-sm text-[#202124] focus:border-[#1A73E8] focus:outline-none focus:ring-1 focus:ring-[#1A73E8] transition-all resize-none"
                        />
                      </div>
                      {submitError && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-[#EA4335] font-medium flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{submitError}</span>
                        </div>
                      )}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#1A73E8] text-white px-5 py-3 text-xs sm:text-sm font-semibold hover:bg-[#1557B0] transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>Sending Message...</span>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              <span>Send Message</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}

              {activeModal === 'privacy' && (
                <div className="space-y-4">
                  <p className="text-[#5F6368]">
                    At <strong>StackLookup.net</strong>, we believe in radical transparency and user privacy. Our tools are designed from the ground up to protect technical users and developers.
                  </p>

                  <div className="space-y-3">
                    <div className="border border-[#DADCE0] rounded-xl p-4 bg-[#F8F9FA]">
                      <h3 className="font-bold text-[#202124] flex items-center mb-1">
                        <ShieldCheck className="h-4 w-4 text-[#34A853] mr-1.5" />
                        Zero Server-Side Logging
                      </h3>
                      <p className="text-xs text-[#5F6368]">
                        We do not collect, store, or profile scanned URLs. All scan requests sent through our platform proxy are evaluated statelessly in real-time, and no persistent logs of domain requests are maintained.
                      </p>
                    </div>

                    <div className="border border-[#DADCE0] rounded-xl p-4 bg-[#F8F9FA]">
                      <h3 className="font-bold text-[#202124] flex items-center mb-1">
                        <ShieldCheck className="h-4 w-4 text-[#34A853] mr-1.5" />
                        No Tracking Cookies or Identifiers
                      </h3>
                      <p className="text-xs text-[#5F6368]">
                        We do not generate user-tracking fingerprints, persistent browser cookie IDs, or coordinate user search habits. Your analytics remains entirely your own.
                      </p>
                    </div>

                    <div className="border border-[#DADCE0] rounded-xl p-4 bg-[#F8F9FA]">
                      <h3 className="font-bold text-[#202124] flex items-center mb-1">
                        <ShieldCheck className="h-4 w-4 text-[#34A853] mr-1.5" />
                        Chrome Extension Sandbox Compliance
                      </h3>
                      <p className="text-xs text-[#5F6368]">
                        Our browser utility operates strictly under Google Chrome's Manifest V3 security protocol. The extension relies solely on active client-side DOM inspections and reads meta tags locally. It contains absolutely zero background beaconing or reporting capabilities.
                      </p>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#80868B] italic">
                    Last Updated: July 2026. For privacy questions, please reach out to privacy@stacklookup.net.
                  </p>
                </div>
              )}

              {activeModal === 'terms' && (
                <div className="space-y-4">
                  <p className="text-[#5F6368]">
                    Welcome to StackLookup. By accessing StackLookup.net or using our web scanner and extension, you agree to comply with the following terms of service.
                  </p>

                  <div className="space-y-3">
                    <div className="border border-[#DADCE0] rounded-xl p-4 bg-[#F8F9FA]">
                      <h3 className="font-bold text-[#202124] flex items-center mb-1">
                        <FileText className="h-4 w-4 text-[#EA4335] mr-1.5" />
                        1. Permitted Use Cases
                      </h3>
                      <p className="text-xs text-[#5F6368]">
                        StackLookup is built to assist technical developers, engineers, and market researchers in understanding public web infrastructure. Permitted uses include security researching, educational stack analysis, and diagnostic testing of domains.
                      </p>
                    </div>

                    <div className="border border-[#DADCE0] rounded-xl p-4 bg-[#F8F9FA]">
                      <h3 className="font-bold text-[#202124] flex items-center mb-1">
                        <FileText className="h-4 w-4 text-[#EA4335] mr-1.5" />
                        2. Absolute Abuse Prohibition
                      </h3>
                      <p className="text-xs text-[#5F6368]">
                        You are strictly prohibited from utilizing bots, scripts, or scrapers to perform high-frequency automated scans that would overwhelm our server infrastructure or degrade performance for other human users.
                      </p>
                    </div>

                    <div className="border border-[#DADCE0] rounded-xl p-4 bg-[#F8F9FA]">
                      <h3 className="font-bold text-[#202124] flex items-center mb-1">
                        <FileText className="h-4 w-4 text-[#EA4335] mr-1.5" />
                        3. Trademarks & Brand Disclaimer
                      </h3>
                      <p className="text-xs text-[#5F6368]">
                        Any product names, logos, brands, or trademarked assets identified by StackLookup remain the sole property of their respective trademark holders. Identification is provided solely for diagnostic and descriptive categorization.
                      </p>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#80868B] italic">
                    Last Updated: July 2026. For compliance inquiries, please contact legal@stacklookup.net.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t border-[#DADCE0]/60 flex justify-end flex-shrink-0">
              <button
                onClick={() => {
                  setActiveModal(null);
                  setContactSubmitted(false);
                }}
                className="rounded-full bg-[#F1F3F4] text-[#202124] hover:bg-[#E8EAED] px-5 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
