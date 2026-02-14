import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Anchor, MapPin, Bell, Waves, Battery } from "lucide-react";
import heroImage from "@/assets/tracking/boats-hero.webp";

const Boats = () => (
  <TrackingApplicationPage
    title="Boat & Marine Tracking"
    heroImage={heroImage}
    subtitle="Coastal & Inland Waterway GPS Security"
    description="Purpose-built waterproof GPS trackers for boats, yachts, jet skis, narrowboats, and marine equipment. Full coverage across UK coastal waters, rivers, canals, and inland waterways — track your vessel from anywhere."
    heroStat="UK coastal & inland coverage"
    keyStats={[
      { value: "IP67", label: "Waterproof" },
      { value: "5 Years", label: "Battery option" },
      { value: "Full UK", label: "Coastal & inland" },
      { value: "24/7", label: "Live monitoring" },
    ]}
    benefits={[
      { title: "Coastal & Marina Security", description: "Get instant alerts if your boat is moved from its mooring, marina berth, or harbour — covering every UK coastal port.", icon: Anchor },
      { title: "Inland Waterway Tracking", description: "Full GPS coverage across canals, rivers, lakes, and reservoirs for narrowboats, canal boats, and leisure craft.", icon: Waves },
      { title: "Rapid Theft Recovery", description: "Real-time tracking with live location sharing to police, coastguard, and the Canal & River Trust for fast recovery.", icon: Shield },
    ]}
    features={[
      { title: "Marina & Harbour Geo-fencing", description: "Set boundaries around marinas, moorings, harbours, and canal basins.", icon: MapPin },
      { title: "Movement Alerts", description: "Instant notification when your vessel moves unexpectedly — day or night.", icon: Bell },
      { title: "Waterproof IP67 Casing", description: "Sealed unit built for salt water, fresh water, and harsh marine conditions.", icon: Waves },
      { title: "Long Battery Life", description: "Up to 5-year battery for vessels without shore power or engine charging.", icon: Battery },
      { title: "Coastal & Canal Journey Log", description: "Record all trips, voyages, and cruises with route playback and distance.", icon: MapPin },
      { title: "Emergency Location Sharing", description: "Share a live location link with coastguard, police, or marina staff instantly.", icon: Shield },
    ]}
    ctaButtonText="Get a Quote"
    ctaDescription="Protect your vessel on coastal waters or inland waterways — speak with our team today."
  />
);

export default Boats;
