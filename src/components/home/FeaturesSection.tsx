"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Activity, Bell, Thermometer, ArrowRight } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Real-time Tracking",
    description: "Live GPS location updates every 10 seconds with full journey history and replay",
    href: "/platform",
    cta: "Learn More"
  },
  {
    icon: Activity,
    title: "Driver Behaviour",
    description: "Monitor speeding, harsh braking, acceleration and idle time to improve safety",
    href: "/fleet",
    cta: "Explore"
  },
  {
    icon: Bell,
    title: "Geo-zone Alerts",
    description: "Set virtual boundaries and receive instant notifications when vehicles enter or exit",
    href: "/platform",
    cta: "See How"
  },
  {
    icon: Thermometer,
    title: "Temperature Monitoring",
    description: "Remote temperature tracking for cold chain logistics and pharmaceutical transport",
    href: "/fleet",
    cta: "Learn More"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function FeaturesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.3em] text-accent mb-3"
          >
            Platform Features
          </motion.p>
          <h2 className="font-serif text-display-3 text-foreground">
            Powerful <span className="italic-accent">tools</span> at your fingertips
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants}>
              <Link href={feature.href} className="group block p-6 bg-card rounded-sm border border-border h-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-accent/5"
                  initial={{ scaleY: 0, originY: 1 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="h-5 w-5 text-accent" />
                  </motion.div>
                  <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</p>
                  <motion.span className="inline-flex items-center text-sm font-medium text-accent" whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                    {feature.cta}
                    <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
