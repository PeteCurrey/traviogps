import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { HardHat, MapPin, Shield, Bell, Battery, BarChart3 } from "lucide-react";

const Construction = () => (
  <TrackingApplicationPage
    title="Construction Fleet Tracking"
    subtitle="Construction & Plant"
    description="Track vehicles, plant machinery, and equipment across multiple construction sites. Geo-fencing, theft alerts, and utilisation reports."
    heroStat="Reduce plant theft by 85%"
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
    ctaButtonText="Request Demo"
    ctaButtonLink="/contact"
  />
);

export default Construction;
