"use client";

import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { usePageMeta } from "@/lib/seo";

export default function PrivacyPage() {
  usePageMeta(
    "Privacy Policy | Travio GPS Tracking",
    "Read Travio's privacy policy. Learn how we collect, use, and protect your personal data when using our GPS tracking services.",
  );

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Legal</p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-6">
              Privacy <span className="italic-accent">Policy</span>
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl prose prose-invert prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground"
          >
            <h2>1. Introduction</h2>
            <p>
              Travio GPS Tracking ("we", "us", or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our GPS tracking services and applications.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect information about you in various ways, including:</p>
            <h3>Personal Data</h3>
            <ul>
              <li>Name, email address, phone number, and account configuration</li>
              <li>Vehicle information (make, model, registration)</li>
              <li>Payment information for subscription services</li>
              <li>Identification for account verification</li>
            </ul>
            <h3>GPS and Location Data</h3>
            <ul>
              <li>Real-time geographic location of tracked assets</li>
              <li>Historical route data and speed information</li>
              <li>Geofence entry and exit events</li>
              <li>Ignition status and engine diagnostics (where applicable)</li>
            </ul>
            <h3>Automatically Collected Data</h3>
            <ul>
              <li>IP address and browser type</li>
              <li>Usage patterns within our mobile and web applications</li>
              <li>Referring website addresses</li>
              <li>Device and operating system information</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide real-time tracking and reporting services</li>
              <li>Send automated alerts and notifications based on your settings</li>
              <li>Process subscriptions and manage your account</li>
              <li>Send you platform updates and technical support communications</li>
              <li>Comply with legal and security requirements</li>
              <li>Improve our algorithms and infrastructure performance</li>
            </ul>

            <h2>4. Legal Basis for Processing</h2>
            <p>We process your personal data under the following legal bases:</p>
            <ul>
              <li><strong>Consent:</strong> Where you have given explicit consent for specific features</li>
              <li><strong>Contract:</strong> Necessary to fulfill our tracking service obligations to you</li>
              <li><strong>Legal Obligation:</strong> Where required by law enforcement or regulatory bodies</li>
              <li><strong>Legitimate Interest:</strong> Improving service security and preventing fraud</li>
            </ul>

            <h2>5. Data Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Cloud infrastructure providers (storing your data securely)</li>
              <li>Payment processors (Stripe, etc. for billing)</li>
              <li>Map providers (Google Maps, OpenStreetMap for displaying locations)</li>
              <li>Law enforcement (only when legally required or requested by you in theft cases)</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>
              We retain tracking data for as long as necessary to provide your history or as 
              specified in your subscription plan. Standard account data is retained for the 
              duration of your membership and up to 6 years thereafter for compliance.
            </p>

            <h2>7. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul>
              <li>Access your personal and tracking data</li>
              <li>Rectify inaccurate account information</li>
              <li>Erase your data (subject to legal retention requirements)</li>
              <li>Restrict or object to specific processing</li>
              <li>Data portability (exporting your tracking history)</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>8. Cookies</h2>
            <p>
              Our platform uses cookies for session management and performance monitoring. 
              You can control these via browser settings.
            </p>

            <h2>9. Security</h2>
            <p>
              We implement industry-standard encryption (SSL/TLS) for data in transit and 
              robust security measures for data at rest to protect your sensitive location data.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your rights, 
              please contact us at:
            </p>
            <p>
              <strong>Travio GPS Tracking</strong><br />
              123 Tech Plaza<br />
              London, EC1A 1BB<br />
              Email: privacy@traviogps.com<br />
              Phone: 020 7123 4567
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy here and updating the "Last updated" date.
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
