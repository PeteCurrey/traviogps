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

// Placeholder pages for new routes
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Fleet from "./pages/Fleet";
import Platform from "./pages/Platform";

// Admin pages
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Properties from "./pages/admin/Properties";
import PropertyEdit from "./pages/admin/PropertyEdit";
import Leads from "./pages/admin/Leads";
import TeamMembers from "./pages/admin/TeamMembers";
import Testimonials from "./pages/admin/Testimonials";
import Settings from "./pages/admin/Settings";
import Marketing from "./pages/admin/Marketing";

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
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="properties" element={<Properties />} />
              <Route path="properties/:id" element={<PropertyEdit />} />
              <Route path="leads" element={<Leads />} />
              <Route path="team" element={<TeamMembers />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="settings" element={<Settings />} />
              <Route path="marketing" element={<Marketing />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
