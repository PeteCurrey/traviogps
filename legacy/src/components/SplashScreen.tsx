import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showText, setShowText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 1200);
    const exitTimer = setTimeout(() => setIsExiting(true), 3200);
    const completeTimer = setTimeout(() => onComplete(), 4200);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const logoColor = "hsl(var(--accent))";

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <MapPin className="h-10 w-10 md:h-12 md:w-12 text-accent" />
              </motion.div>

              <motion.span
                className="ml-3 font-sans text-2xl md:text-3xl tracking-[0.1em] text-primary font-bold uppercase"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showText ? 1 : 0, x: showText ? 0 : 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Travio
              </motion.span>
            </div>

            <motion.div
              className="absolute pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2.5, delay: 1, ease: "easeInOut" }}
              style={{
                width: "200px",
                height: "100px",
                background: `radial-gradient(ellipse at center, hsl(var(--accent) / 0.3) 0%, transparent 70%)`,
                filter: "blur(25px)",
              }}
            />

            <motion.div
              className="h-px bg-accent"
              initial={{ width: 0 }}
              animate={{ width: showText ? 140 : 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />

            <motion.p
              className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: showText ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Smart GPS Tracking
            </motion.p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="splash-exit"
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-10">
              <MapPin className="h-10 w-10 md:h-12 md:w-12 text-accent" />
              <span className="ml-3 font-sans text-2xl md:text-3xl tracking-[0.1em] text-primary font-bold uppercase">
                Travio
              </span>
            </div>
            <div className="h-px bg-accent w-[140px]" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-5">
              Smart GPS Tracking
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
