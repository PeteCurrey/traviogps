import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Anchor, MapPin, Bell, Waves, Battery } from "lucide-react";

const Boats = () => (
  <TrackingApplicationPage
    title="Boat & Marine Tracking"
    subtitle="Marine GPS Security"
    description="Waterproof GPS trackers for boats, yachts, jet skis, and marine equipment. Track your vessel from anywhere and get alerts if it's moved."
    heroStat="IP67 waterproof rated"
    keyStats={[
      { value: "IP67", label: "Waterproof" },
      { value: "5 Years", label: "Battery option" },
      { value: "Coastal", label: "UK coverage" },
      { value: "24/7", label: "Monitoring" },
    ]}
    benefits={[
      { title: "Marina Security", description: "Get instant alerts if your boat is moved from its mooring or marina berth.", icon: Anchor },
      { title: "Waterproof Design", description: "IP67-rated trackers built for the harsh marine environment.", icon: Waves },
      { title: "Theft Recovery", description: "Real-time tracking to help locate and recover stolen vessels quickly.", icon: Shield },
    ]}
    features={[
      { title: "Marina Geo-fencing", description: "Set boundaries around marinas and moorings.", icon: MapPin },
      { title: "Movement Alerts", description: "Instant notification when your vessel moves unexpectedly.", icon: Bell },
      { title: "Waterproof Casing", description: "Sealed unit designed for marine conditions.", icon: Waves },
      { title: "Long Battery Life", description: "Battery-powered options for vessels without power.", icon: Battery },
      { title: "Journey Logging", description: "Record all trips and voyages automatically.", icon: MapPin },
      { title: "Recovery Assistance", description: "Share live location link with coastguard or police.", icon: Shield },
    ]}
    ctaButtonText="Get a Quote"
  />
);

export default Boats;
