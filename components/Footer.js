"use client";
// components/Footer.js - Master Footer with Newsletter Ribbon and 4-Column Navigation

import { useState } from "react";
import Link from "next/link";
import { siteSettings, freeTools } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <>
      {/* 1. NEWSLETTER / QUICK SUBSCRIPTION BANNER */}
      <section className="digi-newsletter-ribbon">
        <div className="container">
          <div className="newsletter-flex-box">
            <div className="newsletter-text">
              <h3>Join Our Newsletter for Weekly SEO Trends and Algorithm Updates</h3>
            </div>
            <div className="newsletter-form-wrapper">
              {newsletterSubscribed ? (
                <div style={{ color: "#ffffff", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", padding: "10px 18px", borderRadius: "6px" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#34d399" }}></i>
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form className="newsletter-form-inline" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="newsletter-input"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <button type="submit" className="btn btn-aqua-solid">Subscribe</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. MASTER 4-COLUMN FOOTER */}
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
                    borderRadius: "4px",
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
                  borderRadius: "4px",
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
    </>
  );
}
