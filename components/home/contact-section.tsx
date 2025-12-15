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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

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
          toast.success("Message sent successfully!", {
            description:
              "Thank you for reaching out. I'll get back to you within 24hours.",
          });
          setFormData({ name: "", email: "", message: "" });
          return;
        }

        if (response.status === 429) {
          const resetDate = result.reset
            ? new Date(result.reset).toLocaleTimeString()
            : "soon";

          toast.error("Too many requests", {
            description: `You've reached the limit of ${result.limit || 5} messages per hour. Please try again at ${resetDate}.`,
          });
          return;
        }

        toast.error("Failed to send message", {
          description: result.error || "Please try again later.",
        });
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message", {
          description:
            "Please try again later or contact me directly via email.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  return (
    <section
      id="contact"
      className="py-20 sm:py-32 opacity-0"
      aria-labelledby="contact-heading"
    >
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
            aria-label="Contact form"
          >
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    disabled={isSubmitting}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    placeholder="your.email@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    disabled={isSubmitting}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or just say hi..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    disabled={isSubmitting}
                  />
                </Field>

                <Field>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
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
