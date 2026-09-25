"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";

export default function CurrencySwitcher({ isCompact = false }) {
  const { currency, setCurrency, allCurrencies, currencyInfo } = useCurrency();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="currency-switcher-wrapper" ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="currency-switcher-btn"
        aria-label="Select Currency"
        title="Switch Currency"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: isCompact ? "4px 8px" : "6px 10px",
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "var(--text-main, #1e293b)",
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid var(--border-color, #e2e8f0)",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          userSelect: "none"
        }}
      >
        <span style={{ fontSize: "1rem", lineHeight: 1 }}>{currencyInfo?.flag || "🌐"}</span>
        <span>{currency} ({currencyInfo?.symbol})</span>
        <i 
          className="fa-solid fa-chevron-down" 
          style={{ 
            fontSize: "0.65rem", 
            color: "#64748b",
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)" 
          }}
        ></i>
      </button>

      {open && (
        <div
          className="currency-dropdown-menu"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            zIndex: 9999,
            minWidth: "140px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "4px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
            padding: "4px"
          }}
        >
          <div style={{ padding: "4px 8px", fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Select Currency
          </div>
          {allCurrencies.map((c) => {
            const isSelected = c.code === currency;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCurrency(c.code);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "6px 8px",
                  fontSize: "0.8rem",
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? "#2563eb" : "#334155",
                  background: isSelected ? "#eff6ff" : "transparent",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s ease"
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "transparent";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>{c.flag}</span>
                  <span>{c.code}</span>
                </div>
                <span style={{ fontSize: "0.75rem", color: isSelected ? "#2563eb" : "#64748b", fontWeight: 600 }}>
                  {c.symbol}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
