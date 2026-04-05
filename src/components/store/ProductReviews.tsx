"use client";

import { Star, BadgeCheck, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import type { CustomerReview } from "@/data/products";
import { Progress } from "@/components/ui/progress";

interface ProductReviewsProps {
  reviews: CustomerReview[];
  rating: number;
  totalReviews: number;
}

const RatingBar = ({ stars, count, total }: { stars: number; count: number; total: number }) => {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-8 text-right text-muted-foreground">{stars}★</span>
      <Progress value={pct} className="h-2 flex-1" />
      <span className="w-8 text-muted-foreground">{count}</span>
    </div>
  );
};

const ReviewCard = ({ review }: { review: CustomerReview }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-5 bg-background rounded-sm border border-border"
  >
    <div className="flex items-start justify-between mb-2">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-accent text-accent" : "text-border"}`} />
          ))}
        </div>
        <h4 className="font-medium text-sm text-foreground">{review.title}</h4>
      </div>
      {review.verified && (
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
          <BadgeCheck className="h-3 w-3" /> Verified
        </span>
      )}
    </div>
    <p className="text-sm text-muted-foreground mb-3">{review.body}</p>
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <span>{review.author} · {review.date}</span>
      <span className="inline-flex items-center gap-1">
        <ThumbsUp className="h-3 w-3" /> {review.helpful} found helpful
      </span>
    </div>
  </motion.div>
);

export const ProductReviews = ({ reviews, rating, totalReviews }: ProductReviewsProps) => {
  // Build distribution from the reviews we have
  const dist = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    count: reviews.filter((r) => r.rating === s).length,
  }));

  return (
    <section className="section-padding bg-background">
      <div className="container-premium max-w-4xl">
        <h2 className="font-serif text-2xl text-foreground mb-8">
          Customer <span className="italic-accent">Reviews</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 mb-10">
          {/* Summary */}
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-sm border border-border">
            <span className="text-4xl font-medium text-foreground">{rating}</span>
            <div className="flex gap-0.5 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-border"}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Based on {totalReviews.toLocaleString()} reviews</span>
          </div>

          {/* Distribution */}
          <div className="flex flex-col justify-center gap-2">
            {dist.map((d) => (
              <RatingBar key={d.stars} stars={d.stars} count={d.count} total={reviews.length} />
            ))}
          </div>
        </div>

        {/* Individual reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
};
