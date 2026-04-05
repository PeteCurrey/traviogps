"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Search, 
  Users, 
  Mail, 
  Bell,
  TrendingUp,
  Zap,
  Lightbulb,
  ArrowRight
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketingOverview } from "@/components/admin/marketing/MarketingOverview";
import { SEODashboard } from "@/components/admin/marketing/SEODashboard";
import { CompetitorDashboard } from "@/components/admin/marketing/CompetitorDashboard";
import { ContentGenerator } from "@/components/admin/marketing/ContentGenerator";
import { EmailCampaigns } from "@/components/admin/marketing/EmailCampaigns";
import { NotificationCenter } from "@/components/admin/marketing/NotificationCenter";
import { MarketTrends } from "@/components/admin/marketing/MarketTrends";
import { Card, CardContent } from "@/components/ui/card";

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3, desc: "Aggregated Analytics" },
  { id: "seo", label: "SEO", icon: Search, desc: "Search Optimization" },
  { id: "competitors", label: "Competitors", icon: Users, desc: "Market Monitoring" },
  { id: "content", label: "AI Content", icon: Lightbulb, desc: "Smart Copywriter" },
  { id: "trends", label: "Market Trends", icon: TrendingUp, desc: "Industry Signals" },
  { id: "email", label: "Email", icon: Mail, desc: "Direct Marketing" },
  { id: "notifications", label: "Notifications", icon: Bell, desc: "Alert Hub" },
];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-3xl bg-secondary/30 border border-border/50 p-8 pt-10">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Zap className="h-32 w-32 text-accent animate-pulse" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-accent/20 rounded-xl shadow-lg border border-accent/20">
              <Zap className="h-7 w-7 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-0.5">Control Center</span>
              <h1 className="text-3xl font-extrabold text-foreground font-serif tracking-tight lg:text-4xl">Marketing Hub</h1>
            </div>
          </div>
          <p className="text-muted-foreground text-sm lg:text-base max-w-2xl leading-relaxed">
            Harnessing advanced AI to orchestrate SEO strategies, generate premium content, monitor market fluctuations, and execute high-impact email campaigns.
          </p>
        </motion.div>
      </div>

      {/* Modern Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="overflow-x-auto pb-2 scrollbar-hide">
            <TabsList className="bg-transparent h-auto p-0 flex items-center justify-start gap-1">
            {tabs.map((tab) => (
                <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="group flex flex-col items-start gap-1.5 px-6 py-4 rounded-xl border border-transparent data-[state=active]:bg-card data-[state=active]:border-border data-[state=active]:shadow-xl transition-all hover:bg-secondary/20"
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-accent text-accent-foreground' : 'bg-secondary group-hover:bg-accent/20 text-muted-foreground'}`}>
                            <tab.icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest transition-colors">
                            {tab.label}
                        </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium opacity-0 group-data-[state=active]:opacity-100 transition-all ml-10">
                        {tab.desc}
                    </span>
                </TabsTrigger>
            ))}
            </TabsList>
        </div>

        {/* Tab Contents with Framer Motion wrapper for smooth entry */}
        <div className="relative min-h-[600px]">
             <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
             >
                <TabsContent value="overview" className="mt-0 outline-none">
                    <MarketingOverview />
                </TabsContent>

                <TabsContent value="seo" className="mt-0 outline-none">
                    <SEODashboard />
                </TabsContent>

                <TabsContent value="competitors" className="mt-0 outline-none">
                    <CompetitorDashboard />
                </TabsContent>

                <TabsContent value="content" className="mt-0 outline-none">
                    <ContentGenerator />
                </TabsContent>

                <TabsContent value="trends" className="mt-0 outline-none">
                    <MarketTrends />
                </TabsContent>

                <TabsContent value="email" className="mt-0 outline-none">
                    <EmailCampaigns />
                </TabsContent>

                <TabsContent value="notifications" className="mt-0 outline-none">
                    <NotificationCenter />
                </TabsContent>
            </motion.div>
        </div>
      </Tabs>

      {/* Footer Info / Tip */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pt-8 border-t border-border/50"
      >
        <Card className="bg-accent/5 border-dashed border-accent/20 overflow-hidden group">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-full">
                        <Lightbulb className="h-4 w-4 text-accent" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium italic">
                        AI analysis is most effective when integrated across all channels. Try running an SEO analysis before generating content.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-accent group-hover:translate-x-1 transition-transform cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Learn More</span>
                    <ArrowRight className="h-3 w-3" />
                </div>
            </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
