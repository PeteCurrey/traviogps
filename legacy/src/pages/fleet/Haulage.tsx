import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Truck, MapPin, Thermometer, Shield, Clock, BarChart3 } from "lucide-react";
import haulageHero from "@/assets/fleet/haulage-hero.webp";

const Haulage = () => (
  <TrackingApplicationPage
    title="Haulage & HGV Fleet"
    subtitle="Heavy Goods & Logistics"
    description="Fleet management for haulage companies and HGV operators. Trailer tracking, temperature monitoring, tachograph integration, and compliance reporting."
    heroStat="Complete HGV fleet visibility"
    heroImage={haulageHero}
    keyStats={[
      { value: "1,000+", label: "HGVs tracked" },
      { value: "15%", label: "Fuel savings" },
      { value: "DVSA", label: "Compliance ready" },
      { value: "Cold Chain", label: "Temp monitoring" },
    ]}
    benefits={[
      { title: "Trailer Tracking", description: "Track powered and unpowered trailers with long-life battery trackers alongside your HGV fleet.", icon: Truck },
      { title: "Temperature Monitoring", description: "Remote temperature tracking for cold chain, pharmaceutical, and food logistics compliance.", icon: Thermometer },
      { title: "Compliance Support", description: "Driver hours, tachograph data, and vehicle checks to support DVSA compliance.", icon: Shield },
    ]}
    features={[
      { title: "HGV Tracking", description: "Real-time tracking for rigid and articulated vehicles.", icon: Truck },
      { title: "Trailer Trackers", description: "5-year battery trackers for trailers and containers.", icon: MapPin },
      { title: "Temperature Probes", description: "Remote monitoring with alerts for temperature breaches.", icon: Thermometer },
      { title: "Driver Hours", description: "Monitor driving time to help manage tachograph compliance.", icon: Clock },
      { title: "Fuel Reports", description: "Track fuel consumption and identify waste.", icon: BarChart3 },
      { title: "Automated Reports", description: "Daily fleet reports delivered by email.", icon: BarChart3 },
    ]}
    faqs={[
      { question: "Can I track both HGVs and trailers together?", answer: "Yes. Our platform tracks powered HGVs in real time alongside unpowered trailers using 5-year battery trackers — all on one dashboard." },
      { question: "Does it support temperature monitoring for cold chain?", answer: "Yes. Remote temperature probes provide continuous monitoring with instant alerts if temperatures breach your set thresholds — ideal for food and pharmaceutical logistics." },
      { question: "How does it help with DVSA compliance?", answer: "Our system monitors driver hours, integrates with tachograph data, and supports vehicle check records to help you stay compliant with DVSA regulations." },
      { question: "Can I get fuel consumption reports?", answer: "Yes. Our fuel reports track consumption per vehicle, identify excessive idling, and highlight wasteful driving habits to help you reduce costs." },
    ]}
    ctaButtonText="Request Demo"
    ctaButtonLink="/contact"
  />
);

export default Haulage;
