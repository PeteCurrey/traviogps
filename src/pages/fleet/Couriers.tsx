import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Package, MapPin, Clock, Bell, Users, BarChart3 } from "lucide-react";
import couriersHero from "@/assets/fleet/couriers-hero.webp";

const Couriers = () => (
  <TrackingApplicationPage
    title="Courier & Delivery Fleet"
    subtitle="Logistics & Last Mile"
    description="Fleet tracking built for courier companies and delivery services. Proof of delivery, route replay, ETA sharing, and driver performance monitoring."
    heroStat="Used by 500+ delivery fleets"
    heroImage={couriersHero}
    keyStats={[
      { value: "500+", label: "Delivery fleets" },
      { value: "20%", label: "Route efficiency gain" },
      { value: "10 sec", label: "Live updates" },
      { value: "ETA", label: "Customer sharing" },
    ]}
    benefits={[
      { title: "Proof of Delivery", description: "Verify delivery times and locations with GPS-stamped stop data for every drop.", icon: Package },
      { title: "Route Optimisation", description: "Reduce wasted mileage with route playback and planning insights.", icon: MapPin },
      { title: "Driver Performance", description: "Monitor speed, idle time, and driving style to reduce costs and improve safety.", icon: Users },
    ]}
    features={[
      { title: "Live Fleet Map", description: "See all vehicles on one map with real-time positions.", icon: MapPin },
      { title: "Stop Reports", description: "Automated logs of every stop including duration and location.", icon: Clock },
      { title: "ETA Sharing", description: "Share live driver location with customers for accurate ETAs.", icon: Bell },
      { title: "Driver Scoring", description: "Rank drivers by efficiency, safety, and performance.", icon: BarChart3 },
      { title: "Geo-fence Alerts", description: "Notifications when vehicles enter or leave depots and zones.", icon: Bell },
      { title: "Daily Reports", description: "Automated mileage, journey, and exception reports.", icon: BarChart3 },
    ]}
    ctaButtonText="Request Demo"
    ctaButtonLink="/contact"
  />
);

export default Couriers;
