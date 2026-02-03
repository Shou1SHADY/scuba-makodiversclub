"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Star, MessageCircle, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2, Facebook } from 'lucide-react';
import { getFacebookReviews, Review } from '@/lib/api/reviews';
import { siteConfig } from '@/lib/config';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: true,
    skipSnaps: false,
    dragFree: true
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi, setScrollSnaps, onSelect]);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getFacebookReviews();
        setReviews(data);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  return (
    <section id="testimonials" className="bg-[#050B14] py-24 md:py-32 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none opacity-30" />

      {/* Subtle Texture Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      <div className="container-width relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <span className="w-12 h-[1px] bg-primary/40 hidden md:block" />
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                <Facebook size={14} className="text-primary" />
                <span className="text-primary text-[10px] uppercase tracking-[0.2em] font-bold">Facebook Social Proof</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-[1.1]">
              Trusted by the <span className="text-primary italic">Global</span> Community
            </h2>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
            <div className="flex items-center gap-1.5 bg-white/5 py-2 px-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="text-primary" />
                ))}
              </div>
              <span className="text-white font-bold text-sm ml-2">5.0 Rating</span>
              <div className="w-[1px] h-4 bg-white/20 mx-2" />
              <span className="text-gray-400 text-xs">150+ Reviews</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-[11px] uppercase tracking-tighter">
              <RefreshCw size={12} className={loading ? "animate-spin text-primary" : "text-primary/60"} />
              <span>Real-time Sync Active</span>
            </div>
          </div>
        </div>

        <div className="relative group overflow-visible">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing py-8" ref={emblaRef}>
            <div className="flex items-stretch -ml-4">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_28%] pl-6 md:pl-8 h-[280px]">
                    <div className="w-full h-full bg-white/5 animate-pulse rounded-3xl border border-white/5" />
                  </div>
                ))
              ) : (
                reviews.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_28%] pl-6 md:pl-8 relative group/card"
                  >
                    <div className="h-full bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 p-6 md:p-8 rounded-[2rem] flex flex-col backdrop-blur-md transition-all duration-500 group-hover/card:border-primary/50 group-hover/card:bg-white/[0.1] group-hover/card:translate-y-[-4px] shadow-xl group-hover/card:shadow-primary/10">
                      {/* Quote Icon Background - Smaller */}
                      <div className="absolute top-6 right-8 text-white/[0.03] select-none pointer-events-none">
                        <MessageCircle size={60} strokeWidth={1} />
                      </div>

                      {/* Header: Name Only - Compact */}
                      <div className="flex items-center gap-4 mb-4 relative z-10">
                        {/* Avatar Fallback / Initials */}
                        <div className="relative group/avatar">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 p-0.5 bg-brand-navy shadow-lg transition-transform duration-500 group-hover/card:scale-105 flex items-center justify-center">
                            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                              {testimonial.name.charAt(0)}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-display font-bold text-lg leading-tight mb-0.5 group-hover/card:text-primary transition-colors">
                            {testimonial.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} size={10} fill="currentColor" className="text-primary" />
                              ))}
                            </div>
                            {testimonial.verified && (
                              <>
                                <CheckCircle2 size={10} className="text-blue-400" />
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Verified</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content - Smaller Text */}
                      <blockquote className="flex-grow relative z-10">
                        <p className="text-gray-300 text-[15px] leading-relaxed font-body font-light line-clamp-4">
                          "{testimonial.content}"
                        </p>
                      </blockquote>

                      {/* Footer: Date - Compact */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-gray-500 text-[10px] font-medium">
                          {new Date(testimonial.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <div className="text-primary font-bold text-[9px] uppercase tracking-widest opacity-0 group-hover/card:opacity-100 transition-opacity">
                          View Original
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Navigation Controls - Absolute Sides */}
          {!loading && reviews.length > 0 && (
            <>
              {/* Left Button */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full z-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-navy/80 border border-white/10 text-white hover:bg-primary hover:text-brand-navy hover:border-primary transition-all duration-300 shadow-2xl backdrop-blur-sm flex items-center justify-center group/nav"
                onClick={scrollPrev}
                aria-label="Previous review"
              >
                <ChevronLeft size={28} className="group-hover/nav:scale-110 transition-transform" />
              </button>

              {/* Right Button */}
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full z-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-navy/80 border border-white/10 text-white hover:bg-primary hover:text-brand-navy hover:border-primary transition-all duration-300 shadow-2xl backdrop-blur-sm flex items-center justify-center group/nav"
                onClick={scrollNext}
                aria-label="Next review"
              >
                <ChevronRight size={28} className="group-hover/nav:scale-110 transition-transform" />
              </button>
            </>
          )}

          {/* Navigation Controls - Container for dots */}
          {!loading && reviews.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 md:mt-16">

              {/* Pagination Dots */}
              <div className="flex gap-2">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${index === selectedIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Global CTA */}
        <div className="mt-20 text-center border-t border-white/5 pt-16">
          <div className="inline-block p-1 bg-white/5 rounded-2xl border border-white/10">
            <a
              href={`${siteConfig.social.facebook}reviews/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-primary text-brand-navy py-5 px-12 rounded-xl font-display font-black uppercase text-sm tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(229,197,158,0.4)]"
            >
              <Facebook size={20} fill="currentColor" />
              Read All 150+ Reviews
            </a>
          </div>
          <p className="mt-6 text-gray-500 text-xs font-medium uppercase tracking-widest italic">
            Join the club with 4,500+ members worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;