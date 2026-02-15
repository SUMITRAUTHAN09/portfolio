"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FormData {
  name: string;
  contact: string;
  inquiryType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    inquiryType: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation - must be letters and spaces only, at least 2 characters
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = "Name should only contain letters and spaces";
    }

    // Contact validation - must be a valid phone number (10-15 digits)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!phoneRegex.test(formData.contact.replace(/\s/g, ''))) {
      newErrors.contact = "Please enter a valid 10-digit phone number";
    }

    // Message validation - at least 10 characters, should be meaningful text
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (!/[a-zA-Z]{3,}/.test(formData.message)) {
      newErrors.message = "Please enter a meaningful message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Clear submit status when user makes changes
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous status
    setSubmitStatus({ type: null, message: "" });

    // Validate form
    if (!validateForm()) {
      setSubmitStatus({
        type: "error",
        message: "Please fix the errors before submitting",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. I'll get back to you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          contact: "",
          inquiryType: "General Inquiry",
          message: "",
        });
        setErrors({});
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-20 font-serif">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">Contact Me</h1>
        <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-justify ">
          Starting my career as a Frontend and App Developer, I am looking for an organization where I can apply my skills, continue learning, and grow as a developer while contributing to real-world projects
        </p>
      </motion.div>

      {/* Status Message */}
      {submitStatus.type && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg max-w-4xl mx-auto ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          <p className="font-medium">{submitStatus.message}</p>
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="rounded-4xl p-8 shadow-md shadow-blue-500 space-y-6 max-w-4xl mx-auto"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2 ">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 bg-gray-700 text-white placeholder-gray-400 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-600 focus:ring-blue-500"
            }`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.name}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Contact Number *
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter your phone number (e.g., 9876543210)"
            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 bg-gray-700 text-white placeholder-gray-400 ${
              errors.contact
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-600 focus:ring-blue-500"
            }`}
            aria-invalid={errors.contact ? "true" : "false"}
            aria-describedby={errors.contact ? "contact-error" : undefined}
          />
          {errors.contact && (
            <p id="contact-error" className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.contact}
            </p>
          )}
        </div>

        {/* Inquiry Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Inquiry Type *
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          >
            <option>Job Opportunity</option>
            <option>Requirement/ interview</option>
            <option>Interested in My portfolio</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Message / Idea / Requirement *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Describe your idea or requirement in detail..."
            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 resize-none bg-gray-700 text-white placeholder-gray-400 ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-600 focus:ring-blue-500"
            }`}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.message}
            </p>
          )}
          <p className="text-gray-400 text-xs mt-1.5">
            {formData.message.length} / 10 characters minimum
          </p>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`w-full py-3 rounded-lg font-semibold tracking-wide transition-all duration-200 ${
            isSubmitting
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            "Submit Inquiry"
          )}
        </motion.button>
      </motion.form>
    </section>
  );
}