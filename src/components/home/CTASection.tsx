import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />

      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.3em] text-accent mb-4"
          >
            Get Started
          </motion.p>
          <motion.h2 
            className="font-serif text-2xl sm:text-display-3 md:text-display-2 text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to track <span className="italic-accent">smarter?</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Whether you need a single vehicle tracker or a complete fleet management solution, 
            our team is here to help you find the perfect fit.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                <Link to="/contact">
                  Request a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button asChild variant="outline" size="lg" className="border-primary/30 text-foreground hover:bg-primary/10 px-8">
                <Link to="/products">Browse Products</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
