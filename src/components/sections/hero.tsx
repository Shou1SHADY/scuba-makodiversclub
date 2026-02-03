import React from 'react';
import Image from 'next/image';
import { GOOGLE_FORM_URL } from '@/lib/config';

const HeroSection: React.FC = () => {
  const sharkBg = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_28.png";
  const makoLogo = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_29.png";

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Hero Container - Account for fixed header height */}
      <section className="relative h-[100vh] min-h-[600px] w-full flex flex-col items-center pt-[100px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={sharkBg}
            alt="Mako Shark underwater in the Red Sea"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(13,36,81,0.4)] via-[rgba(13,36,81,0.2)] to-[#0D2451]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow w-full max-w-[1280px] px-6 md:px-12">
          <div className="text-center md:text-left md:self-start max-w-[900px]">
            <h1 className="text-[#CFB27F] font-bold text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] leading-[1] uppercase tracking-[0.05em] drop-shadow-[2px_2px_8px_rgba(0,0,0,0.5)] mb-8">
              Your Ultimate<br />Dive Plan
            </h1>
            <p className="text-white text-lg md:text-xl max-w-[600px] mb-10 opacity-90 leading-relaxed">
              Experience world-class scuba diving in Egypt&apos;s Red Sea. Diving courses, liveaboard trips, and unforgettable underwater adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-10 py-4 hover:scale-105 transition-transform"
              >
                Book Now
              </a>
              <a 
                href="#services"
                className="inline-block px-10 py-4 border-2 border-[#CFB27F] text-[#CFB27F] font-bold uppercase rounded hover:bg-[#CFB27F] hover:text-[#0D2451] transition-all duration-300"
              >
                Explore Programs
              </a>
            </div>
          </div>
        </div>

        {/* Centered Logo at Bottom of Hero */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-10 w-[150px] md:w-[200px]">
          <Image
            src={makoLogo}
            alt="Mako Divers Club Logo"
            width={200}
            height={67}
            className="object-contain"
          />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce hidden md:block">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#CFB27F" 
            strokeWidth="2"
            className="opacity-60"
          >
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
