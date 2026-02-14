import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/stores/compareStore";
import { Link } from "react-router-dom";

export function CompareBar() {
  const { items, remove, clear } = useCompareStore();

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-elevated"
      >
        <div className="container-premium py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">
                Compare ({items.length}/3)
              </span>
              <div className="flex items-center gap-2 overflow-x-auto">
                {items.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-2 bg-secondary/50 rounded-sm px-3 py-1.5 text-sm whitespace-nowrap"
                  >
                    <span className="text-foreground font-medium truncate max-w-[140px]">
                      {product.name}
                    </span>
                    <button
                      onClick={() => remove(product.id)}
                      className="text-muted-foreground hover:text-foreground flex-shrink-0"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={clear} className="text-muted-foreground">
                Clear
              </Button>
              <Button
                asChild
                size="sm"
                disabled={items.length < 2}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link to="/products/compare">
                  Compare <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
