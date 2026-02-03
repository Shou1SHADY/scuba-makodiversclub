"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Send, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020408] border-t border-white/5 pt-24 pb-12 text-white font-body overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-width relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">

          {/* Column 1: Brand Power - spans 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex flex-col group cursor-pointer">
              <span className="font-display text-4xl font-black text-white leading-none tracking-tighter group-hover:text-primary transition-colors duration-500">MAKO</span>
              <span className="font-body text-[10px] tracking-[0.5em] text-primary font-black ml-0.5">DIVERS CLUB</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Crafting premium Red Sea expeditions since inception. We combine local expertise with world-class safety to deliver the ultimate diving lifestyle.
            </p>
            <div className="space-y-4 pt-4">
              <FooterContactItem icon={<Phone size={14} />} text={siteConfig.contact.phone} />
              <FooterContactItem icon={<Mail size={14} />} text={siteConfig.contact.email} />
              <FooterContactItem icon={<MapPin size={14} />} text="Red Sea, Egypt" />
            </div>
          </div>

          {/* Column 2: Navigation - spans 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8 underline decoration-primary/30 underline-offset-8">Expeditions</h4>
            <ul className="space-y-4">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/reviews" label="Guest Stories" />
              <FooterLink href="/schedule-25/26" label="Schedule 25/26" />
              <FooterLink href="/mini-safaris" label="Mini Safaris" />
              <FooterLink href="/gallery" label="Visual Gallery" />
            </ul>
          </div>

          {/* Column 3: Training - spans 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8 underline decoration-primary/30 underline-offset-8">Training</h4>
            <ul className="space-y-4">
              <FooterLink href="/courses" label="PADI & SDI Courses" />
              <FooterLink href="/packages" label="Diving Packages" />
              <FooterLink href="/courses" label="Introduction to Tech" />
              <FooterLink href="/contact" label="Inquire" />
            </ul>
          </div>

          {/* Column 4: Community & Newsletter - spans 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
              <h4 className="text-white font-display font-bold text-xl">Join the Club</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Stay updated on upcoming expeditions and limited-time diving packages.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs flex-grow focus:outline-none focus:border-primary transition-colors"
                />
                <button className="w-12 h-12 rounded-xl bg-primary text-brand-navy flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                  <Send size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Connect Sociales</span>
              <div className="flex gap-3">
                <SocialIconButton icon={<Instagram size={18} />} href={siteConfig.social.instagram} />
                <SocialIconButton icon={<Facebook size={18} />} href={siteConfig.social.facebook} />
              </div>
            </div>
          </div>
        </div>

        {/* Big Background Graphic */}
        <div className="absolute left-0 bottom-0 opacity-[0.02] select-none pointer-events-none translate-y-1/4">
          <h1 className="text-[25rem] font-display font-black leading-none tracking-tighter">MAKO</h1>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            &copy; {currentYear} Mako Divers Club &bull; High-Performance Diving
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[10px] text-gray-600 hover:text-white transition-colors font-bold uppercase tracking-widest">Privacy</Link>
            <Link href="#" className="text-[10px] text-gray-600 hover:text-white transition-colors font-bold uppercase tracking-widest">Terms</Link>
            <Link href="#" className="text-[10px] text-gray-600 hover:text-white transition-colors font-bold uppercase tracking-widest">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, label }: { href: string, label: string }) => (
  <li>
    <Link href={href} className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-all duration-300">
      <div className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300" />
      {label}
    </Link>
  </li>
);

const FooterContactItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-3 text-gray-500 hover:text-primary transition-colors cursor-default">
    <div className="text-primary/60">{icon}</div>
    <span className="text-xs font-medium">{text}</span>
  </div>
);

const SocialIconButton = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-brand-navy hover:border-primary transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;