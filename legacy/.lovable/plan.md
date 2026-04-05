

## Plan: New Hero Images + Cars Page + Navigation Update

### 1. Generate Premium Hero Images for All Application Pages

Generate new, high-quality hero images for each tracking/fleet page using photorealistic, industry-specific imagery showing GPS tracking hardware and real-time mapping interfaces (per style guidelines). Each image will be saved to its existing path.

Pages receiving new hero images:
- **Plant & Machinery** -- excavator on construction site with GPS tracking overlay
- **Motorbikes** -- motorcycle with discreet tracker hardware close-up
- **Caravans** -- touring caravan with GPS device and map dashboard
- **Trailers** -- commercial trailer with magnetic GPS tracker attached
- **Boats** -- yacht/boat with marine GPS tracking equipment
- **Vans** -- commercial van fleet with tracking dashboard overlay
- **Tools & Equipment** -- power tools with compact GPS tracker
- **Classic Cars** -- vintage car in garage with hidden tracker
- **Supercars** -- prestige vehicle with Thatcham-approved tracker
- **Couriers** -- delivery van fleet with route map overlay
- **Construction** -- construction site vehicles with multi-site dashboard
- **Haulage** -- HGV truck with fleet management dashboard

### 2. Create New "Car Tracker" Page

Create `src/pages/tracking/Cars.tsx` using the `TrackingApplicationPage` template, focused on **everyday car tracking** (theft recovery, insurance savings, family safety). This fills the gap where "Vehicle Trackers" in the nav currently points to `/products`.

Content outline:
- **Title**: "Car GPS Tracking"
- **Subtitle**: "Vehicle Security & Recovery"
- **Description**: Focused on theft prevention, insurance discounts, and family vehicle monitoring
- **Key stats**: Insurance savings, recovery rate, update frequency, monitoring
- **Benefits**: Theft recovery, insurance discounts, family safety
- **Features**: Live tracking, tamper alerts, journey history, geo-fencing, battery backup, mobile app

Generate a hero image: `src/assets/tracking/cars-hero.webp`

### 3. Update Supercars Page

Review and refresh the existing Supercars page content to better differentiate it from the new Cars page -- emphasising Thatcham S5/S7 certification, 24/7 monitoring centre, and prestige vehicle specialisation. The existing page content is already well-differentiated, so only minor tweaks if needed.

### 4. Update Navigation

Update `src/components/layout/Navigation.tsx`:

**Before:**
```
{ label: "Vehicle Trackers", href: "/products" },
```

**After:**
```
{ label: "Car Trackers", href: "/tracking/cars" },
```

This points "Car Trackers" to the new dedicated page instead of the generic store.

### 5. Add Route

Add the new route to `src/App.tsx`:
```
<Route path="/tracking/cars" element={<Cars />} />
```

### Technical Summary

| Task | Files |
|------|-------|
| Generate 13 hero images | `src/assets/tracking/*.webp`, `src/assets/fleet/*.webp` |
| New Cars page | `src/pages/tracking/Cars.tsx` |
| New Cars hero image | `src/assets/tracking/cars-hero.webp` |
| Navigation update | `src/components/layout/Navigation.tsx` |
| Route registration | `src/App.tsx` |

