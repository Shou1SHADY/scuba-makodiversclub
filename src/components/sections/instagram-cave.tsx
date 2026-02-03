"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

/**
 * InstagramCave Component
 * 
 * A pixel-perfect clone of the atmospheric diving cave section.
 * Features a parallax background effect and the Instagram call-to-action.
 */
const InstagramCave = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax calculation: move the background image at a different speed than the scroll
  // We use a subtle factor to maintain the "atmospheric" feel
  const parallaxTransform = `translateY(${offsetY * 0.15}px)`;

  // Assets retrieved from the provided section-specific list
  const caveImageUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_4.png";

  return (
    <section className="relative w-full overflow-hidden bg-brand-navy">
      {/* 
        Horizontal Transition Area
        Matches the screenshot's dark blue top edge before the cave visual 
      */}
      <div className="h-10 w-full bg-brand-navy" />

      {/* Main Cave Parallax Container */}
      <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
        {/* Parallax Background Image */}
        <div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ transform: parallaxTransform }}
        >
          <Image
            src={caveImageUrl}
            alt="Divers exploring an underwater cave in the Red Sea"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Atmospheric Overlays */}
          <div className="absolute inset-0 bg-black/20" /> {/* Subtle darkening */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2451] via-transparent to-[#0D2451]/40" />
        </div>

        {/* Content Overlay: "Hear from our Mako Divers Club community" */}
        <div className="absolute top-12 left-0 w-full z-10 px-6">
          <h2 className="text-[1.875rem] md:text-[3rem] font-bold text-white text-center font-display leading-tight tracking-tight drop-shadow-lg">
            Hear from our Mako Divers Club community
          </h2>
        </div>
      </div>

      {/* Instagram CTA Section Below the Image */}
      <div className="relative w-full py-20 px-6 bg-brand-navy flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full text-center">
          <p className="text-[#CFB27F] font-semibold uppercase tracking-[0.2em] text-[14px] md:text-[16px] mb-4">
            Follow our adventure
          </p>
          <h3 className="text-white text-[1.25rem] md:text-[1.5rem] font-semibold font-display tracking-wide mb-8">
            Behind the Scenes with Mako Divers Club on Instagram
          </h3>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-[#CFB27F] text-[#0D2451] font-bold uppercase text-[14px] tracking-widest rounded-[4px] hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
          >
            Join the Club @ Instagram
          </a>
        </div>

        {/* Decorative Divider */}
        <div className="mt-20 w-16 h-[2px] bg-[#CFB27F]/30" />
      </div>

    </section>
  );
};

export default InstagramCave;