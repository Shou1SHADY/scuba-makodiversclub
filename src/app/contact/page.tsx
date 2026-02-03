import ContactSection from "@/components/sections/contact";
import WaveSeparator from "@/components/ui/wave-separator";
import { MessageSquare, Heart } from 'lucide-react';
import React from 'react';

export default function ContactPage() {
    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Page Header Section */}
            <div className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
                {/* Visual Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-brand-navy/50 to-brand-navy z-0" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container-width px-6 relative z-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in shadow-xl">
                        <MessageSquare size={14} className="text-primary fill-primary" />
                        <span className="text-primary uppercase tracking-[0.2em] text-[10px] font-bold">Get in Touch</span>
                    </div>

                    <h1 className="text-white mb-6 text-5xl md:text-7xl font-display font-medium tracking-tight animate-fade-in-up">
                        We're Here to <span className="text-primary italic">Guide</span> You
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Have a question about a course or ready to join our next expedition? Our team of passionate divers is ready to help.
                    </p>
                </div>
            </div>

            <div className="container-width px-6 pb-24 relative z-10">
                <ContactSection />
            </div>

            {/* Support Highlight Section */}
            <div className="container-width px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-white/5">
                    <FeatureBox
                        icon={<Heart className="text-primary" size={24} />}
                        title="Diver-to-Diver"
                        desc="You'll talk to real instructors, not sales agents. We know the Red Sea because we live in it."
                    />
                    <FeatureBox
                        icon={<MessageSquare className="text-primary" size={24} />}
                        title="Fast Response"
                        desc="Expect a personal response via email or WhatsApp within 24 hours of your inquiry."
                    />
                    <FeatureBox
                        icon={<Heart className="text-primary" size={24} />}
                        title="Flexibility"
                        desc="Plans change. We offer flexible rescheduling for all courses and local diving trips."
                    />
                </div>
            </div>

            {/* Wave Separator before Footer */}
            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
}

const FeatureBox = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="text-center md:text-left space-y-4 group">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto md:mx-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500">
            {icon}
        </div>
        <h3 className="text-white font-display font-bold text-xl">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
);
