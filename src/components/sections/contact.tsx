import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/lib/config';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-brand-navy py-24 px-6 md:px-0 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute -left-40 top-40 w-96 h-96 bg-primary/5 rounded-full blur-[40px]" />

      <div className="container-width relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Contact Info Column */}
          <div className="space-y-12">
            <div>
              <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-bold">Contact Us</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Ready to <span className="text-primary">Dive</span>?
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Book your next diving adventure with Mako Divers Club. Contact us for courses, liveaboards, or custom packages.
              </p>
            </div>

            <div className="space-y-8">
              <ContactItem
                icon={<MapPin className="w-6 h-6 text-brand-navy" />}
                title="Our Location"
                content="Red Sea, Egypt (Hurghada • Dahab • Sharm)"
              />
              <ContactItem
                icon={<Phone className="w-6 h-6 text-brand-navy" />}
                title="Phone / WhatsApp"
                content={<a href="tel:+201234567890" className="hover:text-primary transition-colors">+20 123 456 7890</a>}
              />
              <ContactItem
                icon={<Mail className="w-6 h-6 text-brand-navy" />}
                title="Email Us"
                content={<a href="mailto:info@makodivers.club" className="hover:text-primary transition-colors">info@makodivers.club</a>}
              />
              <ContactItem
                icon={<Clock className="w-6 h-6 text-brand-navy" />}
                title="Working Hours"
                content="Daily: 8:00 AM - 6:00 PM"
              />
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <p className="text-white font-display text-sm font-bold uppercase tracking-widest mb-4">Follow Our Adventures</p>
              <div className="flex gap-4">
                <SocialButton icon={<Instagram size={20} />} href="https://www.instagram.com/makodivers" />
                <SocialButton icon={<Facebook size={20} />} href="https://www.facebook.com/makodivers" />
                <SocialButton icon={<MessageCircle size={20} />} href="https://wa.me/201234567890" />
              </div>
            </div>
          </div>

          {/* CTA Card Column */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-[20px] opacity-10 rounded-full" />
            <div className="relative bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Send size={64} className="text-white" />
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Start Your Journey
              </h3>
              <p className="text-gray-400 mb-8">
                Fill out our secure booking form to reserve your spot. No payment required immediately.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>Limited spots available for upcoming safaris</span>
                </div>

                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-primary text-brand-navy font-bold uppercase text-lg py-5 px-8 rounded-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-primary/25"
                >
                  Book Now
                </a>

                <p className="text-center text-xs text-white/40 uppercase tracking-wider">
                  Quick response • Free consultation
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: React.ReactNode }) => (
  <div className="flex items-start gap-4 group">
    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
      <div className="text-gray-400 text-base font-medium">
        {content}
      </div>
    </div>
  </div>
);

const SocialButton = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-brand-navy hover:border-primary transition-all duration-300"
  >
    {icon}
  </a>
);

export default ContactSection;
