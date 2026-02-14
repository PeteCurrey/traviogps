import { useParams } from "react-router-dom";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Star, Shield, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const { slug } = useParams();

  return (
    <PageWrapper>
      <section className="pt-32 lg:pt-40 section-padding bg-background">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="aspect-square bg-secondary/30 rounded-sm flex items-center justify-center">
              <Shield className="w-32 h-32 text-accent/40" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-2">GPS Tracker</p>
              <h1 className="font-serif text-display-3 text-foreground mb-4">Product Details</h1>
              <p className="text-muted-foreground mb-6">Detailed product information for: {slug}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="font-medium">4.8</span>
                <span className="text-muted-foreground">(1,500+ reviews)</span>
              </div>

              <div className="space-y-3 mb-8">
                {["Real-time GPS tracking", "10-second location updates", "Geo-zone alerts", "Journey history & reports", "Mobile app access"].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-accent" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                Request Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ProductDetail;
