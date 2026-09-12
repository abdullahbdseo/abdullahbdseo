"use client";

import { useEffect, useState } from "react";
import SocialShare from "@/components/SocialShare";

export default function BlogArticleEnhancer({ title, headings = [] }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate reading progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // 2. Determine currently visible heading
      if (headings.length > 0) {
        const scrollPosition = window.scrollY + 120;
        let currentActive = headings[0]?.id;

        for (let i = 0; i < headings.length; i++) {
          const el = document.getElementById(headings[i].id);
          if (el && el.offsetTop <= scrollPosition) {
            currentActive = headings[i].id;
          }
        }
        setActiveHeadingId(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  return (
    <>
      {/* 1. TOP STICKY READING PROGRESS BAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: `${readingProgress}%`,
          background: "linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)",
          zIndex: 99999,
          transition: "width 0.1s ease-out",
          boxShadow: "0 0 10px rgba(37, 99, 235, 0.5)"
        }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      {/* 2. SOCIAL SHARE WIDGET */}
      <SocialShare title={title} />
    </>
  );
}
