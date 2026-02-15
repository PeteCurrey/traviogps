import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Package, HardHat, Truck, Thermometer } from "lucide-react";

const industries = [
  { name: "Courier & Delivery", description: "Proof of delivery, route replay, ETA sharing", icon: Package, href: "/fleet/couriers" },
  { name: "Construction & Plant", description: "Multi-site tracking, theft prevention, utilisation", icon: HardHat, href: "/fleet/construction" },
  { name: "Haulage & HGV", description: "Trailer tracking, compliance, driver hours", icon: Truck, href: "/fleet/haulage" },
  { name: "Cold Chain & Pharma", description: "Temperature monitoring, compliance reporting", icon: Thermometer, href: "/fleet/haulage" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function FleetIndustriesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Fleet Solutions</p>
          <h2 className="font-serif text-2xl sm:text-display-3 md:text-display-2 text-foreground mb-4">
            Industry <span className="italic-accent">expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tailored fleet management solutions for every industry vertical.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {industries.map((industry) => (
            <motion.div key={industry.name} variants={itemVariants}>
              <Link
                to={industry.href}
                className="group block p-6 bg-card rounded-sm border border-border hover:border-accent/30 transition-all duration-300 h-full"
              >
                <industry.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                  {industry.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{industry.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-accent">
                  Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
