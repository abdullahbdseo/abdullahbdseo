"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";

const CATEGORIES = [
  "Overview & Expertise",
  "Services & Solutions",
  "AI & GEO Search",
  "Timelines & ROI",
  "Guarantees & Methodology",
  "Tech Stack & CMS",
  "Technical Audits",
  "Pricing & Invoicing",
  "Backlinks & PR",
  "Consultation & Onboarding",
  "General",
];

export default function AdminFaqsPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [faqs, setFaqs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  const emptyFaq = { id: Date.now(), category: "General", question: "", answer: "" };

  useEffect(() => {
    if (data?.faqs) setFaqs(data.faqs);
  }, [data]);

  const filtered = faqs.filter(
    (f) =>
      f.question?.toLowerCase().includes(searchQ.toLowerCase()) ||
      f.category?.toLowerCase().includes(searchQ.toLowerCase())
  );

  const handleSave = async (updated) => {
    setFaqs(updated);
    await saveSection("faqs", updated);
  };

  const handleAdd = async (form) => {
    const updated = [...faqs, { ...form, id: Date.now() }];
    await handleSave(updated);
    setShowForm(false);
  };

  const handleUpdate = async (form) => {
    const updated = faqs.map((f) => (f.id === form.id ? form : f));
    await handleSave(updated);
    setEditItem(null);
  };

  const handleDelete = async (id) => {
    const updated = faqs.filter((f) => f.id !== id);
    await handleSave(updated);
    setDeleteId(null);
  };

  const moveUp = async (idx) => {
    if (idx === 0) return;
    const updated = [...faqs];
    [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
    await handleSave(updated);
  };

  const moveDown = async (idx) => {
    if (idx === faqs.length - 1) return;
    const updated = [...faqs];
    [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
    await handleSave(updated);
  };

  if (loading)
    return (
      <div className="text-slate-400 py-20 text-center">
        <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading FAQs...
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">FAQ Management</h1>
          <p className="text-slate-400 text-sm mt-1">{faqs.length} questions configured</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditItem(null); }}
          className="btn btn-primary px-5 py-2.5 rounded-lg font-semibold text-sm"
        >
          <i className="fa-solid fa-plus mr-2"></i>Add FAQ
        </button>
      </div>

      {/* Status */}
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

      {/* Form */}
      {(showForm || editItem) && (
        <FaqForm
          initial={editItem || emptyFaq}
          categories={CATEGORIES}
          onSave={editItem ? handleUpdate : handleAdd}
          onCancel={() => { setShowForm(false); setEditItem(null); }}
          saving={saving}
          isEdit={!!editItem}
        />
      )}

      {/* Search */}
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filtered.map((faq, idx) => (
          <div key={faq.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/15 text-primary text-xs px-2.5 py-0.5 rounded-full font-semibold shrink-0">
                    {faq.category}
                  </span>
                  <span className="text-slate-600 text-xs">#{idx + 1}</span>
                </div>
                <p className="font-semibold text-white text-sm mb-1.5">{faq.question}</p>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{faq.answer}</p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <div className="flex gap-1 mb-1">
                  <button onClick={() => moveUp(faqs.indexOf(faq))} className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white transition text-xs flex items-center justify-center">
                    <i className="fa-solid fa-chevron-up"></i>
                  </button>
                  <button onClick={() => moveDown(faqs.indexOf(faq))} className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white transition text-xs flex items-center justify-center">
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                </div>
                <button
                  onClick={() => { setEditItem(faq); setShowForm(false); }}
                  className="text-xs text-cyan-400 hover:text-white px-2 py-1 rounded hover:bg-slate-700 transition"
                >
                  <i className="fa-solid fa-pen-to-square mr-1"></i>Edit
                </button>
                <button
                  onClick={() => setDeleteId(faq.id)}
                  className="text-xs text-rose-400 hover:text-white px-2 py-1 rounded hover:bg-rose-500/20 transition"
                >
                  <i className="fa-solid fa-trash mr-1"></i>Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-slate-500 py-12 bg-slate-800 border border-slate-700 rounded-xl">
            No FAQs found.
          </div>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-rose-500/15 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                <i className="fa-solid fa-trash"></i>
              </div>
              <h3 className="text-white font-bold">Delete FAQ?</h3>
              <p className="text-slate-400 text-sm mt-1">This cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm transition">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} disabled={saving} className="flex-1 px-4 py-2.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 text-sm font-semibold transition">
                {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FaqForm({ initial, categories, onSave, onCancel, saving, isEdit }) {
  const [form, setForm] = useState({ ...initial });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="bg-slate-800 border border-primary/40 rounded-xl overflow-hidden shadow-lg shadow-primary/10">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700 bg-slate-900/50">
        <h2 className="font-bold text-white text-sm">
          <i className="fa-solid fa-circle-question mr-2 text-primary"></i>
          {isEdit ? "Edit FAQ" : "Add New FAQ"}
        </h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-white text-sm">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-5 space-y-4">
        <div>
          <label className="field-label">Category</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)}
            className="cms-input">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="field-label">Question *</label>
          <input type="text" required value={form.question} onChange={(e) => set("question", e.target.value)}
            className="cms-input" placeholder="e.g. How long does SEO take to show results?" />
        </div>
        <div>
          <label className="field-label">Answer *</label>
          <textarea rows={4} required value={form.answer} onChange={(e) => set("answer", e.target.value)}
            className="cms-input resize-y" placeholder="Write a detailed, helpful answer..." />
        </div>
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm transition">Cancel</button>
          <button type="submit" disabled={saving} className="btn btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold">
            {saving ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Saving...</> : <><i className="fa-solid fa-floppy-disk mr-2"></i>{isEdit ? "Update FAQ" : "Add FAQ"}</>}
          </button>
        </div>
      </form>
    </div>
  );
}
