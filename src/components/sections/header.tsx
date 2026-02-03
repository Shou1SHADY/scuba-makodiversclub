"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { GOOGLE_FORM_URL } from "@/lib/config";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Reviews", href: "/reviews" },
    {
      name: "Liveaboards",
      href: "/schedule-25/26",
      dropdown: [
        { name: "Schedule 25/26", href: "/schedule-25/26" },
        { name: "Mini Safaris", href: "/mini-safaris" },
        { name: "Gallery", href: "/gallery" },
      ],
    },
    { name: "Courses", href: "/courses" },
    { name: "Packages", href: "/packages" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Promo Banner - Hidden on scroll to save space */}
      <div
        className={`bg-brand-navy border-b border-white/5 py-2 overflow-hidden transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 py-0' : 'h-auto opacity-100'}`}
      >
        <a
          href="https://docs.google.com/forms/d/1pteJi3bPp7gppozujR8LJOHdBNIQNnk_PBBGqdRv-CQ/preview"
          className="block text-center px-6 group"
        >
          <p className="font-body text-xs md:text-sm font-medium text-white/80 tracking-wide uppercase group-hover:text-primary transition-colors flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            North Expedition Mini Safari &nbsp;|&nbsp; 24 Dec &apos;25 &nbsp;|&nbsp; Limited Spots
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </p>
        </a>
      </div>

      {/* Main Navigation */}
      <div
        className={`w-full transition-all duration-500 ${isScrolled
          ? "glass-header py-4 shadow-lg"
          : "bg-transparent py-4 md:py-6"
          }`}
      >
        <div className="container-width flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 z-50">
            <a href="/" className="flex flex-col group">
              <span className="font-display text-2xl md:text-3xl font-bold text-primary leading-none tracking-tight group-hover:opacity-90 transition-opacity">MAKO</span>
              <span className="font-body text-[10px] tracking-[0.4em] text-white/90 group-hover:text-white transition-colors">DIVERS CLUB</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group cursor-pointer"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className={`font-body text-sm font-medium text-white/90 hover:text-primary transition-colors flex items-center gap-1 py-2 ${link.name === "Home" ? "text-white" : ""
                    }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                </a>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div
                    className={`absolute top-full left-0 pt-4 w-56 transition-all duration-300 origin-top-left transform ${activeDropdown === link.name ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                      }`}
                  >
                    <div className="glass-card rounded-lg overflow-hidden p-2 shadow-2xl ring-1 ring-white/10">
                      {link.dropdown.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-3 font-body text-sm text-white/90 hover:bg-white/5 hover:text-primary rounded-md transition-all duration-200"
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
            <div className="pl-6 border-l border-white/10">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-brand-navy font-bold uppercase text-xs tracking-wider py-3 px-8 rounded-sm hover:bg-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                Book Now
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-primary p-2 focus:outline-none z-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-brand-navy/98 z-40 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        <div className="flex flex-col h-full pt-32 pb-10 px-6 overflow-y-auto">
          <div className="flex flex-col items-center justify-center space-y-6 flex-grow">
            {navLinks.map((link, idx) => (
              <div
                key={link.name}
                className={`w-full text-center transform transition-all duration-500 delay-${idx * 100} ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
                <a
                  href={link.href}
                  className="font-display text-4xl text-white font-bold hover:text-primary transition-colors block"
                  onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
                {link.dropdown && (
                  <div className="mt-4 flex flex-col space-y-4 border-l-2 border-primary/20 ml-[50%] pl-6 text-left max-w-xs mx-auto">
                    {link.dropdown.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        className="font-body text-lg text-white/60 hover:text-primary transition-colors block"
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
            <div className={`mt-12 w-full max-w-xs transition-all duration-700 delay-500 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary text-brand-navy font-bold uppercase text-lg py-4 rounded-sm hover:bg-white transition-colors duration-300 text-center shadow-lg hover:shadow-primary/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;