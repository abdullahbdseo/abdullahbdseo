"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export const CURRENCY_RATES = {
  USD: { code: "USD", symbol: "$", rate: 1.0, label: "USD ($)", flag: "🇺🇸", prefix: true },
  BDT: { code: "BDT", symbol: "৳", rate: 120.0, label: "BDT (৳)", flag: "🇧🇩", prefix: false },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, label: "EUR (€)", flag: "🇪🇺", prefix: true },
  GBP: { code: "GBP", symbol: "£", rate: 0.79, label: "GBP (£)", flag: "🇬🇧", prefix: true }
};

const CurrencyContext = createContext({
  currency: "USD",
  setCurrency: () => {},
  formatPrice: (amount) => `$${amount}`,
  convertPrice: (amount) => Number(amount || 0),
  currencyInfo: CURRENCY_RATES.USD
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState("USD");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_currency");
      if (saved && CURRENCY_RATES[saved]) {
        setCurrencyState(saved);
      }
    }
  }, []);

  const setCurrency = (code) => {
    if (CURRENCY_RATES[code]) {
      setCurrencyState(code);
      if (typeof window !== "undefined") {
        localStorage.setItem("user_currency", code);
      }
    }
  };

  const currentInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;

  const convertPrice = (amountInUSD) => {
    const num = parseFloat(amountInUSD) || 0;
    const converted = num * currentInfo.rate;
    if (currency === "BDT") {
      return Math.round(converted);
    }
    return Math.round(converted * 100) / 100;
  };

  const formatPrice = (amountInUSD, showDecimals = false) => {
    const converted = convertPrice(amountInUSD);
    const formattedNum = currency === "BDT" 
      ? converted.toLocaleString("en-IN")
      : (showDecimals ? converted.toFixed(2) : Math.round(converted).toLocaleString("en-US"));

    return currentInfo.prefix 
      ? `${currentInfo.symbol}${formattedNum}`
      : `${formattedNum} ${currentInfo.symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      formatPrice,
      convertPrice,
      currencyInfo: currentInfo,
      allCurrencies: Object.values(CURRENCY_RATES)
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      currency: "USD",
      setCurrency: () => {},
      formatPrice: (amount) => `$${amount}`,
      convertPrice: (amount) => Number(amount || 0),
      currencyInfo: CURRENCY_RATES.USD,
      allCurrencies: Object.values(CURRENCY_RATES)
    };
  }
  return context;
}
