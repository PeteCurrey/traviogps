import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Navigation, Plug, Video, Shield, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const allProducts = [
  { id: "db2", name: "DB2 Self-Install Tracker", slug: "db2-self-install", price: "£34.99", category: "Vehicle", rating: 4.7, reviews: 2340, description: "Magnetic GPS tracker with 10-second updates, geo-zone alerts, and 140-day battery life", icon: Navigation },
  { id: "db3", name: "DB3 OBD-II Tracker", slug: "db3-obd", price: "£59.99", category: "Plug & Play", rating: 4.8, reviews: 1890, description: "Simply plug into your OBD port for instant vehicle tracking", icon: Plug },
  { id: "db1-lite", name: "DB1 Lite Tracker", slug: "db1-lite", price: "£24.99", category: "Vehicle", rating: 4.5, reviews: 980, description: "Budget-friendly GPS tracker with daily location updates", icon: Navigation },
  { id: "dashcam", name: "Dual Vision Dashcam", slug: "dual-vision-dashcam", price: "£169.99", category: "Dashcam", rating: 4.6, reviews: 856, description: "Front and rear HD dashcam with built-in GPS tracking", icon: Video },
  { id: "s5plus", name: "S5+ Insurance Tracker", slug: "s5-plus-insurance", price: "£349.99", category: "Insurance", rating: 4.9, reviews: 1245, description: "Thatcham-approved S5 tracker with 24/7 monitoring centre", icon: Shield },
  { id: "asset1", name: "Asset Tracker Pro", slug: "asset-tracker-pro", price: "£89.99", category: "Asset", rating: 4.7, reviews: 567, description: "5-year battery life tracker for trailers, containers and plant", icon: Navigation },
];

const Products = () => {
  return (
    <PageWrapper>
      <section className="pt-32 lg:pt-40 pb-16 bg-background">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Our Products</p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">GPS Tracking <span className="italic-accent">Devices</span></h1>
            <p className="text-muted-foreground max-w-2xl text-lg">Professional GPS trackers for vehicles, fleets, and assets. Self-install options from £24.99.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}>
                <Link to={`/products/${product.slug}`} className="group block bg-card rounded-sm border border-border overflow-hidden hover:border-accent/50 transition-all duration-500">
                  <div className="aspect-[4/3] bg-secondary/30 flex items-center justify-center">
                    <product.icon className="w-16 h-16 text-accent/50 group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-wider text-accent">{product.category}</span>
                    <h3 className="font-serif text-xl text-foreground mt-1 mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground text-lg">{product.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Products;
