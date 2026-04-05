"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Plus, 
  Send, 
  Edit2, 
  Trash2,
  Eye,
  MousePointer,
  Clock,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";

export function EmailCampaigns() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    subject: "",
    preview_text: "",
    content: "",
    audience_segment: "all"
  });
  const queryClient = useQueryClient();

  // Fetch real campaigns from database
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['email-campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
  });

  // Add campaign mutation
  const addCampaign = useMutation({
    mutationFn: async (campaign: typeof newCampaign) => {
      const { error } = await supabase
        .from('email_campaigns')
        .insert([{
          ...campaign,
          status: 'draft'
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      setIsAddOpen(false);
      setNewCampaign({
        name: "",
        subject: "",
        preview_text: "",
        content: "",
        audience_segment: "all"
      });
      toast.success("Campaign created");
    },
    onError: () => {
      toast.error("Failed to create campaign");
    }
  });

  // Delete campaign mutation
  const deleteCampaign = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('email_campaigns')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      toast.success("Campaign deleted");
    },
    onError: () => {
      toast.error("Failed to delete campaign");
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'scheduled': return 'secondary';
      case 'draft': return 'outline';
      default: return 'outline';
    }
  };

  // Calculate stats
  const totalCampaigns = campaigns?.length || 0;
  const totalSent = campaigns?.reduce((sum, c) => sum + (c.sent_count || 0), 0) || 0;
  const totalOpens = campaigns?.reduce((sum, c) => sum + (c.open_count || 0), 0) || 0;
  const avgOpenRate = totalSent > 0 ? ((totalOpens / totalSent) * 100).toFixed(1) : '0';
  const totalClicks = campaigns?.reduce((sum, c) => sum + (c.click_count || 0), 0) || 0;
  const avgClickRate = totalSent > 0 ? ((totalClicks / totalSent) * 100).toFixed(1) : '0';

  const stats = [
    { label: "Campaigns", value: totalCampaigns.toString(), icon: Mail },
    { label: "Avg. Open Rate", value: `${avgOpenRate}%`, icon: Eye },
    { label: "Avg. Click Rate", value: `${avgClickRate}%`, icon: MousePointer },
    { label: "Emails Sent", value: totalSent.toLocaleString(), icon: Send },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                    <stat.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground font-serif">{stat.value}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Campaigns Table */}
      <Card className="bg-card border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-secondary/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="font-serif text-lg font-serif">Email Campaigns</CardTitle>
              <CardDescription className="text-xs">Manage and track your tracking-focused marketing outreach</CardDescription>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground btn-premium min-w-[140px] h-10 font-bold text-xs uppercase tracking-widest">
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg bg-card border-border">
                <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                >
                    <DialogHeader>
                    <DialogTitle className="font-serif">Create Email Campaign</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Campaign Name</Label>
                        <Input 
                        value={newCampaign.name}
                        onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                        placeholder="e.g., Fleet Manager Winter Promo 2026"
                        className="bg-secondary/30 border-border h-10"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Subject Line</Label>
                        <Input 
                        value={newCampaign.subject}
                        onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                        placeholder="e.g., Secure your fleet with 20% off Travio S5"
                        className="bg-secondary/30 border-border h-10"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Preview Text</Label>
                        <Input 
                        value={newCampaign.preview_text}
                        onChange={(e) => setNewCampaign({ ...newCampaign, preview_text: e.target.value })}
                        placeholder="Short preview shown in recipient's inbox..."
                        className="bg-secondary/30 border-border h-10"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Audience</Label>
                        <Select 
                        value={newCampaign.audience_segment} 
                        onValueChange={(v) => setNewCampaign({ ...newCampaign, audience_segment: v })}
                        >
                        <SelectTrigger className="bg-secondary/30 border-border h-10">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                            <SelectItem value="all">All Subscribers</SelectItem>
                            <SelectItem value="fleet_managers">Fleet Managers</SelectItem>
                            <SelectItem value="private_owners">Private Car Owners</SelectItem>
                            <SelectItem value="asset_managers">Asset Managers</SelectItem>
                            <SelectItem value="leads">New Leads</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Content</Label>
                        <div className="relative">
                            <Textarea 
                            value={newCampaign.content}
                            onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                            placeholder="Email content supports markdown..."
                            rows={6}
                            className="bg-secondary/30 border-border resize-none"
                            />
                            <p className="absolute bottom-2 right-3 text-[10px] text-muted-foreground opacity-50">supports markdown</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => addCampaign.mutate(newCampaign)}
                        disabled={!newCampaign.name || !newCampaign.subject || addCampaign.isPending}
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground btn-premium h-11 h-12"
                    >
                        {addCampaign.isPending ? "Creating..." : "Create Campaign"}
                    </Button>
                    </div>
                </motion.div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <RefreshCw className="h-8 w-8 text-accent animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">Loading campaigns...</p>
            </div>
          ) : campaigns?.length === 0 ? (
            <div className="text-center py-24 px-6">
              <Mail className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
              <h3 className="font-semibold text-foreground mb-2 font-serif text-xl">No Campaigns Yet</h3>
              <p className="text-muted-foreground text-sm max-w-[320px] mx-auto mb-8 leading-relaxed">
                Reach out to your customers with professional email campaigns focused on vehicle security.
              </p>
              <Button onClick={() => setIsAddOpen(true)} className="bg-accent hover:bg-accent/90 px-8 h-12">
                <Plus className="h-4 w-4 mr-2" />
                Create First Campaign
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
                <Table>
                <TableHeader className="bg-secondary/20">
                    <TableRow>
                    <TableHead className="font-serif">Campaign</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Recipients</TableHead>
                    <TableHead className="text-center">Opens</TableHead>
                    <TableHead className="text-center">Clicks</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {campaigns?.map((campaign) => (
                    <TableRow key={campaign.id} className="hover:bg-secondary/10 transition-colors">
                        <TableCell>
                        <div>
                            <p className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">{campaign.name}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{campaign.subject}</p>
                        </div>
                        </TableCell>
                        <TableCell>
                        <Badge 
                            variant={getStatusColor(campaign.status)}
                            className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5"
                        >
                            {campaign.status === 'published' && <CheckCircle className="h-3 w-3 mr-1.5" />}
                            {campaign.status === 'scheduled' && <Clock className="h-3 w-3 mr-1.5" />}
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </Badge>
                        </TableCell>
                        <TableCell className="text-center font-mono text-xs">
                        {(campaign.recipient_count || 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                        {campaign.open_count && campaign.recipient_count ? (
                            <div className="flex flex-col items-center">
                                <span className="font-mono text-xs">{campaign.open_count.toLocaleString()}</span>
                                <span className="text-[10px] text-accent font-bold">
                                    {Math.round((campaign.open_count / campaign.recipient_count) * 100)}%
                                </span>
                            </div>
                        ) : <span className="text-muted-foreground text-xs">—</span>}
                        </TableCell>
                        <TableCell className="text-center">
                        {campaign.click_count && campaign.recipient_count ? (
                             <div className="flex flex-col items-center">
                                <span className="font-mono text-xs">{campaign.click_count.toLocaleString()}</span>
                                <span className="text-[10px] text-accent font-bold">
                                    {Math.round((campaign.click_count / campaign.recipient_count) * 100)}%
                                </span>
                            </div>
                        ) : <span className="text-muted-foreground text-xs">—</span>}
                        </TableCell>
                        <TableCell className="text-xs font-medium text-muted-foreground">
                        {campaign.sent_at 
                            ? format(new Date(campaign.sent_at), "MMM d, yyyy")
                            : campaign.scheduled_for
                            ? format(new Date(campaign.scheduled_for), "MMM d, yyyy")
                            : format(new Date(campaign.created_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-accent">
                            <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-accent">
                            <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                            onClick={() => {
                                if (confirm("Delete this campaign?")) {
                                deleteCampaign.mutate(campaign.id);
                                }
                            }}
                            >
                            <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
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
  );
}
