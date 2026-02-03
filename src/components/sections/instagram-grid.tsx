"use client";

import React from 'react';
import Image from 'next/image';
import { Instagram, ArrowUpRight } from 'lucide-react';

const InstagramGrid = () => {
  const assets = [
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/611970054_901071835651598_2054238453293371201_n-22.jpg", span: "md:col-span-2 md:row-span-2" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/611658775_866186813085132_844083688396115701_n-21.jpg", span: "md:col-span-1 md:row-span-1" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/612306146_904230545335727_5291961751855514070_n-20.jpg", span: "md:col-span-1 md:row-span-1" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/610910792_864702646531728_4520051095610570581_n-19.jpg", span: "md:col-span-1 md:row-span-2" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/617080460_18069600077619582_8662942157421937802_n-18.jpg", span: "md:col-span-1 md:row-span-1" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/622164027_897735329412567_536026549632050073_n-17.jpg", span: "md:col-span-2 md:row-span-1" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/622279339_1281161400582778_8860801875021881256_n-16.jpg", span: "md:col-span-1 md:row-span-1" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_5.png", span: "md:col-span-1 md:row-span-1" },
  ];

  return (
    <section id="gallery" className="relative bg-brand-navy py-24 px-6 md:px-0 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container-width">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <Instagram className="text-primary" size={20} />
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold">Live Updates</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              Behind the Scenes <span className="text-primary italic">on Feed</span>
            </h2>
          </div>

          <a
            href="https://www.instagram.com/makodivers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-primary text-white py-4 px-8 rounded-sm transition-all duration-300 group"
          >
            <span className="font-body text-sm font-bold uppercase tracking-widest">Join the Club</span>
            <ArrowUpRight size={18} className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Dynamic Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-3 md:gap-4 overflow-hidden">
          {assets.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden bg-card rounded-xl border border-white/5 transition-all duration-500 hover:border-primary/30 ${item.span}`}
            >
              <a
                href="https://www.instagram.com/makodivers"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <Image
                  src={item.src}
                  alt={`Mako Divers Club Instagram content ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={85}
                />
                {/* Overlays on hover */}
                <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-primary text-brand-navy transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Instagram size={24} />
                  </div>
                </div>
              </a>
            </div>
          ))}

          {/* Large Stat Card integrated into grid */}
          <div className="hidden md:flex flex-col items-center justify-center md:col-span-1 md:row-span-1 bg-primary p-6 rounded-xl text-brand-navy text-center">
            <p className="font-display text-3xl font-black mb-1">500+</p>
            <p className="font-body text-[10px] uppercase font-bold tracking-tighter">Daily Stories</p>
            <div className="w-8 h-[2px] bg-brand-navy/20 my-3" />
            <p className="font-body text-xs font-medium leading-tight">Capture the magic of the Red Sea every day.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramGrid;