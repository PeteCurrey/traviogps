
# Rebrand Admin Panel for Travio GPS

## Overview
Remove all property/real estate references from the admin panel and rebuild it around managing GPS tracker products, orders, and customer enquiries -- the core operations of a GPS tracking e-commerce business.

## What Gets Removed
- **Properties page** (`src/pages/admin/Properties.tsx`) -- no longer relevant
- **PropertyEdit page** (`src/pages/admin/PropertyEdit.tsx`) -- no longer relevant  
- **Sidebar links**: Properties, Showcase, Developments, Area Guides -- all real estate concepts
- **Dashboard**: Remove property stats and recent properties panel; replace with product and order stats
- **Settings**: Remove "Dales & Peaks" company name, email, and address defaults
- **Login page**: Update subtitle from "manage your properties and leads" to GPS-relevant copy
- **Leads page**: Remove valuation-specific fields (valuation address, postcode, property type, bedrooms) from the detail modal; update lead types to match GPS business (enquiry, quote, support, demo-request)

## What Gets Added

### 1. Products Management Page (`src/pages/admin/Products.tsx`)
- Read-only view of all products from `src/data/products.ts` (since products are currently stored in code, not the database)
- Table showing: Name, Category, Price, Stock Status, Rating
- Search and filter by category
- Note: This is a catalog viewer for now; future enhancement could move products to the database

### 2. Orders Page (`src/pages/admin/Orders.tsx`)
- Placeholder page showing recent orders (from Stripe integration or a future orders table)
- For now, displays a clean "coming soon" state with a link to view orders in the payment dashboard
- Stat cards for total orders, revenue, pending orders

### 3. Enquiries (Renamed from Leads)
- Keep the existing leads table and database integration
- Rename "Leads" to "Enquiries" in sidebar and page title
- Remove property-specific valuation fields from the detail modal
- Update lead type filters to: Enquiry, Quote Request, Support, Demo Request

### 4. Updated Dashboard (`src/pages/admin/Dashboard.tsx`)
- Replace property stats with: Total Products (from data file), Total Enquiries, New Enquiries, Total Orders (placeholder)
- Replace "Recent Properties" panel with "Recent Orders" (placeholder or Stripe-linked)
- Keep "Recent Enquiries" panel (renamed from leads)

### 5. Updated Sidebar Navigation
```
Dashboard
Products        (new - catalog viewer)
Orders          (new - placeholder/Stripe)
Enquiries       (renamed from Leads)
Marketing       (keep)
Content
  - Team Members (keep)
  - Testimonials (keep)
Settings        (keep, updated defaults)
```

Remove: Properties, Showcase, Developments, Area Guides

### 6. Updated Settings
- Change company default name from "Dales & Peaks" to "Travio GPS"
- Change default email to a generic placeholder
- Change default phone and address
- Update notification labels: remove "Valuation Requests", add "New Order Notifications"

### 7. Updated Login
- Change subtitle to "Sign in to manage your store and enquiries"

## Files to Create
- `src/pages/admin/Products.tsx` -- Product catalog viewer
- `src/pages/admin/Orders.tsx` -- Orders placeholder page

## Files to Modify
- `src/components/admin/AdminLayout.tsx` -- Update sidebar nav items
- `src/pages/admin/Dashboard.tsx` -- Replace property stats with product/order stats
- `src/pages/admin/Leads.tsx` -- Rename to Enquiries, remove valuation fields
- `src/pages/admin/Settings.tsx` -- Update company defaults
- `src/pages/admin/Login.tsx` -- Update subtitle text
- `src/App.tsx` -- Update admin routes (remove properties/property edit, add products and orders)

## Files to Remove (stop importing)
- `src/pages/admin/Properties.tsx` -- no longer imported or routed
- `src/pages/admin/PropertyEdit.tsx` -- no longer imported or routed

## Technical Notes
- Products are currently stored in `src/data/products.ts` as static data, so the Products admin page will import and display from there (read-only catalog viewer)
- The leads database table remains as-is since it stores enquiries -- just the UI labels change
- No database migrations needed for this change
- The existing Marketing, Team Members, and Testimonials pages are GPS-agnostic and can stay as-is
