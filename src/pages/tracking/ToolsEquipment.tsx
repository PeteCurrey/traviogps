import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Package, MapPin, Bell, Wifi, Search } from "lucide-react";

const ToolsEquipment = () => (
  <TrackingApplicationPage
    title="Tool & Equipment Tracking"
    subtitle="Small Asset Protection"
    description="Compact, concealable GPS trackers for power tools, equipment cases, and high-value portable assets. Never lose a tool again."
    heroStat="From just £24.99"
    keyStats={[
      { value: "£1.5B", label: "Tool theft cost per year" },
      { value: "30 Days", label: "Battery standby" },
      { value: "5m", label: "Location accuracy" },
      { value: "24/7", label: "Monitoring" },
    ]}
    benefits={[
      { title: "Ultra Compact", description: "Small enough to hide inside tool cases, bags, and equipment boxes without detection.", icon: Package },
      { title: "Theft Alerts", description: "Get instant push notifications when tools are moved outside of working hours.", icon: Bell },
      { title: "Quick Recovery", description: "Share real-time location with police for fast recovery of stolen equipment.", icon: Search },
    ]}
    features={[
      { title: "Compact Design", description: "Small form factor that fits inside tool bags and cases.", icon: Package },
      { title: "Motion Detection", description: "Alerts triggered by movement, conserving battery when stationary.", icon: Bell },
      { title: "Real-time Location", description: "Accurate GPS positioning to within 5 metres.", icon: MapPin },
      { title: "Geo-fencing", description: "Set safe zones around vans, workshops, and job sites.", icon: Shield },
      { title: "Mobile App", description: "Track all your tools from your smartphone anywhere.", icon: Wifi },
      { title: "Shareable Links", description: "Share live location with police during theft recovery.", icon: Search },
    ]}
    ctaButtonText="Get a Quote"
  />
);

export default ToolsEquipment;
