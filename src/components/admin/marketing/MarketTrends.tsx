// @ts-nocheck
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  AlertCircle, 
  Zap, 
  RefreshCw, 
  ArrowUpRight, 
  DollarSign, 
  Users, 
  BarChart3, 
  MapPin, 
  Lightbulb, 
  Plus, 
  ShieldCheck, 
  Truck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

export function MarketTrends() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTrend, setNewTrend] = useState({
    title: "",
    description: "",
    trend_type: "price_change",
    area: "",
    impact_level: "medium"
  });
  const queryClient = useQueryClient();

  // Fetch market trends from database
  const { data: trends, isLoading } = useQuery({
    queryKey: ['market-trends', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('market_trends')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(20);
      
      if (selectedCategory !== 'all') {
        query = query.eq('trend_type', selectedCategory);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch solutions (products) for stats
  const { data: products } = useQuery({
    queryKey: ['products-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('price, category, name')
        .order('price', { ascending: true });
      if (error) throw error;
      return data || [];
    }
  });

  // Add trend mutation
  const addTrend = useMutation({
    mutationFn: async (trend: typeof newTrend) => {
      const { error } = await supabase
        .from('market_trends')
        .insert([{
          ...trend,
          source: 'manual',
          is_actionable: true
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['market-trends'] });
      setIsAddOpen(false);
      setNewTrend({
        title: "",
        description: "",
        trend_type: "price_change",
        area: "",
        impact_level: "medium"
      });
      toast.success("Market trend recorded");
    },
    onError: () => {
      toast.error("Failed to add trend");
    }
  });

  // Calculate stats
  const avgPrice = products?.length 
    ? Math.round(products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length)
    : 0;
  
  const activeProducts = products?.length || 0;
  
  const categoryBreakdown = products?.reduce((acc: Record<string, { count: number, totalPrice: number }>, p) => {
    const cat = p.category || 'Uncategorized';
    if (!acc[cat]) {
      acc[cat] = { count: 0, totalPrice: 0 };
    }
    acc[cat].count++;
    acc[cat].totalPrice += p.price || 0;
    return acc;
  }, {}) || {};

  const categoryData = Object.entries(categoryBreakdown).map(([category, data]) => ({
    category,
    avgPrice: Math.round(data.totalPrice / data.count),
    count: data.count,
    growth: data.count > 5 ? "High" : data.count > 2 ? "Stable" : "Emerging"
  })).slice(0, 5);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-market-analyzer', {
        body: { 
          type: 'market_trend',
          data: { 
            categoryData, 
            avgPrice,
            activeProducts,
            recentTrends: trends?.slice(0, 5)
          },
          context: `Analyze current market trends for GPS tracking solutions, fleet management, and vehicle security. 
                    Average solution price: £${avgPrice.toLocaleString()}. 
                    Active products: ${activeProducts}.
                    Consider insurance requirement shifts, commercial interest in telematics, and new asset tracking technologies.`
        }
      });

      if (error) throw error;
      setAiInsights(data.analysis);
      toast.success("Market Analysis Complete", {
        description: "AI insights have been generated"
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-accent/20 rounded-xl group hover:scale-105 transition-transform">
            <TrendingUp className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground font-serif">Market Intelligence</h2>
            <p className="text-muted-foreground text-sm">Monitor tracking industry trends and AI-powered insights</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px] h-10 bg-secondary/30 border-border">
              <BarChart3 className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Trends</SelectItem>
              <SelectItem value="price_change">Price Changes</SelectItem>
              <SelectItem value="demand_shift">Demand Shifts</SelectItem>
              <SelectItem value="supply_change">Supply Changes</SelectItem>
              <SelectItem value="economic">Economic Factors</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-10">
                <Plus className="h-4 w-4 mr-2" />
                Add Trend
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-serif">Record Market Trend</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Title</Label>
                  <Input 
                    value={newTrend.title}
                    onChange={(e) => setNewTrend({ ...newTrend, title: e.target.value })}
                    placeholder="e.g., Increased demand for S5 Trackers"
                    className="bg-secondary/30 border-border h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Description</Label>
                  <Textarea 
                    value={newTrend.description}
                    onChange={(e) => setNewTrend({ ...newTrend, description: e.target.value })}
                    placeholder="Describe the market trend observation..."
                    className="bg-secondary/30 border-border resize-none"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Type</Label>
                    <Select 
                      value={newTrend.trend_type} 
                      onValueChange={(v) => setNewTrend({ ...newTrend, trend_type: v })}
                    >
                      <SelectTrigger className="bg-secondary/30 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="price_change">Price Change</SelectItem>
                        <SelectItem value="demand_shift">Demand Shift</SelectItem>
                        <SelectItem value="supply_change">Supply Change</SelectItem>
                        <SelectItem value="economic">Economic Factor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Impact Level</Label>
                    <Select 
                      value={newTrend.impact_level} 
                      onValueChange={(v) => setNewTrend({ ...newTrend, impact_level: v })}
                    >
                      <SelectTrigger className="bg-secondary/30 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Region/Market Segment</Label>
                  <Input 
                    value={newTrend.area}
                    onChange={(e) => setNewTrend({ ...newTrend, area: e.target.value })}
                    placeholder="e.g., UK Fleet Market"
                    className="bg-secondary/30 border-border h-10"
                  />
                </div>
                <Button 
                  onClick={() => addTrend.mutate(newTrend)}
                  disabled={!newTrend.title || addTrend.isPending}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-11"
                >
                  {addTrend.isPending ? "Saving..." : "Save Trend"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={handleRunAnalysis} 
            disabled={isAnalyzing}
            className="bg-accent hover:bg-accent/90 text-accent-foreground btn-premium min-w-[140px] h-10"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                AI Analysis
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <DollarSign className="h-8 w-8 text-accent/60" />
                <Badge className="bg-green-500/20 text-green-500 border-0 h-5 text-[10px] font-bold">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  REAL-TIME
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground font-serif">
                £{avgPrice > 0 ? avgPrice.toLocaleString() : '—'}
              </p>
              <p className="text-sm text-muted-foreground uppercase tracking-tight font-medium">Avg. Solution Price</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <ShieldCheck className="h-8 w-8 text-accent/60" />
                <Badge variant="outline" className="h-5 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Certified</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground font-serif">{activeProducts}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-tight font-medium">Managed Products</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Users className="h-8 w-8 text-accent/60" />
                <Badge variant="secondary" className="h-5 text-[10px] uppercase font-bold tracking-widest">Active</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground font-serif">{trends?.length || 0}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-tight font-medium">Market Observations</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Truck className="h-8 w-8 text-accent/60" />
                <Badge variant="outline" className="h-5 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Sectors</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground font-serif">{Object.keys(categoryBreakdown).length}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-tight font-medium">Key Verticals</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Category Breakdown */}
      {categoryData.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif">Vertical Performance</CardTitle>
            <CardDescription>Industry segments and solution pricing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {categoryData.map((cat, index) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-secondary/20 border border-border/50 hover:border-accent/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <MapPin className="h-4 w-4 text-accent transition-transform group-hover:scale-125" />
                    <Badge 
                      variant={cat.growth === "High" ? "default" : cat.growth === "Stable" ? "secondary" : "outline"}
                      className="text-[9px] uppercase font-bold px-1.5 h-4"
                    >
                      {cat.growth}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm truncate">{cat.category}</h4>
                  <p className="text-lg font-bold text-accent font-serif mt-0.5">
                    £{cat.avgPrice.toLocaleString()}
                  </p>
                  <div className="w-full bg-secondary/50 h-1 rounded-full mt-3 overflow-hidden">
                    <div className="bg-accent h-full w-[60%] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 font-medium uppercase">
                    {cat.count} Product{cat.count !== 1 ? 's' : ''}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trends */}
        <Card className="bg-card border-border">
          <CardHeader className="bg-secondary/30">
            <CardTitle className="font-serif text-lg font-serif">Latest Observations</CardTitle>
            <CardDescription>Market patterns recorded by the team</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <RefreshCw className="h-8 w-8 text-accent animate-spin mb-4" />
                <p className="text-sm text-muted-foreground">Loading observations...</p>
              </div>
            ) : trends?.length === 0 ? (
              <div className="text-center py-12 px-6">
                <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 font-serif text-lg">No Observations Yet</h3>
                <p className="text-muted-foreground text-xs max-w-[240px] mx-auto leading-relaxed">
                  Start tracking market signals by recording your first trend observation.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {trends.map((trend, index) => (
                  <motion.div
                    key={trend.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-sm bg-secondary/10 border border-border/50 hover:border-accent/20 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <h4 className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">{trend.title}</h4>
                          <Badge 
                            className={`text-[9px] uppercase font-bold px-1.5 h-4 border-0 ${
                              trend.impact_level === 'high' ? 'bg-destructive/10 text-destructive' : 
                              trend.impact_level === 'medium' ? 'bg-accent/10 text-accent' : 'bg-secondary text-muted-foreground'
                            }`}
                          >
                            {trend.impact_level}
                          </Badge>
                        </div>
                        {trend.description && (
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{trend.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                            {format(new Date(trend.recorded_at), "MMM d, yyyy")}
                          </span>
                          {trend.area && (
                            <span className="text-[10px] text-accent flex items-center gap-1 font-bold uppercase tracking-wider">
                              <MapPin className="h-2.5 w-2.5" />
                              {trend.area}
                            </span>
                          )}
                          <Badge variant="outline" className="text-[9px] px-1.5 h-4 rounded-none bg-background uppercase border-border/50 font-bold">
                            {trend.trend_type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Insights and Trends Visualization */}
        <div className="space-y-6">
          {aiInsights ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Zap className="h-24 w-24 text-accent" />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif font-serif text-lg">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    AI Intelligence Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 relative z-10">
                  {aiInsights.summary && (
                    <p className="text-sm text-foreground/90 leading-relaxed italic">{aiInsights.summary}</p>
                  )}
                  {aiInsights.keyInsights && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Strategic Matrix:</h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {aiInsights.keyInsights.map((insight: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-xs text-muted-foreground bg-background/40 p-3 rounded-sm border border-accent/10">
                            <ArrowUpRight className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {aiInsights.recommendations && (
                      <div className="space-y-2">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground flex items-center gap-1.5">
                          <Zap className="h-3 w-3 text-accent" />
                          Growth Vectors
                        </h4>
                        <ul className="space-y-1.5">
                          {aiInsights.recommendations.map((rec: string, i: number) => (
                            <li key={i} className="text-[10px] text-muted-foreground flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-accent" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {aiInsights.actionItems && (
                      <div className="space-y-2">
                         <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground flex items-center gap-1.5">
                          <AlertCircle className="h-3 w-3 text-accent" />
                          Priority Actions
                        </h4>
                        <ul className="space-y-1.5">
                          {aiInsights.actionItems.map((action: string, i: number) => (
                            <li key={i} className="text-[10px] text-muted-foreground flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-accent" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="bg-card border-border overflow-hidden">
               <CardHeader className="bg-secondary/30">
                <CardTitle className="font-serif text-lg font-serif">Market Summary</CardTitle>
                <CardDescription>Statistical overview of current tracking solutions</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={categoryData}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="category" hide />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '10px'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="avgPrice" 
                        stroke="hsl(var(--accent))" 
                        fillOpacity={1} 
                        fill="url(#colorVal)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto mb-4">
                    Run AI Analysis for deeper strategic insights based on this market data.
                  </p>
                  <Button onClick={handleRunAnalysis} disabled={isAnalyzing} variant="outline" size="sm" className="w-full text-[10px] uppercase tracking-[0.2em] font-bold h-10">
                    <Zap className="h-3 w-3 mr-2" />
                    Activate Intelligence
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

