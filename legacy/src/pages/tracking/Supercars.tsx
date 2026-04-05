import { TrackingApplicationPage } from "@/components/tracking/TrackingApplicationPage";
import { Shield, Award, MapPin, Bell, Lock, Phone } from "lucide-react";
import heroImage from "@/assets/tracking/supercars-hero.webp";

const Supercars = () => (
  <TrackingApplicationPage
    title="Supercar & Prestige Tracking"
    heroImage={heroImage}
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
    faqs={[
      { question: "What is Thatcham S5 approval?", answer: "Thatcham S5 is the highest level of vehicle tracking certification in the UK. It includes 24/7 monitoring, driver ID recognition, and direct police liaison — required by most insurers for high-value vehicles." },
      { question: "Do I need a Thatcham tracker for my supercar?", answer: "Most insurers require at least a Thatcham S7 tracker for vehicles over £50,000 and an S5 system for vehicles over £100,000. Check with your insurer for specific requirements." },
      { question: "What is the recovery rate?", answer: "Our Thatcham-approved tracking systems achieve a 98% stolen vehicle recovery rate, thanks to 24/7 monitoring and direct police communication." },
      { question: "Is the installation discreet?", answer: "Yes. All installations are carried out by Thatcham-approved engineers in covert locations, ensuring the tracker cannot be found or tampered with." },
    ]}
    ctaButtonText="Get a Quote"
    ctaDescription="Protect your investment with insurance-approved GPS tracking."
  />
);

export default Supercars;
