<?php
// views/public/about.php - About Abdullah Saleh (Exact Reference Design Layout)

$expertName = setting('expert_name', 'Abdullah Saleh');
$expertTitle = setting('expert_title', 'Revenue Systems Builder · SEO & Growth Strategist');
$profilePhoto = 'abdullah.jpg';
$contactEmail = setting('contact_email', 'abdullahbd.seo@gmail.com');
?>

<div style="background: #ffffff; min-height: 100vh; padding-top: 40px; padding-bottom: 80px;">
    <div class="container" style="max-width: 1240px; margin: 0 auto; padding: 0 20px;">
        
        <!-- Main 2-Column Layout (Sticky Left Sidebar + Right Content Area) -->
        <div class="about-page-grid">
            
            <!-- Left Sticky Sidebar: Table of Contents matching attached image -->
            <aside class="about-sidebar-sticky">
                <nav class="about-toc-card" aria-label="On this page navigation">
                    <ul class="about-toc-list">
                        <li>
                            <a href="#vision" class="about-toc-link active" data-target="vision">
                                <i class="fa-regular fa-eye toc-icon"></i>
                                <span class="toc-text">One Business System, No...</span>
                            </a>
                        </li>
                        <li>
                            <a href="#methodology" class="about-toc-link" data-target="methodology">
                                <i class="fa-solid fa-diagram-project toc-icon"></i>
                                <span class="toc-text">Build the System Around ...</span>
                            </a>
                        </li>
                        <li>
                            <a href="#leadership" class="about-toc-link" data-target="leadership">
                                <i class="fa-regular fa-user toc-icon"></i>
                                <span class="toc-text">Leadership</span>
                            </a>
                        </li>
                        <li>
                            <a href="#why-us" class="about-toc-link" data-target="why-us">
                                <i class="fa-solid fa-circle-check toc-icon"></i>
                                <span class="toc-text">Why Me?</span>
                            </a>
                        </li>
                        <li>
                            <a href="#testimonials" class="about-toc-link" data-target="testimonials">
                                <i class="fa-regular fa-star toc-icon"></i>
                                <span class="toc-text">Testimonials</span>
                            </a>
                        </li>
                        <li>
                            <a href="#services" class="about-toc-link" data-target="services">
                                <i class="fa-solid fa-layer-group toc-icon"></i>
                                <span class="toc-text">Check My Service Expertise</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            <!-- Right Column: Main Content Sections -->
            <div class="about-content-column">
                
                <!-- Page Hero / Introduction Header -->
                <div style="text-align: center; margin-bottom: 32px;">
                    <div style="margin-bottom: 16px;">
                        <h1 class="about-main-headline">
                            I Build Revenue Systems for Businesses That Need to Move Faster
                        </h1>
                    </div>
                    <p class="about-main-desc">
                        The market is getting harder: ad costs rise, attention drops, customers expect fast answers, and manual work slows good businesses down.
                        <br><br>
                        I help businesses turn marketing, websites, lead capture, sales follow-up, and operations into connected systems. My work combines advanced technical SEO, web development, AI automation, paid acquisition, and conversion optimization built around the numbers that matter.
                    </p>
                </div>

                <!-- Section 1: Vision -->
                <section id="vision" class="about-section-block">
                    <div class="about-section-header">
                        <h2 class="about-section-pill">
                            <i class="fa-regular fa-eye" style="color: #2563eb;"></i>
                            One Business System, Not Five Disconnected Tools
                        </h2>
                    </div>

                    <div class="about-white-card text-center" style="padding: 28px 32px;">
                        <p class="card-p-text" style="max-width: 680px; margin: 0 auto;">
                            Most businesses do not need another isolated website, ad campaign, chatbot, or dashboard. They need the full customer journey to work together.
                            <br><br>
                            I connect organic acquisition, high-converting pages, CRM workflows, AI automation, tracking, and follow-up so that every visitor has a clear path to become a lead, client, or booked consultation.
                        </p>
                    </div>
                </section>

                <!-- Section 2: Methodology -->
                <section id="methodology" class="about-section-block">
                    <div class="about-section-header">
                        <h2 class="about-section-pill">
                            <i class="fa-solid fa-diagram-project" style="color: #2563eb;"></i>
                            Build the System Around the Bottleneck
                        </h2>
                    </div>

                    <div class="about-2col-grid">
                        <div class="about-method-card">
                            <div class="method-icon-box">
                                <i class="fa-solid fa-rocket"></i>
                            </div>
                            <h3 class="method-title">Measure Before Making Noise</h3>
                            <p class="method-desc">
                                I review search traffic sources, crawl performance, lead flow, website behavior, conversion points, operational delays, and existing analytics before recommending a solution.
                            </p>
                        </div>

                        <div class="about-method-card">
                            <div class="method-icon-box">
                                <i class="fa-solid fa-trophy"></i>
                            </div>
                            <h3 class="method-title">Build for Real Customer Behaviour</h3>
                            <p class="method-desc">
                                A system only works when customers understand what to do next. Every page, ad, form, message, booking flow, and automation is designed around real buyer intent and behavior.
                            </p>
                        </div>

                        <div class="about-method-card">
                            <div class="method-icon-box">
                                <i class="fa-solid fa-share-nodes"></i>
                            </div>
                            <h3 class="method-title">Automate Repetitive Work</h3>
                            <p class="method-desc">
                                I use AI and automation to handle lead capture, source tagging, routing, reminders, follow-up, task creation, support responses, and reporting without removing human control.
                            </p>
                        </div>

                        <div class="about-method-card">
                            <div class="method-icon-box">
                                <i class="fa-solid fa-bolt"></i>
                            </div>
                            <h3 class="method-title">Improve From Evidence</h3>
                            <p class="method-desc">
                                I use real Search Console data, user activity, lead data, workflow enrolment, cost per result, and conversion signals to continuously improve what is already working.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Section 3: Leadership -->
                <section id="leadership" class="about-section-block">
                    <div class="about-section-header">
                        <h2 class="about-section-pill">
                            <i class="fa-regular fa-user" style="color: #2563eb;"></i>
                            Leadership
                        </h2>
                    </div>

                    <div class="about-white-card" style="padding: 28px 32px;">
                        <div class="leadership-flex-row">
                            <div class="leadership-img-box">
                                <img src="<?= asset('images/' . $profilePhoto) ?>" alt="<?= e($expertName) ?>" class="leadership-img" onerror="this.src='<?= asset('images/abdullah.jpg') ?>'">
                            </div>
                            <div class="leadership-info">
                                <h3 class="leadership-name"><?= e($expertName) ?></h3>
                                <p class="leadership-role">
                                    REVENUE SYSTEMS BUILDER · TECHNICAL SEO · DIGITAL MARKETING
                                </p>
                                <p class="card-p-text" style="margin-top: 12px;">
                                    With 6+ years of experience across international markets, I combine digital marketing, web development, and AI automation to build systems that support scalable revenue growth. I have delivered everything from enterprise SEO recoveries to custom AI workflows and conversion-led web applications.
                                    <br><br>
                                    Experience across international and local markets includes Media campaign portfolios, Custom and CMS website building, lead-automation workflows, technical SEO recovery, and conversion-led growth systems.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 4: Why Me? -->
                <section id="why-us" class="about-section-block">
                    <div class="about-section-header">
                        <h2 class="about-section-pill">
                            <i class="fa-solid fa-circle-check" style="color: #2563eb;"></i>
                            Why Me?
                        </h2>
                    </div>

                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
                        <ul class="why-us-list">
                            <li class="why-us-item">
                                <div class="why-us-icon">
                                    <i class="fa-solid fa-shield-halved"></i>
                                </div>
                                <div>
                                    <h4 class="why-us-heading">One Owner Across the Journey</h4>
                                    <p class="why-us-text">
                                        You get one person who understands the ad, the landing page, the form, the CRM, the automation, the tracking, and the customer’s next step.
                                    </p>
                                </div>
                            </li>

                            <li class="why-us-item">
                                <div class="why-us-icon">
                                    <i class="fa-solid fa-chart-line"></i>
                                </div>
                                <div>
                                    <h4 class="why-us-heading">Cost-Efficient by Design</h4>
                                    <p class="why-us-text">
                                        I use the right level of technology for the problem. The aim is to reduce wasted spend, manual work, duplicated tools, and expensive agency layers—not to sell unnecessary complexity.
                                    </p>
                                </div>
                            </li>

                            <li class="why-us-item">
                                <div class="why-us-icon">
                                    <i class="fa-solid fa-rocket"></i>
                                </div>
                                <div>
                                    <h4 class="why-us-heading">World-Class Tools, Practical Delivery</h4>
                                    <p class="why-us-text">
                                        I work with platforms and technologies used by growth-focused businesses worldwide: Meta, Google, GA4, GTM, WordPress, PHP, Laravel, APIs, AI automations, CRM workflows, and cloud systems.
                                    </p>
                                </div>
                            </li>

                            <li class="why-us-item">
                                <div class="why-us-icon">
                                    <i class="fa-regular fa-thumbs-up"></i>
                                </div>
                                <div>
                                    <h4 class="why-us-heading">Built for 2026 and Beyond</h4>
                                    <p class="why-us-text">
                                        As attention becomes more expensive and customer expectations rise, businesses need faster response, better data, stronger conversion paths, and automation that supports people—not more disconnected software.
                                    </p>
                                </div>
                            </li>

                            <li class="why-us-item">
                                <div class="why-us-icon">
                                    <i class="fa-solid fa-tags"></i>
                                </div>
                                <div>
                                    <h4 class="why-us-heading">Performance, Not Busywork</h4>
                                    <p class="why-us-text">
                                        I focus on measurable movement: lower acquisition waste, faster follow-up, higher conversion quality, cleaner operations, stronger technical health, and clearer revenue visibility.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                <!-- Section 5: Testimonials (Exact Marquee Component) -->
                <section id="testimonials" class="about-section-block">
                    <div class="testimonial-marquee-container">
                        
                        <!-- Top Pill Badge -->
                        <div style="text-align: center; margin-bottom: 16px;">
                            <div class="verified-pill-badge">
                                <span class="pill-stars">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </span>
                                <span class="pill-divider"></span>
                                <span class="pill-text">VERIFIED REVIEWS</span>
                            </div>
                        </div>

                        <!-- Title & Subtitle -->
                        <div style="text-align: center; margin-bottom: 32px;">
                            <h2 class="marquee-section-title">
                                What Internet Finds About Me
                            </h2>
                            <p class="marquee-section-subtitle">
                                Real feedback and client reviews from BlackHatWorld forum as a developer and marketer.
                            </p>
                        </div>

                        <!-- Infinite Smooth Marquee with Edge Masks -->
                        <div class="marquee-viewport-mask">
                            <div class="marquee-track">
                                
                                <!-- SET 1 -->
                                <article class="marquee-review-card">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “Delivered exactly what was promised: automation, conversion focused pages, and reporting that shows what is actually working.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">Alex Morgan</div>
                                            <div class="card-author-title">Owner, ScaleForge Agency</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #e0f2fe; color: #0284c7;">A</div>
                                    </div>
                                </article>

                                <article class="marquee-review-card">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “The website improvements gave us a cleaner offer, stronger CTA flow, and noticeably better lead quality.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">Sophie Turner</div>
                                            <div class="card-author-title">Marketing Lead, BrightPath Solutions</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #ede9fe; color: #7c3aed;">S</div>
                                    </div>
                                </article>

                                <article class="marquee-review-card">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “Fast communication and a practical automation setup. Our lead handling is now smoother and much easier to track.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">Rohan Patel</div>
                                            <div class="card-author-title">Founder, ClickPilot Studio</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #dcfce7; color: #15803d;">R</div>
                                    </div>
                                </article>

                                <article class="marquee-review-card">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “Abdullah resolved our technical crawl bottlenecks and keyword cannibalization in 3 weeks. Ranked #1 for high-ticket commercial keywords.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">David Miller</div>
                                            <div class="card-author-title">Managing Director, Apex Logistics UK</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #fef3c7; color: #b45309;">D</div>
                                    </div>
                                </article>

                                <article class="marquee-review-card">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “Our Google and Meta Ads ROAS scaled from 1.8x to 4.2x with proper conversion tracking and high-converting landing page tuning.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">Elena Rostova</div>
                                            <div class="card-author-title">Head of Growth, Nordic Retail Group</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #e0e7ff; color: #4338ca;">E</div>
                                    </div>
                                </article>

                                <article class="marquee-review-card">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “One of the rare professionals on BlackHatWorld who actually masters clean code, technical SEO, and high-converting marketing funnels.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">James O'Connor</div>
                                            <div class="card-author-title">E-Commerce Brand Owner, Sydney</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #fae8ff; color: #a21caf;">J</div>
                                    </div>
                                </article>

                                <!-- SET 2 (Cloned for glitch-free infinite loop) -->
                                <article class="marquee-review-card" aria-hidden="true">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “Delivered exactly what was promised: automation, conversion focused pages, and reporting that shows what is actually working.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">Alex Morgan</div>
                                            <div class="card-author-title">Owner, ScaleForge Agency</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #e0f2fe; color: #0284c7;">A</div>
                                    </div>
                                </article>

                                <article class="marquee-review-card" aria-hidden="true">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “The website improvements gave us a cleaner offer, stronger CTA flow, and noticeably better lead quality.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">Sophie Turner</div>
                                            <div class="card-author-title">Marketing Lead, BrightPath Solutions</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #ede9fe; color: #7c3aed;">S</div>
                                    </div>
                                </article>

                                <article class="marquee-review-card" aria-hidden="true">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “Fast communication and a practical automation setup. Our lead handling is now smoother and much easier to track.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">Rohan Patel</div>
                                            <div class="card-author-title">Founder, ClickPilot Studio</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #dcfce7; color: #15803d;">R</div>
                                    </div>
                                </article>

                                <article class="marquee-review-card" aria-hidden="true">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “Abdullah resolved our technical crawl bottlenecks and keyword cannibalization in 3 weeks. Ranked #1 for high-ticket commercial keywords.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">David Miller</div>
                                            <div class="card-author-title">Managing Director, Apex Logistics UK</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #fef3c7; color: #b45309;">D</div>
                                    </div>
                                </article>

                                <article class="marquee-review-card" aria-hidden="true">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “Our Google and Meta Ads ROAS scaled from 1.8x to 4.2x with proper conversion tracking and high-converting landing page tuning.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">Elena Rostova</div>
                                            <div class="card-author-title">Head of Growth, Nordic Retail Group</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #e0e7ff; color: #4338ca;">E</div>
                                    </div>
                                </article>

                                <article class="marquee-review-card" aria-hidden="true">
                                    <div class="card-stars-row">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                    <p class="card-quote-body">
                                        “One of the rare professionals on BlackHatWorld who actually masters clean code, technical SEO, and high-converting marketing funnels.”
                                    </p>
                                    <div class="card-bottom-row">
                                        <div>
                                            <div class="card-author-name">James O'Connor</div>
                                            <div class="card-author-title">E-Commerce Brand Owner, Sydney</div>
                                        </div>
                                        <div class="card-avatar-badge" style="background: #fae8ff; color: #a21caf;">J</div>
                                    </div>
                                </article>

                            </div>
                        </div>

                    </div>
                </section>

                <!-- Section 6: Check My Service Expertise -->
                <section id="services" class="about-section-block">
                    <div class="about-section-header">
                        <h2 class="about-section-pill">
                            <i class="fa-solid fa-layer-group" style="color: #2563eb;"></i>
                            Check My Service Expertise
                        </h2>
                    </div>

                    <div class="about-2col-grid">
                        
                        <!-- Capability 1: Technical SEO -->
                        <article class="expertise-card">
                            <span class="expertise-tag">Search Engine Optimization</span>
                            <h3 class="expertise-title">
                                <a href="<?= url('/services') ?>" style="color: inherit; text-decoration: none;">
                                    Technical SEO & Organic Growth Systems
                                </a>
                            </h3>
                            <p class="expertise-desc">
                                We eliminate crawl budget waste, fix JavaScript rendering bottlenecks, structure schema markup, and rank high-converting keywords to top Google positions.
                            </p>
                            <div class="expertise-footer">
                                <span>Explore SEO Services</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </article>

                        <!-- Capability 2: Custom Website Dev -->
                        <article class="expertise-card">
                            <span class="expertise-tag">Web Development</span>
                            <h3 class="expertise-title">
                                <a href="<?= url('/services') ?>" style="color: inherit; text-decoration: none;">
                                    Custom Fast Web Platforms & Landing Pages
                                </a>
                            </h3>
                            <p class="expertise-desc">
                                Clean, custom-engineered PHP/Laravel architecture built without bloat. High page speed, Core Web Vitals optimization, and laser-focused conversion funnels.
                            </p>
                            <div class="expertise-footer">
                                <span>Discuss Your Project</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </article>

                        <!-- Capability 3: Paid Ads -->
                        <article class="expertise-card">
                            <span class="expertise-tag">Paid Acquisition</span>
                            <h3 class="expertise-title">
                                <a href="<?= url('/services') ?>" style="color: inherit; text-decoration: none;">
                                    Google & Meta Ads High-ROAS Scaling
                                </a>
                            </h3>
                            <p class="expertise-desc">
                                Data-backed PPC management with server-side conversion API, GA4 tracking, negative keyword filtering, and direct-response ad creative strategy.
                            </p>
                            <div class="expertise-footer">
                                <span>Scale Your Ad ROAS</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </article>

                        <!-- Capability 4: AI Automation -->
                        <article class="expertise-card">
                            <span class="expertise-tag">AI Automation Build</span>
                            <h3 class="expertise-title">
                                <a href="<?= url('/services') ?>" style="color: inherit; text-decoration: none;">
                                    CRM Workflows & Automated Lead Handling
                                </a>
                            </h3>
                            <p class="expertise-desc">
                                Automatic lead distribution, immediate WhatsApp/Email follow-up, AI query qualification, and seamless pipeline management to eliminate manual bottlenecks.
                            </p>
                            <div class="expertise-footer">
                                <span>Automate Your Workflows</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </article>

                    </div>
                </section>

                <!-- Final Callout CTA Box -->
                <section style="margin-top: 48px;">
                    <div class="about-cta-gradient-card">
                        <div class="cta-glow-circle-1"></div>
                        <div class="cta-glow-circle-2"></div>
                        <div style="position: relative; z-index: 2; max-width: 650px; margin: 0 auto; text-align: center;">
                            <div style="margin-bottom: 14px;">
                                <h2 class="cta-banner-pill">
                                    Your Business Does Not Need More Tools. It Needs a Better System.
                                </h2>
                            </div>
                            <p style="font-size: 0.95rem; color: rgba(255, 255, 255, 0.9); line-height: 1.6; margin: 0 0 24px;">
                                If your traffic, ads, website, leads, and follow-up are disconnected, we can identify the biggest bottleneck and build the next system around it.
                            </p>
                            <div>
                                <a href="<?= url('/contact') ?>" class="btn-cta-white">
                                    Book a Revenue Systems Call <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

        </div>

    </div>
</div>

<style>
/* 2-Column Layout */
.about-page-grid {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: flex-start;
}

@media (min-width: 992px) {
    .about-page-grid {
        display: grid;
        grid-template-columns: 260px 1fr;
        gap: 48px;
    }
}

/* Sticky Left Sidebar */
.about-sidebar-sticky {
    display: none;
    width: 260px;
    flex-shrink: 0;
}

@media (min-width: 992px) {
    .about-sidebar-sticky {
        display: block;
        position: sticky;
        top: 100px;
        align-self: flex-start;
    }
}

.about-toc-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 4px 16px rgba(46, 114, 210, 0.06);
}

.about-toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.about-toc-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 12px;
    border-radius: 6px;
    font-size: 0.88rem;
    font-weight: 600;
    color: #475569;
    text-decoration: none;
    transition: all 0.2s ease;
}

.about-toc-link:hover {
    background: #f1f5f9;
    color: #2563eb;
}

.about-toc-link.active {
    background: #eff6ff;
    color: #2563eb;
    font-weight: 700;
}

.toc-icon {
    font-size: 1rem;
    width: 18px;
    text-align: center;
    flex-shrink: 0;
    color: inherit;
}

.toc-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Right Content Column */
.about-content-column {
    width: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

/* Headlines & Pills */
.about-main-headline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(239, 246, 255, 0.9);
    border: 1px solid #bfdbfe;
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
    line-height: 1.3;
    margin: 0;
    box-shadow: 0 2px 6px rgba(37, 99, 235, 0.04);
}

@media (min-width: 768px) {
    .about-main-headline {
        font-size: 1.7rem;
    }
}

.about-main-desc {
    font-size: 0.98rem;
    color: #475569;
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.65;
}

.about-section-block {
    scroll-margin-top: 110px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.about-section-header {
    text-align: center;
}

.about-section-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: linear-gradient(90deg, rgba(239, 246, 255, 0.9) 0%, #ffffff 50%, rgba(239, 246, 255, 0.9) 100%);
    border: 1px solid #dbeafe;
    border-radius: 6px;
    padding: 8px 18px;
    font-size: 1.15rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
    margin: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

@media (min-width: 768px) {
    .about-section-pill {
        font-size: 1.25rem;
    }
}

/* Cards & Grid */
.about-white-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
}

.card-p-text {
    font-size: 0.94rem;
    color: #475569;
    line-height: 1.65;
    margin: 0;
}

.about-2col-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

@media (min-width: 640px) {
    .about-2col-grid {
        grid-template-columns: 1fr 1fr;
    }
}

.about-method-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    transition: all 0.25s ease;
}

.about-method-card:hover {
    border-color: #93c5fd;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.06);
}

.method-icon-box {
    color: #2563eb;
    font-size: 1.25rem;
    margin-bottom: 10px;
}

.method-title {
    font-size: 1.02rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 6px;
}

.method-desc {
    font-size: 0.88rem;
    color: #64748b;
    line-height: 1.55;
    margin: 0;
}

/* Leadership Row */
.leadership-flex-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

@media (min-width: 768px) {
    .leadership-flex-row {
        flex-direction: row;
        align-items: center;
        gap: 24px;
    }
}

.leadership-img-box {
    width: 140px;
    height: 140px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

@media (min-width: 768px) {
    .leadership-img-box {
        width: 160px;
        height: 160px;
    }
}

.leadership-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.leadership-info {
    text-align: center;
}

@media (min-width: 768px) {
    .leadership-info {
        text-align: left;
        flex: 1;
    }
}

.leadership-name {
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 4px;
}

.leadership-role {
    font-size: 0.78rem;
    font-weight: 800;
    color: #2563eb;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0;
}

/* Why Us List */
.why-us-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.why-us-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px 18px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
    transition: all 0.25s ease;
}

.why-us-item:hover {
    border-color: #93c5fd;
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(37, 99, 235, 0.05);
}

.why-us-icon {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background: #eff6ff;
    color: #2563eb;
    border: 1px solid #dbeafe;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 1rem;
}

.why-us-heading {
    font-size: 0.94rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 4px;
}

.why-us-text {
    font-size: 0.86rem;
    color: #64748b;
    line-height: 1.55;
    margin: 0;
}

/* Marquee Testimonials Section */
.testimonial-marquee-container {
    background: linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%);
    border: 1px solid #dbeafe;
    border-radius: 10px;
    padding: 32px 18px;
    box-shadow: 0 8px 24px -6px rgba(37, 99, 235, 0.06);
    position: relative;
    overflow: hidden;
}

.verified-pill-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 5px 14px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.pill-stars {
    color: #fbbf24;
    display: inline-flex;
    gap: 3px;
    font-size: 0.8rem;
}

.pill-divider {
    width: 1px;
    height: 12px;
    background: #cbd5e1;
}

.pill-text {
    color: #2563eb;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.marquee-section-title {
    font-size: 1.8rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.025em;
    margin: 0 0 8px;
    line-height: 1.2;
}

.marquee-section-subtitle {
    font-size: 0.92rem;
    color: #64748b;
    max-width: 580px;
    margin: 0 auto;
    line-height: 1.5;
}

.marquee-viewport-mask {
    width: 100%;
    overflow: hidden;
    position: relative;
    padding: 10px 0 14px;
    -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

.marquee-track {
    display: flex;
    gap: 16px;
    width: max-content;
    animation: smoothMarquee 34s linear infinite;
}

.marquee-track:hover {
    animation-play-state: paused;
}

@keyframes smoothMarquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - 8px)); }
}

.marquee-review-card {
    width: 320px;
    min-width: 320px;
    max-width: 320px;
    flex-shrink: 0;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 20px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    transition: all 0.25s ease;
    box-sizing: border-box;
}

.marquee-review-card:hover {
    transform: translateY(-2px);
    border-color: #93c5fd;
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.06);
}

.card-stars-row {
    color: #fbbf24;
    display: flex;
    gap: 3px;
    font-size: 0.8rem;
    margin-bottom: 10px;
}

.card-quote-body {
    font-size: 0.88rem;
    font-style: italic;
    color: #334155;
    line-height: 1.58;
    margin: 0 0 14px;
    flex: 1;
}

.card-bottom-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid #f1f5f9;
}

.card-author-name {
    font-size: 0.88rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.2;
}

.card-author-title {
    font-size: 0.76rem;
    color: #64748b;
    margin-top: 2px;
}

.card-avatar-badge {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    font-weight: 800;
    font-size: 0.84rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

/* Expertise Cards */
.expertise-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    transition: all 0.25s ease;
}

.expertise-card:hover {
    border-color: #93c5fd;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.06);
}

.expertise-tag {
    display: inline-block;
    align-self: flex-start;
    background: #eff6ff;
    color: #2563eb;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
    margin-bottom: 10px;
}

.expertise-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 6px;
    line-height: 1.35;
}

.expertise-desc {
    font-size: 0.88rem;
    color: #64748b;
    line-height: 1.55;
    margin: 0 0 14px;
    flex: 1;
}

.expertise-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.84rem;
    font-weight: 700;
    color: #2563eb;
    padding-top: 10px;
    border-top: 1px solid #f8fafc;
}

/* Final CTA Gradient Card */
.about-cta-gradient-card {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #4338ca 100%);
    padding: 32px 20px;
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.2);
}

@media (min-width: 768px) {
    .about-cta-gradient-card {
        padding: 40px 32px;
    }
}

.cta-glow-circle-1 {
    position: absolute;
    top: -60px;
    left: -60px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    filter: blur(40px);
    pointer-events: none;
}

.cta-glow-circle-2 {
    position: absolute;
    bottom: -60px;
    right: -60px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: rgba(96, 165, 250, 0.25);
    filter: blur(40px);
    pointer-events: none;
}

.cta-banner-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(8px);
    border-radius: 6px;
    padding: 6px 16px;
    font-size: 1.15rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0;
    line-height: 1.35;
}

@media (min-width: 768px) {
    .cta-banner-pill {
        font-size: 1.35rem;
    }
}

.btn-cta-white {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    color: #1d4ed8;
    font-size: 0.92rem;
    font-weight: 700;
    padding: 10px 24px;
    border-radius: 6px;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.25s ease;
}

.btn-cta-white:hover {
    background: #f8fafc;
    color: #1e40af;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}
</style>

<!-- ScrollSpy Script for Table of Contents Sidebar -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const tocLinks = document.querySelectorAll('.about-toc-link');
    const sections = document.querySelectorAll('.about-section-block');

    if (!tocLinks.length || !sections.length) return;

    function onScroll() {
        const scrollPosition = window.scrollY + 140;
        let currentSectionId = '';

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (!currentSectionId && window.scrollY < 200) {
            currentSectionId = 'vision';
        }

        if (currentSectionId) {
            tocLinks.forEach(link => {
                const target = link.getAttribute('data-target');
                link.classList.toggle('active', target === currentSectionId);
            });
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Smooth scroll on TOC click
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault();
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
</script>
