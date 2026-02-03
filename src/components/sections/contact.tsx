import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { GOOGLE_FORM_URL, siteConfig } from '@/lib/config';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-[#1A3E7A] py-[120px] px-6">
      <div className="container mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#CFB27F] text-sm uppercase tracking-[0.2em] mb-4 font-semibold">Get In Touch</p>
          <h2 className="text-[28px] md:text-[48px] font-bold text-[#CFB27F] font-display leading-[1.2] mb-6">
            Ready to Dive?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Book your next diving adventure with Mako Divers Club. Contact us for courses, liveaboards, or custom packages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0D2451] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#CFB27F]" />
              </div>
              <div>
                <h4 className="text-[#CFB27F] font-semibold text-lg mb-2">Location</h4>
                <p className="text-white/80 text-base leading-relaxed m-0">
                  Red Sea, Egypt<br />
                  Hurghada • Dahab • Sharm El-Sheikh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0D2451] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#CFB27F]" />
              </div>
              <div>
                <h4 className="text-[#CFB27F] font-semibold text-lg mb-2">Phone</h4>
                <p className="text-white/80 text-base m-0">
                  <a href="tel:+201234567890" className="hover:text-[#CFB27F] transition-colors">
                    +20 123 456 7890
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0D2451] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#CFB27F]" />
              </div>
              <div>
                <h4 className="text-[#CFB27F] font-semibold text-lg mb-2">Email</h4>
                <p className="text-white/80 text-base m-0">
                  <a href="mailto:info@makodivers.club" className="hover:text-[#CFB27F] transition-colors">
                    info@makodivers.club
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0D2451] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#CFB27F]" />
              </div>
              <div>
                <h4 className="text-[#CFB27F] font-semibold text-lg mb-2">Availability</h4>
                <p className="text-white/80 text-base m-0">
                  Daily: 8:00 AM - 6:00 PM<br />
                  Liveaboards: Year-round
                </p>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-[#0D2451] rounded-lg p-8 lg:p-12 border border-[rgba(207,178,127,0.2)]">
            <h3 className="text-[#CFB27F] font-display text-2xl md:text-3xl font-bold mb-6">
              Book Your Dive Today
            </h3>
            <p className="text-white/80 text-base leading-relaxed mb-8">
              Fill out our booking form and our team will get back to you within 24 hours to confirm your diving adventure. We&apos;ll help you choose the perfect course, liveaboard, or package for your experience level.
            </p>
            
            <div className="space-y-4">
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#CFB27F] text-[#0D2451] font-bold uppercase text-lg py-4 px-8 rounded hover:bg-white transition-colors duration-300"
              >
                Book Now
              </a>
              <p className="text-white/60 text-sm text-center m-0">
                Quick response • No commitment required • Free consultation
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-8 border-t border-[rgba(207,178,127,0.2)]">
              <p className="text-[#CFB27F] text-sm uppercase tracking-wider mb-4 font-semibold">Follow Our Adventures</p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/makodivers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1A3E7A] flex items-center justify-center hover:bg-[#CFB27F] transition-colors group"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#CFB27F] group-hover:text-[#0D2451]" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/makodivers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1A3E7A] flex items-center justify-center hover:bg-[#CFB27F] transition-colors group"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#CFB27F] group-hover:text-[#0D2451]" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/201234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1A3E7A] flex items-center justify-center hover:bg-[#CFB27F] transition-colors group"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#CFB27F] group-hover:text-[#0D2451]" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
