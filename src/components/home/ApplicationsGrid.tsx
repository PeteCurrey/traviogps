import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Car, Bike, HardHat, Wrench, Tent, Container, Waves, Trophy } from "lucide-react";

const applications = [
  { name: "Cars & Vans", tagline: "Vehicle theft protection & driver monitoring", icon: Car, href: "/tracking/vans" },
  { name: "Motorbikes", tagline: "Compact, weatherproof bike security", icon: Bike, href: "/tracking/motorbikes" },
  { name: "Plant & Machinery", tagline: "Construction site theft prevention", icon: HardHat, href: "/tracking/plant-machinery" },
  { name: "Tools & Equipment", tagline: "Small asset tracking & recovery", icon: Wrench, href: "/tracking/tools-equipment" },
  { name: "Caravans & Motorhomes", tagline: "Leisure vehicle security year-round", icon: Tent, href: "/tracking/caravans" },
  { name: "Trailers", tagline: "5-year battery, magnetic mount", icon: Container, href: "/tracking/trailers" },
  { name: "Boats & Marine", tagline: "Waterproof GPS for any vessel", icon: Waves, href: "/tracking/boats" },
  { name: "Supercars & Prestige", tagline: "Thatcham S5/S7 approved tracking", icon: Trophy, href: "/tracking/supercars" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function ApplicationsGrid() {
  return (
    <section className="section-padding bg-card">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Applications</p>
          <h2 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
            Track <span className="italic-accent">anything</span>, anywhere
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From supercars to construction plant, we have a GPS tracking solution for every asset.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {applications.map((app) => (
            <motion.div key={app.name} variants={itemVariants}>
              <Link
                to={app.href}
                className="group block p-6 bg-background rounded-sm border border-border hover:border-accent/30 transition-all duration-300"
              >
                <app.icon className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-serif text-lg text-foreground mb-1 group-hover:text-accent transition-colors">
                  {app.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{app.tagline}</p>
                <span className="inline-flex items-center text-xs font-medium text-accent">
                  Learn more <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
