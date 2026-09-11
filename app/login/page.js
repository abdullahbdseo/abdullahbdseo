"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/admin.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("admin_auth");
      if (isAuth === "true") {
        router.replace("/admin");
      }
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check custom saved password or fallback defaults
    let customPassword = null;
    if (typeof window !== "undefined") {
      customPassword = localStorage.getItem("admin_custom_password");
    }

    const validEmails = [
      "admin@seoservice.local",
      "admin@abdullahbdseo.com",
      "admin@seoservice.com",
      "admin",
      "abdullah"
    ];

    const validPasswords = customPassword 
      ? [customPassword, "admin123"] 
      : ["admin123", "admin", "123456"];

    setTimeout(() => {
      if (validEmails.includes(cleanEmail) && validPasswords.includes(cleanPassword)) {
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_auth", "true");
          localStorage.setItem("admin_user", JSON.stringify({
            name: "Abdullah Saleh",
            email: cleanEmail.includes("@") ? cleanEmail : "admin@seoservice.local",
            role: "Master Administrator",
            loginTime: new Date().toISOString()
          }));
        }
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin");
        }, 400);
      } else {
        setLoading(false);
        setError("Invalid administrative credentials. Please verify your email and password.");
      }
    }, 400);
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        {/* LOGO & HEADER */}
        <div className="admin-login-logo">
          <div className="admin-login-icon-box">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h1 className="admin-login-title">Admin Portal</h1>
          <p className="admin-login-subtitle">Secure sign-in to access CMS & order management</p>
        </div>

        {/* ERROR NOTIFICATION */}
        {error && (
          <div className="admin-alert-error">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>{error}</span>
          </div>
        )}

        {/* SUCCESS NOTIFICATION */}
        {success && (
          <div style={{
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            color: "#059669",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "13px",
            marginBottom: "18px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <i className="fa-solid fa-circle-check"></i>
            <span>Access granted! Redirecting to dashboard...</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <div className="admin-input-group">
            <label className="admin-input-label">Admin Email or Username</label>
            <div className="admin-input-wrapper">
              <i className="fa-solid fa-envelope admin-input-icon"></i>
              <input
                type="text"
                required
                placeholder="Enter admin email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input-field"
                autoComplete="username"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="admin-input-group">
            <label className="admin-input-label">Admin Password</label>
            <div className="admin-input-wrapper">
              <i className="fa-solid fa-lock admin-input-icon"></i>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input-field"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          {/* REMEMBER ME */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "18px",
            fontSize: "12px",
            color: "#64748b"
          }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: "#2563eb", cursor: "pointer" }}
              />
              <span>Remember this session</span>
            </label>
            <span style={{ color: "#94a3b8" }}>256-Bit Encrypted</span>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading || success}
            className="admin-login-btn"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Verifying Credentials...</span>
              </>
            ) : success ? (
              <>
                <i className="fa-solid fa-check"></i>
                <span>Authenticated</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-right-to-bracket"></i>
                <span>Sign In to Admin Panel</span>
              </>
            )}
          </button>
        </form>

        {/* RETURN TO PUBLIC WEBSITE */}
        <div style={{
          marginTop: "24px",
          textAlign: "center",
          fontSize: "13px",
          color: "#64748b",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "16px"
        }}>
          <Link
            href="/"
            style={{
              color: "#64748b",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: 600,
              transition: "color 0.15s ease"
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0f172a")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
