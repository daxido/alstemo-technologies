-- Create an enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'user');

-- Create user_roles table to manage permissions
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create a function to check if current user is admin or staff
CREATE OR REPLACE FUNCTION public.is_authorized_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT CASE 
    WHEN auth.uid() IS NULL THEN false
    ELSE (
      public.has_role(auth.uid(), 'admin'::app_role) OR 
      public.has_role(auth.uid(), 'staff'::app_role)
    )
  END
$$;

-- Update the service_requests SELECT policy to allow authorized staff
DROP POLICY IF EXISTS "Only authorized staff can view service requests" ON public.service_requests;

CREATE POLICY "Authorized staff can view all service requests" 
ON public.service_requests 
FOR SELECT 
USING (public.is_authorized_staff());

-- Add policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Insert a default admin user (you'll need to replace this UUID with an actual user ID after signup)
-- This is commented out for now - you'll need to add admin users manually after they sign up
-- INSERT INTO public.user_roles (user_id, role) VALUES ('your-user-uuid-here', 'admin');