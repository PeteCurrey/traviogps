import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Car, Truck, Users, Package } from "lucide-react";

const useCases = [
  {
    name: "For Cars",
    description: "Protect your vehicle with real-time GPS tracking, theft alerts, and journey history",
    icon: Car,
    href: "/tracking/vans",
    stat: "From £34.99"
  },
  {
    name: "For Fleets",
    description: "Manage your fleet with driver behaviour monitoring, route optimisation and fuel savings",
    icon: Truck,
    href: "/fleet",
    stat: "2,000+ Fleets"
  },
  {
    name: "For Motorbikes",
    description: "Compact, weatherproof trackers with insurance-approved theft protection",
    icon: Users,
    href: "/tracking/motorbikes",
    stat: "20% Insurance Saving"
  },
  {
    name: "For Plant & Assets",
    description: "Track trailers, plant machinery, containers and high-value assets anywhere",
    icon: Package,
    href: "/tracking/plant-machinery",
    stat: "5-Year Battery"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function UseCasesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[hsl(var(--accent))]/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />

      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.3em] text-primary/80 mb-3"
          >
            Use Cases
          </motion.p>
          <h2 className="font-serif text-display-3 md:text-display-2 text-primary mb-4">
            Tracking for <span className="italic-accent">every</span> need
          </h2>
          <p className="text-primary/70 max-w-2xl mx-auto text-lg">
            Whether you're protecting a single car or managing a nationwide fleet, 
            Travio has the right GPS tracking solution for you.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {useCases.map((useCase) => (
            <motion.div key={useCase.name} variants={itemVariants}>
              <Link to={useCase.href} className="group block relative overflow-hidden rounded-sm bg-background/10 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-500 p-8">
                <div className="flex items-start gap-6">
                  <motion.div
                    className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <useCase.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-accent mb-2 block">{useCase.stat}</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                      {useCase.name}
                    </h3>
                    <p className="text-sm text-primary/70 mb-4">{useCase.description}</p>
                    <motion.span className="inline-flex items-center text-sm font-medium text-accent" whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
