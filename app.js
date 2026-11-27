import { CANDIDATE_GENES, PROJECTS, DOMAINS, TIMELINE, TECH_STACK } from './data.js';

// ==========================================================================
// Theme Toggle
// ==========================================================================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');

function applyTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeLabel.textContent = 'Archival Paper';
  } else {
    root.removeAttribute('data-theme');
    themeLabel.textContent = 'Observatory';
  }
  try {
    localStorage.setItem('pm-theme', theme);
  } catch (_) {}
  renderConvergencePlot();
}

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  applyTheme(isDark ? 'light' : 'dark');
});

if (root.getAttribute('data-theme') === 'dark') {
  themeLabel.textContent = 'Archival Paper';
}

// ==========================================================================
// Toast Notification & Email Copy
// ==========================================================================
const toast = document.getElementById('toast');
let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

document.querySelectorAll('.copy-email-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast(`Copied ${email} to clipboard`);
    } catch (_) {
      window.location.href = `mailto:${email}`;
    }
  });
});

// ==========================================================================
// Interactive Multi-Omics Convergence Observatory (Hero Canvas)
// ==========================================================================
const canvas = document.getElementById('convergenceCanvas');
const ctx = canvas.getContext('2d');
const geneChipsEl = document.getElementById('geneChips');
const geneReadoutEl = document.getElementById('geneReadout');
const canvasHintEl = document.getElementById('canvasHint');

let selectedGene = CANDIDATE_GENES[0];
let hoveredGene = null;

// Deterministic PRNG (Mulberry32) for ambient unlabelled & orthologue gene scatter
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(20261017);
const ambientGenes = Array.from({ length: 240 }, () => {
  const u = rng();
  const v = rng();
  const isOrthologue = rng() < 0.16;
  // Cluster naturally toward lower-left percentile space (matching Fig 5)
  const xNorm = Math.pow(u, 1.55) * 0.92;
  const yNorm = Math.pow(v, 1.5) * 0.92;
  return { xNorm, yNorm, isOrthologue, r: isOrthologue ? 2.5 : 1.7 };
});

function logitScale(pct) {
  const p = Math.min(Math.max(pct / 100, 0.5), 0.9998);
  const logit = Math.log(p / (1 - p));
  const minL = Math.log(0.5 / 0.5); // 0
  const maxL = Math.log(0.9998 / 0.0002); // ~8.517
  return (logit - minL) / (maxL - minL);
}

const PLOT_PAD = { left: 54, right: 24, top: 24, bottom: 42 };

function geneToXY(gene) {
  const w = canvas.width - PLOT_PAD.left - PLOT_PAD.right;
  const h = canvas.height - PLOT_PAD.top - PLOT_PAD.bottom;
  const x = PLOT_PAD.left + logitScale(gene.priorPct) * w;
  const y = PLOT_PAD.top + (1 - logitScale(gene.humanPct)) * h;
  return { x, y };
}

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function renderConvergencePlot() {
  const w = canvas.width;
  const h = canvas.height;
  const plotW = w - PLOT_PAD.left - PLOT_PAD.right;
  const plotH = h - PLOT_PAD.top - PLOT_PAD.bottom;
  const isDark = root.getAttribute('data-theme') === 'dark';

  const bg = getCssVar('--bg') || '#faf9f5';
  const border = getCssVar('--border') || '#e2ddd0';
  const textSoft = getCssVar('--text-soft') || '#6c797f';
  const textMain = getCssVar('--text') || '#141b1f';
  const accent = getCssVar('--accent') || '#cc4b24';
  const teal = getCssVar('--teal') || '#175c68';

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle convergence quadrant highlight (top-right >90th pct)
  const q90X = PLOT_PAD.left + logitScale(90) * plotW;
  const q90Y = PLOT_PAD.top + (1 - logitScale(90)) * plotH;
  ctx.fillStyle = isDark ? 'rgba(234, 106, 67, 0.06)' : 'rgba(204, 75, 36, 0.05)';
  ctx.fillRect(q90X, PLOT_PAD.top, PLOT_PAD.left + plotW - q90X, q90Y - PLOT_PAD.top);

  // Gridlines at 50th, 90th, 99th, 99.9th percentiles
  const ticks = [
    { pct: 50, label: '50th' },
    { pct: 90, label: '90th' },
    { pct: 99, label: '99th' },
    { pct: 99.9, label: '99.9th' },
  ];

  ctx.strokeStyle = border;
  ctx.lineWidth = 1;
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillStyle = textSoft;

  ticks.forEach((t) => {
    const nx = logitScale(t.pct);
    const px = PLOT_PAD.left + nx * plotW;
    const py = PLOT_PAD.top + (1 - nx) * plotH;

    // Vertical
    ctx.beginPath();
    ctx.moveTo(px, PLOT_PAD.top);
    ctx.lineTo(px, PLOT_PAD.top + plotH);
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillText(t.label, px, PLOT_PAD.top + plotH + 16);

    // Horizontal
    ctx.beginPath();
    ctx.moveTo(PLOT_PAD.left, py);
    ctx.lineTo(PLOT_PAD.left + plotW, py);
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(t.label, PLOT_PAD.left - 8, py + 3);
  });

  // Axis labels
  ctx.fillStyle = textSoft;
  ctx.font = '10.5px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'Conserved-mechanism prior percentile (logit scale)',
    PLOT_PAD.left + plotW / 2,
    h - 8
  );

  ctx.save();
  ctx.translate(14, PLOT_PAD.top + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Human ageing multi-omics evidence', 0, 0);
  ctx.restore();

  // Ambient unlabelled genes and GenAge orthologues
  ambientGenes.forEach((pt) => {
    const px = PLOT_PAD.left + pt.xNorm * plotW;
    const py = PLOT_PAD.top + (1 - pt.yNorm) * plotH;
    ctx.beginPath();
    ctx.arc(px, py, pt.r, 0, Math.PI * 2);
    if (pt.isOrthologue) {
      ctx.fillStyle = isDark ? 'rgba(108, 194, 178, 0.36)' : 'rgba(65, 134, 214, 0.35)';
    } else {
      ctx.fillStyle = isDark ? 'rgba(166, 180, 188, 0.16)' : 'rgba(108, 121, 127, 0.2)';
    }
    ctx.fill();
  });

  // Candidate longevity genes
  const active = hoveredGene || selectedGene;

  CANDIDATE_GENES.forEach((gene) => {
    const { x, y } = geneToXY(gene);
    const isActive = active && active.gene === gene.gene;

    if (isActive) {
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(234, 106, 67, 0.24)' : 'rgba(204, 75, 36, 0.18)';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(x, y, isActive ? 6 : 4.2, 0, Math.PI * 2);
    ctx.fillStyle = isActive ? accent : isDark ? '#e67e5d' : '#d65a34';
    ctx.fill();
    ctx.lineWidth = isActive ? 2 : 1;
    ctx.strokeStyle = isActive ? textMain : bg;
    ctx.stroke();

    if (isActive || gene.gene === 'RUNX2' || gene.gene === 'SLIT2' || gene.gene === 'SOCS3') {
      ctx.font = `${isActive ? '600 11px' : '500 10px'} "JetBrains Mono", monospace`;
      ctx.fillStyle = isActive ? textMain : textSoft;
      ctx.textAlign = x > w - 105 ? 'right' : 'left';
      const offsetX = x > w - 105 ? -10 : 10;
      const offsetY = y < PLOT_PAD.top + 18 ? 14 : -7;
      ctx.fillText(gene.gene, x + offsetX, y + offsetY);
    }
  });

  // Mini legend bottom-left inside plot
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillStyle = teal;
  ctx.fillText('● GenAge orthologues', PLOT_PAD.left + 8, PLOT_PAD.top + plotH - 22);
  ctx.fillStyle = accent;
  ctx.fillText('● Top novel candidates', PLOT_PAD.left + 8, PLOT_PAD.top + plotH - 8);
}

function updateGeneReadout(gene) {
  geneReadoutEl.innerHTML = `
    <div class="gene-readout-top">
      <span class="gene-readout-symbol">${gene.gene} <small style="font-weight:400;color:var(--text-soft)">· ${gene.family}</small></span>
      <span class="gene-readout-scores">Convergence ${gene.convergence.toFixed(2)}% · LOO ${gene.looSurvives}/4</span>
    </div>
    <p class="gene-readout-trait">${gene.trait}</p>
  `;

  geneChipsEl.querySelectorAll('.gene-chip').forEach((chip) => {
    chip.classList.toggle('is-active', chip.dataset.gene === gene.gene);
  });
}

function initGeneChips() {
  const featured = CANDIDATE_GENES.filter((g) => g.featured);
  geneChipsEl.innerHTML = featured
    .map(
      (g) => `
      <button type="button" class="gene-chip ${g.gene === selectedGene.gene ? 'is-active' : ''}" data-gene="${g.gene}">
        ${g.gene}
      </button>
    `
    )
    .join('');

  geneChipsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.gene-chip');
    if (!btn) return;
    const found = CANDIDATE_GENES.find((g) => g.gene === btn.dataset.gene);
    if (found) {
      selectedGene = found;
      hoveredGene = null;
      canvasHintEl.textContent = `Selected: ${found.gene}`;
      updateGeneReadout(found);
      renderConvergencePlot();
    }
  });
}

function getNearestGene(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const mx = (clientX - rect.left) * scaleX;
  const my = (clientY - rect.top) * scaleY;

  let nearest = null;
  let minDist = 24;
  for (const gene of CANDIDATE_GENES) {
    const { x, y } = geneToXY(gene);
    const d = Math.hypot(mx - x, my - y);
    if (d < minDist) {
      minDist = d;
      nearest = gene;
    }
  }
  return nearest;
}

canvas.addEventListener('mousemove', (e) => {
  const nearest = getNearestGene(e.clientX, e.clientY);
  if (nearest !== hoveredGene) {
    hoveredGene = nearest;
    if (nearest) {
      canvasHintEl.textContent = `${nearest.gene} (${nearest.convergence.toFixed(2)}%)`;
      updateGeneReadout(nearest);
    } else {
      canvasHintEl.textContent = 'Hover or select a candidate gene';
      updateGeneReadout(selectedGene);
    }
    renderConvergencePlot();
  }
});

canvas.addEventListener('mouseleave', () => {
  hoveredGene = null;
  canvasHintEl.textContent = 'Hover or select a candidate gene';
  updateGeneReadout(selectedGene);
  renderConvergencePlot();
});

canvas.addEventListener('click', (e) => {
  const nearest = getNearestGene(e.clientX, e.clientY);
  if (nearest) {
    selectedGene = nearest;
    updateGeneReadout(nearest);
    renderConvergencePlot();
  }
});

document.getElementById('openLongevityBtn').addEventListener('click', () => {
  openProjectModal('longevity-multiomics');
});

// ==========================================================================
// Render Projects Grid + Filter
// ==========================================================================
const projectsGrid = document.getElementById('projectsGrid');
let currentFilter = 'all';

function renderProjectVisual(project) {
  if (project.visualType === 'image') {
    const frameClass = project.coverBg === 'dark' ? 'is-dark-frame' : 'is-light-frame';
    return `
      <div class="project-visual ${frameClass}" data-open-modal="${project.id}">
        <img src="${project.coverImage}" alt="${project.coverAlt}" loading="lazy" />
      </div>
    `;
  }

  if (project.visualType === 'aphasia-ui') {
    return `
      <div class="project-visual" data-open-modal="${project.id}">
        <div class="mini-app-stage mini-aphasia" aria-hidden="true">
          <div class="mini-topbar">
            <span>APHASIA AID · PATIENT MODE</span>
            <span class="mini-pill">🔒 On-Device MediaPipe</span>
          </div>
          <div class="aphasia-tiles">
            <div class="aphasia-tile"><span>💧</span>Water</div>
            <div class="aphasia-tile"><span>☕</span>Coffee</div>
            <div class="aphasia-tile"><span>🤝</span>Help</div>
            <div class="aphasia-tile"><span>😊</span>Good</div>
          </div>
          <div class="aphasia-strip">
            <strong>“I would like water, please.”</strong>
            <div class="aphasia-badges">
              <span>👍 Yes</span>
              <span>✋ Stop</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="project-visual" data-open-modal="${project.id}">
      <div class="mini-app-stage mini-pkm" aria-hidden="true">
        <div class="mini-topbar">
          <span>PERSONAL KNOWLEDGE MANAGEMENT</span>
          <span class="mini-pill">LLM Wiki Vault</span>
        </div>
        <svg class="pkm-graph-svg" viewBox="0 0 420 155" fill="none">
          <line x1="86" y1="42" x2="210" y2="78" stroke="currentColor" stroke-opacity="0.28" stroke-width="1.5" />
          <line x1="86" y1="116" x2="210" y2="78" stroke="currentColor" stroke-opacity="0.28" stroke-width="1.5" />
          <line x1="334" y1="38" x2="210" y2="78" stroke="currentColor" stroke-opacity="0.28" stroke-width="1.5" />
          <line x1="334" y1="118" x2="210" y2="78" stroke="currentColor" stroke-opacity="0.28" stroke-width="1.5" />
          <line x1="334" y1="38" x2="334" y2="118" stroke="currentColor" stroke-opacity="0.18" stroke-dasharray="3 3" />

          <rect x="18" y="24" width="128" height="32" rx="7" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.22" />
          <text x="82" y="44" text-anchor="middle" fill="currentColor" font-family="JetBrains Mono, monospace" font-size="10.5">[[Zettelkasten]]</text>

          <rect x="18" y="100" width="128" height="32" rx="7" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.22" />
          <text x="82" y="120" text-anchor="middle" fill="currentColor" font-family="JetBrains Mono, monospace" font-size="10.5">[[Atomic Notes]]</text>

          <rect x="150" y="59" width="120" height="38" rx="9" fill="#cc4b24" />
          <text x="210" y="82" text-anchor="middle" fill="#ffffff" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">[[LLM Wiki]]</text>

          <rect x="272" y="22" width="136" height="32" rx="7" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.22" />
          <text x="340" y="42" text-anchor="middle" fill="currentColor" font-family="JetBrains Mono, monospace" font-size="10.5">[[Context Eng.]]</text>

          <rect x="272" y="102" width="136" height="32" rx="7" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.22" />
          <text x="340" y="122" text-anchor="middle" fill="currentColor" font-family="JetBrains Mono, monospace" font-size="10.5">notes/Index.md</text>
        </svg>
        <div class="pkm-footer">
          <span>notes/raw/ (immutable)</span>
          <span>Ingest · Query · Lint</span>
        </div>
      </div>
    </div>
  `;
}

function renderProjects(filter = 'all') {
  const visible =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  projectsGrid.innerHTML = visible
    .map(
      (project) => `
      <article class="project-card">
        ${renderProjectVisual(project)}
        <div class="project-body">
          <div class="project-meta">
            <span class="project-cat">${project.categoryLabel}</span>
            <span class="project-year">${project.year}</span>
          </div>
          <h3 class="project-title">
            <button type="button" data-open-modal="${project.id}">${project.title}</button>
          </h3>
          <p class="project-summary">${project.summary}</p>
          <div class="project-metrics">
            ${project.metrics
              .map(
                (m) => `
                <div class="metric-box">
                  <span>${m.label}</span>
                  <strong>${m.value}</strong>
                </div>
              `
              )
              .join('')}
          </div>
          <div class="tag-row">
            ${project.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="project-footer">
            <button type="button" class="case-study-btn" data-open-modal="${project.id}">
              Read case study <span aria-hidden="true">→</span>
            </button>
            <a
              class="repo-link"
              href="${project.repoUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </article>
    `
    )
    .join('');
}

document.querySelectorAll('.filter-pill').forEach((pill) => {
  pill.addEventListener('click', () => {
    currentFilter = pill.dataset.filter;
    document.querySelectorAll('.filter-pill').forEach((btn) => {
      const active = btn === pill;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    renderProjects(currentFilter);
  });
});

projectsGrid.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-open-modal]');
  if (trigger) {
    openProjectModal(trigger.dataset.openModal);
  }
});

// ==========================================================================
// Render Domains, Stack, and Timeline
// ==========================================================================
function renderDomainsAndStack() {
  document.getElementById('domainsGrid').innerHTML = DOMAINS.map(
    (d) => `
    <article class="domain-card">
      <span class="domain-index">${d.index}</span>
      <h3>${d.title}</h3>
      <p>${d.description}</p>
      <div class="tag-row" style="margin-bottom:0">
        ${d.tools.map((t) => `<span class="tag">${t}</span>`).join('')}
      </div>
    </article>
  `
  ).join('');

  document.getElementById('stackColumns').innerHTML = TECH_STACK.map(
    (group) => `
    <div class="stack-group">
      <h4>${group.group}</h4>
      <ul>
        ${group.items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `
  ).join('');
}

function renderTimeline() {
  document.getElementById('timelineList').innerHTML = TIMELINE.map(
    (item) => `
    <li class="timeline-item">
      <div class="timeline-top">
        <span class="timeline-period">${item.period}</span>
        <span class="timeline-loc">${item.location}</span>
      </div>
      <h3 class="timeline-org">${item.organisation}</h3>
      <p class="timeline-role">${item.role}</p>
      <p class="timeline-detail">${item.detail}</p>
    </li>
  `
  ).join('');
}

// ==========================================================================
// Case Study Modal
// ==========================================================================
const modalEl = document.getElementById('projectModal');
const modalCategoryEl = document.getElementById('modalCategory');
const modalBodyEl = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('modalCloseBtn');
let lastFocusedElement = null;

function openProjectModal(projectId) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return;

  lastFocusedElement = document.activeElement;
  modalCategoryEl.textContent = `${project.categoryLabel} · ${project.year}`;

  const figuresHtml =
    project.figures && project.figures.length
      ? `
      <div class="modal-figure-tabs" role="tablist">
        ${project.figures
          .map(
            (f, idx) => `
            <button type="button" class="fig-tab ${idx === 0 ? 'is-active' : ''}" data-fig-idx="${idx}">
              ${f.title}
            </button>
          `
          )
          .join('')}
      </div>
      <figure class="modal-figure-box ${project.coverBg === 'dark' ? 'is-dark' : ''}" style="margin:0 0 24px">
        <img id="modalFigureImg" src="${project.figures[0].src}" alt="${project.figures[0].title}" />
        <figcaption class="modal-figure-caption" id="modalFigureCaption">
          ${project.figures[0].caption}
        </figcaption>
      </figure>
    `
      : '';

  const tableHtml = project.dataTable
    ? `
      <div class="data-table-wrap">
        <table class="data-table">
          <caption>${project.dataTable.caption}</caption>
          <thead>
            <tr>
              ${project.dataTable.columns.map((c) => `<th>${c}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${project.dataTable.rows
              .map(
                (row) => `
                <tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>
              `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `
    : '';

  modalBodyEl.innerHTML = `
    <h2 class="modal-title" id="modalTitle">${project.title}</h2>
    <p class="modal-overview">${project.overview}</p>
    ${figuresHtml}
    <div class="project-metrics" style="margin-bottom:20px">
      ${project.metrics
        .map(
          (m) => `
          <div class="metric-box">
            <span>${m.label}</span>
            <strong>${m.value}</strong>
          </div>
        `
        )
        .join('')}
    </div>
    <h3 class="modal-section-heading">Key Findings &amp; Engineering Highlights</h3>
    <ul class="modal-highlights">
      ${project.highlights.map((h) => `<li>${h}</li>`).join('')}
    </ul>
    ${tableHtml}
    <div class="modal-actions">
      <div class="tag-row" style="margin-bottom:0">
        ${project.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
      </div>
      <a
        class="btn btn-primary"
        href="${project.repoUrl}"
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub <span aria-hidden="true">↗</span>
      </a>
    </div>
  `;

  if (project.figures && project.figures.length > 1) {
    modalBodyEl.querySelectorAll('.fig-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const idx = Number(tab.dataset.figIdx);
        const fig = project.figures[idx];
        document.getElementById('modalFigureImg').src = fig.src;
        document.getElementById('modalFigureImg').alt = fig.title;
        document.getElementById('modalFigureCaption').textContent = fig.caption;
        modalBodyEl.querySelectorAll('.fig-tab').forEach((t) => {
          t.classList.toggle('is-active', t === tab);
        });
      });
    });
  }

  modalEl.hidden = false;
  document.body.style.overflow = 'hidden';
  modalCloseBtn.focus();
}

function closeProjectModal() {
  modalEl.hidden = true;
  document.body.style.overflow = '';
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

modalCloseBtn.addEventListener('click', closeProjectModal);
modalEl.addEventListener('click', (e) => {
  if (e.target === modalEl) closeProjectModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalEl.hidden) {
    closeProjectModal();
  }
});

// ==========================================================================
// Navigation Scroll Spy
// ==========================================================================
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        navLinks.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === id));
      }
    });
  },
  { rootMargin: '-35% 0px -55% 0px' }
);

sections.forEach((sec) => observer.observe(sec));

// ==========================================================================
// Bootstrap
// ==========================================================================
initGeneChips();
updateGeneReadout(selectedGene);
renderConvergencePlot();
renderProjects('all');
renderDomainsAndStack();
renderTimeline();
