import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CompareButton } from "@/components/store/CompareButton";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        to={`/products/${product.slug}`}
        className="group block bg-card rounded-sm border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 h-full"
      >
        {/* Product Image Area */}
        <div className="aspect-[4/3] bg-secondary/20 flex items-center justify-center relative">
          <product.icon className="w-16 h-16 text-accent/40 group-hover:text-accent/70 transition-colors duration-300" />
          {product.badge && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs">
              {product.badge}
            </Badge>
          )}
          <div className="absolute top-3 right-3">
            <CompareButton product={product} />
          </div>
          {product.subscriptionRequired && (
            <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-wider text-muted-foreground bg-background/80 px-2 py-0.5 rounded">
              + subscription
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <span className="text-[10px] uppercase tracking-[0.15em] text-accent font-medium">
            {product.category}
          </span>
          <h3 className="font-serif text-lg text-foreground mt-1 mb-1.5 group-hover:text-accent transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.bestFor.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price & Rating */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div>
              {product.price === 0 ? (
                <span className="font-medium text-foreground">Custom Quote</span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground text-lg">
                    £{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      £{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              )}
              {product.subscriptionPrice && (
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {product.subscriptionPrice}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({product.reviews.toLocaleString()})
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-3" onClick={(e) => e.preventDefault()}>
            <AddToCartButton product={product} size="sm" className="w-full" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
