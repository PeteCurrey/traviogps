"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Wrench,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Car,
  MapPin,
  Calendar,
  Search,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type BookingStatus = "pending" | "confirmed" | "assigned" | "in_progress" | "completed" | "cancelled";

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_reg: string;
  product_name: string;
  product_slug: string | null;
  preferred_date: string;
  preferred_time: string;
  fitting_address: string;
  fitting_postcode: string;
  fitting_city: string | null;
  status: BookingStatus;
  assigned_fitter_name: string | null;
  customer_notes: string | null;
  admin_notes: string | null;
  created_at: string;
  confirmed_at: string | null;
  completed_at: string | null;
}

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: CheckCircle2 },
  assigned: { label: "Assigned", color: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: User },
  in_progress: { label: "In Progress", color: "bg-orange-500/10 text-orange-600 border-orange-500/20", icon: Wrench },
  completed: { label: "Completed", color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
};

const ALL_STATUSES: BookingStatus[] = ["pending", "confirmed", "assigned", "in_progress", "completed", "cancelled"];

export default function AdminBookingsPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editStatus, setEditStatus] = useState<BookingStatus>("pending");
  const [editFitter, setEditFitter] = useState("");
  const [editAdminNotes, setEditAdminNotes] = useState("");

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["fitting-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fitting_bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Booking[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, any> }) => {
      const { error } = await supabase
        .from("fitting_bookings")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fitting-bookings"] });
      setSelectedBooking(null);
      toast({ title: "Booking updated", description: "The booking has been updated successfully." });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleSave = () => {
    if (!selectedBooking) return;
    const updates: Record<string, any> = {
      status: editStatus,
      assigned_fitter_name: editFitter || null,
      admin_notes: editAdminNotes || null,
    };
    if (editStatus === "confirmed" && selectedBooking.status !== "confirmed") {
      updates.confirmed_at = new Date().toISOString();
    }
    if (editStatus === "completed" && selectedBooking.status !== "completed") {
      updates.completed_at = new Date().toISOString();
    }
    updateMutation.mutate({ id: selectedBooking.id, updates });
  };

  const openBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditStatus(booking.status);
    setEditFitter(booking.assigned_fitter_name || "");
    setEditAdminNotes(booking.admin_notes || "");
  };

  const filtered = bookings.filter((b) => {
    if (filterStatus !== "all" && b.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.customer_name.toLowerCase().includes(q) ||
        b.customer_email.toLowerCase().includes(q) ||
        b.vehicle_reg.toLowerCase().includes(q) ||
        b.product_name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const statusCounts = ALL_STATUSES.reduce(
    (acc, s) => {
      acc[s] = bookings.filter((b) => b.status === s).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-foreground font-serif">Fitting Bookings</h1>
        <p className="text-muted-foreground">Manage tracker fitting appointments</p>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ALL_STATUSES.map((status, idx) => {
          const config = STATUS_CONFIG[status];
          return (
            <motion.button
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setFilterStatus(filterStatus === status ? "all" : status)}
              className={cn(
                "bg-card border rounded-sm p-4 text-left transition-colors",
                filterStatus === status ? "border-accent" : "border-border hover:border-accent/30"
              )}
            >
              <p className="text-2xl font-serif text-foreground font-serif">{statusCounts[status]}</p>
              <p className="text-xs text-muted-foreground">{config.label}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, reg, or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px] h-10">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {ALL_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{STATUS_CONFIG[s].label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bookings list */}
      {isLoading ? (
        <div className="bg-card border border-border rounded-sm p-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto" />
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-sm p-12 text-center"
        >
          <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-serif text-lg text-foreground mb-2 font-serif">
            {bookings.length === 0 ? "No Bookings Yet" : "No Matching Bookings"}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {bookings.length === 0
              ? "Fitting bookings will appear here when customers request a professional installation during checkout."
              : "Try adjusting your search or filter criteria."}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filtered.map((booking, idx) => {
            const config = STATUS_CONFIG[booking.status];
            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => openBooking(booking)}
                className="bg-card border border-border rounded-sm p-5 hover:border-accent/30 transition-colors cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-medium text-foreground truncate">{booking.customer_name}</p>
                      <Badge variant="outline" className={cn("text-xs shrink-0 font-normal", config.color)}>
                        {config.label}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Car className="h-3.5 w-3.5" />
                        {booking.vehicle_make} {booking.vehicle_model} — {booking.vehicle_reg}
                      </span>
                      <span className="flex items-center gap-1">
                        <Wrench className="h-3.5 w-3.5" />
                        {booking.product_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {format(new Date(booking.preferred_date), "dd MMM yyyy")} — {booking.preferred_time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {booking.fitting_postcode}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">
                    {format(new Date(booking.created_at), "dd/MM/yy HH:mm")}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Booking detail dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-serif">Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              {/* Customer info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Customer</p>
                  <p className="text-sm font-medium text-foreground">{selectedBooking.customer_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.customer_email}</p>
                  {selectedBooking.customer_phone && (
                    <p className="text-sm text-muted-foreground">{selectedBooking.customer_phone}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vehicle</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedBooking.vehicle_make} {selectedBooking.vehicle_model}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.vehicle_reg}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Product</p>
                  <p className="text-sm font-medium text-foreground">{selectedBooking.product_name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Appointment</p>
                  <p className="text-sm font-medium text-foreground">
                    {format(new Date(selectedBooking.preferred_date), "EEEE, dd MMMM yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.preferred_time}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Fitting Location</p>
                  <p className="text-sm text-foreground">
                    {selectedBooking.fitting_address}, {selectedBooking.fitting_city && `${selectedBooking.fitting_city}, `}{selectedBooking.fitting_postcode}
                  </p>
                </div>
                {selectedBooking.customer_notes && (
                  <div className="md:col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">Customer Notes</p>
                    <p className="text-sm text-foreground">{selectedBooking.customer_notes}</p>
                  </div>
                )}
              </div>

              {/* Editable fields */}
              <div className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Select value={editStatus} onValueChange={(v) => setEditStatus(v as BookingStatus)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>{STATUS_CONFIG[s].label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Assigned Fitter</Label>
                  <Input
                    placeholder="Fitter name"
                    value={editFitter}
                    onChange={(e) => setEditFitter(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Admin Notes</Label>
                  <Textarea
                    placeholder="Internal notes about this booking..."
                    value={editAdminNotes}
                    onChange={(e) => setEditAdminNotes(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
