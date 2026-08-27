'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';
export type StyleTheme = 'sage' | 'glass' | 'neumorphism' | 'claymorphism' | 'skeuomorphism';

export interface StyleItem {
  id: StyleTheme;
  label: string;
  color: string;
  accent: string;
}

export const STYLES_LIST: StyleItem[] = [
  { id: 'sage', label: 'Sage Minimal', color: '#3D6B50', accent: '#C9A0AC' },
  { id: 'glass', label: 'Glassmorphism', color: '#5E72EB', accent: '#00C2B2' },
  { id: 'neumorphism', label: 'Neumorphism', color: '#7B93DB', accent: '#E0936F' },
  { id: 'claymorphism', label: 'Claymorphism', color: '#FF8A65', accent: '#7C5CFC' },
  { id: 'skeuomorphism', label: 'Modern Skeuomorphism', color: '#4757C7', accent: '#D6708C' },
];

interface ThemeContextType {
  theme: ThemeMode;
  style: StyleTheme;
  toast: string | null;
  toggleTheme: () => void;
  setStyle: (style: StyleTheme) => void;
  cycleStyle: () => StyleItem;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [style, setStyleState] = useState<StyleTheme>('sage');
  const [toast, setToast] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem('aj-theme') as ThemeMode) || 'light';
    const savedStyle = (localStorage.getItem('aj-style') as StyleTheme) || 'sage';
    setTheme(savedTheme);
    setStyleState(savedStyle);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-style', savedStyle);
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('aj-theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    showToast(nextTheme === 'dark' ? '🌙 Dark Mode Active' : '☀️ Light Mode Active');
  };

  const setStyle = (newStyle: StyleTheme) => {
    setStyleState(newStyle);
    localStorage.setItem('aj-style', newStyle);
    document.documentElement.setAttribute('data-style', newStyle);
    const item = STYLES_LIST.find((s) => s.id === newStyle);
    if (item) {
      showToast(`🎨 Theme: ${item.label}`);
    }
  };

  const cycleStyle = (): StyleItem => {
    const currentIndex = STYLES_LIST.findIndex((s) => s.id === style);
    const nextIndex = (currentIndex + 1) % STYLES_LIST.length;
    const nextStyle = STYLES_LIST[nextIndex];
    setStyleState(nextStyle.id);
    localStorage.setItem('aj-style', nextStyle.id);
    document.documentElement.setAttribute('data-style', nextStyle.id);
    showToast(`🎨 Theme: ${nextStyle.label}`);
    return nextStyle;
  };

  return (
    <ThemeContext.Provider value={{ theme, style, toast, toggleTheme, setStyle, cycleStyle }}>
      {children}
      {/* Dynamic Toast Notification for Theme Switch */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="px-5 py-2.5 rounded-full bg-ink/90 text-surface text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block shrink-0 shadow-xs"
              style={{
                backgroundColor:
                  STYLES_LIST.find((s) => s.id === style)?.color || '#3D6B50',
              }}
            />
            {toast}
          </div>
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
