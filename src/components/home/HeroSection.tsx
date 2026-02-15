import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight, Navigation, Truck, Monitor } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import heroBanner from "@/assets/hero-banner.webp";

interface ServiceCard {
  icon: React.ElementType;
  category: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

const serviceCards: ServiceCard[] = [
  {
    icon: Navigation,
    category: "GPS Trackers",
    title: "Vehicle Trackers",
    description: "Self-install GPS trackers from £34.99 with real-time location monitoring",
    href: "/products",
    ctaLabel: "View Products"
  },
  {
    icon: Truck,
    category: "Business Solutions",
    title: "Fleet Management",
    description: "Complete fleet tracking, driver behaviour and telematics solutions",
    href: "/fleet",
    ctaLabel: "Explore Solutions"
  },
  {
    icon: Monitor,
    category: "Software",
    title: "GPSLive Platform",
    description: "Real-time tracking, reports, geo-zone alerts and mobile app access",
    href: "/platform",
    ctaLabel: "See Platform"
  }
];

function ServiceCardItem({ card, index }: { card: ServiceCard; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={card.href}
        className="group relative block p-6 lg:p-8 bg-card/50 backdrop-blur-sm border border-border/30 hover:border-accent/50 transition-all duration-500 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.5 }}
        />
        <div className="relative flex items-start gap-5">
          <motion.div
            className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center"
            animate={{ scale: isHovered ? 1.1 : 1, backgroundColor: isHovered ? "hsl(var(--accent) / 0.2)" : "hsl(var(--accent) / 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-5 h-5 text-accent" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{card.category}</span>
            <h3 className="font-serif text-xl lg:text-2xl text-foreground mt-1 mb-2">{card.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{card.description}</p>
            <motion.div className="flex items-center gap-2 mt-4 text-accent text-sm font-medium" animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.3 }}>
              <span>{card.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
        <motion.div className="absolute bottom-0 left-0 h-0.5 bg-accent" initial={{ width: 0 }} animate={{ width: isHovered ? "100%" : 0 }} transition={{ duration: 0.4 }} />
      </Link>
    </motion.div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.1]);

  return (
    <section ref={containerRef} className="relative bg-background pt-20 lg:pt-[104px]">
      <div className="min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-104px)] flex flex-col lg:flex-row">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-[35vh] sm:h-[40vh] lg:h-full lg:w-[60%] overflow-hidden"
        >
          <motion.img src={heroBanner} alt="GPS tracking dashboard showing real-time vehicle locations" className="w-full h-full object-cover" style={{ y: imageY, scale: imageScale }} />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-transparent lg:from-background/40 lg:via-transparent lg:to-background/80" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-8 left-6 right-6 lg:bottom-16 lg:left-12 lg:right-auto lg:max-w-xl"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-primary/80 mb-3 block">Smart GPS Tracking</span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-primary leading-[1.1] mb-4">
              Track Your Vehicles
              <br />
              <span className="italic-accent">in Real Time</span>
            </h1>
            <p className="text-primary/70 text-sm md:text-base max-w-md hidden sm:block">
              Professional GPS tracking systems for cars, vans, fleets and assets. Monitor location, speed and driver behaviour 24/7.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-8 right-6 lg:bottom-16 lg:right-12 hidden md:flex gap-8"
          >
            {[
              { value: 94, suffix: "K+", label: "Devices Connected" },
              { value: 185, suffix: "", label: "Countries" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-right">
                <div className="font-serif text-2xl lg:text-3xl text-primary">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={i * 0.2} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-primary/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="flex-1 lg:w-[40%] flex flex-col bg-background/95 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="px-6 lg:px-10 pt-6 lg:pt-10 pb-4">
            <h2 className="font-serif text-xl lg:text-2xl text-foreground">
              How can we <span className="italic-accent">help you?</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">GPS tracking solutions tailored to your needs</p>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center px-4 lg:px-8 py-4 lg:py-0 gap-3 lg:gap-4">
            {serviceCards.map((card, index) => (
              <ServiceCardItem key={card.title} card={card} index={index} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }} className="px-6 lg:px-10 py-6 lg:py-8 border-t border-border/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Need help choosing a tracker?</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Call us on <a href="tel:0800TRAVIO" className="text-accent hover:underline">0800 TRAVIO</a>
                </p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors">
                Request Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="hidden lg:flex absolute bottom-8 left-[30%] -translate-x-1/2 flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-primary/60">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-6 h-10 rounded-full border border-primary/30 flex items-start justify-center p-2">
          <motion.div animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
