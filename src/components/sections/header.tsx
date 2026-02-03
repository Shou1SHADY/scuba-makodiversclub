"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { GOOGLE_FORM_URL } from "@/lib/config";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Reviews", href: "#testimonials" },
    {
      name: "Liveaboards",
      href: "#",
      dropdown: [
        { name: "Schedule 25/26", href: "/schedule-25/26" },
        { name: "Mini Safaris", href: "/mini-safaris" },
        { name: "Gallery", href: "#gallery" },
      ],
    },
    { name: "Courses", href: "#services" },
    { name: "Packages", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Promo Banner */}
      <div 
        className="bg-[#0D2451] border-b border-[#CFB27F]/20 py-2 overflow-hidden"
        style={{ animation: 'pulse 3s infinite ease-in-out' }}
      >
        <a 
          href="https://docs.google.com/forms/d/1pteJi3bPp7gppozujR8LJOHdBNIQNnk_PBBGqdRv-CQ/preview"
          className="block text-center px-6 group"
        >
          <p className="font-display text-[14px] md:text-[16px] font-semibold text-white tracking-wide uppercase hover:text-[#CFB27F] transition-colors">
            <span className="inline-block mx-2 text-[#CFB27F]">※</span>
            North Expedition Mini Safari &nbsp;|&nbsp; 24 Dec &apos;25 &nbsp;|&nbsp; Limited Spots Available
            <span className="inline-block mx-2 text-[#CFB27F]">※</span>
          </p>
        </a>
      </div>

      {/* Main Navigation */}
      <div 
        className={`w-full transition-all duration-500 border-b ${
          isScrolled 
            ? "bg-[#0D2451] py-3 shadow-xl border-[#CFB27F]/10" 
            : "bg-transparent py-5 border-transparent"
        }`}
      >
        <div className="container px-6 flex items-center justify-between">
          {/* Logo - Centered in desktop view per visual logic of high tier headers, but here we align left as per common practice if logo not provided separately */}
          <div className="flex-shrink-0">
             {/* Using the image from assets as the brand presence if it was the logo, 
                 but visual check shows it's a content image. We'll use a placeholder/text logo 
                 consistent with Bitter serif if no svg logo provided */}
             <div className="flex flex-col">
               <span className="font-display text-2xl font-bold text-[#CFB27F] leading-tight">MAKO</span>
               <span className="font-display text-[10px] tracking-[0.3em] text-white">DIVERS CLUB</span>
             </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group cursor-pointer"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={link.href}
                  className={`font-display text-[16px] text-white hover:text-[#CFB27F] transition-colors flex items-center gap-1 ${
                    link.name === "Home" ? "font-semibold border-b-2 border-[#CFB27F]" : ""
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className="opacity-70" />}
                </a>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div 
                    className={`absolute top-full left-0 mt-4 w-56 bg-[#1A3E7A] border border-[#CFB27F]/20 rounded-md shadow-2xl overflow-hidden transition-all duration-300 origin-top transform ${
                      activeDropdown === link.name ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <div className="py-2">
                      {link.dropdown.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          className="block px-6 py-3 font-display text-[14px] text-white hover:bg-[#CFB27F] hover:text-[#0D2451] transition-colors"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              ))}
              
              {/* Book Now CTA */}
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-6 bg-[#CFB27F] text-[#0D2451] font-bold uppercase text-sm py-3 px-6 rounded hover:bg-white transition-colors duration-300"
              >
                Book Now
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-[#CFB27F] p-2 focus:outline-none focus:ring-2 focus:ring-[#CFB27F] rounded"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={32} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div 
          className={`fixed inset-0 bg-[#0D2451]/95 z-[60] transition-transform duration-500 transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-8">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#CFB27F] hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-[#CFB27F] rounded"
                aria-label="Close navigation menu"
              >
                <X size={36} aria-hidden="true" />
              </button>
            </div>

          <div className="flex flex-col items-center justify-center space-y-8 flex-grow">
            {navLinks.map((link) => (
              <div key={link.name} className="w-full text-center">
                <a 
                  href={link.href}
                  className="font-display text-3xl text-white font-bold hover:text-[#CFB27F] transition-colors block"
                  onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
                {link.dropdown && (
                  <div className="mt-4 flex flex-col space-y-3">
                    {link.dropdown.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        className="font-display text-xl text-[#CFB27F] opacity-80 hover:opacity-100"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Book Now CTA */}
            <a 
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 bg-[#CFB27F] text-[#0D2451] font-bold uppercase text-xl py-4 px-12 rounded hover:bg-white transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `}</style>
    </header>
  );
};

export default Header;