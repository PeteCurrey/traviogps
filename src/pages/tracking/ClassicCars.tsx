import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Battery, MapPin, Bell, Eye, Clock } from "lucide-react";
import heroImage from "@/assets/tracking/classic-cars-hero.webp";

const ClassicCars = () => (
  <TrackingApplicationPage
    title="Classic Car GPS Tracking"
    heroImage={heroImage}
    subtitle="Heritage Vehicle Security"
    description="Discreet GPS trackers for classic cars, vintage vehicles, and collectible automobiles. No OBD port required — works with any vehicle, any age."
    heroStat="No OBD required"
    keyStats={[
      { value: "Any Age", label: "Vehicle compatibility" },
      { value: "Discreet", label: "Hidden install" },
      { value: "Battery", label: "Backup power" },
      { value: "24/7", label: "Monitoring" },
    ]}
    benefits={[
      { title: "No OBD Required", description: "Classic cars don't have OBD ports. Our trackers wire directly to the battery or use their own power.", icon: Battery },
      { title: "Discreet Installation", description: "Professional, hidden installation that won't affect the originality or aesthetics of your classic.", icon: Eye },
      { title: "Storage Alerts", description: "Most classics spend time in garages and barns. Get alerts if yours is moved unexpectedly.", icon: Bell },
    ]}
    features={[
      { title: "Universal Fit", description: "Works with any vehicle regardless of age — no OBD needed.", icon: Shield },
      { title: "Battery Backup", description: "Internal battery continues tracking if main power is cut.", icon: Battery },
      { title: "Movement Alerts", description: "Instant alerts when your classic is moved.", icon: Bell },
      { title: "Journey History", description: "Log every rally, show, and Sunday drive.", icon: Clock },
      { title: "Geo-fencing", description: "Set safe zones around garages and event venues.", icon: MapPin },
      { title: "Covert Install", description: "Hidden so well that thieves won't find it.", icon: Eye },
    ]}
    ctaButtonText="Get a Quote"
    ctaDescription="Protect your classic with discreet, reliable GPS tracking."
  />
);

export default ClassicCars;
