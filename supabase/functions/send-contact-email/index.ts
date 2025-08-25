import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { supabase } from "./supabase.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_category: string;
  service_description: string;
  budget_range?: string;
  timeline?: string;
  additional_info?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received contact form submission");
    const formData: ContactEmailRequest = await req.json();
    console.log("Form data:", formData);

    // Store in database first
    const { data: serviceRequest, error: dbError } = await supabase
      .from('service_requests')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service_category: formData.service_category,
        service_description: formData.service_description,
        budget_range: formData.budget_range,
        timeline: formData.timeline,
        additional_info: formData.additional_info,
        status: 'pending',
        priority: 1
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("Service request stored:", serviceRequest.id);

    // Send notification email to business
    const notificationEmail = await resend.emails.send({
      from: "ALSTEMO Contact <onboarding@resend.dev>",
      to: ["veritedax3@gmail.com"],
      subject: `New Service Request: ${formData.service_category}`,
      html: `
        <h2>New Service Request Received</h2>
        <p><strong>Request ID:</strong> ${serviceRequest.id}</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
        <p><strong>Service Category:</strong> ${formData.service_category}</p>
        <p><strong>Service Description:</strong> ${formData.service_description}</p>
        <p><strong>Budget Range:</strong> ${formData.budget_range || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${formData.timeline || 'Not specified'}</p>
        <p><strong>Additional Info:</strong> ${formData.additional_info || 'None'}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to customer
    const confirmationEmail = await resend.emails.send({
      from: "ALSTEMO Technologies <onboarding@resend.dev>",
      to: [formData.email],
      subject: "Thank you for contacting ALSTEMO Technologies",
      html: `
        <h2>Thank you for your inquiry, ${formData.name}!</h2>
        <p>We have received your service request and will get back to you within 24 hours.</p>
        
        <h3>Your Request Details:</h3>
        <p><strong>Service:</strong> ${formData.service_category}</p>
        <p><strong>Description:</strong> ${formData.service_description}</p>
        <p><strong>Budget:</strong> ${formData.budget_range || 'To be discussed'}</p>
        <p><strong>Timeline:</strong> ${formData.timeline || 'To be discussed'}</p>
        
        <p>Our team will review your requirements and contact you soon to discuss how we can help bring your project to life.</p>
        
        <p>Best regards,<br>
        The ALSTEMO Technologies Team</p>
        
        <hr>
        <p style="font-size: 12px; color: #666;">
        If you have any urgent questions, feel free to reach out to us directly at veritedax3@gmail.com
        </p>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmail);

    return new Response(JSON.stringify({ 
      success: true, 
      requestId: serviceRequest.id,
      message: "Thank you! Your request has been submitted successfully." 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        message: "Sorry, there was an error submitting your request. Please try again." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);