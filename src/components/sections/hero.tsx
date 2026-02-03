"use client";

import React from 'react';
import Image from 'next/image';
import { GOOGLE_FORM_URL } from '@/lib/config';
import { ChevronDown } from 'lucide-react';
import WaveSeparator from '../ui/wave-separator';

const HeroSection: React.FC = () => {
  const sharkBg = "https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=2030&auto=format&fit=crop";
  const makoLogo = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_29.png";

  return (
    <div className="relative w-full overflow-hidden bg-brand-navy">
      {/* Main Hero Container */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-32 md:pt-40 pb-32 md:pb-48">

        {/* Background Image with modern gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src={sharkBg}
            alt="Vibrant Red Sea coral reef with sun rays"
            fill
            className="object-cover object-center scale-105 animate-slow-zoom"
            priority
            sizes="100vw"
          />
          {/* Enhanced gradient for better text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-transparent to-brand-navy/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-30 w-full container-width px-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-12">

          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-3xl">
            <span className="font-body text-primary uppercase tracking-[0.3em] text-sm md:text-base mb-4 animate-fade-in-up">
              Welcome to the Red Sea
            </span>
            <h1 className="font-display text-white font-extrabold text-5xl sm:text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] leading-[0.9] uppercase tracking-tight mb-8 drop-shadow-2xl animate-fade-in-up delay-100">
              Discover <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">The World</span>
            </h1>

            <p className="font-body text-gray-300 text-lg md:text-xl max-w-[600px] mb-10 leading-relaxed font-light animate-fade-in-up delay-200">
              Experience the magic of scuba diving in Egypt with Mako Divers Club. From beginner courses to expert liveaboard safaris, your Red Sea adventure starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto animate-fade-in-up delay-300">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-primary text-brand-navy font-bold uppercase tracking-wider overflow-hidden rounded-sm hover:text-white transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-brand-navy translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Start Your Adventure</span>
              </a>

              <a
                href="#services"
                className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-wider hover:bg-white hover:text-brand-navy transition-all duration-300 rounded-sm"
              >
                View Courses
              </a>
            </div>
          </div>

          {/* Floating Stats / Social Proof (Desktop Only) */}
          <div className="hidden md:flex flex-col gap-8 items-end animate-fade-in-left delay-500">
            <div className="glass-card p-6 rounded-lg text-right max-w-[200px] border-r-2 border-primary">
              <span className="block text-3xl font-bold text-white mb-1">15+</span>
              <span className="text-sm text-gray-300 uppercase tracking-wider">Years Experience</span>
            </div>
            <div className="glass-card p-6 rounded-lg text-right max-w-[200px] border-r-2 border-primary">
              <span className="block text-3xl font-bold text-white mb-1">5k+</span>
              <span className="text-sm text-gray-300 uppercase tracking-wider">Happy Divers</span>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-40 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
          <a href="#services" aria-label="Scroll down">
            <ChevronDown size={40} className="text-white" strokeWidth={1} />
          </a>
        </div>

        <WaveSeparator color="text-brand-navy" position="bottom" />
      </section>
    </div>
  );
};

export default HeroSection;
