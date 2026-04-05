"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { TrendingDown, Fuel, Clock, Shield } from "lucide-react";

export function ROICalculator() {
  const [vehicles, setVehicles] = useState(10);
  const [avgMileage, setAvgMileage] = useState(25000);
  const [fuelCostPerLitre, setFuelCostPerLitre] = useState(1.45);

  const savings = useMemo(() => {
    const fuelSaving = vehicles * avgMileage * 0.15 * (fuelCostPerLitre / 7); // 15% fuel reduction
    const labourSaving = vehicles * 48 * 30; // 30 min saved/week per vehicle at avg rate
    const insuranceSaving = vehicles * 120; // avg annual insurance discount per vehicle
    const theftPrevention = vehicles * 0.02 * 15000; // 2% theft risk * avg vehicle value

    return {
      fuel: Math.round(fuelSaving),
      labour: Math.round(labourSaving),
      insurance: Math.round(insuranceSaving),
      theft: Math.round(theftPrevention),
      total: Math.round(fuelSaving + labourSaving + insuranceSaving + theftPrevention),
      monthlyCost: vehicles * 9.99,
      roi: Math.round(
        ((fuelSaving + labourSaving + insuranceSaving + theftPrevention - vehicles * 9.99 * 12) /
          (vehicles * 9.99 * 12)) *
          100
      ),
    };
  }, [vehicles, avgMileage, fuelCostPerLitre]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(val);

  const breakdowns = [
    { icon: Fuel, label: "Fuel savings", value: savings.fuel, color: "text-emerald-400" },
    { icon: Clock, label: "Labour efficiency", value: savings.labour, color: "text-sky-400" },
    { icon: Shield, label: "Insurance discounts", value: savings.insurance, color: "text-amber-400" },
    { icon: TrendingDown, label: "Theft prevention", value: savings.theft, color: "text-rose-400" },
  ];

  return (
    <section className="section-padding bg-card">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">
            ROI Calculator
          </p>
          <h2 className="font-serif text-display-3 md:text-display-2 text-foreground">
            Calculate Your <span className="italic-accent">Savings</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            See how much your business could save with GPS fleet tracking.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto"
        >
          {/* Sliders */}
          <div className="space-y-8 p-8 bg-background rounded-sm border border-border">
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm font-medium text-foreground">Fleet size</label>
                <span className="text-sm font-semibold text-accent">{vehicles} vehicles</span>
              </div>
              <Slider
                value={[vehicles]}
                onValueChange={([v]) => setVehicles(v)}
                min={1}
                max={200}
                step={1}
              />
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm font-medium text-foreground">
                  Avg. annual mileage per vehicle
                </label>
                <span className="text-sm font-semibold text-accent">
                  {avgMileage.toLocaleString()} mi
                </span>
              </div>
              <Slider
                value={[avgMileage]}
                onValueChange={([v]) => setAvgMileage(v)}
                min={5000}
                max={100000}
                step={1000}
              />
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm font-medium text-foreground">Fuel cost per litre</label>
                <span className="text-sm font-semibold text-accent">
                  £{fuelCostPerLitre.toFixed(2)}
                </span>
              </div>
              <Slider
                value={[fuelCostPerLitre * 100]}
                onValueChange={([v]) => setFuelCostPerLitre(v / 100)}
                min={100}
                max={250}
                step={1}
              />
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tracking cost</span>
                <span>{formatCurrency(savings.monthlyCost)}/month</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Total */}
            <div className="p-8 bg-background rounded-sm border border-accent/30 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Estimated annual savings
              </p>
              <p className="font-serif text-5xl md:text-6xl text-accent">
                {formatCurrency(savings.total)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {savings.roi}% return on investment
              </p>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              {breakdowns.map((item) => (
                <div
                  key={item.label}
                  className="p-4 bg-background rounded-sm border border-border"
                >
                  <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
                  <p className="font-serif text-xl text-foreground">
                    {formatCurrency(item.value)}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
