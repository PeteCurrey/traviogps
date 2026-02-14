import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Star, ArrowRight, Search, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { products, categories, type ProductCategory } from "@/data/products";
import { useState, useMemo } from "react";

type SortOption = "popular" | "price-low" | "price-high" | "rating";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") as ProductCategory | null;

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "All">(initialCategory || "All");
  const [sort, setSort] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

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
  }, [search, activeCategory, sort]);

  const handleCategoryClick = (cat: ProductCategory | "All") => {
    setActiveCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 lg:pt-40 pb-12 bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Shop</p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              GPS Tracking <span className="italic-accent">Store</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Professional GPS trackers, dashcams, and fleet solutions. Self-install options from
              £24.99 with free delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters Bar */}
      <section className="sticky top-16 z-30 bg-card/95 backdrop-blur-md border-y border-border py-4">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search trackers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background border-border"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort */}
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

            {/* Mobile filter toggle */}
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Categories
            </Button>

            {/* Results count */}
            <span className="text-sm text-muted-foreground hidden md:block ml-auto">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <div className="flex gap-8">
            {/* Sidebar Categories — Desktop */}
            <aside className={`w-64 flex-shrink-0 ${showFilters ? "block" : "hidden"} md:block`}>
              <div className="sticky top-40 space-y-1">
                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Categories
                </h3>
                <button
                  onClick={() => handleCategoryClick("All")}
                  className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                    activeCategory === "All"
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  All Products
                  <span className="float-right text-xs opacity-60">{products.length}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                      activeCategory === cat.name
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {cat.name}
                    <span className="float-right text-xs opacity-60">{cat.count}</span>
                  </button>
                ))}

                {/* Best For Filter */}
                <div className="pt-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    Quick Search
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Cars", "Vans", "Motorbikes", "Fleet", "Trailers", "Plant", "Boats"].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearch(tag)}
                          className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg mb-4">
                    No products found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearch("");
                      handleCategoryClick("All");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
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
                                <span className="font-medium text-foreground">
                                  Custom Quote
                                </span>
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
                        </div>
                      </Link>
                    </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              Not Sure Which <span className="italic-accent">Tracker?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Our team will help you find the right GPS tracker for your vehicle, asset, or fleet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link to="/contact">
                  Get Expert Advice <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:0800TRAVIO">Call 0800 TRAVIO</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Products;
