import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// Store pages
import StoreFront from "./pages/StoreFront";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetail from "./pages/ProductDetail";
import CompareProducts from "./pages/CompareProducts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import Fleet from "./pages/Fleet";
import Platform from "./pages/Platform";

// Tracking application pages
import PlantMachinery from "./pages/tracking/PlantMachinery";
import ToolsEquipment from "./pages/tracking/ToolsEquipment";
import Motorbikes from "./pages/tracking/Motorbikes";
import Caravans from "./pages/tracking/Caravans";
import Trailers from "./pages/tracking/Trailers";
import Boats from "./pages/tracking/Boats";
import Supercars from "./pages/tracking/Supercars";
import ClassicCars from "./pages/tracking/ClassicCars";
import Vans from "./pages/tracking/Vans";
import Cars from "./pages/tracking/Cars";

// Platform sub-pages
import ReportsAnalytics from "./pages/platform/ReportsAnalytics";
import AlertsNotifications from "./pages/platform/AlertsNotifications";
import MobileApp from "./pages/platform/MobileApp";
import LiveMap from "./pages/platform/LiveMap";

// Fleet sub-pages
import Couriers from "./pages/fleet/Couriers";
import Construction from "./pages/fleet/Construction";
import Haulage from "./pages/fleet/Haulage";

// Admin pages
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Bookings from "./pages/admin/Bookings";
import Leads from "./pages/admin/Leads";
import TeamMembers from "./pages/admin/TeamMembers";
import Testimonials from "./pages/admin/Testimonials";
import Settings from "./pages/admin/Settings";
import Marketing from "./pages/admin/Marketing";
import UserManagement from "./pages/admin/UserManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ScrollProgress />
          
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            
            {/* Store routes */}
            <Route path="/products" element={<StoreFront />} />
            <Route path="/products/all" element={<CategoryProducts />} />
            <Route path="/products/category/:category" element={<CategoryProducts />} />
            <Route path="/products/compare" element={<CompareProducts />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancelled" element={<PaymentCancelled />} />
            
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Platform sub-routes */}
            <Route path="/platform/live-map" element={<LiveMap />} />
            <Route path="/platform/reports-analytics" element={<ReportsAnalytics />} />
            <Route path="/platform/alerts-notifications" element={<AlertsNotifications />} />
            <Route path="/platform/mobile-app" element={<MobileApp />} />

            {/* Tracking application routes */}
            <Route path="/tracking/plant-machinery" element={<PlantMachinery />} />
            <Route path="/tracking/tools-equipment" element={<ToolsEquipment />} />
            <Route path="/tracking/motorbikes" element={<Motorbikes />} />
            <Route path="/tracking/caravans" element={<Caravans />} />
            <Route path="/tracking/trailers" element={<Trailers />} />
            <Route path="/tracking/boats" element={<Boats />} />
            <Route path="/tracking/supercars" element={<Supercars />} />
            <Route path="/tracking/classic-cars" element={<ClassicCars />} />
            <Route path="/tracking/cars" element={<Cars />} />
            <Route path="/tracking/vans" element={<Vans />} />

            {/* Fleet sub-routes */}
            <Route path="/fleet/couriers" element={<Couriers />} />
            <Route path="/fleet/construction" element={<Construction />} />
            <Route path="/fleet/haulage" element={<Haulage />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<Orders />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="enquiries" element={<Leads />} />
              <Route path="team" element={<TeamMembers />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="settings" element={<Settings />} />
              <Route path="marketing" element={<Marketing />} />
              <Route path="users" element={<UserManagement />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
