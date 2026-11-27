// Verified research, engineering, and background data for Prashorst (Eric) Meas.
// All metrics, gene candidates, and project details are grounded directly in
// Prashorst's public records and local project repositories.

export const CANDIDATE_GENES = [
  {
    gene: 'RUNX2',
    priorPct: 99.93,
    humanPct: 99.97,
    convergence: 99.95,
    direction: 'pro-longevity',
    layers: 3,
    looSurvives: 4,
    trait: 'Youthful appearance (p = 2e-9, L2G 0.70); 6 GTEx tissues up with age',
    family: 'Runt-related transcription factors',
    featured: true,
  },
  {
    gene: 'FST',
    priorPct: 99.73,
    humanPct: 97.97,
    convergence: 98.84,
    direction: 'pro-longevity',
    layers: 2,
    looSurvives: 4,
    trait: 'Youthful appearance (p = 3e-12, L2G 0.62); 8 GTEx tissues up with age',
    family: 'Follistatin / TGF-beta signalling',
    featured: true,
  },
  {
    gene: 'SLIT2',
    priorPct: 97.40,
    humanPct: 99.62,
    convergence: 98.50,
    direction: 'pro-longevity',
    layers: 2,
    looSurvives: 4,
    trait: 'Metabolic frailty (p = 1e-9, L2G 0.64); high missense constraint (z = 3.12)',
    family: 'MicroRNA protein coding host genes',
    featured: true,
  },
  {
    gene: 'PIK3R2',
    priorPct: 98.62,
    humanPct: 98.37,
    convergence: 98.49,
    direction: 'pro-longevity',
    layers: 2,
    looSurvives: 4,
    trait: 'Epigenomic age signal (98.7th pct); high interactome degree',
    family: 'SH2 domain containing',
    featured: true,
  },
  {
    gene: 'PLPP3',
    priorPct: 98.88,
    humanPct: 98.04,
    convergence: 98.45,
    direction: 'uncertain',
    layers: 2,
    looSurvives: 3,
    trait: 'Multimorbidity frailty (p = 9e-9, L2G 0.72); strong pLI constraint (0.999)',
    family: 'Phospholipid phosphatases',
    featured: true,
  },
  {
    gene: 'VPS26B',
    priorPct: 98.71,
    humanPct: 98.11,
    convergence: 98.41,
    direction: 'anti-longevity',
    layers: 1,
    looSurvives: 4,
    trait: 'Metabolic frailty (p = 4e-10); 6 GTEx tissues down with age',
    family: 'Retromer complex subunit',
    featured: false,
  },
  {
    gene: 'ASL',
    priorPct: 98.32,
    humanPct: 97.68,
    convergence: 98.00,
    direction: 'uncertain',
    layers: 2,
    looSurvives: 3,
    trait: 'Plasma proteomics age z = 3.95; metabolic frailty GWAS signal',
    family: 'Carbon-nitrogen lyases',
    featured: false,
  },
  {
    gene: 'PER3',
    priorPct: 97.91,
    humanPct: 98.08,
    convergence: 98.00,
    direction: 'pro-longevity',
    layers: 1,
    looSurvives: 3,
    trait: 'Circadian regulator; DNAm damage CpG & EWAS age signal',
    family: 'Period circadian regulator family',
    featured: false,
  },
  {
    gene: 'ASPA',
    priorPct: 95.47,
    humanPct: 99.60,
    convergence: 97.51,
    direction: 'anti-longevity',
    layers: 2,
    looSurvives: 4,
    trait: 'DNA methylation PhenoAge acceleration (p = 3e-15)',
    family: 'Aspartoacylase',
    featured: false,
  },
  {
    gene: 'THRB',
    priorPct: 96.13,
    humanPct: 98.70,
    convergence: 97.41,
    direction: 'uncertain',
    layers: 2,
    looSurvives: 4,
    trait: 'Telomere length PC1 (p = 6e-14, L2G 0.86); strong pLI constraint (0.999)',
    family: 'Thyroid hormone receptors',
    featured: true,
  },
  {
    gene: 'HOXD3',
    priorPct: 94.80,
    humanPct: 99.88,
    convergence: 97.30,
    direction: 'pro-longevity',
    layers: 2,
    looSurvives: 4,
    trait: 'Multimorbidity frailty (p = 2e-10); 6 EWAS age CpGs across 4 studies',
    family: 'HOXL subclass homeoboxes',
    featured: false,
  },
  {
    gene: 'SOCS3',
    priorPct: 99.01,
    humanPct: 95.40,
    convergence: 97.19,
    direction: 'pro-longevity',
    layers: 2,
    looSurvives: 3,
    trait: 'Plasma proteomics age z = 10.13; 3 mortality CpG sites',
    family: 'Suppressors of cytokine signaling',
    featured: true,
  },
  {
    gene: 'NCALD',
    priorPct: 94.88,
    humanPct: 99.28,
    convergence: 97.05,
    direction: 'pro-longevity',
    layers: 1,
    looSurvives: 4,
    trait: 'Multimorbidity frailty (p = 5e-9, L2G 0.90); 5 GTEx tissues down with age',
    family: 'EF-hand domain containing',
    featured: true,
  },
];

export const PROJECTS = [
  {
    id: 'longevity-multiomics',
    title: 'Multi-Omics Integration for Human Longevity Genes',
    shortTitle: 'Longevity Multi-Omics',
    category: 'biology',
    categoryLabel: 'Computational Biology',
    year: '2026',
    repoUrl: 'https://github.com/prashorstmeas/longevity-multiomics',
    summary:
      'Genome-wide machine learning framework prioritising novel human longevity genes by uniting GWAS fine-mapping, GTEx transcriptomics, epigenomics, plasma proteomics, functional constraint, and protein interactome structure.',
    metrics: [
      { label: 'Gene-level CV', value: '0.77 ± 0.01 AUROC' },
      { label: 'Community Holdout', value: '0.71 ± 0.02 AUROC' },
      { label: 'Held-out GenAge', value: '0.81 AUROC' },
    ],
    tags: ['Python', 'Multi-Omics', 'Scikit-Learn', 'NetworkX', 'GWAS L2G', 'GTEx'],
    visualType: 'image',
    coverImage: 'assets/longevity-convergence.png',
    coverAlt: 'Scatter plot of convergent evidence for novel human longevity genes highlighting RUNX2, FIGN, ZFPM2, HIVEP3, NCALD, PLPP3, and HSD17B12',
    coverBg: 'light',
    figures: [
      {
        src: 'assets/longevity-convergence.png',
        title: 'Fig 5 — Convergent Novel Longevity Candidates',
        caption:
          'Conserved-mechanism prior percentile (x-axis) plotted against independent label-free human ageing multi-omics evidence (y-axis), both on a logit scale. Top 40 convergent candidates sit absent from GenAge, GenDR, CellAge, and LongevityMap.',
      },
      {
        src: 'assets/longevity-species.png',
        title: 'Fig 1 — Evolutionary Distance Gradient',
        caption:
          'Label-free human ageing-omics evidence aligns with model-organism longevity genes strictly in proportion to evolutionary proximity: mouse (0.578) > fly (0.566) > worm (0.517) > yeast (0.493).',
      },
    ],
    overview:
      'Anchored to experimentally manipulated longevity orthologues across yeast, worm, fly, and mouse (GenAge via Alliance orthology), this pipeline evaluates how strongly conserved biological priors and independent human ageing omics layers predict longevity relevance — and rigorously audits network leakage and cross-species transfer.',
    highlights: [
      'Achieves 0.77 ± 0.01 AUROC in gene-level cross-validation and maintains 0.71 ± 0.02 AUROC when entire interactome network communities are held out (vs 0.63 ± 0.02 for omics-only).',
      'Demonstrates an evolutionary distance gradient in label-free human ageing evidence: AUROC 0.578 (mouse) > 0.566 (fly) > 0.517 (worm) > 0.493 (yeast).',
      'Audits pro- vs anti-longevity direction transfer honestly: 0.75 within CV drops to 0.52 (95% CI 0.41–0.61) when transferring invertebrate labels to mouse, flagging direction calls as low-confidence hypotheses.',
      'Validates on held-out GenAge-human genes (never seen in training), enriching 5 genes in the top 500 versus 0.66 expected (AUROC 0.81); 22 of the top 100 leads survive every leave-one-layer-out drop.',
    ],
    dataTable: {
      caption: 'Selected top convergent novel human candidate genes (robust across multi-omics layers)',
      columns: ['Gene', 'Prior Pct', 'Human Evidence', 'Convergence', 'LOO Drops Survived'],
      rows: [
        ['RUNX2', '99.93%', '99.97%', '99.95%', '4 / 4'],
        ['FST', '99.73%', '97.97%', '98.84%', '4 / 4'],
        ['SLIT2', '97.40%', '99.62%', '98.50%', '4 / 4'],
        ['PIK3R2', '98.62%', '98.37%', '98.49%', '4 / 4'],
        ['PLPP3', '98.88%', '98.04%', '98.45%', '3 / 4'],
        ['THRB', '96.13%', '98.70%', '97.41%', '4 / 4'],
      ],
    },
  },
  {
    id: 'ageing-cohort',
    title: 'Ageing as Loss of Goal-Directedness: In Silico Cohort Study',
    shortTitle: 'In Silico Ageing Cohort',
    category: 'biology',
    categoryLabel: 'Computational Biology',
    year: '2026',
    repoUrl: 'https://github.com/prashorstmeas/ageing-cohort',
    summary:
      'Reproducible re-implementation and epidemiological audit of Pio-Lopez, Hartl & Levin (2025, Advanced Science), testing Neural Cellular Automata lineages across a randomised cohort of 1,440 virtual organisms.',
    metrics: [
      { label: 'Cohort Size', value: '1,440 organisms' },
      { label: 'Control Organ Loss', value: '0 / 180 (0.0%)' },
      { label: 'Log-Rank Test', value: 'p = 7.92e-126' },
    ],
    tags: ['Python', 'CMA-ES', 'Lifelines', 'Survival Analysis', 'Statsmodels', 'NCA'],
    visualType: 'image',
    coverImage: 'assets/ageing-trajectories.png',
    coverAlt: 'Whole-body fitness trajectories over 1500 lifespan steps across homeostatic, direct-encoding, and noise-naive lineages under perturbation and rejuvenation arms',
    coverBg: 'light',
    figures: [
      {
        src: 'assets/ageing-trajectories.png',
        title: 'Whole-Body Fitness Across Perturbation & Rejuvenation Arms',
        caption:
          'Mean and interquartile fitness trajectories over 1,500 lifespan steps across three independently evolved lineages (homeostatic, direct-encoding, noise-naive) and eight experimental arms.',
      },
      {
        src: 'assets/ageing-gallery.png',
        title: 'Anatomical Phenotype Gallery Over Lifespan (t = 0 to 1500)',
        caption:
          'Representative 16×16 Neural Cellular Automata phenotypes showing lifelong anatomical stability in controls versus lineage-dependent organ degradation under perturbation.',
      },
    ],
    overview:
      'Rebuilds the developmental morphogenesis simulation from scratch and treats it as a rigorous epidemiological cohort study rather than a qualitative demonstration — applying time-to-event survival curves, lineage-stratified Cox hazard models, confounding analysis, and per-cell active information storage tests.',
    highlights: [
      'Non-replication of spontaneous ageing: across 180 control organisms from three independently evolved lineages, 0 lost an eye or mouth over 1,500 steps (mean adult fitness 254.4 / 256).',
      'Damage — not loss of goal-directedness — drives organ loss: competency loss, gap-junction closure, and misdifferentiation noise each elevate eye-loss hazard by roughly an order of magnitude.',
      'Vulnerability depends on evolutionary history: gap-junction closure eliminates every eye in the homeostatic lineage (100%) yet none in the direct-encoding or noise-naive lineages (0%).',
      'Demonstrates classic epidemiological confounding: a naive observational estimate of cell-reset rejuvenation is biased by 5× due to lineage confounding; adjustment recovers the null and randomisation recovers the causal effect.',
    ],
    dataTable: {
      caption: 'Selected arms from the 1,440-organism in silico cohort (n = 60 per lineage × arm)',
      columns: ['Lineage & Arm', 'Eye Loss %', 'Median Survival', 'Mean Fitness'],
      rows: [
        ['Homeostatic · Control', '0.0%', '>1500 steps', '254.1 / 256'],
        ['Homeostatic · Gap-junction closure', '100.0%', '757 steps', '222.3 / 256'],
        ['Homeostatic · Misdifferentiation noise', '100.0%', '834 steps', '231.2 / 256'],
        ['Homeostatic · Reset wrong cells', '1.7%', '>1500 steps', '237.2 / 256'],
        ['Direct-encoding · Gap-junction closure', '0.0%', '>1500 steps', '255.4 / 256'],
        ['Noise-naive · Genetic damage', '43.3%', '>1500 steps', '233.9 / 256'],
      ],
    },
  },
  {
    id: 'vitae-human-lifecycle',
    title: 'VITAE — Human Biology Lifecycle Simulation',
    shortTitle: 'VITAE Lifecycle Sim',
    category: 'simulation',
    categoryLabel: 'Simulation & 3D',
    year: '2026',
    repoUrl: 'https://github.com/prashorstmeas',
    summary:
      'Interactive multi-scale physiological simulation spanning conception (1-cell zygote) through embryogenesis, puberty, peak adulthood, senescence, and mortality — paired with a Blender 5.0 procedural anatomy & Three.js PBR WebGL observatory.',
    metrics: [
      { label: 'Organ Systems', value: '7 coupled axes' },
      { label: '3D Pipeline', value: 'Blender 5.0 + glTF' },
      { label: 'Live Vitals', value: 'Lead-II ECG + Labs' },
    ],
    tags: ['Three.js', 'WebGL PBR', 'Blender bpy', 'NumPy', 'JavaScript', 'Physiology'],
    visualType: 'image',
    coverImage: 'assets/vitae-organs.png',
    coverAlt: 'Cycles render of VITAE procedural 3D internal organs showing translucent lungs, ribcage, heart, liver, kidneys, and vasculature',
    coverBg: 'dark',
    figures: [
      {
        src: 'assets/vitae-organs.png',
        title: 'Procedural 3D Thoracic & Abdominal Organ Systems',
        caption:
          'Cycles studio inspection render exported via automated Blender 5.0 (bpy) Metaballs, Voxel Remesh, and NURBS vasculature scripts.',
      },
      {
        src: 'assets/vitae-anatomy.png',
        title: 'Full-Body X-Ray Observatory Geometry',
        caption:
          'Coupled skeletal, neural, cardiovascular, respiratory, hepatic, and renal assets animated live in Three.js in sync with simulated BPM, respiration, and physiological reserve.',
      },
    ],
    overview:
      'VITAE models human biological trajectories across a full lifespan using deterministic seeded simulation (Mulberry32) coupled to an interactive 3D anatomical viewport. Prenatal mitotic cleavage, endocrine puberty transitions, cellular hallmarks of ageing, and stochastic clinical pathology all feed into real-time visual and clinical readouts.',
    highlights: [
      'Models cellular hallmarks of ageing including telomere attrition toward Hayflick threshold, DNAm epigenetic clock, senescent cell SASP inflammaging, mitochondrial ATP decline, autophagy, and somatic mutations.',
      'Couples 7 organ systems driving live clinical vitals (HR, BP, SpO2, RR, VO2 max, eGFR, HbA1c, BMR, and Lead-II ECG waveform) plus Gompertz-Makeham mortality and automated post-mortem reports.',
      'Automates 3D anatomical asset generation via Blender 5.0 Python scripts (build_human_assets.py, build_outer_organs.py), producing sex-differentiated XX/XY glTF 2.0 skin, outer organs, and internal organ meshes.',
      'Features a Three.js PBR viewport with ACESFilmic lighting, 6 Fitzpatrick phototypes, live skin cutaway transparency, biological skin ageing, hypoxia perfusion, and Skin / X-Ray / Organs / Skeleton views.',
    ],
  },
  {
    id: 'luca-primordium',
    title: 'LUCA: A Living Universe & Primordium',
    shortTitle: 'LUCA & Primordium',
    category: 'simulation',
    categoryLabel: 'Simulation & 3D',
    year: '2026',
    repoUrl: 'https://github.com/prashorstmeas/primordium',
    summary:
      'A five-epoch biology strategy game and deterministic hydrothermal-vent evolution engine — from mineral chemistry and protocells to living biospheres and interstellar dispersal — built in Godot 4.7, Canvas 2D, and Python.',
    metrics: [
      { label: 'Automated Checks', value: '1,120+ passing' },
      { label: 'Native Benchmark', value: '59.6 FPS avg' },
      { label: 'Determinism', value: 'Bit-exact parity' },
    ],
    tags: ['Godot 4.7', 'GDScript', 'Python', 'Canvas 2D', 'Evolutionary Sim'],
    visualType: 'image',
    coverImage: 'assets/luca-interstellar.png',
    coverAlt: 'LUCA A Living Universe Epoch 05 Interstellar Dispersal interface showing Pelagos homeworld, neighboring star systems, adaptations, and ecological controls',
    coverBg: 'dark',
    figures: [
      {
        src: 'assets/luca-interstellar.png',
        title: 'Epoch 05 — Interstellar Dispersal & Living Atlas',
        caption:
          'Turn-based five-epoch biology strategy interface spanning mineral chemistry, first cells, branching lineages, living biospheres, and interstellar seed arks.',
      },
      {
        src: 'assets/luca-ecosystem.png',
        title: 'Native Godot 4.7 — The Living Habitat (v0.4.1)',
        caption:
          '3D hydrothermal vent ecosystem displaying inherited colony morphology, visible adaptations (membranes, pumps, flagella, spines), rivals, grazers, mutualists, and nutrient plumes.',
      },
    ],
    overview:
      'Explores evolution by natural selection as playable systems engineering. In Primordium and LUCA, players shape selection pressure and ecological strategy rather than hand-editing genomes — backed by a strict deterministic reference model in Python ported bit-for-bit to native Godot 4.7.',
    highlights: [
      'Complete five-epoch campaign (mineral chemistry, first cells, branching life, living biosphere, interstellar dispersal) playable both natively in Godot 4.7.2 and in-browser on Canvas 2D.',
      'Bit-exact cross-language determinism contract: Python reference simulation generates golden state traces verified automatically against GDScript parity tests.',
      'Validated across 1,120+ automated checks covering 18 browser/native reference journeys, ecological dynamics, save-format restoration, and a 59.6 FPS RTX 4060 performance profile.',
      'Visualises inherited traits directly on 3D organisms — thicker membranes, cyan ion pumps, protective spines, beating flagella, cellular cooperation, and photosynthetic pigment.',
    ],
  },
  {
    id: 'aphasia-aid',
    title: 'Aphasia Aid — Local-First AAC & Speech Therapy PWA',
    shortTitle: 'Aphasia Aid',
    category: 'ai',
    categoryLabel: 'AI & Health Tech',
    year: '2026',
    repoUrl: 'https://github.com/prashorstmeas/aphasia-aid',
    summary:
      'Installable local-first progressive web application supporting people with aphasia and their clinicians — uniting picture communication boards, 5 adaptive speech exercises, on-device MediaPipe gesture/expression vision, and a Claude conversation companion.',
    metrics: [
      { label: 'Therapy Modes', value: '5 adaptive drills' },
      { label: 'Privacy Model', value: 'On-device Vision' },
      { label: 'Storage', value: 'IndexedDB / PWA' },
    ],
    tags: ['React 19', 'TypeScript', 'Claude SDK', 'MediaPipe', 'Dexie', 'Express 5'],
    visualType: 'aphasia-ui',
    overview:
      'Designed around real clinical realities of disfluent speech and accessibility: large unmistakable targets, zero login friction for patients, privacy-preserving on-device camera processing, and a PIN-protected therapist dashboard for longitudinal progress tracking.',
    highlights: [
      'Patient Mode features categorised AAC picture boards with sentence-strip speech synthesis plus five adaptively dealt exercises: Name the picture, Repeat the word, Finish the sentence, Yes or no comprehension, and word-coverage Read aloud.',
      'On-device MediaPipe Vision runs entirely in the browser: thumbs/palm gestures and head nods answer Yes/No/Stop, expression detection surfaces mood or pain prompts, and repeated mouth movement triggers listening — video never leaves the device.',
      'Claude-powered conversation companion conducts gentle role-play scenarios (ordering coffee, phoning a clinic) with short spoken replies, tappable word suggestions, and single-snapshot visual context.',
      'Therapist Mode (PIN-protected) tracks 7-day accuracy trends, hardest-item rankings, custom boards/sentences, conversation transcripts, and backwards-compatible JSON backup/restore.',
    ],
  },
  {
    id: 'pkm-llm-wiki',
    title: 'Personal Knowledge Management — LLM Wiki',
    shortTitle: 'LLM Wiki PKM',
    category: 'ai',
    categoryLabel: 'AI & Health Tech',
    year: '2026',
    repoUrl: 'https://github.com/prashorstmeas/Personal-Knowledge-Management',
    summary:
      'Local-first bidirectional-link knowledge base built over plain Obsidian-compatible Markdown files, pairing a React + Express editor with the LLM Wiki pattern for persistent agentic curation and cross-referencing.',
    metrics: [
      { label: 'Storage', value: 'Plain .md Vault' },
      { label: 'Linking', value: '[[Wiki]] Backlinks' },
      { label: 'Pattern', value: 'Ingest · Query · Lint' },
    ],
    tags: ['React 18', 'TypeScript', 'Vite', 'Express', 'Marked', 'Context Engineering'],
    visualType: 'pkm-ui',
    overview:
      'Explores tools for thought and persistent agentic memory without database lock-in. Humans curate immutable raw sources while AI agents maintain an interlinked wiki of concept syntheses, entity pages, a catalog index, and an append-only audit log.',
    highlights: [
      'Custom marked tokenizer parses [[Wiki-style]] and [[Target|custom label]] links with instant click-to-create pages and live backlink context snippets.',
      'Implements a three-operation LLM Wiki architecture (Ingest, Query, Lint) separating immutable raw sources (notes/raw/) from agent-maintained synthesis pages.',
      'Zero database lock-in: every note is a standard .md file where the filename is the title, making the folder simultaneously usable as an Obsidian vault.',
      'Synthesises foundational tools-for-thought literature — Memex, Zettelkasten, Folgezettel, Evergreen Notes, RAG failure modes, and Context Engineering.',
    ],
  },
];

export const DOMAINS = [
  {
    index: '01',
    title: 'Multi-Omics & Longevity Genomics',
    description:
      'Integrating GWAS fine-mapping, GTEx tissue transcriptomics, DNA methylation clocks, plasma proteomics, constraint scores, and protein interactomes with honest out-of-community validation.',
    tools: ['Python', 'Scikit-Learn', 'NetworkX', 'GWAS / L2G', 'GTEx', 'PyArrow'],
  },
  {
    index: '02',
    title: 'Mechanistic & Evolutionary Modelling',
    description:
      'Testing biological hypotheses through deterministic simulations, Neural Cellular Automata, survival epidemiology, and stochastic single-cell gene-expression inference.',
    tools: ['Julia', 'Pluto', 'CMA-ES', 'Lifelines', 'Statsmodels', 'R'],
  },
  {
    index: '03',
    title: 'Scientific Visualisation & 3D Systems',
    description:
      'Turning high-dimensional biological processes into clear interactive observatories — from publication figures and Manim multi-omics animation to Blender procedural anatomy and Godot 3D ecosystems.',
    tools: ['Manim', 'Blender bpy', 'Three.js', 'Godot 4.7', 'Matplotlib', 'Canvas 2D'],
  },
  {
    index: '04',
    title: 'Humane AI & Local-First Software',
    description:
      'Building calm, privacy-respecting applications where AI augments human agency — on-device computer vision, speech-therapy companions, and zero-lock-in knowledge vaults.',
    tools: ['TypeScript', 'React', 'Claude SDK', 'MediaPipe', 'IndexedDB', 'Node / Express'],
  },
];

export const TIMELINE = [
  {
    period: 'Present',
    organisation: 'Monash University',
    location: 'Melbourne, Victoria, Australia',
    role: 'Data Scientist & Bioinformatician',
    detail:
      'Advancing computational biology, longevity multi-omics integration, mechanistic simulation, and reproducible data science practices (including ETC5513 collaborative workflows).',
  },
  {
    period: '2026',
    organisation: 'Melbourne Integrative Genomics (MIG)',
    location: 'Melbourne, Australia',
    role: 'Biochemical Modelling & Single-Cell Inference Workshops',
    detail:
      'Hands-on scientific computing in Julia covering deterministic and stochastic chemical reaction networks, single-cell heterogeneity, maximum likelihood calibration, and parameter identifiability from scRNA-seq data.',
  },
  {
    period: 'Ongoing',
    organisation: 'Open Source, Writing & Melbourne AI Community',
    location: 'GitHub · Medium · Melbourne',
    role: 'Contributor & Technical Writer',
    detail:
      'Opened a pull request to 3b1b/manim contributing a comprehensive multi-omics visualisation module; writes on Medium about bioinformatics and collective intelligence; participates in Melbourne Machine Learning & AI meetups.',
  },
  {
    period: '2019',
    organisation: 'La Trobe University',
    location: 'Melbourne, Australia',
    role: 'Best Performing Student — BUS5PR1 (Analytics Project)',
    detail:
      'Recognised at the 2019 Analytics Celebration Night as top-performing student in the postgraduate analytics capstone subject, laying the analytical bridge into data science and bioinformatics.',
  },
  {
    period: '2016',
    organisation: 'CamEd Business School',
    location: 'Phnom Penh, Cambodia',
    role: 'Alumnus, Class of 2016',
    detail:
      'Built foundational analytical discipline in Phnom Penh before relocating to Melbourne to pursue postgraduate analytics, data science, and computational biology.',
  },
];

export const TECH_STACK = [
  {
    group: 'Languages',
    items: ['Python', 'R', 'Julia', 'TypeScript', 'JavaScript', 'GDScript', 'SQL / DuckDB'],
  },
  {
    group: 'Bioinformatics & ML',
    items: ['Scikit-Learn', 'SciPy', 'Statsmodels', 'Lifelines', 'NetworkX', 'CMA-ES', 'Pandas / PyArrow'],
  },
  {
    group: 'AI & Web Systems',
    items: ['React 19', 'Vite', 'Node.js / Express', 'Anthropic Claude SDK', 'MediaPipe Vision', 'Dexie / IndexedDB'],
  },
  {
    group: '3D & Scientific Graphics',
    items: ['Three.js WebGL', 'Blender 5.0 (bpy)', 'Godot 4.7', 'Matplotlib', 'Manim', 'Canvas 2D'],
  },
];
