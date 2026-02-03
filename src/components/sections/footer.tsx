import React from 'react';
import Link from 'next/link';

/**
 * Footer Component for Mako Divers Club
 * Redesigned into a multi-column professional layout as per design instructions.
 * Incorporates: Quick links, copyright info, and a subtle cookies consent notice.
 * Theme: Dark (#0D2451 background, #CFB27F gold accents).
 */
const Footer = () => {
  return (
    <footer className="bg-brand-navy pt-20 pb-10 text-white font-body border-t border-border">
      <div className="container mx-auto px-6">
        {/* Multi-column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Description */}
          <div className="space-y-6">
            <h4 className="text-xl font-display font-bold text-brand-gold uppercase tracking-wider">
              Mako Divers Club
            </h4>
            <p className="text-sm leading-relaxed opacity-80 max-w-xs">
              Mako Divers enables divers to pursue their passion for the underwater world through 
              top-notch scuba diving experiences and liveaboard trips in the breathtaking Red Sea.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-small-cap mb-6">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-sm hover:text-brand-gold transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm hover:text-brand-gold transition-colors duration-300">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/schedule-25/26" className="text-sm hover:text-brand-gold transition-colors duration-300">
                  Schedule 25/26
                </Link>
              </li>
              <li>
                <Link href="/mini-safaris" className="text-sm hover:text-brand-gold transition-colors duration-300">
                  Mini Safaris
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-sm font-small-cap mb-6">Services</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/courses" className="text-sm hover:text-brand-gold transition-colors duration-300">
                  Diving Courses
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-sm hover:text-brand-gold transition-colors duration-300">
                  Diving Packages
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm hover:text-brand-gold transition-colors duration-300">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-small-cap mb-6">Connect</h4>
            <p className="text-sm opacity-80">
              Join our community of passionate divers exploring the Red Sea.
            </p>
            <div className="flex space-x-4">
              {/* Instagram link placeholder based on content */}
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-gold hover:opacity-80 transition-opacity"
              >
                Instagram
              </a>
              <span className="text-border">|</span>
              <a 
                href="#" 
                className="text-brand-gold hover:opacity-80 transition-opacity"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-border mb-8"></div>

        {/* Bottom Bar: Copyright and Cookie Notice */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="text-xs opacity-60 text-center lg:text-left">
            Copyright © 2025 Mako Divers Club - All Rights Reserved.
          </div>

          {/* Subtle Cookie Consent Notice */}
          <div className="bg-ocean-accent/30 border border-border p-4 rounded-lg max-w-xl">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 text-[11px] leading-snug opacity-80 text-center sm:text-left">
                <span className="text-brand-gold font-semibold uppercase block mb-1">Cookie Notice</span>
                We use cookies to analyze traffic and optimize your experience. By continuing, you agree to our use of cookies.
              </div>
              <div className="flex gap-2">
                <button className="text-[10px] uppercase font-bold px-3 py-1.5 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 rounded">
                  Decline
                </button>
                <button className="text-[10px] uppercase font-bold px-3 py-1.5 bg-brand-gold text-brand-navy hover:opacity-90 transition-all duration-300 rounded">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;