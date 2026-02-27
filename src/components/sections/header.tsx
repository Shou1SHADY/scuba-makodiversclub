"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { GOOGLE_FORM_URL } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [banner, setBanner] = useState<{ text: string; link: string; active: boolean } | null>(null);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch live banner settings
    const fetchBanner = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'homepage_banner')
          .maybeSingle();

        if (error) throw error;
        if (data && data.value) setBanner(data.value as any);
      } catch (e) {
        console.error("Banner fetch error:", e);
      }
    };
    fetchBanner();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "News", href: "/updates" },
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
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-300">
      {/* Promo Banner */}
      <AnimatePresence>
        {!isScrolled && banner?.active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-brand-navy border-b border-white/5 py-2 overflow-hidden w-full relative z-[60]"
          >
            <a
              href={banner.link || GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 group"
            >
              <div className="flex items-center justify-center gap-2 max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0"></span>
                <p className="font-body text-[9px] md:text-xs font-bold text-white/50 tracking-[0.1em] md:tracking-[0.2em] uppercase group-hover:text-primary transition-colors text-center line-clamp-1 md:line-clamp-none flex-grow min-w-0">
                  {banner.text}
                </p>
                <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform flex-shrink-0 text-white/50 group-hover:text-primary" />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <div
        className={`w-full transition-all duration-500 relative z-[110] ${isScrolled || mobileMenuOpen
          ? "glass-header py-3 shadow-2xl"
          : "bg-transparent py-4 md:py-8"
          }`}
      >
        <div className="container-width flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-1 z-[120] min-w-0">
            <a href="/" className="flex flex-col group relative max-w-full overflow-hidden">
              <span className="font-display text-2xl md:text-3xl font-black text-white leading-none tracking-tighter group-hover:text-primary transition-colors truncate">MAKO</span>
              <span className="font-body text-[8px] tracking-[0.1em] sm:tracking-[0.5em] text-primary font-black ml-0.5 whitespace-nowrap overflow-hidden text-ellipsis uppercase">DIVERS CLUB</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative px-4 py-2"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="relative font-display text-[13px] font-bold text-white/70 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group/link"
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
                </a>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-4 w-60 z-[110]"
                    >
                      <div className="glass-card rounded-2xl overflow-hidden p-3 shadow-2xl border border-white/10 relative z-10">
                        {link.dropdown.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="flex items-center justify-between px-4 py-3 font-display text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-primary hover:bg-white/5 rounded-xl transition-all group/sub"
                          >
                            {sub.name}
                            <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Book Now Desktop CTA */}
            <div className="pl-8 ml-4 border-l border-white/10">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center bg-primary text-brand-navy font-display font-black uppercase text-[11px] tracking-[0.2em] py-4 px-10 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity" />
                Book Now
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-primary focus:outline-none z-50 transition-all active:scale-90"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-[100dvh] bg-brand-navy z-[105] lg:hidden flex flex-col overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent blur-3xl opacity-20" />
            </div>

            <div className="flex flex-col h-full pt-32 pb-10 px-8 relative z-10 overflow-hidden">
              <div className="flex flex-col space-y-2 overflow-y-auto grow overscroll-contain pr-2 custom-scrollbar">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="py-1"
                  >
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      {link.dropdown ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveMobileDropdown(activeMobileDropdown === link.name ? null : link.name);
                          }}
                          className="font-display text-4xl font-black text-white hover:text-primary transition-colors block leading-tight tracking-tighter text-left"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className="font-display text-4xl font-black text-white hover:text-primary transition-colors block leading-tight tracking-tighter"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </a>
                      )}
                      {link.dropdown && (
                        <button
                          onClick={() => setActiveMobileDropdown(activeMobileDropdown === link.name ? null : link.name)}
                          className="w-12 h-12 flex items-center justify-center text-white/40 hover:text-primary transition-colors"
                        >
                          <ChevronDown
                            size={24}
                            className={`transition-transform duration-300 ${activeMobileDropdown === link.name ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>
                    {link.dropdown && (
                      <AnimatePresence>
                        {activeMobileDropdown === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-4 pl-6 border-l-2 border-primary/20 mb-4">
                              {link.dropdown.map((sub) => (
                                <a
                                  key={sub.name}
                                  href={sub.href}
                                  className="font-display text-lg font-bold text-white/40 hover:text-primary transition-colors block uppercase tracking-widest"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sub.name}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-auto pt-10">
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-primary text-brand-navy font-display font-black uppercase text-sm tracking-[0.2em] py-6 px-10 rounded-2xl hover:bg-white transition-all duration-300 text-center shadow-2xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Your Journey
                </a>
                <p className="mt-6 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                  Hurghada • Dahab • Sharm El-Sheikh <br /> Red Sea, Egypt
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;