"use client";

import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, MessageCircle, ArrowRight, ExternalLink, Loader2, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Booking Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([formData]);

      if (error) throw error;

      setSubmitted(true);
      toast.success("Inquiry sent! We'll get back to you shortly.");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative group/section">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-8 flex flex-col">
          <div className="glass-card p-6 md:p-8 lg:p-10 rounded-[2rem] border border-white/5 space-y-8 md:space-y-10 flex-grow">
            <div className="space-y-4">
              <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold block">Connect With Us</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-white leading-tight">
                Ready to dive into the <span className="text-primary italic">Deep</span>?
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Whether it's your first breath underwater or your next pro certification, our team is standing by to guide you.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
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
            </div>
          </div>

          <div className="glass-card p-8 rounded-[2rem] border border-white/5 flex items-center justify-between">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Follow Our Journey</span>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={18} />} href={siteConfig.social.instagram} />
              <SocialIcon icon={<Facebook size={18} />} href={siteConfig.social.facebook} />
              <SocialIcon icon={<MessageCircle size={18} />} href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, '')}`} />
            </div>
          </div>
        </div>

        {/* Integrated Form */}
        <div className="lg:col-span-7 relative">
          <div className="h-full glass-card p-8 md:p-12 rounded-[3rem] border border-white/10 overflow-hidden relative">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-display font-bold text-white tracking-tight">Message Received!</h3>
                <p className="text-gray-400 max-w-sm">One of our instructors will personally reach out to you within the next 24 hours.</p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="ghost"
                  className="text-primary font-bold uppercase tracking-widest text-[10px] hover:bg-white/5"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-display font-medium text-white mb-2">Send a <span className="text-primary">Direct Message</span></h3>
                  <p className="text-gray-400 text-sm">Fill out the details below and we'll handle the rest.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 ml-1">Your Name</label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jean Cousteau"
                      className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jean@pioneer.com"
                      className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 ml-1">Inquiry Type</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-white appearance-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                  >
                    <option value="Booking Inquiry">Booking Inquiry</option>
                    <option value="Diving Courses">Diving Courses</option>
                    <option value="Custom Safari">Custom Group Safari</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 ml-1">Your Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your dive plans..."
                    className="w-full bg-white/5 border border-white/10 min-h-[150px] rounded-3xl p-6 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-brand-navy h-16 rounded-2xl font-display font-black uppercase text-sm tracking-[0.2em] hover:bg-white hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
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
        <p className="text-white font-medium text-lg leading-tight">{detail}</p>
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
    className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-brand-navy hover:border-primary transition-all duration-300"
  >
    {icon}
  </a>
);

const Button = ({ children, onClick, variant, className }: any) => (
  <button onClick={onClick} className={`px-6 py-3 rounded-xl transition-all ${className} ${variant === 'ghost' ? 'hover:bg-white/5' : ''}`}>
    {children}
  </button>
);

export default ContactSection;
