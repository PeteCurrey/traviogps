"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, MessageSquare, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

interface RecentEnquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  lead_type: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [totalEnquiries, setTotalEnquiries] = useState(0);
  const [newEnquiries, setNewEnquiries] = useState(0);
  const [recentEnquiries, setRecentEnquiries] = useState<RecentEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { count: total } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true });

        const { count: newCount } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true })
          .eq("status", "new");

        setTotalEnquiries(total || 0);
        setNewEnquiries(newCount || 0);

        const { data: leads } = await supabase
          .from("leads")
          .select("id, first_name, last_name, email, lead_type, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        setRecentEnquiries((leads as RecentEnquiry[]) || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { label: "Total Products", value: products.length, icon: Package, color: "text-accent", bgColor: "bg-accent/10" },
    { label: "Total Enquiries", value: totalEnquiries, icon: MessageSquare, color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { label: "New Enquiries", value: newEnquiries, icon: Eye, color: "text-orange-500", bgColor: "bg-orange-500/10" },
    { label: "Total Orders", value: "—", icon: ShoppingCart, color: "text-green-500", bgColor: "bg-green-500/10" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl text-foreground font-serif">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's an overview of your store.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", stat.bgColor)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </div>
            <p className="font-serif text-3xl text-foreground mb-1 font-serif">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-sm"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-serif text-lg text-foreground font-serif">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-accent hover:text-accent/80 flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="p-4">
            {recentEnquiries.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">No enquiries yet</p>
            ) : (
              <ul className="space-y-3">
                {recentEnquiries.map((enquiry) => (
                  <li key={enquiry.id} className="flex items-center justify-between p-3 bg-secondary rounded-sm">
                    <div>
                      <p className="text-foreground font-medium">{enquiry.first_name} {enquiry.last_name}</p>
                      <p className="text-sm text-muted-foreground">{enquiry.email}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent capitalize">{enquiry.lead_type}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>

        {/* Orders placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-sm"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-serif text-lg text-foreground font-serif">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-accent hover:text-accent/80 flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="p-4">
            <div className="text-center py-8">
              <ShoppingCart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Order tracking coming soon</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
