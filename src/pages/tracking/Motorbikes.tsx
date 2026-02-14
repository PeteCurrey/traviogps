import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Zap, MapPin, Bell, CloudRain, PoundSterling } from "lucide-react";
import heroImage from "@/assets/tracking/motorbikes-hero.webp";

const Motorbikes = () => (
  <TrackingApplicationPage
    title="Motorbike GPS Tracking"
    heroImage={heroImage}
    subtitle="Two-Wheel Protection"
    description="Compact, weatherproof GPS trackers designed for motorcycles. Get theft alerts, journey history, and insurance-approved security."
    heroStat="Insurance discounts up to 20%"
    keyStats={[
      { value: "IP67", label: "Weatherproof rated" },
      { value: "20%", label: "Insurance savings" },
      { value: "10 sec", label: "Live updates" },
      { value: "24/7", label: "Theft monitoring" },
    ]}
    benefits={[
      { title: "Theft Recovery", description: "Motorbikes are 6x more likely to be stolen than cars. Our trackers help police recover them fast.", icon: Shield },
      { title: "Insurance Savings", description: "Many insurers offer up to 20% discount with an approved GPS tracker fitted.", icon: PoundSterling },
      { title: "Weatherproof", description: "IP67-rated trackers built to withstand rain, mud, and extreme temperatures.", icon: CloudRain },
    ]}
    features={[
      { title: "Compact Install", description: "Discreet installation that won't affect the look of your bike.", icon: Zap },
      { title: "Tamper Alerts", description: "Know instantly if someone interferes with your tracker.", icon: Bell },
      { title: "Live Tracking", description: "10-second updates when your bike is on the move.", icon: MapPin },
      { title: "Journey History", description: "Review every ride with detailed route playback.", icon: MapPin },
      { title: "Geo-fence Alerts", description: "Set safe zones around your home or garage.", icon: Shield },
      { title: "Battery Backup", description: "Continues tracking even if the main battery is disconnected.", icon: Zap },
    ]}
    ctaButtonText="Get a Quote"
  />
);

export default Motorbikes;
