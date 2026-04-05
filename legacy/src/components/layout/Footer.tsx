import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { TravioLogo } from "./TravioLogo";

const footerLinks = {
  products: [
    { label: "Vehicle Trackers", href: "/products" },
    { label: "Magnetic Trackers", href: "/products" },
    { label: "Portable Trackers", href: "/products" },
    { label: "Insurance Trackers", href: "/products" },
  ],
  solutions: [
    { label: "Fleet Tracking", href: "/fleet" },
    { label: "Driver ID", href: "/fleet" },
    { label: "Temperature Monitoring", href: "/fleet" },
    { label: "GPSLive Platform", href: "/platform" },
  ],
  resources: [
    { label: "Reports & Analytics", href: "/platform" },
    { label: "Mobile App", href: "/platform" },
    { label: "Blog", href: "/blog" },
    { label: "Help Centre", href: "/contact" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about/team" },
    { label: "News", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/travio", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/travio", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/travio", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/travio", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-border/30">
      <div className="container-premium py-12 md:section-padding">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <TravioLogo size="sm" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Smart GPS tracking solutions for vehicles, fleets, and assets. Real-time monitoring with the GPSLive platform, trusted by 2,000+ businesses across 185 countries.
            </p>
            <div className="space-y-3">
              <a href="tel:0800TRAVIO" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span>0800 TRAVIO</span>
              </a>
              <a href="mailto:hello@travio.io" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <span>hello@travio.io</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>London, United Kingdom</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-primary mb-4">Products</h4>
            <ul className="space-y-2.5">
              {footerLinks.products.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-primary mb-4">Solutions</h4>
            <ul className="space-y-2.5">
              {footerLinks.solutions.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-primary mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-primary mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30">
        <div className="container-premium py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Travio. All rights reserved.
          </div>
          
          <div className="flex items-center gap-3">
            {socialLinks.map(social => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-9 md:h-9 rounded-sm bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors" aria-label={social.label}>
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
