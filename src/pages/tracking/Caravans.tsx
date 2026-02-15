import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Battery, MapPin, Bell, Sun, Tent } from "lucide-react";
import heroImage from "@/assets/tracking/caravans-hero.webp";

const Caravans = () => (
  <TrackingApplicationPage
    title="Caravan & Motorhome Tracking"
    heroImage={heroImage}
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
    faqs={[
      { question: "Does the tracker work when my caravan is in storage?", answer: "Yes. Our trackers are designed for long-term storage use, with up to 5-year battery life and instant movement alerts if your caravan is moved." },
      { question: "Do I need to wire the tracker into my caravan?", answer: "No. Our magnetic battery-powered units require no wiring — simply attach and go. Perfect for seasonal use." },
      { question: "Will the tracker work abroad on holiday?", answer: "Yes. Our trackers provide full coverage across the UK and Europe, so you can track your caravan or motorhome on continental tours." },
      { question: "Can it help reduce my caravan insurance premium?", answer: "Many insurers offer discounts when a GPS tracker is fitted, as it significantly increases the chance of recovery if your caravan is stolen." },
    ]}
    ctaButtonText="Get a Quote"
  />
);

export default Caravans;
