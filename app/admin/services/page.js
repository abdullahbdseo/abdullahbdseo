"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";

export default function AdminServicesPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  const emptyService = {
    id: Date.now(),
    category_id: 1,
    title: "",
    slug: "",
    short_description: "",
    description: "",
    icon: "fa-star",
    is_featured: false,
    starting_price: 0,
    delivery_time: "5-7 Business Days",
    packages: [],
    faqs: [],
  };

  useEffect(() => {
    if (data?.services) setServices(data.services);
  }, [data]);

  const filtered = services.filter(
    (s) =>
      s.title?.toLowerCase().includes(searchQ.toLowerCase()) ||
      s.short_description?.toLowerCase().includes(searchQ.toLowerCase())
  );

  const slugify = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async (updated) => {
    setServices(updated);
    await saveSection("services", updated);
  };

  const handleAdd = async (form) => {
    const item = { ...form, id: Date.now(), slug: form.slug || slugify(form.title) };
    await handleSave([...services, item]);
    setShowForm(false);
  };

  const handleUpdate = async (form) => {
    const updated = services.map((s) => (s.id === form.id ? form : s));
    await handleSave(updated);
    setEditItem(null);
  };

  const handleDelete = async (id) => {
    await handleSave(services.filter((s) => s.id !== id));
    setDeleteId(null);
  };

  const categoryLabel = (id) => {
    const map = { 1: "Technical & Auditing", 2: "On-Page & Content", 3: "E-Commerce", 4: "Off-Page & Authority" };
    return map[id] || `Category ${id}`;
  };

  if (loading)
    return (
      <div className="text-slate-400 py-20 text-center">
        <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading services...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-slate-400 text-sm mt-1">{services.length} services configured</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditItem(null); }}
          className="btn btn-primary px-5 py-2.5 rounded-lg font-semibold text-sm"
        >
          <i className="fa-solid fa-plus mr-2"></i>Add Service
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
        <ServiceForm
          initial={editItem || emptyService}
          onSave={editItem ? handleUpdate : handleAdd}
          onCancel={() => { setShowForm(false); setEditItem(null); }}
          saving={saving}
          isEdit={!!editItem}
        />
      )}

      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
        <input
          type="text"
          placeholder="Search services..."
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/60 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-5 py-3.5">Service</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Starting Price</th>
              <th className="px-5 py-3.5">Packages</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60">
            {filtered.map((svc) => (
              <tr key={svc.id} className="hover:bg-slate-700/30 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center text-sm shrink-0">
                      <i className={`fa-solid ${svc.icon}`}></i>
                    </div>
                    <div>
                      <div className="font-medium text-white">{svc.title}</div>
                      {svc.is_featured && <span className="text-xs text-amber-400">⭐ Featured</span>}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-400">{categoryLabel(svc.category_id)}</td>
                <td className="px-5 py-3.5 font-bold text-white">${svc.starting_price}</td>
                <td className="px-5 py-3.5 text-xs text-slate-400">{(svc.packages || []).length} packages</td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a href={`/services/${svc.slug}`} target="_blank" rel="noreferrer"
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-700 transition" title="View">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                    <button onClick={() => { setEditItem(svc); setShowForm(false); }}
                      className="text-xs text-cyan-400 hover:text-white px-2 py-1 rounded hover:bg-slate-700 transition">
                      <i className="fa-solid fa-pen-to-square mr-1"></i>Edit
                    </button>
                    <button onClick={() => setDeleteId(svc.id)}
                      className="text-xs text-rose-400 hover:text-white px-2 py-1 rounded hover:bg-rose-500/20 transition">
                      <i className="fa-solid fa-trash mr-1"></i>Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-500">No services found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-rose-500/15 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                <i className="fa-solid fa-trash"></i>
              </div>
              <h3 className="text-white font-bold">Delete Service?</h3>
              <p className="text-slate-400 text-sm mt-1">This will remove it from the website.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700 text-slate-300 text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} disabled={saving} className="flex-1 px-4 py-2.5 rounded-lg bg-rose-500 text-white text-sm font-semibold">
                {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceForm({ initial, onSave, onCancel, saving, isEdit }) {
  const [form, setForm] = useState({ ...initial });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="bg-slate-800 border border-primary/40 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700 bg-slate-900/50">
        <h2 className="font-bold text-white text-sm">
          <i className="fa-solid fa-briefcase mr-2 text-primary"></i>
          {isEdit ? "Edit Service" : "Add New Service"}
        </h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-white text-sm"><i className="fa-solid fa-xmark"></i></button>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="field-label">Title *</label>
            <input type="text" required value={form.title} onChange={(e) => set("title", e.target.value)} className="cms-input" />
          </div>
          <div>
            <label className="field-label">Slug</label>
            <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className="cms-input font-mono text-xs" />
          </div>
          <div>
            <label className="field-label">Icon (FA class)</label>
            <input type="text" value={form.icon} onChange={(e) => set("icon", e.target.value)} className="cms-input font-mono text-xs" placeholder="fa-magnifying-glass" />
          </div>
          <div>
            <label className="field-label">Category</label>
            <select value={form.category_id} onChange={(e) => set("category_id", Number(e.target.value))} className="cms-input">
              <option value={1}>Technical & Auditing</option>
              <option value={2}>On-Page & Content</option>
              <option value={3}>E-Commerce & Specialized</option>
              <option value={4}>Off-Page & Authority</option>
            </select>
          </div>
          <div>
            <label className="field-label">Starting Price (USD)</label>
            <input type="number" min={0} value={form.starting_price} onChange={(e) => set("starting_price", Number(e.target.value))} className="cms-input" />
          </div>
          <div>
            <label className="field-label">Delivery Time</label>
            <input type="text" value={form.delivery_time} onChange={(e) => set("delivery_time", e.target.value)} className="cms-input" placeholder="5-7 Business Days" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="featured" checked={!!form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="w-4 h-4 accent-primary" />
            <label htmlFor="featured" className="text-sm text-slate-300">Mark as Featured</label>
          </div>
        </div>

        <div>
          <label className="field-label">Short Description *</label>
          <input type="text" required value={form.short_description} onChange={(e) => set("short_description", e.target.value)} className="cms-input" />
        </div>

        <div>
          <label className="field-label">Full Description</label>
          <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} className="cms-input resize-y" />
        </div>

        <div className="bg-slate-900/40 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-2">
            <i className="fa-solid fa-circle-info mr-1 text-primary"></i>
            Packages and service FAQs are managed here as JSON. For advanced editing, use the data.js file directly or update from the API.
          </p>
          <label className="field-label">Packages (JSON)</label>
          <textarea
            rows={5}
            value={JSON.stringify(form.packages || [], null, 2)}
            onChange={(e) => {
              try { set("packages", JSON.parse(e.target.value)); } catch {}
            }}
            className="cms-input font-mono text-xs resize-y"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-lg bg-slate-700 text-slate-300 text-sm">Cancel</button>
          <button type="submit" disabled={saving} className="btn btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold">
            {saving ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Saving...</> : <><i className="fa-solid fa-floppy-disk mr-2"></i>{isEdit ? "Update Service" : "Add Service"}</>}
          </button>
        </div>
      </form>
    </div>
  );
}
