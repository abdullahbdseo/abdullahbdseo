# Rule: Blog Publishing Workflow (MANDATORY — Read Before Every Blog Publish)

## ⚠️ ROOT CAUSE WARNING
This project uses Firebase (HARDCODED credentials in lib/firebase.js).
Firestore is ALWAYS connected. The frontend fetches blogPosts from Firestore via
real-time onSnapshot. If Firestore does NOT have the new post, it will OVERRIDE
the static data and the new post will disappear from the frontend after 1-2 seconds.

Simply updating lib/data.js and lib/cms-data.json is NOT ENOUGH.
Firestore MUST be synced every time a new blog is published.

---

## ✅ MANDATORY 4-Step Blog Publish Process

### STEP 1 — Publish the blog post
```
node scripts/daily-auto-blog.mjs
```
This updates lib/data.js AND lib/cms-data.json.

### STEP 2 — Sync to Firestore (CRITICAL — DO NOT SKIP)
```
node scripts/sync-firestore-blogs.mjs
```
This pushes all blogPosts from lib/data.js to Firestore cms_content/blogPosts.
WITHOUT THIS STEP the new post will show for 1-2 seconds then disappear.

### STEP 3 — Git commit BOTH data files
```
git add lib/data.js lib/cms-data.json
git commit -m "feat(blog): publish - [post title]"
```
Always commit lib/data.js AND lib/cms-data.json together. Never one without the other.

### STEP 4 — Push to GitHub
```
git push origin main
```
This triggers Vercel auto-deploy.

---

## ❌ DO NOT

- Do NOT skip Step 2 (Firestore sync) — this is the #1 cause of blogs disappearing
- Do NOT push only lib/data.js without lib/cms-data.json
- Do NOT assume Firestore auto-syncs from lib/data.js — it NEVER does
- Do NOT remove blogPosts merge block from app/api/cms/route.js
- Do NOT change useLiveCMS.js merge order back to [...val, ...missingFromFirestore]

---

## Architecture (Why Firestore Sync Is Required)

```
lib/data.js (static, bundled at build time)
  └── used as initial React state (shows correctly on first render)

Firestore cms_content/blogPosts (live database)
  └── onSnapshot fires 1-2 seconds after page load
  └── OVERRIDES the static initial state
  └── If new post is NOT in Firestore → new post disappears ❌
  └── If new post IS in Firestore → new post stays ✅
```

## Fixes Already Applied (Do Not Remove)

1. lib/useLiveCMS.js — merge order: [...missingFromFirestore, ...val] (new posts first)
2. app/blog/page.js — date sort: newest post always at index 0 (featured)
3. app/api/cms/route.js — blogPosts merge block (fallback path)
4. scripts/daily-auto-blog.mjs — auto calls syncBlogPostsToFirestore() after publish
5. scripts/sync-firestore-blogs.mjs — standalone Firestore sync script

## Quick Reference — If Blog Disappears Again

Run this immediately:
```
node scripts/sync-firestore-blogs.mjs
```
Then push to GitHub. That's all.
