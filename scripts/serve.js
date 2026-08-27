const http = require('http');
const fs = require('fs');
const path = require('path');

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
`;

        fs.writeFileSync(dataFilePath, tsContent, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Saved to data/portfolioData.ts' }));
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
