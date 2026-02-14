

# Travio - GPS Tracking Website Rebuild

## Overview

Transform the current Dales & Peaks estate agency website into **Travio**, a premium GPS tracking systems website. The design template (dark, sophisticated aesthetic with Playfair Display headings, copper/bronze accents, and smooth framer-motion animations) will be preserved. All property-related content, pages, and components will be replaced with GPS tracker content sourced from www.rewiresecurity.co.uk via Firecrawl.

---

## Content to Scrape from Rewire Security

Using Firecrawl, we will extract:
- Product listings (GPS trackers, dashcams, etc.) with names, prices, descriptions, ratings
- Feature descriptions (real-time tracking, fleet management, alerts, reports, etc.)
- Use case categories (Cars, Fleets, People, Assets)
- Statistics (94,000+ devices, 2,000+ fleets, 185 countries, 300B data points)
- Testimonial/review content
- Platform features (GPSLive software capabilities)

---

## Phase 1: Branding & Core Layout Changes

### 1.1 Rebrand to Travio
- **SplashScreen.tsx** - Change "Dales & Peaks" to "Travio", update tagline to "Smart GPS Tracking"
- **DalesAndPeaksLogo.tsx** - Rename to `TravioLogo.tsx`, replace logo image with a new Travio text/icon logo (location pin motif)
- **Navigation.tsx** - Replace all property nav links with GPS tracking navigation:
  - GPS Trackers (Vehicle, Magnetic, Portable, Insurance)
  - Fleet Solutions (Fleet Tracking, Driver ID, Temperature Monitoring)
  - Platform (GPSLive, Reports, Alerts, Mobile App)
  - Company (About, Blog, Contact)
- **Footer.tsx** - Replace all property links, update contact info, social links, brand description

### 1.2 Color Scheme Adjustment
- Keep the dark premium aesthetic (deep forest green background)
- Shift accent color slightly toward a blue/tech tone to suit GPS/tracking (from copper `25 45% 50%` to a tech-blue like `210 70% 55%`)
- This is a minor CSS variable change in `index.css`

---

## Phase 2: Homepage Sections Transformation

### 2.1 HeroSection.tsx
- Replace hero image with GPS tracking dashboard/software imagery
- Change headline: "Smart GPS Tracking Systems" with italic accent "for your fleet"
- Update service cards to:
  - Vehicle Trackers - "Self-install GPS trackers from GBP34.99"
  - Fleet Solutions - "Complete fleet management and telematics"
  - GPSLive Platform - "Real-time tracking, reports & alerts"
- Update stats: 94,000+ Devices Connected, 2,000+ Business Fleets, 185 Countries

### 2.2 AboutSection.tsx
- Replace with "Locate Vehicles 24/7" section
- Content about GPSLive platform, real-time tracking, web and mobile access
- Links to Vehicle Tracking, Magnetic Trackers, Portable Trackers

### 2.3 FeaturedProperties.tsx -> FeaturedProducts.tsx
- Replace property cards with product cards showing GPS tracker products
- Products: DB2 Self-Install (GBP34.99), DB3 OBD-II (GBP59.99), Dual Vision Dashcam (GBP169.99), S5+ Insurance Tracker (GBP349.99)
- Each with rating, price, and "View Product" CTA

### 2.4 AreasSection.tsx -> UseCasesSection.tsx
- Replace area grid with use case categories:
  - For Cars
  - For Fleets
  - For People
  - For Assets

### 2.5 ServicesSection.tsx -> FeaturesSection.tsx
- Replace property services with GPS features:
  - Real-time Tracking
  - Driver Behaviour Management
  - Geo-zone Alarms
  - Remote Temperature Monitoring

### 2.6 TestimonialsSection.tsx
- Replace property testimonials with GPS tracking customer reviews
- Keep the same elegant carousel design

### 2.7 CTASection.tsx
- Update to "Reach Out Today" - "Discover Our Tailored Solutions for Businesses"
- CTA buttons: "Request Demo" and "Contact Us"

---

## Phase 3: Page Restructuring

### 3.1 Pages to Remove/Repurpose
Remove all property-specific pages and routes:
- Sales, Lettings, MapSearch, PropertyDetail, Valuation
- Sell, Landlords, Tenants, PropertyManagement
- NewHomes, DevelopmentDetail, ShowcaseIndex, ShowcaseDetail
- Areas, AreaGuide

### 3.2 Pages to Create/Keep
- **/** - Homepage (rebuilt as above)
- **/products** - Product listing page (replaces Sales)
- **/products/:slug** - Individual product detail page
- **/fleet** - Fleet solutions page
- **/platform** - GPSLive platform features page
- **/about** - About Travio (repurpose existing About page)
- **/contact** - Contact page (repurpose existing)
- **/blog** - Blog/News (keep existing)
- **/privacy** and **/terms** - Keep existing

### 3.3 Admin Pages
- Keep admin structure but rename property management to product management
- Admin dashboard stats updated for tracker/order context

---

## Phase 4: Data & Types

### 4.1 Replace Property Types
- Remove `src/types/property.ts`
- Create `src/types/product.ts` with Product interface (name, slug, price, rating, category, description, images, features, specs)

### 4.2 Database Updates
- Create a `products` table to replace properties (or repurpose the existing properties table)
- Fields: id, name, slug, price, description, short_description, category, images, features, specs, rating, review_count, in_stock, featured

### 4.3 Hooks
- Replace `useProperties.tsx` with `useProducts.tsx`
- Remove `useSavedProperties.tsx`, `useSearchAlerts.tsx`, `useShowcase.tsx`, `useDevelopments.tsx`

---

## Phase 5: Component Cleanup

### Files to Delete
- All property-specific components (`PropertyCard`, `PropertyFilters`, `PropertyGrid`, etc.)
- Map components (`PropertyMap`, `MapFilters`, `MapPropertyList`)
- Development components (`DevelopmentEnquiryForm`)
- Property matcher chat widget
- All property images in `public/properties/`
- Dales & Peaks specific assets

### Files to Create
- `src/components/products/ProductCard.tsx`
- `src/components/products/ProductGrid.tsx`
- `src/components/products/ProductFilters.tsx`
- `src/components/home/FeaturedProducts.tsx`
- `src/components/home/UseCasesSection.tsx`
- `src/components/home/FeaturesSection.tsx`
- `src/components/layout/TravioLogo.tsx`

---

## Technical Details

### Firecrawl Integration
A Firecrawl connector will be used to scrape detailed product pages from rewiresecurity.co.uk to extract:
- Product specifications and descriptions
- Pricing information
- Feature lists
- Image URLs (to be referenced or downloaded)

### App.tsx Route Changes
```text
Remove: /sales, /lettings, /map-search, /property/:slug, /valuation,
        /sell, /landlords, /tenants, /new-homes, /new-homes/:slug,
        /showcase, /showcase/:slug, /property-management, /areas, /areas/:slug

Add:    /products, /products/:slug, /fleet, /platform

Keep:   /, /about, /about/team, /contact, /blog, /privacy, /terms, /admin/*
```

### Estimated Scope
| Component | Count |
|-----------|-------|
| Files to modify | ~15-20 |
| Files to create | ~8-10 |
| Files to delete | ~15-20 |
| Database migrations | 1 (products table) |
| Edge functions | 1 (Firecrawl product scraper) |

