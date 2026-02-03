import React from 'react';

/**
 * MissionSection Component
 * 
 * A premium, minimal "Our Mission" section centered on professional typography
 * and ample negative space, adhering to the Mako Divers dark navy and gold theme.
 */
const MissionSection: React.FC = () => {
  return (
    <section 
      className="bg-[#0D2451] py-[120px] px-6 md:px-24 flex flex-col items-center justify-center text-center"
      aria-labelledby="mission-title"
    >
      <div className="max-w-[800px] w-full mx-auto space-y-8">
        {/* Section Heading - Matches H2 style from design system */}
        <h2 
          id="mission-title"
          className="font-display text-[48px] md:text-[64px] font-bold text-[#CFB27F] leading-tight mb-8"
          style={{ 
            fontFamily: '"Bitter", serif',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)'
          }}
        >
          Our Mission
        </h2>

        {/* Mission Content - Focuses on readability and premium spacing */}
        <div className="space-y-6">
          <p 
            className="text-[#FFFFFF] text-[18px] md:text-[22px] font-medium leading-[1.8] opacity-95 transition-opacity duration-500 hover:opacity-100"
            style={{ fontFamily: '"Bitter", serif' }}
          >
            Our mission at Mako Divers is to enable divers to pursue their passion for the underwater world. 
          </p>
          
          <p 
            className="text-[#FFFFFF] text-[18px] md:text-[22px] font-medium leading-[1.8] opacity-95 transition-opacity duration-500 hover:opacity-100"
            style={{ fontFamily: '"Bitter", serif' }}
          >
            We offer top-notch scuba diving experiences and liveaboard trips in Egypt, 
            designed for divers of all levels exploring the breathtaking Red Sea.
          </p>
        </div>

        {/* Decorative Divider - Subtle premium touch */}
        <div className="pt-8 flex justify-center">
          <div className="w-24 h-[2px] bg-[#CFB27F] opacity-30 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default MissionSection;