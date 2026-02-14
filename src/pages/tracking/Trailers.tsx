import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Battery, MapPin, Bell, Magnet, BarChart3 } from "lucide-react";

const Trailers = () => (
  <TrackingApplicationPage
    title="Trailer GPS Tracking"
    subtitle="Asset & Logistics Tracking"
    description="Rugged, long-life GPS trackers for trailers, containers, and non-powered assets. Magnetic mount, 5-year battery, no wiring required."
    heroStat="5-year battery | Magnetic mount"
    keyStats={[
      { value: "5 Years", label: "Battery life" },
      { value: "IP67", label: "Weatherproof" },
      { value: "10 sec", label: "Update frequency" },
      { value: "Europe", label: "Coverage" },
    ]}
    benefits={[
      { title: "No Power Required", description: "Trailers have no power supply. Our long-life battery trackers solve this with up to 5 years of standby.", icon: Battery },
      { title: "Magnetic Mount", description: "Powerful magnets let you attach the tracker in seconds — no drilling or wiring.", icon: Magnet },
      { title: "Fleet Visibility", description: "Know where every trailer is in real-time to reduce idle time and improve utilisation.", icon: BarChart3 },
    ]}
    features={[
      { title: "Movement Alerts", description: "Know when a trailer moves without authorisation.", icon: Bell },
      { title: "Geo-fence Zones", description: "Set virtual boundaries around depots and customer sites.", icon: MapPin },
      { title: "5-Year Battery", description: "Ultra-long battery life with smart power management.", icon: Battery },
      { title: "Weatherproof", description: "IP67-rated for outdoor and industrial environments.", icon: Shield },
      { title: "Utilisation Reports", description: "Track which trailers are active and which are sitting idle.", icon: BarChart3 },
      { title: "European Roaming", description: "Track trailers across the UK and Europe.", icon: MapPin },
    ]}
    ctaButtonText="Get a Quote"
  />
);

export default Trailers;
