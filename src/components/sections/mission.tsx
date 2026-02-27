import React from 'react';
import WaveSeparator from '../ui/wave-separator';

/**
 * MissionSection Component
 * 
 * Redesigned with a creative "fading effect" using fixed background parallax.
 */
const MissionSection: React.FC = () => {
  const missionBg = "/images/assets/mission.png";

  return (
    <section
      className="relative py-24 md:py-48 lg:py-64 flex items-center bg-fixed bg-center bg-cover overflow-hidden pb-32 md:pb-64 lg:pb-80"
      style={{ backgroundImage: `url("${missionBg}")` }}
      aria-labelledby="mission-title"
    >
      {/* Dynamic Overlays for "Fading Effect" */}
      <div className="absolute inset-0 bg-brand-navy/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-transparent to-brand-navy" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-transparent to-brand-navy/80" />

      <div className="container-width relative z-30 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section Heading */}
          <div className="relative inline-block">
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-primary/10 text-7xl md:text-9xl font-display font-black uppercase whitespace-nowrap pointer-events-none select-none tracking-[0.2em]">
              Passion
            </span>
            <h2
              id="mission-title"
              className="relative font-display text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl"
            >
              Our <span className="text-primary italic">Mission</span>
            </h2>
          </div>

          {/* Mission Content */}
          <div className="space-y-8 max-w-2xl mx-auto">
            <p className="text-white text-lg md:text-2xl lg:text-3xl font-light leading-relaxed font-body drop-shadow-lg">
              Empowering divers to explore the uncharted beauty of the Red Sea.
            </p>

            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed font-body animate-pulse-slow">
              We deliver world-class scuba diving experiences with a focus on safety, community, and the professional exploration of Egypt's underwater treasures.
            </p>
          </div>

          {/* Branding Element */}
          <div className="pt-10 flex flex-col items-center gap-4">
            <div className="w-24 h-[1px] bg-primary/50" />
            <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-medium font-body">Since 2011 • Exploring Excellence</span>
          </div>
        </div>
      </div>

      <WaveSeparator color="text-brand-navy" position="bottom" />
    </section>
  );
};

export default MissionSection;