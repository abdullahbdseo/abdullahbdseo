/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevents clickjacking attacks - no one can embed site in iframe
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Prevents MIME type sniffing attacks
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Controls referrer information sent with requests
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Enables browser XSS protection (older browsers)
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Forces HTTPS for 2 years (important for live site)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Restricts access to sensitive browser APIs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Prevents DNS prefetch leaks
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // Content Security Policy - controls where resources can load from
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://fonts.googleapis.com https://cdnjs.cloudflare.com https://kit.fontawesome.com https://www.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://ka-f.fontawesome.com",
      "font-src 'self' https://fonts.gstatic.com https://ka-f.fontawesome.com https://cdnjs.cloudflare.com data:",
      "img-src 'self' data: blob: https: http:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googleapis.com https://pagespeedonline.googleapis.com https://www.googletagmanager.com",
      "frame-src 'self' https://www.google.com https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to ALL routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;

