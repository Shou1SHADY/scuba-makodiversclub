import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, MessageCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { siteConfig, GOOGLE_FORM_URL } from '@/lib/config';
import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="relative group/section">
      {/* Dynamic Background Elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">

        {/* Contact Info Sidebar - spans 5 columns */}
        <div className="lg:col-span-5 space-y-8 flex flex-col">
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 space-y-8 flex-grow">
            <div className="space-y-4">
              <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold block">Connect With Us</span>
              <h2 className="text-4xl font-display font-medium text-white leading-tight">
                Ready to dive into the <span className="text-primary italic">Deep</span>?
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Whether it's your first breath underwater or your next pro certification, our team is standing by to guide you.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <ContactCard
                icon={<MapPin className="text-primary" size={20} />}
                title="Our Base"
                detail="Red Sea, Egypt"
                subDetail="Hurghada • Dahab • Sharm"
              />
              <ContactCard
                icon={<Phone className="text-primary" size={20} />}
                title="Direct Lines"
                detail={siteConfig.contact.phone}
                subDetail="Available on WhatsApp"
                link={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              />
              <ContactCard
                icon={<Mail className="text-primary" size={20} />}
                title="Email Support"
                detail={siteConfig.contact.email}
                subDetail="24h Response Time"
                link={`mailto:${siteConfig.contact.email}`}
              />
              <ContactCard
                icon={<Clock className="text-primary" size={20} />}
                title="Operations"
                detail="Daily: 8:00 AM - 6:00 PM"
                subDetail="Red Sea Local Time"
              />
            </div>
          </div>

          {/* Social Presence */}
          <div className="glass-card p-8 rounded-[2rem] border border-white/5 flex items-center justify-between">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Follow Our Journey</span>
            <div className="flex gap-3">
              <SocialIcon icon={<Instagram size={18} />} href={siteConfig.social.instagram} />
              <SocialIcon icon={<Facebook size={18} />} href={siteConfig.social.facebook} />
              <SocialIcon icon={<MessageCircle size={18} />} href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, '')}`} />
            </div>
          </div>
        </div>

        {/* Main Booking/Contact Card - spans 7 columns */}
        <div className="lg:col-span-7 relative group">
          <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
          <div className="relative h-full glass-card p-10 md:p-14 rounded-[3rem] border border-white/10 flex flex-col justify-between overflow-hidden">

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />

            <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-4xl font-display font-medium text-white">Let's Plan Your <br /><span className="text-primary">Expedition</span></h3>
                  <div className="h-1 w-20 bg-primary/30 rounded-full" />
                </div>
                <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/5 items-center justify-center text-primary border border-white/10">
                  <Send size={28} />
                </div>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                For the fastest response and accurate availability, please use our simplified booking request form. Our team reviews entries hourly.
              </p>

              <div className="grid gap-6">
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 group/link hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <ExternalLink size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Secure Booking Portal</h4>
                    <p className="text-gray-500 text-xs">Redirects to our encrypted Google Form</p>
                  </div>
                  <ArrowRight size={20} className="ml-auto text-gray-700 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 space-y-8">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center w-full gap-4 bg-primary text-brand-navy py-6 px-10 rounded-2xl font-display font-black uppercase text-sm tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-2xl overflow-hidden group/btn text-center"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity" />
                Proceed to Booking Form
                <ArrowRight size={18} className="animate-pulse" />
              </a>

              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> No Deposit Required</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> 24h Confirmation</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> Direct WhatsApp Link</span>
              </div>
            </div>

            {/* Bottom Graphic Decoration */}
            <div className="absolute bottom-0 right-0 p-12 opacity-5 scale-150 select-none pointer-events-none">
              <h1 className="text-9xl font-display font-black uppercase italic tracking-tighter">MAKO</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ icon, title, detail, subDetail, link }: { icon: React.ReactNode, title: string, detail: string, subDetail: string, link?: string }) => {
  const CardContent = (
    <div className="flex items-start gap-5 group/card cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/card:scale-110 group-hover/card:border-primary/50 transition-all duration-300">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-gray-500 text-[10px] uppercase font-bold tracking-widest group-hover/card:text-primary transition-colors">{title}</h4>
        <p className="text-white font-medium text-lg leading-none">{detail}</p>
        <p className="text-gray-600 text-xs">{subDetail}</p>
      </div>
    </div>
  );

  return link ? <a href={link} className="block">{CardContent}</a> : <div className="block">{CardContent}</div>;
};

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-brand-navy hover:border-primary transition-all duration-300"
  >
    {icon}
  </a>
);

export default ContactSection;
