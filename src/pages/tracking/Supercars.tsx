import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Award, MapPin, Bell, Lock, Phone } from "lucide-react";

const Supercars = () => (
  <TrackingApplicationPage
    title="Supercar & Prestige Tracking"
    subtitle="High-Value Vehicle Security"
    description="Thatcham S5 and S7 approved GPS tracking systems for supercars, prestige vehicles, and luxury cars. 24/7 monitoring centre with stolen vehicle recovery."
    heroStat="Thatcham S5 & S7 Approved"
    keyStats={[
      { value: "S5/S7", label: "Thatcham approved" },
      { value: "24/7", label: "Monitoring centre" },
      { value: "98%", label: "Recovery rate" },
      { value: "£500K+", label: "Vehicles protected" },
    ]}
    benefits={[
      { title: "Insurance Approved", description: "Thatcham S5 and S7 certification — required by most insurers for high-value vehicles.", icon: Award },
      { title: "24/7 Monitoring Centre", description: "Trained operators monitor your vehicle around the clock and liaise directly with police.", icon: Phone },
      { title: "Stolen Vehicle Recovery", description: "98% recovery rate with real-time tracking and direct police liaison.", icon: Shield },
    ]}
    features={[
      { title: "Thatcham Certified", description: "S5 and S7 approved — meets the highest insurance standards.", icon: Award },
      { title: "Driver ID Tags", description: "Vehicle immobilisation if an unrecognised driver is detected.", icon: Lock },
      { title: "Battery Disconnect Alert", description: "Instant alert if the vehicle battery is tampered with.", icon: Bell },
      { title: "Covert Installation", description: "Professional, discreet installation by approved engineers.", icon: Shield },
      { title: "Real-time Tracking", description: "10-second GPS updates with full journey history.", icon: MapPin },
      { title: "Police Liaison", description: "Direct communication with police for rapid stolen vehicle response.", icon: Phone },
    ]}
    ctaButtonText="Get a Quote"
    ctaDescription="Protect your investment with insurance-approved GPS tracking."
  />
);

export default Supercars;
