-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: seoservice_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `entity_type` varchar(100) DEFAULT NULL,
  `entity_id` bigint(20) unsigned DEFAULT NULL,
  `description` text DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `metadata_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata_json`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_audit_action` (`action`),
  CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,1,'login','User',1,'User logged in: admin@seoservice.local','127.0.0.1','Unknown',NULL,'2026-08-29 16:11:30'),(2,1,'logout','User',1,'User logged out','127.0.0.1','Unknown',NULL,'2026-08-29 16:11:30'),(3,2,'login','User',2,'User logged in: client@seoservice.local','127.0.0.1','Unknown',NULL,'2026-08-29 16:11:30'),(4,1,'login','User',1,'User logged in: admin@seoservice.local','127.0.0.1','Unknown',NULL,'2026-08-29 16:11:40'),(5,1,'logout','User',1,'User logged out','127.0.0.1','Unknown',NULL,'2026-08-29 16:11:40'),(6,2,'login','User',2,'User logged in: client@seoservice.local','127.0.0.1','Unknown',NULL,'2026-08-29 16:11:40'),(7,1,'login','User',1,'User logged in: admin@seoservice.local','127.0.0.1','Unknown',NULL,'2026-08-29 16:11:47'),(8,1,'logout','User',1,'User logged out','127.0.0.1','Unknown',NULL,'2026-08-29 16:11:47'),(9,2,'login','User',2,'User logged in: client@seoservice.local','127.0.0.1','Unknown',NULL,'2026-08-29 16:11:47'),(10,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:12:32'),(11,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:12:35'),(12,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-29 16:15:09'),(13,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-29 16:15:57'),(14,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:24:48'),(15,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:24:52'),(16,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:25:01'),(17,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:25:06'),(18,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:25:09'),(19,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:25:21'),(20,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:25:24'),(21,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:25:27'),(22,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:27:44'),(23,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:31:12'),(24,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 16:31:13'),(25,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 17:01:25'),(26,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 17:01:25'),(27,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 17:22:33'),(28,2,'login','User',2,'User logged in: client@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 17:39:33'),(29,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.7663',NULL,'2026-08-29 17:39:34'),(30,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-29 17:47:15'),(31,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-30 12:55:40'),(32,1,'logout','User',1,'User logged out','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-30 13:41:44'),(33,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-30 14:21:12'),(34,3,'login','User',3,'User logged in: kingusa112211@gmail.com','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-30 17:13:28'),(35,3,'logout','User',3,'User logged out','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-30 17:13:36'),(36,4,'login','User',4,'User logged in: kingu@il.com','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-30 17:14:04'),(37,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-30 17:15:31'),(38,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Unknown',NULL,'2026-08-30 17:24:01'),(39,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Unknown',NULL,'2026-08-30 17:42:00'),(40,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-31 14:46:49'),(41,1,'login','User',1,'User logged in: admin@seoservice.local','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',NULL,'2026-08-31 15:25:33');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_categories`
--

DROP TABLE IF EXISTS `blog_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_categories`
--

LOCK TABLES `blog_categories` WRITE;
/*!40000 ALTER TABLE `blog_categories` DISABLE KEYS */;
INSERT INTO `blog_categories` VALUES (1,'Technical SEO','technical-seo','Architecture, Core Web Vitals, Crawling and Indexation.','active','2026-08-29 16:00:29','2026-08-29 18:02:01'),(2,'Keyword Research','keyword-research','Search intent, topic clustering, and competitor gap analysis.','active','2026-08-29 16:00:29','2026-08-29 18:02:01'),(3,'E-Commerce SEO','ecommerce-seo','Faceted search, product schema, and revenue optimization.','active','2026-08-29 16:00:29','2026-08-29 18:02:01'),(4,'Algorithm Updates','algorithm-updates','Google Helpful Content & Core Algorithm breakdowns','active','2026-08-29 16:00:29','2026-08-29 16:00:29'),(5,'AI SEO & Growth','ai-seo-growth','Generative Engine Optimization (GEO), AI Overviews & LLM search strategies','active','2026-09-04 05:43:37','2026-09-04 05:43:37');
/*!40000 ALTER TABLE `blog_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_post_tag`
--

DROP TABLE IF EXISTS `blog_post_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_post_tag` (
  `blog_post_id` bigint(20) unsigned NOT NULL,
  `tag_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`blog_post_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `blog_post_tag_ibfk_1` FOREIGN KEY (`blog_post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `blog_post_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `blog_tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_post_tag`
--

LOCK TABLES `blog_post_tag` WRITE;
/*!40000 ALTER TABLE `blog_post_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_post_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_posts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `author_id` bigint(20) unsigned NOT NULL,
  `category_id` bigint(20) unsigned DEFAULT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `status` enum('published','draft','archived') DEFAULT 'published',
  `views` int(10) unsigned DEFAULT 0,
  `published_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `seo_title` varchar(191) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `og_image` varchar(255) DEFAULT NULL,
  `schema_type` varchar(50) DEFAULT 'Article',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `author_id` (`author_id`),
  KEY `category_id` (`category_id`),
  KEY `idx_blog_posts_slug` (`slug`),
  KEY `idx_blog_posts_status` (`status`),
  CONSTRAINT `blog_posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `blog_posts_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (1,1,1,'The Complete Technical SEO Audit Checklist for 2026','complete-technical-seo-audit-checklist','A step-by-step master checklist to diagnose crawl waste, indexation issues, JavaScript rendering hurdles, and Core Web Vitals bottlenecks.','<h2>Why Technical SEO is the Foundation of Organic Growth</h2><p>Without a sound technical foundation, even the most exceptional content will struggle to rank. Search engines must be able to crawl, render, and index your pages seamlessly before ranking algorithms evaluate quality.</p><h3>1. Crawlability & Indexation Checkpoints</h3><ul><li><strong>Robots.txt Directives:</strong> Ensure crucial CSS, JS, and high-value content URLs are not accidentally blocked.</li><li><strong>XML Sitemap Integrity:</strong> Verify that only 200 OK canonical URLs are included. Exclude redirects, 404s, and noindex pages.</li><li><strong>Crawl Depth Analysis:</strong> Keep high-priority pages within 3 clicks from the homepage.</li></ul><h3>2. Core Web Vitals & Page Experience</h3><p>Google\'s emphasis on Interaction to Next Paint (INP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) means page performance directly impacts search user experience and rankings.</p><h3>3. Canonicalization & Internal Linking</h3><p>Consolidate link equity by eliminating redirect chains, updating internal broken links, and using self-referential canonical tags correctly.</p>','blog_tech_seo.jpg','published',1427,'2026-08-29 16:00:29','The Complete Technical SEO Audit Checklist for 2026 | Digi Solution','Master technical SEO audit guide covering crawl budget, indexation bloat, Core Web Vitals (INP, LCP), and Schema markup.',NULL,NULL,'BlogPosting','2026-08-29 16:00:29','2026-09-01 17:03:31'),(2,1,2,'Search Intent Mastery: How to Rank for High-Converting Commercial Keywords','search-intent-mastery-commercial-keywords','Understand the four core types of search intent and how to structure your landing pages to satisfy what Google and buyers are actually looking for.','<h2>Understanding Search Intent in Modern Google Algorithms</h2><p>Keywords alone are no longer enough. Google\'s modern semantic models look for alignment between user search intent and the format, depth, and utility of your page.</p><h3>The 4 Pillars of Search Intent:</h3><ul><li><strong>Informational:</strong> The user wants answers or tutorials (e.g., \'what is technical SEO\').</li><li><strong>Commercial Investigation:</strong> The user is comparing options (e.g., \'best SEO audit tools 2026\').</li><li><strong>Transactional:</strong> The user is ready to purchase or hire (e.g., \'hire technical SEO consultant\').</li><li><strong>Navigational:</strong> The user seeks a specific brand or login page.</li></ul><h3>Aligning Content Architecture with Buyer Journeys</h3><p>Map informational queries to top-of-funnel guide hubs and use strategic internal links to funnel users toward commercial service pages.</p>','blog_keyword_strategy.jpg','published',1990,'2026-08-29 16:00:29','Search Intent Mastery & High-Converting Keyword Strategy | Digi Solution','Discover how to map user search intent, build topic clusters, and capture high-converting commercial SEO traffic.',NULL,NULL,'BlogPosting','2026-08-29 16:00:29','2026-09-01 17:03:32'),(3,1,3,'E-Commerce Faceted Navigation SEO: How to Prevent Crawl Waste & Cannibalization','ecommerce-faceted-navigation-seo-guide','Learn how to configure filter URLs, canonical tags, and AJAX pagination to avoid creating millions of duplicate thin search pages.','<h2>The Faceted Navigation Dilemma</h2><p>Online stores with color, size, price, and brand filters can inadvertently generate millions of URL parameter combinations. If search bots crawl these thin combinations, crawl budget is rapidly depleted and link equity gets diluted.</p><h3>Best Practices for Facet Management:</h3><ul><li><strong>Canonicalization:</strong> Point parameterized filter URLs back to the clean parent category root.</li><li><strong>Robots Noindex vs. Disallow:</strong> Evaluate whether parameter URLs should be disallowed in robots.txt or rendered client-side via AJAX.</li><li><strong>Index Only High-Volume Combinations:</strong> Create dedicated, unique static landing pages only for high-demand sub-categories (e.g., /running-shoes/mens-waterproof).</li></ul>','blog_ecommerce_seo.jpg','published',2456,'2026-08-29 16:00:29','E-Commerce Faceted Navigation SEO Guide | Digi Solution','Complete guide to optimizing e-commerce faceted search, canonical tags, and parameter crawling on online stores.',NULL,NULL,'BlogPosting','2026-08-29 16:00:29','2026-09-01 17:03:32'),(29,1,5,'Generative Engine Optimization (GEO): How to Rank in Google AI Overviews & Perplexity in 2026','generative-engine-optimization-geo-ai-overviews-guide','Master the new frontier of search with Generative Engine Optimization (GEO). Learn how to structure entity-dense content, earn citations in Google AI Overviews and Perplexity, and capture zero-click search traffic.','<h2>The Seismic Shift from Classic Search to Generative Engine Optimization (GEO)</h2>\n<p>Search engines are no longer simple index-and-retrieval directories. With the global rollout of Google AI Overviews, SearchGPT, and Perplexity AI, generative AI models now summarize complex topics and directly cite trusted web sources at the top of the SERP.</p>\n<p><strong>Generative Engine Optimization (GEO)</strong> is the specialized discipline of structuring your website’s content, entity graph, and technical architecture so Large Language Models (LLMs) select your brand as the definitive source citation.</p>\n\n<div style=\"background: #eff6ff; border-left: 4px solid #2563eb; padding: 18px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;\">\n    <strong style=\"color: #1e40af; font-size: 1.05rem; display: block; margin-bottom: 6px;\"><i class=\"fa-solid fa-lightbulb\"></i> Pro Insight:</strong>\n    <p style=\"margin: 0; color: #334155; font-size: 0.95rem;\">According to recent search engine benchmark studies, pages that feature direct, self-contained answer capsules and validated Schema.org entity graphs receive up to <strong>3.4x more citations</strong> in Google AI Overviews compared to traditional long-form keyword-stuffed articles.</p>\n</div>\n\n<h3>How LLM Search Engines Select Source Citations</h3>\n<p>Unlike classic PageRank alone, generative AI retrieval engines evaluate candidate passages through a multi-stage semantic pipeline:</p>\n<ol>\n    <li><strong>Query Decomposition:</strong> The model breaks complex user prompts into multi-hop sub-queries.</li>\n    <li><strong>Dense Vector Retrieval:</strong> Embedding models search the index for passages that mathematically match the contextual intent.</li>\n    <li><strong>Entity Verification & Source Trust:</strong> The engine checks whether the source domain has established topical authority and verified author credentials.</li>\n    <li><strong>Synthesis & Attribution:</strong> The LLM generates the synthesized answer and places superscript hyperlinks to the top supporting nodes.</li>\n</ol>\n\n<h2>5 Critical Tactics to Earn Google AI Overview Citations</h2>\n\n<h3>1. Deploy 40-60 Word \"Answer Capsules\" Below Major H2s</h3>\n<p>LLMs excel at extracting concise, information-dense summaries. Immediately below your primary subheadings, provide a direct, declarative answer to the user\'s core question before expanding into nuanced analysis.</p>\n\n<h3>2. Build Deep Entity Graph Connections with Schema Markup</h3>\n<p>Generative models rely on structured knowledge graphs to understand concepts without ambiguity. You must implement advanced Schema.org JSON-LD markup—including <code>Article</code>, <code>FAQPage</code>, <code>ItemPage</code>, and <code>AboutPage</code> with distinct <code>sameAs</code> authority links.</p>\n<p><em>Tip: Use our free <a href=\"/tools/schema-markup-generator\" style=\"color: #2563eb; font-weight: 600; text-decoration: underline;\">Schema Markup Generator</a> to validate your JSON-LD syntax instantly.</em></p>\n\n<h3>3. Incorporate Primary Data, Benchmarks & Original Quotations</h3>\n<p>AI search models prioritize \"information gain\"—new data that doesn\'t exist elsewhere on the web. Include unique statistics, case studies, proprietary surveys, and expert quotes. Content that merely rephrases Wikipedia or competitor articles is filtered out by generative deduplication filters.</p>\n\n<h3>4. Structure Comparisons with Clean HTML Tables & Bulleted Lists</h3>\n<p>Tables and lists provide structured semantic tokens that LLM parsers easily convert into side-by-side generative comparison blocks. Ensure every table has descriptive <code>&lt;th&gt;</code> headers and precise numerical comparisons.</p>\n\n<h3>5. Optimize for Conversational, Multi-Turn Search Prompts</h3>\n<p>Users no longer search in robotic 2-word queries like \"best seo tools\". They search conversationally: <em>\"Which technical SEO audit tools integrate directly with Google Search Console API for multi-site monitoring?\"</em> Optimize your subheadings to match natural conversational question patterns.</p>\n\n<h2>Comparison: Traditional SEO vs. Generative Engine Optimization (GEO)</h2>\n<div style=\"overflow-x: auto; margin: 24px 0;\">\n    <table style=\"width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.92rem;\">\n        <thead>\n            <tr style=\"background: #f8fafc; border-bottom: 2px solid #cbd5e1; text-align: left;\">\n                <th style=\"padding: 12px 16px; color: #0f172a;\">Strategy Dimension</th>\n                <th style=\"padding: 12px 16px; color: #64748b;\">Traditional SEO (Ten Blue Links)</th>\n                <th style=\"padding: 12px 16px; color: #2563eb;\">GEO & AI Search (2026)</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr style=\"border-bottom: 1px solid #e2e8f0;\">\n                <td style=\"padding: 12px 16px; font-weight: 700;\">Primary KPI</td>\n                <td style=\"padding: 12px 16px;\">Rank Position #1–#3</td>\n                <td style=\"padding: 12px 16px; color: #2563eb; font-weight: 600;\">AI Overview Citation Share & Brand Attribution</td>\n            </tr>\n            <tr style=\"border-bottom: 1px solid #e2e8f0;\">\n                <td style=\"padding: 12px 16px; font-weight: 700;\">Content Format</td>\n                <td style=\"padding: 12px 16px;\">Keyword-dense 2,500+ word articles</td>\n                <td style=\"padding: 12px 16px; color: #2563eb; font-weight: 600;\">High-density answer capsules + Original Data</td>\n            </tr>\n            <tr style=\"border-bottom: 1px solid #e2e8f0;\">\n                <td style=\"padding: 12px 16px; font-weight: 700;\">Search Intent</td>\n                <td style=\"padding: 12px 16px;\">Single static keyword match</td>\n                <td style=\"padding: 12px 16px; color: #2563eb; font-weight: 600;\">Multi-turn conversational problem solving</td>\n            </tr>\n            <tr>\n                <td style=\"padding: 12px 16px; font-weight: 700;\">Authority Signal</td>\n                <td style=\"padding: 12px 16px;\">Raw backlink volume & PageRank</td>\n                <td style=\"padding: 12px 16px; color: #2563eb; font-weight: 600;\">Entity Salience, Co-citations & E-E-A-T</td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n<h2>How to Measure Your Brand\'s Generative AI Visibility</h2>\n<p>Tracking AI search requires modern monitoring workflows. Regularly audit prompt queries in Google Search Console using custom regex filters for conversational patterns, and monitor your citation frequency across Perplexity AI and ChatGPT Search.</p>\n\n<h3>Ready to Future-Proof Your Organic Growth?</h3>\n<p>Generative search is evolving rapidly. To assess how well your domain is structured for Google AI Overviews and modern semantic algorithms, explore our <a href=\"/services\" style=\"color: #2563eb; font-weight: 700;\">Comprehensive SEO Auditing & Strategy Services</a> or reach out directly through our <a href=\"/contact\" style=\"color: #2563eb; font-weight: 700;\">Contact Desk</a> for a customized enterprise consultation.</p>','blog_ai_overviews_geo.jpg','published',242,'2026-09-04 05:43:37','Generative Engine Optimization (GEO): Complete 2026 Guide | Abdullah Saleh','Discover how Generative Engine Optimization (GEO) works. Learn actionable tactics to earn top citations in Google AI Overviews and Perplexity search in 2026.',NULL,NULL,'BlogPosting','2026-09-04 05:43:37','2026-09-04 05:58:43'),(30,1,5,'AI Content & Google Helpful Content: Scaling AI Writing Without Risking Penalties','ai-content-google-helpful-content-eat-safety-guide','Learn how to safely scale high-performing content using AI tools while complying with Google’s Helpful Content system and Quality Rater guidelines through human-in-the-loop editorial frameworks.','<h2>Google’s Official Policy on AI-Generated Content</h2>\n<p>A common misconception in digital marketing is that Google automatically penalizes AI-written articles. Google\'s Search Guidance explicitly states: <em>\"Our focus on the quality of content, rather than how content is produced, is a useful guide for evaluating content creators.\"</em></p>\n<p>However, publishing unedited, generic AI output at scale triggers Google\'s <strong>Scaled Content Abuse</strong> filters and Helpful Content devaluations. The key to sustainable rankings is combining AI efficiency with rigorous <strong>Human-in-the-Loop (HITL)</strong> editorial oversight and undeniable <strong>E-E-A-T</strong> (Experience, Expertise, Authoritativeness, and Trustworthiness).</p>\n\n<h3>Why Raw AI Content Fails in Search Algorithms</h3>\n<ul>\n    <li><strong>Lack of First-Hand Experience:</strong> Large Language Models cannot physically test software, conduct original lab audits, or interview clients. They summarize existing consensus.</li>\n    <li><strong>Hallucinations & Outdated Data:</strong> AI models frequently generate fabricated citations, deprecated code snippets, and outdated pricing tables.</li>\n    <li><strong>Semantic Uniformity:</strong> Content generated solely by LLMs exhibits predictable perplexity and burstiness patterns that search classifiers easily identify as low-effort commodity text.</li>\n</ul>\n\n<h2>The 4-Pillar Human-in-the-Loop (HITL) Content Framework</h2>\n\n<div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 24px 0;\">\n    <div style=\"background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);\">\n        <div style=\"width: 36px; height: 36px; border-radius: 6px; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; margin-bottom: 12px;\">\n            <i class=\"fa-solid fa-flask\"></i>\n        </div>\n        <h4 style=\"margin: 0 0 6px 0; font-size: 1.05rem; color: #0f172a;\">1. Experience (E)</h4>\n        <p style=\"margin: 0; font-size: 0.88rem; color: #64748b; line-height: 1.5;\">Inject proprietary screenshots, real Search Console logs, customer test results, and personal commentary from actual practitioner testing.</p>\n    </div>\n\n    <div style=\"background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);\">\n        <div style=\"width: 36px; height: 36px; border-radius: 6px; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; margin-bottom: 12px;\">\n            <i class=\"fa-solid fa-award\"></i>\n        </div>\n        <h4 style=\"margin: 0 0 6px 0; font-size: 1.05rem; color: #0f172a;\">2. Expertise (E)</h4>\n        <p style=\"margin: 0; font-size: 0.88rem; color: #64748b; line-height: 1.5;\">Have certified subject-matter specialists edit the copy, provide technical explanations, and showcase author credentials on your site.</p>\n    </div>\n\n    <div style=\"background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);\">\n        <div style=\"width: 36px; height: 36px; border-radius: 6px; background: #fef3c7; color: #d97706; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; margin-bottom: 12px;\">\n            <i class=\"fa-solid fa-landmark\"></i>\n        </div>\n        <h4 style=\"margin: 0 0 6px 0; font-size: 1.05rem; color: #0f172a;\">3. Authoritativeness (A)</h4>\n        <p style=\"margin: 0; font-size: 0.88rem; color: #64748b; line-height: 1.5;\">Organize content into comprehensive topical clusters, ensuring every sub-topic links cleanly to your parent service pillars.</p>\n    </div>\n\n    <div style=\"background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);\">\n        <div style=\"width: 36px; height: 36px; border-radius: 6px; background: #f3e8ff; color: #9333ea; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; margin-bottom: 12px;\">\n            <i class=\"fa-solid fa-shield-halved\"></i>\n        </div>\n        <h4 style=\"margin: 0 0 6px 0; font-size: 1.05rem; color: #0f172a;\">4. Trustworthiness (T)</h4>\n        <p style=\"margin: 0; font-size: 0.88rem; color: #64748b; line-height: 1.5;\">Fact-check all statistics with direct source citations, maintain transparent editorial policies, and adhere to clean website security standards.</p>\n    </div>\n</div>\n\n<h2>Step-by-Step AI Content Workflow for Maximum Rankings</h2>\n<ol>\n    <li><strong>AI-Assisted Outline Generation:</strong> Use AI to analyze SERP intent and map out missing topic gaps, FAQs, and semantic entities.</li>\n    <li><strong>Human SME Draft Customization:</strong> Replace placeholder advice with direct real-world insights, company case studies, and proprietary methodology.</li>\n    <li><strong>Fact-Checking & Entity Validation:</strong> Verify every data point against primary sources. Link out to high-authority peer-reviewed publications.</li>\n    <li><strong>Technical On-Page Optimization:</strong> Ensure correct H1-H3 hierarchy, descriptive alt tags on custom graphics, and valid <code>Article</code> structured data.</li>\n</ol>\n\n<h3>Conclusion: The Hybrid Approach Wins</h3>\n<p>AI tools are phenomenal for acceleration and research, but <strong>human insight, strategic siloing, and verified experience</strong> remain the decisive ranking factors in modern search engines. By establishing a robust HITL editorial pipeline, you can scale organic traffic safely while outperforming low-quality automated competitors.</p>','blog_ai_content_eeat.jpg','published',242,'2026-09-04 05:43:37','AI Content & Google Helpful Content: Safe Scaling Guide | Abdullah Saleh','Learn how to scale AI content creation safely while complying with Google E-E-A-T and Helpful Content quality standards.',NULL,NULL,'BlogPosting','2026-09-04 05:43:37','2026-09-04 05:58:43'),(31,1,1,'Automating Technical SEO with AI Agents: Python Scripts, Semantic Silos & Schema Audits','automating-technical-seo-ai-agents-python-guide','Discover how engineering-led SEO architects utilize autonomous AI agents, Python scripts, and LLM APIs to automate complex crawl audits, redirect mapping, and real-time schema validation.','<h2>The Evolution of Technical SEO: From Manual Spreadsheets to Autonomous AI Agents</h2>\n<p>For large enterprise domains, SaaS platforms, and e-commerce stores with hundreds of thousands of URLs, traditional manual auditing in spreadsheets is slow, reactive, and prone to oversight. In 2026, leading SEO architects utilize <strong>autonomous AI agents and Python automation pipelines</strong> to continuously monitor, diagnose, and resolve technical crawl bottlenecks in real time.</p>\n\n<h3>What Are Autonomous AI Agents in SEO?</h3>\n<p>An SEO AI agent is a programmatic software system equipped with LLM reasoning capabilities, custom tools (such as Screaming Frog API, Google Search Console API, and PageSpeed APIs), and automated decision loops. Unlike simple scripts, an agent can identify a crawl anomaly, diagnose the root cause (e.g., a conflicting canonical directive), draft a developer pull request, and verify the resolution upon deployment.</p>\n\n<h2>4 High-Impact Technical SEO Workflows Powered by AI Automation</h2>\n\n<h3>1. Automated Semantic Topic Clustering with Vector Embeddings</h3>\n<p>Traditional keyword grouping relies on fuzzy string matching. AI agents leverage vector embedding models (such as text-embedding-3 or open-source transformer models) and clustering algorithms (HDBSCAN / K-Means) to categorize 50,000+ keywords by exact search intent and semantic similarity in seconds.</p>\n<pre style=\"background: #0f172a; color: #f8fafc; padding: 18px; border-radius: 8px; font-size: 0.88rem; overflow-x: auto;\"><code># Example: Semantic Topic Embedding Extraction with Python\nfrom sentence_transformers import SentenceTransformer\nfrom sklearn.cluster import HDBSCAN\n\nmodel = SentenceTransformer(\'all-MiniLM-L6-v2\')\nkeywords = [\"ecommerce seo audit\", \"shopify technical seo\", \"local map pack optimization\"]\nembeddings = model.encode(keywords)\n\nclusterer = HDBSCAN(min_cluster_size=2)\ncluster_labels = clusterer.fit_predict(embeddings)</code></pre>\n\n<h3>2. Intelligent Internal Link Graph Optimization</h3>\n<p>Internal link equity is the lifeblood of crawl efficiency and PageRank distribution. AI agents analyze your full site crawl graph, calculate mathematical PageRank scores, and automatically identify high-authority pages that should contextually link down to underperforming commercial target pages.</p>\n\n<h3>3. Real-Time Schema Markup Validation & Generation</h3>\n<p>Missing or malformed JSON-LD structured data hurts rich snippet visibility. Automated pipelines extract product catalog changes, customer review streams, and article updates, generating 100% compliant Schema.org JSON-LD snippets that are validated against Google\'s Rich Results API before being pushed live.</p>\n\n<h3>4. Automated 301 Redirect Mapping & Migration Verification</h3>\n<p>Site migrations and URL restructuring often result in 404 crawl waste and broken backlink equity. AI agents ingest legacy URLs, perform semantic text matching against new site hierarchies, and generate high-confidence 301 redirect maps that eliminate redirect chains and preserve ranking equity.</p>\n\n<h2>Best Practices When Implementing AI SEO Automation</h2>\n<ul>\n    <li><strong>Always Implement Human Safeguards:</strong> High-risk modifications (such as <code>robots.txt</code> changes or mass 301 redirect rules) must always require manual human approval before production rollout.</li>\n    <li><strong>Monitor Server Overhead:</strong> Ensure automated crawl agents respect server rate limits and crawl-delay directives to prevent performance degradation on production infrastructure.</li>\n    <li><strong>Combine Automation with Strategic Consulting:</strong> Automation provides real-time data and diagnostic speed, but overarching market positioning, competitor differentiation, and conversion architecture require seasoned SEO specialist guidance.</li>\n</ul>\n\n<h3>Elevate Your Technical Site Architecture Today</h3>\n<p>Whether you manage an enterprise e-commerce platform or an agile SaaS product, technical precision is the bedrock of search visibility. Discover how we diagnose crawl barriers and optimize site speed in our <a href=\"/services/technical-seo-audit\" style=\"color: #2563eb; font-weight: 700;\">Technical SEO Audit Package</a> or get in touch for custom engineering support via our <a href=\"/contact\" style=\"color: #2563eb; font-weight: 700;\">Direct Contact Desk</a>.</p>','blog_ai_technical_seo.jpg','published',243,'2026-09-04 05:43:37','Automating Technical SEO with AI Agents & Python | Abdullah Saleh','Explore how autonomous AI agents and Python automation revolutionize technical SEO audits, semantic clustering, and Schema.org validation.',NULL,NULL,'BlogPosting','2026-09-04 05:43:37','2026-09-04 05:58:43');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_tags`
--

DROP TABLE IF EXISTS `blog_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_tags` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_tags`
--

LOCK TABLES `blog_tags` WRITE;
/*!40000 ALTER TABLE `blog_tags` DISABLE KEYS */;
INSERT INTO `blog_tags` VALUES (1,'Core Web Vitals','core-web-vitals','2026-08-29 16:00:29','2026-08-29 16:00:29'),(2,'Schema Markup','schema-markup','2026-08-29 16:00:29','2026-08-29 16:00:29'),(3,'Search Intent','search-intent','2026-08-29 16:00:29','2026-08-29 16:00:29'),(4,'Shopify SEO','shopify-seo','2026-08-29 16:00:29','2026-08-29 16:00:29'),(5,'Internal Linking','internal-linking','2026-08-29 16:00:29','2026-08-29 16:00:29'),(6,'Technical Audit','technical-audit','2026-08-29 16:00:29','2026-08-29 16:00:29');
/*!40000 ALTER TABLE `blog_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_studies`
--

DROP TABLE IF EXISTS `case_studies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_studies` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `portfolio_id` bigint(20) unsigned DEFAULT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `client` varchar(191) NOT NULL,
  `industry` varchar(100) DEFAULT NULL,
  `overview` text DEFAULT NULL,
  `problem` text DEFAULT NULL,
  `research` text DEFAULT NULL,
  `strategy` text DEFAULT NULL,
  `implementation` text DEFAULT NULL,
  `results` text DEFAULT NULL,
  `conclusion` text DEFAULT NULL,
  `metrics_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metrics_json`)),
  `featured_image` varchar(255) DEFAULT NULL,
  `published_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('published','draft') DEFAULT 'published',
  `seo_title` varchar(191) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `og_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `portfolio_id` (`portfolio_id`),
  KEY `idx_case_studies_slug` (`slug`),
  CONSTRAINT `case_studies_ibfk_1` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_studies`
--

LOCK TABLES `case_studies` WRITE;
/*!40000 ALTER TABLE `case_studies` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_studies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_inquiries`
--

DROP TABLE IF EXISTS `contact_inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_inquiries` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `service_id` bigint(20) unsigned DEFAULT NULL,
  `budget` varchar(100) DEFAULT '$500 - $1,000',
  `message` text NOT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `status` enum('new','read','replied','archived') DEFAULT 'new',
  `replied_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `contact_inquiries_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_inquiries`
--

LOCK TABLES `contact_inquiries` WRITE;
/*!40000 ALTER TABLE `contact_inquiries` DISABLE KEYS */;
INSERT INTO `contact_inquiries` VALUES (1,'Michael Scott','michael@dundermifflin.com','+1 555-123-4567','https://dundermifflin.com',NULL,'$1,500 - $3,000','Need an SEO overhaul for our paper products catalog.',NULL,'new',NULL,'2026-08-29 16:11:47','2026-08-29 16:11:47'),(2,'Jesmin','syatoablog@gmail.com','4646546465','https://www.analogtattoo.com/',NULL,'$600 - $1,500','sdfasdf','::1','new',NULL,'2026-08-29 17:49:13','2026-08-29 17:49:13'),(3,'John Doe','john@example.com','01700000000','https://example.com',NULL,'$600 - $1,500','I need SEO audit and keyword research','::1','new',NULL,'2026-08-29 17:51:26','2026-08-29 17:51:26'),(4,'Jesmin','syatoablog@gmail.com','4646546465','https://www.analogtattoo.com/',NULL,'$600 - $1,500','1','::1','new',NULL,'2026-08-29 17:58:09','2026-08-29 17:58:09'),(5,'sufi','sufipk112211@gmail.com','erwer','https://chatgpt.com/',NULL,'$600 - $1,500','sdrwer','::1','read',NULL,'2026-08-30 13:52:18','2026-08-30 17:15:53'),(6,'sufi','sufipk112211@gmail.com','erwer','https://chatgpt.com/',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-01 15:20:52','2026-09-01 15:20:52'),(7,'Abdullah','abdullahbd.seo@gmail.com','','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-02 17:58:10','2026-09-02 17:58:10'),(8,'Abdullah','abdullahbd.seo@gmail.com','','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-02 17:58:10','2026-09-02 17:58:10'),(9,'Abdullah','abdullahbd.seo@gmail.com','','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-02 18:20:37','2026-09-02 18:20:37'),(10,'Abdullah','abdullahbd.seo@gmail.com','','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-02 18:20:37','2026-09-02 18:20:37'),(11,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:28:03','2026-09-03 13:28:03'),(12,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:28:03','2026-09-03 13:28:03'),(13,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:29:03','2026-09-03 13:29:03'),(14,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:29:03','2026-09-03 13:29:03'),(15,'King','kingusa112211@gmail.com','','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:34:34','2026-09-03 13:34:34'),(16,'King','kingusa112211@gmail.com','','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:34:34','2026-09-03 13:34:34'),(17,'King','kingusa112211@gmail.com','','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:34:59','2026-09-03 13:34:59'),(18,'King','kingusa112211@gmail.com','','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:34:59','2026-09-03 13:34:59'),(19,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:48:07','2026-09-03 13:48:07'),(20,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:48:07','2026-09-03 13:48:07'),(21,'yaire Ondricka','searchinfous@gmail.com','+8809722319470','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:56:12','2026-09-03 13:56:12'),(22,'yaire Ondricka','searchinfous@gmail.com','+8809722319470','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 13:56:12','2026-09-03 13:56:12'),(23,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 14:11:39','2026-09-03 14:11:39'),(24,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 14:11:40','2026-09-03 14:11:40'),(25,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 14:11:59','2026-09-03 14:11:59'),(26,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 14:11:59','2026-09-03 14:11:59'),(27,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','https://fabricghar.com/',NULL,'SEO Audit Lead','Downloaded PDF SEO Audit Report for: https://fabricghar.com/ | SEO Score: 91/100 | WhatsApp/Phone: +17184590180','::1','new',NULL,'2026-09-03 14:12:29','2026-09-03 14:12:29'),(28,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 14:15:59','2026-09-03 14:15:59'),(29,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 14:15:59','2026-09-03 14:15:59'),(30,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 14:16:20','2026-09-03 14:16:20'),(31,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 14:16:20','2026-09-03 14:16:20'),(32,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 14:16:39','2026-09-03 14:16:39'),(33,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','',NULL,'$600 - $1,500','Direct project inquiry via website.','::1','new',NULL,'2026-09-03 14:16:39','2026-09-03 14:16:39'),(34,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','https://fabricghar.com/',NULL,'SEO Audit Lead','Downloaded PDF SEO Audit Report for: https://fabricghar.com/ | SEO Score: 91/100 | WhatsApp/Phone: +17184590180','::1','new',NULL,'2026-09-03 14:25:02','2026-09-03 14:25:02'),(35,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','https://fabricghar.com/',NULL,'SEO Audit Lead','Downloaded PDF SEO Audit Report for: https://fabricghar.com/ | SEO Score: 91/100 | WhatsApp/Phone: +17184590180','::1','new',NULL,'2026-09-03 14:29:21','2026-09-03 14:29:21'),(36,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','https://fabricghar.com/',NULL,'SEO Audit Lead','Downloaded PDF SEO Audit Report for: https://fabricghar.com/ | SEO Score: 83/100 | WhatsApp/Phone: +17184590180','::1','new',NULL,'2026-09-03 14:49:20','2026-09-03 14:49:20'),(37,'Jennifer Dille','jimoni1923@chatich.com','+17184590180','https://fabricghar.com/',NULL,'SEO Audit Lead','Downloaded PDF SEO Audit Report for: https://fabricghar.com/ | SEO Score: 83/100 | WhatsApp/Phone: +17184590180','::1','new',NULL,'2026-09-03 15:16:37','2026-09-03 15:16:37');
/*!40000 ALTER TABLE `contact_inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faqs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `category` varchar(100) DEFAULT 'General SEO',
  `sort_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES (1,'How long does it take to see tangible results from SEO?','SEO is a compounding organic growth strategy. Technical improvements, crawl fixations, and on-page adjustments often reflect in Google Search Console within 3 to 6 weeks. Core commercial keyword rank improvements and organic revenue acceleration typically compound significantly between months 3 and 6.','General SEO',1,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(2,'Do you guarantee #1 rankings on Google?','No ethical SEO specialist can guarantee a specific #1 rank because Google controls search algorithm updates. What we guarantee is a rigorous, data-driven methodology, 100% white-hat execution, transparent weekly progress reporting, and search strategies proven to outperform competitors over time.','General SEO',2,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(3,'What industries and CMS platforms do you specialize in?','We have deep expertise across E-Commerce (Shopify, WooCommerce, Magento), B2B SaaS, Professional Services, Healthcare, Real Estate, Local Businesses, and Custom Web Applications built on Next.js, WordPress, or Laravel.','General SEO',3,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(4,'How do you choose target keywords for our campaign?','We analyze search volume, keyword difficulty (KD), search intent (informational vs commercial), business profitability, and competitor ranking gaps using Ahrefs and Semrush to create structured keyword clusters and high-converting topic silos.','General SEO',4,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(5,'Can you fix Google indexing errors and Core Web Vitals issues?','Yes! Our technical SEO audits systematically resolve crawl budget bloat, orphaned URLs, canonical conflicts, redirect loops, slow LCP/INP/CLS metrics, JavaScript hydration delays, and missing Schema.org JSON-LD structured data.','Technical SEO',5,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(6,'What tools and software do you use for audits and analysis?','We utilize industry-leading enterprise toolstacks including Ahrefs, Semrush, Google Search Console, Google Analytics 4, Screaming Frog SEO Spider, Sitebulb, PageSpeed Insights, and custom Python scrapers for deep technical analysis.','Technical SEO',6,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(7,'Do you need administrative access to our website backend?','For audit-only packages, we only require Google Search Console and Google Analytics read access. For complete implementation packages, temporary CMS admin access (WordPress/Shopify) or developer collaboration via Git/staging environment is recommended.','Technical SEO',7,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(8,'What payment methods do you support and will I receive an invoice?','We accept all major verified digital payment options including crypto (USDT, BTC, ETH, SOL) via NOWPayments with automated confirmation, alongside verified bKash mobile payments. An official downloadable digital invoice with a unique Order ID is generated immediately upon confirmation.','Payments & Billing',8,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(9,'Will I receive comprehensive reports and actionable deliverables?','Every deliverable includes an exhaustive PDF report, an actionable prioritized Google Sheets checklist, live Search Console benchmark tracking, and an exclusive Loom video walkthrough explaining every insight, metric, and implementation step.','Deliverables & Reporting',9,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(10,'Do you provide ongoing monthly SEO retainers after audits?','Yes! After completing technical audits or initial keyword cluster setups, we offer dedicated monthly retainer packages covering continuous link building, fresh on-page sprints, ranking monitoring, and technical maintenance.','Deliverables & Reporting',10,'active','2026-09-01 16:30:46','2026-09-01 16:30:46');
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `homepage_sections`
--

DROP TABLE IF EXISTS `homepage_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `homepage_sections` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `section_key` varchar(100) NOT NULL,
  `title` varchar(191) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `settings_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`settings_json`)),
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `section_key` (`section_key`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homepage_sections`
--

LOCK TABLES `homepage_sections` WRITE;
/*!40000 ALTER TABLE `homepage_sections` DISABLE KEYS */;
INSERT INTO `homepage_sections` VALUES (1,'hero','Strategic SEO That Drives Real Organic Revenue','Abdullah Saleh | SEO Specialist & Organic Growth Strategist','I help ambitious businesses scale sustainable organic visibility, fix deep technical search bottlenecks, and attract high-converting organic buyers with ethical, data-driven SEO strategies.','','{\"badge\":\"Verified SEO Expert & Consultant\",\"cta_primary_text\":\"Hire Me \\/ Order Service\",\"cta_primary_link\":\"#services\",\"cta_secondary_text\":\"View Case Studies\",\"cta_secondary_link\":\"#portfolio\",\"stat1_num\":\"7+\",\"stat1_label\":\"Years SEO Experience\",\"stat2_num\":\"120+\",\"stat2_label\":\"Projects Optimized\",\"stat3_num\":\"98%\",\"stat3_label\":\"Client Satisfaction Rate\",\"stat4_num\":\"3.5x\",\"stat4_label\":\"Average Organic Traffic ROI\"}',1,1,'2026-08-29 16:00:28','2026-08-31 15:31:25'),(2,'about_preview','Proven SEO Methodologies Without Fluff or Empty Promises','About Abdullah Saleh','With deep domain mastery in Google Search algorithms, crawl architecture, search intent semantics, and conversion-centered content clustering, I design actionable SEO systems tailored to your business model. Whether you need a comprehensive technical audit, an e-commerce SEO overhaul, or an ongoing strategic partner, I deliver transparent, measurable results.','','{\"points\":[\"Deep technical SEO audits analyzing crawl budgets, rendering, and Core Web Vitals\",\"Strategic keyword research based on commercial intent and topic clustering\",\"Sustainable white-hat link building and digital PR frameworks\",\"Transparent bi-weekly reporting with clear business KPIs\"]}',2,1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(3,'process','A 6-Step Data-Driven SEO Roadmap','How We Work','Structured execution engineered for sustainable ranking growth and search equity.','','{\"steps\":[{\"num\":\"01\",\"title\":\"Discovery & Business Alignment\",\"desc\":\"Understand your niche, target buyers, margin products, and growth benchmarks.\"},{\"num\":\"02\",\"title\":\"Deep Technical & Content Audit\",\"desc\":\"Inspect 200+ crawl factors, indexation issues, cannibalization, and UX metrics.\"},{\"num\":\"03\",\"title\":\"Keyword & Semantic Mapping\",\"desc\":\"Map commercial search intent to high-converting product and landing pages.\"},{\"num\":\"04\",\"title\":\"Strategic Implementation\",\"desc\":\"Fix technical bottlenecks, optimize on-page signals, and build content clusters.\"},{\"num\":\"05\",\"title\":\"Authority & Trust Building\",\"desc\":\"Ethical digital PR, contextual brand mentions, and high-tier link acquisition.\"},{\"num\":\"06\",\"title\":\"Measure, Iterate & Scale\",\"desc\":\"Track rankings, organic impressions, and revenue conversion metrics weekly.\"}]}',3,1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(4,'cta_banner','Ready to Dominate Search and Scale Organic Revenue?','Let\'s Build Your Customized SEO Plan','Book a consulting session or order a targeted SEO service package today to unlock sustainable organic growth.','','{\"btn_text\":\"Get Started Today\",\"btn_link\":\"\\/contact\"}',4,1,'2026-08-29 16:00:28','2026-08-29 16:00:28');
/*!40000 ALTER TABLE `homepage_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `invoice_number` varchar(100) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(10) DEFAULT 'USD',
  `status` enum('paid','unpaid','cancelled') DEFAULT 'unpaid',
  `issued_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_number` (`invoice_number`),
  KEY `order_id` (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `idx_invoices_number` (`invoice_number`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,1,2,'INV-20260829-001',650.00,0.00,650.00,'USD','paid','2026-08-29 16:00:29','2026-08-29 16:00:29','2026-08-29 16:00:29','2026-08-29 16:00:29'),(2,4,2,'INV-20260829-004',650.00,0.00,650.00,'USD','paid','2026-08-29 12:11:47','2026-08-29 12:11:47','2026-08-29 16:11:47','2026-08-29 16:11:47');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uploaded_by` bigint(20) unsigned DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `mime_type` varchar(100) NOT NULL,
  `size` bigint(20) unsigned NOT NULL DEFAULT 0,
  `width` int(10) unsigned DEFAULT NULL,
  `height` int(10) unsigned DEFAULT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `uploaded_by` (`uploaded_by`),
  CONSTRAINT `media_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` bigint(20) unsigned NOT NULL,
  `receiver_id` bigint(20) unsigned NOT NULL,
  `order_id` bigint(20) unsigned DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter_subscribers`
--

DROP TABLE IF EXISTS `newsletter_subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsletter_subscribers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `status` enum('subscribed','unsubscribed') DEFAULT 'subscribed',
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter_subscribers`
--

LOCK TABLES `newsletter_subscribers` WRITE;
/*!40000 ALTER TABLE `newsletter_subscribers` DISABLE KEYS */;
/*!40000 ALTER TABLE `newsletter_subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `type` varchar(100) DEFAULT 'system',
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `data_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data_json`)),
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,2,'order','Order #ORD-20260829-001 In Progress','MD Abdullah has started working on your Comprehensive Technical SEO Audit.','/client/orders/1',NULL,NULL,'2026-08-29 16:00:29','2026-08-29 16:00:29'),(2,2,'payment','Payment Confirmed for Order #ORD-20260829-5F059','Your crypto payment has been verified. MD Abdullah has begun work on your project!','/client/orders/4',NULL,NULL,'2026-08-29 16:11:47','2026-08-29 16:11:47'),(3,2,'order','Order #ORD-20260830-001 In Progress','Abdullah Saleh has started working on your Comprehensive Technical SEO Audit.','/client/orders/1',NULL,NULL,'2026-08-30 13:30:39','2026-08-30 13:30:39'),(4,2,'order','Order #ORD-20260831-001 In Progress','Abdullah Saleh has started working on your Comprehensive Technical SEO Audit.','/client/orders/1',NULL,NULL,'2026-08-31 15:31:25','2026-08-31 15:31:25'),(5,2,'order','Order #ORD-20260901-001 In Progress','Abdullah Saleh has started working on your Comprehensive Technical SEO Audit.','/client/orders/1',NULL,NULL,'2026-09-01 15:52:34','2026-09-01 15:52:34'),(6,2,'order','Order #ORD-20260901-001 In Progress','Abdullah Saleh has started working on your Comprehensive Technical SEO Audit.','/client/orders/1',NULL,NULL,'2026-09-01 15:53:11','2026-09-01 15:53:11'),(7,2,'order','Order #ORD-20260901-001 In Progress','Abdullah Saleh has started working on your Comprehensive Technical SEO Audit.','/client/orders/1',NULL,NULL,'2026-09-01 16:05:45','2026-09-01 16:05:45'),(8,2,'order','Order #ORD-20260901-001 In Progress','Abdullah Saleh has started working on your Comprehensive Technical SEO Audit.','/client/orders/1',NULL,NULL,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(9,2,'order','Order #ORD-20260901-001 In Progress','Abdullah Saleh has started working on your Comprehensive Technical SEO Audit.','/client/orders/1',NULL,NULL,'2026-09-01 16:30:46','2026-09-01 16:30:46');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_files`
--

DROP TABLE IF EXISTS `order_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_files` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `uploaded_by` bigint(20) unsigned NOT NULL,
  `filename` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `mime_type` varchar(100) NOT NULL,
  `size` bigint(20) unsigned NOT NULL DEFAULT 0,
  `type` enum('client_attachment','admin_deliverable','other') DEFAULT 'admin_deliverable',
  `notes` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `uploaded_by` (`uploaded_by`),
  CONSTRAINT `order_files_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_files_ibfk_2` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_files`
--

LOCK TABLES `order_files` WRITE;
/*!40000 ALTER TABLE `order_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `service_id` bigint(20) unsigned NOT NULL,
  `package_id` bigint(20) unsigned NOT NULL,
  `title` varchar(191) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `metadata_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata_json`)),
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `service_id` (`service_id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_3` FOREIGN KEY (`package_id`) REFERENCES `service_packages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_number` varchar(100) NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `service_id` bigint(20) unsigned NOT NULL,
  `package_id` bigint(20) unsigned NOT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(10) DEFAULT 'USD',
  `status` enum('pending','awaiting_payment','payment_submitted','payment_confirmed','in_progress','waiting_client','completed','cancelled','refunded') DEFAULT 'awaiting_payment',
  `website_url` varchar(255) DEFAULT NULL,
  `target_country` varchar(100) DEFAULT NULL,
  `target_keywords` text DEFAULT NULL,
  `client_notes` text DEFAULT NULL,
  `admin_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `user_id` (`user_id`),
  KEY `service_id` (`service_id`),
  KEY `package_id` (`package_id`),
  KEY `idx_orders_number` (`order_number`),
  KEY `idx_orders_status` (`status`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`package_id`) REFERENCES `service_packages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'ORD-20260829-001',2,1,2,650.00,0.00,650.00,'USD','in_progress','https://example-clientstore.com','United States','ecommerce technical audit, shopify seo optimization','Please focus particularly on our collection pages and mobile speed.','Initial audit completed. Deliverable report in progress.','2026-08-29 16:00:29','2026-08-30 13:30:39'),(2,'ORD-20260829-TEST99',2,1,2,650.00,0.00,650.00,'USD','awaiting_payment','https://nordic-test.com','United States','technical seo audit test','Test order verification',NULL,'2026-08-29 16:11:30','2026-08-29 16:11:30'),(4,'ORD-20260829-5F059',2,1,2,650.00,0.00,650.00,'USD','payment_confirmed','https://nordic-test.com','United States','technical seo audit test','Test order verification',NULL,'2026-08-29 16:11:47','2026-08-29 16:11:47'),(5,'ORD-20260829-572D5',2,1,2,650.00,0.00,650.00,'USD','awaiting_payment','https://www.skool.com/','uk','seo','',NULL,'2026-08-29 16:20:18','2026-08-29 16:20:18'),(6,'ORD-20260830-30B45',1,1,3,1200.00,0.00,1200.00,'USD','awaiting_payment','https://chatgpt.com/','United Kingdom','dsfsdf','dfasdf',NULL,'2026-08-30 14:21:12','2026-08-30 14:21:12'),(7,'ORD-20260831-83373',1,2,6,950.00,0.00,950.00,'USD','awaiting_payment','https://chatgpt.com/','Global','dsfsdf','',NULL,'2026-08-31 14:46:49','2026-08-31 14:46:49');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `content` longtext DEFAULT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `status` enum('published','draft') DEFAULT 'published',
  `template` varchar(100) DEFAULT 'default',
  `seo_title` varchar(191) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `og_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_pages_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_providers`
--

DROP TABLE IF EXISTS `payment_providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_providers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `type` varchar(50) DEFAULT 'crypto',
  `configuration_encrypted` text DEFAULT NULL,
  `supported_currencies_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`supported_currencies_json`)),
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_providers`
--

LOCK TABLES `payment_providers` WRITE;
/*!40000 ALTER TABLE `payment_providers` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `gateway` enum('nowpayments','bkash','direct_crypto') DEFAULT 'nowpayments',
  `payment_method` varchar(50) DEFAULT 'USDT-TRC20',
  `user_id` bigint(20) unsigned NOT NULL,
  `payment_ref` varchar(100) NOT NULL,
  `provider` varchar(50) DEFAULT 'cryptocurrency',
  `provider_payment_id` varchar(191) DEFAULT NULL,
  `cryptocurrency` varchar(50) DEFAULT 'USDT-TRC20',
  `network` varchar(50) DEFAULT 'TRON',
  `fiat_amount` decimal(10,2) NOT NULL,
  `bdt_amount` decimal(12,2) DEFAULT NULL,
  `crypto_amount` decimal(18,8) NOT NULL,
  `exchange_rate` decimal(18,8) NOT NULL DEFAULT 1.00000000,
  `wallet_address` varchar(255) NOT NULL,
  `sender_number` varchar(50) DEFAULT NULL,
  `transaction_hash` varchar(255) DEFAULT NULL,
  `nowpayments_payment_id` varchar(100) DEFAULT NULL,
  `nowpayments_invoice_url` varchar(255) DEFAULT NULL,
  `status` enum('pending','waiting','confirming','paid','failed','expired','refunded') DEFAULT 'waiting',
  `expires_at` timestamp NULL DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `provider_response_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`provider_response_json`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_ref` (`payment_ref`),
  KEY `order_id` (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `idx_payments_ref` (`payment_ref`),
  KEY `idx_payments_status` (`status`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'nowpayments','USDT-TRC20',2,'PAY-DEMO-001','cryptocurrency','CRYPTO-TX-001','USDT-TRC20','TRON',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,'4a7f9c8e2b1d0e5f3a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',NULL,NULL,'paid',NULL,'2026-08-29 16:00:29',NULL,'2026-08-29 16:00:29','2026-08-29 16:00:29'),(2,4,'nowpayments','USDT-TRC20',2,'PAY-C53D3EE876','cryptocurrency',NULL,'USDT-TRC20','TRON (TRC20)',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,'TX-HASH-VERIFIED-e6196f234245d2a89100cc1670e0b50c',NULL,NULL,'paid','2026-08-29 13:11:47','2026-08-29 12:11:47',NULL,'2026-08-29 16:11:47','2026-08-29 16:11:47'),(3,5,'nowpayments','USDT-TRC20',2,'PAY-3B14DC47B4','cryptocurrency',NULL,'USDT-TRC20','TRON (TRC20)',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,NULL,NULL,'waiting','2026-08-29 13:20:18',NULL,NULL,'2026-08-29 16:20:18','2026-08-29 16:20:18'),(4,1,'nowpayments','USDT-TRC20',2,'NP-20260829-5E350','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',250.00,NULL,250.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-7B5F3632E25E','https://nowpayments.io/payment/?iid=NOWPAY-7B5F3632E25E','waiting','2026-08-29 13:24:09',NULL,NULL,'2026-08-29 16:24:09','2026-08-29 16:24:09'),(5,1,'bkash','bKash (Personal)',2,'BK-20260829-6173E','cryptocurrency',NULL,'BDT (bKash)','bKash MFS Bangladesh',250.00,30625.00,0.00000000,1.00000000,'01700000000','01812345678','BK9A8K1059',NULL,NULL,'','2026-08-30 12:24:09',NULL,NULL,'2026-08-29 16:24:09','2026-08-29 16:24:09'),(6,1,'nowpayments','USDT-TRC20',2,'NP-20260829-95519','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',250.00,NULL,250.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-49ACB5B33365','https://nowpayments.io/payment/?iid=NOWPAY-49ACB5B33365','waiting','2026-08-29 13:24:28',NULL,NULL,'2026-08-29 16:24:28','2026-08-29 16:24:28'),(7,1,'bkash','bKash (Personal)',2,'BK-20260829-965D6','cryptocurrency',NULL,'BDT (bKash)','bKash MFS Bangladesh',250.00,30625.00,0.00000000,1.00000000,'01700000000','01812345678','BK9A8K2448',NULL,NULL,'','2026-08-30 12:24:28',NULL,NULL,'2026-08-29 16:24:28','2026-08-29 16:24:28'),(8,1,'nowpayments','USDT-TRC20',2,'NP-20260829-EF75C','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',250.00,NULL,250.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-8B998794443B','https://nowpayments.io/payment/?iid=NOWPAY-8B998794443B','waiting','2026-08-29 13:24:39',NULL,NULL,'2026-08-29 16:24:39','2026-08-29 16:24:39'),(9,1,'bkash','bKash (Personal)',2,'BK-20260829-EFFA2','cryptocurrency',NULL,'BDT (bKash)','bKash MFS Bangladesh',250.00,30750.00,0.00000000,1.00000000,'01700000000','01812345678','BK9A8K1801',NULL,NULL,'paid','2026-08-30 12:24:39',NULL,NULL,'2026-08-29 16:24:39','2026-08-29 16:24:39'),(10,1,'nowpayments','USDT-TRC20',2,'NP-20260829-CED62','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-8F599D9C63D9','https://nowpayments.io/payment/?iid=NOWPAY-8F599D9C63D9','waiting','2026-08-29 13:25:01',NULL,NULL,'2026-08-29 16:25:01','2026-08-29 16:25:01'),(11,1,'nowpayments','USDT-TRC20',2,'NP-20260829-F3C6C','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-E7CC2DED77A5','https://nowpayments.io/payment/?iid=NOWPAY-E7CC2DED77A5','waiting','2026-08-29 13:25:06',NULL,NULL,'2026-08-29 16:25:06','2026-08-29 16:25:06'),(12,1,'nowpayments','USDT-TRC20',2,'NP-20260829-7EF1A','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-DB6BE20D6E64','https://nowpayments.io/payment/?iid=NOWPAY-DB6BE20D6E64','waiting','2026-08-29 13:25:09',NULL,NULL,'2026-08-29 16:25:09','2026-08-29 16:25:09'),(13,1,'nowpayments','USDT-TRC20',2,'NP-20260829-266E3','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-D51FD7F63F84','https://nowpayments.io/payment/?iid=NOWPAY-D51FD7F63F84','waiting','2026-08-29 13:25:21',NULL,NULL,'2026-08-29 16:25:21','2026-08-29 16:25:21'),(14,1,'nowpayments','USDT-TRC20',2,'NP-20260829-6DE98','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-CB8D129A1F7C','https://nowpayments.io/payment/?iid=NOWPAY-CB8D129A1F7C','waiting','2026-08-29 13:25:24',NULL,NULL,'2026-08-29 16:25:24','2026-08-29 16:25:24'),(15,1,'bkash','bKash (Personal)',2,'BK-20260829-793A9','cryptocurrency',NULL,'BDT (bKash)','bKash MFS Bangladesh',650.00,79950.00,0.00000000,1.00000000,'01700000000','01812345678','BKASH-5729F096F1',NULL,NULL,'paid','2026-08-30 12:25:24',NULL,NULL,'2026-08-29 16:25:24','2026-08-29 16:25:24'),(16,1,'nowpayments','USDT-TRC20',2,'NP-20260829-7A4F4','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-8506DBDBC25C','https://nowpayments.io/payment/?iid=NOWPAY-8506DBDBC25C','waiting','2026-08-29 13:27:44',NULL,NULL,'2026-08-29 16:27:44','2026-08-29 16:27:44'),(17,1,'nowpayments','USDT-TRC20',2,'NP-20260829-5799E','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-765CC3F61838','https://nowpayments.io/payment/?iid=NOWPAY-765CC3F61838','waiting','2026-08-29 13:31:13',NULL,NULL,'2026-08-29 16:31:13','2026-08-29 16:31:13'),(18,1,'nowpayments','USDT-TRC20',2,'NP-20260829-41877','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-0A37645F3D2F','https://nowpayments.io/payment/?iid=NOWPAY-0A37645F3D2F','waiting','2026-08-29 14:01:25',NULL,NULL,'2026-08-29 17:01:25','2026-08-29 17:01:25'),(19,1,'nowpayments','USDT-TRC20',2,'NP-20260829-0C778','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-912281844C1C','https://nowpayments.io/payment/?iid=NOWPAY-912281844C1C','waiting','2026-08-29 14:22:34',NULL,NULL,'2026-08-29 17:22:34','2026-08-29 17:22:34'),(20,1,'nowpayments','USDT-TRC20',2,'NP-20260829-B411B','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',650.00,NULL,650.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-8585FC4543A0','https://nowpayments.io/payment/?iid=NOWPAY-8585FC4543A0','waiting','2026-08-29 14:39:33',NULL,NULL,'2026-08-29 17:39:33','2026-08-29 17:39:33'),(21,6,'nowpayments','USDT',1,'NP-20260830-4DD05','cryptocurrency',NULL,'USDT','Automated NOWPayments Gateway',1200.00,NULL,1200.00000000,1.00000000,'TXxxNOWPAYMENTSDepositWalletAddress',NULL,NULL,'NOWPAY-9352737A3726','https://nowpayments.io/payment/?iid=NOWPAY-9352737A3726','waiting','2026-08-30 11:21:12',NULL,NULL,'2026-08-30 14:21:12','2026-08-30 14:21:12'),(22,6,'nowpayments','USDT-TRC20',1,'NP-20260830-568DC','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',1200.00,NULL,1200.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-6B4439C193B8','https://nowpayments.io/payment/?iid=NOWPAY-6B4439C193B8','waiting','2026-08-30 11:21:12',NULL,NULL,'2026-08-30 14:21:12','2026-08-30 14:21:12'),(23,6,'nowpayments','USDT-ERC20',1,'NP-20260830-DC845','cryptocurrency',NULL,'USDT-ERC20','Automated NOWPayments Gateway',1200.00,NULL,1200.00000000,1.00000000,'TXxxNOWPAYMENTSDepositWalletAddress',NULL,NULL,'NOWPAY-623F06E4F260','https://nowpayments.io/payment/?iid=NOWPAY-623F06E4F260','waiting','2026-08-30 11:22:04',NULL,NULL,'2026-08-30 14:22:04','2026-08-30 14:22:04'),(24,6,'nowpayments','BTC',1,'NP-20260830-470EA','cryptocurrency',NULL,'BTC','Automated NOWPayments Gateway',1200.00,NULL,0.01800000,1.00000000,'bc1qdemo...BitcoinSegwitWalletAddress123',NULL,NULL,'NOWPAY-88FFE0AD6B6D','https://nowpayments.io/payment/?iid=NOWPAY-88FFE0AD6B6D','waiting','2026-08-30 11:22:06',NULL,NULL,'2026-08-30 14:22:06','2026-08-30 14:22:06'),(25,7,'nowpayments','USDT',1,'NP-20260831-A161B','cryptocurrency',NULL,'USDT','Automated NOWPayments Gateway',950.00,NULL,950.00000000,1.00000000,'TXxxNOWPAYMENTSDepositWalletAddress',NULL,NULL,'NOWPAY-8C4FE83AA2D9','https://nowpayments.io/payment/?iid=NOWPAY-8C4FE83AA2D9','waiting','2026-08-31 11:46:49',NULL,NULL,'2026-08-31 14:46:49','2026-08-31 14:46:49'),(26,7,'nowpayments','USDT-TRC20',1,'NP-20260831-AA278','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',950.00,NULL,950.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-57C3EAE05B09','https://nowpayments.io/payment/?iid=NOWPAY-57C3EAE05B09','waiting','2026-08-31 11:46:49',NULL,NULL,'2026-08-31 14:46:49','2026-08-31 14:46:49'),(27,7,'nowpayments','USDT-ERC20',1,'NP-20260831-DADA4','cryptocurrency',NULL,'USDT-ERC20','Automated NOWPayments Gateway',950.00,NULL,950.00000000,1.00000000,'TXxxNOWPAYMENTSDepositWalletAddress',NULL,NULL,'NOWPAY-83FD198B0CA2','https://nowpayments.io/payment/?iid=NOWPAY-83FD198B0CA2','waiting','2026-08-31 11:47:01',NULL,NULL,'2026-08-31 14:47:01','2026-08-31 14:47:01'),(28,7,'nowpayments','BTC',1,'NP-20260831-B119D','cryptocurrency',NULL,'BTC','Automated NOWPayments Gateway',950.00,NULL,0.01425000,1.00000000,'bc1qdemo...BitcoinSegwitWalletAddress123',NULL,NULL,'NOWPAY-C471635A8FE5','https://nowpayments.io/payment/?iid=NOWPAY-C471635A8FE5','waiting','2026-08-31 11:47:02',NULL,NULL,'2026-08-31 14:47:02','2026-08-31 14:47:02'),(29,7,'nowpayments','ETH',1,'NP-20260831-8239F','cryptocurrency',NULL,'ETH','Automated NOWPayments Gateway',950.00,NULL,0.36100000,1.00000000,'0x71C...DemoEthereumWalletAddressForETH999',NULL,NULL,'NOWPAY-88DA66D9FF44','https://nowpayments.io/payment/?iid=NOWPAY-88DA66D9FF44','waiting','2026-08-31 11:47:03',NULL,NULL,'2026-08-31 14:47:03','2026-08-31 14:47:03'),(30,7,'nowpayments','SOL',1,'NP-20260831-ACA42','cryptocurrency',NULL,'SOL','Automated NOWPayments Gateway',950.00,NULL,6.46000000,1.00000000,'SoL111DemoSolanaNetworkWalletAddress456',NULL,NULL,'NOWPAY-7BF1CD1AAD37','https://nowpayments.io/payment/?iid=NOWPAY-7BF1CD1AAD37','waiting','2026-08-31 11:47:04',NULL,NULL,'2026-08-31 14:47:04','2026-08-31 14:47:04'),(31,7,'nowpayments','USDT-TRC20',1,'NP-20260831-85A03','cryptocurrency',NULL,'USDT-TRC20','Automated NOWPayments Gateway',950.00,NULL,950.00000000,1.00000000,'TXxxDemoTronWalletAddressForUSDTPayments888',NULL,NULL,'NOWPAY-14EE0D54EA6A','https://nowpayments.io/payment/?iid=NOWPAY-14EE0D54EA6A','waiting','2026-08-31 11:47:12',NULL,NULL,'2026-08-31 14:47:12','2026-08-31 14:47:12');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_role` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `permission_role_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `permission_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio_categories`
--

DROP TABLE IF EXISTS `portfolio_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolio_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_categories`
--

LOCK TABLES `portfolio_categories` WRITE;
/*!40000 ALTER TABLE `portfolio_categories` DISABLE KEYS */;
INSERT INTO `portfolio_categories` VALUES (1,'E-Commerce SEO','ecommerce-seo','Online store rankings, faceted navigation, and organic revenue scaling','active','2026-08-29 16:00:29','2026-08-31 16:01:48'),(2,'Technical SEO Overhaul','technical-seo','Crawl architecture, JS rendering, speed, and indexation fixes','active','2026-08-29 16:00:29','2026-08-31 16:01:48'),(3,'Local SEO & Map Pack','local-seo','Local business visibility, Google Business Profile, and lead generation','active','2026-08-29 16:00:29','2026-08-31 16:01:48'),(4,'SaaS & Enterprise SEO','saas-enterprise','High-intent software keyword domination and enterprise search scale','active','2026-08-29 16:00:29','2026-08-31 16:01:48'),(5,'Rapid Growth Sprints','rapid-growth-sprints','Fast-track search indexation and swift ranking acceleration','active','2026-08-31 16:01:48','2026-08-31 16:01:48');
/*!40000 ALTER TABLE `portfolio_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio_images`
--

DROP TABLE IF EXISTS `portfolio_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolio_images` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `portfolio_id` bigint(20) unsigned NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `portfolio_id` (`portfolio_id`),
  CONSTRAINT `portfolio_images_ibfk_1` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_images`
--

LOCK TABLES `portfolio_images` WRITE;
/*!40000 ALTER TABLE `portfolio_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `portfolio_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolios`
--

DROP TABLE IF EXISTS `portfolios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolios` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `client_name` varchar(191) NOT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `industry` varchar(100) DEFAULT 'Technology / E-commerce',
  `category_id` bigint(20) unsigned DEFAULT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `challenge` text DEFAULT NULL,
  `strategy` text DEFAULT NULL,
  `implementation` text DEFAULT NULL,
  `results` text DEFAULT NULL,
  `metrics_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metrics_json`)),
  `duration` varchar(100) DEFAULT '3 Months',
  `technologies` varchar(255) DEFAULT 'Ahrefs, Semrush, Google Search Console, Screaming Frog',
  `status` enum('published','draft') DEFAULT 'published',
  `is_featured` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  `seo_title` varchar(191) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `og_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  KEY `idx_portfolios_slug` (`slug`),
  CONSTRAINT `portfolios_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `portfolio_categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolios`
--

LOCK TABLES `portfolios` WRITE;
/*!40000 ALTER TABLE `portfolios` DISABLE KEYS */;
INSERT INTO `portfolios` VALUES (7,'Enterprise SEO Domination: Scaling to 1.18M Organic Clicks & 92.4% CTR','enterprise-seo-1-18m-clicks-gsc','Global Digital Solutions','https://example-globaldigital.com','Enterprise Technology / SaaS',4,'assets/images/portfolio/proof_gsc_1_18m_scale.jpg','Engineered high-intent search structure and technical optimization delivering 1.18 Million organic clicks with an unprecedented 92.4% click-through rate and #1 average position on Google Search Console.','The client had significant traffic potential but was held back by deep site architecture flaws, internal link cannibalization, and suboptimal snippet CTR across major commercial keywords.','Conducted an exhaustive 230-point technical crawl audit, rebuilt the internal silo hierarchy, deployed custom Product and FAQ JSON-LD schemas, and rewrote title/meta hooks to maximize search snippet click appeal.','1. Resolved 450+ canonical anomalies and duplicate URL parameters.\n2. Implemented automated breadcrumb and FAQ rich snippets.\n3. Built 40+ topic cluster pillar pages linking to core commercial hubs.\n4. Scaled high-tier contextual backlinks from DA 60+ industry portals.','Achieved 1.18 Million organic clicks and 1.28 Million impressions over a 3-month performance window with a remarkable 92.4% CTR and sustained #1 average position.','{\"total_clicks\":\"1.18M\",\"total_impressions\":\"1.28M\",\"avg_ctr\":\"92.4%\",\"avg_position\":\"1.0\"}','3 Months','Ahrefs, Semrush, Google Search Console, Screaming Frog','published',1,1,'Enterprise SEO Domination: Scaling to 1.18M Organic Clicks & 92.4% CTR | Abdullah Saleh SEO Case Study','Engineered high-intent search structure and technical optimization delivering 1.18 Million organic clicks with an unprecedented 92.4% click-through rate and #1 average position on Google Search Console.',NULL,NULL,'2026-08-31 15:31:25','2026-08-31 16:01:48'),(8,'High-CTR Authority Portal: 809K Organic Clicks with Rank #1 Stability','authority-portal-809k-clicks-gsc','Authority Web Services','https://example-authorityportal.com','High-Traffic Web Platform',4,'assets/images/portfolio/proof_gsc_809k_clicks.jpg','Comprehensive technical SEO overhaul and rich snippets strategy generating 809,000+ organic clicks and 872,000 impressions with 92.8% CTR and #1 average ranking.','High bounce rates and cannibalization between multiple overlapping service offerings prevented the domain from achieving peak rankings.','Consolidated competing URLs with clean 301 redirects, rebuilt topic clusters around exact intent queries, and optimized above-the-fold content hierarchy.','1. Deployed comprehensive Schema.org structured data.\n2. Overhauled internal linking anchor equity distribution.\n3. Pruned low-quality legacy URLs to concentrate crawl budget.\n4. Optimized Core Web Vitals (LCP < 1.2s, INP < 100ms).','Delivered 809K total clicks, 872K impressions, 92.8% average CTR, and rock-solid #1 average position across primary target queries.','{\"total_clicks\":\"809K\",\"total_impressions\":\"872K\",\"avg_ctr\":\"92.8%\",\"avg_position\":\"1.0\"}','3 Months','Ahrefs, Semrush, Google Search Console, Screaming Frog','published',1,2,'High-CTR Authority Portal: 809K Organic Clicks with Rank #1 Stability | Abdullah Saleh SEO Case Study','Comprehensive technical SEO overhaul and rich snippets strategy generating 809,000+ organic clicks and 872,000 impressions with 92.8% CTR and #1 average ranking.',NULL,NULL,'2026-08-31 15:31:25','2026-08-31 16:01:48'),(9,'Australian E-Commerce Brand: 85.1K Impressions Growth Surge','australia-ecommerce-organic-boost','Australian National Brand (.com.au)','https://example-australia-store.com.au','E-Commerce / Australia Retail',1,'assets/images/portfolio/proof_gsc_australia_growth.jpg','Rapid organic impressions surge to 85.1K impressions and 1.14K clicks across national Australian buyer search queries, moving rankings from page 2 directly into Top Tier.','Stagnant rankings stuck on pages 2-3 of Google Australia with low search visibility against entrenched legacy retailers.','Targeted high-converting Australian geo-intent keywords, resolved collection page crawl bloat, and earned high-tier AU domain backlinks.','1. Optimized 60+ collection and product category pages.\n2. Deployed Merchant and Offer schema for Google Shopping and organic rich badges.\n3. Improved mobile page speed by 58% and fixed layout shifts.\n4. Acquired 15+ Australian niche-relevant editorial links.','Organic impressions surged to 85.1K with 1,140+ targeted buyer clicks, climbing steadily up the ranks to average position 15.1 with multiple Page 1 breakouts.','{\"total_impressions\":\"85.1K\",\"total_clicks\":\"1.14K\",\"avg_ctr\":\"1.3%\",\"avg_position\":\"15.1 -> Page 1\"}','3 Months','Ahrefs, Semrush, Google Search Console, Screaming Frog','published',1,3,'Australian E-Commerce Brand: 85.1K Impressions Growth Surge | Abdullah Saleh SEO Case Study','Rapid organic impressions surge to 85.1K impressions and 1.14K clicks across national Australian buyer search queries, moving rankings from page 2 directly into Top Tier.',NULL,NULL,'2026-08-31 15:31:25','2026-08-31 16:01:48'),(10,'Fast-Track 28-Day Growth Sprint: 30.2K Impressions for Australian Brand','australia-rapid-sprint-30k-impressions','Australian Commerce Hub (.com.au)','https://example-australia-apex.com.au','Australian E-Commerce (.com.au)',5,'assets/images/portfolio/proof_gsc_ecommerce_boost.jpg','Rapid 28-day growth sprint delivering 30,200 impressions and solid position gains across competitive commercial queries in record time.','Newly launched store sections were experiencing slow Googlebot discovery and indexation delays on important commercial product offerings.','Submitted optimized XML sitemaps via GSC API, fixed crawl errors, deployed semantic content headers with direct intent match, and executed targeted indexing signals.','1. Indexed 100% of key product & category URLs within 72 hours.\n2. Structured transactional buyer intent landing pages.\n3. Implemented localized NAP consistency and structured business schema.\n4. Launched rapid outreach for niche relevant signals.','Attained 30.2K impressions and 363 high-intent clicks within just 28 days, achieving an average position of 13.6 with rapid upward momentum.','{\"impressions_28d\":\"30.2K\",\"clicks_28d\":\"363\",\"avg_position\":\"13.6\",\"timeline\":\"28 Days\"}','28 Days','Ahrefs, Semrush, Google Search Console, Screaming Frog','published',1,4,'Fast-Track 28-Day Growth Sprint: 30.2K Impressions for Australian Brand | Abdullah Saleh SEO Case Study','Rapid 28-day growth sprint delivering 30,200 impressions and solid position gains across competitive commercial queries in record time.',NULL,NULL,'2026-08-31 15:31:25','2026-08-31 16:01:48'),(11,'Live Verified Search Console Audit: 23K+ Daily Impressions Peak & Validated ROI','enterprise-keyword-dominance-scale','Enterprise Web Platform','https://example-apexcloud.com','Global SaaS & Cloud',4,'assets/images/portfolio/proof_gsc_1_18m_verified.jpg','Validated multi-month organic expansion reaching up to 23,000 daily impressions and maintaining #1 rank across primary target phrases with live Search Console verification.','Maintaining search leadership despite major Google core algorithm updates and aggressive competitor backlink campaigns.','Implemented continuous content freshness updates, entity authority building, and Core Web Vitals optimization.','1. Monitored daily Search Console query patterns.\n2. Optimized internal link distributions across high-margin clusters.\n3. Secured tier-1 industry citations and brand mentions.\n4. Real-time monitoring and proactive algorithm protection.','Sustained 1.18M clicks and 1.28M impressions with peak traffic days exceeding 23,000 daily impressions and zero algorithm drop.','{\"peak_daily_impr\":\"23K+\",\"total_clicks\":\"1.18M\",\"total_impressions\":\"1.28M\",\"rank_status\":\"#1 Dominant\"}','Verified Ongoing','Ahrefs, Semrush, Google Search Console, Screaming Frog','published',1,5,'Live Verified Search Console Audit: 23K+ Daily Impressions Peak & Validated ROI | Abdullah Saleh SEO Case Study','Validated multi-month organic expansion reaching up to 23,000 daily impressions and maintaining #1 rank across primary target phrases with live Search Console verification.',NULL,NULL,'2026-08-31 15:31:25','2026-08-31 16:01:48');
/*!40000 ALTER TABLE `portfolios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redirects`
--

DROP TABLE IF EXISTS `redirects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redirects` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `old_url` varchar(255) NOT NULL,
  `new_url` varchar(255) NOT NULL,
  `status_code` int(11) DEFAULT 301,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `old_url` (`old_url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redirects`
--

LOCK TABLES `redirects` WRITE;
/*!40000 ALTER TABLE `redirects` DISABLE KEYS */;
/*!40000 ALTER TABLE `redirects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `role_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `role_user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,1),(2,2),(2,3),(2,4);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Super Administrator','super_admin','Full platform access','2026-08-29 16:00:28','2026-08-29 16:00:28'),(2,'Client / Customer','client','Registered client who can order services and track projects','2026-08-29 16:00:28','2026-08-29 16:00:28');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_categories`
--

DROP TABLE IF EXISTS `service_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_categories`
--

LOCK TABLES `service_categories` WRITE;
/*!40000 ALTER TABLE `service_categories` DISABLE KEYS */;
INSERT INTO `service_categories` VALUES (1,'Technical & Auditing','technical-auditing','Core technical crawlability, Core Web Vitals, and structural site audits.','active','2026-08-29 16:00:28','2026-08-29 16:00:28'),(2,'On-Page & Content','on-page-content','Content optimization, search intent alignment, and keyword clustering.','active','2026-08-29 16:00:28','2026-08-29 16:00:28'),(3,'E-Commerce & Specialized','ecommerce-specialized','Shopify, WooCommerce, Local SEO and international multi-lingual SEO.','active','2026-08-29 16:00:28','2026-08-29 16:00:28'),(4,'Off-Page & Authority','off-page-authority','High-authority backlink strategies, digital PR, and brand citations.','active','2026-08-29 16:00:28','2026-08-29 16:00:28');
/*!40000 ALTER TABLE `service_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_faqs`
--

DROP TABLE IF EXISTS `service_faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_faqs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `service_id` bigint(20) unsigned NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `service_faqs_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_faqs`
--

LOCK TABLES `service_faqs` WRITE;
/*!40000 ALTER TABLE `service_faqs` DISABLE KEYS */;
INSERT INTO `service_faqs` VALUES (1,1,'What access do you need to perform the audit?','We will need read access to Google Search Console and Google Analytics, plus your website URL.',1,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(2,1,'Do you fix the technical issues for us?','The audit includes step-by-step developer tickets. If you need us to directly implement fixes, we can add implementation hours.',2,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(3,1,'How long does it take?','Typically between 5 to 10 business days depending on site size.',3,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(4,2,'What tools do you use for keyword data?','We use professional subscriptions of Ahrefs, Semrush, Google Keyword Planner, AlsoAsked, and proprietary NLP clustering scripts.',1,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(5,2,'Do you provide ready-to-write briefs?','Yes, the Growth and Enterprise tiers include structured outlines and heading recommendations.',2,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(6,3,'Do you work directly on Shopify / WooCommerce?','Yes, we can work directly inside your store backend with collaborator access or provide complete developer specifications.',1,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(7,3,'How does this affect my store conversion rate?','Our on-page optimizations are strictly designed for high readability and buyer trust, improving both search rankings and on-page checkout conversion.',2,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(8,4,'Will you write new copy or optimize existing copy?','We enhance your existing copy with semantic keywords, optimized structure, and missing topical entities while preserving your brand voice.',1,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(9,5,'Are these links safe from Google penalties?','Absolutely. We only acquire links on real websites that have genuine search traffic and clean backlink profiles. We never use PBNs.',1,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(10,5,'What happens if a link is dropped?','We provide a 12-month replacement guarantee for all acquired editorial links.',2,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(11,6,'How fast do Local Map Pack rankings improve?','Local optimization changes can show improvements in the Google Map Pack within 3 to 6 weeks as citations and reviews sync.',1,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(12,7,'How does the monthly subscription work?','You get dedicated hours each month focused on technical fixes, on-page optimization, content production, and backlink outreach with bi-weekly reporting.',1,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(13,7,'Can I cancel or pause my monthly retainer anytime?','Yes, you can pause or cancel your retainer anytime with zero cancellation fees.',2,'active','2026-09-01 16:16:42','2026-09-01 16:16:42'),(14,1,'What access do you need to perform the audit?','We will need read access to Google Search Console and Google Analytics, plus your website URL.',1,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(15,1,'Do you fix the technical issues for us?','The audit includes step-by-step developer tickets. If you need us to directly implement fixes, we can add implementation hours.',2,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(16,1,'How long does it take?','Typically between 5 to 10 business days depending on site size.',3,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(17,2,'What tools do you use for keyword data?','We use professional subscriptions of Ahrefs, Semrush, Google Keyword Planner, AlsoAsked, and proprietary NLP clustering scripts.',1,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(18,2,'Do you provide ready-to-write briefs?','Yes, the Growth and Enterprise tiers include structured outlines and heading recommendations.',2,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(19,3,'Do you work directly on Shopify / WooCommerce?','Yes, we can work directly inside your store backend with collaborator access or provide complete developer specifications.',1,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(20,3,'How does this affect my store conversion rate?','Our on-page optimizations are strictly designed for high readability and buyer trust, improving both search rankings and on-page checkout conversion.',2,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(21,4,'Will you write new copy or optimize existing copy?','We enhance your existing copy with semantic keywords, optimized structure, and missing topical entities while preserving your brand voice.',1,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(22,5,'Are these links safe from Google penalties?','Absolutely. We only acquire links on real websites that have genuine search traffic and clean backlink profiles. We never use PBNs.',1,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(23,5,'What happens if a link is dropped?','We provide a 12-month replacement guarantee for all acquired editorial links.',2,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(24,6,'How fast do Local Map Pack rankings improve?','Local optimization changes can show improvements in the Google Map Pack within 3 to 6 weeks as citations and reviews sync.',1,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(25,7,'How does the monthly subscription work?','You get dedicated hours each month focused on technical fixes, on-page optimization, content production, and backlink outreach with bi-weekly reporting.',1,'active','2026-09-01 16:30:46','2026-09-01 16:30:46'),(26,7,'Can I cancel or pause my monthly retainer anytime?','Yes, you can pause or cancel your retainer anytime with zero cancellation fees.',2,'active','2026-09-01 16:30:46','2026-09-01 16:30:46');
/*!40000 ALTER TABLE `service_faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_packages`
--

DROP TABLE IF EXISTS `service_packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_packages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `service_id` bigint(20) unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(10) DEFAULT 'USD',
  `delivery_days` int(11) DEFAULT 5,
  `revisions` int(11) DEFAULT 2,
  `features_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features_json`)),
  `is_popular` tinyint(1) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `service_packages_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_packages`
--

LOCK TABLES `service_packages` WRITE;
/*!40000 ALTER TABLE `service_packages` DISABLE KEYS */;
INSERT INTO `service_packages` VALUES (1,1,'Essential Audit','essential','For websites up to 500 pages needing a quick health check.',NULL,350.00,'USD',5,1,'[\"Up to 500 pages crawled\",\"Robots.txt & Sitemap check\",\"Indexing & Canonical audit\",\"Speed & Core Web Vitals report\",\"Executive PDF summary report\",\"30-min strategy debrief call\"]',0,'active',1,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(2,1,'Standard Audit (Most Popular)','standard','Complete technical & architectural analysis for growing websites.',NULL,650.00,'USD',7,2,'[\"Up to 5,000 pages crawled\",\"JavaScript rendering inspection\",\"Full internal link equity mapping\",\"Schema \\/ Structured data validation\",\"Competitor technical benchmark\",\"Prioritized developer task sheet\",\"60-min video walk-through\"]',1,'active',2,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(3,1,'Enterprise Deep-Dive','enterprise','For large e-commerce, SaaS, or multi-lingual websites.',NULL,1200.00,'USD',12,3,'[\"Up to 50,000+ pages crawled\",\"Faceted navigation & parameter analysis\",\"Log file server crawl analysis\",\"Hreflang & international SEO audit\",\"Direct developer integration support\",\"14 days post-audit Q&A support\"]',0,'active',3,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(4,2,'Starter Cluster','starter','Targeted keyword research for 1 core niche or product category.',NULL,250.00,'USD',4,1,'[\"50+ vetted keyword targets\",\"Search intent classification\",\"Competitor keyword gap analysis\",\"Search volume & difficulty metrics\",\"Google Sheet deliverable\"]',0,'active',1,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(5,2,'Growth Authority Blueprint','growth','Full topic cluster blueprint for 3-5 core service/product pillars.',NULL,500.00,'USD',6,2,'[\"150+ categorized keywords\",\"Pillar-cluster content architecture\",\"Search intent & content angle mapping\",\"Internal linking roadmap\",\"Content brief templates (3 included)\",\"Competitor ranking benchmarks\"]',1,'active',2,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(6,2,'Full Market Domination Plan','full-market','Comprehensive 6-month content strategy and keyword architecture.',NULL,950.00,'USD',10,3,'[\"400+ targeted keywords\",\"Full buyer stage matrix (TOFU, MOFU, BOFU)\",\"10 detailed content briefs ready for writers\",\"Cannibalization risk audit\",\"6-month publication calendar\",\"Consulting strategy call\"]',0,'active',3,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(7,3,'Store Foundation','foundation','For stores with up to 100 products and 10 categories.',NULL,490.00,'USD',7,1,'[\"10 Top category pages optimized\",\"Rich product snippet schema setup\",\"Shopify \\/ WooCommerce URL audit\",\"Duplicate content cleanup\",\"Speed optimization recommendations\"]',0,'active',1,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(8,3,'Scale & Dominate','scale','Complete optimization for stores with up to 500 products.',NULL,890.00,'USD',10,2,'[\"25 Category hubs optimized\",\"Faceted search & filter SEO structure\",\"Product schema with reviews\\/stock status\",\"Internal linking & breadcrumbs overhaul\",\"Image SEO & compression strategy\",\"Competitor product gap report\"]',1,'active',2,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(9,3,'Enterprise E-Commerce','enterprise','For stores with thousands of SKUs and international markets.',NULL,1600.00,'USD',15,3,'[\"Full catalog taxonomy architecture\",\"Multi-currency \\/ Multi-region SEO\",\"Custom schema integration\",\"Dynamic metadata template design\",\"Full developer implementation support\",\"Monthly KPI tracking dashboard\"]',0,'active',3,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(10,4,'5 Key Pages','5-pages','Optimization for 5 high-priority landing or service pages.',NULL,290.00,'USD',5,1,'[\"5 Important pages optimized\",\"Title tags & meta descriptions\",\"Header hierarchy & keyword optimization\",\"Image alt tags & file naming\",\"Internal linking suggestions\"]',0,'active',1,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(11,4,'15 Key Pages (Best Value)','15-pages','Comprehensive optimization for 15 core revenue pages.',NULL,590.00,'USD',8,2,'[\"15 Core pages optimized\",\"NLP entity and semantic keyword enrichment\",\"Conversion-focused CTA placement\",\"Custom Schema markup for each page\",\"Internal linking flow implementation\",\"Before \\/ After tracking sheet\"]',1,'active',2,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(12,4,'Full Site Overhaul (30+ Pages)','full-site','Complete on-page transformation for up to 30 landing pages.',NULL,1100.00,'USD',14,3,'[\"30+ Landing & blog pages optimized\",\"Full content refresh recommendations\",\"Cannibalization cleanup\",\"Custom JSON-LD schema suite\",\"Direct CMS implementation (WordPress\\/Webflow\\/Custom)\",\"30 days ranking monitoring\"]',0,'active',3,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(13,5,'Authority Starter','starter','3 High-tier contextual editorial backlinks (DR 40-60+).',NULL,600.00,'USD',14,1,'[\"3 Editorial backlinks (DR 40+)\",\"Real websites with 5,000+ monthly traffic\",\"Contextual anchor text strategy\",\"Original 800+ word guest articles\",\"Dofollow permanent links\",\"Full transparent live link report\"]',0,'active',1,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(14,5,'Growth Accelerator','growth','7 Premium contextual backlinks (DR 50-75+).',NULL,1350.00,'USD',20,2,'[\"7 Contextual editorial links (DR 50+)\",\"Niche-relevant real organic traffic sites\",\"Strategic anchor text ratio distribution\",\"100% manual bespoke outreach\",\"Natural indexing confirmation\",\"Competitor backlink gap analysis included\"]',1,'active',2,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(15,5,'Authority Domination','domination','15 Top-tier backlinks and digital PR brand mentions.',NULL,2750.00,'USD',30,3,'[\"15 Premium links (DR 60-80+)\",\"Major industry publication placements\",\"Digital PR linkable asset creation\",\"Targeted tier-2 anchor equity boost\",\"Dedicated link strategist support\",\"Guaranteed link replacement warranty (12 months)\"]',0,'active',3,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(16,6,'Single Location Starter','single-location','Complete GBP setup and audit for 1 business location.',NULL,300.00,'USD',7,1,'[\"Google Business Profile complete overhaul\",\"Primary & secondary category audit\",\"Local keyword geo-tagging strategy\",\"LocalBusiness Schema markup\",\"Review generation strategy guide\"]',0,'active',1,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(17,6,'Map Pack Booster','map-pack','Full local optimization including citations and geo-landing pages.',NULL,550.00,'USD',10,2,'[\"Everything in Starter tier\",\"30 High-authority local citations (NAP)\",\"3 Optimized local landing pages\",\"Local competitor proximity analysis\",\"Google Posts & photo optimization schedule\",\"Local rank tracking grid setup\"]',1,'active',2,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(18,6,'Multi-Location / Regional','multi-location','For multi-location businesses or service-area businesses across cities.',NULL,990.00,'USD',15,3,'[\"Up to 3 distinct locations\\/profiles\",\"75+ Local business citations cleaned\",\"10 Geo-targeted service area pages\",\"Multi-location schema hierarchy\",\"Localized link outreach\",\"Monthly local performance reporting\"]',0,'active',3,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(19,7,'Starter','starter','Essential monthly SEO support for small websites.',NULL,125.00,'USD',30,2,'[\"15 Target Keywords\",\"Full Technical SEO Audit\",\"On-Page Optimization (5 Pages)\",\"Monthly Performance Report\",\"Email Support\"]',0,'active',1,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(20,7,'Standard','standard','Continuous organic growth engine for growing businesses.',NULL,350.00,'USD',30,3,'[\"30 Target Keywords\",\"Full Technical & Speed Audit\",\"On-Page Optimization (15 Pages)\",\"10 High-DA Backlinks \\/ Month\",\"Bi-Weekly Progress Calls\"]',1,'active',2,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(21,7,'Growth','growth','Aggressive keyword scaling and topic authority expansion.',NULL,550.00,'USD',30,4,'[\"60 Target Keywords\",\"Complete Site Optimization (30 Pages)\",\"25 High-DA Backlinks \\/ Month\",\"Content Cluster Production\",\"Dedicated Account Strategist\"]',0,'active',3,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(22,7,'Enterprise','enterprise','Full-scale SEO department dedicated to your enterprise brand.',NULL,850.00,'USD',30,99,'[\"Unlimited Keyword Targets\",\"Full Website Overhaul & Core Web Vitals\",\"50+ Premium Tier Backlinks \\/ Month\",\"Weekly Video Growth Review\",\"24\\/7 Priority Support\"]',0,'active',4,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(23,1,'Essential Audit','essential','For websites up to 500 pages needing a quick health check.',NULL,350.00,'USD',5,1,'[\"Up to 500 pages crawled\",\"Robots.txt & Sitemap check\",\"Indexing & Canonical audit\",\"Speed & Core Web Vitals report\",\"Executive PDF summary report\",\"30-min strategy debrief call\"]',0,'active',1,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(24,1,'Standard Audit (Most Popular)','standard','Complete technical & architectural analysis for growing websites.',NULL,650.00,'USD',7,2,'[\"Up to 5,000 pages crawled\",\"JavaScript rendering inspection\",\"Full internal link equity mapping\",\"Schema \\/ Structured data validation\",\"Competitor technical benchmark\",\"Prioritized developer task sheet\",\"60-min video walk-through\"]',1,'active',2,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(25,1,'Enterprise Deep-Dive','enterprise','For large e-commerce, SaaS, or multi-lingual websites.',NULL,1200.00,'USD',12,3,'[\"Up to 50,000+ pages crawled\",\"Faceted navigation & parameter analysis\",\"Log file server crawl analysis\",\"Hreflang & international SEO audit\",\"Direct developer integration support\",\"14 days post-audit Q&A support\"]',0,'active',3,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(26,2,'Starter Cluster','starter','Targeted keyword research for 1 core niche or product category.',NULL,250.00,'USD',4,1,'[\"50+ vetted keyword targets\",\"Search intent classification\",\"Competitor keyword gap analysis\",\"Search volume & difficulty metrics\",\"Google Sheet deliverable\"]',0,'active',1,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(27,2,'Growth Authority Blueprint','growth','Full topic cluster blueprint for 3-5 core service/product pillars.',NULL,500.00,'USD',6,2,'[\"150+ categorized keywords\",\"Pillar-cluster content architecture\",\"Search intent & content angle mapping\",\"Internal linking roadmap\",\"Content brief templates (3 included)\",\"Competitor ranking benchmarks\"]',1,'active',2,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(28,2,'Full Market Domination Plan','full-market','Comprehensive 6-month content strategy and keyword architecture.',NULL,950.00,'USD',10,3,'[\"400+ targeted keywords\",\"Full buyer stage matrix (TOFU, MOFU, BOFU)\",\"10 detailed content briefs ready for writers\",\"Cannibalization risk audit\",\"6-month publication calendar\",\"Consulting strategy call\"]',0,'active',3,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(29,3,'Store Foundation','foundation','For stores with up to 100 products and 10 categories.',NULL,490.00,'USD',7,1,'[\"10 Top category pages optimized\",\"Rich product snippet schema setup\",\"Shopify \\/ WooCommerce URL audit\",\"Duplicate content cleanup\",\"Speed optimization recommendations\"]',0,'active',1,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(30,3,'Scale & Dominate','scale','Complete optimization for stores with up to 500 products.',NULL,890.00,'USD',10,2,'[\"25 Category hubs optimized\",\"Faceted search & filter SEO structure\",\"Product schema with reviews\\/stock status\",\"Internal linking & breadcrumbs overhaul\",\"Image SEO & compression strategy\",\"Competitor product gap report\"]',1,'active',2,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(31,3,'Enterprise E-Commerce','enterprise','For stores with thousands of SKUs and international markets.',NULL,1600.00,'USD',15,3,'[\"Full catalog taxonomy architecture\",\"Multi-currency \\/ Multi-region SEO\",\"Custom schema integration\",\"Dynamic metadata template design\",\"Full developer implementation support\",\"Monthly KPI tracking dashboard\"]',0,'active',3,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(32,4,'5 Key Pages','5-pages','Optimization for 5 high-priority landing or service pages.',NULL,290.00,'USD',5,1,'[\"5 Important pages optimized\",\"Title tags & meta descriptions\",\"Header hierarchy & keyword optimization\",\"Image alt tags & file naming\",\"Internal linking suggestions\"]',0,'active',1,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(33,4,'15 Key Pages (Best Value)','15-pages','Comprehensive optimization for 15 core revenue pages.',NULL,590.00,'USD',8,2,'[\"15 Core pages optimized\",\"NLP entity and semantic keyword enrichment\",\"Conversion-focused CTA placement\",\"Custom Schema markup for each page\",\"Internal linking flow implementation\",\"Before \\/ After tracking sheet\"]',1,'active',2,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(34,4,'Full Site Overhaul (30+ Pages)','full-site','Complete on-page transformation for up to 30 landing pages.',NULL,1100.00,'USD',14,3,'[\"30+ Landing & blog pages optimized\",\"Full content refresh recommendations\",\"Cannibalization cleanup\",\"Custom JSON-LD schema suite\",\"Direct CMS implementation (WordPress\\/Webflow\\/Custom)\",\"30 days ranking monitoring\"]',0,'active',3,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(35,5,'Authority Starter','starter','3 High-tier contextual editorial backlinks (DR 40-60+).',NULL,600.00,'USD',14,1,'[\"3 Editorial backlinks (DR 40+)\",\"Real websites with 5,000+ monthly traffic\",\"Contextual anchor text strategy\",\"Original 800+ word guest articles\",\"Dofollow permanent links\",\"Full transparent live link report\"]',0,'active',1,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(36,5,'Growth Accelerator','growth','7 Premium contextual backlinks (DR 50-75+).',NULL,1350.00,'USD',20,2,'[\"7 Contextual editorial links (DR 50+)\",\"Niche-relevant real organic traffic sites\",\"Strategic anchor text ratio distribution\",\"100% manual bespoke outreach\",\"Natural indexing confirmation\",\"Competitor backlink gap analysis included\"]',1,'active',2,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(37,5,'Authority Domination','domination','15 Top-tier backlinks and digital PR brand mentions.',NULL,2750.00,'USD',30,3,'[\"15 Premium links (DR 60-80+)\",\"Major industry publication placements\",\"Digital PR linkable asset creation\",\"Targeted tier-2 anchor equity boost\",\"Dedicated link strategist support\",\"Guaranteed link replacement warranty (12 months)\"]',0,'active',3,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(38,6,'Single Location Starter','single-location','Complete GBP setup and audit for 1 business location.',NULL,300.00,'USD',7,1,'[\"Google Business Profile complete overhaul\",\"Primary & secondary category audit\",\"Local keyword geo-tagging strategy\",\"LocalBusiness Schema markup\",\"Review generation strategy guide\"]',0,'active',1,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(39,6,'Map Pack Booster','map-pack','Full local optimization including citations and geo-landing pages.',NULL,550.00,'USD',10,2,'[\"Everything in Starter tier\",\"30 High-authority local citations (NAP)\",\"3 Optimized local landing pages\",\"Local competitor proximity analysis\",\"Google Posts & photo optimization schedule\",\"Local rank tracking grid setup\"]',1,'active',2,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(40,6,'Multi-Location / Regional','multi-location','For multi-location businesses or service-area businesses across cities.',NULL,990.00,'USD',15,3,'[\"Up to 3 distinct locations\\/profiles\",\"75+ Local business citations cleaned\",\"10 Geo-targeted service area pages\",\"Multi-location schema hierarchy\",\"Localized link outreach\",\"Monthly local performance reporting\"]',0,'active',3,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(41,7,'Starter','starter','Essential monthly SEO support for small websites.',NULL,125.00,'USD',30,2,'[\"15 Target Keywords\",\"Full Technical SEO Audit\",\"On-Page Optimization (5 Pages)\",\"Monthly Performance Report\",\"Email Support\"]',0,'active',1,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(42,7,'Standard','standard','Continuous organic growth engine for growing businesses.',NULL,350.00,'USD',30,3,'[\"30 Target Keywords\",\"Full Technical & Speed Audit\",\"On-Page Optimization (15 Pages)\",\"10 High-DA Backlinks \\/ Month\",\"Bi-Weekly Progress Calls\"]',1,'active',2,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(43,7,'Growth','growth','Aggressive keyword scaling and topic authority expansion.',NULL,550.00,'USD',30,4,'[\"60 Target Keywords\",\"Complete Site Optimization (30 Pages)\",\"25 High-DA Backlinks \\/ Month\",\"Content Cluster Production\",\"Dedicated Account Strategist\"]',0,'active',3,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(44,7,'Enterprise','enterprise','Full-scale SEO department dedicated to your enterprise brand.',NULL,850.00,'USD',30,99,'[\"Unlimited Keyword Targets\",\"Full Website Overhaul & Core Web Vitals\",\"50+ Premium Tier Backlinks \\/ Month\",\"Weekly Video Growth Review\",\"24\\/7 Priority Support\"]',0,'active',4,'2026-09-01 16:30:46','2026-09-01 16:30:46');
/*!40000 ALTER TABLE `service_packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) unsigned DEFAULT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `icon` varchar(100) DEFAULT 'fa-chart-line',
  `status` enum('active','inactive') DEFAULT 'active',
  `is_featured` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  `starting_price` decimal(10,2) DEFAULT 0.00,
  `delivery_time` varchar(100) DEFAULT '5-7 Days',
  `seo_title` varchar(191) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `og_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  KEY `idx_services_slug` (`slug`),
  KEY `idx_services_status` (`status`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `service_categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,1,'Comprehensive Technical SEO Audit','technical-seo-audit','Uncover every crawl blocker, indexation issue, site architecture flaw, and Core Web Vitals bottleneck.','A forensic deep-dive into your website architecture. We inspect over 230+ technical checkpoints including crawl depth, robots directives, JS rendering, canonicalization, broken internal links, structured data validation, server response times, and Core Web Vitals compliance. You receive a prioritized, developer-ready action roadmap.',NULL,'fa-screwdriver-wrench','active',1,1,350.00,'5-7 Business Days','Comprehensive Technical SEO Audit | MD Abdullah SEO Services','Uncover every crawl blocker, indexation issue, site architecture flaw, and Core Web Vitals bottleneck.',NULL,NULL,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(2,2,'Strategic Keyword Research & Topic Clustering','keyword-research-topic-clustering','Discover high-intent, low-competition keywords grouped into topical authority clusters.','Stop writing random blog posts that never rank. We build a comprehensive content blueprint based on search intent, buyer journey stages (Top of Funnel, Middle of Funnel, Bottom of Funnel), and search volume dynamics to establish topical authority in your niche.',NULL,'fa-magnifying-glass-chart','active',1,2,250.00,'4-6 Business Days','Strategic Keyword Research & Topic Clustering | MD Abdullah SEO Services','Discover high-intent, low-competition keywords grouped into topical authority clusters.',NULL,NULL,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(3,3,'E-Commerce SEO Overhaul (Shopify / WooCommerce)','ecommerce-seo-optimization','Optimize category pages, product filters, structured data, and transactional search signals.','Maximize high-margin organic revenue for your online store. We optimize your catalog taxonomy, resolve duplicate product variations and faceted navigation traps, write conversion-friendly schema markup (Product, AggregateOffer, Review), and optimize high-converting category hubs.',NULL,'fa-bag-shopping','active',1,3,490.00,'7-10 Business Days','E-Commerce SEO Overhaul (Shopify / WooCommerce) | MD Abdullah SEO Services','Optimize category pages, product filters, structured data, and transactional search signals.',NULL,NULL,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(4,1,'On-Page SEO & Content Optimization','on-page-seo-optimization','Transform existing pages into search magnets with semantic entity optimization and UX refinement.','Align your core landing pages with modern search intent and Google NLP ranking criteria. We optimize title tags, meta descriptions, heading structure (H1-H4), entity coverage, keyword placement, image ALT tags, and internal link equity.',NULL,'fa-file-lines','active',1,4,290.00,'5 Business Days','On-Page SEO & Content Optimization | MD Abdullah SEO Services','Transform existing pages into search magnets with semantic entity optimization and UX refinement.',NULL,NULL,'2026-08-29 16:00:29','2026-08-29 16:00:29'),(5,4,'High-Authority Link Building & Digital PR','authority-link-building-strategy','Secure contextual, high-DR editorial backlinks and brand mentions to boost domain trust.','Build rock-solid domain authority with 100% white-hat, contextual links from real websites in your industry. No spam PBNs, no link farms, no automated spam. We specialize in manual outreach, digital PR assets, resource page link building, and broken link reclamation.',NULL,'fa-link','active',1,5,600.00,'14-21 Business Days','High-Authority Link Building & Digital PR | MD Abdullah SEO Services','Secure contextual, high-DR editorial backlinks and brand mentions to boost domain trust.',NULL,NULL,'2026-08-29 16:00:29','2026-08-29 16:00:29'),(6,3,'Local SEO & Google Business Profile Optimization','local-seo-gbp-optimization','Dominate the Google Map Pack and drive local customer calls, inquiries, and foot traffic.','Capture high-intent local customers looking for your services in your city or region. We optimize your Google Business Profile, fix NAP (Name, Address, Phone) citation consistency across 50+ local directories, build localized service pages, and implement LocalBusiness schema.',NULL,'fa-location-dot','active',1,6,300.00,'7 Business Days','Local SEO & Google Business Profile Optimization | MD Abdullah SEO Services','Dominate the Google Map Pack and drive local customer calls, inquiries, and foot traffic.',NULL,NULL,'2026-08-29 16:00:29','2026-08-29 16:00:29'),(7,1,'Monthly SEO Growth & Ranking Retainers','monthly-seo-subscription-retainer','Dedicated monthly SEO execution, technical maintenance, content expansion, and high-DA link building.','Continuous monthly organic traffic growth managed end-to-end. Includes hands-on technical SEO fixes, on-page optimization, fresh keyword publishing, contextual authority link placements, and bi-weekly strategic growth reviews.',NULL,'fa-rocket','active',1,7,125.00,'Monthly Retainer (30 Days)','Monthly SEO Growth & Ranking Retainers | Abdullah Saleh SEO Services','Dedicated monthly SEO execution, technical maintenance, content expansion, and high-DA link building.',NULL,NULL,'2026-09-01 16:16:42','2026-09-01 16:16:42');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(100) NOT NULL,
  `value` longtext DEFAULT NULL,
  `type` varchar(50) DEFAULT 'text',
  `group` varchar(50) DEFAULT 'general',
  `is_public` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `idx_settings_key` (`key`),
  KEY `idx_settings_group` (`group`)
) ENGINE=InnoDB AUTO_INCREMENT=296 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'site_name','Abdullah Saleh','text','branding',1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(2,'site_tagline','SEO Specialist & Organic Growth Strategist','text','branding',1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(3,'site_logo_text','Abdullah Saleh','text','branding',1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(4,'site_logo_image','','image','branding',1,'2026-08-29 16:00:28','2026-08-31 15:31:25'),(5,'site_favicon','','image','branding',1,'2026-08-29 16:00:28','2026-08-31 15:31:25'),(6,'primary_color','#4361ee','text','branding',1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(7,'accent_color','#06b6d4','text','branding',1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(8,'expert_name','Abdullah Saleh','text','general',1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(9,'expert_title','SEO Specialist & Organic Growth Strategist','text','general',1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(10,'expert_bio','Helping ambitious businesses build sustainable organic visibility, qualified search traffic, and scalable revenue through data-backed technical and strategic SEO.','textarea','general',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(11,'profile_photo','','image','general',1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(12,'contact_email','abdullahbd.seo@gmail.com','text','contact',1,'2026-08-29 16:00:28','2026-09-03 14:44:44'),(13,'contact_phone','+1 (555) 019-2834','text','contact',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(14,'whatsapp_number','+8801670769816','text','contact',1,'2026-08-29 16:00:28','2026-09-02 18:22:22'),(15,'office_address','Silicon Oasis Tech Park, Suite 402, New York, NY 10001','textarea','contact',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(16,'working_hours','Mon - Fri: 9:00 AM - 6:00 PM EST','text','contact',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(17,'social_linkedin','https://linkedin.com/in/abdullah-saleh-seo','text','social',1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(18,'social_twitter','https://twitter.com/abdullahsaleh_seo','text','social',1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(19,'social_github','https://github.com','text','social',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(20,'social_youtube','https://youtube.com','text','social',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(21,'default_meta_title','Abdullah Saleh | SEO Specialist & Organic Growth Strategist','text','seo',1,'2026-08-29 16:00:28','2026-08-30 17:07:35'),(22,'default_meta_description','Professional data-driven SEO consulting, technical SEO audits, e-commerce optimization, and search growth strategies by Abdullah Saleh.','textarea','seo',1,'2026-08-29 16:00:28','2026-08-30 13:30:39'),(23,'default_meta_keywords','SEO expert, SEO consultant, technical SEO audit, ecommerce SEO, keyword research, organic growth','textarea','seo',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(24,'google_analytics_id','','text','seo',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(25,'google_search_console_code','','text','seo',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(26,'schema_organization_type','ProfessionalService','text','seo',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(27,'crypto_payment_enabled','1','boolean','payment',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(28,'usdt_trc20_address','TXxxDemoTronWalletAddressForUSDTPayments888','text','payment',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(29,'usdt_erc20_address','0x71C...DemoEthereumWalletAddressForUSDT999','text','payment',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(30,'btc_address','bc1qdemo...BitcoinSegwitWalletAddress123','text','payment',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(31,'eth_address','0x71C...DemoEthereumWalletAddressForETH999','text','payment',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(32,'sol_address','SoL111DemoSolanaNetworkWalletAddress456','text','payment',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(33,'payment_expiry_minutes','60','text','payment',1,'2026-08-29 16:00:28','2026-08-29 16:00:28'),(34,'gateway_nowpayments_enabled','1','boolean','payment',1,'2026-08-29 16:21:37','2026-08-29 16:21:37'),(35,'nowpayments_api_key','DEMO_NOWPAYMENTS_API_KEY_789456','text','payment',1,'2026-08-29 16:21:37','2026-08-29 16:21:37'),(36,'nowpayments_ipn_secret','DEMO_IPN_SECRET_KEY_123','text','payment',1,'2026-08-29 16:21:37','2026-08-29 16:21:37'),(37,'nowpayments_sandbox','1','boolean','payment',1,'2026-08-29 16:21:37','2026-08-29 16:21:37'),(38,'gateway_bkash_enabled','1','boolean','payment',1,'2026-08-29 16:21:37','2026-08-29 16:21:37'),(39,'bkash_number','01700000000','text','payment',1,'2026-08-29 16:21:37','2026-08-29 16:21:37'),(40,'bkash_type','Personal','text','payment',1,'2026-08-29 16:21:37','2026-08-29 16:21:37'),(41,'bkash_usd_rate','123.00','text','payment',1,'2026-08-29 16:21:37','2026-08-29 16:24:28'),(42,'bkash_instructions','1. Go to your bKash App or dial *247#\n2. Select \'Send Money\' (for Personal) or \'Payment\' (for Merchant)\n3. Enter our bKash Number\n4. Enter the exact BDT amount\n5. Enter your Order Number as Reference\n6. Complete transaction and enter your TrxID below.','textarea','payment',1,'2026-08-29 16:21:37','2026-08-29 16:21:37'),(43,'gateway_crypto_manual_enabled','1','boolean','payment',1,'2026-08-29 16:21:37','2026-08-29 16:21:37');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support_messages`
--

DROP TABLE IF EXISTS `support_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `support_messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `message` text NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `support_messages_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `support_tickets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `support_messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support_messages`
--

LOCK TABLES `support_messages` WRITE;
/*!40000 ALTER TABLE `support_messages` DISABLE KEYS */;
INSERT INTO `support_messages` VALUES (1,1,2,'Hi MD Abdullah, I have added your email to our Google Search Console with Restricted access. Please let me know if you can view the property data.',NULL,'2026-08-29 16:00:29','2026-08-29 16:00:29'),(2,1,2,'Hi Abdullah Saleh, I have added your email to our Google Search Console with Restricted access. Please let me know if you can view the property data.',NULL,'2026-08-30 13:30:39','2026-08-30 13:30:39'),(3,2,4,'sdf sdf sdf sdfs sdf sdfsf',NULL,'2026-08-30 17:14:37','2026-08-30 17:14:37'),(4,1,2,'Hi Abdullah Saleh, I have added your email to our Google Search Console with Restricted access. Please let me know if you can view the property data.',NULL,'2026-08-31 15:31:25','2026-08-31 15:31:25'),(5,1,2,'Hi Abdullah Saleh, I have added your email to our Google Search Console with Restricted access. Please let me know if you can view the property data.',NULL,'2026-09-01 15:52:34','2026-09-01 15:52:34'),(6,1,2,'Hi Abdullah Saleh, I have added your email to our Google Search Console with Restricted access. Please let me know if you can view the property data.',NULL,'2026-09-01 15:53:11','2026-09-01 15:53:11'),(7,1,2,'Hi Abdullah Saleh, I have added your email to our Google Search Console with Restricted access. Please let me know if you can view the property data.',NULL,'2026-09-01 16:05:45','2026-09-01 16:05:45'),(8,1,2,'Hi Abdullah Saleh, I have added your email to our Google Search Console with Restricted access. Please let me know if you can view the property data.',NULL,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(9,1,2,'Hi Abdullah Saleh, I have added your email to our Google Search Console with Restricted access. Please let me know if you can view the property data.',NULL,'2026-09-01 16:30:46','2026-09-01 16:30:46');
/*!40000 ALTER TABLE `support_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support_tickets`
--

DROP TABLE IF EXISTS `support_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `support_tickets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `order_id` bigint(20) unsigned DEFAULT NULL,
  `ticket_number` varchar(100) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `priority` enum('low','medium','high','urgent') DEFAULT 'medium',
  `status` enum('open','in_progress','waiting_client','resolved','closed') DEFAULT 'open',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ticket_number` (`ticket_number`),
  KEY `user_id` (`user_id`),
  KEY `order_id` (`order_id`),
  KEY `idx_tickets_number` (`ticket_number`),
  CONSTRAINT `support_tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `support_tickets_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support_tickets`
--

LOCK TABLES `support_tickets` WRITE;
/*!40000 ALTER TABLE `support_tickets` DISABLE KEYS */;
INSERT INTO `support_tickets` VALUES (1,2,1,'TCK-1001','Question regarding Google Search Console access','medium','open','2026-08-29 16:00:29','2026-08-29 16:00:29'),(2,4,NULL,'TCK-9388','hi','medium','open','2026-08-30 17:14:37','2026-08-30 17:14:37');
/*!40000 ALTER TABLE `support_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testimonials` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `company` varchar(191) DEFAULT NULL,
  `position` varchar(191) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `testimonial` text NOT NULL,
  `rating` tinyint(4) DEFAULT 5,
  `status` enum('active','inactive') DEFAULT 'active',
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,'Sarah Jenkins','Apex Commerce UK','Head of E-Commerce',NULL,'MD Abdullah overhauled our store taxonomy and fixed critical crawl bloat. Our non-brand organic search revenue grew by 190% in just five months. Outstanding technical communication!',5,'active',1,'2026-08-29 16:00:29','2026-08-29 16:00:29'),(2,'Marcus Vance','CloudStack Technologies','VP of Growth',NULL,'The keyword clustering blueprint and technical audit delivered by MD Abdullah gave our engineering team a clear roadmap. We saw multiple core commercial pages rank on page 1 within weeks.',5,'active',2,'2026-08-29 16:00:29','2026-08-29 16:00:29'),(3,'David Chen','Apex Health Network','Managing Director',NULL,'From Google Business Profile optimization to local service landing pages, our patient inquiry calls doubled. Highly recommended for any business serious about search growth.',5,'active',3,'2026-08-29 16:00:29','2026-08-29 16:00:29'),(4,'Sarah Jenkins','Apex Commerce UK','Head of E-Commerce',NULL,'Abdullah Saleh overhauled our store taxonomy and fixed critical crawl bloat. Our non-brand organic search revenue grew by 190% in just five months. Outstanding technical communication!',5,'active',1,'2026-08-30 13:30:39','2026-08-30 13:30:39'),(5,'Marcus Vance','CloudStack Technologies','VP of Growth',NULL,'The keyword clustering blueprint and technical audit delivered by Abdullah Saleh gave our engineering team a clear roadmap. We saw multiple core commercial pages rank on page 1 within weeks.',5,'active',2,'2026-08-30 13:30:39','2026-08-30 13:30:39'),(6,'David Chen','Apex Health Network','Managing Director',NULL,'From Google Business Profile optimization to local service landing pages, our patient inquiry calls doubled. Highly recommended for any business serious about search growth.',5,'active',3,'2026-08-30 13:30:39','2026-08-30 13:30:39'),(7,'Sarah Jenkins','Apex Commerce UK','Head of E-Commerce',NULL,'Abdullah Saleh overhauled our store taxonomy and fixed critical crawl bloat. Our non-brand organic search revenue grew by 190% in just five months. Outstanding technical communication!',5,'active',1,'2026-08-31 15:31:25','2026-08-31 15:31:25'),(8,'Marcus Vance','CloudStack Technologies','VP of Growth',NULL,'The keyword clustering blueprint and technical audit delivered by Abdullah Saleh gave our engineering team a clear roadmap. We saw multiple core commercial pages rank on page 1 within weeks.',5,'active',2,'2026-08-31 15:31:25','2026-08-31 15:31:25'),(9,'David Chen','Apex Health Network','Managing Director',NULL,'From Google Business Profile optimization to local service landing pages, our patient inquiry calls doubled. Highly recommended for any business serious about search growth.',5,'active',3,'2026-08-31 15:31:25','2026-08-31 15:31:25'),(10,'Sarah Jenkins','Apex Commerce UK','Head of E-Commerce',NULL,'Abdullah Saleh overhauled our store taxonomy and fixed critical crawl bloat. Our non-brand organic search revenue grew by 190% in just five months. Outstanding technical communication!',5,'active',1,'2026-09-01 15:52:34','2026-09-01 15:52:34'),(11,'Marcus Vance','CloudStack Technologies','VP of Growth',NULL,'The keyword clustering blueprint and technical audit delivered by Abdullah Saleh gave our engineering team a clear roadmap. We saw multiple core commercial pages rank on page 1 within weeks.',5,'active',2,'2026-09-01 15:52:34','2026-09-01 15:52:34'),(12,'David Chen','Apex Health Network','Managing Director',NULL,'From Google Business Profile optimization to local service landing pages, our patient inquiry calls doubled. Highly recommended for any business serious about search growth.',5,'active',3,'2026-09-01 15:52:34','2026-09-01 15:52:34'),(13,'Sarah Jenkins','Apex Commerce UK','Head of E-Commerce',NULL,'Abdullah Saleh overhauled our store taxonomy and fixed critical crawl bloat. Our non-brand organic search revenue grew by 190% in just five months. Outstanding technical communication!',5,'active',1,'2026-09-01 15:53:11','2026-09-01 15:53:11'),(14,'Marcus Vance','CloudStack Technologies','VP of Growth',NULL,'The keyword clustering blueprint and technical audit delivered by Abdullah Saleh gave our engineering team a clear roadmap. We saw multiple core commercial pages rank on page 1 within weeks.',5,'active',2,'2026-09-01 15:53:11','2026-09-01 15:53:11'),(15,'David Chen','Apex Health Network','Managing Director',NULL,'From Google Business Profile optimization to local service landing pages, our patient inquiry calls doubled. Highly recommended for any business serious about search growth.',5,'active',3,'2026-09-01 15:53:11','2026-09-01 15:53:11'),(16,'Sarah Jenkins','Apex Commerce UK','Head of E-Commerce',NULL,'Abdullah Saleh overhauled our store taxonomy and fixed critical crawl bloat. Our non-brand organic search revenue grew by 190% in just five months. Outstanding technical communication!',5,'active',1,'2026-09-01 16:05:45','2026-09-01 16:05:45'),(17,'Marcus Vance','CloudStack Technologies','VP of Growth',NULL,'The keyword clustering blueprint and technical audit delivered by Abdullah Saleh gave our engineering team a clear roadmap. We saw multiple core commercial pages rank on page 1 within weeks.',5,'active',2,'2026-09-01 16:05:45','2026-09-01 16:05:45'),(18,'David Chen','Apex Health Network','Managing Director',NULL,'From Google Business Profile optimization to local service landing pages, our patient inquiry calls doubled. Highly recommended for any business serious about search growth.',5,'active',3,'2026-09-01 16:05:45','2026-09-01 16:05:45'),(19,'Sarah Jenkins','Apex Commerce UK','Head of E-Commerce',NULL,'Abdullah Saleh overhauled our store taxonomy and fixed critical crawl bloat. Our non-brand organic search revenue grew by 190% in just five months. Outstanding technical communication!',5,'active',1,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(20,'Marcus Vance','CloudStack Technologies','VP of Growth',NULL,'The keyword clustering blueprint and technical audit delivered by Abdullah Saleh gave our engineering team a clear roadmap. We saw multiple core commercial pages rank on page 1 within weeks.',5,'active',2,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(21,'David Chen','Apex Health Network','Managing Director',NULL,'From Google Business Profile optimization to local service landing pages, our patient inquiry calls doubled. Highly recommended for any business serious about search growth.',5,'active',3,'2026-09-01 16:16:42','2026-09-01 16:16:42'),(22,'Sarah Jenkins','Apex Commerce UK','Head of E-Commerce',NULL,'Abdullah Saleh overhauled our store taxonomy and fixed critical crawl bloat. Our non-brand organic search revenue grew by 190% in just five months. Outstanding technical communication!',5,'active',1,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(23,'Marcus Vance','CloudStack Technologies','VP of Growth',NULL,'The keyword clustering blueprint and technical audit delivered by Abdullah Saleh gave our engineering team a clear roadmap. We saw multiple core commercial pages rank on page 1 within weeks.',5,'active',2,'2026-09-01 16:30:46','2026-09-01 16:30:46'),(24,'David Chen','Apex Health Network','Managing Director',NULL,'From Google Business Profile optimization to local service landing pages, our patient inquiry calls doubled. Highly recommended for any business serious about search growth.',5,'active',3,'2026-09-01 16:30:46','2026-09-01 16:30:46');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `country` varchar(100) DEFAULT 'United States',
  `timezone` varchar(100) DEFAULT 'UTC',
  `status` enum('active','inactive','suspended') DEFAULT 'active',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_email` (`email`),
  KEY `idx_users_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Abdullah Saleh','admin@seoservice.local','+1 (555) 019-2834','$2y$10$1bkKgaD4zYb8V0r5l.SP8uM7B03g4cLjGeUqxb/XElCr0MyoHN2NG',NULL,'United States','UTC','active','2026-08-29 16:00:28','2026-08-31 15:25:33','2026-08-29 16:00:28','2026-09-01 16:30:46'),(2,'Alex Harrison','client@seoservice.local','+1 (555) 382-9910','$2y$10$xIZtmIRoh9MuB6GRHJiejeeXimTh7HwwC7RicsGEWCqx3PNwH3F6W',NULL,'United Kingdom','UTC','active','2026-08-29 16:00:28','2026-08-29 17:39:33','2026-08-29 16:00:28','2026-09-01 16:30:46'),(3,'King','kingusa112211@gmail.com','','$2y$10$KfY4bGfW4wA.pIUZ3NvDseIiM3bCgiXNpezsb8psEIdnPSyPxQZ7e',NULL,'United States','UTC','active','2026-08-30 13:13:28','2026-08-30 17:13:28','2026-08-30 17:13:28','2026-08-30 17:13:28'),(4,'King','kingu@il.com','','$2y$10$pPEOZKf383Yi4jUe2fh8hOaudW4uZWbDoaPcH/R1pCh8JkGMimyKS',NULL,'United States','UTC','active','2026-08-30 13:14:04','2026-08-30 17:14:04','2026-08-30 17:14:04','2026-08-30 17:14:04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'seoservice_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-04 12:08:07
