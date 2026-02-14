import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Battery, MapPin, Bell, Sun, Tent } from "lucide-react";

const Caravans = () => (
  <TrackingApplicationPage
    title="Caravan & Motorhome Tracking"
    subtitle="Leisure Vehicle Security"
    description="Long-life GPS trackers for caravans, motorhomes, and camper vans. Peace of mind whether you're on holiday or your vehicle is in storage."
    heroStat="5-year battery life"
    keyStats={[
      { value: "5 Years", label: "Battery life" },
      { value: "4,000+", label: "Caravans protected" },
      { value: "98%", label: "Recovery rate" },
      { value: "24/7", label: "Monitoring" },
    ]}
    benefits={[
      { title: "Storage Security", description: "Most caravans spend months in storage. Our trackers alert you instantly if yours is moved.", icon: Shield },
      { title: "Long Battery Life", description: "Up to 5-year battery means no need to wire in — perfect for seasonal use.", icon: Battery },
      { title: "Holiday Tracking", description: "Share your live location with family while touring, and review your routes afterwards.", icon: Tent },
    ]}
    features={[
      { title: "Movement Alerts", description: "Instant notification when your caravan is moved unexpectedly.", icon: Bell },
      { title: "Geo-fencing", description: "Set boundaries around storage sites and holiday parks.", icon: MapPin },
      { title: "No Wiring", description: "Magnetic battery-powered unit — attach and go.", icon: Battery },
      { title: "Route Playback", description: "Relive your touring routes with full journey history.", icon: MapPin },
      { title: "European Coverage", description: "Track across the UK and Europe on your travels.", icon: Sun },
      { title: "Theft Recovery", description: "Real-time tracking to assist police with stolen vehicle recovery.", icon: Shield },
    ]}
    ctaButtonText="Get a Quote"
  />
);

export default Caravans;
