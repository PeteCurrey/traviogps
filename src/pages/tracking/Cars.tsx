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
    faqs={[
      { question: "How does a car GPS tracker work?", answer: "A GPS tracker uses satellite positioning to determine your car's location. It transmits this data over the mobile network to our platform, which you can access via the app or web dashboard in real time." },
      { question: "Will fitting a tracker affect my car's warranty?", answer: "No. Our trackers are professionally installed and do not interfere with your vehicle's electronics or void any manufacturer warranty." },
      { question: "Can a GPS tracker reduce my car insurance?", answer: "Yes. Many UK insurers offer up to 20% discount when an approved GPS tracker is fitted, as it significantly increases the chance of vehicle recovery." },
      { question: "How long does installation take?", answer: "Professional installation typically takes 30–60 minutes. The tracker is hidden in a covert location so it cannot be found or tampered with." },
      { question: "What happens if my car is stolen?", answer: "You'll receive an instant alert. Our 24/7 monitoring team can share the live location with police to assist with rapid recovery." },
    ]}
    ctaButtonText="Get a Quote"
    ctaDescription="Find the right car tracker for your needs — speak with our team today."
  />
);

export default Cars;
