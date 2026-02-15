import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Wrench, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useCartStore, type CartItem } from "@/stores/cartStore";

const TIME_SLOTS = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

export interface FittingData {
  enabled: boolean;
  vehicleMake: string;
  vehicleModel: string;
  vehicleReg: string;
  preferredDate: Date | undefined;
  preferredTime: string;
  fittingAddress: string;
  fittingPostcode: string;
  fittingCity: string;
  selectedProduct: string;
  notes: string;
}

const INITIAL_FITTING: FittingData = {
  enabled: false,
  vehicleMake: "",
  vehicleModel: "",
  vehicleReg: "",
  preferredDate: undefined,
  preferredTime: "",
  fittingAddress: "",
  fittingPostcode: "",
  fittingCity: "",
  selectedProduct: "",
  notes: "",
};

interface FittingBookingFormProps {
  fittingData: FittingData;
  onChange: (data: FittingData) => void;
}

export { INITIAL_FITTING };

export function FittingBookingForm({ fittingData, onChange }: FittingBookingFormProps) {
  const { items } = useCartStore();

  const update = (partial: Partial<FittingData>) => {
    onChange({ ...fittingData, ...partial });
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="bg-card rounded-sm border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => update({ enabled: !fittingData.enabled })}
        className="w-full flex items-center justify-between p-6 hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Wrench className="h-5 w-5 text-accent" />
          </div>
          <div className="text-left">
            <h2 className="font-serif text-xl text-foreground">Professional Fitting</h2>
            <p className="text-sm text-muted-foreground">
              Have your tracker professionally fitted at your location
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            checked={fittingData.enabled}
            onCheckedChange={(checked) => update({ enabled: checked })}
            onClick={(e) => e.stopPropagation()}
          />
          {fittingData.enabled ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {fittingData.enabled && (
        <div className="p-6 pt-0 space-y-6 border-t border-border mt-0 pt-6">
          {/* Product selection */}
          <div>
            <Label htmlFor="fitting-product">Tracker to Fit</Label>
            <Select
              value={fittingData.selectedProduct}
              onValueChange={(val) => update({ selectedProduct: val })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select which tracker to fit" />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.product.id} value={item.product.name}>
                    {item.product.name} (x{item.quantity})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Vehicle details */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Vehicle Details</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="vehicleMake">Make</Label>
                <Input
                  id="vehicleMake"
                  placeholder="e.g. Ford"
                  value={fittingData.vehicleMake}
                  onChange={(e) => update({ vehicleMake: e.target.value })}
                  required={fittingData.enabled}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="vehicleModel">Model</Label>
                <Input
                  id="vehicleModel"
                  placeholder="e.g. Transit"
                  value={fittingData.vehicleModel}
                  onChange={(e) => update({ vehicleModel: e.target.value })}
                  required={fittingData.enabled}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="vehicleReg">Registration</Label>
                <Input
                  id="vehicleReg"
                  placeholder="e.g. AB12 CDE"
                  value={fittingData.vehicleReg}
                  onChange={(e) => update({ vehicleReg: e.target.value.toUpperCase() })}
                  required={fittingData.enabled}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Date & time */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Preferred Date & Time</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !fittingData.preferredDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fittingData.preferredDate
                        ? format(fittingData.preferredDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fittingData.preferredDate}
                      onSelect={(date) => update({ preferredDate: date })}
                      disabled={(date) => date < tomorrow || date.getDay() === 0}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Time Slot</Label>
                <Select
                  value={fittingData.preferredTime}
                  onValueChange={(val) => update({ preferredTime: val })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Fitting address */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Fitting Location</p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fittingAddress">Address</Label>
                <Input
                  id="fittingAddress"
                  placeholder="Street address"
                  value={fittingData.fittingAddress}
                  onChange={(e) => update({ fittingAddress: e.target.value })}
                  required={fittingData.enabled}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fittingCity">City</Label>
                  <Input
                    id="fittingCity"
                    placeholder="City"
                    value={fittingData.fittingCity}
                    onChange={(e) => update({ fittingCity: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fittingPostcode">Postcode</Label>
                  <Input
                    id="fittingPostcode"
                    placeholder="Postcode"
                    value={fittingData.fittingPostcode}
                    onChange={(e) => update({ fittingPostcode: e.target.value })}
                    required={fittingData.enabled}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="fittingNotes">Additional Notes (optional)</Label>
            <Textarea
              id="fittingNotes"
              placeholder="Any special instructions for the fitter, e.g. parking info, access details..."
              value={fittingData.notes}
              onChange={(e) => update({ notes: e.target.value })}
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      )}
    </div>
  );
}
