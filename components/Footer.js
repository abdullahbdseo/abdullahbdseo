// components/Footer.js - Master 4-Column Footer

import Link from "next/link";
import { siteSettings, freeTools } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="digi-footer">
      <div className="container">
        <div className="digi-footer-grid">
          {/* Col 1: Brand, Bio & CTA */}
          <div className="digi-footer-col digi-footer-brand">
            <div className="digi-footer-logo">
              <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px", color: "#ffffff" }}>
                <div style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.22)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: "#ffffff"
                }}>
                  {siteSettings.expert_name.substring(0, 2).toUpperCase()}
                </div>
                <span style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#ffffff" }}>
                  {siteSettings.site_name}
                </span>
              </Link>
            </div>
            <p style={{ marginTop: "12px", marginBottom: "20px", fontSize: "0.92rem", lineHeight: "1.6", color: "rgba(255, 255, 255, 0.9)" }}>
              {siteSettings.expert_bio}
            </p>
            <div>
              <Link href="/contact" className="btn-footer-cta" style={{
                borderRadius: "8px",
                padding: "10px 22px",
                fontWeight: 700,
                background: "#ffffff",
                color: "#1e40af",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                boxShadow: "0 4px 15px rgba(0,0,0,0.12)"
              }}>
                Contact Now <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Col 2: Connect */}
          <div className="digi-footer-col">
            <h4>Connect</h4>
            <ul className="digi-footer-links">
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/about">About Me</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/portfolio">Case Studies</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Col 3: Free Tools */}
          <div className="digi-footer-col">
            <h4>Free SEO Tools</h4>
            <ul className="digi-footer-links">
              {freeTools.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`}>{tool.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/tools" style={{ color: "#60a5fa", fontWeight: 700 }}>
                  View All 10 Free Tools &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="digi-footer-col">
            <h4>Legal</h4>
            <ul className="digi-footer-links">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/refund-policy">Refund Policy</Link></li>
              <li><Link href="/login" style={{ color: "rgba(255,255,255,0.6)" }}><i className="fa-solid fa-shield-halved"></i> Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="digi-footer-bottom">
          <div>&copy; {currentYear} <strong>{siteSettings.expert_name}</strong>. All rights reserved.</div>
          <div className="digi-footer-legal">
            <Link href="/tools">All Free Tools</Link>
            <span>&bull;</span>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/terms">Terms of Service</Link>
            <span>&bull;</span>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
