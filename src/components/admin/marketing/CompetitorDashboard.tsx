"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Plus, 
  ExternalLink, 
  Eye,
  RefreshCw,
  MoreVertical,
  Trash2,
  Edit2,
  Zap,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";

export function CompetitorDashboard() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState({ name: "", website_url: "" });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const queryClient = useQueryClient();

  const { data: competitors, isLoading } = useQuery({
    queryKey: ['competitors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('competitors')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
  });

  const { data: recentLogs } = useQuery({
    queryKey: ['competitor-logs-recent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('competitor_logs')
        .select('*, competitors(name)')
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data || [];
    }
  });

  const addCompetitor = useMutation({
    mutationFn: async (competitor: { name: string; website_url: string }) => {
      const { error } = await supabase
        .from('competitors')
        .insert([competitor]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitors'] });
      setIsAddOpen(false);
      setNewCompetitor({ name: "", website_url: "" });
      toast.success("Competitor added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add competitor");
      console.error(error);
    }
  });

  const deleteCompetitor = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('competitors')
        .update({ is_active: false })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitors'] });
      toast.success("Competitor removed");
    }
  });

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-market-analyzer', {
        body: { 
          type: 'competitor_analysis',
          data: competitors,
          context: 'Analyze competition in the GPS tracking and fleet management market. Focus on premium providers and local installation services.'
        }
      });

      if (error) throw error;
      toast.success("Competitor Analysis Complete", {
        description: "AI insights have been generated"
      });
      console.log("Competitor Analysis:", data);
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
        <div>
          <h2 className="text-xl font-semibold text-foreground font-serif">Competitor Monitoring</h2>
          <p className="text-muted-foreground text-sm">Track and analyze competitor activities</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            onClick={handleRunAnalysis} 
            disabled={isAnalyzing}
            variant="outline"
            className="flex-1 sm:flex-none h-10"
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
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground btn-premium flex-1 sm:flex-none h-10">
                <Plus className="h-4 w-4 mr-2" />
                Add Competitor
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-serif">Add Competitor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Company Name</Label>
                  <Input 
                    value={newCompetitor.name}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                    placeholder="e.g., Competitor Tracker Co"
                    className="bg-secondary border-border h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Website URL</Label>
                  <Input 
                    value={newCompetitor.website_url}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, website_url: e.target.value })}
                    placeholder="https://competitor.com"
                    className="bg-secondary border-border h-10"
                  />
                </div>
                <Button 
                  onClick={() => addCompetitor.mutate(newCompetitor)}
                  disabled={!newCompetitor.name || addCompetitor.isPending}
                  className="w-full h-11 bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
                >
                  {addCompetitor.isPending ? "Adding..." : "Add Competitor"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competitors List */}
        <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center text-muted-foreground">
                <RefreshCw className="h-8 w-8 mx-auto animate-spin mb-4 text-accent" />
                Loading competitors...
              </CardContent>
            </Card>
          ) : competitors?.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 font-serif text-lg">No Competitors Added</h3>
                <p className="text-muted-foreground mb-6 max-w-[280px] mx-auto text-sm">
                  Start monitoring your competition by adding competitors to track their web changes and ranking.
                </p>
                <Button onClick={() => setIsAddOpen(true)} className="bg-accent hover:bg-accent/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Competitor
                </Button>
              </CardContent>
            </Card>
          ) : (
            competitors?.map((competitor, index) => (
              <motion.div
                key={competitor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card border-border hover:border-accent/30 transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Users className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{competitor.name}</h3>
                          {competitor.website_url && (
                            <a 
                              href={competitor.website_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-muted-foreground hover:text-accent hover:underline flex items-center gap-1 transition-colors mt-0.5"
                            >
                              {competitor.website_url.replace(/^https?:\/\//, '')}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2 font-medium">
                            Added {format(new Date(competitor.created_at), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={competitor.monitoring_enabled ? "default" : "outline"}
                          className={competitor.monitoring_enabled ? "bg-accent text-accent-foreground" : "text-muted-foreground border-border"}
                        >
                          {competitor.monitoring_enabled ? "Monitoring" : "Paused"}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border-border">
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive cursor-pointer"
                              onClick={() => deleteCompetitor.mutate(competitor.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Activity Feed */}
        <Card className="bg-card border-border">
          <CardHeader className="bg-secondary/30">
            <CardTitle className="flex items-center gap-2 font-serif text-lg font-serif">
              <AlertCircle className="h-5 w-5 text-accent" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-xs">Latest competitor changes detected</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {recentLogs?.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-xs text-muted-foreground font-serif">
                  No activity detected yet
                </p>
              </div>
            ) : (
              recentLogs?.map((log: any) => (
                <div 
                  key={log.id}
                  className="p-3 rounded-sm bg-secondary/20 border border-border/50 hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{log.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 font-medium uppercase tracking-tight">
                        {log.competitors?.name}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 bg-background/50 uppercase">
                      {log.log_type}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                    <RefreshCw className="h-2 w-2" />
                    {format(new Date(log.created_at), "MMM d, h:mm a")}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
