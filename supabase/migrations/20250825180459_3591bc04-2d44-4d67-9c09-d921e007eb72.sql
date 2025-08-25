-- Fix security warnings by updating functions with proper search_path settings

-- Update has_role function with secure search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Update is_authorized_staff function with secure search_path
CREATE OR REPLACE FUNCTION public.is_authorized_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
  SELECT CASE 
    WHEN auth.uid() IS NULL THEN false
    ELSE (
      public.has_role(auth.uid(), 'admin'::app_role) OR 
      public.has_role(auth.uid(), 'staff'::app_role)
    )
  END
$$;