import React from 'react';
import Image from 'next/image';
import { GOOGLE_FORM_URL } from '@/lib/config';
import { ArrowUpRight } from 'lucide-react';

const ServicesGrid = () => {
  const services = [
    {
      title: "Diving Courses",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_1.png",
      description: "Discover the magic of scuba diving in Egypt with Mako Divers Club. Whether you're a beginner or aspiring to become a Divemaster, we offer a course for every level.",
      alt: "Diving instructor with student underwater",
      cta: "View Courses"
    },
    {
      title: "Liveaboards",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_2.png",
      description: "Join us for unforgettable journeys through the stunning Red Sea. Explore fascinating wrecks in the north and dive with majestic sharks in the south.",
      alt: "Lighthouse and reef in the Red Sea",
      cta: "View Schedule"
    },
    {
      title: "Diving Packages",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_3.png",
      description: "Hassle-free diving packages in Hurghada, Dahab, and Sharm El-Sheikh. All-inclusive packages ensure you have everything you need for a seamless experience.",
      alt: "Group of happy divers on a boat",
      cta: "View Packages"
    }
  ];

  return (
    <section id="services" className="bg-brand-navy py-24 md:py-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-blue/20 rounded-full blur-[30px] translate-y-1/2 -translate-x-1/2" />

      <div className="container-width relative z-10">
        {/* Intro Heading */}
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block animate-fade-in-up">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 animate-fade-in-up delay-100">
            Discover the <span className="text-primary">Underwater</span> World
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed animate-fade-in-up delay-200">
            From beginner courses to epic liveaboard adventures, we craft unforgettable Red Sea diving journeys tailored just for you.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative flex flex-col h-full bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Card Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={95}
                />
              </div>

              {/* Card Content */}
              <div className="relative flex flex-col flex-grow p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-primary/20 pl-4 group-hover:border-primary transition-colors">
                  {service.description}
                </p>

                {/* CTA Buttons */}
                <div className="mt-auto pt-6 flex gap-4">
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary text-brand-navy font-bold uppercase text-[12px] tracking-wider py-3 px-4 rounded-sm hover:bg-white text-center transition-colors shadow-lg hover:shadow-primary/20"
                  >
                    Book Now
                  </a>
                  <button className="flex items-center gap-2 text-primary font-bold uppercase text-[12px] tracking-wider hover:text-white transition-colors">
                    {service.cta} <ArrowUpRight size={14} />
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
