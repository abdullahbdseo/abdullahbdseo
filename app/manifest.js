export default function manifest() {
  return {
    name: "Abdullah Saleh - Best SEO Expert in Bangladesh",
    short_name: "Abdullah SEO",
    description: "Organic Business Growth Specialist & Technical SEO Expert in Bangladesh helping businesses achieve #1 Google rankings and AI Search dominance.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon"
      },
      {
        src: "/images/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/images/logo-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  };
}
