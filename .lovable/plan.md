

# Enhanced Store Hub with Improved UX and SEO

## Overview
Transform the existing StoreFront page (`/products`) into a rich, content-driven store hub that guides users through the product range with informative sections, better navigation cues, and SEO-focused content. Also enhance the category listing page and product detail page for a more polished shopping experience.

## Changes

### 1. Revamp StoreFront.tsx (`/products`) -- The Store Hub

**New sections to add (in order):**

- **Hero** -- Rewrite with stronger SEO H1 ("GPS Trackers & Vehicle Tracking Devices | UK Store") and a short paragraph with keywords. Add a secondary "Compare Trackers" CTA.
- **Trust Bar** -- Keep as-is (free delivery, warranty, returns, rating).
- **"How It Works" Section** -- 3-step visual guide: Choose Your Tracker > Self-Install in Minutes > Track Live on GPSLive. Builds confidence for new visitors and reduces bounce.
- **Bestsellers** -- Keep, but add a "Why customers love it" one-liner under each card showing the top review highlight or key stat (e.g., "140-day battery | 2,340 reviews").
- **Shop by Category** -- Keep, but enhance cards with an icon per category (using existing Lucide icons matching the product types) and a slightly larger card layout.
- **"Which Tracker Is Right For You?" Quiz/Guide** -- A simple interactive section with 3-4 clickable cards (e.g., "I want to track my Car", "I want to track a Trailer", "I need Fleet Tracking", "I need Insurance Approved"). Each card links to the relevant category page. This replaces the generic CTA and provides a better UX funnel.
- **Featured/New Arrivals** -- Keep featured products section.
- **Use Cases / Social Proof Strip** -- A horizontal stats bar: "94,000+ devices connected", "185 countries", "2,000+ businesses", "4.8 avg rating". Reinforces trust.
- **FAQ Section** -- 4-5 common questions with accordion (using existing Accordion component): "Do I need a subscription?", "How do I install a GPS tracker?", "Which tracker has the longest battery?", "Do you offer fleet discounts?", "Is there a money-back guarantee?". Great for SEO and reducing support queries.
- **CTA** -- Keep the expert advice CTA at the bottom.

**SEO enhancements:**
- Add a `<Helmet>`-style approach using `document.title` and meta description via a `useEffect` on mount.
- Use semantic HTML: proper H1, H2, H3 hierarchy.
- Add structured breadcrumb even on the hub (Home > Store).
- Add JSON-LD structured data for the store (WebSite + ItemList schema) via a script tag in useEffect.

### 2. Enhance CategoryProducts.tsx

- Add a short SEO paragraph below the category heading describing what that category offers (pull from `categories` data -- extend the `description` field to be longer, or add a `longDescription`).
- Add breadcrumb structured data.
- Improve the empty state with category suggestions.

### 3. Enhance ProductDetail.tsx

- Add an "In the box" section beneath specs showing what the customer receives.
- Add structured product data (JSON-LD Product schema with price, rating, availability).
- Add a "Frequently Bought Together" section showing compatible accessories (based on `bestFor` tag matching).

### 4. Extend Product Data

- Add a `longDescription` field to the categories array for SEO-rich category pages.
- Add an `inTheBox` string array to each product for the "What's in the box" section.
- Add a `highlight` field (short string) to products for the bestseller section callout.

### 5. SEO Utility

- Create a small `src/lib/seo.ts` utility with a `usePageMeta(title, description)` hook that sets `document.title` and the meta description tag on mount.
- Apply it to StoreFront, CategoryProducts, and ProductDetail pages.

## Technical Details

### Files to create:
- `src/lib/seo.ts` -- `usePageMeta` hook

### Files to modify:
- `src/data/products.ts` -- Add `highlight`, `inTheBox` fields to Product interface and product entries; add `longDescription` to categories
- `src/pages/StoreFront.tsx` -- Full rewrite with new sections (How It Works, Quiz Guide, Stats Strip, FAQ, breadcrumbs, JSON-LD)
- `src/pages/CategoryProducts.tsx` -- Add long description, improved empty state, page meta
- `src/pages/ProductDetail.tsx` -- Add "In the Box", "Frequently Bought Together", JSON-LD Product schema, page meta

### Component patterns:
- Uses existing Accordion component for FAQ
- Uses existing motion/framer-motion patterns for scroll animations
- Follows the existing design system (font-serif headings, italic-accent spans, section-padding, container-premium, text-accent colour)
- All new sections follow the alternating bg-background / bg-card pattern already established

