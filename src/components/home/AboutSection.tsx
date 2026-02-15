import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Smartphone, Globe, Shield } from "lucide-react";
import aboutMapImg from "@/assets/platform/about-map.webp";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  return (
    <section ref={sectionRef} className="section-padding bg-card">
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
              <motion.img
                src={aboutMapImg}
                alt="GPSLive real-time fleet map with live vehicle positions"
                className="absolute inset-0 w-full object-cover"
                style={{ y: imgY, height: "120%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/10" />
              <div className="relative z-10 flex flex-col justify-end h-full p-8">
                <h3 className="font-serif text-2xl text-white mb-2">GPSLive Platform</h3>
                <p className="text-white/70 text-sm mb-6">Track vehicles in real-time from any device</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-background/30 backdrop-blur-sm rounded-sm py-3">
                    <div className="font-serif text-2xl text-accent">24/7</div>
                    <div className="text-[10px] uppercase tracking-wider text-white/60">Monitoring</div>
                  </div>
                  <div className="text-center bg-background/30 backdrop-blur-sm rounded-sm py-3">
                    <div className="font-serif text-2xl text-accent">10s</div>
                    <div className="text-[10px] uppercase tracking-wider text-white/60">Updates</div>
                  </div>
                  <div className="text-center bg-background/30 backdrop-blur-sm rounded-sm py-3">
                    <div className="font-serif text-2xl text-accent">GPS</div>
                    <div className="text-[10px] uppercase tracking-wider text-white/60">Precision</div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div 
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-sm hidden sm:block"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.3em] text-accent mb-4"
            >
              About Travio
            </motion.p>
            <h2 className="font-serif text-2xl sm:text-display-3 md:text-display-2 text-foreground mb-6 leading-tight">
              Locate your vehicles <span className="italic-accent">24/7 from anywhere.</span>
            </h2>
            <motion.div 
              className="space-y-4 text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p>
                Travio provides professional GPS tracking solutions trusted by over 94,000 users worldwide. 
                Our GPSLive platform delivers real-time vehicle location, speed monitoring, and comprehensive 
                journey reports accessible from any web browser or our mobile app.
              </p>
              <p>
                Whether you need a simple self-install tracker for your car or a complete fleet management 
                system, our range of devices and software delivers the visibility and control you need.
              </p>
              <p className="text-foreground font-medium">
                From individual vehicle owners to enterprise fleets with thousands of vehicles — 
                <span className="text-accent"> Travio keeps you connected to what matters.</span>
              </p>
            </motion.div>
            <motion.div 
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link to="/products" className="group inline-flex items-center text-sm font-medium text-foreground link-underline">
                Vehicle Trackers
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/fleet" className="group inline-flex items-center text-sm font-medium text-foreground link-underline">
                Fleet Solutions
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/platform" className="group inline-flex items-center text-sm font-medium text-foreground link-underline">
                GPSLive Platform
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
