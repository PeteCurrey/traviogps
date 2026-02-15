import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://traviogps.lovable.app";

export function usePageMeta(title: string, description: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    // Meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    // Canonical URL
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }, [title, description, pathname]);
}

export function useJsonLd(data: Record<string, unknown>) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
}

const BREADCRUMB_LABELS: Record<string, string> = {
  about: "About",
  team: "Team",
  contact: "Contact",
  blog: "Blog",
  products: "Products",
  compare: "Compare",
  all: "All Products",
  platform: "Platform",
  "live-map": "Live Map",
  "reports-analytics": "Reports & Analytics",
  "alerts-notifications": "Alerts & Notifications",
  "mobile-app": "Mobile App",
  fleet: "Fleet",
  couriers: "Couriers",
  construction: "Construction",
  haulage: "Haulage",
  tracking: "Tracking",
  cars: "Cars",
  vans: "Vans",
  supercars: "Supercars",
  "classic-cars": "Classic Cars",
  motorbikes: "Motorbikes",
  boats: "Boats",
  caravans: "Caravans",
  trailers: "Trailers",
  "plant-machinery": "Plant Machinery",
  "tools-equipment": "Tools & Equipment",
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  cart: "Cart",
  checkout: "Checkout",
};

export function useBreadcrumbJsonLd() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") return;

    const segments = pathname.split("/").filter(Boolean);
    const items = [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...segments.map((seg, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: BREADCRUMB_LABELS[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        item: `${SITE_URL}/${segments.slice(0, i + 1).join("/")}`,
      })),
    ];

    const data = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-breadcrumb", "true");
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [pathname]);
}
