import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { ArrowRight, Check, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { usePageMeta, useJsonLd } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface KeyStat {
  value: string;
  label: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface TrackingApplicationPageProps {
  title: string;
  subtitle: string;
  description: string;
  heroStat: string;
  heroImage?: string;
  keyStats: KeyStat[];
  benefits: Benefit[];
  features: Feature[];
  faqs?: FAQ[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

function useFaqJsonLd(faqs?: FAQ[]) {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-faq", "true");
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [faqs]);
}

export function TrackingApplicationPage({
  title,
  subtitle,
  description,
  heroStat,
  heroImage,
  keyStats,
  benefits,
  features,
  faqs,
  ctaTitle = "Ready to Get Started?",
  ctaDescription = "Speak with our team to find the right tracker for your needs.",
  ctaButtonText = "Get a Quote",
  ctaButtonLink = "/contact",
}: TrackingApplicationPageProps) {
  const { pathname } = useLocation();
  const SITE_URL = "https://traviogps.lovable.app";

  usePageMeta(
    `${title} | Travio GPS Tracking`,
    description,
    heroImage,
  );

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: {
      "@type": "Organization",
      name: "Travio GPS",
      url: SITE_URL,
    },
    url: `${SITE_URL}${pathname}`,
    areaServed: "GB",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${title} Features`,
      itemListElement: features.map((f, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: f.title,
          description: f.description,
        },
      })),
    },
  });

  useFaqJsonLd(faqs);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-20 bg-background overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0">
            <img src={heroImage} alt="" className="w-full h-full object-cover opacity-50 dark:opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/40 dark:from-background/90 dark:via-background/65 dark:to-background/30" />
          </div>
        )}
        <div className="container-premium relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">{subtitle}</p>
            <h1 className="font-serif text-3xl sm:text-display-3 md:text-display-2 text-foreground mb-4">
              {title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic-accent">{title.split(" ").slice(-1)}</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">{description}</p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-sm uppercase tracking-[0.2em] text-accent font-medium">{heroStat}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to={ctaButtonLink}>{ctaButtonText} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border hover:bg-secondary">
                <Link to="/products">Browse Trackers</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {keyStats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                <p className="font-serif text-3xl md:text-4xl text-accent mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Why Choose Travio</p>
            <h2 className="font-serif text-2xl sm:text-display-3 md:text-display-2 text-foreground">
              Key <span className="italic-accent">Benefits</span>
            </h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {benefits.map((benefit) => (
              <motion.div key={benefit.title} variants={itemVariants} className="p-8 bg-card rounded-sm border border-border hover:border-accent/30 transition-colors">
                <benefit.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Features</p>
            <h2 className="font-serif text-2xl sm:text-display-3 md:text-display-2 text-foreground">
              Everything You <span className="italic-accent">Need</span>
            </h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants} className="flex items-start gap-4 p-6 bg-background rounded-sm border border-border">
                <feature.icon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-premium max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Common Questions</p>
              <h2 className="font-serif text-2xl sm:text-display-3 md:text-display-2 text-foreground">
                Frequently <span className="italic-accent">Asked</span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-premium text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-2xl sm:text-display-3 md:text-display-2 text-foreground mb-4">{ctaTitle}</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">{ctaDescription}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to={ctaButtonLink}>{ctaButtonText} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:0800TRAVIO">Call 0800 TRAVIO</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
