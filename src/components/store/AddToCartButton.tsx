"use client";

import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/data/products";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline";
  className?: string;
  showText?: boolean;
}

export function AddToCartButton({
  product,
  size = "default",
  variant = "default",
  className,
  showText = true,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.price === 0) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (product.price === 0) {
    return null;
  }

  return (
    <Button
      size={size}
      variant={added ? "outline" : variant}
      className={cn(
        added && "border-accent text-accent",
        variant === "default" && !added && "bg-accent hover:bg-accent/90 text-accent-foreground",
        className
      )}
      onClick={handleAdd}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          {showText && <span className="ml-2">Added</span>}
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          {showText && <span className="ml-2">Add to Cart</span>}
        </>
      )}
    </Button>
  );
}
