-- Create enum for service categories
CREATE TYPE public.service_category AS ENUM (
  'web_development',
  'mobile_app_development', 
  'ui_ux_design',
  'digital_marketing',
  'seo_optimization',
  'e_commerce_solutions',
  'maintenance_support',
  'consulting',
  'other'
);

-- Create enum for request status
CREATE TYPE public.request_status AS ENUM (
  'pending',
  'in_progress', 
  'completed',
  'cancelled'
);

-- Create service requests table
CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_category service_category NOT NULL,
  service_description TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  additional_info TEXT,
  status request_status NOT NULL DEFAULT 'pending',
  priority INTEGER DEFAULT 1, -- 1=low, 2=medium, 3=high
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form submissions)
CREATE POLICY "Anyone can submit service requests" 
ON public.service_requests 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading (for admin dashboard later)
CREATE POLICY "Service requests are readable by authenticated users" 
ON public.service_requests 
FOR SELECT 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_service_requests_updated_at
BEFORE UPDATE ON public.service_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_service_requests_status ON public.service_requests(status);
CREATE INDEX idx_service_requests_created_at ON public.service_requests(created_at DESC);
CREATE INDEX idx_service_requests_category ON public.service_requests(service_category);