"use client";

import { useState } from "react";
import Image from "next/image";
import { siteSettings } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    service_interest: "Technical SEO Audit",
    budget: "$1,000 - $3,000",
    message: ""
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({
          name: "",
          email: "",
          website: "",
          service_interest: "Technical SEO Audit",
          budget: "$1,000 - $3,000",
          message: ""
        });
      } else {
        setStatus({ loading: false, success: false, error: data.error || "Failed to send inquiry" });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Network error. Please try again." });
    }
  };

  return (
    <div className="contact-page">
      {/* PAGE HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="sub-badge">Get In Touch</div>
          <h1 className="page-title">Let&apos;s Build Your Search Dominance</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Have questions about an audit, need an enterprise proposal, or want to discuss a monthly retainer? Send a message below.
          </p>
        </div>
      </section>

      {/* CONTACT BODY */}
      <section className="section-padding">
        <div className="container">
          <div className="contact-layout-grid">
            {/* DIRECT INFO COLUMN */}
            <div className="contact-info-col">
              <div className="contact-info-card">
                <div className="info-expert-header">
                  <Image 
                    src={siteSettings.profile_photo} 
                    alt={siteSettings.expert_name} 
                    width={70} 
                    height={70} 
                    className="info-expert-img"
                  />
                  <div>
                    <h3 className="info-expert-name">{siteSettings.expert_name}</h3>
                    <p className="info-expert-title">{siteSettings.expert_title}</p>
                  </div>
                </div>

                <div className="info-channels-list mt-8">
                  <div className="info-channel-item">
                    <div className="channel-icon bg-primary-light">
                      <i className="fa-solid fa-envelope text-primary"></i>
                    </div>
                    <div>
                      <span className="channel-lbl">Email Inquiries</span>
                      <a href={`mailto:${siteSettings.contact_email}`} className="channel-val">
                        {siteSettings.contact_email}
                      </a>
                    </div>
                  </div>

                  <div className="info-channel-item">
                    <div className="channel-icon bg-success-light">
                      <i className="fa-brands fa-whatsapp text-success"></i>
                    </div>
                    <div>
                      <span className="channel-lbl">WhatsApp Direct</span>
                      <a href={`https://wa.me/${siteSettings.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="channel-val">
                        {siteSettings.contact_phone}
                      </a>
                    </div>
                  </div>

                  <div className="info-channel-item">
                    <div className="channel-icon bg-info-light">
                      <i className="fa-solid fa-clock text-info"></i>
                    </div>
                    <div>
                      <span className="channel-lbl">Business Hours</span>
                      <span className="channel-val">{siteSettings.working_hours}</span>
                    </div>
                  </div>

                  <div className="info-channel-item">
                    <div className="channel-icon bg-warning-light">
                      <i className="fa-solid fa-location-dot text-warning"></i>
                    </div>
                    <div>
                      <span className="channel-lbl">Office HQ</span>
                      <span className="channel-val">{siteSettings.office_address}</span>
                    </div>
                  </div>
                </div>

                <div className="info-social-links mt-8">
                  <span className="social-links-label">Connect Online:</span>
                  <div className="social-icons-row">
                    <a href={siteSettings.social_linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href={siteSettings.social_twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a href={siteSettings.social_github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM COLUMN */}
            <div className="contact-form-col">
              <div className="contact-form-card">
                <h3 className="form-card-title">Send a Direct Inquiry</h3>
                <p className="form-card-sub">Fill in your website details and I&apos;ll review your domain before getting back to you.</p>

                {status.success && (
                  <div className="alert-box alert-success my-6">
                    <i className="fa-solid fa-circle-check"></i>
                    <div>
                      <strong>Inquiry Received!</strong>
                      <p>Thank you. I have received your request and will review your website within 24 hours.</p>
                    </div>
                  </div>
                )}

                {status.error && (
                  <div className="alert-box alert-danger my-6">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <div>
                      <strong>Submission Error</strong>
                      <p>{status.error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form-fields mt-6">
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Your Full Name <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="e.g. Alex Morgan" 
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Work Email <span className="text-danger">*</span></label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="alex@company.com" 
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Website URL <span className="text-danger">*</span></label>
                      <input 
                        type="url" 
                        name="website" 
                        required 
                        value={formData.website} 
                        onChange={handleChange} 
                        placeholder="https://yourwebsite.com" 
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Area of Interest</label>
                      <select 
                        name="service_interest" 
                        value={formData.service_interest} 
                        onChange={handleChange} 
                        className="form-select"
                      >
                        <option value="Technical SEO Audit">Comprehensive Technical SEO Audit</option>
                        <option value="On-Page & Keyword Strategy">On-Page & Keyword Strategy</option>
                        <option value="E-Commerce Store Optimization">E-Commerce Store Optimization</option>
                        <option value="Monthly Growth Retainer">Monthly Growth Retainer</option>
                        <option value="Penalty Recovery & Migration">Site Migration / Penalty Recovery</option>
                        <option value="Other Consultation">Other Custom Strategy</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Estimated Monthly SEO Budget</label>
                    <select 
                      name="budget" 
                      value={formData.budget} 
                      onChange={handleChange} 
                      className="form-select"
                    >
                      <option value="Under $1,000">Under $1,000 (One-Time Deliverable)</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000 / month</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000 / month</option>
                      <option value="$5,000+">$5,000+ / month (Enterprise)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tell Me About Your Growth Goals & Blockers <span className="text-danger">*</span></label>
                    <textarea 
                      name="message" 
                      rows={5} 
                      required 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Briefly describe your current search challenges, traffic drops, competitor landscape, or goals..." 
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status.loading} 
                    className="btn btn-primary btn-lg w-full"
                  >
                    {status.loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i> Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane"></i> Send Consultation Request
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
