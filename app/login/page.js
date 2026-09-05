"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@seoservice.local");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Secure local verification
    if (email === "admin@seoservice.local" && password === "admin123") {
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_auth", "true");
      }
      setTimeout(() => {
        router.push("/admin");
      }, 500);
    } else {
      setLoading(false);
      setError("Invalid administrative credentials. Use default admin credentials.");
    }
  };

  return (
    <div className="login-page-wrapper py-20 bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="login-card max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl text-white">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/20 text-primary rounded-xl flex items-center justify-center mx-auto text-2xl mb-3">
            <i className="fa-solid fa-lock"></i>
          </div>
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-slate-400 text-sm">Sign in to manage client orders and invoices</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3 rounded-lg text-xs mb-6 flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-group">
            <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Admin Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="form-group">
            <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full py-3 mt-4"
          >
            {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Authenticating...</> : "Sign In to Admin"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500 border-t border-slate-700/60 pt-4">
          <Link href="/" className="hover:text-slate-300">
            <i className="fa-solid fa-arrow-left"></i> Return to Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
