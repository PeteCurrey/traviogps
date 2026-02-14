import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, MapPin, Bell, Smartphone, Battery, Car, PoundSterling } from "lucide-react";
import heroImage from "@/assets/tracking/cars-hero.webp";

const Cars = () => (
  <TrackingApplicationPage
    title="Car GPS Tracking"
    heroImage={heroImage}
    subtitle="Vehicle Security & Recovery"
    description="Protect your car with real-time GPS tracking. Reduce insurance premiums, recover stolen vehicles, and monitor family drivers — all from your smartphone."
    heroStat="From just £9.99/month"
    keyStats={[
      { value: "20%", label: "Insurance savings" },
      { value: "96%", label: "Recovery rate" },
      { value: "10s", label: "Update frequency" },
      { value: "24/7", label: "Monitoring" },
    ]}
    benefits={[
      { title: "Theft Recovery", description: "Real-time GPS tracking enables rapid stolen vehicle recovery with live location sharing to police.", icon: Shield },
      { title: "Insurance Savings", description: "Many insurers offer up to 20% discount when a GPS tracker is fitted to your vehicle.", icon: PoundSterling },
      { title: "Family Safety", description: "Monitor young or elderly drivers, set speed alerts, and review journey history for peace of mind.", icon: Car },
    ]}
    features={[
      { title: "Live Tracking", description: "10-second GPS updates with accurate positioning on a real-time map.", icon: MapPin },
      { title: "Tamper Alerts", description: "Instant notification if the tracker or vehicle battery is interfered with.", icon: Bell },
      { title: "Journey History", description: "Full 90-day journey log with routes, stops, and mileage reports.", icon: MapPin },
      { title: "Geo-fencing", description: "Set virtual boundaries and get alerts when your car enters or leaves an area.", icon: Shield },
      { title: "Battery Backup", description: "Built-in backup battery keeps tracking even if the main power is disconnected.", icon: Battery },
      { title: "Mobile App", description: "Track your car from anywhere using the free iOS and Android app.", icon: Smartphone },
    ]}
    ctaButtonText="Get a Quote"
    ctaDescription="Find the right car tracker for your needs — speak with our team today."
  />
);

export default Cars;
