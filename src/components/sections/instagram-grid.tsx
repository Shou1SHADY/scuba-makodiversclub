"use client";

import React from 'react';
import Image from 'next/image';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/config';

const InstagramGrid = () => {
  const assets = [
    { src: "/images/assets/gallery-1.jpg", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/assets/gallery-2.jpg", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/assets/gallery-3.jpg", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/assets/gallery-4.jpg", span: "md:col-span-1 md:row-span-2" },
    { src: "/images/assets/gallery-5.jpg", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/assets/gallery-6.jpg", span: "md:col-span-2 md:row-span-1" },
    { src: "/images/assets/gallery-7.jpg", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/assets/gallery-8.jpg", span: "md:col-span-1 md:row-span-1" },
  ];

  return (
    <section id="gallery" className="relative bg-brand-navy py-12 md:py-24 px-4 md:px-0 overflow-hidden">
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
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-primary text-white py-4 px-8 rounded-sm transition-all duration-300 group"
          >
            <span className="font-body text-sm font-bold uppercase tracking-widest">Join the Club</span>
            <ArrowUpRight size={18} className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Dynamic Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[250px] gap-2 md:gap-4 overflow-hidden">
          {assets.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden bg-card rounded-xl border border-white/5 transition-all duration-500 hover:border-primary/30 ${item.span}`}
            >
              <a
                href={siteConfig.social.instagram}
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

        </div>
      </div>
    </section>
  );
};

export default InstagramGrid;