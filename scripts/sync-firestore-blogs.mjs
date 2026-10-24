// scripts/sync-firestore-blogs.mjs
// Syncs current lib/data.js blogPosts to Firestore cms_content/blogPosts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cmsJsonPath = path.join(__dirname, '..', 'lib', 'cms-data.json');

const firebaseConfig = {
  apiKey: "AIzaSyAch7gz1ScVM22HW13TnCBg66soOAoLVtk",
  authDomain: "abdullah-seo-cms.firebaseapp.com",
  projectId: "abdullah-seo-cms",
  storageBucket: "abdullah-seo-cms.firebasestorage.app",
  messagingSenderId: "20622347219",
  appId: "1:20622347219:web:a9d97636f447eeb23f3d26",
};

export async function syncBlogPostsToFirestore() {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  let posts = [];
  if (fs.existsSync(cmsJsonPath)) {
    const raw = JSON.parse(fs.readFileSync(cmsJsonPath, 'utf-8'));
    posts = raw.blogPosts || [];
  }
  console.log("[Firestore Sync] Syncing " + posts.length + " posts...");
  console.log("[Firestore Sync] Newest: " + (posts[0]?.slug) + " | " + (posts[0]?.date || posts[0]?.publish_date));
  const docRef = doc(db, 'cms_content', 'blogPosts');
  await setDoc(docRef, { value: posts, updatedAt: new Date().toISOString() });
  console.log("[Firestore Sync] SUCCESS! " + posts.length + " posts synced to Firestore.");
}

// Run standalone when executed directly
if (process.argv[1] && process.argv[1].includes('sync-firestore-blogs')) {
  try {
    await syncBlogPostsToFirestore();
    console.log("[Firestore Sync] Done.");
  } catch (err) {
    console.error('[Firestore Sync] ERROR:', err.message);
    process.exit(1);
  }
  process.exit(0);
}
