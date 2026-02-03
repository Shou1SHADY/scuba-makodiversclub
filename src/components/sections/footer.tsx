import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020408] border-t border-white/5 pt-20 pb-10 text-white font-body">
      <div className="container-width">
        {/* Multi-column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Description */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-primary leading-none tracking-tight">MAKO</span>
              <span className="font-body text-[10px] tracking-[0.4em] text-white/60">DIVERS CLUB</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Mako Divers enables divers to pursue their passion for the underwater world through
              top-notch scuba diving experiences and liveaboard trips in the breathtaking Red Sea.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/reviews" className="text-sm text-gray-400 hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/schedule-25/26" className="text-sm text-gray-400 hover:text-white transition-colors">Schedule 25/26</Link></li>
              <li><Link href="/mini-safaris" className="text-sm text-gray-400 hover:text-white transition-colors">Mini Safaris</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link href="/courses" className="text-sm text-gray-400 hover:text-white transition-colors">Diving Courses</Link></li>
              <li><Link href="/schedule-25/26" className="text-sm text-gray-400 hover:text-white transition-colors">Liveaboards</Link></li>
              <li><Link href="/packages" className="text-sm text-gray-400 hover:text-white transition-colors">Diving Packages</Link></li>
              <li><Link href="/gallery" className="text-sm text-gray-400 hover:text-white transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Column 4: Social & Legal */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Connect</h4>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={20} />} href="https://www.instagram.com/makodivers" />
              <SocialIcon icon={<Facebook size={20} />} href="https://www.facebook.com/makodivers" />
              <SocialIcon icon={<Twitter size={20} />} href="#" />
            </div>
            <div className="pt-6">
              <p className="text-xs text-gray-500">
                &copy; {currentYear} Mako Divers Club.<br />All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Cookie Notice */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
          <p className="text-[10px] text-gray-600 uppercase tracking-wider">
            Designed for the Red Sea
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-brand-navy transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;