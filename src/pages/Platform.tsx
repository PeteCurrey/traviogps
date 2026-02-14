import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import {
  Monitor, Smartphone, MapPin, Bell, BarChart3, Route,
  ArrowRight, Shield, Clock, Zap, Globe, Users, Layers,
  Navigation, Wifi, Lock, Download, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "@/components/ui/animated-counter";

import dashboardHero from "@/assets/platform/dashboard-hero.webp";
import liveMapImg from "@/assets/platform/live-map.webp";
import reportsImg from "@/assets/platform/reports-analytics.webp";
import mobileAppImg from "@/assets/platform/mobile-app.webp";
import alertsImg from "@/assets/platform/alerts-geofence.webp";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const coreFeatures = [
  { icon: MapPin, title: "Live Tracking", desc: "See every vehicle and asset on the map with 10-second GPS updates. Zoom, filter, and cluster for large fleets." },
  { icon: Route, title: "Journey Replay", desc: "Replay any journey with animated playback. View speed, stops, idle time, and exact routes taken." },
  { icon: Bell, title: "Smart Alerts", desc: "Set geo-zone, speed, movement, tow, battery, and tamper alerts. Receive via push, email, or SMS." },
  { icon: BarChart3, title: "Fleet Reports", desc: "Automated mileage, utilisation, driver behaviour, and exception reports. Schedule daily or weekly delivery." },
  { icon: Users, title: "Driver Management", desc: "RFID driver ID, behaviour scoring, harsh event logging, and private mode for personal journeys." },
  { icon: Layers, title: "Multi-Asset Views", desc: "Group vehicles by fleet, region, or driver. Create custom dashboards for different team members." },
];

const advancedCapabilities = [
  { icon: Globe, title: "Works Worldwide", desc: "Track across 185 countries with automatic roaming." },
  { icon: Wifi, title: "API & Integrations", desc: "RESTful API for CRM, ERP, and dispatch integrations." },
  { icon: Shield, title: "Enterprise Security", desc: "256-bit encryption, SOC 2 compliance, and role-based access." },
  { icon: Lock, title: "Privacy Controls", desc: "Private mode, data retention policies, and GDPR compliance." },
  { icon: Download, title: "Data Export", desc: "Export journey data, reports, and alerts to CSV and PDF." },
  { icon: Zap, title: "Instant Setup", desc: "Activate a tracker and see it live on the platform within minutes." },
];

const featureShowcase = [
  {
    label: "Live Map",
    title: "Real-Time Fleet Visibility",
    desc: "See every vehicle on one interactive map. Click any marker for live speed, heading, driver, and last-known address. Filter by status, group, or geo-zone for instant fleet oversight.",
    image: liveMapImg,
    points: ["10-second live position updates", "Street-level address lookup", "Vehicle clustering for large fleets", "Custom map layers and satellite view"],
    link: "/platform/live-map",
  },
  {
    label: "Reports & Analytics",
    title: "Actionable Fleet Intelligence",
    desc: "Turn raw tracking data into business insights. Automated reports on mileage, fuel, driver behaviour, and fleet utilisation. Schedule reports to land in your inbox every morning.",
    image: reportsImg,
    points: ["Driver behaviour scoring & league tables", "Mileage and fuel consumption analysis", "Journey history with stop details", "Scheduled email report delivery"],
    link: "/platform/reports-analytics",
  },
  {
    label: "Alerts & Geofencing",
    title: "Proactive Notifications",
    desc: "Draw virtual boundaries around depots, customer sites, or restricted zones. Get instant alerts when vehicles enter, exit, speed, or move outside of hours.",
    image: alertsImg,
    points: ["Unlimited geo-zone creation", "Speed, tow, and tamper alerts", "Push, email, and SMS channels", "Custom alert schedules (business hours only)"],
    link: "/platform/alerts-notifications",
  },
];

const Platform = () => {
  return (
    <PageWrapper>
      {/* Hero with dashboard screenshot */}
      <section className="relative pt-32 lg:pt-40 pb-20 bg-background overflow-hidden">
        <div className="container-premium relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">GPSLive Platform</p>
              <h1 className="text-display-3 md:text-display-2 text-foreground mb-4">
                The Complete GPS <span className="italic-accent">Tracking</span> Platform
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                GPSLive gives you full control of your vehicles, assets, and drivers from any device. Real-time maps, smart alerts, automated reports, and an API for custom integrations.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/contact">Request a Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-border hover:bg-secondary">
                  <Link to="/products">Browse Trackers</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-8">
                {[
                  { value: 94, suffix: "K+", label: "Active Devices" },
                  { value: 185, suffix: "", label: "Countries" },
                  { value: 99.9, suffix: "%", label: "Uptime" },
                ].map((stat, i) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-semibold text-accent">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={i * 0.2} />
                    </div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-sm overflow-hidden border border-border shadow-elevated">
                <img src={dashboardHero} alt="GPSLive tracking dashboard showing live fleet map" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-sm p-3 shadow-elevated hidden lg:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Live Updates</p>
                  <p className="text-[10px] text-muted-foreground">Every 10 seconds</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Core Features</p>
            <h2 className="text-display-3 md:text-display-2 text-foreground mb-4">
              Everything You Need to <span className="italic-accent">Manage</span> Your Fleet
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From live tracking to automated compliance reports — GPSLive covers every aspect of vehicle and asset management.
            </p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {coreFeatures.map((f) => (
              <motion.div key={f.title} variants={itemVariants} className="p-8 bg-background rounded-sm border border-border hover:border-accent/30 transition-colors group">
                <f.icon className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase Sections (alternating image/text) */}
      {featureShowcase.map((section, idx) => (
        <section key={section.label} className={`section-padding ${idx % 2 === 0 ? "bg-background" : "bg-card"}`}>
          <div className="container-premium">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${idx % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}>
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:[direction:ltr]"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">{section.label}</p>
                <h2 className="text-display-3 text-foreground mb-4">{section.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{section.desc}</p>
                <ul className="space-y-3 mb-6">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
                {section.link && (
                  <Button asChild variant="outline" size="sm" className="border-border hover:bg-secondary">
                    <Link to={section.link}>Learn More <ArrowRight className="ml-2 h-3 w-3" /></Link>
                  </Button>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:[direction:ltr]"
              >
                <div className="rounded-sm overflow-hidden border border-border shadow-elevated">
                  <img src={section.image} alt={`GPSLive ${section.label} interface`} className="w-full h-auto" loading="lazy" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Mobile App Section */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 flex justify-center"
            >
              <div className="relative max-w-[320px]">
                <div className="rounded-2xl overflow-hidden shadow-elevated border border-border">
                  <img src={mobileAppImg} alt="GPSLive mobile app showing vehicle tracking" className="w-full h-auto" loading="lazy" />
                </div>
                <div className="absolute -top-3 -right-3 bg-card border border-border rounded-sm px-3 py-2 shadow-elevated">
                  <p className="text-xs font-semibold text-foreground">iOS & Android</p>
                  <p className="text-[10px] text-muted-foreground">Free download</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Mobile App</p>
              <h2 className="text-display-3 text-foreground mb-4">
                Track From <span className="italic-accent">Anywhere</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The GPSLive mobile app puts your entire fleet in your pocket. Get push notifications for alerts, view live positions, replay journeys, and share ETA links — all from your phone.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Full live map with vehicle details",
                  "Push notifications for all alert types",
                  "Journey replay and stop reports",
                  "Share live ETA link with customers",
                  "Biometric login for security",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-border">
                  <Download className="mr-2 h-4 w-4" /> App Store
                </Button>
                <Button variant="outline" className="border-border">
                  <Download className="mr-2 h-4 w-4" /> Google Play
                </Button>
                <Button asChild variant="outline" className="border-border hover:bg-secondary">
                  <Link to="/platform/mobile-app">Learn More <ArrowRight className="ml-2 h-3 w-3" /></Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Capabilities */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Enterprise Ready</p>
            <h2 className="text-display-3 text-foreground">
              Built for <span className="italic-accent">Scale</span>
            </h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {advancedCapabilities.map((cap) => (
              <motion.div key={cap.title} variants={itemVariants} className="flex items-start gap-4 p-6 bg-background rounded-sm border border-border">
                <cap.icon className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-premium text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-display-3 md:text-display-2 text-foreground mb-4">
              See GPSLive in <span className="italic-accent">Action</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Book a personalised demo and we'll show you exactly how GPSLive works for your fleet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact">Book a Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/products">View Trackers</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Platform;
