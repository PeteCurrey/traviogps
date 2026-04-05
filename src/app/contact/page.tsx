"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, Check } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/lib/seo";

const offices = [
  {
    name: "Head Office",
    address: "123 Tech Plaza, London, EC1A 1BB",
    phone: "020 7123 4567",
    email: "info@traviogps.com",
    hours: "Mon-Fri: 9am-6pm, Sat: 10am-4pm",
  },
  {
    name: "Support Centre",
    address: "45 Innovation Way, Manchester, M1 2WD",
    phone: "0161 987 6543",
    email: "support@traviogps.com",
    hours: "24/7 Technical Support",
  }
];

const enquiryTypes = [
  { id: "fleet", label: "Fleet Tracking" },
  { id: "personal", label: "Personal Vehicle" },
  { id: "asset", label: "Asset Tracking" },
  { id: "support", label: "Technical Support" },
  { id: "demo", label: "Request a Demo" },
  { id: "general", label: "General Enquiry" },
];

export default function ContactPage() {
  usePageMeta("Contact Travio | Get a Quote for GPS Tracking", "Get in touch with Travio for GPS tracking quotes, fleet management enquiries, or technical support. Call us or fill in our contact form.");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    enquiryType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    setIsSubmitted(true);
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Get In Touch</p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              We'd love to <span className="italic-accent">hear</span> from you
            </h1>
            <p className="text-lg text-muted-foreground">
              Whether you have a question about our platform, need a custom quote for your fleet, 
              or require technical assistance, our experts are ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-border rounded-sm p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="h-8 w-8 text-accent" />
                  </motion.div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for getting in touch. We'll respond to your enquiry within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <div className="bg-card border border-border rounded-sm p-8">
                  <h2 className="font-serif text-2xl text-foreground mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Enquiry Type */}
                    <div>
                      <label className="text-sm text-muted-foreground mb-3 block">What's your enquiry about?</label>
                      <div className="flex flex-wrap gap-2">
                        {enquiryTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, enquiryType: type.id }))}
                            className={cn(
                              "px-4 py-2 rounded-full text-sm border transition-all",
                              formData.enquiryType === type.id
                                ? "border-accent bg-accent/10 text-foreground"
                                : "border-border text-muted-foreground hover:border-accent/50"
                            )}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">First Name *</label>
                        <Input
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="bg-secondary border-border"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Last Name *</label>
                        <Input
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="bg-secondary border-border"
                        />
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Email *</label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="bg-secondary border-border"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="bg-secondary border-border"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Your Message *</label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="How can we help you?"
                        className="bg-secondary border-border min-h-[150px]"
                      />
                    </div>

                    <Button type="submit" className="w-full btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>

            {/* Offices */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-2xl text-foreground mb-6">Our Presence</h2>
              <div className="space-y-6">
                {offices.map((office, idx) => (
                  <motion.div
                    key={office.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-card border border-border rounded-sm hover:border-accent/30 transition-colors"
                  >
                    <h3 className="font-serif text-xl text-foreground mb-4">{office.name}</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                        <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-foreground hover:text-accent transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-foreground hover:text-accent transition-colors">
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{office.hours}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-96 bg-secondary relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
            <p className="text-muted-foreground">Interactive service coverage map coming soon</p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
