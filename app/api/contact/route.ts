import { sendContactEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

// Server-side validation functions
function validateName(name: string): string | null {
  if (!name || !name.trim()) {
    return "Name is required";
  }
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }
  if (!/^[a-zA-Z\s]{2,50}$/.test(name.trim())) {
    return "Name should only contain letters and spaces (2-50 characters)";
  }
  return null;
}

function validateContact(contact: string): string | null {
  if (!contact || !contact.trim()) {
    return "Contact number is required";
  }
  // Remove spaces and check if it's a valid phone number
  const cleanContact = contact.replace(/\s/g, '');
  if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(cleanContact)) {
    return "Please enter a valid phone number (10-15 digits)";
  }
  return null;
}

function validateMessage(message: string): string | null {
  if (!message || !message.trim()) {
    return "Message is required";
  }
  if (message.trim().length < 10) {
    return "Message must be at least 10 characters";
  }
  if (message.trim().length > 1000) {
    return "Message must not exceed 1000 characters";
  }
  if (!/[a-zA-Z]{3,}/.test(message)) {
    return "Please enter a meaningful message with actual words";
  }
  return null;
}

function validateInquiryType(inquiryType: string): string | null {
  const validTypes = [
    "General Inquiry",
    "Interested in Website",
    "Project Idea / Requirement"
  ];
  if (!inquiryType || !validTypes.includes(inquiryType)) {
    return "Invalid inquiry type";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, contact, inquiryType, message } = body;

    // Comprehensive server-side validation
    const validationErrors: Record<string, string> = {};

    const nameError = validateName(name);
    if (nameError) validationErrors.name = nameError;

    const contactError = validateContact(contact);
    if (contactError) validationErrors.contact = contactError;

    const messageError = validateMessage(message);
    if (messageError) validationErrors.message = messageError;

    const inquiryError = validateInquiryType(inquiryType);
    if (inquiryError) validationErrors.inquiryType = inquiryError;

    // If there are validation errors, return them
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { 
          error: "Validation failed",
          details: validationErrors 
        },
        { status: 400 }
      );
    }

    // Sanitize inputs (trim whitespace)
    const sanitizedData = {
      name: name.trim(),
      contact: contact.trim(),
      inquiryType: inquiryType.trim(),
      message: message.trim(),
    };

    // Log the submission
    console.log("✅ Valid Contact Form Submission:", {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
    });

    // Send email
    const emailResult = await sendContactEmail(sanitizedData);

    if (!emailResult.success) {
      console.error("❌ Failed to send email:", emailResult.error);
      return NextResponse.json(
        { 
          error: "Failed to send email. Please try again or contact us directly.",
          details: "Email service error"
        },
        { status: 500 }
      );
    }

    console.log("📧 Email sent successfully!");

    return NextResponse.json(
      { 
        success: true, 
        message: "Your inquiry has been submitted successfully! We'll get back to you soon." 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Error processing contact form:", error);
    
    // Check if it's a JSON parse error
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}