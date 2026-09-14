// lib/useLiveCMS.js - Real-time Firestore sync hook for public frontend pages
"use client";

import { useState, useEffect } from "react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export function useLiveCMS(sectionName, fallbackInitialData) {
  const [data, setData] = useState(fallbackInitialData);

  useEffect(() => {
    let unsubscribe = null;

    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, "cms_content", sectionName);
        unsubscribe = onSnapshot(
          docRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const val = docSnap.data()?.value;
              if (val !== undefined && val !== null) {
                setData(val);
              }
            }
          },
          (err) => {
            console.warn(`Firestore real-time sync note for [${sectionName}]:`, err.message);
            // Fallback to fetch /api/cms
            fetch(`/api/cms?section=${sectionName}`)
              .then((res) => res.json())
              .then((json) => {
                if (json.success && json.data !== undefined) setData(json.data);
              })
              .catch(() => {});
          }
        );
      } catch (e) {
        fetch(`/api/cms?section=${sectionName}`)
          .then((res) => res.json())
          .then((json) => {
            if (json.success && json.data !== undefined) setData(json.data);
          })
          .catch(() => {});
      }
    } else {
      fetch(`/api/cms?section=${sectionName}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data !== undefined) setData(json.data);
        })
        .catch(() => {});
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [sectionName]);

  return data;
}
