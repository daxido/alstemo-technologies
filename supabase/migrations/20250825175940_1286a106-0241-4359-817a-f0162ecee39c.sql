-- Remove the overly permissive policy that allows all authenticated users to read service requests
DROP POLICY IF EXISTS "Service requests are readable by authenticated users" ON public.service_requests;

-- Create a more restrictive policy that only allows service owners/admins to view requests
-- For now, we'll create a policy that requires explicit admin role (to be implemented later)
-- This effectively blocks all SELECT access until proper admin authentication is set up
CREATE POLICY "Only authorized staff can view service requests" 
ON public.service_requests 
FOR SELECT 
USING (false); -- This will deny all access until admin system is implemented

-- Keep the INSERT policy unchanged so customers can still submit requests
-- The existing INSERT policy "Anyone can submit service requests" remains active