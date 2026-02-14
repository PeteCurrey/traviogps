
# Expanding Travio: Application Pages, Niche Markets & Fleet Solutions

## Overview

This plan adds dedicated landing pages for each GPS tracker application (plant, tools, motorbikes, caravans, trailers, boats, etc.), creates niche vehicle tracking pages (supercars, classic cars, motorhomes), expands the fleet management offerings, and updates the homepage to showcase all these verticals. Each page follows the existing premium dark aesthetic with framer-motion animations.

---

## New Page Structure

```text
/tracking/plant-machinery       Plant & Machinery Trackers
/tracking/tools-equipment       Tool & Equipment Trackers
/tracking/motorbikes            Motorbike Trackers
/tracking/caravans              Caravan & Motorhome Trackers
/tracking/trailers              Trailer Trackers
/tracking/boats                 Boat & Marine Trackers
/tracking/supercars             Supercar Trackers
/tracking/classic-cars          Classic Car Trackers
/tracking/vans                  Van Trackers
/fleet/couriers                 Courier & Delivery Fleet
/fleet/construction             Construction Fleet
/fleet/haulage                  Haulage & HGV Fleet
```

---

## Phase 1: Homepage Enhancements

### 1.1 New "Industries" Section (ApplicationsGrid)
A new homepage section placed after UseCasesSection showing a visual grid of all application categories. Each tile links to its dedicated page.

Categories displayed:
- Cars & Vans
- Motorbikes
- Plant & Machinery
- Tools & Equipment
- Caravans & Motorhomes
- Trailers
- Boats & Marine
- Supercars & Prestige

Design: 4-column grid on desktop (2 on mobile), each card with an icon, title, short tagline, and "Learn more" link. Same animation pattern as existing UseCasesSection.

### 1.2 New "Fleet Industries" Section
A compact section after the Applications grid highlighting fleet verticals:
- Courier & Delivery
- Construction & Plant
- Haulage & HGV
- Cold Chain & Pharma

Design: Horizontal scrolling cards on mobile, 4-column grid on desktop.

### 1.3 Update UseCasesSection
Expand the existing 4 tiles to better represent the breadth. Update links to point to the new `/tracking/*` pages instead of generic `/products`.

---

## Phase 2: Application Landing Pages

Each page follows a consistent template structure:

1. **Hero** - Category title, tagline, key stat, CTA button
2. **Why Track [Category]** - 3 benefit cards (theft recovery, insurance savings, peace of mind, etc.)
3. **Recommended Products** - 2-3 product cards relevant to the application
4. **Features** - 6 feature tiles specific to that use case
5. **CTA** - "Get a Quote" / "Request Demo"

### Pages to Create:

| Page | Route | Hero Title | Key Angle |
|------|-------|------------|-----------|
| Plant & Machinery | `/tracking/plant-machinery` | Protect Your Plant & Machinery | Theft prevention on construction sites, battery-powered trackers |
| Tools & Equipment | `/tracking/tools-equipment` | Never Lose a Tool Again | Small, concealable trackers for power tools and equipment |
| Motorbikes | `/tracking/motorbikes` | Motorbike GPS Tracking | Compact, weatherproof, theft alerts, insurance discounts |
| Caravans | `/tracking/caravans` | Caravan & Motorhome Tracking | Seasonal use, long battery, holiday peace of mind |
| Trailers | `/tracking/trailers` | Trailer GPS Tracking | 5-year battery, magnetic mount, haulage and logistics |
| Boats | `/tracking/boats` | Boat & Marine Tracking | Waterproof, marina alerts, coastal coverage |
| Supercars | `/tracking/supercars` | Supercar & Prestige Tracking | Thatcham S5/S7 approved, 24/7 monitoring centre, stolen vehicle recovery |
| Classic Cars | `/tracking/classic-cars` | Classic Car GPS Tracking | Discreet install, no OBD required, battery backup |
| Vans | `/tracking/vans` | Van Tracker Solutions | Fleet of vans, tool theft prevention, driver monitoring |

### Shared Template Component
Create a reusable `TrackingApplicationPage` component that accepts:
- title, subtitle, description
- key stats
- benefits array
- features array
- recommended product slugs
- CTA text and link

This avoids duplicating layout code across 9+ pages.

---

## Phase 3: Expanded Fleet Pages

### 3.1 Fleet Hub Page (update existing `/fleet`)
Expand the current Fleet page to be a hub with:
- Hero section with fleet management overview
- Industry cards linking to sub-pages (Couriers, Construction, Haulage)
- Feature grid (existing 6 features)
- ROI calculator section (static, showing typical savings)
- CTA to request demo

### 3.2 Fleet Sub-Pages

| Page | Route | Focus |
|------|-------|-------|
| Courier Fleet | `/fleet/couriers` | Proof of delivery, route replay, driver performance, ETA tracking |
| Construction Fleet | `/fleet/construction` | Plant tracking, site geo-fences, utilisation reports, theft alerts |
| Haulage Fleet | `/fleet/haulage` | Tachograph integration, HGV tracking, temperature monitoring, compliance |

Each sub-page uses a similar template with industry-specific content, features, and product recommendations.

---

## Phase 4: Navigation Updates

### Desktop Navigation
Update the GPS Trackers dropdown:
```text
GPS Trackers
  Vehicle Trackers       -> /products
  Motorbike Trackers     -> /tracking/motorbikes
  Plant & Machinery      -> /tracking/plant-machinery
  Caravan Trackers       -> /tracking/caravans
  Asset Trackers         -> /tracking/trailers
  All Applications       -> /products

Fleet Solutions
  Fleet Overview         -> /fleet
  Courier Fleets         -> /fleet/couriers
  Construction Fleets    -> /fleet/construction
  Haulage & HGV          -> /fleet/haulage
```

### Mobile Navigation
Same structure with collapsible sub-menus.

---

## Phase 5: Routing (App.tsx)

Add all new routes:
```text
/tracking/plant-machinery
/tracking/tools-equipment
/tracking/motorbikes
/tracking/caravans
/tracking/trailers
/tracking/boats
/tracking/supercars
/tracking/classic-cars
/tracking/vans
/fleet/couriers
/fleet/construction
/fleet/haulage
```

---

## Files Summary

| Action | File | Purpose |
|--------|------|---------|
| Create | `src/components/tracking/TrackingApplicationPage.tsx` | Reusable template for all application pages |
| Create | `src/pages/tracking/PlantMachinery.tsx` | Plant tracking page |
| Create | `src/pages/tracking/ToolsEquipment.tsx` | Tools tracking page |
| Create | `src/pages/tracking/Motorbikes.tsx` | Motorbike tracking page |
| Create | `src/pages/tracking/Caravans.tsx` | Caravan tracking page |
| Create | `src/pages/tracking/Trailers.tsx` | Trailer tracking page |
| Create | `src/pages/tracking/Boats.tsx` | Boat tracking page |
| Create | `src/pages/tracking/Supercars.tsx` | Supercar tracking page |
| Create | `src/pages/tracking/ClassicCars.tsx` | Classic car tracking page |
| Create | `src/pages/tracking/Vans.tsx` | Van tracking page |
| Create | `src/pages/fleet/Couriers.tsx` | Courier fleet page |
| Create | `src/pages/fleet/Construction.tsx` | Construction fleet page |
| Create | `src/pages/fleet/Haulage.tsx` | Haulage fleet page |
| Create | `src/components/home/ApplicationsGrid.tsx` | Homepage applications grid section |
| Create | `src/components/home/FleetIndustriesSection.tsx` | Homepage fleet industries section |
| Modify | `src/pages/Index.tsx` | Add new homepage sections |
| Modify | `src/components/home/UseCasesSection.tsx` | Update links to new pages |
| Modify | `src/pages/Fleet.tsx` | Expand to fleet hub with sub-page links |
| Modify | `src/components/layout/Navigation.tsx` | Updated nav dropdowns |
| Modify | `src/App.tsx` | Add all new routes |

**Total: ~18 new files, ~5 modified files**
