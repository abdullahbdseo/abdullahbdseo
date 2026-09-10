"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";

const CATEGORIES = ["SEO & Analysis", "Calculators & ROI", "Generators & Writers", "Checkers & Validators"];
const COLORS = ["#4361ee", "#06b6d4", "#059669", "#e11d48", "#f59e0b", "#8b5cf6", "#2563eb", "#dc2626"];

export default function AdminToolsPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [tools, setTools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteSlug, setDeleteSlug] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  const emptyTool = {
    slug: "",
    title: "",
    desc: "",
    icon: "fa-wrench",
    color: "#4361ee",
    bg: "#eef2ff",
    category: "SEO & Analysis",
  };

  useEffect(() => {
    if (data?.freeTools) setTools(data.freeTools);
  }, [data]);

  const filtered = tools.filter(
    (t) =>
      t.title?.toLowerCase().includes(searchQ.toLowerCase()) ||
      t.category?.toLowerCase().includes(searchQ.toLowerCase())
  );

  const handleSave = async (updated) => {
    setTools(updated);
    await saveSection("freeTools", updated);
  };

  const handleAdd = async (form) => {
    const updated = [...tools, form];
    await handleSave(updated);
    setShowForm(false);
  };

  const handleUpdate = async (form) => {
    const updated = tools.map((t) => (t.slug === form.slug ? form : t));
    await handleSave(updated);
    setEditItem(null);
  };

  const handleDelete = async (slug) => {
    const updated = tools.filter((t) => t.slug !== slug);
    await handleSave(updated);
    setDeleteSlug(null);
  };

  if (loading)
    return (
      <div className="text-slate-400 py-20 text-center">
        <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading tools...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Free Tools</h1>
          <p className="text-slate-400 text-sm mt-1">{tools.length} tools available</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditItem(null); }}
          className="btn btn-primary px-5 py-2.5 rounded-lg font-semibold text-sm"
        >
          <i className="fa-solid fa-plus mr-2"></i>Add Tool
        </button>
      </div>

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

      {(showForm || editItem) && (
        <ToolForm
          initial={editItem || emptyTool}
          categories={CATEGORIES}
          colors={COLORS}
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
          placeholder="Search tools..."
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {/* Tools Grid */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/60 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-5 py-3.5">Tool</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Slug / URL</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60">
            {filtered.map((tool) => (
              <tr key={tool.slug} className="hover:bg-slate-700/30 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm" style={{ background: tool.bg, color: tool.color }}>
                      <i className={`fa-solid ${tool.icon}`}></i>
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{tool.title}</div>
                      <div className="text-xs text-slate-500">{tool.desc}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="bg-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded-full">{tool.category}</span>
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-cyan-400">/tools/{tool.slug}</td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => { setEditItem(tool); setShowForm(false); }}
                      className="text-xs text-cyan-400 hover:text-white px-2 py-1 rounded hover:bg-slate-700 transition">
                      <i className="fa-solid fa-pen-to-square mr-1"></i>Edit
                    </button>
                    <button onClick={() => setDeleteSlug(tool.slug)}
                      className="text-xs text-rose-400 hover:text-white px-2 py-1 rounded hover:bg-rose-500/20 transition">
                      <i className="fa-solid fa-trash mr-1"></i>Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-slate-500">No tools found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirm */}
      {deleteSlug && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-rose-500/15 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                <i className="fa-solid fa-trash"></i>
              </div>
              <h3 className="text-white font-bold">Delete Tool?</h3>
              <p className="text-slate-400 text-sm mt-1">This removes it from the tools listing.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteSlug(null)} className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700 text-slate-300 text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteSlug)} disabled={saving} className="flex-1 px-4 py-2.5 rounded-lg bg-rose-500 text-white text-sm font-semibold">
                {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolForm({ initial, categories, colors, onSave, onCancel, saving, isEdit }) {
  const [form, setForm] = useState({ ...initial });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="bg-slate-800 border border-primary/40 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700 bg-slate-900/50">
        <h2 className="font-bold text-white text-sm">
          <i className="fa-solid fa-screwdriver-wrench mr-2 text-primary"></i>
          {isEdit ? "Edit Tool" : "Add New Tool"}
        </h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-white text-sm"><i className="fa-solid fa-xmark"></i></button>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="field-label">Tool Title *</label>
            <input type="text" required value={form.title} onChange={(e) => set("title", e.target.value)} className="cms-input" />
          </div>
          <div>
            <label className="field-label">Slug (URL path) *</label>
            <input type="text" required value={form.slug} onChange={(e) => set("slug", e.target.value)} className="cms-input font-mono text-xs" placeholder="e.g. keyword-density-checker" />
          </div>
          <div className="md:col-span-2">
            <label className="field-label">Short Description</label>
            <input type="text" value={form.desc} onChange={(e) => set("desc", e.target.value)} className="cms-input" />
          </div>
          <div>
            <label className="field-label">Category</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className="cms-input">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Font Awesome Icon Class</label>
            <input type="text" value={form.icon} onChange={(e) => set("icon", e.target.value)} className="cms-input font-mono text-xs" placeholder="fa-magnifying-glass" />
          </div>
          <div>
            <label className="field-label">Icon Color (hex)</label>
            <div className="flex gap-2">
              <input type="color" value={form.color} onChange={(e) => set("color", e.target.value)} className="w-10 h-10 rounded cursor-pointer bg-transparent border-0" />
              <input type="text" value={form.color} onChange={(e) => set("color", e.target.value)} className="cms-input flex-1 font-mono text-xs" />
            </div>
          </div>
          <div>
            <label className="field-label">Background Color (hex)</label>
            <div className="flex gap-2">
              <input type="color" value={form.bg} onChange={(e) => set("bg", e.target.value)} className="w-10 h-10 rounded cursor-pointer bg-transparent border-0" />
              <input type="text" value={form.bg} onChange={(e) => set("bg", e.target.value)} className="cms-input flex-1 font-mono text-xs" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-lg bg-slate-700 text-slate-300 text-sm">Cancel</button>
          <button type="submit" disabled={saving} className="btn btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold">
            {saving ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Saving...</> : <><i className="fa-solid fa-floppy-disk mr-2"></i>{isEdit ? "Update" : "Add Tool"}</>}
          </button>
        </div>
      </form>
    </div>
  );
}
