import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { HardHat, MapPin, Shield, Bell, Battery, BarChart3 } from "lucide-react";
import constructionHero from "@/assets/fleet/construction-hero.webp";

const Construction = () => (
  <TrackingApplicationPage
    title="Construction Fleet Tracking"
    subtitle="Construction & Plant"
    description="Track vehicles, plant machinery, and equipment across multiple construction sites. Geo-fencing, theft alerts, and utilisation reports."
    heroStat="Reduce plant theft by 85%"
    heroImage={constructionHero}
    keyStats={[
      { value: "85%", label: "Theft reduction" },
      { value: "30%", label: "Utilisation improvement" },
      { value: "Multi-site", label: "Visibility" },
      { value: "5 Years", label: "Battery trackers" },
    ]}
    benefits={[
      { title: "Site Geo-fencing", description: "Set virtual boundaries around every site and get alerts when assets leave without authorisation.", icon: MapPin },
      { title: "Theft Prevention", description: "Out-of-hours movement alerts and real-time tracking for rapid recovery.", icon: Shield },
      { title: "Utilisation Tracking", description: "Know which machines are being used and which are sitting idle across all sites.", icon: BarChart3 },
    ]}
    features={[
      { title: "Multi-site Dashboard", description: "One view across all your construction sites.", icon: MapPin },
      { title: "Plant & Vehicle Tracking", description: "Track everything from excavators to transit vans.", icon: HardHat },
      { title: "Movement Alerts", description: "Instant alerts for unauthorised movement.", icon: Bell },
      { title: "Battery Trackers", description: "No-wire trackers for unpowered plant and equipment.", icon: Battery },
      { title: "Utilisation Reports", description: "Optimise equipment allocation across projects.", icon: BarChart3 },
      { title: "Driver ID", description: "RFID tags identify which operator is using each vehicle.", icon: Shield },
    ]}
    faqs={[
      { question: "Can I track both vehicles and plant machinery?", answer: "Yes. Our platform tracks everything from transit vans to excavators, all visible on a single dashboard across all your sites." },
      { question: "How do battery trackers work for unpowered equipment?", answer: "Our battery-powered trackers use magnetic mounting and last up to 5 years on standby, so no wiring or power connection is needed." },
      { question: "Can I set different geo-fences for each construction site?", answer: "Yes. You can create unlimited geo-fence zones around every site, depot, and compound, with instant alerts when assets cross boundaries." },
      { question: "Does Driver ID work with plant machinery?", answer: "Yes. RFID tags can be assigned to each operator so you know exactly who is using which piece of equipment at any time." },
    ]}
    ctaButtonText="Request Demo"
    ctaButtonLink="/contact"
  />
);

export default Construction;
