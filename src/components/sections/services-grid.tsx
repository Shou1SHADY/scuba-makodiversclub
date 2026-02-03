import React from 'react';
import Image from 'next/image';
import { GOOGLE_FORM_URL } from '@/lib/config';

const ServicesGrid = () => {
  const services = [
    {
      title: "Diving Courses",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_1.png",
      description: "Discover the magic of scuba diving in Egypt with Mako Divers Club. Whether you're a beginner or aspiring to become a Divemaster, we offer a course for every level. Train with certified instructors and use world-class equipment as you dive into the stunning Red Sea.",
      alt: "Diving instructor with student underwater",
      cta: "View Courses"
    },
    {
      title: "Liveaboards",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_2.png",
      description: "Join us for unforgettable journeys through the stunning Red Sea. Explore fascinating wrecks in the north and dive with majestic sharks in the south. Our 2025/26 Diving Safari Schedule is officially here!",
      alt: "Lighthouse and reef in the Red Sea",
      cta: "View Schedule"
    },
    {
      title: "Diving Packages",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_3.png",
      description: "Hassle-free diving packages in Hurghada, Dahab, and Sharm El-Sheikh. All-inclusive packages ensure you have everything you need for a seamless Red Sea experience.",
      alt: "Group of happy divers on a boat",
      cta: "View Packages"
    }
  ];

  return (
    <section id="services" className="bg-[#0D2451] pt-[120px] pb-[120px] px-6 lg:px-0">
      <div className="container mx-auto max-w-[1280px]">
        {/* Intro Heading */}
        <div className="text-center mb-16">
          <p className="text-[#CFB27F] text-sm uppercase tracking-[0.2em] mb-4 font-semibold">Our Services</p>
          <h2 className="text-[28px] md:text-[48px] font-bold text-[#CFB27F] font-display leading-[1.2] mb-6">
            Discover the Underwater World
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            From beginner courses to epic liveaboard adventures, we have everything you need for your Red Sea diving journey.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group flex flex-col bg-[#1A3E7A] rounded-lg overflow-hidden border border-[rgba(207,178,127,0.15)] hover:border-[rgba(207,178,127,0.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Card Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A3E7A] to-transparent opacity-60" />
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-grow p-6 lg:p-8">
                <h4 className="text-[20px] md:text-[24px] font-semibold text-[#CFB27F] font-display tracking-wide uppercase mb-4">
                  {service.title}
                </h4>
                
                <p className="text-white text-[15px] leading-[1.8] opacity-85 mb-6 flex-grow">
                  {service.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <a 
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-[#CFB27F] text-[#0D2451] font-bold uppercase text-sm py-3 px-4 rounded hover:bg-white transition-colors duration-300"
                  >
                    Book Now
                  </a>
                  <button className="flex-1 text-center border border-[#CFB27F] text-[#CFB27F] font-bold uppercase text-sm py-3 px-4 rounded hover:bg-[#CFB27F]/10 transition-colors duration-300">
                    {service.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
