import React from 'react';
import Image from 'next/image';

/**
 * InstagramGrid Component
 * Featuring the latest images from Mako Divers Club behind-the-scenes content.
 * 
 * Design matches the "Premium Deep-Sea" aesthetic:
 * - Brand Navy (#0D2451) background
 * - Bitter serif typography for the header (Gold #CFB27F)
 * - 4-column overflow-hidden grid layout
 * - Subtle hover effects as per high-level design
 */

const InstagramGrid = () => {
  const assets = [
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/611970054_901071835651598_2054238453293371201_n-22.jpg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/611658775_866186813085132_844083688396115701_n-21.jpg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/612306146_904230545335727_5291961751855514070_n-20.jpg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/610910792_864702646531728_4520051095610570581_n-19.jpg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/617080460_18069600077619582_8662942157421937802_n-18.jpg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/622164027_897735329412567_536026549632050073_n-17.jpg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/622279339_1281161400582778_8860801875021881256_n-16.jpg"
  ];

  return (
    <section id="gallery" className="bg-[#0D2451] py-[120px] px-6 md:px-0">
      <div className="container mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="mb-[60px] text-center">
          <h2 className="font-display text-[2rem] md:text-[3rem] font-bold text-[#CFB27F] leading-tight mb-4 tracking-wide uppercase">
            Behind the Scenes with Mako Divers Club on Instagram
          </h2>
          <div className="w-[80px] h-[1px] bg-[#CFB27F]/20 mx-auto mt-8"></div>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 overflow-hidden">
          {assets.map((src, index) => (
            <div 
              key={index} 
              className="group relative aspect-square overflow-hidden rounded-[8px] border border-[#CFB27F]/20"
            >
              <Image
                src={src}
                alt={`Mako Divers Club Instagram content ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Overlays on hover as per high-level design */}
              <div className="absolute inset-0 bg-[#0D2451]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  width="24" 
                  height="24" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-[#CFB27F] w-8 h-8"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </div>
          ))}
          
          {/* Placeholder for the 8th item to maintain grid symmetry if data is missing, 
              calculated as 2x4 grid. Using 7 assets as provided. */}
          <div className="hidden md:flex flex-col items-center justify-center aspect-square rounded-[8px] border border-dashed border-[#CFB27F]/30 bg-[#1A3E7A]/30">
            <span className="text-[#CFB27F] font-display font-semibold uppercase text-sm tracking-widest px-4 text-center">
              Follow Us @MakoDivers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramGrid;