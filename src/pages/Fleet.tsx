import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Truck, Users, BarChart3, Thermometer, Shield, Clock, ArrowRight, Package, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROICalculator } from "@/components/fleet/ROICalculator";
import { usePageMeta } from "@/lib/seo";

const features = [
  { icon: Truck, title: "Fleet Tracking", description: "Real-time GPS tracking for your entire fleet with 10-second updates" },
  { icon: Users, title: "Driver ID", description: "Identify which driver is operating each vehicle with RFID key fobs" },
  { icon: BarChart3, title: "Driver Behaviour", description: "Monitor speeding, harsh braking, acceleration and idle time" },
  { icon: Thermometer, title: "Temperature Monitoring", description: "Remote temperature tracking for cold chain and pharmaceutical logistics" },
  { icon: Shield, title: "Theft Recovery", description: "Instant alerts and tracking to recover stolen vehicles quickly" },
  { icon: Clock, title: "Timesheet Reports", description: "Automated timesheets based on journey data and driver activity" },
];

const industries = [
  { name: "Courier & Delivery", description: "Proof of delivery, route replay, ETA sharing, and driver performance.", icon: Package, href: "/fleet/couriers" },
  { name: "Construction & Plant", description: "Multi-site tracking, plant security, and utilisation reports.", icon: HardHat, href: "/fleet/construction" },
  { name: "Haulage & HGV", description: "Trailer tracking, temperature monitoring, and compliance.", icon: Truck, href: "/fleet/haulage" },
];

const Fleet = () => {
  usePageMeta("Fleet Management & GPS Tracking | Travio", "Professional fleet tracking solutions for businesses. Real-time vehicle monitoring, driver behaviour analysis, fuel reports, and compliance tools.");

  return (
    <PageWrapper>
      <section className="pt-32 lg:pt-40 pb-16 bg-background">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Business Solutions</p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">Fleet <span className="italic-accent">Management</span></h1>
            <p className="text-muted-foreground text-lg mb-8">Complete fleet tracking and telematics solutions for businesses of all sizes. Reduce costs, improve safety, and increase efficiency.</p>
            <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/contact">Request Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Industries</p>
            <h2 className="font-serif text-display-3 md:text-display-2 text-foreground">Solutions by <span className="italic-accent">Industry</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <motion.div key={ind.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}>
                <Link to={ind.href} className="group block p-8 bg-background rounded-sm border border-border hover:border-accent/30 transition-all h-full">
                  <ind.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors">{ind.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{ind.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-accent">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Platform Features</p>
            <h2 className="font-serif text-display-3 md:text-display-2 text-foreground">Everything You <span className="italic-accent">Need</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="p-6 bg-card rounded-sm border border-border">
                <feature.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ROICalculator />
    </PageWrapper>
  );
};

export default Fleet;
