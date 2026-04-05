"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SITE_URL = "https://traviogps.lovable.app";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

function setMeta(property: string, content: string, isProperty = false) {
  if (typeof document === "undefined") return;
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta(title: string, description: string, image?: string) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = title;
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
    const ogImage = image || DEFAULT_OG_IMAGE;

    // Standard meta
    setMeta("description", description);

    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "Travio GPS", true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }, [title, description, pathname, image]);
}

export function useJsonLd(data: Record<string, unknown>) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
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
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined") return;
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
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [pathname]);
}
