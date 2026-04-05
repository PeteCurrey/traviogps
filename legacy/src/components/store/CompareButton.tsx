import { GitCompareArrows } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCompareStore } from "@/stores/compareStore";
import type { Product } from "@/data/products";

interface CompareButtonProps {
  product: Product;
  className?: string;
}

export function CompareButton({ product, className }: CompareButtonProps) {
  const { items, add, remove } = useCompareStore();
  const isSelected = items.some((p) => p.id === product.id);
  const isFull = items.length >= 3 && !isSelected;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSelected) {
          remove(product.id);
        } else if (!isFull) {
          add(product);
        }
      }}
      disabled={isFull}
      className={cn(
        "flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm border transition-all duration-200",
        isSelected
          ? "bg-accent text-accent-foreground border-accent"
          : isFull
          ? "border-border text-muted-foreground/40 cursor-not-allowed"
          : "border-border text-muted-foreground hover:border-accent hover:text-accent",
        className
      )}
      title={isFull ? "Remove a product to add another" : isSelected ? "Remove from compare" : "Add to compare"}
    >
      <GitCompareArrows className="h-3 w-3" />
      {isSelected ? "Added" : "Compare"}
    </button>
  );
}
