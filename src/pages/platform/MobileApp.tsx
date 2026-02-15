import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import {
  Smartphone, ArrowRight, Check, MapPin, Bell, Route,
  Download, Shield, Fingerprint, Share2, Wifi, Zap,
  Clock, Eye, Navigation, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import mobileAppImg from "@/assets/platform/mobile-app.webp";
import { usePageMeta } from "@/lib/seo";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const coreFeatures = [
  { icon: MapPin, title: "Live Map", desc: "See every vehicle on an interactive map with real-time positions, speed, and heading. Tap any marker for full details." },
  { icon: Bell, title: "Push Notifications", desc: "Get instant push alerts for geofence events, speeding, movement, tamper, and battery warnings." },
  { icon: Route, title: "Journey Replay", desc: "Replay any vehicle's journey for any date. View stops, idle time, and exact routes taken." },
  { icon: Share2, title: "ETA Sharing", desc: "Share a live ETA link with customers or colleagues. They see the vehicle approaching in real time." },
  { icon: Eye, title: "Fleet Overview", desc: "See your entire fleet status at a glance — driving, idle, stopped, or offline. Filter by group or driver." },
  { icon: Navigation, title: "Turn-by-Turn", desc: "Navigate directly to a vehicle's last-known position with one tap. Ideal for field service teams." },
];

const securityFeatures = [
  { icon: Fingerprint, title: "Biometric Login", desc: "Secure access with Face ID or fingerprint. No passwords to remember." },
  { icon: Shield, title: "Encrypted Data", desc: "All data is encrypted in transit and at rest. Your fleet data stays private." },
  { icon: Users, title: "Multi-User", desc: "Multiple team members can use the app simultaneously with role-based permissions." },
  { icon: Wifi, title: "Offline Mode", desc: "View cached data even without connectivity. Alerts queue and deliver when back online." },
];

const appHighlights = [
  "Full live map with vehicle details and street-level addresses",
  "Push notifications for all alert types — never miss a critical event",
  "Journey replay with animated playback and stop details",
  "Share live ETA links with customers via text or email",
  "Biometric login for quick, secure access",
  "Works on iPhone and Android — free download",
  "Dark mode and accessibility support",
  "Available in multiple languages",
];

const MobileApp = () => {
  usePageMeta("GPS Tracking Mobile App | iOS & Android | Travio", "Track your vehicles from anywhere with Travio's free mobile app for iOS and Android. Real-time maps, alerts, and journey history on your phone.");

  return (
  <PageWrapper>
    {/* Hero */}
    <section className="relative pt-32 lg:pt-40 pb-20 bg-background overflow-hidden">
      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="order-2 lg:order-1">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Mobile App</p>
            <h1 className="text-display-3 md:text-display-2 text-foreground mb-4">
              Your Fleet in Your <span className="italic-accent">Pocket</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              The GPSLive mobile app gives you full fleet visibility from anywhere. Track vehicles, receive alerts, replay journeys, and share live ETAs — all from your phone.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button variant="outline" className="border-border" size="lg">
                <Download className="mr-2 h-4 w-4" /> App Store
              </Button>
              <Button variant="outline" className="border-border" size="lg">
                <Download className="mr-2 h-4 w-4" /> Google Play
              </Button>
            </div>
            <div className="flex flex-wrap gap-8">
              {[
                { value: 4.8, suffix: "★", label: "App Rating" },
                { value: 50, suffix: "K+", label: "Downloads" },
                { value: 100, suffix: "%", label: "Free" },
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

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative max-w-[320px]">
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-border">
                <img src={mobileAppImg} alt="GPSLive mobile app showing vehicle tracking" className="w-full h-auto" />
              </div>
              <div className="absolute -top-3 -right-3 bg-card border border-border rounded-sm px-3 py-2 shadow-elevated">
                <p className="text-xs font-semibold text-foreground">iOS & Android</p>
                <p className="text-[10px] text-muted-foreground">Free download</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* App Highlights Checklist */}
    <section className="py-16 bg-card border-y border-border">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-display-3 text-foreground">
            Everything at Your <span className="italic-accent">Fingertips</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {appHighlights.map((point, i) => (
            <motion.div key={point} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Core Features */}
    <section className="section-padding bg-background">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Core Features</p>
          <h2 className="text-display-3 md:text-display-2 text-foreground mb-4">
            Full Fleet Control on <span className="italic-accent">Mobile</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The GPSLive app isn't a cut-down version — it's the full tracking platform, designed for mobile.
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {coreFeatures.map((f) => (
            <motion.div key={f.title} variants={itemVariants} className="p-8 bg-card rounded-sm border border-border hover:border-accent/30 transition-colors group">
              <f.icon className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Security & Access */}
    <section className="section-padding bg-card">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Security & Access</p>
          <h2 className="text-display-3 text-foreground">
            Secure by <span className="italic-accent">Design</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {securityFeatures.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-6 bg-background rounded-sm border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-background">
      <div className="container-premium text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-display-3 md:text-display-2 text-foreground mb-4">
            Download <span className="italic-accent">GPSLive</span> Today
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Free for all GPSLive customers. Available on iOS and Android.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" className="border-border">
              <Download className="mr-2 h-4 w-4" /> App Store
            </Button>
            <Button variant="outline" size="lg" className="border-border">
              <Download className="mr-2 h-4 w-4" /> Google Play
            </Button>
            <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/contact">Contact Sales <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </PageWrapper>
  );
};

export default MobileApp;
