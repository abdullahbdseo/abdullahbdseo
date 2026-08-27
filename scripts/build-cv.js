const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

function generateCV() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const photoPath = path.join(__dirname, '../public/assets/images/abdullah-portrait-crop.jpg');
  let photoBase64 = null;
  if (fs.existsSync(photoPath)) {
    photoBase64 = 'data:image/jpeg;base64,' + fs.readFileSync(photoPath).toString('base64');
  }

  const PRIMARY = [44, 82, 60];    // #2C523C Sage/Forest Green
  const DARK = [26, 29, 26];       // #1A1D1A Dark Ink
  const MUTED = [90, 98, 92];      // #5A625C Muted Text
  const LIGHT_LINE = [225, 230, 226];
  const BG_ACCENT = [244, 248, 245];

  // ═══════════════════════════════════════════════════════════
  // PAGE 1
  // ═══════════════════════════════════════════════════════════

  // Top Accent Bar
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, 210, 6, 'F');

  // Photo (100% distortion-free natural aspect ratio with subtle corporate border)
  if (photoBase64) {
    const imgX = 158;
    const imgY = 16;
    const imgW = 37;
    const imgH = 46.25; // 37 / 46.25 = 0.8 (matches 640x800 crop)

    // Soft border
    doc.setDrawColor(210, 218, 212);
    doc.setLineWidth(0.4);
    doc.rect(imgX - 0.5, imgY - 0.5, imgW + 1, imgH + 1);

    doc.addImage(photoBase64, 'JPEG', imgX, imgY, imgW, imgH);
  }

  // Name & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...DARK);
  doc.text('ABDULLAH SALEH', 15, 25);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...PRIMARY);
  doc.text('SEO GROWTH SPECIALIST · AEO & GEO EXPERT', 15, 32);

  // Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...MUTED);

  doc.text('Email: abdullahbd.seo@gmail.com', 15, 42);
  doc.text('Location: Dhaka, Bangladesh', 15, 48);

  // Divider
  doc.setDrawColor(...LIGHT_LINE);
  doc.setLineWidth(0.5);
  doc.line(15, 68, 195, 68);

  let y = 76;

  // Helper Section Header
  function addSectionHeader(title, currentY) {
    doc.setFillColor(...PRIMARY);
    doc.rect(15, currentY - 4, 3, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...PRIMARY);
    doc.text(title.toUpperCase(), 21, currentY + 1.5);

    doc.setDrawColor(...LIGHT_LINE);
    doc.line(15, currentY + 4, 195, currentY + 4);
    return currentY + 10;
  }

  // Section 1: Professional Summary
  y = addSectionHeader('Professional Summary', y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...DARK);
  const summaryText =
    "Results-driven Computer Science & Engineering graduate and SEO Growth Specialist with hands-on expertise in Organic Search Growth, Technical SEO Architecture, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO). Skilled in scaling keyword rankings on Google, optimizing Core Web Vitals, structuring data for AI Overviews (ChatGPT, Perplexity, Gemini), and executing high-ROI Meta Ads. Proven leader in aligning technical development with strategic brand visibility to deliver measurable organic revenue.";
  const splitSummary = doc.splitTextToSize(summaryText, 180);
  doc.text(splitSummary, 15, y);
  y += splitSummary.length * 4.8 + 6;

  // Section 2: Core Skills
  y = addSectionHeader('Core Expertise & Technical Skills', y);

  const skillsCol1 = [
    '• Technical SEO & Crawl Budget Optimization',
    '• AEO & GEO (AI Answer Engine Optimization)',
    '• Keyword Strategy & Content Architecture',
    '• Google Search Console & GA4 Analytics',
    '• Core Web Vitals & PageSpeed Performance',
  ];

  const skillsCol2 = [
    '• Schema.org JSON-LD & Semantic Web',
    '• Meta Ads (Facebook & Instagram Campaigns)',
    '• Web Architecture (WordPress, Headless, Laravel)',
    '• Server & Hosting Configuration (DNS, SSL)',
    '• Cross-Functional Web Strategy & Leadership',
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...DARK);

  let skillY = y;
  skillsCol1.forEach((item) => {
    doc.text(item, 15, skillY);
    skillY += 5.2;
  });

  skillY = y;
  skillsCol2.forEach((item) => {
    doc.text(item, 105, skillY);
    skillY += 5.2;
  });

  y = skillY + 6;

  // Section 3: Professional Experience
  y = addSectionHeader('Professional Experience', y);

  // Job 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text('Officer – Digital Marketing & SEO Growth Specialist', 15, y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PRIMARY);
  doc.text('Sep 2025 – Present', 195, y, { align: 'right' });
  y += 4.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(...MUTED);
  doc.text('HATIL Complex LTD · Dhaka, Bangladesh', 15, y);
  y += 5.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  const j1Points = [
    '• Formulating and executing organic SEO growth strategies, optimizing category architecture and technical indexing.',
    '• Implementing advanced Schema.org structured data frameworks to capture featured snippets and Google AI Overviews.',
    '• Auditing technical health via Google Search Console and GA4 to eliminate crawl bottlenecks and maximize keyword rankings.',
  ];
  j1Points.forEach((pt) => {
    const splitPt = doc.splitTextToSize(pt, 178);
    doc.text(splitPt, 16, y);
    y += splitPt.length * 4.3;
  });
  y += 4;

  // Job 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text('Lead Web Strategist', 15, y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PRIMARY);
  doc.text('Feb 2025 – Jul 2025', 195, y, { align: 'right' });
  y += 4.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(...MUTED);
  doc.text('Final Touch · Dhaka, Bangladesh', 15, y);
  y += 5.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  const j2Points = [
    '• Managed website infrastructure, domain architecture, and hosting configurations for national and international clients.',
    '• Enforced strict Technical SEO, mobile responsiveness, and page performance benchmarks prior to client launches.',
    '• Coordinated design and development teams to produce search-optimized digital solutions that drive inbound inquiries.',
  ];
  j2Points.forEach((pt) => {
    const splitPt = doc.splitTextToSize(pt, 178);
    doc.text(splitPt, 16, y);
    y += splitPt.length * 4.3;
  });

  // Page 1 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text('Abdullah Saleh — Curriculum Vitae', 15, 288);
  doc.text('Page 1 of 2', 195, 288, { align: 'right' });

  // ═══════════════════════════════════════════════════════════
  // PAGE 2
  // ═══════════════════════════════════════════════════════════
  doc.addPage();

  // Top Accent Bar
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, 210, 6, 'F');

  y = 20;

  // Continued Experience: Job 3
  y = addSectionHeader('Professional Experience (Continued)', y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text('Assistant IT Officer', 15, y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PRIMARY);
  doc.text('Nov 2024 – May 2025', 195, y, { align: 'right' });
  y += 4.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(...MUTED);
  doc.text('Bangla City PLC · Dhaka, Bangladesh', 15, y);
  y += 5.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  const j3Points = [
    '• Administered organizational IT systems, technical maintenance, network accounts, and marketing personnel infrastructure.',
    '• Ensured security compliance, server reliability, and vendor SLA management for corporate platforms.',
  ];
  j3Points.forEach((pt) => {
    const splitPt = doc.splitTextToSize(pt, 178);
    doc.text(splitPt, 16, y);
    y += splitPt.length * 4.3;
  });
  y += 6;

  // Job 4
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text('Graphic Design Trainer & Visual Media Editor', 15, y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PRIMARY);
  doc.text('Jan 2022 – Dec 2023', 195, y, { align: 'right' });
  y += 4.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(...MUTED);
  doc.text('UKASHIA · Satkhira, Bangladesh', 15, y);
  y += 5.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  const j4Points = [
    '• Trained 100+ students in Adobe Photoshop, Illustrator, visual branding, and digital creative workflows.',
    '• Produced promotional multimedia assets and digital campaign materials for organizations.',
  ];
  j4Points.forEach((pt) => {
    const splitPt = doc.splitTextToSize(pt, 178);
    doc.text(splitPt, 16, y);
    y += splitPt.length * 4.3;
  });
  y += 6;

  // Education Section
  y = addSectionHeader('Education', y);

  const eduList = [
    {
      degree: 'B.Sc. in Computer Science & Engineering (CSE)',
      inst: 'Northern University of Business & Technology Khulna',
      grade: 'CGPA: 3.09 / 4.00 (Graduated 2023)',
    },
    {
      degree: 'Higher Secondary Certificate (H.S.C - Science)',
      inst: 'Kaligonj Govt. College, Satkhira',
      grade: 'GPA: 4.50 / 5.00 (2018)',
    },
    {
      degree: 'Secondary School Certificate (S.S.C - Science)',
      inst: 'Mozahar Memorial Secondary School, Satkhira',
      grade: 'GPA: 5.00 / 5.00 (2016)',
    },
  ];

  eduList.forEach((edu) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    doc.text(`• ${edu.degree}`, 15, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text(`   ${edu.inst}  |  ${edu.grade}`, 15, y);
    y += 5.5;
  });
  y += 3;

  // Featured Projects & Certifications
  y = addSectionHeader('Key Projects & Certifications', y);

  const projList = [
    {
      name: 'Organic Search Growth & Technical Audit Campaign',
      desc: 'Formulated site-wide indexing overhaul and Core Web Vitals optimization, resulting in +230% organic traffic growth.',
    },
    {
      name: 'Enterprise POS & Inventory Architecture (Laravel & MySQL)',
      desc: 'Engineered web inventory management dashboard with sales tracking and real-time reporting.',
    },
    {
      name: 'Professional Certification: PHP Laravel Web Engineering',
      desc: 'FUTURE IT, Khulna — Advanced server architecture, database modeling, and RESTful API engineering.',
    },
  ];

  projList.forEach((p) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...DARK);
    doc.text(`• ${p.name}`, 15, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    const splitDesc = doc.splitTextToSize(`   ${p.desc}`, 175);
    doc.text(splitDesc, 15, y);
    y += splitDesc.length * 4.2 + 2;
  });
  y += 3;

  // Personal Information & Declaration
  y = addSectionHeader('Personal Details & Declaration', y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...DARK);

  doc.text('• Full Name: Abdullah Saleh', 15, y);
  doc.text('• Nationality: Bangladeshi', 105, y);
  y += 5;

  doc.text('• Languages: English (Professional Working), Bengali (Native)', 15, y);
  y += 7;

  const declText =
    "I hereby declare that the particulars given above are authentic, accurate, and complete to the best of my knowledge and professional record.";
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text(declText, 15, y);
  y += 14;

  // Signature line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...PRIMARY);
  doc.text('Abdullah Saleh', 15, y);
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text('SEO Growth Specialist', 15, y);

  // Page 2 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text('Abdullah Saleh — Curriculum Vitae', 15, 288);
  doc.text('Page 2 of 2', 195, 288, { align: 'right' });

  // Output file paths
  const outPath1 = path.join(__dirname, '../public/assets/files/abdullah-saleh-cv.pdf');
  const outPath2 = path.join(__dirname, '../public/assets/files/ahsan-jannat-cv.pdf');

  const pdfBytes = doc.output();
  fs.writeFileSync(outPath1, Buffer.from(pdfBytes, 'binary'));
  fs.writeFileSync(outPath2, Buffer.from(pdfBytes, 'binary'));

  console.log('CV Generated successfully at:');
  console.log('1.', outPath1);
  console.log('2.', outPath2);
}

generateCV();
