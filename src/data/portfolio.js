// Single source of truth for everything that gets rendered in Vidhi's Cafe.
// The 3D scene is data-driven: zones read from this file to populate the
// glassmorphism overlays so adding a project / city / plaque is a one-line edit.

export const NAV_ITEMS = [
  { id: 'about', number: '01', label: 'About Me' },
  { id: 'projects', number: '02', label: 'Projects' },
  { id: 'aiResearch', number: '03', label: 'AI Research' },
  { id: 'skills', number: '04', label: 'Skills' },
  { id: 'experience', number: '05', label: 'Experience' },
  { id: 'leadership', number: '06', label: 'Leadership' },
  { id: 'journey', number: '07', label: 'Journey' },
  { id: 'contact', number: '08', label: 'Contact' },
];

export const aboutMe = {
  name: 'Vaidehi Gupta',
  handle: "Vidhi's Cafe",
  tagline: 'Code. Create. Connect.',
  title: 'CS @ Georgia Tech · AI Research + Software Engineering',
  bio: "Computer Science student at Georgia Tech (B.S. expected May 2028) building reliable AI systems and full-stack products. Currently engineering medical-image classifiers in the Responsible AI VIP, coaching peers in CS 1332/3600 at the College of Computing, and getting ready to ship Snowflake + AWS healthcare AI features as a Software Engineering Intern at Elevance Health this summer.",
  identityChips: ['AI Researcher', 'Full-Stack Builder', 'Hackathon Winner', 'Lifelong Learner'],
  welcomeNote: 'Welcome to my portfolio!',
  speechBubble: [
    'Hey there!',
    'What can I get for you?',
    'Check the menu on the screen!',
  ],
};

export const education = {
  school: 'Georgia Institute of Technology (GT)',
  degree: 'B.S. in Computer Science',
  expected: 'Expected May 2028',
  specializations: 'Specializations: Intelligence, People',
  relevantCoursework: [
    'Data Structures & Algorithms',
    'Objects and Design',
    'Design & Analysis of Algorithms',
    'Introduction to Artificial Intelligence',
    'Intro to Perception & Robotics',
    'Statistics & Applications',
    'Computer Organization & Programming',
    'Machine Learning',
    'UI Design',
    'Research Methods',
    'Cognitive Science',
  ],
};

// Each experience has an `imageBase` slug → drop a matching file (jpg/png/etc)
// at `public/experience/<slug>.jpg` to use a real photo / logo on the wall.
// Missing files fall back to the painted accent panel.
export const experience = [
  {
    company: 'Elevance Health',
    title: 'Software Engineering Intern (Incoming)',
    dates: 'May 2026 – Aug 2026',
    imageBase: '/experience/elevance-health',
    description: [
      'Joining the Digital Platforms & AI Organization to build Snowflake + AWS-backed healthcare AI features.',
      'Will leverage GitHub Copilot, Windsurf, and Snowflake Cortex to ship production AI tooling at scale.',
    ],
  },
  {
    company: 'Responsible AI for Medical Image Analysis (VIP), Georgia Tech',
    title: 'Undergraduate Researcher',
    dates: 'Aug 2025 – Present',
    imageBase: '/experience/gt-vip-medical-ai',
    description: [
      'Engineered high-performing PyTorch classifier with EfficientNet-B1 on 6k+ images, architecting data pipelines to detect edge-case anomalies and resolve severe class imbalances.',
      'Optimized model reliability by conducting systematic failure-mode analysis (AUC-ROC / F1), defining the product roadmap for future backend refinements.',
      'Collaborated with research stakeholders to align model outputs (92% recall) with rigorous, high-stakes medical reliability standards.',
    ],
  },
  {
    company: 'College of Computing, Georgia Tech',
    title: 'HELP Session Leader & Peer Coach',
    dates: 'Aug 2025 – Present',
    imageBase: '/experience/gt-coc-help-session',
    description: [
      'Instructed technical workshops for CS 1332/3600, clarifying complex DSA and AI concepts for students.',
      'Leading the SWARM structured student success initiative — weekly progress analytics in Excel and 1-on-1 data-driven coaching.',
    ],
  },
  {
    company: 'Blue AI Labs (Remote)',
    title: 'Machine Learning Consultant',
    dates: 'Jul 2025 – Aug 2025',
    imageBase: '/experience/blue-ai-labs',
    description: [
      'Spearheaded a three-phase AI product strategy, translating complex ML models into technical specifications for 9 distinct AI features.',
      'Balanced feasibility and user-friction trade-offs to align engineering scope with product priorities.',
    ],
  },
  {
    company: 'theCoderSchool, Johns Creek, GA',
    title: 'Code Coach',
    dates: 'Mar 2023 – Jul 2024',
    imageBase: '/experience/the-coder-school',
    description: [
      'Mentored 10+ K-12 students in Python software development, promoting clean code practices and systematic debugging techniques.',
    ],
  },
];

export const skills = [
  { category: 'Languages', items: ['Python', 'Java', 'SQL', 'C', 'JavaScript', 'HTML/CSS'] },
  {
    category: 'AI Coding Tools',
    items: ['Gemini', 'Cursor', 'GitHub Copilot', 'Claude Code', 'OpenAI API', 'Snowflake Cortex'],
  },
  {
    category: 'AI / ML Frameworks',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV'],
  },
  {
    category: 'Cloud & Infrastructure',
    items: ['Microsoft Azure', 'AWS'],
  },
  {
    category: 'Tools & Web',
    items: ['Jupyter', 'Streamlit', 'Git', 'SQLite', 'Jira', 'Django', 'Flask', 'React', 'Next.js'],
  },
];

export const projects = [
  {
    title: 'Quick Payment Pages — Waystar Hack the SDLC',
    description:
      '3rd Place ($1,000) at Waystar Hack the SDLC 8-Hour Hackathon. Full-stack payment platform built with Next.js, Supabase (PostgreSQL + Auth), and Stripe Elements, deployed on Vercel. Delivered a WCAG 2.1 AA-compliant checkout (keyboard nav, aria bindings, semantic forms) and a Stripe + Supabase insights engine surfacing payer drop-off diagnostics in the admin dashboard.',
    link: 'https://devpost.com/software/quick-payment-pages',
    tags: ['Next.js', 'Supabase', 'Stripe', 'Vercel', 'A11y'],
  },
  {
    title: 'Sentra — Multimodal System Architecture',
    description:
      'Led a zero-to-one multimodal pipeline in a 36-hour sprint: Gemini, ElevenLabs TTS, and Wav2Lip lip-sync wired together with CedarOS. Built a FastAPI backend routing image → speech → lip-synced video with prompt-engineered character personas, and a React frontend delivering real-time, voice-synced conversational art experiences.',
    link: 'https://github.gatech.edu/tparida3/Sentra.git',
    tags: ['FastAPI', 'Gemini', 'ElevenLabs', 'Wav2Lip', 'React'],
  },
  {
    title: 'MemoryMap — RESTful Backend & LLM Integration',
    description:
      'Designed and implemented a RESTful Django backend with secure user auth and relational storage for location data. Integrated the Google Gemini API via service-oriented architecture, optimizing prompt-handling logic for efficient spatial data retrieval. Served as Technical Lead within an Agile framework, orchestrating sprint planning and technical documentation in Jira.',
    link: 'https://github.com/yashilaramesh/MemoryMap',
    tags: ['Django', 'Gemini API', 'REST', 'Agile'],
  },
  {
    title: 'VR State Analysis — Biometric Pipeline',
    description:
      'Achieved 1.72 BPM MAE training a TensorFlow/Keras biometric regression model on high-frequency VR sensor data. Engineered a deep learning pipeline for predictive heart-rate and identity classification across 30k+ data points, reducing prediction variance through systematic failure-mode analysis benchmarked via AUC-ROC and F1.',
    link: 'https://docs.google.com/presentation/d/11tZQ2ZXOaQ41iqt3E1742TsErcq7jBCISkzSLTtwXX4/edit?usp=sharing',
    tags: ['TensorFlow', 'Keras', 'Biometrics', 'VR'],
  },
];

// Each leadership entry has an `imageBase` slug → drop a matching file at
// `public/leadership/<slug>.jpg` to use a real photo / logo on the wall.
// Missing files fall back to the painted accent panel.
export const leadership = [
  {
    title: 'Director of External Affairs',
    org: 'Data Science @ GT',
    imageBase: '/leadership/data-science-gt',
    blurb:
      'Managed stakeholder relationships and cross-functional coordination to secure resources for club operations. Drove the $90k Hacklytics funding goal by forging strategic partnerships with corporate sponsors.',
    accent: 'from-purple-500/30 to-indigo-500/10',
  },
  {
    title: 'Finance Officer',
    org: 'GT Nazaaqat Dance Team',
    imageBase: '/leadership/gt-nazaaqat',
    blurb:
      'Managing a $2k+ budget across performances and travel — optimizing resource allocation for events and leading fundraising initiatives.',
    accent: 'from-fuchsia-500/30 to-purple-500/10',
  },
  {
    title: 'Hackathon Winner',
    org: 'Waystar Hack the SDLC — 3rd Place',
    imageBase: '/leadership/waystar-hackathon',
    blurb:
      'Built a full-stack, WCAG-compliant payment platform with Stripe + Supabase + Next.js in 8 hours alongside teammates — earned a $1,000 prize.',
    accent: 'from-amber-500/25 to-purple-500/10',
  },
];

// 34 cities/islands — initialized as placeholders, ordered loosely west → east.
// `coords` are normalized to the wall-map plane: { x: 0..1, y: 0..1 } where
// (0,0) is the bottom-left corner of the map and (1,1) the top-right.
//
// Each pin auto-binds to a photo at `/travel/<Name>.jpg` (or .png) — drop a
// file like `Paris.jpg` into `public/travel/` and it shows up on the polaroid.
// Missing files fall back gracefully to the painted polaroid color.
const _pins = [
  { id: 'sf', name: 'San Francisco', country: 'USA', coords: { x: 0.12, y: 0.66 } },
  { id: 'la', name: 'Los Angeles', country: 'USA', coords: { x: 0.14, y: 0.6 } },
  { id: 'lasvegas', name: 'Las Vegas', country: 'USA', coords: { x: 0.16, y: 0.62 } },
  { id: 'denver', name: 'Denver', country: 'USA', coords: { x: 0.2, y: 0.65 } },
  { id: 'chicago', name: 'Chicago', country: 'USA', coords: { x: 0.27, y: 0.67 } },
  { id: 'atlanta', name: 'Atlanta', country: 'USA', coords: { x: 0.28, y: 0.58 } },
  { id: 'orlando', name: 'Orlando', country: 'USA', coords: { x: 0.3, y: 0.52 } },
  { id: 'nyc', name: 'New York City', country: 'USA', coords: { x: 0.32, y: 0.66 } },
  { id: 'boston', name: 'Boston', country: 'USA', coords: { x: 0.34, y: 0.7 } },
  { id: 'toronto', name: 'Toronto', country: 'Canada', coords: { x: 0.3, y: 0.72 } },
  { id: 'mexico', name: 'Mexico City', country: 'Mexico', coords: { x: 0.22, y: 0.46 } },
  { id: 'cancun', name: 'Cancún', country: 'Mexico', coords: { x: 0.27, y: 0.48 } },
  { id: 'bahamas', name: 'Nassau', country: 'Bahamas', coords: { x: 0.32, y: 0.5 } },
  { id: 'iceland', name: 'Reykjavík', country: 'Iceland', coords: { x: 0.45, y: 0.86 } },
  { id: 'london', name: 'London', country: 'UK', coords: { x: 0.5, y: 0.78 } },
  { id: 'paris', name: 'Paris', country: 'France', coords: { x: 0.52, y: 0.74 } },
  { id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', coords: { x: 0.53, y: 0.78 } },
  { id: 'rome', name: 'Rome', country: 'Italy', coords: { x: 0.55, y: 0.66 } },
  { id: 'venice', name: 'Venice', country: 'Italy', coords: { x: 0.55, y: 0.7 } },
  { id: 'santorini', name: 'Santorini', country: 'Greece', coords: { x: 0.58, y: 0.62 } },
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey', coords: { x: 0.61, y: 0.66 } },
  { id: 'dubai', name: 'Dubai', country: 'UAE', coords: { x: 0.66, y: 0.5 } },
  { id: 'delhi', name: 'Delhi', country: 'India', coords: { x: 0.72, y: 0.55 } },
  { id: 'agra', name: 'Agra', country: 'India', coords: { x: 0.73, y: 0.54 } },
  { id: 'jaipur', name: 'Jaipur', country: 'India', coords: { x: 0.71, y: 0.53 } },
  { id: 'mumbai', name: 'Mumbai', country: 'India', coords: { x: 0.72, y: 0.48 } },
  { id: 'goa', name: 'Goa', country: 'India', coords: { x: 0.72, y: 0.44 } },
  { id: 'kerala', name: 'Kerala', country: 'India', coords: { x: 0.74, y: 0.4 } },
  { id: 'bali', name: 'Bali', country: 'Indonesia', coords: { x: 0.86, y: 0.3 } },
  { id: 'phuket', name: 'Phuket', country: 'Thailand', coords: { x: 0.82, y: 0.4 } },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', coords: { x: 0.84, y: 0.36 } },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', coords: { x: 0.92, y: 0.62 } },
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', coords: { x: 0.91, y: 0.6 } },
  { id: 'sydney', name: 'Sydney', country: 'Australia', coords: { x: 0.93, y: 0.18 } },
];

// File-name slug — preserves diacritics on disk would be a hassle, so we strip
// to ASCII and replace spaces with `_`. e.g. "New York City" → "New_York_City".
const _toFileSlug = (name) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');

// We list candidate extensions; the polaroid loader tries each in order.
export const travelImageExts = ['jpg', 'jpeg', 'png', 'webp'];

export const travelPins = _pins.map((p) => ({
  ...p,
  imageBase: `/travel/${_toFileSlug(p.name)}`,
}));

export const aiResearch = {
  headline: 'Responsible AI for Medical Imaging',
  lab: 'Vertically Integrated Project (VIP) — Georgia Tech',
  role: 'Undergraduate Researcher · Aug 2025 – Present',
  summary:
    'Building reliable medical-image classifiers on real-world data with severe class imbalance, with a focus on edge-case anomaly detection, failure-mode analysis, and aligning model behavior with clinician-grade reliability standards.',
  highlights: [
    {
      title: 'EfficientNet-B1 on 6k+ images',
      detail:
        'Engineered a high-performing PyTorch classifier with custom data pipelines that detect edge-case anomalies and resolve severe class imbalances.',
    },
    {
      title: 'Failure-mode analysis',
      detail:
        'Drove model reliability via systematic AUC-ROC / F1 sweeps — defining the product roadmap for future backend refinements.',
    },
    {
      title: 'Clinical-grade recall',
      detail:
        'Aligned model outputs with rigorous, high-stakes medical reliability standards alongside research stakeholders — achieved 92% recall.',
    },
  ],
  interests: [
    'Trustworthy ML',
    'Medical Imaging',
    'Agentic AI',
    'Calibration',
    'Human-in-the-loop',
  ],
  reading: [
    'On the calibration of modern neural networks (Guo et al.)',
    "Don't blame the annotator (Northcutt et al.)",
    'Towards Trustworthy AI in Healthcare (FDA whitepaper)',
  ],
};

// Walkable obstacles — every fixed prop the walking customers must dodge.
// Each entry is a circle in the floor plane. Customer.jsx reads this list
// every frame and pushes the walker out of any circle it intersects, so the
// looping characters can never clip through tables/counter/equipment.
export const walkObstacles = [
  // Main barista counter (U-shape) — wrap the whole footprint with one
  // generous circle so the walker stays clear of the bar.
  { cx: 0, cz: -1.3, r: 4.5 },

  // Left-wall persona table & food table cluster.
  { cx: -12.5, cz: 1.0, r: 2.4 },
  { cx: -15.0, cz: 4.5, r: 2.0 },

  // Awards case in front of the right wall.
  { cx: 6.8, cz: 3.4, r: 1.4 },

  // Music corner (piano + flute stand) in the back-right.
  { cx: 16.0, cz: -8.5, r: 2.6 },

  // TV-watching cluster (standing crowd) — keep walkers from cutting through.
  { cx: 15.0, cz: -1.3, r: 2.6 },

  // 2-top tables.
  { cx: 15.0, cz: 5.0, r: 1.6 },
  { cx: 15.0, cz: 10.5, r: 1.6 },
  { cx: -14.5, cz: 11.0, r: 1.6 },
  { cx: 11.0, cz: -5.5, r: 1.6 },

  // 4-top tables (bigger radius).
  { cx: -7.5, cz: 7.5, r: 2.1 },
  { cx: 9.5, cz: 6.5, r: 2.1 },
  { cx: -2.5, cz: 9.5, r: 2.1 },

  // Back-left bookshelf footprint (against the wall).
  { cx: -19.0, cz: -7.0, r: 1.6 },
];

// Stage marks for the few customers that *walk around* the cafe floor.
// Seated customers + clickable drinks are configured in `customerTables`.
// `watcher` customers stand in place facing the Performances TV on the right
// wall (facing=1 ⇒ rotation.y = +π/2 → faces +X).
//
// Each `loop` walker traces an ellipse (center cx,cz, radii rx,rz). The
// ellipses below were hand-picked to fit the AISLES between props — and the
// per-frame obstacle-pushback in Customer.jsx guarantees no overlap even if
// the path edges brush against a piece of furniture.
export const customers = [
  {
    id: 'walker-1',
    kind: 'loop',
    palette: { body: '#3a4f80', accent: '#1f3360', skin: '#c69876', hair: '#1a0e08' },
    speed: 0.28,
    offset: 0.0,
    // Front-center aisle, well clear of the counter (z>0.8) and the row of
    // 4-top tables further back (z>5.5).
    radius: { rx: 2.6, rz: 1.0, cx: 1.5, cz: 3.6 },
  },
  {
    id: 'walker-2',
    kind: 'loop',
    palette: { body: '#7b3a55', accent: '#4a1f30', skin: '#a06947', hair: '#3a1a08' },
    speed: 0.24,
    offset: 2.2,
    // Right-side aisle between the awards case (x≈6.8, z≈3.4) and the
    // standing TV crowd (x≈15, z≈-1).
    radius: { rx: 1.6, rz: 1.4, cx: 9.0, cz: 1.2 },
  },
  {
    id: 'walker-3',
    kind: 'loop',
    palette: { body: '#4a6e3a', accent: '#2a4520', skin: '#c69876', hair: '#1a0e08' },
    speed: 0.32,
    offset: 4.4,
    // Back aisle behind the U-counter, between the counter wings and the
    // back-left bookshelf / wall.
    radius: { rx: 2.6, rz: 1.2, cx: -4.0, cz: -6.2 },
  },
  // Watchers — gathered in front of the right-wall Performances TV (TV center
  // at z ~ -0.3). The two TV-front cafe tables sit at z=1.8 and z=8.5, so we
  // pack the standing crowd into the z<0.5 zone to keep things uncluttered.
  {
    id: 'tv-watcher-1',
    kind: 'watcher',
    palette: { body: '#3a4f80', accent: '#1f3360', skin: '#c69876', hair: '#1a0e08' },
    speed: 1.0,
    offset: 0.0,
    position: [15.4, 0, -3.1],
    facing: 1,
    height: 1.75,
  },
  {
    id: 'tv-watcher-2',
    kind: 'watcher',
    palette: { body: '#a4632a', accent: '#5b3a26', skin: '#a06947', hair: '#3a1a08' },
    speed: 1.0,
    offset: 1.4,
    position: [14.4, 0, -2.0],
    facing: 1,
    height: 1.65,
  },
  {
    id: 'tv-watcher-3',
    kind: 'watcher',
    palette: { body: '#5b3a90', accent: '#3a1f5a', skin: '#c69876', hair: '#1a0e08' },
    speed: 1.0,
    offset: 2.6,
    position: [15.6, 0, -1.4],
    facing: 1,
    height: 1.8,
  },
  {
    id: 'tv-watcher-4',
    kind: 'watcher',
    palette: { body: '#7b3a55', accent: '#4a1f30', skin: '#c69876', hair: '#1a0e08' },
    speed: 1.0,
    offset: 4.0,
    position: [14.4, 0, -0.5],
    facing: 1,
    height: 1.55,
  },
  {
    id: 'tv-watcher-5',
    kind: 'watcher',
    palette: { body: '#3a8f7d', accent: '#1f5046', skin: '#a06947', hair: '#1a0e08' },
    speed: 1.0,
    offset: 5.2,
    position: [15.7, 0, 0.4],
    facing: 1,
    height: 1.7,
  },
];

// Tables in peripheral areas — kept clear of the main counter approach.
// `size` defaults to 'sm' (radius 0.7, offset 0.85). Set to 'lg' for a 4-top
// round table — radius 1.0 with chairs at offset 1.15. The TV-area tables
// were pushed FURTHER from the cheering watchers (z grew) so the standing
// crowd has breathing room.
export const customerTables = [
  {
    id: 'tv-front-1',
    position: [15.0, 0, 5.0],
    rotation: -Math.PI / 2,
    facingTV: true,
    seats: [
      {
        side: 'left',
        facingYaw: Math.PI / 2,
        palette: { body: '#c9a23a', accent: '#7a5f1f', skin: '#c69876', hair: '#1a0e08' },
        height: 1.55,
      },
      {
        side: 'right',
        facingYaw: -Math.PI / 2,
        palette: { body: '#3a8f7d', accent: '#1f5046', skin: '#a06947', hair: '#1a0e08' },
        height: 1.6,
      },
    ],
    drinkIds: ['iced-caramel', 'matcha'],
  },
  {
    id: 'tv-front-2',
    position: [15.0, 0, 10.5],
    rotation: -Math.PI / 2,
    facingTV: true,
    seats: [
      {
        side: 'left',
        facingYaw: Math.PI / 2,
        palette: { body: '#5b3a90', accent: '#3a1f5a', skin: '#a06947', hair: '#1a0e08' },
        height: 1.65,
      },
      {
        side: 'right',
        facingYaw: -Math.PI / 2,
        palette: { body: '#6b3a55', accent: '#3a1f30', skin: '#c69876', hair: '#1a0e08' },
        height: 1.58,
      },
    ],
    drinkIds: ['cold-brew', 'chai'],
  },
  {
    id: 'rear-left-corner',
    position: [-14.5, 0, 11.0],
    rotation: 0,
    facingTV: false,
    seats: [
      {
        side: 'far',
        facingYaw: 0,
        palette: { body: '#a4632a', accent: '#5b3a26', skin: '#c69876', hair: '#1a0e08' },
        height: 1.6,
      },
      {
        side: 'near',
        facingYaw: Math.PI,
        palette: { body: '#6b3a55', accent: '#3a1f30', skin: '#a06947', hair: '#1a0e08' },
        height: 1.55,
      },
    ],
    drinkIds: ['mocha', 'matcha'],
  },
  {
    id: 'rear-right-mid',
    position: [11.0, 0, -5.5],
    rotation: Math.PI / 5,
    facingTV: false,
    seats: [
      {
        side: 'far',
        facingYaw: 0,
        palette: { body: '#3a4f80', accent: '#1f3360', skin: '#c69876', hair: '#3a1a08' },
        height: 1.6,
      },
      {
        side: 'near',
        facingYaw: Math.PI,
        palette: { body: '#7b3a55', accent: '#4a1f30', skin: '#a06947', hair: '#1a0e08' },
        height: 1.58,
      },
    ],
    drinkIds: ['chai', 'iced-caramel'],
  },

  // === 4-TOP TABLES === bigger round tables with characters on every side.
  {
    id: 'four-top-left-front',
    position: [-7.5, 0, 7.5],
    rotation: 0.18,
    size: 'lg',
    facingTV: false,
    seats: [
      {
        side: 'far',
        facingYaw: 0,
        palette: { body: '#3a4f80', accent: '#1f3360', skin: '#c69876', hair: '#1a0e08' },
        height: 1.62,
      },
      {
        side: 'near',
        facingYaw: Math.PI,
        palette: { body: '#a4632a', accent: '#5b3a26', skin: '#a06947', hair: '#1a0e08' },
        height: 1.55,
      },
      {
        side: 'left',
        facingYaw: Math.PI / 2,
        palette: { body: '#5b3a90', accent: '#3a1f5a', skin: '#c69876', hair: '#1a0e08' },
        height: 1.7,
      },
      {
        side: 'right',
        facingYaw: -Math.PI / 2,
        palette: { body: '#3a8f7d', accent: '#1f5046', skin: '#a06947', hair: '#3a1a08' },
        height: 1.58,
      },
    ],
    drinkIds: ['cold-brew', 'mocha', 'chai', 'iced-caramel'],
  },
  {
    id: 'four-top-right-mid',
    position: [9.5, 0, 6.5],
    rotation: -0.32,
    size: 'lg',
    facingTV: false,
    seats: [
      {
        side: 'far',
        facingYaw: 0,
        palette: { body: '#7b3a55', accent: '#4a1f30', skin: '#a06947', hair: '#1a0e08' },
        height: 1.6,
      },
      {
        side: 'near',
        facingYaw: Math.PI,
        palette: { body: '#c9a23a', accent: '#7a5f1f', skin: '#c69876', hair: '#1a0e08' },
        height: 1.58,
      },
      {
        side: 'left',
        facingYaw: Math.PI / 2,
        palette: { body: '#4a6e3a', accent: '#2a4520', skin: '#c69876', hair: '#3a1a08' },
        height: 1.65,
      },
      {
        side: 'right',
        facingYaw: -Math.PI / 2,
        palette: { body: '#3a4f80', accent: '#1f3360', skin: '#a06947', hair: '#1a0e08' },
        height: 1.55,
      },
    ],
    drinkIds: ['matcha', 'mocha', 'iced-caramel', 'chai'],
  },
  {
    id: 'four-top-center-front',
    position: [-2.5, 0, 9.5],
    rotation: 0.05,
    size: 'lg',
    facingTV: false,
    seats: [
      {
        side: 'far',
        facingYaw: 0,
        palette: { body: '#5b3a90', accent: '#3a1f5a', skin: '#c69876', hair: '#1a0e08' },
        height: 1.62,
      },
      {
        side: 'near',
        facingYaw: Math.PI,
        palette: { body: '#7b3a55', accent: '#4a1f30', skin: '#a06947', hair: '#1a0e08' },
        height: 1.65,
      },
      {
        side: 'left',
        facingYaw: Math.PI / 2,
        palette: { body: '#a4632a', accent: '#5b3a26', skin: '#c69876', hair: '#1a0e08' },
        height: 1.55,
      },
      {
        side: 'right',
        facingYaw: -Math.PI / 2,
        palette: { body: '#3a8f7d', accent: '#1f5046', skin: '#a06947', hair: '#1a0e08' },
        height: 1.6,
      },
    ],
    drinkIds: ['chai', 'cold-brew', 'mocha', 'matcha'],
  },
];

// Clickable easter-egg drinks. The Drink mesh shows a tooltip popup with the
// `name` for ~2.5s when clicked — this DOES NOT trigger a main UI modal.
export const favoriteDrinks = {
  'iced-caramel': {
    name: 'Iced Caramel Macchiato',
    note: 'extra caramel ✿',
    color: '#e8c79a',
    rim: '#5b3a26',
  },
  matcha: {
    name: 'Matcha Latte',
    note: 'oat milk, cold',
    color: '#a4c46a',
    rim: '#5a7d3a',
  },
  'cold-brew': {
    name: 'Sweet Cream Cold Brew',
    note: 'no sugar — just sweet cream',
    color: '#3a2418',
    rim: '#fff5e9',
  },
  chai: {
    name: 'Masala Chai',
    note: 'cardamom + ginger',
    color: '#a4632a',
    rim: '#3a1f0f',
  },
  mocha: {
    name: 'Iced Mocha',
    note: 'dark chocolate ♡',
    color: '#3a1f0f',
    rim: '#fff5e9',
  },
};

// === AWARDS (the trophies on the top half of the glass case) ===
// Real prizes & recognitions, NOT certifications — those live below.
export const awards = [
  {
    title: 'Waystar Hack the SDLC — 3rd Place ($1,000)',
    org: 'Waystar Hackathon',
    year: 'Apr 2026',
    accent: '#ffb56a',
  },
  {
    title: 'Outstanding Woodwind Member',
    org: 'High School Band',
    year: 'May 2024',
    accent: '#d6b4ff',
  },
];

// === CERTIFICATIONS (the scrolls on the bottom half of the glass case) ===
// Issued credentials with verifiable IDs where I have them. Each entry is
// rendered as a parchment scroll inside the AwardsCase.
export const certifications = [
  {
    title: 'DSGT GenAI Bootcamp',
    org: 'Intel',
    issued: 'Dec 2024',
    short: 'GenAI Bootcamp',
  },
  {
    title: 'CS1301: Introduction to Computing',
    org: 'College of Computing, Georgia Tech',
    issued: 'Dec 2023',
    credentialId: '453e71bf020b47528ed8c37fe1ce9ff1',
    short: 'CS1301',
  },
  {
    title: 'Supervised Machine Learning: Regression & Classification',
    org: 'DeepLearning.AI · Stanford University',
    issued: 'Oct 2023',
    credentialId: '46JCPYXKVQ7D',
    short: 'Supervised ML',
  },
  {
    title: 'Advanced Learning Algorithms',
    org: 'DeepLearning.AI · Stanford University',
    issued: 'Jan 2024',
    credentialId: '46TDECG3TPTT',
    short: 'Adv. Learning Algos',
  },
  {
    title: 'Microsoft Office Specialist: Excel Associate (Office 2019)',
    org: 'Microsoft',
    issued: 'May 2021',
    short: 'MOS Excel',
  },
  {
    title: 'IT Specialist — Software Development',
    org: 'Certiport · Pearson VUE',
    issued: 'Apr 2023',
    short: 'IT Specialist',
  },
  {
    title: 'Intro to Cybersecurity',
    org: 'Girls Who Code',
    issued: 'Aug 2022',
    short: 'GWC Cyber',
  },
];

export const performances = {
  group: 'GT Nazaaqat',
  blurb:
    "Here is my dance team's most recent performance at Holi Show. I am Jafar in our Aladdin set...go to 2:55 and 7:37 to see me in action!",
  videos: [
    {
      title: 'Holi Show — Aladdin Set',
      youtubeId: '67pvbjS5iCM',
      role: 'Jafar',
      year: '2026',
    },
    {
      title: 'GT Nazaaqat — Showcase',
      youtubeId: '67pvbjS5iCM',
      role: 'Performer',
      year: '2025',
    },
  ],
};

export const recipes = [
  {
    slug: 'rajma',
    name: 'Rajma',
    note: 'Comfort bowl • Sunday staple',
    description:
      'Kidney beans slow-simmered with onions, tomatoes, and whole spices — best with jeera rice and a squeeze of lime.',
    emoji: '🫘',
  },
  {
    slug: 'pulav',
    name: 'Vegetable Pulav',
    note: 'One-pot • Fragrant',
    description: 'Basmati rice cooked with mixed vegetables, bay leaf, and warm garam masala — light but filling.',
    emoji: '🍚',
  },
  {
    slug: 'paneer',
    name: 'Paneer Tikka',
    note: 'Smoky • Weekends',
    description: 'Cubes of paneer marinated in yogurt and kasuri methi, charred in the oven until golden at the edges.',
    emoji: '🧀',
  },
  {
    slug: 'banana-bread',
    name: 'Banana Bread',
    note: 'Study snack • Extra walnuts',
    description: 'Very ripe bananas, brown butter, and a crackly top — sliced thick for late-night debugging sessions.',
    emoji: '🍌',
  },
  {
    slug: 'chai',
    name: "Vidhi's Chai",
    note: 'Spiced • Warm • Focused',
    description: 'My signature study-break brew. Cardamom, ginger, & whole milk on slow simmer.',
    emoji: '☕',
  },
  {
    slug: 'maggi',
    name: 'Late-Night Maggi',
    note: 'Comfort • Coding fuel',
    description: 'Two-minute noodles upgraded with eggs, scallions, and chili oil.',
    emoji: '🍜',
  },
];

/** Plates on the left-wall tasting table — each slug must exist in `recipes`. */
export const recipePlates = ['rajma', 'pulav', 'paneer', 'banana-bread'];

export const coffeeChat = {
  title: 'Coffee Chat with Me',
  subtitle: 'Networking & collaboration — the informal version.',
  intro:
    "I'm always happy to grab a virtual coffee and talk about research, internships, hackathons, or how we can build something meaningful together.",
  bullets: [
    'Reach out for mentorship chats, project collaborations, or speaking opportunities.',
    'I respond fastest by email — mention "Coffee Chat" in the subject line!',
    'If you are a recruiter: I love teams that care about responsible AI and thoughtful product craft.',
  ],
  cta: 'Use the links below — I would love to hear from you.',
};

export const sketches = [
  {
    title: 'Wireframe — Memory Map',
    note: 'First sketch of the spatial recall UI.',
  },
  {
    title: 'Logo doodle — Sentra',
    note: 'Iterating on the multimodal "S" mark.',
  },
  {
    title: "Cafe layout, take 3",
    note: 'Where the laptop sits relative to the espresso bar.',
  },
  {
    title: 'Travel sketch — Santorini steps',
    note: 'Drawn from a hostel rooftop.',
  },
];

export const memoryBoard = [
  { label: 'Be curious' },
  { label: 'Keep learning' },
  { label: 'Stay kind' },
  { label: 'Build impact' },
];

export const contact = {
  email: 'vgupta409@gatech.edu',
  phone: '(470) 406-2946',
  location: 'Atlanta, Georgia',
  linkedin: 'https://linkedin.com/in/vaidehi-gupta13',
  github: 'https://github.com/vidhigupta413',
  devpost: 'https://devpost.com/vidhi_gupta413',
  closing: "Let's build something meaningful together.",
  quote: '"The best way to predict the future is to invent it." — Alan Kay',
};

// Free-form bio extras the About / Coffee Chat panels can show.
// `certifications` here mirrors the structured list in `certifications`
// above — flattened to short strings for compact display in the About
// overlay. Edit `certifications` to change both.
export const additionalSkills = {
  certifications: certifications.map((c) => `${c.title} — ${c.org} (${c.issued})`),
  interests: [
    'AI in Medical Research',
    'Agentic AI',
    'Hackathons',
    'Social Impact',
    'Product Management',
    'Bollywood Dance',
  ],
  languages: [
    'English (fluent)',
    'Hindi (fluent)',
    'Spanish (elementary)',
    'French (elementary)',
  ],
};
