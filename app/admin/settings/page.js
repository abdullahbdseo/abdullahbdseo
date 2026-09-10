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

  if (loading) return <div className="text-slate-400 py-20 text-center"><i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading settings...</div>;
  if (!form) return <div className="text-slate-400 py-20 text-center">Failed to load settings.</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your brand, contact, and SEO settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary px-6 py-2.5 rounded-lg font-semibold text-sm"
        >
          {saving ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Saving...</> : <><i className="fa-solid fa-floppy-disk mr-2"></i>Save Changes</>}
        </button>
      </div>

      {/* Status messages */}
      {saveMsg && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <i className="fa-solid fa-circle-check"></i> {saveMsg}
        </div>
      )}
      {error && (
        <div className="bg-amber-500/15 border border-amber-500/30 text-amber-300 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation"></i> {error}
        </div>
      )}

      {/* Field Groups */}
      {FIELD_GROUPS.map((group) => (
        <div key={group.label} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-700 bg-slate-900/40">
            <i className={`fa-solid ${group.icon} text-primary`}></i>
            <h2 className="font-semibold text-white text-sm">{group.label}</h2>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.fields.map((field) => (
              <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={form[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary resize-y"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={form[field.key] || ""}
                    onChange={(e) =>
                      handleChange(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bottom save */}
      <div className="flex justify-end pb-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary px-8 py-3 rounded-lg font-semibold"
        >
          {saving ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Saving...</> : <><i className="fa-solid fa-floppy-disk mr-2"></i>Save All Settings</>}
        </button>
      </div>
    </div>
  );
}
