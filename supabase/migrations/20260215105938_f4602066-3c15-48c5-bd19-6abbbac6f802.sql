
-- Create booking status enum
CREATE TYPE public.booking_status AS ENUM (
  'pending',
  'confirmed',
  'assigned',
  'in_progress',
  'completed',
  'cancelled'
);

-- Create fitting_bookings table
CREATE TABLE public.fitting_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Customer info
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Vehicle info
  vehicle_make TEXT NOT NULL,
  vehicle_model TEXT NOT NULL,
  vehicle_reg TEXT NOT NULL,
  
  -- Fitting details
  product_name TEXT NOT NULL,
  product_slug TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  
  -- Location
  fitting_address TEXT NOT NULL,
  fitting_postcode TEXT NOT NULL,
  fitting_city TEXT,
  
  -- Status & assignment
  status public.booking_status NOT NULL DEFAULT 'pending',
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_fitter_name TEXT,
  
  -- Notes
  customer_notes TEXT,
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.fitting_bookings ENABLE ROW LEVEL SECURITY;

-- Public can submit bookings (no auth required for checkout)
CREATE POLICY "Anyone can submit a fitting booking"
ON public.fitting_bookings
FOR INSERT
WITH CHECK (
  customer_name IS NOT NULL 
  AND customer_email IS NOT NULL 
  AND LENGTH(customer_email) > 5
  AND vehicle_make IS NOT NULL
  AND vehicle_reg IS NOT NULL
);

-- Staff can view all bookings
CREATE POLICY "Staff can view all bookings"
ON public.fitting_bookings
FOR SELECT
USING (is_staff(auth.uid()));

-- Staff can update bookings
CREATE POLICY "Staff can update bookings"
ON public.fitting_bookings
FOR UPDATE
USING (is_staff(auth.uid()));

-- Admins can delete bookings
CREATE POLICY "Admins can delete bookings"
ON public.fitting_bookings
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Auto-update timestamps
CREATE TRIGGER update_fitting_bookings_updated_at
BEFORE UPDATE ON public.fitting_bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
