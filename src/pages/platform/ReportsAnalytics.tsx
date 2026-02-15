import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import {
  BarChart3, ArrowRight, Check, TrendingUp, FileText, Clock,
  PieChart, Calendar, Download, Users, Fuel, Route, Shield,
  Gauge, Target, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import reportsImg from "@/assets/platform/reports-analytics.webp";
import { usePageMeta } from "@/lib/seo";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const reportTypes = [
  { icon: Route, title: "Journey Reports", desc: "Full journey history with start/end addresses, distance, duration, and stops. Filter by date, driver, or vehicle." },
  { icon: Fuel, title: "Fuel & Mileage", desc: "Track fuel consumption and mileage across your fleet. Identify high-cost vehicles and optimise route efficiency." },
  { icon: Users, title: "Driver Behaviour", desc: "Score drivers on harsh braking, acceleration, cornering, and speeding. Build league tables and incentivise improvement." },
  { icon: Gauge, title: "Fleet Utilisation", desc: "Understand which vehicles are being used, idle, or sitting unused. Maximise ROI on every asset." },
  { icon: Shield, title: "Compliance Reports", desc: "Automated tachograph-style working time reports, duty-of-care logs, and MOT/service reminders." },
  { icon: Target, title: "Exception Reports", desc: "Highlight only the events that need attention — speeding, unauthorised use, geo-zone breaches, and late arrivals." },
];

const capabilities = [
  { icon: Calendar, title: "Scheduled Delivery", desc: "Set reports to generate and email automatically — daily, weekly, or monthly." },
  { icon: Download, title: "Export Formats", desc: "Download as CSV or PDF. Share with stakeholders who don't have platform access." },
  { icon: PieChart, title: "Visual Dashboards", desc: "Interactive charts and graphs that update in real time. Drill down into any metric." },
  { icon: Mail, title: "Email Alerts", desc: "Get notified when a report shows an anomaly — excessive mileage, low utilisation, or behaviour decline." },
  { icon: TrendingUp, title: "Trend Analysis", desc: "Compare week-on-week and month-on-month to spot patterns and measure improvement." },
  { icon: FileText, title: "Custom Templates", desc: "Build report templates that match your KPIs. Save and reuse across fleet groups." },
];

const ReportsAnalytics = () => {
  usePageMeta("GPS Tracking Reports & Analytics | Travio", "Automated fleet reports including mileage, driver behaviour, fuel consumption, and compliance. Schedule daily reports by email.");

  return (
  <PageWrapper>
    {/* Hero */}
    <section className="relative pt-32 lg:pt-40 pb-20 bg-background overflow-hidden">
      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Reports & Analytics</p>
            <h1 className="text-display-3 md:text-display-2 text-foreground mb-4">
              Actionable Fleet <span className="italic-accent">Intelligence</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Turn raw GPS data into clear, actionable insights. Automated reports on mileage, fuel, driver behaviour, and fleet utilisation — delivered straight to your inbox.
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
                { value: 15, suffix: "+", label: "Report Types" },
                { value: 30, suffix: "%", label: "Avg Cost Saving" },
                { value: 60, suffix: "s", label: "Generation Time" },
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
              <img src={reportsImg} alt="GPSLive reports and analytics dashboard" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-sm p-3 shadow-elevated hidden lg:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Auto-Scheduled</p>
                <p className="text-[10px] text-muted-foreground">Daily, weekly, monthly</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Report Types */}
    <section className="section-padding bg-card">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Report Library</p>
          <h2 className="text-display-3 md:text-display-2 text-foreground mb-4">
            Every Report Your <span className="italic-accent">Fleet</span> Needs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From daily journey logs to monthly compliance summaries — GPSLive generates the reports that matter to your business.
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {reportTypes.map((r) => (
            <motion.div key={r.title} variants={itemVariants} className="p-8 bg-background rounded-sm border border-border hover:border-accent/30 transition-colors group">
              <r.icon className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* How it works */}
    <section className="section-padding bg-background">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">How It Works</p>
          <h2 className="text-display-3 text-foreground mb-4">
            Reports in <span className="italic-accent">Three Steps</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Choose Your Report", desc: "Select from 15+ report templates or build your own. Pick the vehicles, date range, and metrics." },
            { step: "02", title: "Generate Instantly", desc: "Reports generate in under 60 seconds. View interactive charts on-screen or download as CSV/PDF." },
            { step: "03", title: "Schedule & Share", desc: "Set up automatic delivery to any email address. Daily summaries, weekly reviews, or monthly board packs." },
          ].map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center p-8">
              <div className="text-5xl font-serif text-accent/20 mb-4">{s.step}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Capabilities */}
    <section className="section-padding bg-card">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Platform Capabilities</p>
          <h2 className="text-display-3 text-foreground">
            Powerful Reporting <span className="italic-accent">Tools</span>
          </h2>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {capabilities.map((cap) => (
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
            See Your Fleet <span className="italic-accent">Data</span> Clearly
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Book a demo and we'll show you exactly how GPSLive reports can cut costs and improve fleet performance.
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

export default ReportsAnalytics;
