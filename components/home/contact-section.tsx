"use client";

import React, { useCallback, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ContactSection = React.memo(function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Form validation function
  const validateField = useCallback((id: string, value: string) => {
    switch (id) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
      
      // Real-time validation
      const error = validateField(id, value);
      setErrors(prev => ({ ...prev, [id]: error }));
    },
    [validateField]
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Mark all fields as touched for validation display
      setTouched({ name: true, email: true, message: true });
      
      // Validate all fields
      const newErrors: Record<string, string> = {};
      Object.keys(formData).forEach(key => {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key] = error;
      });
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length > 0) {
        setSubmitStatus("error");
        return;
      }
      
      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        const response = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus("success");
          toast.success("Message sent successfully!", {
            description:
              "Thank you for reaching out. I'll get back to you within 24hours.",
          });
          setFormData({ name: "", email: "", message: "" });
          setErrors({});
          setTouched({});
          return;
        }

        if (response.status === 429) {
          const resetDate = result.reset
            ? new Date(result.reset).toLocaleTimeString()
            : "soon";

          toast.error("Too many requests", {
            description: `You've reached the limit of ${result.limit || 5} messages per hour. Please try again at ${resetDate}.`,
          });
          setSubmitStatus("error");
          return;
        }

        setSubmitStatus("error");
        toast.error("Failed to send message", {
          description: result.error || "Please try again later.",
        });
      } catch (error) {
        console.error("Error sending message:", error);
        setSubmitStatus("error");
        toast.error("Failed to send message", {
          description:
            "Please try again later or contact me directly via email.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateField]
  );

  return (
    <section
      id="contact"
      className="py-20 sm:py-32 opacity-0"
      aria-labelledby="contact-heading"
    >
      {/* Screen reader live region for form status announcements */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        role="status"
      >
        {submitStatus === "success" && "Form submitted successfully!"}
        {submitStatus === "error" && "Form submission failed. Please check errors and try again."}
        {isSubmitting && "Submitting form, please wait..."}
      </div>

      <div className="mx-auto max-w-xl">
        <div className="flex flex-col items-center gap-10 md:gap-12">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center space-y-4">
            <h2 id="contact-heading" className="text-3xl sm:text-4xl font-light">
              Get in touch
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a project in mind or want to collaborate? Feel free to reach
              out! I typically respond within 24 hours.
            </p>
          </div>

          <form
            className="flex w-full flex-col"
            onSubmit={handleSubmit}
            aria-labelledby="contact-heading"
            noValidate
            aria-describedby="contact-form-help"
          >
            {/* Form help text for screen readers */}
            <div id="contact-form-help" className="sr-only">
              All fields are required. Name must be at least 2 characters, 
              email must be valid, and message must be at least 10 characters.
            </div>

            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel 
                    htmlFor="name" 
                    className={errors.name && touched.name ? "text-destructive" : ""}
                  >
                    Name <span className="text-muted-foreground">*</span>
                  </FieldLabel>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={errors.name && touched.name ? "true" : "false"}
                    aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                    disabled={isSubmitting}
                    className={errors.name && touched.name ? "border-destructive focus:border-destructive" : ""}
                  />
                  {errors.name && touched.name && (
                    <p id="name-error" className="text-sm text-destructive mt-1" role="alert">
                      {errors.name}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel 
                    htmlFor="email"
                    className={errors.email && touched.email ? "text-destructive" : ""}
                  >
                    Email <span className="text-muted-foreground">*</span>
                  </FieldLabel>
                  <Input
                    id="email"
                    placeholder="your.email@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={errors.email && touched.email ? "true" : "false"}
                    aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                    disabled={isSubmitting}
                    className={errors.email && touched.email ? "border-destructive focus:border-destructive" : ""}
                  />
                  {errors.email && touched.email && (
                    <p id="email-error" className="text-sm text-destructive mt-1" role="alert">
                      {errors.email}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel 
                    htmlFor="message"
                    className={errors.message && touched.message ? "text-destructive" : ""}
                  >
                    Message <span className="text-muted-foreground">*</span>
                  </FieldLabel>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or just say hi..."
                    className={`min-h-[120px] ${errors.message && touched.message ? "border-destructive focus:border-destructive" : ""}`}
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={errors.message && touched.message ? "true" : "false"}
                    aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.message && touched.message && (
                    <p id="message-error" className="text-sm text-destructive mt-1" role="alert">
                      {errors.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <Button 
                    type="submit" 
                    className="w-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" 
                    disabled={isSubmitting}
                    aria-describedby="submit-button-help"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                  <p id="submit-button-help" className="sr-only">
                    Click to send your message. Button is disabled during submission.
                  </p>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
