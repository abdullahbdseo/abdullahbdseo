# IndexScan - Autonomous AI SEO Audit & Auto-Fix Platform

Production Autonomous AI SEO Audit, Diagnosis, Auto-Fix, and Verification Platform.

## Features
- **Real-Time Website Crawler**: Deep crawling with sitemap discovery, canonical tracking, and robots.txt support.
- **Rules & Knowledge Graph Engine**: SEO health scoring (0-100), link equity graph, and severity classification.
- **Autonomous Loop Orchestration**: 6-phase optimization pipeline (Crawl -> Audit -> Plan -> Apply Fixes -> Verify -> Report).
- **Live Audit Monitor (`/audit`)**: Real-time Server-Sent Events (SSE) log terminal and step-by-step progress tracking.
- **Interactive UI**: Dark glassmorphic dashboard built with React 18, Vite, and Lucide icons.

## Quick Start (For Google Antigravity or Local Dev)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run in Development Mode**:
   ```bash
   npm run dev
   ```
   This runs:
   - Backend API server on `http://localhost:3001`
   - Frontend Vite application on `http://localhost:5173`

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```
