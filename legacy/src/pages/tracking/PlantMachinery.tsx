import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Battery, MapPin, Bell, Wifi, Clock } from "lucide-react";
import heroImage from "@/assets/tracking/plant-machinery-hero.webp";

const PlantMachinery = () => (
  <TrackingApplicationPage
    title="Plant & Machinery Tracking"
    heroImage={heroImage}
    subtitle="Construction & Industrial"
    description="Protect your plant and machinery with rugged, battery-powered GPS trackers designed for construction sites, quarries, and industrial environments."
    heroStat="Reduce theft by up to 85%"
    keyStats={[
      { value: "£800M", label: "Plant stolen annually in UK" },
      { value: "5 Years", label: "Battery life" },
      { value: "85%", label: "Theft reduction" },
      { value: "10 sec", label: "Location updates" },
    ]}
    benefits={[
      { title: "Theft Prevention", description: "Instant alerts when machinery is moved outside of working hours or leaves a geo-fenced site boundary.", icon: Shield },
      { title: "Long Battery Life", description: "Up to 5-year battery life means no wiring required — attach magnetically and forget.", icon: Battery },
      { title: "Site Utilisation", description: "Track which machines are being used and where, to optimise equipment allocation across multiple sites.", icon: MapPin },
    ]}
    features={[
      { title: "Geo-fence Alerts", description: "Set virtual boundaries around sites and get instant notifications if equipment leaves.", icon: Bell },
      { title: "Movement Alerts", description: "Know the moment any tracked asset moves — day or night.", icon: Shield },
      { title: "Real-time Tracking", description: "10-second GPS updates when assets are on the move.", icon: MapPin },
      { title: "No Wiring Needed", description: "Magnetic, battery-powered trackers that attach in seconds.", icon: Battery },
      { title: "4G Connectivity", description: "Reliable coverage even on remote construction sites.", icon: Wifi },
      { title: "Journey History", description: "Full audit trail of every movement for insurance and compliance.", icon: Clock },
    ]}
    faqs={[
      { question: "Does the tracker need to be wired into the machinery?", answer: "No. Our plant trackers are battery-powered with magnetic mounting, so they attach in seconds without any wiring or modification." },
      { question: "How long does the battery last?", answer: "Up to 5 years on standby. The tracker uses smart power management to conserve battery, waking up when movement is detected." },
      { question: "Can I track equipment across multiple construction sites?", answer: "Yes. Our dashboard gives you a single view of all tracked assets across every site, making it easy to manage equipment allocation." },
      { question: "Will it work on remote sites with poor signal?", answer: "Our trackers use 4G connectivity with fallback options, providing reliable coverage even on remote construction sites." },
    ]}
    ctaButtonText="Get a Quote"
  />
);

export default PlantMachinery;
