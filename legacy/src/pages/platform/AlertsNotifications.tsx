import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import {
  Bell, ArrowRight, Check, MapPin, Zap, Clock,
  Shield, Mail, Smartphone, AlertTriangle, Navigation,
  Hexagon, Volume2, Settings, Eye, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import alertsImg from "@/assets/platform/alerts-geofence.webp";
import { usePageMeta } from "@/lib/seo";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const alertTypes = [
  { icon: Hexagon, title: "Geofence Alerts", desc: "Draw boundaries around depots, customer sites, or restricted areas. Get notified the instant a vehicle enters or exits." },
  { icon: Zap, title: "Speed Alerts", desc: "Set speed limits per vehicle or road type. Receive alerts when drivers exceed thresholds — help reduce accidents and fines." },
  { icon: Navigation, title: "Movement & Tow", desc: "Know immediately if a vehicle moves outside working hours or is being towed. Critical for theft prevention." },
  { icon: AlertTriangle, title: "Tamper Detection", desc: "Receive an alert if someone disconnects or interferes with the tracking device. Instant notification to your phone." },
  { icon: Shield, title: "Battery & Power", desc: "Low battery and power-cut alerts ensure you're never caught off guard. Ideal for asset trackers and portable devices." },
  { icon: Clock, title: "Idle & Stop Alerts", desc: "Get notified when vehicles idle for too long or make unscheduled stops. Reduce fuel waste and improve productivity." },
];

const deliveryChannels = [
  { icon: Smartphone, title: "Push Notifications", desc: "Instant alerts on the GPSLive mobile app. See the vehicle on the map with one tap." },
  { icon: Mail, title: "Email Alerts", desc: "Detailed email notifications with vehicle info, location, speed, and a map link." },
  { icon: Volume2, title: "SMS Alerts", desc: "Critical alerts via text message for when you need guaranteed delivery, even offline." },
  { icon: Eye, title: "In-Platform Feed", desc: "All alerts logged in a searchable feed on the platform. Filter, export, and review at any time." },
];

const advancedFeatures = [
  { icon: Settings, title: "Custom Schedules", desc: "Only receive alerts during business hours, or set different rules for weekdays vs weekends." },
  { icon: Lock, title: "Role-Based Routing", desc: "Route specific alerts to specific people — fleet managers get speeding alerts, security gets movement alerts." },
  { icon: MapPin, title: "Unlimited Geofences", desc: "Create as many geo-zones as you need. Circles, polygons, or route corridors — no limits." },
  { icon: Bell, title: "Alert Escalation", desc: "If the first recipient doesn't acknowledge, the alert escalates to the next contact automatically." },
];

const AlertsNotifications = () => {
  usePageMeta("GPS Tracking Alerts & Notifications | Travio", "Smart alerts for speed, geofencing, tampering, and driver behaviour. Get instant push, email, and SMS notifications from your GPS trackers.");

  return (
  <PageWrapper>
    {/* Hero */}
    <section className="relative pt-32 lg:pt-40 pb-20 bg-background overflow-hidden">
      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Alerts & Notifications</p>
            <h1 className="text-display-3 md:text-display-2 text-foreground mb-4">
              Proactive Fleet <span className="italic-accent">Alerts</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Don't wait to discover problems — let GPSLive tell you the moment something happens. Geofence breaches, speeding, unauthorised movement, and more, delivered instantly to your phone, email, or SMS.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact">Request a Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border hover:bg-secondary">
                <Link to="/platform">Back to Platform</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-8">
              {[
                { value: 6, suffix: "+", label: "Alert Types" },
                { value: 3, suffix: "", label: "Delivery Channels" },
                { value: 5, suffix: "s", label: "Avg Delivery" },
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

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="rounded-sm overflow-hidden border border-border shadow-elevated">
              <img src={alertsImg} alt="GPSLive alerts and geofencing interface" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-sm p-3 shadow-elevated hidden lg:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Bell className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Instant Delivery</p>
                <p className="text-[10px] text-muted-foreground">Push, Email, SMS</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Alert Types */}
    <section className="section-padding bg-card">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Alert Types</p>
          <h2 className="text-display-3 md:text-display-2 text-foreground mb-4">
            Know <span className="italic-accent">Instantly</span> When It Matters
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Configure exactly which events trigger alerts and who gets notified. From geofence breaches to battery warnings — you're always in control.
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {alertTypes.map((a) => (
            <motion.div key={a.title} variants={itemVariants} className="p-8 bg-background rounded-sm border border-border hover:border-accent/30 transition-colors group">
              <a.icon className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Delivery Channels */}
    <section className="section-padding bg-background">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Delivery Channels</p>
          <h2 className="text-display-3 text-foreground mb-4">
            Alerts Delivered <span className="italic-accent">Your Way</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {deliveryChannels.map((ch, i) => (
            <motion.div key={ch.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-6 bg-card rounded-sm border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <ch.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{ch.title}</h3>
                <p className="text-sm text-muted-foreground">{ch.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Advanced Features */}
    <section className="section-padding bg-card">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Advanced Features</p>
          <h2 className="text-display-3 text-foreground">
            Enterprise-Grade <span className="italic-accent">Control</span>
          </h2>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {advancedFeatures.map((f) => (
            <motion.div key={f.title} variants={itemVariants} className="flex items-start gap-4 p-6 bg-background rounded-sm border border-border">
              <f.icon className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
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
            Never Miss a Critical <span className="italic-accent">Event</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            See how GPSLive alerts keep your fleet safe, compliant, and efficient. Book a personalised demo today.
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

export default AlertsNotifications;
