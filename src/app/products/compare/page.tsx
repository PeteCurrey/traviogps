"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { useCompareStore } from "@/stores/compareStore";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Check, Minus, X } from "lucide-react";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { usePageMeta } from "@/lib/seo";
import { useMounted } from "@/hooks/useMounted";

export default function CompareProductsPage() {
  const mounted = useMounted();
  const { items, remove, clear } = useCompareStore();

  usePageMeta(
    "Compare GPS Trackers | Travio",
    "Compare GPS tracker features, prices, and specifications side by side. Find the perfect tracker for your vehicle or fleet."
  );

  if (!mounted) return null;

  if (items.length < 2) {
    return (
      <PageWrapper>
        <section className="pt-32 lg:pt-40 pb-20 bg-background text-center">
          <div className="container-premium">
            <h1 className="text-display-3 text-foreground mb-4">Compare Trackers</h1>
            <p className="text-muted-foreground mb-8">
              Select at least 2 products from the store to compare them side by side.
            </p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Store
              </Link>
            </Button>
          </div>
        </section>
      </PageWrapper>
    );
  }

  // Collect all unique spec labels
  const allSpecLabels = Array.from(
    new Set(items.flatMap((p) => p.specs.map((s) => s.label)))
  );

  // Collect all unique features
  const allFeatures = Array.from(
    new Set(items.flatMap((p) => p.features))
  );

  const rows: { label: string; key: string; getValue: (p: typeof items[0]) => string }[] = [
    { label: "Price", key: "price", getValue: (p) => p.price === 0 ? "Custom Quote" : `£${p.price.toFixed(2)}` },
    { label: "Subscription", key: "sub", getValue: (p) => p.subscriptionPrice || "None" },
    { label: "Rating", key: "rating", getValue: (p) => `${p.rating} ★ (${p.reviews.toLocaleString()})` },
    { label: "Category", key: "cat", getValue: (p) => p.category },
    { label: "Battery Life", key: "battery", getValue: (p) => p.batteryLife || "—" },
    { label: "Update Frequency", key: "update", getValue: (p) => p.updateFrequency || "—" },
    { label: "Waterproof", key: "water", getValue: (p) => p.waterproofRating || "—" },
    { label: "Connectivity", key: "conn", getValue: (p) => p.connectivity || "—" },
    { label: "Best For", key: "bestfor", getValue: (p) => p.bestFor.join(", ") },
  ];

  return (
    <PageWrapper>
      <section className="pt-32 lg:pt-40 pb-8 bg-background">
        <div className="container-premium">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button asChild variant="ghost" size="sm" className="mb-2 text-muted-foreground">
                <Link href="/products"><ArrowLeft className="mr-1 h-3.5 w-3.5" /> Back to Store</Link>
              </Button>
              <h1 className="text-display-3 text-foreground font-serif">
                Compare <span className="italic-accent">Trackers</span>
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={clear}>
              Clear All
            </Button>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="container-premium overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            {/* Header — product names */}
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 pr-4 w-[200px] text-xs uppercase tracking-[0.15em] text-muted-foreground align-bottom font-medium">
                  Product
                </th>
                {items.map((product) => (
                  <th key={product.id} className="py-4 px-4 text-left align-bottom">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-sm bg-secondary/30 flex items-center justify-center">
                          <product.icon className="w-6 h-6 text-accent" />
                        </div>
                        <button
                          onClick={() => remove(product.id)}
                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <Link href={`/products/${product.slug}`} className="text-foreground font-semibold hover:text-accent transition-colors text-sm leading-tight font-serif">
                        {product.name}
                      </Link>
                      {product.badge && (
                        <span className="text-[10px] uppercase tracking-wider text-accent font-medium">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Key attributes */}
              {rows.map((row, i) => (
                <tr key={row.key} className={i % 2 === 0 ? "bg-card/50" : ""}>
                  <td className="py-3 pr-4 text-sm text-muted-foreground font-medium">{row.label}</td>
                  {items.map((product) => (
                    <td key={product.id} className="py-3 px-4 text-sm text-foreground">
                      {row.getValue(product)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Specs section */}
              <tr className="border-t border-border">
                <td colSpan={items.length + 1} className="pt-6 pb-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Specifications</span>
                </td>
              </tr>
              {allSpecLabels.map((label, i) => (
                <tr key={label} className={i % 2 === 0 ? "bg-card/50" : ""}>
                  <td className="py-2.5 pr-4 text-sm text-muted-foreground">{label}</td>
                  {items.map((product) => {
                    const spec = product.specs.find((s) => s.label === label);
                    return (
                      <td key={product.id} className="py-2.5 px-4 text-sm text-foreground">
                        {spec?.value || <Minus className="h-4 w-4 text-muted-foreground/40" />}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Features section */}
              <tr className="border-t border-border">
                <td colSpan={items.length + 1} className="pt-6 pb-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Features</span>
                </td>
              </tr>
              {allFeatures.map((feature, i) => (
                <tr key={feature} className={i % 2 === 0 ? "bg-card/50" : ""}>
                  <td className="py-2 pr-4 text-sm text-muted-foreground">{feature}</td>
                  {items.map((product) => (
                    <td key={product.id} className="py-2 px-4">
                      {product.features.includes(feature) ? (
                        <Check className="h-4 w-4 text-accent" />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground/30" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* CTAs */}
          <div className="flex gap-4 mt-10 border-t border-border pt-8">
            <div className="w-[200px] flex-shrink-0" /> {/* Spacer for labels column */}
            {items.map((product) => (
              <div key={product.id} className="flex-1 flex flex-col gap-2">
                <AddToCartButton product={product} className="w-full" />
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/products/${product.slug}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
