<?php
// views/public/tools/keyword_density_checker.php - Keyword Density & Readability Analyzer
?>

<div class="tool-page-wrapper" style="background: #ffffff; min-height: 100vh; padding-top: 30px; padding-bottom: 80px;">
    <div class="container" style="max-width: 1080px; margin: 0 auto; padding: 0 20px;">
        
        <!-- Breadcrumb Pill -->
        <nav aria-label="Breadcrumb" style="margin-bottom: 20px;">
            <ol style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 6px; background: #f1f5f9; border: 1px solid #e2e8f0; font-size: 0.85rem; font-weight: 500; color: #64748b; list-style: none; margin: 0;">
                <li style="display: inline-flex; align-items: center; gap: 6px;">
                    <a href="<?= url('/') ?>" style="color: #475569; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                        <i class="fa-solid fa-house" style="font-size: 0.78rem;"></i> Home
                    </a>
                </li>
                <li><i class="fa-solid fa-angle-right" style="font-size: 0.72rem; color: #94a3b8;"></i></li>
                <li>
                    <a href="<?= url('/tools') ?>" style="color: #475569; text-decoration: none;">Tools</a>
                </li>
                <li><i class="fa-solid fa-angle-right" style="font-size: 0.72rem; color: #94a3b8;"></i></li>
                <li style="color: #0f172a; font-weight: 600;">Keyword Density & Readability</li>
            </ol>
        </nav>

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 36px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; background: #eff6ff; border: 1px solid #dbeafe; border-radius: 9999px; color: #2563eb; font-size: 0.82rem; font-weight: 600; margin-bottom: 12px;">
                <i class="fa-solid fa-chart-simple"></i> On-Page Content & Readability Intelligence
            </div>
            <h1 style="font-size: 2.6rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 12px; line-height: 1.15;">
                Keyword Density & Readability Analyzer
            </h1>
            <p style="font-size: 1.05rem; color: #475569; max-width: 720px; margin: 0 auto; line-height: 1.6;">
                Check on-page keyword frequency, uncover 1-word, 2-word, and 3-word n-grams, calculate Flesch reading ease scores, and avoid Google keyword stuffing penalties.
            </p>
        </div>

        <!-- Input Box & URL Scraper -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-bottom: 32px;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
                <div style="display: flex; gap: 8px;">
                    <button type="button" class="input-mode-pill active" onclick="switchInputMode('text', this)">
                        <i class="fa-solid fa-align-left"></i> Paste Text / Article
                    </button>
                    <button type="button" class="input-mode-pill" onclick="switchInputMode('url', this)">
                        <i class="fa-solid fa-globe"></i> Extract from URL
                    </button>
                </div>
                <button type="button" onclick="loadSampleText()" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #475569; padding: 5px 12px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer;">
                    <i class="fa-solid fa-wand-magic-sparkles" style="color: #2563eb;"></i> Load Sample Article
                </button>
            </div>

            <!-- 1. Text Mode Input -->
            <div id="textModeBox">
                <textarea id="articleText" class="form-input" rows="8" placeholder="Paste your article, blog post, or web page content here to analyze keyword frequency and readability in real-time..." style="font-size: 0.92rem; line-height: 1.6; resize: vertical;" oninput="analyzeContent()"></textarea>
            </div>

            <!-- 2. URL Mode Input -->
            <div id="urlModeBox" style="display: none;">
                <div style="display: flex; gap: 10px;">
                    <input type="url" id="scrapeUrlInput" class="form-input" placeholder="https://example.com/blog/seo-guide" style="font-size: 0.95rem;">
                    <button type="button" onclick="fetchContentFromUrl()" id="fetchUrlBtn" style="background: #2563eb; color: #ffffff; border: none; padding: 10px 22px; border-radius: 7px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap;">
                        <i class="fa-solid fa-magnifying-glass"></i> Extract & Analyze
                    </button>
                </div>
                <div id="urlFetchStatus" style="font-size: 0.82rem; color: #64748b; margin-top: 6px;"></div>
            </div>

        </div>

        <!-- Metric KPI Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px;">
            
            <div class="kpi-metric-card">
                <div class="kpi-lbl">Total Words</div>
                <div class="kpi-val" id="valWords">0</div>
                <div class="kpi-sub" id="valChars">0 characters</div>
            </div>

            <div class="kpi-metric-card">
                <div class="kpi-lbl">Sentences / Paragraphs</div>
                <div class="kpi-val" id="valSentences">0</div>
                <div class="kpi-sub" id="valParagraphs">0 paragraphs</div>
            </div>

            <div class="kpi-metric-card">
                <div class="kpi-lbl">Reading / Speaking Time</div>
                <div class="kpi-val" id="valReadTime">0 min</div>
                <div class="kpi-sub" id="valSpeakTime">0 min speaking</div>
            </div>

            <div class="kpi-metric-card" style="border-left: 4px solid #2563eb;">
                <div class="kpi-lbl">Flesch Reading Ease</div>
                <div class="kpi-val" id="valFleschScore">--</div>
                <div class="kpi-sub" id="valFleschBadge" style="font-weight: 600; color: #2563eb;">Paste text to calculate</div>
            </div>

        </div>

        <!-- Keyword Density Breakdown Card -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-bottom: 40px;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 20px;">
                <div style="display: flex; gap: 8px;">
                    <button type="button" class="density-tab active" onclick="switchDensityNgram(1, this)">1-Word Keywords</button>
                    <button type="button" class="density-tab" onclick="switchDensityNgram(2, this)">2-Word Phrases</button>
                    <button type="button" class="density-tab" onclick="switchDensityNgram(3, this)">3-Word Phrases</button>
                </div>
                
                <div style="display: flex; align-items: center; gap: 14px;">
                    <label style="font-size: 0.85rem; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 6px; cursor: pointer;">
                        <input type="checkbox" id="chkFilterStopWords" checked onchange="analyzeContent()" style="accent-color: #2563eb; width: 16px; height: 16px;">
                        Filter Stop Words (is, the, and, on...)
                    </label>
                    <input type="text" id="keywordSearchFilter" class="form-input" placeholder="Search keywords..." style="width: 180px; padding: 5px 10px; font-size: 0.82rem;" oninput="renderKeywordsTable()">
                </div>
            </div>

            <!-- Table -->
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
                    <thead>
                        <tr style="border-bottom: 2px solid #e2e8f0; color: #475569; font-weight: 700;">
                            <th style="padding: 10px 12px;">Keyword / Phrase</th>
                            <th style="padding: 10px 12px; width: 100px;">Occurrences</th>
                            <th style="padding: 10px 12px; width: 120px;">Density %</th>
                            <th style="padding: 10px 12px; width: 220px;">Visual Distribution</th>
                            <th style="padding: 10px 12px; width: 140px;">SEO Status</th>
                        </tr>
                    </thead>
                    <tbody id="densityTableBody">
                        <tr>
                            <td colspan="5" style="padding: 30px; text-align: center; color: #94a3b8;">
                                Enter or paste text above to generate live keyword density breakdown.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>
</div>

<style>
.input-mode-pill {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    color: #475569;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}
.input-mode-pill.active {
    background: #2563eb;
    border-color: #2563eb;
    color: #ffffff;
}
.kpi-metric-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 16px 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}
.kpi-lbl {
    font-size: 0.78rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 4px;
}
.kpi-val {
    font-size: 1.6rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.1;
    margin-bottom: 4px;
}
.kpi-sub {
    font-size: 0.78rem;
    color: #64748b;
}
.density-tab {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    color: #475569;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}
.density-tab.active {
    background: #0f172a;
    border-color: #0f172a;
    color: #ffffff;
}
</style>

<script>
let currentNgram = 1;
let ngramData = { 1: [], 2: [], 3: [] };

const stopWords = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
    'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot',
    'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
    'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d',
    'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i',
    'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s',
    'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
    'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
    'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
    'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve',
    'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll',
    'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while',
    'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll',
    'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

function switchInputMode(mode, btn) {
    document.querySelectorAll('.input-mode-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (mode === 'text') {
        document.getElementById('textModeBox').style.display = 'block';
        document.getElementById('urlModeBox').style.display = 'none';
    } else {
        document.getElementById('textModeBox').style.display = 'none';
        document.getElementById('urlModeBox').style.display = 'block';
    }
}

function switchDensityNgram(n, btn) {
    currentNgram = n;
    document.querySelectorAll('.density-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderKeywordsTable();
}

function loadSampleText() {
    document.getElementById('articleText').value = `Search Engine Optimization (SEO) is the foundation of sustainable digital growth. In today's competitive landscape, technical SEO and on-page optimization are vital for ranking high on Google search results.

A comprehensive technical SEO audit identifies critical issues like slow page speed, broken links, missing canonical tags, and unoptimized schema markup. By fixing these technical SEO issues, search engine crawlers can index your content effortlessly.

High-quality content marketing combined with targeted keyword research attracts qualified organic traffic. Ensure your primary keyword appears naturally in your title tag, meta description, and H1 heading without keyword stuffing. Modern search algorithms reward helpful, comprehensive content that solves user intent.`;
    analyzeContent();
}

function fetchContentFromUrl() {
    const rawUrl = document.getElementById('scrapeUrlInput').value.trim();
    const statusEl = document.getElementById('urlFetchStatus');
    const btn = document.getElementById('fetchUrlBtn');

    if (!rawUrl) {
        statusEl.innerHTML = '<span style="color:#ef4444;">Please enter a URL first.</span>';
        return;
    }

    statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Fetching page content via server...';
    btn.disabled = true;

    fetch('<?= url('/tools/api/content-fetch') ?>', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ url: rawUrl })
    })
    .then(r => r.json())
    .then(data => {
        btn.disabled = false;
        if (data.success && data.text) {
            statusEl.innerHTML = `<span style="color:#10b981;"><i class="fa-solid fa-check"></i> Extracted ${data.text.split(/\\s+/).length} words from page.</span>`;
            document.getElementById('articleText').value = data.text;
            switchInputMode('text', document.querySelector('.input-mode-pill'));
            analyzeContent();
        } else {
            statusEl.innerHTML = `<span style="color:#ef4444;"><i class="fa-solid fa-circle-exclamation"></i> ${data.message || 'Failed to fetch content.'}</span>`;
        }
    })
    .catch(err => {
        btn.disabled = false;
        statusEl.innerHTML = `<span style="color:#ef4444;">Network error fetching content.</span>`;
    });
}

function countSyllables(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
    word = word.replace(/^y/, '');
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
}

function analyzeContent() {
    const rawText = document.getElementById('articleText').value;
    const filterStop = document.getElementById('chkFilterStopWords').checked;

    if (!rawText.trim()) {
        document.getElementById('valWords').textContent = '0';
        document.getElementById('valChars').textContent = '0 characters';
        document.getElementById('valSentences').textContent = '0';
        document.getElementById('valParagraphs').textContent = '0 paragraphs';
        document.getElementById('valReadTime').textContent = '0 min';
        document.getElementById('valSpeakTime').textContent = '0 min speaking';
        document.getElementById('valFleschScore').textContent = '--';
        document.getElementById('valFleschBadge').textContent = 'Paste text to calculate';
        document.getElementById('densityTableBody').innerHTML = '<tr><td colspan="5" style="padding: 30px; text-align: center; color: #94a3b8;">Enter or paste text above to generate live keyword density breakdown.</td></tr>';
        return;
    }

    // Basic Metrics
    const words = rawText.trim().match(/\b[A-Za-z0-9'-]+\b/g) || [];
    const totalWords = words.length;
    const charsWithSpaces = rawText.length;
    const sentences = rawText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const totalSentences = Math.max(1, sentences.length);
    const paragraphs = rawText.split(/\n+/).filter(p => p.trim().length > 0);
    const totalParagraphs = Math.max(1, paragraphs.length);

    document.getElementById('valWords').textContent = totalWords.toLocaleString();
    document.getElementById('valChars').textContent = `${charsWithSpaces.toLocaleString()} chars`;
    document.getElementById('valSentences').textContent = totalSentences.toLocaleString();
    document.getElementById('valParagraphs').textContent = `${totalParagraphs.toLocaleString()} paragraphs`;

    const readMin = Math.ceil(totalWords / 200);
    const speakMin = Math.ceil(totalWords / 130);
    document.getElementById('valReadTime').textContent = `${readMin} min`;
    document.getElementById('valSpeakTime').textContent = `${speakMin} min speaking`;

    // Flesch Reading Ease Calculation: 206.835 - (1.015 * (words/sentences)) - (84.6 * (syllables/words))
    let totalSyllables = 0;
    words.forEach(w => totalSyllables += countSyllables(w));
    
    let flesch = 206.835 - (1.015 * (totalWords / totalSentences)) - (84.6 * (totalSyllables / Math.max(1, totalWords)));
    flesch = Math.max(0, Math.min(100, Math.round(flesch)));

    const scoreEl = document.getElementById('valFleschScore');
    const badgeEl = document.getElementById('valFleschBadge');
    scoreEl.textContent = flesch + ' / 100';

    if (flesch >= 80) {
        badgeEl.textContent = 'Very Easy (6th grade level)';
        badgeEl.style.color = '#10b981';
    } else if (flesch >= 60) {
        badgeEl.textContent = 'Standard / Plain English (8th-9th grade)';
        badgeEl.style.color = '#2563eb';
    } else if (flesch >= 50) {
        badgeEl.textContent = 'Fairly Difficult (High school level)';
        badgeEl.style.color = '#f59e0b';
    } else {
        badgeEl.textContent = 'Difficult / Academic (College level)';
        badgeEl.style.color = '#ef4444';
    }

    // N-Gram Frequencies
    const cleanedTokens = words.map(w => w.toLowerCase());

    // 1-Word
    const map1 = {};
    cleanedTokens.forEach(w => {
        if (filterStop && stopWords.has(w)) return;
        if (w.length < 2) return;
        map1[w] = (map1[w] || 0) + 1;
    });

    // 2-Word (Bigrams)
    const map2 = {};
    for (let i = 0; i < cleanedTokens.length - 1; i++) {
        const w1 = cleanedTokens[i];
        const w2 = cleanedTokens[i + 1];
        if (filterStop && (stopWords.has(w1) && stopWords.has(w2))) continue;
        const phrase = `${w1} ${w2}`;
        map2[phrase] = (map2[phrase] || 0) + 1;
    }

    // 3-Word (Trigrams)
    const map3 = {};
    for (let i = 0; i < cleanedTokens.length - 2; i++) {
        const w1 = cleanedTokens[i];
        const w2 = cleanedTokens[i + 1];
        const w3 = cleanedTokens[i + 2];
        if (filterStop && stopWords.has(w1) && stopWords.has(w2) && stopWords.has(w3)) continue;
        const phrase = `${w1} ${w2} ${w3}`;
        map3[phrase] = (map3[phrase] || 0) + 1;
    }

    const sortFn = (map) => Object.keys(map).map(k => ({
        keyword: k,
        count: map[k],
        density: ((map[k] / Math.max(1, totalWords)) * 100).toFixed(2)
    })).sort((a, b) => b.count - a.count);

    ngramData[1] = sortFn(map1);
    ngramData[2] = sortFn(map2);
    ngramData[3] = sortFn(map3);

    renderKeywordsTable();
}

function renderKeywordsTable() {
    const data = ngramData[currentNgram] || [];
    const search = (document.getElementById('keywordSearchFilter').value || '').toLowerCase().trim();
    const tbody = document.getElementById('densityTableBody');

    const filtered = data.filter(item => !search || item.keyword.toLowerCase().includes(search));

    if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="padding: 24px; text-align: center; color: #94a3b8;">No keywords found matching filter.</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.slice(0, 30).map(item => {
        const d = parseFloat(item.density);
        let statusBadge = '<span style="color:#10b981; font-weight:600;"><i class="fa-solid fa-check"></i> Optimal</span>';
        let barColor = '#10b981';

        if (d > 3.5 && currentNgram === 1) {
            statusBadge = '<span style="color:#ef4444; font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> High (Stuffing)</span>';
            barColor = '#ef4444';
        } else if (d > 2.0 && currentNgram === 1) {
            statusBadge = '<span style="color:#f59e0b; font-weight:600;"><i class="fa-solid fa-info-circle"></i> Prominent</span>';
            barColor = '#f59e0b';
        }

        const barWidth = Math.min(100, Math.max(8, d * 20));

        return `
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 12px; font-weight: 600; color: #0f172a;">${escapeHtml(item.keyword)}</td>
                <td style="padding: 10px 12px; color: #475569;">${item.count}</td>
                <td style="padding: 10px 12px; font-weight: 700; color: #0f172a;">${item.density}%</td>
                <td style="padding: 10px 12px;">
                    <div style="height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; width: ${barWidth}%; background: ${barColor};"></div>
                    </div>
                </td>
                <td style="padding: 10px 12px; font-size: 0.82rem;">${statusBadge}</td>
            </tr>
        `;
    }).join('');
}

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

document.addEventListener('DOMContentLoaded', () => {
    loadSampleText();
});
</script>
