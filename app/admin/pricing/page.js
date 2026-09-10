"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";

export default function AdminPricingPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [plans, setPlans] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(null);

  const emptyPlan = {
    id: Date.now(),
    name: "",
    tagline: "",
    price: 0,
    billing_cycle: "/month",
    is_popular: false,
    features: [""],
  };

  useEffect(() => {
    if (data?.pricingPlans) setPlans(data.pricingPlans);
  }, [data]);

  const handleSave = async (updated) => {
    setPlans(updated);
    await saveSection("pricingPlans", updated);
  };

  const handleAdd = async (form) => {
    const updated = [...plans, { ...form, id: Date.now() }];
    await handleSave(updated);
    setShowAdd(false);
  };

  const handleUpdate = async (form, idx) => {
    const updated = plans.map((p, i) => (i === idx ? form : p));
    await handleSave(updated);
    setEditIdx(null);
  };

  const handleDelete = async (idx) => {
    const updated = plans.filter((_, i) => i !== idx);
    await handleSave(updated);
    setDeleteIdx(null);
  };

  if (loading)
    return (
      <div className="text-slate-400 py-20 text-center">
        <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading pricing plans...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Pricing Plans</h1>
          <p className="text-slate-400 text-sm mt-1">{plans.length} plans configured</p>
        </div>
        <button
          onClick={() => { setShowAdd(true); setEditIdx(null); }}
          className="btn btn-primary px-5 py-2.5 rounded-lg font-semibold text-sm"
        >
          <i className="fa-solid fa-plus mr-2"></i>Add Plan
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

      {showAdd && (
        <PlanForm
          initial={emptyPlan}
          onSave={handleAdd}
          onCancel={() => setShowAdd(false)}
          saving={saving}
          isEdit={false}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {plans.map((plan, idx) => (
          editIdx === idx ? (
            <div key={plan.id || idx} className="md:col-span-2 xl:col-span-3">
              <PlanForm
                initial={plan}
                onSave={(form) => handleUpdate(form, idx)}
                onCancel={() => setEditIdx(null)}
                saving={saving}
                isEdit={true}
              />
            </div>
          ) : (
            <div key={plan.id || idx} className={`bg-slate-800 border rounded-xl p-5 space-y-4 ${plan.is_popular ? "border-primary shadow-lg shadow-primary/15" : "border-slate-700"}`}>
              {plan.is_popular && (
                <div className="text-xs bg-primary text-white font-bold px-3 py-1 rounded-full w-fit">⭐ Most Popular</div>
              )}
              <div>
                <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                <p className="text-slate-400 text-xs mt-1">{plan.tagline}</p>
              </div>
              <div className="text-3xl font-bold text-white">
                ${plan.price}<span className="text-base text-slate-400 font-normal">{plan.billing_cycle}</span>
              </div>
              <ul className="space-y-1.5">
                {(plan.features || []).map((f, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <i className="fa-solid fa-check text-emerald-400 mt-0.5 shrink-0"></i>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 pt-2 border-t border-slate-700">
                <button onClick={() => { setEditIdx(idx); setShowAdd(false); }}
                  className="flex-1 text-xs text-cyan-400 hover:text-white px-3 py-2 rounded hover:bg-slate-700 transition">
                  <i className="fa-solid fa-pen-to-square mr-1"></i>Edit
                </button>
                <button onClick={() => setDeleteIdx(idx)}
                  className="flex-1 text-xs text-rose-400 hover:text-white px-3 py-2 rounded hover:bg-rose-500/20 transition">
                  <i className="fa-solid fa-trash mr-1"></i>Delete
                </button>
              </div>
            </div>
          )
        ))}
      </div>

      {deleteIdx !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-rose-500/15 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                <i className="fa-solid fa-trash"></i>
              </div>
              <h3 className="text-white font-bold">Delete Plan?</h3>
              <p className="text-slate-400 text-sm mt-1">This cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteIdx(null)} className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteIdx)} disabled={saving} className="flex-1 px-4 py-2.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 text-sm font-semibold">
                {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlanForm({ initial, onSave, onCancel, saving, isEdit }) {
  const [form, setForm] = useState({ ...initial, features: [...(initial.features || [])] });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const updateFeature = (i, val) => {
    const updated = [...form.features];
    updated[i] = val;
    set("features", updated);
  };
  const addFeature = () => set("features", [...form.features, ""]);
  const removeFeature = (i) => set("features", form.features.filter((_, idx) => idx !== i));

  return (
    <div className="bg-slate-800 border border-primary/40 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700 bg-slate-900/50">
        <h2 className="font-bold text-white text-sm">
          <i className="fa-solid fa-tags mr-2 text-primary"></i>
          {isEdit ? "Edit Plan" : "Add New Plan"}
        </h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-white text-sm"><i className="fa-solid fa-xmark"></i></button>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="field-label">Plan Name *</label>
            <input type="text" required value={form.name} onChange={(e) => set("name", e.target.value)} className="cms-input" />
          </div>
          <div>
            <label className="field-label">Price (USD) *</label>
            <input type="number" required min={0} value={form.price} onChange={(e) => set("price", Number(e.target.value))} className="cms-input" />
          </div>
          <div className="md:col-span-2">
            <label className="field-label">Tagline</label>
            <input type="text" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className="cms-input" />
          </div>
          <div>
            <label className="field-label">Billing Cycle</label>
            <input type="text" value={form.billing_cycle} onChange={(e) => set("billing_cycle", e.target.value)} className="cms-input" placeholder="/month or one-time" />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" id="popular" checked={!!form.is_popular} onChange={(e) => set("is_popular", e.target.checked)} className="w-4 h-4 accent-primary" />
            <label htmlFor="popular" className="text-sm text-slate-300">Mark as Most Popular</label>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="field-label mb-0">Features</label>
            <button type="button" onClick={addFeature} className="text-xs text-primary hover:text-white transition">
              <i className="fa-solid fa-plus mr-1"></i>Add Feature
            </button>
          </div>
          <div className="space-y-2">
            {form.features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={f} onChange={(e) => updateFeature(i, e.target.value)}
                  className="cms-input flex-1" placeholder={`Feature ${i + 1}`} />
                <button type="button" onClick={() => removeFeature(i)}
                  className="w-9 h-9 shrink-0 rounded-lg bg-rose-500/15 text-rose-400 hover:bg-rose-500/30 transition text-xs">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm">Cancel</button>
          <button type="submit" disabled={saving} className="btn btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold">
            {saving ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Saving...</> : <><i className="fa-solid fa-floppy-disk mr-2"></i>{isEdit ? "Update Plan" : "Add Plan"}</>}
          </button>
        </div>
      </form>
    </div>
  );
}
