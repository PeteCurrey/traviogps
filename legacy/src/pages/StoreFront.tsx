import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Star, Shield, Truck, RotateCcw, Search, Car, Caravan,
  Container, ShieldCheck, MousePointerClick, Wrench, Smartphone, MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/store/ProductCard";
import { CompareBar } from "@/components/store/CompareBar";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { usePageMeta, useJsonLd } from "@/lib/seo";

const StoreFront = () => {
  const bestsellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const featured = products.filter((p) => p.badge);

  usePageMeta(
    "GPS Trackers & Vehicle Tracking Devices | UK Store — Travio",
    "Shop professional GPS trackers, dashcams, and fleet tracking solutions. Self-install from £24.99 with free UK delivery. 4.8★ rated, 2-year warranty, 30-day returns.",
  );

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Travio GPS Tracker Store",
    url: window.location.origin + "/products",
    potentialAction: {
      "@type": "SearchAction",
      target: window.location.origin + "/products/all?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Selling GPS Trackers",
    numberOfItems: bestsellers.length,
    itemListElement: bestsellers.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        url: window.location.origin + `/products/${p.slug}`,
        offers: { "@type": "Offer", price: p.price, priceCurrency: "GBP" },
      },
    })),
  });

  const howItWorks = [
    { icon: Search, step: "01", title: "Choose Your Tracker", description: "Browse our range or use the guide below to find the perfect GPS tracker for your vehicle, asset, or fleet." },
    { icon: Wrench, step: "02", title: "Self-Install in Minutes", description: "Most trackers are magnetic or plug-and-play — no tools or wiring needed. Just attach and go." },
    { icon: Smartphone, step: "03", title: "Track Live on GPSLive", description: "Download our free app (iOS & Android) and see your vehicle's location, speed, and journey history in real-time." },
  ];

  const quizCards = [
    { icon: Car, label: "I want to track my Car", link: "/products/category/Vehicle%20Trackers" },
    { icon: Caravan, label: "I want to track a Trailer", link: "/products/category/Asset%20Trackers" },
    { icon: Container, label: "I need Fleet Tracking", link: "/products/category/Fleet%20Solutions" },
    { icon: ShieldCheck, label: "I need Insurance Approved", link: "/products/category/Insurance%20Approved" },
  ];

  const stats = [
    { value: "94,000+", label: "Devices Connected" },
    { value: "185", label: "Countries" },
    { value: "2,000+", label: "Businesses Trust Us" },
    { value: "4.8★", label: "Average Rating" },
  ];

  const faqs = [
    { q: "Do I need a subscription?", a: "Most of our GPS trackers require a low-cost monthly subscription which covers the SIM data, platform access, and mobile app. Subscriptions start from just £2.99/month with no long-term contract — cancel anytime." },
    { q: "How do I install a GPS tracker?", a: "Most of our trackers are self-install. Magnetic trackers simply attach to any metal surface under your vehicle. OBD trackers plug directly into the diagnostic port. Hardwired trackers connect to the vehicle battery — we include full guides, or you can opt for professional installation." },
    { q: "Which tracker has the longest battery?", a: "The Asset Tracker Pro has the longest battery life at up to 5 years on standby, using smart power management with daily check-ins. For vehicles, the DB2 offers 140 days of battery life with 10-second real-time updates." },
    { q: "Do you offer fleet discounts?", a: "Yes! Our Fleet Starter Pack (5 vehicles) saves 12%, and the Fleet Business Pack (10 vehicles) saves 19%. For 25+ vehicles, contact us for bespoke enterprise pricing with dedicated account management." },
    { q: "Is there a money-back guarantee?", a: "Absolutely. All products come with a 30-day money-back guarantee. If you're not completely satisfied, return the tracker in its original condition for a full refund — no questions asked." },
  ];

  return (
    <PageWrapper>
      {/* Breadcrumb */}
      <section className="pt-28 pb-0 bg-background">
        <div className="container-premium">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Store</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero */}
      <section className="pt-8 lg:pt-12 pb-16 bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Official Store</p>
            <h1 className="font-serif text-display-3 md:text-display-1 text-foreground mb-4">
              GPS Trackers & Vehicle <span className="italic-accent">Tracking Devices</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Professional GPS trackers, connected dashcams, and fleet tracking solutions for vehicles, assets, and people. Self-install from £24.99 with free UK delivery and a 2-year warranty.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/products/all">Shop All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/compare">Compare Trackers</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 bg-card border-y border-border">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck className="h-5 w-5 text-accent" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Free UK Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">2-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RotateCcw className="h-5 w-5 text-accent" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">4.8★ Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-2">Simple Setup</p>
            <h2 className="font-serif text-display-3 md:text-display-2 text-foreground">
              How It <span className="italic-accent">Works</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-card rounded-sm border border-border"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium block mb-2">Step {item.step}</span>
                <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-2">Top Picks</p>
              <h2 className="font-serif text-display-3 md:text-display-2 text-foreground">
                Best <span className="italic-accent">Sellers</span>
              </h2>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link to="/products/all">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {bestsellers.map((product, i) => (
              <div key={product.id}>
                <ProductCard product={product} index={i} />
                {product.highlight && (
                  <p className="text-xs text-center text-muted-foreground mt-2 italic">{product.highlight}</p>
                )}
              </div>
            ))}
          </div>
          <div className="md:hidden text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/products/all">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-2">Browse</p>
            <h2 className="font-serif text-display-3 md:text-display-2 text-foreground">
              Shop by <span className="italic-accent">Category</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/products/category/${encodeURIComponent(cat.name)}`}
                  className="group block p-8 bg-card rounded-sm border border-border hover:border-accent/50 transition-all text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3">
                    <cat.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-serif text-base text-foreground group-hover:text-accent transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{cat.description}</p>
                  <span className="text-[10px] uppercase tracking-wider text-accent">
                    {cat.count} products <ArrowRight className="inline h-3 w-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Which Tracker Quiz */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-2">Find Your Fit</p>
            <h2 className="font-serif text-display-3 md:text-display-2 text-foreground">
              Which Tracker Is Right <span className="italic-accent">For You?</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Select what you need to track and we'll show you the best options.</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {quizCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={card.link}
                  className="group flex flex-col items-center gap-4 p-8 bg-background rounded-sm border border-border hover:border-accent hover:shadow-lg transition-all text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <card.icon className="h-7 w-7 text-accent" />
                  </div>
                  <span className="font-serif text-sm text-foreground group-hover:text-accent transition-colors">{card.label}</span>
                  <MousePointerClick className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-premium">
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-2">Highlighted</p>
              <h2 className="font-serif text-display-3 md:text-display-2 text-foreground">
                Featured <span className="italic-accent">Products</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {featured.slice(0, 6).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social Proof Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-serif text-3xl md:text-4xl text-accent mb-1">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-premium max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-2">Common Questions</p>
            <h2 className="font-serif text-display-3 md:text-display-2 text-foreground">
              Frequently Asked <span className="italic-accent">Questions</span>
            </h2>
          </motion.div>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-sm px-6">
                <AccordionTrigger className="text-left font-serif text-base text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="container-premium text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              Not Sure Which <span className="italic-accent">Tracker?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Our team will help you find the right GPS tracker for your vehicle, asset, or fleet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact">Get Expert Advice <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:0800TRAVIO">Call 0800 TRAVIO</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <CompareBar />
    </PageWrapper>
  );
};

export default StoreFront;
