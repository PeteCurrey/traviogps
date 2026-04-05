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
    faqs={[
      { question: "Can customers see the driver's live location?", answer: "Yes. Our ETA sharing feature lets you send a live tracking link to customers so they can see exactly when their delivery will arrive." },
      { question: "Does it provide proof of delivery?", answer: "Yes. Every stop is GPS-stamped with time, location, and duration, giving you verifiable proof of delivery for every drop." },
      { question: "How does driver scoring work?", answer: "Drivers are scored on speed, braking, acceleration, and idle time. Scores are ranked across your fleet to identify top performers and areas for improvement." },
      { question: "Can I get automated daily reports?", answer: "Yes. You can schedule daily and weekly reports covering mileage, journeys, stops, and exceptions — delivered straight to your inbox." },
    ]}
    ctaButtonText="Request Demo"
    ctaButtonLink="/contact"
  />
);

export default Couriers;
