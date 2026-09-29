# Rule: Blog Publishing Workflow (MANDATORY — Read Before Every Blog Publish)

## 🎯 Compliance Standard
Every blog post created, drafted, or published MUST strictly adhere to the standards defined in:
- `seo-content-rules-guide.md` (SEO + AEO + GEO Content Rules Guide)
- `AGENTS.md` (ZERO-TOUCH-PROTOCOL & 4px Border Radius Standard)

---

## ⚠️ ROOT CAUSE WARNING (Firestore Real-time Sync)
This project uses Firebase (credentials in `lib/firebase.js`). Firestore is ALWAYS connected.
The frontend fetches `blogPosts` from Firestore via real-time `onSnapshot`.
If Firestore does NOT have the new post, it will OVERRIDE the static data and the new post will disappear from the frontend after 1-2 seconds.

Updating `lib/data.js` and `lib/cms-data.json` is NOT enough by itself — Firestore MUST be synced every time a new blog is published.

---

## ✅ Step-by-Step Blog Workflow

### STEP 1 — Generate Draft & Run QA Audit (Default Mode)
```bash
node scripts/daily-auto-blog.mjs
```
- Performs cannibalization check against existing posts.
- Runs content, on-page, linking, E-E-A-T, and technical checks.
- Generates 3 title options, meta description, and clean URL slug.
- Saves draft in `lib/blog-drafts/<slug>.json` and `lib/blog-drafts/<slug>.md`.
- Prints complete PASS / FAIL / NOT VERIFIED QA report to the console.
- **Does NOT publish to live site without owner approval.**

### STEP 2 — Review & Approve Draft
Owner reviews the generated draft files in `lib/blog-drafts/` and verifies:
- Search intent and direct answer clarity (AEO).
- Verified internal links (must be from verified site URL pool).
- Factual integrity (no fake stats or guarantee claims).
- Real experience notes (`[ADD REAL EXAMPLE FROM ABDULLAH]`).

### STEP 3 — Publish Post & Sync Live (When Approved)
```bash
node scripts/daily-auto-blog.mjs --publish --slug=<slug>
# Or publish next approved post from library:
node scripts/daily-auto-blog.mjs --publish
```
This automatically:
1. Injects the new blog post into `lib/data.js` (top of `blogPosts`).
2. Synchronizes `lib/cms-data.json` for admin CMS.
3. Automatically triggers `syncBlogPostsToFirestore()` to sync live to Firebase Firestore.

### STEP 4 — Manual Firestore Sync Verification (Fallback)
If needed, verify Firestore sync standalone:
```bash
node scripts/sync-firestore-blogs.mjs
```

### STEP 5 — Git Commit & Push
```bash
git add lib/data.js lib/cms-data.json lib/blog-drafts/
git commit -m "feat(blog): publish - [post title]"
git push origin main
```
This triggers Vercel deployment.

---

## ❌ DO NOT

- Do NOT publish directly without running the QA checks first.
- Do NOT skip Step 3 / 4 (Firestore sync) — this is why posts disappear on live site.
- Do NOT push only `lib/data.js` without `lib/cms-data.json`.
- Do NOT use retired HowTo schema markup (Google retired it; use visible numbered steps).
- Do NOT use unverified internal links (only use URLs listed in `SITE_CONFIG.verifiedUrls`).
- Do NOT use border radius greater than `4px` in styled containers or buttons.
- Do NOT remove the `blogPosts` merge block from `app/api/cms/route.js`.
- Do NOT change `lib/useLiveCMS.js` merge order back to `[...val, ...missingFromFirestore]`.

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

## Quick Reference — If Blog Disappears Again
Run this immediately:
```bash
node scripts/sync-firestore-blogs.mjs
```
Then push to GitHub.

