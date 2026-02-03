import HeroSection from "@/components/sections/hero";
import ServicesGrid from "@/components/sections/services-grid";
import MissionSection from "@/components/sections/mission";
import Testimonials from "@/components/sections/testimonials";
import InstagramGrid from "@/components/sections/instagram-grid";
import PreFooter from "@/components/sections/pre-footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <MissionSection />
      <Testimonials />
      <InstagramGrid />
      <PreFooter />
    </>
  );
}
