# Rule: Blog Publishing Workflow & CMS Sync

## Problem Context
When a new blog post is published to `lib/data.js` (via `scripts/daily-auto-blog.mjs`),
the frontend uses `useLiveCMS()` which fetches from Firestore first and can override
the static data, causing newly published posts to NOT appear on the frontend
even though they exist in `lib/data.js`.

## Mandatory Checklist - Every Blog Publish

Whenever a new blog is published (manually or via script), ALWAYS verify ALL of the following:

### 1. Run the publish script
`node scripts/daily-auto-blog.mjs`
This adds the post to both lib/data.js AND lib/cms-data.json.

### 2. Verify merge logic exists in app/api/cms/route.js
The file app/api/cms/route.js MUST contain the blogPosts merge block inside
the Firestore success handler:

`js
// Ensure newly published blog posts from lib/data.js are not lost if Firestore has older blogPosts
if (Array.isArray(result.blogPosts) && Array.isArray(staticData.blogPosts)) {
  const existingBlogSlugs = new Set(result.blogPosts.map((p) => p.slug || p.id));
  const newStaticPosts = staticData.blogPosts.filter(
    (p) => !existingBlogSlugs.has(p.slug || p.id)
  );
  if (newStaticPosts.length > 0) {
    result.blogPosts = [...newStaticPosts, ...result.blogPosts];
  }
}
`

If this block is MISSING for any reason, add it back immediately before pushing.

### 3. Git commit BOTH files together
Always stage and commit these two files together:
- lib/data.js
- lib/cms-data.json

Never push one without the other.

### 4. Git push to trigger Vercel deploy
`git push origin main`

---

## Architecture Note (Why This Happens)

Frontend blog/page.js uses useLiveCMS which:
- Priority 1: Fetches from Firestore cms_content/blogPosts (can be OUTDATED)
- Priority 2: Fetches /api/cms?section=blogPosts (FIXED: now merges static posts)
- Fallback: Uses staticBlogPosts from lib/data.js (only if API fails)

The fix ensures /api/cms always prepends new static posts that Firestore does not know about.
New posts appear at the top (index 0 = Featured post on blog page).

---

## DO NOT

- Do NOT push only lib/data.js without also pushing lib/cms-data.json
- Do NOT remove the blogPosts merge block from app/api/cms/route.js
- Do NOT rely on Firestore auto-syncing new posts - it does NOT auto-sync from lib/data.js
