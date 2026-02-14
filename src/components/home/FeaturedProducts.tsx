import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Navigation, Plug, Video, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: "db2",
    name: "DB2 Self-Install Tracker",
    slug: "db2-self-install",
    price: "£34.99",
    priceNote: "+ subscription",
    rating: 4.7,
    reviews: 2340,
    category: "Vehicle Tracker",
    description: "Magnetic GPS tracker with 10-second updates, geo-zone alerts, and 140-day battery life",
    icon: Navigation,
  },
  {
    id: "db3",
    name: "DB3 OBD-II Tracker",
    slug: "db3-obd",
    price: "£59.99",
    priceNote: "+ subscription",
    rating: 4.8,
    reviews: 1890,
    category: "Plug & Play",
    description: "Simply plug into your OBD port for instant vehicle tracking with no wiring required",
    icon: Plug,
  },
  {
    id: "dashcam",
    name: "Dual Vision Dashcam",
    slug: "dual-vision-dashcam",
    price: "£169.99",
    priceNote: "",
    rating: 4.6,
    reviews: 856,
    category: "Dashcam + GPS",
    description: "Front and rear HD dashcam with built-in GPS tracking and cloud video storage",
    icon: Video,
  },
  {
    id: "s5plus",
    name: "S5+ Insurance Tracker",
    slug: "s5-plus-insurance",
    price: "£349.99",
    priceNote: "fitted",
    rating: 4.9,
    reviews: 1245,
    category: "Thatcham Approved",
    description: "Insurance-approved S5 tracker with 24/7 monitoring centre and stolen vehicle recovery",
    icon: Shield,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function FeaturedProducts() {
  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.3em] text-accent mb-3"
            >
              Featured Products
            </motion.p>
            <h2 className="font-serif text-display-3 text-foreground">
              Our <span className="italic-accent">Best</span> Sellers
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="outline" className="border-border hover:bg-secondary hover:scale-105 transition-all duration-300">
              <Link to="/products">View All Products</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <Link to={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4 bg-secondary/30 flex items-center justify-center">
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <product.icon className="w-16 h-16 text-accent/60 mx-auto mb-3" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</span>
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>

                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <p className="font-medium text-foreground">
                    {product.price}
                    {product.priceNote && <span className="text-sm text-muted-foreground ml-1">{product.priceNote}</span>}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
