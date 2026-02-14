import { useParams, Link } from "react-router-dom";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Star, Check, ArrowRight, ArrowLeft, Phone, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductBySlug, products } from "@/data/products";
import { AddToCartButton } from "@/components/store/AddToCartButton";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");

  if (!product) {
    return (
      <PageWrapper>
        <section className="pt-32 lg:pt-40 section-padding bg-background text-center">
          <div className="container-premium">
            <h1 className="font-serif text-display-3 text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button asChild variant="outline">
              <Link to="/products"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Store</Link>
            </Button>
          </div>
        </section>
      </PageWrapper>
    );
  }

  // Related products — same category, excluding current
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <PageWrapper>
      {/* Breadcrumb */}
      <section className="pt-28 pb-2 bg-background">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/products" className="hover:text-foreground transition-colors">Store</Link>
            <span>/</span>
            <Link to={`/products/category/${encodeURIComponent(product.category)}`} className="hover:text-foreground transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-12 bg-background">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="aspect-square bg-card rounded-sm border border-border flex items-center justify-center relative">
              <product.icon className="w-32 h-32 text-accent/40" />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{product.badge}</Badge>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium">{product.category}</span>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground mt-2 mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {product.price === 0 ? (
                  <p className="text-2xl font-medium text-foreground">Custom Quote</p>
                ) : (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-medium text-foreground">£{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">£{product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                )}
                {product.subscriptionPrice && (
                  <p className="text-sm text-muted-foreground mt-1">+ {product.subscriptionPrice} subscription</p>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Best For Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.bestFor.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Key Specs Quick View */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {product.batteryLife && (
                  <div className="p-3 bg-card rounded-sm border border-border">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Battery</p>
                    <p className="text-sm font-medium text-foreground">{product.batteryLife}</p>
                  </div>
                )}
                {product.updateFrequency && (
                  <div className="p-3 bg-card rounded-sm border border-border">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Updates</p>
                    <p className="text-sm font-medium text-foreground">{product.updateFrequency}</p>
                  </div>
                )}
                {product.waterproofRating && (
                  <div className="p-3 bg-card rounded-sm border border-border">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Waterproof</p>
                    <p className="text-sm font-medium text-foreground">{product.waterproofRating}</p>
                  </div>
                )}
                {product.connectivity && (
                  <div className="p-3 bg-card rounded-sm border border-border">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Network</p>
                    <p className="text-sm font-medium text-foreground">{product.connectivity}</p>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <AddToCartButton product={product} size="lg" className="flex-1 md:flex-none" />
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:0800TRAVIO"><Phone className="mr-2 h-4 w-4" /> Call to Order</a>
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Truck className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Free UK delivery</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>2-year warranty</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <RotateCcw className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>30-day returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs: Features / Specs */}
      <section className="section-padding bg-card">
        <div className="container-premium max-w-4xl">
          <Tabs defaultValue="features">
            <TabsList className="w-full justify-start bg-background border border-border mb-8">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 p-4 bg-background rounded-sm border border-border">
                    <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specs">
              <div className="bg-background rounded-sm border border-border overflow-hidden">
                {product.specs.map((spec, i) => (
                  <div key={spec.label} className={`flex justify-between px-6 py-3 ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
                    <span className="text-sm text-muted-foreground">{spec.label}</span>
                    <span className="text-sm font-medium text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-premium">
            <h2 className="font-serif text-2xl text-foreground mb-8">Related <span className="italic-accent">Products</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/products/${p.slug}`} className="group block bg-card rounded-sm border border-border overflow-hidden hover:border-accent/50 transition-all">
                  <div className="aspect-[4/3] bg-secondary/20 flex items-center justify-center">
                    <p.icon className="w-12 h-12 text-accent/40 group-hover:text-accent/70 transition-colors" />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] uppercase tracking-wider text-accent">{p.category}</span>
                    <h3 className="font-serif text-base text-foreground mt-1 group-hover:text-accent transition-colors">{p.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium">{p.price === 0 ? "Quote" : `£${p.price.toFixed(2)}`}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <span className="text-xs">{p.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageWrapper>
  );
};

export default ProductDetail;
