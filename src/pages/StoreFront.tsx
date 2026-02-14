import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/store/ProductCard";
import { CompareBar } from "@/components/store/CompareBar";

const StoreFront = () => {
  const bestsellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const featured = products.filter((p) => p.badge);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 lg:pt-40 pb-16 bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Official Store</p>
            <h1 className="font-serif text-display-3 md:text-display-1 text-foreground mb-4">
              GPS Tracking <span className="italic-accent">Store</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Professional GPS trackers, dashcams, and fleet solutions. Self-install from £24.99 with free UK delivery.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/products/all">Shop All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Get Expert Advice</Link>
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

      {/* Categories */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
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
                  className="group block p-6 bg-card rounded-sm border border-border hover:border-accent/50 transition-all text-center"
                >
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
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="md:hidden text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/products/all">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
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

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="container-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
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
