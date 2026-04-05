import { ReactNode } from "react";
import { motion, type Transition } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { useBreadcrumbJsonLd } from "@/lib/seo";

const SITE_URL = "https://traviogps.lovable.app";

function useCanonical() {
  const { pathname } = useLocation();
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }, [pathname]);
}

interface PageWrapperProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition: Transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.4,
};

export function PageWrapper({ children }: PageWrapperProps) {
  useCanonical();
  useBreadcrumbJsonLd();
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <motion.main
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
