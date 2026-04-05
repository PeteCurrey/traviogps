"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  Check, 
  CheckCheck,
  AlertTriangle,
  TrendingUp,
  Users,
  FileText,
  Filter,
  Trash2,
  Plus,
  RefreshCw
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'competitor_change': return Users;
    case 'market_trend': return TrendingUp;
    case 'seo_alert': return AlertTriangle;
    case 'content_ready': return FileText;
    default: return Bell;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'destructive';
    case 'high': return 'default';
    case 'medium': return 'secondary';
    case 'low': return 'outline';
    default: return 'outline';
  }
};

export function NotificationCenter() {
  const [filter, setFilter] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    notification_type: "system" as "competitor_change" | "market_trend" | "seo_alert" | "content_ready" | "system",
    priority: "medium" as "low" | "medium" | "high" | "urgent"
  });
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['marketing-notifications', filter],
    queryFn: async () => {
      let query = supabase
        .from('marketing_notifications')
        .select('*')
        .eq('is_dismissed', false)
        .order('created_at', { ascending: false });
      
      if (filter === 'unread') {
        query = query.eq('is_read', false);
      } else if (filter !== 'all') {
        query = query.eq('notification_type', filter as "competitor_change" | "content_ready" | "market_trend" | "seo_alert" | "system");
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });

  // Add notification mutation
  const addNotification = useMutation({
    mutationFn: async (notification: typeof newNotification) => {
      const { error } = await supabase
        .from('marketing_notifications')
        .insert([notification]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-notifications'] });
      setIsAddOpen(false);
      setNewNotification({
        title: "",
        message: "",
        notification_type: "system",
        priority: "medium"
      });
      toast.success("Notification created");
    },
    onError: () => {
      toast.error("Failed to create notification");
    }
  });

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('marketing_notifications')
        .update({ is_read: true })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-notifications'] });
    }
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('marketing_notifications')
        .update({ is_read: true })
        .eq('is_read', false);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-notifications'] });
      toast.success("All notifications marked as read");
    }
  });

  const dismissNotification = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('marketing_notifications')
        .update({ is_dismissed: true })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-notifications'] });
      toast.success("Notification dismissed");
    }
  });

  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-accent/20 rounded-xl group hover:scale-105 transition-transform">
            <Bell className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground font-serif">Notification Center</h2>
            <p className="text-muted-foreground text-sm">
              {unreadCount > 0 ? `You have ${unreadCount} unread update${unreadCount !== 1 ? 's' : ''}` : "All systems fully synchronized"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px] h-10 bg-secondary/30 border-border">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="unread">Unread Only</SelectItem>
              <SelectItem value="competitor_change">Competitor Alerts</SelectItem>
              <SelectItem value="market_trend">Market Trends</SelectItem>
              <SelectItem value="seo_alert">SEO Alerts</SelectItem>
              <SelectItem value="content_ready">Content Ready</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-10 px-3">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-serif">Create Intelligence Alert</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Alert Title</Label>
                  <Input 
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                    placeholder="e.g., New Competitor Detected"
                    className="bg-secondary/30 border-border h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Message</Label>
                  <Textarea 
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                    placeholder="Detailed alert message..."
                    className="bg-secondary/30 border-border resize-none"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Alert Type</Label>
                    <Select 
                      value={newNotification.notification_type} 
                      onValueChange={(v) => setNewNotification({ 
                        ...newNotification, 
                        notification_type: v as typeof newNotification.notification_type 
                      })}
                    >
                      <SelectTrigger className="bg-secondary/30 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="competitor_change">Competitor Alert</SelectItem>
                        <SelectItem value="market_trend">Market Trend</SelectItem>
                        <SelectItem value="seo_alert">SEO Alert</SelectItem>
                        <SelectItem value="content_ready">Content Ready</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Priority</Label>
                    <Select 
                      value={newNotification.priority} 
                      onValueChange={(v) => setNewNotification({ 
                        ...newNotification, 
                        priority: v as typeof newNotification.priority 
                      })}
                    >
                      <SelectTrigger className="bg-secondary/30 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button 
                  onClick={() => addNotification.mutate(newNotification)}
                  disabled={!newNotification.title || !newNotification.message || addNotification.isPending}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-11"
                >
                  {addNotification.isPending ? "Generating..." : "Create Alert"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={() => markAllAsRead.mutate()}
              disabled={markAllAsRead.isPending}
              className="h-10 px-3"
            >
              <CheckCheck className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="grid grid-cols-1 gap-3">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
             <RefreshCw className="h-10 w-10 text-accent animate-spin mb-4" />
             <p className="text-sm text-muted-foreground font-serif">Synchronizing intelligence stream...</p>
          </div>
        ) : notifications?.length === 0 ? (
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-16 text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 font-serif text-xl">No Recent Alerts</h3>
              <p className="text-muted-foreground text-sm max-w-[320px] mx-auto mb-8 leading-relaxed">
                {filter !== 'all' 
                  ? "No intelligence items match your current filter. Adjust filters to see more activity."
                  : "Everything is currently stable. Intelligence logs will appear here as market changes are detected."}
              </p>
              {filter !== 'all' ? (
                <Button onClick={() => setFilter('all')} variant="outline">View All Alerts</Button>
              ) : (
                <Button onClick={() => setIsAddOpen(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Manually Add Alert
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {notifications?.map((notification, index) => {
                const Icon = getNotificationIcon(notification.notification_type);
                return (
                <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <Card 
                    className={`bg-card border-border hover:border-accent/30 transition-all group overflow-hidden ${
                        !notification.is_read ? 'border-l-4 border-l-accent' : ''
                    }`}
                    >
                    <CardContent className="p-5">
                        <div className="flex items-start gap-5">
                        <div className={`p-3 rounded-lg shrink-0 group-hover:scale-110 transition-transform ${
                            notification.priority === 'urgent' ? 'bg-destructive/10' :
                            notification.priority === 'high' ? 'bg-accent/10' :
                            'bg-secondary/50'
                        }`}>
                            <Icon className={`h-5 w-5 ${
                            notification.priority === 'urgent' ? 'text-destructive' :
                            notification.priority === 'high' ? 'text-accent' :
                            'text-muted-foreground'
                            }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                                <h4 className={`font-semibold text-sm truncate uppercase tracking-tight ${
                                    !notification.is_read ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                    {notification.title}
                                </h4>
                                <Badge 
                                    variant={getPriorityColor(notification.priority)}
                                    className={`text-[9px] font-bold uppercase tracking-widest px-1.5 h-4 border-0 ${
                                        notification.priority === 'urgent' ? 'bg-destructive/10 text-destructive' :
                                        notification.priority === 'high' ? 'bg-accent/10 text-accent' :
                                        'bg-secondary text-muted-foreground'
                                    }`}
                                >
                                    {notification.priority}
                                </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 italic mb-3">
                                {notification.message}
                                </p>
                                <div className="flex items-center gap-4">
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight flex items-center gap-1">
                                        <RefreshCw className="h-2.5 w-2.5" />
                                        {format(new Date(notification.created_at), "MMM d, h:mm a")}
                                    </p>
                                    <Badge variant="outline" className="text-[9px] px-1.5 h-4 rounded-none bg-background uppercase border-border/50 font-bold">
                                        {notification.notification_type.replace('_', ' ')}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                {!notification.is_read && (
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:text-accent hover:bg-accent/10"
                                    onClick={() => markAsRead.mutate(notification.id)}
                                >
                                    <Check className="h-4 w-4" />
                                </Button>
                                )}
                                <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive/50 hover:text-destructive hover:bg-destructive/10"
                                onClick={() => dismissNotification.mutate(notification.id)}
                                >
                                <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                </motion.div>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
