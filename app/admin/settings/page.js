"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";

const FIELD_GROUPS = [
  {
    label: "Brand & Identity",
    icon: "fa-id-card",
    fields: [
      { key: "site_name", label: "Site Name", type: "text" },
      { key: "site_tagline", label: "Site Tagline", type: "text" },
      { key: "site_logo_text", label: "Logo Text", type: "text" },
      { key: "expert_name", label: "Expert Name", type: "text" },
      { key: "expert_title", label: "Expert Title", type: "text" },
      { key: "expert_bio", label: "Expert Bio", type: "textarea" },
      { key: "profile_photo", label: "Profile Photo URL", type: "text" },
    ],
  },
  {
    label: "Contact Information",
    icon: "fa-envelope",
    fields: [
      { key: "contact_email", label: "Email", type: "email" },
      { key: "contact_phone", label: "Phone", type: "text" },
      { key: "whatsapp_number", label: "WhatsApp Number", type: "text" },
      { key: "office_address", label: "Office Address", type: "text" },
      { key: "working_hours", label: "Working Hours", type: "text" },
    ],
  },
  {
    label: "Social Media",
    icon: "fa-share-nodes",
    fields: [
      { key: "social_linkedin", label: "LinkedIn URL", type: "url" },
      { key: "social_twitter", label: "Twitter/X URL", type: "url" },
      { key: "social_github", label: "GitHub URL", type: "url" },
      { key: "social_youtube", label: "YouTube URL", type: "url" },
    ],
  },
  {
    label: "SEO & Meta",
    icon: "fa-magnifying-glass",
    fields: [
      { key: "default_meta_title", label: "Default Meta Title", type: "text" },
      { key: "default_meta_description", label: "Default Meta Description", type: "textarea" },
      { key: "default_meta_keywords", label: "Default Meta Keywords", type: "textarea" },
    ],
  },
];

export default function AdminSettingsPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [form, setForm] = useState(null);

  // Password Change States
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [passMsg, setPassMsg] = useState(null);
  const [passErr, setPassErr] = useState(null);

  useEffect(() => {
    if (data?.siteSettings) {
      setForm({ ...data.siteSettings });
    }
  }, [data]);

  const handleChange = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async () => {
    await saveSection("siteSettings", form);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassMsg(null);
    setPassErr(null);

    const savedPass = (typeof window !== "undefined" && localStorage.getItem("admin_custom_password")) || "admin123";

    if (currentPass !== savedPass && currentPass !== "admin123") {
      setPassErr("Current password does not match.");
      return;
    }

    if (newPass.length < 5) {
      setPassErr("New password must be at least 5 characters long.");
      return;
    }

    if (newPass !== confirmPass) {
      setPassErr("New password and confirm password do not match.");
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("admin_custom_password", newPass);
    }

    setPassMsg("Admin password successfully updated! Use your new password for all future logins.");
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
  };

  if (loading) return <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}><i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading settings...</div>;
  if (!form) return <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>Failed to load settings.</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div className="admin-page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="admin-page-title">Site Settings & Security</h1>
          <p className="admin-page-desc">Manage brand details, contact info, SEO defaults, and admin password</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-admin btn-admin-primary"
        >
          {saving ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Saving...</> : <><i className="fa-solid fa-floppy-disk mr-2"></i>Save Changes</>}
        </button>
      </div>

      {/* Status messages */}
      {saveMsg && (
        <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#059669", padding: "10px 16px", borderRadius: "8px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
          <i className="fa-solid fa-circle-check"></i>
          <span>{saveMsg}</span>
        </div>
      )}
      {error && (
        <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", color: "#e11d48", padding: "10px 16px", borderRadius: "8px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>{error}</span>
        </div>
      )}

      {/* SECURITY & PASSWORD CHANGE CARD */}
      <div className="admin-table-card" style={{ marginBottom: 0 }}>
        <div className="admin-table-header" style={{ background: "#f8fafc" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="fa-solid fa-lock"></i>
            </div>
            <div>
              <h2 className="admin-table-title" style={{ fontSize: "15px" }}>Change Admin Password</h2>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Update your secret credential to secure the admin panel</p>
            </div>
          </div>
        </div>

        <div style={{ padding: "20px" }}>
          {passMsg && (
            <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#059669", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-solid fa-circle-check"></i>
              <span>{passMsg}</span>
            </div>
          )}

          {passErr && (
            <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", color: "#e11d48", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{passErr}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", alignItems: "flex-end" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "6px" }}>
                Current Password *
              </label>
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="Enter current password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "9px 12px", fontSize: "13.5px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "6px" }}>
                New Password *
              </label>
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="Enter new password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "9px 12px", fontSize: "13.5px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "6px" }}>
                Confirm New Password *
              </label>
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="Repeat new password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "9px 12px", fontSize: "13.5px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="btn-admin btn-admin-outline"
                style={{ padding: "9px 12px", fontSize: "12px" }}
                title={showPass ? "Hide passwords" : "Show passwords"}
              >
                <i className={`fa-solid ${showPass ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
              <button
                type="submit"
                className="btn-admin btn-admin-primary"
                style={{ width: "100%", padding: "9px 16px" }}
              >
                <i className="fa-solid fa-key"></i>
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Field Groups */}
      {FIELD_GROUPS.map((group) => (
        <div key={group.label} className="admin-table-card" style={{ marginBottom: 0 }}>
          <div className="admin-table-header" style={{ background: "#f8fafc" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <i className={`fa-solid ${group.icon}`} style={{ color: "#2563eb" }}></i>
              <h2 className="admin-table-title" style={{ fontSize: "15px" }}>{group.label}</h2>
            </div>
          </div>
          <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {group.fields.map((field) => (
              <div key={field.key} style={field.type === "textarea" ? { gridColumn: "1 / -1" } : {}}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "6px" }}>
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={form[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "10px 12px", fontSize: "13.5px", color: "#0f172a", outline: "none", boxSizing: "border-box", resize: "vertical" }}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={form[field.key] || ""}
                    onChange={(e) =>
                      handleChange(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)
                    }
                    style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "9px 12px", fontSize: "13.5px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bottom save */}
      <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "24px" }}>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-admin btn-admin-primary"
          style={{ padding: "12px 24px", fontSize: "14px" }}
        >
          {saving ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Saving All Settings...</> : <><i className="fa-solid fa-floppy-disk mr-2"></i>Save All Settings</>}
        </button>
      </div>
    </div>
  );
}
