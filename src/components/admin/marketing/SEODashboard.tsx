"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  TrendingUp, 
  TrendingDown,
  Target,
  FileText,
  CheckCircle,
  Zap,
  RefreshCw,
  Plus,
  Lightbulb
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function SEODashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [aiRecommendations, setAiRecommendations] = useState<any>(null);
  const queryClient = useQueryClient();

  // Fetch real SEO analytics from database
  const { data: seoData, isLoading } = useQuery({
    queryKey: ['seo-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_analytics')
        .select('*')
        .order('recorded_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
  });

  // Get unique keywords with latest data
  const keywordData = seoData?.reduce((acc: any[], item: any) => {
    const existing = acc.find(k => k.keyword === item.keyword);
    if (!existing && item.keyword) {
      acc.push({
        keyword: item.keyword,
        rank: item.current_rank,
        prevRank: item.previous_rank,
        volume: item.search_volume || 0,
        difficulty: item.difficulty_score || 50
      });
    }
    return acc;
  }, []) || [];

  // Add keyword mutation
  const addKeyword = useMutation({
    mutationFn: async (keyword: string) => {
      const { error } = await supabase
        .from('seo_analytics')
        .insert([{
          keyword,
          page_url: '/',
          current_rank: null,
          search_volume: null,
          difficulty_score: null,
          data_source: 'manual'
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seo-analytics'] });
      setNewKeyword("");
      toast.success("Keyword added for tracking");
    },
    onError: () => {
      toast.error("Failed to add keyword");
    }
  });

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-market-analyzer', {
        body: { 
          type: 'seo_recommendations',
          data: keywordData,
          context: 'Analyze SEO performance for Travio GPS tracking solutions. Focus on keywords related to vehicle trackers, fleet management, and asset security.'
        }
      });

      if (error) throw error;
      
      if (data.analysis) {
        setAiRecommendations(data.analysis);
      }
      
      toast.success("SEO Analysis Complete", {
        description: "AI recommendations have been generated"
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Calculate stats
  const avgRank = keywordData.length > 0 
    ? (keywordData.reduce((sum, k) => sum + (k.rank || 100), 0) / keywordData.length).toFixed(1)
    : '—';
  
  const rankingKeywords = keywordData.filter(k => k.rank && k.rank <= 10).length;
  const seoScore = keywordData.length > 0 
    ? Math.round(70 + (rankingKeywords / keywordData.length) * 30) 
    : 0;

  return (
    <div className="space-y-6">
      {/* SEO Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Overall SEO Score</p>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2 font-serif">{seoScore}/100</div>
              <Progress value={seoScore} className="h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Keywords Tracked</p>
                <Search className="h-5 w-5 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground font-serif">{keywordData.length}</div>
              <p className="text-sm text-muted-foreground">Active keywords</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Avg. Position</p>
                <Target className="h-5 w-5 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground font-serif">{avgRank}</div>
              <p className="text-sm text-green-500 flex items-center gap-1 font-medium">
                <TrendingUp className="h-3 w-3" /> Improving
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Top 10 Rankings</p>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-foreground font-serif">{rankingKeywords}</div>
              <p className="text-sm text-muted-foreground">of {keywordData.length} keywords</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Analysis Button */}
      <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/20 rounded-xl">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground font-serif text-lg">AI SEO Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered recommendations to improve your search rankings
                </p>
              </div>
            </div>
            <Button onClick={handleRunAnalysis} disabled={isAnalyzing} className="bg-accent hover:bg-accent/90 text-accent-foreground btn-premium min-w-[160px]">
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      {aiRecommendations && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader className="bg-secondary/30">
              <CardTitle className="flex items-center gap-2 font-serif font-serif">
                <Lightbulb className="h-5 w-5 text-accent" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {aiRecommendations.summary && (
                <p className="text-foreground text-sm leading-relaxed">{aiRecommendations.summary}</p>
              )}
              
              {aiRecommendations.priorityKeywords?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    Priority Keywords:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {aiRecommendations.priorityKeywords.map((kw: string, i: number) => (
                      <Badge key={i} variant="outline" className="bg-accent/5 border-accent/20">{kw}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiRecommendations.quickWins?.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Quick Wins:
                    </h4>
                    <ul className="space-y-2">
                      {aiRecommendations.quickWins.map((win: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground bg-secondary/20 p-2 rounded-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                          {win}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {aiRecommendations.contentIdeas?.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4 text-accent" />
                      Content Ideas:
                    </h4>
                    <ul className="space-y-2">
                      {aiRecommendations.contentIdeas.map((idea: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground bg-secondary/20 p-2 rounded-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Keyword Rankings */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="font-serif font-serif">Keyword Rankings</CardTitle>
                  <CardDescription>Track your search engine positions</CardDescription>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Input 
                    placeholder="Add keyword..." 
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newKeyword.trim()) {
                        addKeyword.mutate(newKeyword.trim());
                      }
                    }}
                    className="w-full sm:w-48 h-9"
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      if (newKeyword.trim()) {
                        addKeyword.mutate(newKeyword.trim());
                      }
                    }}
                    disabled={addKeyword.isPending}
                    className="h-9 shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="h-8 w-8 text-accent animate-spin" />
                </div>
              ) : keywordData.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground mb-2 font-serif">No Keywords Tracked</h3>
                  <p className="text-muted-foreground text-sm max-w-[240px] mx-auto">
                    Add keywords to start tracking your search rankings
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-secondary/30">
                      <TableRow>
                        <TableHead>Keyword</TableHead>
                        <TableHead className="text-center">Rank</TableHead>
                        <TableHead className="text-center">Change</TableHead>
                        <TableHead className="text-center hidden sm:table-cell">Volume</TableHead>
                        <TableHead className="text-center hidden md:table-cell">Difficulty</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {keywordData.map((kw: any, index: number) => (
                        <TableRow key={index} className="hover:bg-secondary/10 transition-colors">
                          <TableCell className="font-medium">{kw.keyword}</TableCell>
                          <TableCell className="text-center">
                            {kw.rank ? (
                              <Badge variant="outline" className="font-mono bg-accent/5 border-accent/20">
                                #{kw.rank}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {kw.rank && kw.prevRank ? (
                              kw.rank < kw.prevRank ? (
                                <span className="text-green-500 flex items-center justify-center gap-1 text-xs">
                                  <TrendingUp className="h-3 w-3" />
                                  +{kw.prevRank - kw.rank}
                                </span>
                              ) : kw.rank > kw.prevRank ? (
                                <span className="text-red-500 flex items-center justify-center gap-1 text-xs">
                                  <TrendingDown className="h-3 w-3" />
                                  -{kw.rank - kw.prevRank}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center text-muted-foreground text-xs hidden sm:table-cell">
                            {kw.volume ? kw.volume.toLocaleString() : '—'}
                          </TableCell>
                          <TableCell className="text-center hidden md:table-cell">
                            {kw.difficulty ? (
                              <div className="flex items-center justify-center gap-2">
                                <Progress 
                                  value={kw.difficulty} 
                                  className="w-16 h-1.5" 
                                />
                                <span className="text-[10px] text-muted-foreground">{kw.difficulty}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SEO Tips */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif">Quick Tips</CardTitle>
            <CardDescription>SEO best practices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border border-accent/30 bg-accent/5 group hover:border-accent transition-colors">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-accent mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm font-medium text-foreground">Add local keywords</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Target phrases like "car tracker installation [area name]" for local search visibility
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-border bg-secondary/50 group hover:border-accent/30 transition-colors">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5 group-hover:text-accent transition-colors" />
                <div>
                  <p className="text-sm font-medium text-foreground">Create fleet guides</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Detailed B2B content helps rank for commercial telematics searches
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-border bg-secondary/50 group hover:border-accent/30 transition-colors">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-muted-foreground mt-0.5 group-hover:text-accent transition-colors" />
                <div>
                  <p className="text-sm font-medium text-foreground">Optimize product pages</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Include security certifications like "S5 Tracker" in titles
                  </p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4 text-xs font-medium">
              View Full SEO Guide
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
