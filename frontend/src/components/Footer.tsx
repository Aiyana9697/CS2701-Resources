import React from "react";
import { Waves, Mail, Github, Linkedin, Twitter } from "lucide-react";
import "./Footer.css"; // Import the CSS file

const footerLinks = {
  platform: [
    { label: "About", href: "#about" },
    { label: "Data Policy", href: "#policy" },
    { label: "Contact", href: "#contact" },
    { label: "Accessibility", href: "#accessibility" },
  ],
  resources: [
    { label: "SDG14 Goals", href: "#sdg14" },
    { label: "ISA Collaboration", href: "#isa" },
    { label: "UN Ocean Decade", href: "#un-ocean" },
    { label: "Research Partners", href: "#partners" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookie Policy", href: "#cookies" },
    { label: "API Documentation", href: "#api" },
  ],
};

const partners = [
  "International Seabed Authority",
  "UN Ocean Decade",
  "Global Ocean Research Institute",
  "Marine Conservation Alliance",
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <Waves size={24} />
              </div>
              <span>OceanSDG</span>
            </div>
            <p>
              A unified digital platform bridging science, policy, and public
              awareness for sustainable ocean conservation.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link">
                <Twitter size={16} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={16} />
              </a>
              <a href="#" className="social-link">
                <Github size={16} />
              </a>
              <a href="#" className="social-link">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="footer-column">
            <h4>Platform</h4>
            <ul>
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Partners Section */}
        <div className="footer-partners">
          <h4>Our Partners</h4>
          <div className="partners-list">
            {partners.map((partner, index) => (
              <div key={index} className="partner-item">
                {partner}
              </div>
            ))}
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© 2025 OceanSDG Platform. All rights reserved.</p>
          <p>
            Built with commitment to{" "}
            <span className="highlight">SDG14: Life Below Water</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
