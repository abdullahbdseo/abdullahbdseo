// lib/useCMS.js - CMS hook for admin pages to load/save data
"use client";

import { useState, useEffect, useCallback } from "react";

const CMS_TOKEN = "cms_admin_secret_2026";
const LS_KEY = "cms_data_cache";

export function useCMS() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saveMsg, setSaveMsg] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/cms", {
        headers: { "x-cms-token": CMS_TOKEN },
      });
      if (!res.ok) throw new Error("Failed to load CMS data");
      const json = await res.json();
      setData(json.data);
      // Cache in localStorage as backup
      if (typeof window !== "undefined") {
        localStorage.setItem(LS_KEY, JSON.stringify(json.data));
      }
    } catch (err) {
      // Fallback to localStorage cache
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(LS_KEY);
        if (cached) {
          setData(JSON.parse(cached));
          setError("Using cached data (API unavailable)");
        } else {
          setError(err.message);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveSection = useCallback(async (section, value) => {
    setSaving(true);
    setSaveMsg(null);
    setError(null);
    try {
      // Update localStorage immediately
      if (typeof window !== "undefined") {
        const cached = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
        cached[section] = value;
        localStorage.setItem(LS_KEY, JSON.stringify(cached));
      }

      // Save to file via API
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cms-token": CMS_TOKEN,
        },
        body: JSON.stringify({ section, value }),
      });
      if (!res.ok) throw new Error("Save failed");
      const json = await res.json();
      setSaveMsg(json.message || "Saved successfully!");
      // Update local state
      setData((prev) => ({ ...prev, [section]: value }));
    } catch (err) {
      setError("File save failed, but cached in browser.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(null), 3000);
    }
  }, []);

  return { data, loading, saving, error, saveMsg, saveSection, refetch: fetchData };
}
