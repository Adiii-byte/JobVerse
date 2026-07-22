// =========================================================
// JobVerse — front-end demo logic
// =========================================================

// --- 0. JOB & COMPANY DATA -------------------------------
// Real jobs are fetched live from two free APIs (see fetchJobs
// below: Jobicy + Remotive). This array is only a fallback shown
// if both requests fail (e.g. no internet, or opened via
// file:// instead of a local server).
const FALLBACK_JOBS = [
    { id: "fb-1",  title: "Frontend Developer",        company: "Northwind Labs",   location: "Mumbai, India",   type: "Full-time", mode: "Hybrid", tags: ["React", "JavaScript", "CSS"], posted: "2 days ago",  salary: "₹8L – ₹14L / yr" },
    { id: "fb-2",  title: "Backend Engineer (Node.js)", company: "Riverstone Tech",  location: "Bengaluru, India",type: "Full-time", mode: "Onsite", tags: ["Node.js", "MongoDB", "AWS"],   posted: "1 day ago",   salary: "₹10L – ₹18L / yr" },
    { id: "fb-3",  title: "UI/UX Designer",             company: "Pinegate Studio",  location: "Remote",          type: "Full-time", mode: "Remote", tags: ["Figma", "Design Systems"],     posted: "5 days ago",  salary: "₹6L – ₹11L / yr" },
    { id: "fb-4",  title: "Data Scientist",             company: "Anchorfield Analytics", location: "Pune, India", type: "Full-time", mode: "Hybrid", tags: ["Python", "ML", "SQL"],        posted: "3 days ago",  salary: "₹12L – ₹20L / yr" },
    { id: "fb-5",  title: "Product Manager",            company: "Northwind Labs",   location: "Mumbai, India",   type: "Full-time", mode: "Onsite", tags: ["Roadmapping", "Agile"],       posted: "1 week ago",  salary: "₹15L – ₹24L / yr" },
    { id: "fb-6",  title: "React Developer (Contract)", company: "Cloverbrook Digital", location: "Remote",       type: "Contract",  mode: "Remote", tags: ["React", "TypeScript"],        posted: "4 days ago",  salary: "₹6,000 / day" },
    { id: "fb-7",  title: "DevOps Engineer",            company: "Riverstone Tech",  location: "Hyderabad, India",type: "Full-time", mode: "Hybrid", tags: ["Docker", "Kubernetes", "CI/CD"], posted: "6 days ago", salary: "₹14L – ₹22L / yr" },
    { id: "fb-8",  title: "Marketing Intern",           company: "Bluepeak Media",   location: "Delhi, India",    type: "Internship",mode: "Onsite", tags: ["Content", "SEO"],             posted: "Today",       salary: "₹15,000 / mo" },
    { id: "fb-9",  title: "QA Automation Engineer",     company: "Anchorfield Analytics", location: "Pune, India", type: "Full-time", mode: "Hybrid", tags: ["Selenium", "Cypress"],        posted: "3 days ago",  salary: "₹7L – ₹12L / yr" },
    { id: "fb-10", title: "Graphic Designer",           company: "Pinegate Studio",  location: "Remote",          type: "Part-time", mode: "Remote", tags: ["Illustrator", "Branding"],    posted: "2 days ago",  salary: "₹500 / hr" },
];

// No reliable free, live API exists for Indian government job
// listings (unlike Adzuna/Jobicy for private-sector roles) — the
// only options found were unofficial scrapers of dubious
// reliability. So these are demo entries for common recruitment
// categories, but "Apply Now" genuinely opens each body's real,
// official portal — not a fake link.
const GOVT_JOBS = [
    { id: "govt-1", title: "Junior Engineer (Various Disciplines)", company: "Staff Selection Commission (SSC)", location: "Multiple Locations, India", type: "Full-time", mode: "Onsite", tags: ["Government", "SSC", "Engineering"], posted: "Ongoing recruitment", salary: "₹35,400 – ₹1,12,400 / mo (Level 6)", url: "https://ssc.nic.in" },
    { id: "govt-2", title: "Probationary Officer (PO)", company: "Institute of Banking Personnel Selection (IBPS)", location: "Pan India", type: "Full-time", mode: "Onsite", tags: ["Government", "Banking", "IBPS"], posted: "Ongoing recruitment", salary: "₹48,480 – ₹85,920 / mo (approx.)", url: "https://www.ibps.in" },
    { id: "govt-3", title: "Non-Technical Popular Categories (NTPC)", company: "Railway Recruitment Board (RRB)", location: "Zone-wise, India", type: "Full-time", mode: "Onsite", tags: ["Government", "Railways", "RRB"], posted: "Ongoing recruitment", salary: "₹19,900 – ₹35,400 / mo (Level 2–5)", url: "https://rrb.indianrailways.gov.in" },
    { id: "govt-4", title: "Civil Services (IAS / IPS / IFS)", company: "Union Public Service Commission (UPSC)", location: "All India", type: "Full-time", mode: "Onsite", tags: ["Government", "Civil Services", "UPSC"], posted: "Annual recruitment cycle", salary: "₹56,100 – ₹2,50,000 / mo (by rank)", url: "https://www.upsc.gov.in" },
    { id: "govt-5", title: "State & Central Govt Openings (Various)", company: "National Career Service (NCS)", location: "All India", type: "Full-time", mode: "Onsite", tags: ["Government", "NCS"], posted: "Updated regularly", salary: "As per post", url: "https://www.ncs.gov.in" },
    { id: "govt-6", title: "Short Service Commission — Officer Entry", company: "Indian Armed Forces", location: "Pan India", type: "Full-time", mode: "Onsite", tags: ["Government", "Defence"], posted: "Ongoing recruitment", salary: "₹56,100+ / mo + allowances", url: "https://joinindianarmy.nic.in" },
];

// Vocational / skilled-trade roles — none of Jobicy/Remotive/Adzuna
// meaningfully cover this segment (they skew white-collar/remote),
// so these are curated demo listings representing the kind of work
// (electrician, driver, delivery, etc.) that doesn't require a
// college degree.
const BLUE_COLLAR_JOBS = [
    { id: "bc-1", title: "Electrician", company: "Sunrise Facility Services", location: "Delhi, India", type: "Full-time", mode: "Onsite", tags: ["Blue-Collar", "Electrician"], posted: "3 days ago", salary: "₹15,000 – ₹22,000 / mo" },
    { id: "bc-2", title: "Delivery Executive", company: "QuickDrop Logistics", location: "Mumbai, India", type: "Full-time", mode: "Onsite", tags: ["Blue-Collar", "Delivery"], posted: "Today", salary: "₹18,000 – ₹25,000 / mo + incentives" },
    { id: "bc-3", title: "Driver (Light Motor Vehicle)", company: "Metro Cab Services", location: "Bengaluru, India", type: "Full-time", mode: "Onsite", tags: ["Blue-Collar", "Driver"], posted: "2 days ago", salary: "₹16,000 – ₹24,000 / mo" },
    { id: "bc-4", title: "Plumber", company: "Sunrise Facility Services", location: "Pune, India", type: "Full-time", mode: "Onsite", tags: ["Blue-Collar", "Plumber"], posted: "5 days ago", salary: "₹14,000 – ₹20,000 / mo" },
    { id: "bc-5", title: "Security Guard", company: "SafeGuard Services", location: "Hyderabad, India", type: "Full-time", mode: "Onsite", tags: ["Blue-Collar", "Security"], posted: "1 day ago", salary: "₹13,000 – ₹18,000 / mo" },
    { id: "bc-6", title: "Warehouse Helper", company: "QuickDrop Logistics", location: "Chennai, India", type: "Full-time", mode: "Onsite", tags: ["Blue-Collar", "Warehouse"], posted: "4 days ago", salary: "₹12,000 – ₹17,000 / mo" },
    { id: "bc-7", title: "Cook / Kitchen Helper", company: "Spice Route Caterers", location: "Delhi, India", type: "Full-time", mode: "Onsite", tags: ["Blue-Collar", "Cook"], posted: "Today", salary: "₹13,000 – ₹19,000 / mo" },
    { id: "bc-8", title: "Beautician / Salon Assistant", company: "Glow Studio", location: "Mumbai, India", type: "Full-time", mode: "Onsite", tags: ["Blue-Collar", "Beautician"], posted: "3 days ago", salary: "₹12,000 – ₹18,000 / mo" },
];

const COMPANIES = [
    { name: "Northwind Labs",       industry: "Software",           openings: 2, blurb: "Builds workflow tools for small businesses." },
    { name: "Riverstone Tech",      industry: "Cloud Infrastructure",openings: 2, blurb: "Cloud hosting and DevOps consulting." },
    { name: "Pinegate Studio",      industry: "Design",              openings: 2, blurb: "Independent product design studio." },
    { name: "Anchorfield Analytics",industry: "Data & AI",           openings: 2, blurb: "Data science and analytics for retail brands." },
    { name: "Cloverbrook Digital",  industry: "Digital Agency",      openings: 1, blurb: "Websites and web apps for growing startups." },
    { name: "Bluepeak Media",       industry: "Marketing",           openings: 1, blurb: "Content and performance marketing agency." },
];

// JOBS holds whatever is currently on screen — live data once
// fetchJobs() resolves, or FALLBACK_JOBS until/unless it fails.
let JOBS = FALLBACK_JOBS;

// Two free, no-key-required job listing APIs, merged together:
// Jobicy (geo=india) for India-focused roles, Remotive for the
// wider global remote pool. If one fails, the other still shows.
// Note: Jobicy's "geo" filter only accepts values like usa/canada/
// europe — "india" isn't a valid region there and returns a 400.
// "tag" is a documented free-text search across title+description,
// so we use that to surface India-relevant listings instead.
const JOBICY_URL = "https://jobicy.com/api/v2/remote-jobs?count=20&tag=india";
const REMOTIVE_URL = "https://remotive.com/api/remote-jobs?limit=20";

function timeAgo(dateString) {
    const posted = new Date(dateString);
    const days = Math.floor((Date.now() - posted.getTime()) / 86400000);
    if (days <= 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 30) return `${days} days ago`;
    return posted.toLocaleDateString();
}

function formatSalary(j) {
    const min = j.annualSalaryMin ?? j.salaryMin;
    const max = j.annualSalaryMax ?? j.salaryMax;
    const currency = j.salaryCurrency || '';
    if (!min && !max) return "Not disclosed";
    if (min && max) return `${currency} ${min.toLocaleString()} – ${max.toLocaleString()}`.trim();
    return `${currency} ${(min || max).toLocaleString()}`.trim();
}

async function fetchFromJobicy() {
    // Jobicy's API isn't reliably CORS-enabled for direct browser
    // calls, so try direct first, then fall back to a free CORS
    // proxy that re-serves the same response with CORS headers.
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(JOBICY_URL)}`;

    let data;
    try {
        const res = await fetch(JOBICY_URL);
        if (!res.ok) throw new Error(`Jobicy returned ${res.status}`);
        data = await res.json();
    } catch (directErr) {
        const res = await fetch(proxyUrl);
        if (!res.ok) throw new Error(`Jobicy (proxy) returned ${res.status}`);
        data = await res.json();
    }

    return data.jobs.map(j => ({
        id: `jobicy-${j.id}`,
        title: j.jobTitle,
        company: j.companyName,
        location: j.jobGeo || "India",
        type: j.jobType || "Full-time",
        mode: "Remote",
        tags: [j.jobIndustry, j.jobType].filter(Boolean).slice(0, 3),
        posted: timeAgo(j.pubDate),
        postedRaw: j.pubDate,
        salary: formatSalary(j),
        url: j.url,
    }));
}

async function fetchFromRemotive() {
    const res = await fetch(REMOTIVE_URL);
    if (!res.ok) throw new Error(`Remotive returned ${res.status}`);
    const data = await res.json();
    return data.jobs.map(j => ({
        id: `remotive-${j.id}`,
        title: j.title,
        company: j.company_name,
        location: j.candidate_required_location || "Remote",
        type: j.job_type || "Full-time",
        mode: "Remote",
        tags: (j.tags && j.tags.length ? j.tags : [j.category]).filter(Boolean).slice(0, 3),
        posted: timeAgo(j.publication_date),
        postedRaw: j.publication_date,
        salary: j.salary && j.salary.trim() ? j.salary : "Not disclosed",
        url: j.url,
    }));
}

async function fetchJobs() {
    jobsGrid.innerHTML = Array(6).fill('<div class="skeleton-card"></div>').join('');

    const [jobicyResult, remotiveResult] = await Promise.allSettled([fetchFromJobicy(), fetchFromRemotive()]);
    const sources = [
        { name: 'Jobicy', result: jobicyResult },
        { name: 'Remotive', result: remotiveResult },
    ];

    let merged = sources
        .filter(s => s.result.status === 'fulfilled')
        .flatMap(s => s.result.value);

    const failed = sources.filter(s => s.result.status === 'rejected');
    failed.forEach(s => console.warn(`${s.name} feed unavailable:`, s.result.reason));

    // Live India-tagged results are often sparse (Jobicy's feed
    // skews Americas/Europe), so always mix in the sample India
    // listings alongside whatever real data loads.
    merged = [...FALLBACK_JOBS, ...BLUE_COLLAR_JOBS, ...merged];

    if (failed.length) {
        showToast(`${failed.map(s => s.name).join(' & ')} feed unreachable — showing what's available.`);
    }

    JOBS = merged;
    if (statJobsEl) statJobsEl.textContent = `${JOBS.length}+`;
    updateNewJobsTracking();
    filterJobs();
    renderCompanies();
}

// --- NEW JOB ALERTS (localStorage-based, since last visit) ---
const SEEN_JOBS_KEY = 'jobverse_seen_job_ids';
let newJobIds = new Set();

function updateNewJobsTracking() {
    const currentIds = JOBS.map(j => j.id);
    let previousIds = null;
    try {
        const raw = localStorage.getItem(SEEN_JOBS_KEY);
        previousIds = raw ? JSON.parse(raw) : null;
    } catch (err) {
        previousIds = null;
    }

    const banner = document.getElementById('newJobsBanner');
    const navBadge = document.getElementById('navNewBadge');

    if (previousIds && previousIds.length) {
        const prevSet = new Set(previousIds);
        newJobIds = new Set(currentIds.filter(id => !prevSet.has(id)));

        if (newJobIds.size > 0) {
            banner.style.display = 'block';
            banner.textContent = `🆕 ${newJobIds.size} new role${newJobIds.size === 1 ? '' : 's'} since your last visit`;
            navBadge.style.display = 'inline-block';
            navBadge.textContent = newJobIds.size;
        } else {
            banner.style.display = 'none';
            navBadge.style.display = 'none';
        }
    } else {
        // First-ever visit — nothing to compare against yet.
        newJobIds = new Set();
        banner.style.display = 'none';
        navBadge.style.display = 'none';
    }

    try {
        localStorage.setItem(SEEN_JOBS_KEY, JSON.stringify(currentIds));
    } catch (err) {
        // localStorage unavailable (e.g. private browsing) — skip silently.
    }
}

// --- 1. THEME TOGGLE ---------------------------------------
const themeToggleBtn = document.getElementById('themeToggle');
const bodyElement = document.body;

themeToggleBtn.addEventListener('click', () => {
    const goingLight = bodyElement.classList.contains('dark-theme');
    bodyElement.classList.toggle('dark-theme', !goingLight);
    bodyElement.classList.toggle('light-theme', goingLight);
    themeToggleBtn.textContent = goingLight ? '🌙 Dark Mode' : '☀️ Light Mode';
});

// --- 2. PAGE ROUTING + MOBILE MENU -----------------------------
const menuLinks = document.querySelectorAll('.menu-link:not(.dropdown-toggle)');
const pages = document.querySelectorAll('.page-section');
const logoBtn = document.getElementById('logoBtn');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const jobsDropdown = document.getElementById('jobsDropdown');
const jobsDropdownToggle = document.getElementById('jobsDropdownToggle');

function switchPage(targetId) {
    if (targetId === 'saved' && !currentUser) {
        showToast('Log in to view your saved jobs.');
        openModal(false);
        return;
    }

    if (targetId === 'admin' && (!currentUser || currentUser.uid !== ADMIN_UID)) {
        showToast('Not authorized.');
        return;
    }

    pages.forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('active'));

    const pageEl = document.getElementById(`${targetId}Page`);
    if (pageEl) pageEl.classList.add('active');
    document.querySelectorAll(`[data-target="${targetId}"]`).forEach(l => l.classList.add('active'));

    // Keep the "Jobs" dropdown toggle highlighted for any of its sub-pages.
    jobsDropdownToggle.classList.toggle('active', ['home', 'government', 'bluecollar'].includes(targetId));

    if (targetId === 'saved') renderSavedJobs();
    if (targetId === 'admin') { loadApplications(); loadFeedback(); }
    if (targetId === 'government') renderGovtJobs();
    if (targetId === 'bluecollar') renderBlueCollarJobs();

    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    jobsDropdown.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        switchPage(link.getAttribute('data-target'));
    });
});

jobsDropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    jobsDropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!jobsDropdown.contains(e.target)) {
        jobsDropdown.classList.remove('open');
    }
});

logoBtn.addEventListener('click', () => switchPage('home'));

hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('open');
});

// --- 3. RENDER JOB CARDS ---------------------------------------
const jobsGrid = document.getElementById('jobsGrid');
const resultsCount = document.getElementById('resultsCount');
const keywordInput = document.getElementById('keywordInput');
const locationInput = document.getElementById('locationInput');
const typeFilter = document.getElementById('typeFilter');
const modeFilter = document.getElementById('modeFilter');
const sortSelect = document.getElementById('sortSelect');
const searchBtn = document.querySelector('.search-btn');
const tagLinks = document.querySelectorAll('.popular-tags a');
const statJobsEl = document.getElementById('statJobs');

function initials(name) {
    return (name || '?').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function jobCardHTML(job) {
    const isSaved = savedJobsMap.has(job.id);
    const isNew = newJobIds.has(job.id);
    return `
        <div class="job-card-top">
            <div class="job-logo">${initials(job.company)}</div>
            <div class="job-card-actions">
                <button class="listen-btn" data-job-id="${job.id}" aria-label="Listen to job details" title="Listen">🔊</button>
                <button class="bookmark-btn ${isSaved ? 'saved' : ''}" data-job-id="${job.id}" aria-label="Save job" title="Save job">${isSaved ? '★' : '☆'}</button>
            </div>
        </div>
        <h3>${job.title}${isNew ? '<span class="job-new-tag">NEW</span>' : ''}</h3>
        <p class="job-company">${job.company} · ${job.location}</p>
        <div class="job-tags">
            ${job.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}
        </div>
        <div class="job-card-bottom">
            <span class="job-salary">${job.salary}</span>
            <span class="job-posted">${job.posted}</span>
        </div>
        <button class="job-apply-btn">Apply Now</button>
    `;
}

function speakJob(job) {
    if (!('speechSynthesis' in window)) {
        showToast('Audio playback is not supported on this browser.');
        return;
    }
    window.speechSynthesis.cancel(); // stop anything already playing
    const text = `${job.title}, at ${job.company}. Location: ${job.location}. Salary: ${job.salary}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

function renderJobs(list) {
    jobsGrid.innerHTML = '';

    if (list.length === 0) {
        jobsGrid.innerHTML = `<div class="empty-state">No roles match that search yet. Try a different keyword or location.</div>`;
        resultsCount.textContent = '0 roles found';
        return;
    }

    resultsCount.textContent = `${list.length} role${list.length === 1 ? '' : 's'} found`;

    list.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = jobCardHTML(job);

        card.querySelector('.job-apply-btn').addEventListener('click', () => {
            recordApplication(job);
            if (job.url) {
                showToast(`Opening application for ${job.title}…`);
                window.open(job.url, '_blank', 'noopener');
            } else {
                showToast(`Applied to ${job.title} at ${job.company}`);
            }
        });

        card.querySelector('.bookmark-btn').addEventListener('click', () => toggleSaveJob(job));
        card.querySelector('.listen-btn').addEventListener('click', () => speakJob(job));

        jobsGrid.appendChild(card);
    });
}

// Reusable renderer for simple static grids (Government / Blue-Collar
// pages) that don't need the full search+filter machinery.
function renderJobGridInto(gridEl, list, emptyMsg) {
    gridEl.innerHTML = '';
    if (list.length === 0) {
        gridEl.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
        return;
    }
    list.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = jobCardHTML(job);

        card.querySelector('.job-apply-btn').addEventListener('click', () => {
            recordApplication(job);
            if (job.url) {
                showToast(`Opening application for ${job.title}…`);
                window.open(job.url, '_blank', 'noopener');
            } else {
                showToast(`Applied to ${job.title} at ${job.company}`);
            }
        });
        card.querySelector('.bookmark-btn').addEventListener('click', () => toggleSaveJob(job));
        card.querySelector('.listen-btn').addEventListener('click', () => speakJob(job));

        gridEl.appendChild(card);
    });
}

const govtJobsGrid = document.getElementById('govtJobsGrid');
function renderGovtJobs() {
    renderJobGridInto(govtJobsGrid, GOVT_JOBS, 'No listings right now.');
}

const bluecollarJobsGrid = document.getElementById('bluecollarJobsGrid');
function renderBlueCollarJobs(filterKeyword) {
    const kw = (filterKeyword || '').toLowerCase();
    const list = !kw ? BLUE_COLLAR_JOBS : BLUE_COLLAR_JOBS.filter(job =>
        job.title.toLowerCase().includes(kw) || job.tags.some(t => t.toLowerCase().includes(kw))
    );
    renderJobGridInto(bluecollarJobsGrid, list, 'No roles match that category yet.');
}

function filterJobs() {
    const keyword = keywordInput.value.trim().toLowerCase();
    const location = locationInput.value.trim().toLowerCase();
    const type = typeFilter.value;
    const mode = modeFilter.value;
    const sort = sortSelect.value;

    let filtered = JOBS.filter(job => {
        const matchesKeyword = !keyword ||
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.tags.some(t => t.toLowerCase().includes(keyword));
        const matchesLocation = !location ||
            job.location.toLowerCase().includes(location) ||
            (location === 'remote' && job.mode.toLowerCase() === 'remote');
        const matchesType = !type || job.type === type;
        const matchesMode = !mode || job.mode === mode;
        return matchesKeyword && matchesLocation && matchesType && matchesMode;
    });

    if (sort === 'recent') {
        filtered = [...filtered].sort((a, b) => new Date(b.postedRaw || 0) - new Date(a.postedRaw || 0));
    } else if (sort === 'title') {
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    renderJobs(filtered);
}

[keywordInput, locationInput].forEach(input => {
    input.addEventListener('input', filterJobs);
});
searchBtn.addEventListener('click', filterJobs);
typeFilter.addEventListener('change', filterJobs);
modeFilter.addEventListener('change', filterJobs);
sortSelect.addEventListener('change', filterJobs);

tagLinks.forEach(tag => {
    tag.addEventListener('click', (e) => {
        e.preventDefault();
        const text = tag.textContent.trim();
        keywordInput.value = text === 'Remote' ? '' : text;
        locationInput.value = text === 'Remote' ? 'Remote' : '';
        filterJobs();
        document.getElementById('jobsSection').scrollIntoView({ behavior: 'smooth' });
    });
});

// --- 4. RENDER COMPANY CARDS ------------------------------------
const companiesGrid = document.getElementById('companiesGrid');

function renderCompanies() {
    // Count real open roles per company from whatever is currently
    // loaded (live API data once fetchJobs resolves). This way any
    // well-known company shown here is genuinely, verifiably hiring
    // right now via the live feed — not a fabricated claim about a
    // real company's hiring status.
    const counts = new Map();
    JOBS.forEach(job => counts.set(job.company, (counts.get(job.company) || 0) + 1));

    const fictionalNames = new Set(COMPANIES.map(c => c.name));
    const liveCompanies = [...counts.entries()]
        .filter(([name]) => !fictionalNames.has(name))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
        .map(([name, count]) => ({
            name,
            industry: 'Actively hiring',
            openings: count,
            blurb: `Currently listing ${count} open role${count === 1 ? '' : 's'} on JobVerse's live feed.`,
        }));

    const all = [...COMPANIES, ...liveCompanies];

    companiesGrid.innerHTML = all.map(c => `
        <div class="company-card">
            <div class="company-logo">${initials(c.name)}</div>
            <h3>${c.name}</h3>
            <p class="company-industry">${c.industry}</p>
            <p class="company-blurb">${c.blurb}</p>
            <span class="company-openings">${c.openings} open role${c.openings === 1 ? '' : 's'}</span>
        </div>
    `).join('');
}

// --- 5. SAVED JOBS (Firestore) -----------------------------------
const savedJobsGrid = document.getElementById('savedJobsGrid');
let savedJobsMap = new Map(); // jobId -> job object
let currentUser = null;

function savedJobsRef() {
    return db.collection('users').doc(currentUser.uid).collection('savedJobs');
}

async function loadSavedJobs() {
    savedJobsMap = new Map();
    if (!currentUser) return;
    try {
        const snap = await savedJobsRef().get();
        snap.forEach(doc => savedJobsMap.set(doc.id, doc.data()));
    } catch (err) {
        console.warn('Could not load saved jobs:', err);
    }
}

async function toggleSaveJob(job) {
    if (!currentUser) {
        showToast('Log in to save jobs.');
        openModal(false);
        return;
    }

    const alreadySaved = savedJobsMap.has(job.id);
    try {
        if (alreadySaved) {
            await savedJobsRef().doc(job.id).delete();
            savedJobsMap.delete(job.id);
            showToast('Removed from saved jobs');
        } else {
            await savedJobsRef().doc(job.id).set(job);
            savedJobsMap.set(job.id, job);
            showToast('Saved!');
        }
    } catch (err) {
        showToast('Could not update saved jobs — try again.');
        console.warn(err);
    }

    filterJobs();
    if (document.getElementById('savedPage').classList.contains('active')) renderSavedJobs();
}

function renderSavedJobs() {
    const list = Array.from(savedJobsMap.values());
    if (!currentUser) {
        savedJobsGrid.innerHTML = `<div class="empty-state">Log in to see jobs you've saved.</div>`;
        return;
    }
    if (list.length === 0) {
        savedJobsGrid.innerHTML = `<div class="empty-state">No saved jobs yet — tap the ☆ on any listing to save it here.</div>`;
        return;
    }
    savedJobsGrid.innerHTML = '';
    list.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = jobCardHTML(job);
        card.querySelector('.job-apply-btn').addEventListener('click', () => {
            recordApplication(job);
            if (job.url) { window.open(job.url, '_blank', 'noopener'); }
            else { showToast(`Applied to ${job.title} at ${job.company}`); }
        });
        card.querySelector('.bookmark-btn').addEventListener('click', () => toggleSaveJob(job));
        card.querySelector('.listen-btn').addEventListener('click', () => speakJob(job));
        savedJobsGrid.appendChild(card);
    });
}

// --- 6. AUTH MODAL --------------------------------------------
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const footerLoginLink = document.getElementById('footerLoginLink');

function openModal(showSignup) {
    authModal.classList.add('open');
    loginForm.classList.toggle('active', !showSignup);
    signupForm.classList.toggle('active', showSignup);
}

loginBtn.addEventListener('click', () => openModal(false));
signupBtn.addEventListener('click', () => openModal(true));
footerLoginLink?.addEventListener('click', (e) => { e.preventDefault(); openModal(false); });
switchToSignup?.addEventListener('click', (e) => { e.preventDefault(); openModal(true); });
switchToLogin?.addEventListener('click', (e) => { e.preventDefault(); openModal(false); });

closeModal.addEventListener('click', () => authModal.classList.remove('open'));
window.addEventListener('click', (e) => {
    if (e.target === authModal) authModal.classList.remove('open');
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') authModal.classList.remove('open');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            authModal.classList.remove('open');
            showToast('Welcome back!');
            e.target.reset();
        })
        .catch(err => showToast(authErrorMessage(err)));
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => cred.user.updateProfile({ displayName: name }))
        .then(() => {
            authModal.classList.remove('open');
            showToast('Account created — welcome to JobVerse!');
            e.target.reset();
        })
        .catch(err => showToast(authErrorMessage(err)));
});

function authErrorMessage(err) {
    switch (err.code) {
        case 'auth/email-already-in-use': return 'That email already has an account — try logging in.';
        case 'auth/invalid-email':        return 'That email address looks invalid.';
        case 'auth/weak-password':        return 'Password should be at least 6 characters.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':   return 'Incorrect email or password.';
        default:                          return err.message || 'Something went wrong. Try again.';
    }
}

// Reflect signed-in state in the nav
const logRegEl = document.getElementById('logReg');
const userBadge = document.getElementById('userBadge');
const userNameDisplay = document.getElementById('userNameDisplay');
const logoutBtn = document.getElementById('logoutBtn');
const adminNavLink = document.getElementById('adminNavLink');
const db = firebase.firestore();

// Paste YOUR Firebase Authentication UID here (see firebase-config.js
// for how to find it). Only this UID will ever be able to read the
// applications list — enforced by Firestore security rules, not by
// this check alone, so no one else can see who applied where.
const ADMIN_UID = "PASTE_YOUR_ADMIN_UID_HERE";

async function recordApplication(job) {
    if (!currentUser) return; // only logged-in applicants are tracked
    try {
        await db.collection('applications').add({
            userId: currentUser.uid,
            userName: currentUser.displayName || currentUser.email.split('@')[0],
            userEmail: currentUser.email,
            jobTitle: job.title,
            company: job.company,
            jobId: job.id,
            appliedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (err) {
        console.warn('Could not record application:', err);
    }
}

async function loadApplications() {
    const container = document.getElementById('applicationsList');
    container.innerHTML = `<p class="empty-state">Loading applications…</p>`;
    try {
        const snap = await db.collection('applications').orderBy('appliedAt', 'desc').limit(100).get();
        if (snap.empty) {
            container.innerHTML = `<p class="empty-state">No applications recorded yet.</p>`;
            return;
        }
        container.innerHTML = snap.docs.map(doc => {
            const d = doc.data();
            const when = d.appliedAt?.toDate ? d.appliedAt.toDate().toLocaleString() : 'Just now';
            return `
                <div class="application-row">
                    <div class="app-applicant"><strong>${d.userName}</strong><span class="app-email">${d.userEmail}</span></div>
                    <div class="app-job">${d.jobTitle} @ ${d.company}</div>
                    <div class="app-time">${when}</div>
                </div>
            `;
        }).join('');
    } catch (err) {
        container.innerHTML = `<p class="empty-state">Could not load applications — check your Firestore rules and ADMIN_UID.</p>`;
        console.warn(err);
    }
}

firebase.auth().onAuthStateChanged(async user => {
    currentUser = user;
    if (user) {
        logRegEl.style.display = 'none';
        userBadge.style.display = 'flex';
        userNameDisplay.textContent = `Hi, ${user.displayName || user.email.split('@')[0]}`;
        adminNavLink.style.display = user.uid === ADMIN_UID ? 'inline-block' : 'none';
        await loadSavedJobs();
    } else {
        logRegEl.style.display = 'flex';
        userBadge.style.display = 'none';
        adminNavLink.style.display = 'none';
        savedJobsMap = new Map();
    }
    filterJobs();
    if (document.getElementById('savedPage').classList.contains('active')) renderSavedJobs();
});

logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut().then(() => showToast('Logged out'));
});

// --- 7. TOAST NOTIFICATIONS -------------------------------------
let toastTimer = null;
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// --- 8. INIT ------------------------------------------------------
fetchJobs();
renderCompanies();

// =========================================================
// SERVICES TOOLS — Resume Builder, Score Checker, Interview Prep
// =========================================================

// --- Toggle tool panels from the service cards ---
document.querySelectorAll('.service-try-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const panelId = btn.getAttribute('data-tool');
        const panel = document.getElementById(panelId);
        const alreadyOpen = panel.classList.contains('open');
        document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('open'));
        if (!alreadyOpen) {
            panel.classList.add('open');
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// --- 1. RESUME BUILDER ---
const rbFields = ['rbName', 'rbEmail', 'rbPhone', 'rbSummary', 'rbSkills', 'rbExperience', 'rbEducation']
    .map(id => document.getElementById(id));
const resumePreview = document.getElementById('resumePreview');

function renderResumePreview() {
    const [name, email, phone, summary, skills, experience, education] = rbFields.map(f => f.value.trim());

    if (!name && !email && !summary && !experience && !education) {
        resumePreview.innerHTML = `<p class="empty-state">Start typing to see your resume take shape.</p>`;
        return;
    }

    const expLines = experience.split('\n').filter(l => l.trim());
    const eduLines = education.split('\n').filter(l => l.trim());
    const skillList = skills.split(',').map(s => s.trim()).filter(Boolean);

    resumePreview.innerHTML = `
        <h2>${name || 'Your Name'}</h2>
        <div class="rp-contact">${[email, phone].filter(Boolean).join(' · ')}</div>
        ${summary ? `<h4>Summary</h4><div class="rp-line">${summary}</div>` : ''}
        ${skillList.length ? `<h4>Skills</h4><div class="rp-line">${skillList.join(' · ')}</div>` : ''}
        ${expLines.length ? `<h4>Experience</h4>${expLines.map(l => `<div class="rp-line">${l}</div>`).join('')}` : ''}
        ${eduLines.length ? `<h4>Education</h4>${eduLines.map(l => `<div class="rp-line">${l}</div>`).join('')}` : ''}
    `;
}

rbFields.forEach(f => f.addEventListener('input', renderResumePreview));

document.getElementById('rbPrintBtn').addEventListener('click', () => {
    if (!rbFields[0].value.trim()) {
        showToast('Add at least your name before printing.');
        return;
    }
    window.print();
});

// --- 2. RESUME SCORE CHECKER ---
const ACTION_VERBS = ['managed', 'led', 'built', 'designed', 'developed', 'implemented',
    'improved', 'created', 'achieved', 'launched', 'optimized', 'increased', 'reduced', 'delivered'];

function analyzeResume(resumeText, jobDescText) {
    const text = resumeText.toLowerCase();
    const words = text.split(/\s+/).filter(Boolean);
    const tips = [];
    let score = 0;

    // Length check (20 pts)
    if (words.length >= 250 && words.length <= 900) {
        score += 20;
    } else if (words.length < 250) {
        tips.push('Your resume looks short — aim for at least 250–300 words covering your experience.');
    } else {
        tips.push('Your resume looks long — trim it to the most relevant, recent experience.');
    }

    // Sections check (30 pts, 10 each)
    ['experience', 'education', 'skills'].forEach(section => {
        if (text.includes(section)) {
            score += 10;
        } else {
            tips.push(`Add a clear "${section[0].toUpperCase()}${section.slice(1)}" section — ATS systems look for these headers.`);
        }
    });

    // Contact info (10 pts)
    const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(resumeText);
    const hasPhone = /\d{7,}/.test(resumeText.replace(/[\s()-]/g, ''));
    if (hasEmail || hasPhone) {
        score += 10;
    } else {
        tips.push('Add an email or phone number so recruiters can reach you.');
    }

    // Action verbs (10 pts)
    const verbCount = ACTION_VERBS.filter(v => text.includes(v)).length;
    if (verbCount >= 3) {
        score += 10;
    } else {
        tips.push(`Use more action verbs (e.g. "led", "built", "improved") — found only ${verbCount}.`);
    }

    // Keyword match with job description (30 pts)
    if (jobDescText && jobDescText.trim().length > 20) {
        const jdWords = new Set(
            jobDescText.toLowerCase().match(/[a-z]{5,}/g) || []
        );
        const resumeWords = new Set(text.match(/[a-z]{5,}/g) || []);
        const overlap = [...jdWords].filter(w => resumeWords.has(w));
        const matchPct = jdWords.size ? overlap.length / jdWords.size : 0;
        score += Math.round(matchPct * 30);
        if (matchPct < 0.3) {
            tips.push('Low keyword overlap with the job description — mirror a few more terms it uses.');
        }
    } else {
        score += 15; // neutral partial credit when no JD given
        tips.push('Paste a job description too, to check keyword match against a specific role.');
    }

    return { score: Math.min(100, score), tips };
}

document.getElementById('rsCheckBtn').addEventListener('click', () => {
    const resumeText = document.getElementById('rsResumeText').value;
    const jobDescText = document.getElementById('rsJobDesc').value;
    const resultEl = document.getElementById('resumeScoreResult');

    if (!resumeText.trim() || resumeText.trim().split(/\s+/).length < 20) {
        showToast('Paste more of your resume text to get an accurate score.');
        return;
    }

    const { score, tips } = analyzeResume(resumeText, jobDescText);

    resultEl.innerHTML = `
        <div class="score-number">${score}/100</div>
        <div class="score-bar-track"><div class="score-bar-fill" style="width:${score}%"></div></div>
        <ul>${tips.map(t => `<li>${t}</li>`).join('')}</ul>
    `;
});

// --- 3. INTERVIEW PREP ---
const INTERVIEW_QUESTIONS = {
    behavioral: [
        { q: "Tell me about a time you handled conflict within a team.", tip: "Use the STAR method: Situation, Task, Action, Result." },
        { q: "Describe a challenge you overcame at work or in a project.", tip: "Focus on your specific actions, not just the team's." },
        { q: "Tell me about a time you failed. What did you learn?", tip: "Be honest — then pivot quickly to the lesson learned." },
        { q: "Describe a time you had to meet a tight deadline.", tip: "Mention how you prioritized tasks under pressure." },
        { q: "Tell me about a time you disagreed with your manager.", tip: "Show respect for hierarchy while explaining your reasoning." },
    ],
    technical: [
        { q: "How would you optimize a slow database query?", tip: "Mention indexing, query structure, and avoiding N+1 queries." },
        { q: "Explain the difference between REST and GraphQL.", tip: "Compare over-fetching/under-fetching and endpoint structure." },
        { q: "How do you approach debugging a production issue?", tip: "Walk through reproduce → isolate → fix → verify → monitor." },
        { q: "What's the difference between synchronous and asynchronous code?", tip: "Use a simple real-world analogy to explain blocking vs non-blocking." },
        { q: "How would you design a URL shortener?", tip: "Cover hashing, storage, and handling collisions at a high level." },
    ],
    hr: [
        { q: "Why do you want to work with us?", tip: "Reference something specific about the company, not generic praise." },
        { q: "What are your salary expectations?", tip: "Give a researched range, not a single fixed number." },
        { q: "Where do you see yourself in five years?", tip: "Tie your answer to growth within this type of role." },
        { q: "Why are you leaving your current job?", tip: "Stay positive — frame it around growth, not complaints." },
        { q: "Do you have any questions for us?", tip: "Always have 1-2 questions ready — it shows genuine interest." },
    ],
};

let currentQuestion = null;
let timerInterval = null;
let timeLeft = 60;

const interviewCard = document.getElementById('interviewCard');
const interviewTimerRow = document.getElementById('interviewTimerRow');
const timerDisplay = document.getElementById('timerDisplay');

document.getElementById('getQuestionBtn').addEventListener('click', () => {
    const category = document.getElementById('interviewCategory').value;
    const pool = INTERVIEW_QUESTIONS[category];
    currentQuestion = pool[Math.floor(Math.random() * pool.length)];

    clearInterval(timerInterval);
    timeLeft = 60;
    timerDisplay.textContent = '60s';
    interviewTimerRow.style.display = 'flex';
    interviewCard.innerHTML = `${currentQuestion.q}`;
});

document.getElementById('startTimerBtn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timeLeft = 60;
    timerDisplay.textContent = `${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showToast("Time's up! How did that feel?");
        }
    }, 1000);
});

document.getElementById('showTipBtn').addEventListener('click', () => {
    if (!currentQuestion) return;
    if (interviewCard.querySelector('.tip-text')) return;
    interviewCard.innerHTML += `<span class="tip-text">💡 ${currentQuestion.tip}</span>`;
});

// =========================================================
// SKILL GAP INSIGHTS
// =========================================================
const SKILLS_STORAGE_KEY = 'jobverse_user_skills';
const skillGapToggleBtn = document.getElementById('skillGapToggleBtn');
const skillGapPanel = document.getElementById('skillGapPanel');
const skillGapInput = document.getElementById('skillGapInput');
const skillGapResult = document.getElementById('skillGapResult');

// Prefill with whatever the user last entered, if anything.
try {
    const savedSkills = localStorage.getItem(SKILLS_STORAGE_KEY);
    if (savedSkills) skillGapInput.value = savedSkills;
} catch (err) { /* localStorage unavailable — skip silently */ }

skillGapToggleBtn.addEventListener('click', () => {
    skillGapPanel.classList.toggle('open');
    if (skillGapPanel.classList.contains('open')) {
        skillGapPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

document.getElementById('skillGapBtn').addEventListener('click', () => {
    const raw = skillGapInput.value.trim();
    if (!raw) {
        showToast('Enter at least one skill to analyze.');
        return;
    }

    try { localStorage.setItem(SKILLS_STORAGE_KEY, raw); } catch (err) { /* skip */ }

    const userSkills = new Set(raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean));

    // Tally how often each tag appears across today's live listings.
    const freq = new Map();
    JOBS.forEach(job => {
        job.tags.forEach(tag => {
            const key = tag.trim().toLowerCase();
            if (!key) return;
            freq.set(key, (freq.get(key) || 0) + 1);
        });
    });

    const totalJobs = JOBS.length || 1;
    const missing = [...freq.entries()]
        .filter(([skill]) => !userSkills.has(skill))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    if (missing.length === 0) {
        skillGapResult.innerHTML = `<p class="empty-state">Great coverage — your skills already match the top in-demand tags in today's listings.</p>`;
        return;
    }

    skillGapResult.innerHTML = missing.map(([skill, count]) => {
        const pct = Math.round((count / totalJobs) * 100);
        return `
            <div class="skill-gap-item">
                <span>${skill}</span>
                <div class="skill-gap-bar-track"><div class="skill-gap-bar-fill" style="width:${pct}%"></div></div>
                <span class="skill-gap-pct">${pct}%</span>
            </div>
        `;
    }).join('') + `<p class="tool-subtitle" style="margin-top:14px;">% = share of today's live listings mentioning that skill.</p>`;
});

// =========================================================
// ICON CATEGORIES — one-tap filter within the Blue-Collar page,
// no typing required (accessibility for low-literacy users).
// =========================================================
document.querySelectorAll('.icon-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.icon-cat-btn').forEach(b => b.classList.remove('active-cat'));
        btn.classList.add('active-cat');
        renderBlueCollarJobs(btn.getAttribute('data-keyword'));
    });
});

// =========================================================
// FEEDBACK — star rating + comment, stored in Firestore,
// visible to the admin alongside applications.
// =========================================================
const feedbackFab = document.getElementById('feedbackFab');
const feedbackModal = document.getElementById('feedbackModal');
const closeFeedbackModal = document.getElementById('closeFeedbackModal');
const feedbackStarPicker = document.getElementById('feedbackStarPicker');
const feedbackComment = document.getElementById('feedbackComment');
const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
let feedbackRating = 0;

feedbackFab.addEventListener('click', () => {
    if (!currentUser) {
        showToast('Log in to leave feedback.');
        openModal(false);
        return;
    }
    feedbackModal.classList.add('open');
});

closeFeedbackModal.addEventListener('click', () => feedbackModal.classList.remove('open'));
feedbackModal.addEventListener('click', (e) => {
    if (e.target === feedbackModal) feedbackModal.classList.remove('open');
});

function paintFeedbackStars(hoverValue) {
    const stars = feedbackStarPicker.querySelectorAll('.star');
    const value = hoverValue || feedbackRating;
    stars.forEach(star => {
        const v = Number(star.getAttribute('data-value'));
        star.classList.toggle('filled', v <= value);
        star.classList.toggle('empty', v > value);
    });
}

feedbackStarPicker.querySelectorAll('.star').forEach(star => {
    star.addEventListener('mouseenter', () => paintFeedbackStars(Number(star.getAttribute('data-value'))));
    star.addEventListener('click', () => {
        feedbackRating = Number(star.getAttribute('data-value'));
        paintFeedbackStars();
    });
});
feedbackStarPicker.addEventListener('mouseleave', () => paintFeedbackStars());

submitFeedbackBtn.addEventListener('click', async () => {
    if (!currentUser) {
        showToast('Log in to leave feedback.');
        return;
    }
    if (feedbackRating === 0) {
        showToast('Pick a star rating first.');
        return;
    }
    try {
        await db.collection('feedback').add({
            userEmail: currentUser.email,
            userName: currentUser.displayName || currentUser.email.split('@')[0],
            rating: feedbackRating,
            comment: feedbackComment.value.trim(),
            submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        showToast('Thanks for the feedback!');
        loadPublicFeedback();
        feedbackModal.classList.remove('open');
        feedbackRating = 0;
        feedbackComment.value = '';
        paintFeedbackStars();
    } catch (err) {
        showToast('Could not submit feedback — try again.');
        console.warn(err);
    }
});

async function loadFeedback() {
    const container = document.getElementById('feedbackList');
    if (!container) return;
    container.innerHTML = `<p class="empty-state">Loading feedback…</p>`;
    try {
        const snap = await db.collection('feedback').orderBy('submittedAt', 'desc').limit(100).get();
        if (snap.empty) {
            container.innerHTML = `<p class="empty-state">No feedback submitted yet.</p>`;
            return;
        }
        container.innerHTML = snap.docs.map(doc => {
            const d = doc.data();
            const when = d.submittedAt?.toDate ? d.submittedAt.toDate().toLocaleString() : 'Just now';
            const stars = '★'.repeat(d.rating) + '☆'.repeat(5 - d.rating);
            return `
                <div class="application-row">
                    <div class="app-applicant"><strong>${d.userName}</strong><span class="app-email">${d.userEmail}</span></div>
                    <div class="app-job">${stars}${d.comment ? ' — ' + d.comment : ''}</div>
                    <div class="app-time">${when}</div>
                </div>
            `;
        }).join('');
    } catch (err) {
        container.innerHTML = `<p class="empty-state">Could not load feedback — check Firestore rules.</p>`;
        console.warn(err);
    }
}

// =========================================================
// PUBLIC REVIEWS — real feedback shown to every visitor,
// above the footer (requires the Firestore rule to allow
// public reads on the feedback collection — see firebase-config.js)
// =========================================================
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

async function loadPublicFeedback() {
    const grid = document.getElementById('publicReviewsGrid');
    if (!grid) return;
    try {
        const snap = await db.collection('feedback').orderBy('submittedAt', 'desc').limit(6).get();
        if (snap.empty) {
            grid.innerHTML = `<p class="empty-state">No reviews yet — be the first to leave feedback!</p>`;
            return;
        }
        grid.innerHTML = snap.docs.map(doc => {
            const d = doc.data();
            const rating = d.rating || 0;
            const starsHtml = Array.from({ length: 5 }, (_, i) =>
                `<svg class="star ${i < rating ? 'filled' : 'empty'}"><use href="#star-icon"/></svg>`
            ).join('');
            return `
                <div class="testimonial-card">
                    <div class="star-rating" aria-label="${rating} out of 5 stars">${starsHtml}</div>
                    <p>"${escapeHtml(d.comment) || 'No comment provided.'}"</p>
                    <div class="testimonial-author">— ${escapeHtml(d.userName || 'Anonymous')}</div>
                </div>
            `;
        }).join('');
    } catch (err) {
        grid.innerHTML = `<p class="empty-state">Reviews are temporarily unavailable.</p>`;
        console.warn('Could not load public reviews:', err);
    }
}

loadPublicFeedback();
