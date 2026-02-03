import React from 'react';
import { Star, Quote } from 'lucide-react';

/**
 * Testimonials Section
 * Redesigned using a modern masonry-like grid with professional styling.
 * Theme: Dark
 * Colors: Brand Navy (#0D2451), Brand Gold (#CFB27F), Ocean Accent (#1A3E7A)
 */

interface Testimonial {
  id: number;
  name: string;
  date: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mahmoud Shebl",
    date: "11/01/2026",
    content: "Thank you Mako for making Diving a hassle free sport. Your team's professionalism and knowledge of the Red Sea locations made my experience truly unforgettable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Abdullah Abo Ghanima",
    date: "26/10/2025",
    content: "I’ve been diving with Mako Divers for quite a while now. The community they have built is exceptional. Whether it's a day trip or a full liveaboard, they maintain the same high standard of safety and fun.",
    rating: 5,
  },
  {
    id: 3,
    name: "Milad M Adly Wassef",
    date: "26/10/2025",
    content: "Amazing community of passionate divers! Always a great atmosphere and impeccable organization. They really know how to find the best spots in Egypt.",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="bg-brand-navy py-[120px] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1A3E7A]/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-[1280px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[3rem] font-display font-bold text-brand-gold mb-4 uppercase tracking-wider">
            Your Words! Not Ours.
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-[1px] w-12 bg-brand-gold/40" />
            <p className="font-small-cap text-brand-gold m-0">Hear from our Mako Divers Club community</p>
            <div className="h-[1px] w-12 bg-brand-gold/40" />
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#CFB27F" color="#CFB27F" />
              ))}
            </div>
            <p className="text-white text-sm opacity-80 uppercase tracking-widest">
              100% recommend based on 17+ reviews
            </p>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="service-card p-8 flex flex-col h-full group"
              style={{ backgroundColor: '#1A3E7A' }}
            >
              <div className="mb-6 flex justify-between items-start">
                <Quote 
                  size={32} 
                  className="text-brand-gold opacity-30 group-hover:opacity-100 transition-opacity duration-300" 
                />
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#CFB27F" color="#CFB27F" />
                  ))}
                </div>
              </div>

              <blockquote className="flex-grow">
                <p className="text-white italic leading-relaxed text-[1.1rem]">
                  "{testimonial.content}"
                </p>
              </blockquote>

              <div className="mt-8 pt-6 border-t border-brand-gold/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-navy border border-brand-gold/30 flex items-center justify-center overflow-hidden">
                  <span className="text-brand-gold font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-brand-gold uppercase tracking-wide leading-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-brand-gold/60 m-0 uppercase font-medium">
                    {testimonial.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action - Reviews Button */}
        <div className="mt-16 text-center">
          <a 
            href="/reviews" 
            className="btn-primary"
            style={{ 
              backgroundColor: '#CFB27F', 
              color: '#0D2451', 
              padding: '12px 32px', 
              fontWeight: 700, 
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}
          >
            Read All Reviews
          </a>
        </div>
      </div>

      {/* Underwater Vibe Shadow Treatment at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
};

export default Testimonials;