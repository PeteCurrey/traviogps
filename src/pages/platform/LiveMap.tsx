import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import {
  MapPin, ArrowRight, Check, Layers, Search, Filter,
  Maximize2, Navigation, Eye, Clock, Globe, Zap,
  Users, Satellite, MousePointer, Crosshair,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import liveMapImg from "@/assets/platform/live-map.webp";
import { useEffect, useRef } from "react";
import L from "leaflet";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const mapFeatures = [
  { icon: Crosshair, title: "10-Second Updates", desc: "Vehicle positions refresh every 10 seconds, giving you near real-time visibility across your entire fleet." },
  { icon: MousePointer, title: "Click for Details", desc: "Tap any vehicle marker to see live speed, heading, driver name, ignition status, and last-known street address." },
  { icon: Layers, title: "Custom Map Layers", desc: "Switch between road, satellite, and hybrid views. Overlay geo-zones, points of interest, and depot locations." },
  { icon: Filter, title: "Smart Filtering", desc: "Filter by vehicle group, status (driving, idle, stopped), driver, or custom tags. Find any asset instantly." },
  { icon: Users, title: "Vehicle Clustering", desc: "Manage large fleets with automatic marker clustering. Zoom in to see individual vehicles, zoom out for fleet overview." },
  { icon: Search, title: "Address Lookup", desc: "Every position includes a street-level reverse-geocoded address — no coordinates to decipher." },
];

const advancedCapabilities = [
  { icon: Globe, title: "185-Country Coverage", desc: "Track vehicles anywhere in the world with automatic roaming across global cellular networks." },
  { icon: Satellite, title: "Satellite View", desc: "Switch to satellite imagery to see exactly where vehicles are parked — useful for construction and rural sites." },
  { icon: Navigation, title: "Street View Integration", desc: "Drop into street view to verify a vehicle's surroundings. Confirm delivery locations and parking positions." },
  { icon: Eye, title: "Live Traffic Overlay", desc: "See real-time traffic conditions on the map. Understand delays and plan alternative routes for your drivers." },
  { icon: Clock, title: "Historical Playback", desc: "Replay any vehicle's journey on the map with animated playback. See exact routes, stops, and timestamps." },
  { icon: Maximize2, title: "Full-Screen Mode", desc: "Expand the map to full screen for control-room displays. Perfect for dispatch centres and operations teams." },
];

const useCases = [
  { title: "Fleet Dispatching", desc: "See which vehicle is closest to a job and dispatch efficiently. Reduce response times and fuel costs.", icon: Zap },
  { title: "Theft Recovery", desc: "Locate a stolen vehicle in seconds. Share the live position with police for rapid recovery.", icon: Crosshair },
  { title: "Customer ETAs", desc: "Share a live map link with customers so they can see their delivery approaching in real time.", icon: Navigation },
  { title: "Operations Oversight", desc: "Monitor your entire fleet from a single screen. Spot issues before they become problems.", icon: Eye },
];

const sampleVehicles = [
  { lat: 51.5074, lng: -0.1278, name: "Van 01 – London HQ", speed: "34 mph", status: "Driving", driver: "James Wilson" },
  { lat: 51.4545, lng: -2.5879, name: "Van 07 – Bristol Depot", speed: "0 mph", status: "Stopped", driver: "Sarah Chen" },
  { lat: 53.4808, lng: -2.2426, name: "HGV 12 – Manchester", speed: "56 mph", status: "Driving", driver: "Tom Baker" },
  { lat: 52.4862, lng: -1.8904, name: "Van 03 – Birmingham", speed: "12 mph", status: "Idle", driver: "Priya Patel" },
  { lat: 51.4816, lng: -3.1791, name: "Van 19 – Cardiff", speed: "41 mph", status: "Driving", driver: "Owen Davies" },
  { lat: 55.9533, lng: -3.1883, name: "HGV 05 – Edinburgh", speed: "0 mph", status: "Stopped", driver: "Liam Scott" },
  { lat: 53.8008, lng: -1.5491, name: "Van 11 – Leeds", speed: "28 mph", status: "Driving", driver: "Amy Rhodes" },
  { lat: 50.3755, lng: -4.1427, name: "Van 22 – Plymouth", speed: "0 mph", status: "Idle", driver: "Dan Morris" },
];

const geoFenceZones = [
  { center: [51.5074, -0.1278] as [number, number], radius: 25000, name: "London Delivery Zone", color: "#3b82f6" },
  { center: [53.4808, -2.2426] as [number, number], radius: 20000, name: "Manchester Delivery Zone", color: "#8b5cf6" },
  { center: [52.4862, -1.8904] as [number, number], radius: 18000, name: "Birmingham Depot Zone", color: "#f59e0b" },
  { center: [55.9533, -3.1883] as [number, number], radius: 15000, name: "Edinburgh Service Area", color: "#10b981" },
  { center: [51.4545, -2.5879] as [number, number], radius: 12000, name: "Bristol Depot Zone", color: "#ef4444" },
];

const statusColor: Record<string, string> = {
  Driving: "#22c55e",
  Idle: "#f59e0b",
  Stopped: "#ef4444",
};

function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const positionsRef = useRef(sampleVehicles.map((v) => ({ lat: v.lat, lng: v.lng })));
  const speedsRef = useRef(sampleVehicles.map((v) => parseInt(v.speed)));

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: true }).setView([53.0, -1.5], 6);
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const createIcon = (color: string) =>
      L.divIcon({
        className: "",
        html: `<div style="width:32px;height:32px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;transition:transform 0.3s ease">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

    const updatePopup = (v: typeof sampleVehicles[0], speed: number, status: string) => {
      const color = statusColor[status] || "#6b7280";
      return `<div style="font-family:system-ui;min-width:180px">
        <strong style="font-size:13px">${v.name}</strong>
        <hr style="margin:6px 0;border-color:#e5e7eb"/>
        <div style="font-size:12px;line-height:1.8">
          <div><span style="color:#6b7280">Driver:</span> ${v.driver}</div>
          <div><span style="color:#6b7280">Speed:</span> ${speed} mph</div>
          <div><span style="color:#6b7280">Status:</span> <span style="color:${color};font-weight:600">${status}</span></div>
        </div>
      </div>`;
    };

    sampleVehicles.forEach((v, i) => {
      const color = statusColor[v.status] || "#6b7280";
      const marker = L.marker([v.lat, v.lng], { icon: createIcon(color) })
        .addTo(map)
        .bindPopup(updatePopup(v, parseInt(v.speed), v.status));
      markersRef.current.push(marker);
    });

    // Add geo-fence zone overlays
    geoFenceZones.forEach((zone) => {
      L.circle(zone.center, {
        radius: zone.radius,
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.08,
        weight: 2,
        dashArray: "8 4",
      })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:system-ui">
            <strong style="font-size:13px">${zone.name}</strong>
            <hr style="margin:6px 0;border-color:#e5e7eb"/>
            <div style="font-size:12px;line-height:1.8">
              <div><span style="color:#6b7280">Radius:</span> ${(zone.radius / 1000).toFixed(0)} km</div>
              <div><span style="color:#6b7280">Status:</span> <span style="color:${zone.color};font-weight:600">Active</span></div>
            </div>
          </div>`
        );
    });

    // Animate driving vehicles every 3 seconds
    const interval = setInterval(() => {
      sampleVehicles.forEach((v, i) => {
        if (v.status === "Stopped") return;

        const isDriving = v.status === "Driving";
        // Random drift simulating movement
        const dLat = (Math.random() - 0.5) * (isDriving ? 0.012 : 0.002);
        const dLng = (Math.random() - 0.5) * (isDriving ? 0.018 : 0.003);
        positionsRef.current[i].lat += dLat;
        positionsRef.current[i].lng += dLng;

        // Fluctuate speed
        const baseSpeed = parseInt(v.speed);
        const jitter = isDriving ? Math.round((Math.random() - 0.4) * 12) : Math.round(Math.random() * 5);
        speedsRef.current[i] = Math.max(0, baseSpeed + jitter);

        const currentSpeed = speedsRef.current[i];
        const currentStatus = currentSpeed === 0 ? "Idle" : v.status;
        const color = statusColor[currentStatus] || "#6b7280";

        const marker = markersRef.current[i];
        if (marker) {
          marker.setLatLng([positionsRef.current[i].lat, positionsRef.current[i].lng]);
          marker.setIcon(createIcon(color));
          marker.setPopupContent(updatePopup(v, currentSpeed, currentStatus));
        }
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      map.remove();
      mapInstance.current = null;
      markersRef.current = [];
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}

const LiveMap = () => (
  <PageWrapper>
    {/* Hero */}
    <section className="relative pt-32 lg:pt-40 pb-20 bg-background overflow-hidden">
      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Live Map</p>
            <h1 className="text-display-3 md:text-display-2 text-foreground mb-4">
              Real-Time Fleet <span className="italic-accent">Visibility</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              See every vehicle and asset on one interactive map with 10-second GPS updates. Click any marker for live speed, driver, heading, and street-level address. Filter, cluster, and zoom for instant fleet oversight.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact">Request a Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border hover:bg-secondary">
                <Link to="/platform">Back to Platform</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-8">
              {[
                { value: 10, suffix: "s", label: "Update Interval" },
                { value: 185, suffix: "", label: "Countries" },
                { value: 99.9, suffix: "%", label: "Uptime" },
              ].map((stat, i) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold text-accent">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={i * 0.2} />
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="rounded-sm overflow-hidden border border-border shadow-elevated">
              <img src={liveMapImg} alt="GPSLive real-time fleet map interface" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-sm p-3 shadow-elevated hidden lg:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Live Positions</p>
                <p className="text-[10px] text-muted-foreground">Updated every 10s</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Interactive Map Demo */}
    <section className="section-padding bg-background">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Interactive Demo</p>
          <h2 className="text-display-3 md:text-display-2 text-foreground mb-4">
            Explore the <span className="italic-accent">Live Map</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click any vehicle marker below to see live details. This demo shows 8 sample vehicles across the UK.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-sm overflow-hidden border border-border shadow-elevated" style={{ height: 520 }}>
          <InteractiveMap />
        </motion.div>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {Object.entries(statusColor).map(([status, color]) => (
            <div key={status} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-3 h-3 rounded-full" style={{ background: color }} />
              {status}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Map Features */}
    <section className="section-padding bg-card">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Map Features</p>
          <h2 className="text-display-3 md:text-display-2 text-foreground mb-4">
            More Than Just <span className="italic-accent">Dots</span> on a Map
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            GPSLive's map is a fully interactive fleet command centre — not just a simple locator. Every marker is packed with live data and actionable insights.
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {mapFeatures.map((f) => (
            <motion.div key={f.title} variants={itemVariants} className="p-8 bg-background rounded-sm border border-border hover:border-accent/30 transition-colors group">
              <f.icon className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Use Cases */}
    <section className="section-padding bg-background">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Use Cases</p>
          <h2 className="text-display-3 text-foreground mb-4">
            How Teams Use the <span className="italic-accent">Live Map</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {useCases.map((uc, i) => (
            <motion.div key={uc.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-6 bg-card rounded-sm border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <uc.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{uc.title}</h3>
                <p className="text-sm text-muted-foreground">{uc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Advanced Capabilities */}
    <section className="section-padding bg-card">
      <div className="container-premium">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Advanced Capabilities</p>
          <h2 className="text-display-3 text-foreground">
            Enterprise-Grade <span className="italic-accent">Mapping</span>
          </h2>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {advancedCapabilities.map((cap) => (
            <motion.div key={cap.title} variants={itemVariants} className="flex items-start gap-4 p-6 bg-background rounded-sm border border-border">
              <cap.icon className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{cap.title}</h3>
                <p className="text-sm text-muted-foreground">{cap.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-background">
      <div className="container-premium text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-display-3 md:text-display-2 text-foreground mb-4">
            See Your Fleet <span className="italic-accent">Live</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Book a demo and we'll show you the live map in action with your own vehicles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/contact">Book a Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/products">View Trackers</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </PageWrapper>
);

export default LiveMap;
