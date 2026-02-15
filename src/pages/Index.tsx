import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { UseCasesSection } from "@/components/home/UseCasesSection";
import { ApplicationsGrid } from "@/components/home/ApplicationsGrid";
import { FleetIndustriesSection } from "@/components/home/FleetIndustriesSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { SplashScreen } from "@/components/SplashScreen";
import { usePageMeta } from "@/lib/seo";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  usePageMeta(
    "Travio | Smart GPS Tracking Systems for Vehicles, Fleets & Assets",
    "Professional GPS tracking solutions. Real-time vehicle tracking, fleet management, and asset monitoring trusted by 94,000+ users across 185 countries.",
  );

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <PageWrapper>
        <HeroSection />
        <AboutSection />
        <FeaturedProducts />
        <UseCasesSection />
        <ApplicationsGrid />
        <FleetIndustriesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </PageWrapper>
    </>
  );
};

export default Index;
