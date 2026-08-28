const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const OUT_DIR = path.join(__dirname, '..', 'out');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

// Automatic Git Commit & Push helper
function runGitAutoPush(customMessage) {
  const commitMsg = customMessage || `Content update via Admin Console - ${new Date().toISOString()}`;
  const gitExe = fs.existsSync('C:\\Users\\infob\\MinGit\\cmd\\git.exe')
    ? '"C:\\Users\\infob\\MinGit\\cmd\\git.exe"'
    : 'git';
  const projectDir = path.join(__dirname, '..');

  const cmd = `${gitExe} add . && ${gitExe} commit -m "${commitMsg.replace(/"/g, '\\"')}" && ${gitExe} push origin main`;
  console.log('[Auto-Git] Triggering automatic Git push to GitHub...');

  return new Promise((resolve) => {
    exec(cmd, { cwd: projectDir }, (err, stdout, stderr) => {
      if (err) {
        if ((stdout && stdout.includes('nothing to commit')) || (stderr && stderr.includes('nothing to commit'))) {
          console.log('[Auto-Git] Repository already up to date.');
          return resolve({ success: true, message: 'Already up to date (nothing new to commit)' });
        }
        console.error('[Auto-Git Error]:', err.message, stderr);
        return resolve({ success: false, error: stderr || err.message });
      }
      console.log('[Auto-Git Success]:', stdout.trim());
      resolve({ success: true, message: 'Successfully pushed to GitHub!', stdout: stdout.trim() });
    });
  });
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);

  // Handle POST /api/save-portfolio
  if (req.method === 'POST' && reqPath === '/api/save-portfolio') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const dataFilePath = path.join(__dirname, '..', 'data', 'portfolioData.ts');

        const tsContent = `/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                    PORTFOLIO CENTRAL DATA CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 * Auto-synced from Admin Console on ${new Date().toISOString()}
 */

export const adminPasscode = ${JSON.stringify(payload.adminPasscode || 'abdullah2026')};

export const personalInfo = ${JSON.stringify(payload.personalInfo, null, 2)};

export const aboutSection = ${JSON.stringify(payload.aboutSection, null, 2)};

export const skills = ${JSON.stringify(payload.skills, null, 2)};

export interface ServiceItem {
  id: string;
  iconType: string;
  title: string;
  desc: string;
  tags: string[];
  isFeatured?: boolean;
  badge?: string;
}

export const services: ServiceItem[] = ${JSON.stringify(payload.services, null, 2)};

export const projectCategories = ${JSON.stringify(payload.projectCategories, null, 2)} as const;

export type ProjectCategoryKey = (typeof projectCategories)[number]['id'];

export interface ProjectItem {
  id: number;
  title: string;
  categoryKey: 'seo' | 'web-dev' | 'web-design';
  categoryLabel: string;
  image: string;
  link: string;
}

export const projects: ProjectItem[] = ${JSON.stringify(payload.projects, null, 2)};

export interface BlogPostItem {
  id: number;
  title: string;
  category: string;
  topicGroup: string;
  date: string;
  readTime: string;
  desc: string;
  content?: string;
  image: string;
  href: string;
  featured?: boolean;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogImage?: string;
  authorName?: string;
  tags?: string[];
  schemaType?: string;
  robotsDirective?: string;
}

export const blogTopics = [
  { name: 'All Articles', count: 25, filter: 'all' },
  { name: 'SEO', count: 8, filter: 'SEO' },
  { name: 'AEO & GEO', count: 6, filter: 'AEO & GEO' },
  { name: 'Technical SEO', count: 5, filter: 'Technical SEO' },
  { name: 'Meta Ads', count: 4, filter: 'Meta Ads' },
  { name: 'Local SEO', count: 3, filter: 'Local SEO' },
  { name: 'AI Search', count: 2, filter: 'AI Search' },
];

export const blogPosts: BlogPostItem[] = ${JSON.stringify(payload.blogPosts, null, 2)};

export const certifications = ${JSON.stringify(payload.certifications || [], null, 2)};

export const pricingPackages = ${JSON.stringify(payload.pricingPackages || [], null, 2)};

export const clientGuarantees = ${JSON.stringify(payload.clientGuarantees || [], null, 2)};

export const metrics = ${JSON.stringify(payload.metrics || [], null, 2)};

export const experienceItems = ${JSON.stringify(payload.experienceItems || [], null, 2)};

export const educationItems = ${JSON.stringify(payload.educationItems || [], null, 2)};

export const faqItems = ${JSON.stringify(payload.faqItems || [], null, 2)};

export interface SiteSeoSettings {
  siteTitle: string;
  titleSeparator: string;
  siteDescription: string;
  siteKeywords: string[];
  canonicalBase: string;
  ogImage: string;
  twitterHandle: string;
  robotsDirective: string;
  googleSearchConsoleCode: string;
  bingVerificationCode: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  indexNowKey: string;
  authorName: string;
  authorJobTitle: string;
  authorBio: string;
  socialProfiles: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
    upwork?: string;
  };
}

export const seoSettings: SiteSeoSettings = ${JSON.stringify(payload.seoSettings || {
  siteTitle: "Abdullah Saleh | SEO Growth Specialist & Search Architect",
  titleSeparator: "·",
  siteDescription: "Abdullah Saleh is an SEO Growth Specialist helping businesses scale organic rankings, answer engine visibility (AEO), and generative AI search presence (GEO).",
  siteKeywords: [
    "Abdullah Saleh",
    "SEO Growth Specialist",
    "Technical SEO Expert",
    "AEO Specialist Bangladesh",
    "GEO Expert",
    "Answer Engine Optimization",
    "Generative Engine Optimization",
    "Core Web Vitals Optimization",
    "Meta Ads Manager"
  ],
  canonicalBase: "https://abdullahbdseo.vercel.app",
  ogImage: "/assets/images/abdullah.jpg",
  twitterHandle: "@abdullahbdseo",
  robotsDirective: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  googleSearchConsoleCode: "",
  bingVerificationCode: "",
  googleAnalyticsId: "G-XXXXXXXXXX",
  googleTagManagerId: "",
  indexNowKey: "cc02b558a0bd4a69ae052b226cbe50e5",
  authorName: "Abdullah Saleh",
  authorJobTitle: "SEO Growth Specialist & Search Architect",
  authorBio: "B.Sc. in CSE graduate specializing in data-driven Technical SEO, Answer Engine Optimization (AEO), and Generative AI Search (GEO).",
  socialProfiles: {
    linkedin: "https://www.linkedin.com/in/abdullah-saleh",
    twitter: "https://twitter.com/abdullahbdseo",
    github: "https://github.com/abdullahbdseo",
    facebook: "https://facebook.com/abdullahbdseo",
    instagram: "https://instagram.com/abdullahbdseo",
    upwork: "https://www.upwork.com"
  }
}, null, 2)};
`;

        fs.writeFileSync(dataFilePath, tsContent, 'utf-8');

        // Automatically trigger Git commit & push to GitHub
        runGitAutoPush(`Update portfolio content via Admin Console - ${new Date().toLocaleDateString()}`)
          .then((gitResult) => {
            console.log('[Auto-Git Result]:', gitResult.message || gitResult.error);
          });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Saved locally and pushing automatically to GitHub!' 
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Handle POST /api/upload-image
  if (req.method === 'POST' && reqPath === '/api/upload-image') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { filename, dataBase64 } = JSON.parse(body);
        if (!dataBase64) throw new Error('Missing image data');

        const matches = dataBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let ext = '.webp';
        let buffer;
        if (matches) {
          const mime = matches[1];
          if (mime.includes('png')) ext = '.png';
          else if (mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg';
          else if (mime.includes('svg')) ext = '.svg';
          buffer = Buffer.from(matches[2], 'base64');
        } else {
          buffer = Buffer.from(dataBase64, 'base64');
        }

        const safeName = (filename || 'post-thumb').replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
        const finalFileName = `${safeName}-${Date.now()}${ext}`;

        const publicDir = path.join(__dirname, '..', 'public', 'blog', 'images');
        const outDir = path.join(__dirname, '..', 'out', 'blog', 'images');

        if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        fs.writeFileSync(path.join(publicDir, finalFileName), buffer);
        fs.writeFileSync(path.join(outDir, finalFileName), buffer);

        // Auto push uploaded image to GitHub
        runGitAutoPush(`Add uploaded image ${finalFileName}`)
          .then((gitResult) => {
            console.log('[Auto-Git Image Push]:', gitResult.message || gitResult.error);
          });

        const relativeUrl = `/blog/images/${finalFileName}`;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, url: relativeUrl }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Handle POST /api/git-push (Manual sync trigger from Admin)
  if (req.method === 'POST' && reqPath === '/api/git-push') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        let msg = 'Manual push from Admin Console';
        try {
          const parsed = JSON.parse(body || '{}');
          if (parsed.message) msg = parsed.message;
        } catch {}

        const result = await runGitAutoPush(msg);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Handle POST /api/update-passcode
  if (req.method === 'POST' && reqPath === '/api/update-passcode') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { newPasscode } = JSON.parse(body);
        if (!newPasscode || newPasscode.trim().length < 4) {
          throw new Error('Passcode must be at least 4 characters long');
        }

        const dataFilePath = path.join(__dirname, '..', 'data', 'portfolioData.ts');
        let content = fs.readFileSync(dataFilePath, 'utf8');

        // Update or insert adminPasscode
        if (content.includes('export const adminPasscode')) {
          content = content.replace(/export const adminPasscode = .*;/, `export const adminPasscode = ${JSON.stringify(newPasscode.trim())};`);
        } else {
          content = content.replace(
            /export const personalInfo/,
            `export const adminPasscode = ${JSON.stringify(newPasscode.trim())};\n\nexport const personalInfo`
          );
        }

        fs.writeFileSync(dataFilePath, content, 'utf8');

        // Auto push to GitHub
        runGitAutoPush('Update admin security passcode')
          .then(res => console.log('[Auto-Git Passcode Push]:', res.message || res.error));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Passcode updated successfully and pushed to GitHub!' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Handle POST /api/book-call
  if (req.method === 'POST' && reqPath === '/api/book-call') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const booking = JSON.parse(body);
        const bookingsFile = path.join(__dirname, '..', 'data', 'bookings.json');
        let list = [];
        if (fs.existsSync(bookingsFile)) {
          try {
            list = JSON.parse(fs.readFileSync(bookingsFile, 'utf8'));
          } catch(e) { list = []; }
        }
        list.unshift(booking);
        fs.writeFileSync(bookingsFile, JSON.stringify(list, null, 2), 'utf8');

        // Auto push to GitHub so bookings are backed up in git
        runGitAutoPush(`New Strategy Call Booking from ${booking.name || 'Client'}`)
          .then(res => console.log('[Auto-Git Booking Push]:', res.message || res.error));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Booking saved successfully!' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Handle GET /api/bookings
  if (req.method === 'GET' && reqPath === '/api/bookings') {
    try {
      const bookingsFile = path.join(__dirname, '..', 'data', 'bookings.json');
      let list = [];
      if (fs.existsSync(bookingsFile)) {
        list = JSON.parse(fs.readFileSync(bookingsFile, 'utf8'));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, bookings: list }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, bookings: [] }));
    }
    return;
  }

  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(OUT_DIR, reqPath);

  // If path has no extension, try .html
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const notFoundPath = path.join(OUT_DIR, '404.html');
      if (fs.existsSync(notFoundPath)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(notFoundPath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
