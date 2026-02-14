import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Monitor, Smartphone, MapPin, Bell, BarChart3, Route, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const platformFeatures = [
  { icon: Monitor, title: "Web Dashboard", description: "Full-featured tracking platform accessible from any web browser" },
  { icon: Smartphone, title: "Mobile App", description: "Track vehicles on the go with our iOS and Android apps" },
  { icon: MapPin, title: "Live Tracking", description: "Real-time vehicle positions with 10-second update intervals" },
  { icon: Bell, title: "Smart Alerts", description: "Geo-zone, speed, movement and battery alerts via email or push" },
  { icon: BarChart3, title: "Reports", description: "Journey history, mileage, driver behaviour and fleet utilisation reports" },
  { icon: Route, title: "Route Replay", description: "Replay any journey with detailed speed, stops and route information" },
];

const Platform = () => {
  return (
    <PageWrapper>
      <section className="pt-32 lg:pt-40 pb-16 bg-background">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">GPSLive</p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">Tracking <span className="italic-accent">Platform</span></h1>
            <p className="text-muted-foreground text-lg mb-8">Our GPSLive platform gives you complete visibility of your vehicles and assets. Access from any device, anywhere in the world.</p>
          </motion.div>

          <div className="flex gap-12 mt-8">
            {[
              { value: 94, suffix: "K+", label: "Active Devices" },
              { value: 2, suffix: "K+", label: "Business Fleets" },
              { value: 185, suffix: "", label: "Countries" },
              { value: 300, suffix: "B+", label: "Data Points" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <div className="font-serif text-2xl text-accent">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={i * 0.2} />
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="p-6 bg-background rounded-sm border border-border">
                <feature.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Platform;
