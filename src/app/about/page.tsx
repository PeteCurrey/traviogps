"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Globe, Shield, MapPin, Truck, Radio } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { usePageMeta } from "@/lib/seo";

const stats = [
  { value: "94K+", label: "Active Users" },
  { value: "15+", label: "Years Experience" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "50+", label: "Countries Served" },
];

const values = [
  {
    icon: Shield,
    title: "Security",
    description: "Military-grade encryption and secure data handling protect your fleet information at all times.",
  },
  {
    icon: Radio,
    title: "Real-Time Tracking",
    description: "Live GPS updates every 10 seconds so you always know where your vehicles are.",
  },
  {
    icon: Award,
    title: "Reliability",
    description: "99.9% platform uptime backed by redundant infrastructure and 24/7 monitoring.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Expert support team available to help you get the most from your tracking solution.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function AboutPage() {
  usePageMeta("About Travio | GPS Tracking Company", "Learn about Travio — 15+ years of GPS tracking innovation. Trusted by 94,000+ users across 185 countries for vehicle, fleet, and asset tracking.");

  // Fetch team members from database
  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/hero-banner.webp"
            alt="About Travio Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">About Travio</p>
            <h1 className="font-serif text-display-3 md:text-display-2 lg:text-display-1 text-foreground mb-6">
              Smarter <span className="italic-accent">GPS tracking</span> for every vehicle
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Trusted by over 94,000 users worldwide, Travio delivers professional GPS tracking 
              solutions that keep you connected to your vehicles 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="font-serif text-display-3 mb-2">{stat.value}</p>
                <p className="text-accent-foreground/70 text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Our Story</p>
              <h2 className="font-serif text-display-3 text-foreground mb-6">
                Built for <span className="italic-accent">visibility</span> and control
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Travio was founded with a simple mission: give vehicle owners and fleet managers 
                  the real-time visibility they need to operate with confidence. What started as a 
                  small team of GPS enthusiasts has grown into one of the most trusted tracking 
                  platforms in the industry.
                </p>
                <p>
                  Our GPSLive platform delivers live vehicle location, speed monitoring, journey 
                  history, and comprehensive reports — all accessible from any web browser or our 
                  dedicated mobile app.
                </p>
                <p>
                  From a single car tracker to enterprise fleet management with thousands of 
                  vehicles, we provide the technology and support to keep you in control.
                  <strong> Your vehicles, always within reach.</strong>
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-sm overflow-hidden bg-secondary/30 relative">
                 <div className="w-full h-full flex items-center justify-center">
                  <MapPin className="h-20 w-20 text-accent/40" />
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/10 rounded-sm -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Your Perfect Move */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-[4/5] rounded-sm overflow-hidden bg-secondary/30 relative">
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin className="h-20 w-20 text-accent/40" />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Our Platform</p>
              <h2 className="font-serif text-display-3 text-foreground mb-6">
                The <span className="italic-accent">GPSLive</span> Advantage
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  GPSLive is more than just dots on a map. Our platform provides intelligent 
                  insights — from driver behaviour scoring and fuel usage analysis to geofence 
                  alerts and automated journey reports.
                </p>
                <p>
                  Whether you're monitoring a delivery fleet, protecting a personal vehicle, or 
                  managing company assets, GPSLive adapts to your needs with customisable 
                  dashboards, instant notifications, and detailed historical data.
                </p>
              </div>
              <Button asChild className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/platform">
                  Explore GPSLive
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Our Values</p>
            <h2 className="font-serif text-display-3 text-foreground">
              What we <span className="italic-accent">stand</span> for
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="text-center p-8"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <value.icon className="h-7 w-7 text-accent" />
                </motion.div>
                <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team - Dynamic from Database */}
      {teamMembers.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Meet The Team</p>
              <h2 className="font-serif text-display-3 text-foreground">
                The <span className="italic-accent">people</span> behind Travio
              </h2>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4 bg-secondary">
                    {member.image ? (
                      <motion.div
                        className="w-full h-full relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      >
                         <Image
                          src={member.image}
                          alt={member.full_name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl text-muted-foreground">
                        {member.full_name[0]}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors">
                    {member.full_name}
                  </h3>
                  <p className="text-accent text-sm mb-2">{member.job_title}</p>
                  {member.bio && (
                    <p className="text-muted-foreground text-sm line-clamp-2">{member.bio}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-accent text-accent-foreground text-center">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-display-3 mb-6">
              Ready to track smarter?
            </h2>
            <p className="opacity-70 mb-8 max-w-xl mx-auto">
              Whether you need a single vehicle tracker or a full fleet solution, we're here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 border-none">
                <Link href="/products">
                  Browse Trackers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
