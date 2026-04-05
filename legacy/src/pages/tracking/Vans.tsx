import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Truck, MapPin, Bell, Users, BarChart3 } from "lucide-react";
import heroImage from "@/assets/tracking/vans-hero.webp";

const Vans = () => (
  <TrackingApplicationPage
    title="Van Tracker Solutions"
    heroImage={heroImage}
    subtitle="Commercial Vehicle Tracking"
    description="GPS tracking for single vans or small fleets. Monitor driver behaviour, prevent tool theft, and optimise routes to save time and fuel."
    heroStat="From £9.99/month"
    keyStats={[
      { value: "15%", label: "Fuel savings" },
      { value: "10 sec", label: "Live updates" },
      { value: "£34.99", label: "From per tracker" },
      { value: "24/7", label: "Monitoring" },
    ]}
    benefits={[
      { title: "Tool Theft Prevention", description: "Get alerts if your van is opened or moved outside of hours — protect the tools inside.", icon: Shield },
      { title: "Route Optimisation", description: "Review routes to reduce wasted mileage and improve job scheduling.", icon: MapPin },
      { title: "Driver Monitoring", description: "Track speeding, harsh braking, and idling to reduce fuel costs and accidents.", icon: Users },
    ]}
    features={[
      { title: "Live Tracking", description: "See where every van is right now with 10-second updates.", icon: Truck },
      { title: "Out-of-Hours Alerts", description: "Know if a van is used outside working hours.", icon: Bell },
      { title: "Journey History", description: "Full route playback for every journey.", icon: MapPin },
      { title: "Driver Behaviour", description: "Score drivers on speed, braking, and fuel efficiency.", icon: BarChart3 },
      { title: "Geo-fencing", description: "Set zones around depots, offices, and customer sites.", icon: Shield },
      { title: "Fleet Reports", description: "Automated daily and weekly reports by email.", icon: BarChart3 },
    ]}
    faqs={[
      { question: "Can I track multiple vans on one account?", answer: "Yes. Our platform lets you track an unlimited number of vans from a single dashboard, with individual vehicle views and fleet-wide reports." },
      { question: "Will the tracker help prevent tool theft from my van?", answer: "Absolutely. You'll get instant alerts if your van is opened or moved outside working hours, helping protect the valuable tools inside." },
      { question: "How accurate is the GPS tracking?", answer: "Our trackers provide location accuracy to within 5 metres, with updates every 10 seconds when the vehicle is moving." },
      { question: "Is there a contract?", answer: "We offer flexible monthly subscriptions from £9.99/month with no long-term contract required. You can cancel anytime." },
    ]}
    ctaButtonText="Get a Quote"
  />
);

export default Vans;
