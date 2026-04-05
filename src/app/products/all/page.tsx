"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, categories } from "@/data/products";
import { useState, useMemo } from "react";
import { ProductCard } from "@/components/store/ProductCard";
import { CompareBar } from "@/components/store/CompareBar";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePageMeta, useJsonLd } from "@/lib/seo";
import { useMounted } from "@/hooks/useMounted";

type SortOption = "popular" | "price-low" | "price-high" | "rating";

export default function AllProductsPage() {
  const router = useRouter();
  const mounted = useMounted();
  const isAll = true;

  const pageTitle = "All GPS Trackers & Tracking Devices — Travio Store";
  const pageDescription = "Browse our full range of GPS trackers, dashcams, and fleet tracking solutions. Free UK delivery on all orders.";

  usePageMeta(pageTitle, pageDescription);

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: typeof window !== "undefined" ? window.location.origin + "/" : "https://travio.gps/" },
      { "@type": "ListItem", position: 2, name: "Store", item: typeof window !== "undefined" ? window.location.origin + "/products" : "https://travio.gps/products" },
      { "@type": "ListItem", position: 3, name: "All Products" },
    ],
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.bestFor.some((b) => b.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        result = [...result].sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [search, sort]);

  if (!mounted) return null;

  return (
    <PageWrapper>
      {/* Breadcrumb */}
      <section className="pt-28 pb-2 bg-background">
        <div className="container-premium">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link href="/products">Store</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="pb-12 bg-background">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">All Products</p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              All <span className="italic-accent">Products</span>
            </h1>
            <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
              Explore our comprehensive range of high-performance GPS trackers and tracking equipment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 z-30 bg-card/95 backdrop-blur-md border-y border-border py-4">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background border-border"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="h-10 px-3 rounded-md border border-border bg-background text-foreground text-sm"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Categories
            </Button>

            <span className="text-sm text-muted-foreground hidden md:block ml-auto">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}>
              <div className="sticky top-40 space-y-1">
                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Categories</h3>
                <button
                  onClick={() => router.push("/products/all")}
                  className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors bg-accent/10 text-accent font-medium`}
                >
                  All Products
                  <span className="float-right text-xs opacity-60">{products.length}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => router.push(`/products/category/${encodeURIComponent(cat.name)}`)}
                    className="w-full text-left px-3 py-2 rounded-sm text-sm transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary"
                  >
                    {cat.name}
                    <span className="float-right text-xs opacity-60">{cat.count}</span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg mb-2">No products found.</p>
                  <p className="text-sm text-muted-foreground mb-6">Try browsing a different category or clearing your search.</p>
                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {categories.slice(0, 4).map((cat) => (
                      <Button key={cat.name} variant="outline" size="sm" asChild>
                        <Link href={`/products/category/${encodeURIComponent(cat.name)}`}>{cat.name}</Link>
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" onClick={() => { setSearch(""); router.push("/products/all"); }}>
                    View All Products
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="container-premium text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              Need <span className="italic-accent">Help?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Our tracking experts can recommend the perfect solution for you.
            </p>
            <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact">Get Expert Advice <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
      <CompareBar />
    </PageWrapper>
  );
}
