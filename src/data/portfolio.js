// Single source of truth for everything that gets rendered in Vidhi's Cafe.
// The 3D scene is data-driven: zones read from this file to populate the
// glassmorphism overlays so adding a project / city / plaque is a one-line edit.

export const NAV_ITEMS = [
  { id: 'about', number: '01', label: 'About Me' },
  { id: 'projects', number: '02', label: 'Projects' },
  { id: 'aiResearch', number: '03', label: 'Research' },
  { id: 'skills', number: '04', label: 'Skills' },
  { id: 'experience', number: '05', label: 'Experience' },
  { id: 'leadership', number: '06', label: 'Leadership' },
  { id: 'journey', number: '07', label: 'Journey' },
  { id: 'contact', number: '08', label: 'Contact' },
];

/** Matches the opening camera in `App.jsx` — used when flying back to Overview. */
export const defaultCamera = {
  position: [22, 16, 26],
  target: [0, 3, 1],
};

/**
 * Named camera fly-tos. Rendered as floor "hotspot" rings (see
 * `FloorHotspots.jsx`) — clicking a ring eases the camera into the preset.
 *   - `position`/`target`: the camera state to fly to.
 *   - `floor`: [x, z] world coords for the floor ring + label.
 * Positions are tuned to the expanded cafe layout (see `RoomShell.jsx`
 * ROOM constants) and the floor coords are sited in open aisles between
 * tables/props so they're easy to click without overlapping furniture.
 */
export const vantagePoints = [
  { id: 'overview', label: '↻ Overview', position: [22, 16, 26], target: [0, 3, 1], floor: [0, 7.7] },
  { id: 'counter', label: 'Coffee bar', position: [7, 6.5, 13], target: [0, 1.4, -0.8], floor: [0, 2.5] },
  { id: 'skills', label: 'Skills & Research', position: [-13, 6, 1], target: [-18.8, 4.5, -7], floor: [-15.5, -3] },
  // Camera is lowered below the ceiling pendant beam (y=7.5) and pulled to
  // x≈9.75 — the centre of the right-half travel strip — so the beam stops
  // occluding the polaroid frames.
  { id: 'travel', label: 'Travel wall', position: [9.75, 5.8, -0.5], target: [9.75, 4.8, -11.5], floor: [5, -7.5] },
  // Mirrored from the travel vantage — left-half back wall (`LeadershipShelf`).
  {
    id: 'leadershipXpWall',
    label: 'Leadership & jobs',
    position: [-9.75, 5.8, -0.5],
    target: [-9.75, 4.5, -11.5],
    floor: [-9, -7.5],
  },
  { id: 'tv', label: 'Performances', position: [12, 5.5, 5], target: [19.2, 3.8, -0.35], floor: [12.5, 0.5] },
  { id: 'music', label: 'Music corner', position: [11, 6.5, -5], target: [16, 2.2, -8.5], floor: [12.5, -6] },
  { id: 'awards', label: 'Awards', position: [5, 5.5, 9], target: [6.8, 2.4, 3.4], floor: [3.8, 5.5] },
  { id: 'persona', label: 'Coffee chat', position: [-17, 5.5, 7], target: [-12.5, 2, 1.0], floor: [-9, 2.5] },
  { id: 'recipes', label: 'Recipes wall', position: [-15, 6.5, 5], target: [-19.2, 4.5, 3], floor: [-14, 5.5] },
];

export const aboutMe = {
  name: 'Vaidehi Gupta',
  handle: "Vidhi's Cafe",
  tagline: 'Code. Create. Connect.',
  title: 'CS @ Georgia Tech · Research + Software Engineering',
  bio: "Computer Science student at Georgia Tech (B.S. expected May 2028) building reliable AI systems and full-stack products. Software Engineer Intern at Elevance Health (summer 2026), Peer Coach and former HELP session leader in the College of Computing, and undergraduate researcher in the Responsible AI for Medical Imaging VIP.",
  identityChips: [
    'Technical Leader',
    'Full-Stack Software Engineer',
    'ML Specialist',
    'CS Mentor',
    'AI Product Strategist',
  ],
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
    id: 'elevance-swe',
    company: 'Elevance Health',
    title: 'Software Engineering Intern (Incoming)',
    dates: 'May 2026 – Aug 2026',
    location: 'Atlanta, Georgia, United States · Summer 2026',
    imageBase: '/experience/elevance-health',
    description: [
      'Building Snowflake + AWS-backed healthcare AI features using GitHub Copilot, Windsurf, and Snowflake Cortex within the Digital Platforms & AI Organization.',
    ],
  },
  {
    id: 'gt-peer-coach',
    company: 'College of Computing at Georgia Tech',
    title: 'Peer Coach',
    dates: 'Feb 2026 – Present',
    location: 'Atlanta, Georgia, United States · Hybrid · Part-time',
    imageBase: '/experience/gt-peer-coach',
    description: [
      'Leading SWARM structured student success initiative, performing weekly progress analytics in Excel and delivering 1-on-1 data-driven coaching.',
    ],
  },
  {
    id: 'gt-vip',
    company: 'Georgia Tech VIP Program',
    title: 'Undergraduate Researcher — Responsible AI for Medical Image Analysis',
    dates: 'Aug 2025 – Present',
    location: 'Atlanta, Georgia, United States · On-site · Part-time',
    imageBase: '/experience/gt-vip-medical-ai',
    description: [
      'Engineered high-performing PyTorch classifier with Efficient Net-B1 on 6k+ images, architecting data pipelines to detect edge-case anomalies and resolve severe class imbalances.',
      'Optimized model reliability by conducting systematic failure mode analysis AUC-ROC/F1, defining the product roadmap for future backend refinements.',
      'Collaborated with research stakeholders to align model outputs (92% recall) with rigorous, high-stakes medical reliability standards.',
    ],
  },
  {
    id: 'gt-help',
    company: 'College of Computing at Georgia Tech',
    title: 'CS 1332 & CS 3600: HELP Session Leader',
    dates: 'Aug 2025 – Dec 2025',
    location: 'Atlanta, Georgia, United States · On-site · Part-time',
    imageBase: '/experience/gt-coc-help-session',
    description: [
      'Instructed technical workshops for CS 1332/3600, clarifying complex DSA and AI concepts for students.',
    ],
  },
  {
    id: 'blue-ai',
    company: 'Blue AI Labs',
    title: 'Machine Learning Consultant',
    dates: 'Jul 2025 – Aug 2025',
    location: 'Remote · Internship',
    imageBase: '/experience/blue-ai-labs',
    description: [
      'Spearheaded a three-phase AI product strategy, translating complex ML models into technical specifications for 9 distinct AI features across feasibility and user friction trade-offs.',
    ],
  },
  {
    id: 'outlier',
    company: 'Outlier',
    title: 'Artificial Intelligence Engineer',
    dates: 'Sep 2024 – Dec 2024',
    location: 'Remote · Freelance',
    imageBase: '/experience/outlier',
    description: [
      'Evaluated and optimized AI-generated code for efficiency and functionality, ensuring high-quality output.',
      'Analyzed code quality and solved complex coding problems to enhance overall performance.',
      'Developed comprehensive test cases and provided clear, human-readable explanations for code improvements.',
      'Contributed to refining AI models, boosting their capability to generate effective solutions.',
    ],
  },
  {
    id: 'radical-ai',
    company: 'Radical AI',
    title: 'Software Engineer',
    dates: 'Apr 2024 – Jul 2024',
    location: 'Remote · Internship',
    imageBase: '/experience/radical-ai',
    description: [
      'Developed ReX, an AI Coach, utilizing OpenAI, Node.js, and React to enhance career support for learners.',
      'Collaborated with cross-functional teams to deliver personalized coaching and mentorship throughout the career lifecycle.',
      'Engaged in continuous improvement of AI-driven solutions to better serve users\' career development needs.',
    ],
  },
  {
    id: 'coder-school',
    company: 'theCoderSchool',
    title: 'Code Coach',
    dates: 'Mar 2023 – Jul 2024',
    location: 'Johns Creek, GA · Part-time',
    imageBase: '/experience/the-coder-school',
    description: [
      'Mentored 10+ K-12 students in Python software development, promoting clean code practices and systematic debugging techniques.',
    ],
  },
  {
    id: 'braathe-lead',
    company: 'Braathe Enterprises',
    title: 'Team Lead — Technology, Finance, Research & Development',
    dates: 'Dec 2023 – Mar 2024',
    location: 'Remote · Internship',
    imageBase: '/experience/braathe-enterprises',
    description: [
      'Led a team of interns in the Technology, Finance, Research and Development department at Braathe Enterprises.',
      'Mentored peers on machine learning concepts while collaborating on the Global Arbitrage Analysis project.',
      'Conducted research to explore innovative solutions in machine learning, enhancing team knowledge and skills.',
    ],
  },
  {
    id: 'braathe-intern',
    company: 'Braathe Enterprises',
    title: 'Intern — Technology, Finance, Research & Development',
    dates: 'Aug 2023 – May 2024',
    location: 'Remote · Internship · 10 mos',
    imageBase: '/experience/braathe-enterprises',
    description: [
      'Collaborated with a team of interns on the Global Arbitrage Analysis project, focusing on machine learning research.',
      'Developed workforce skills while gaining insights into finance and business concepts.',
      'Engaged in innovative problem-solving to enhance project outcomes in a remote work environment.',
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

// Travel: one `travelPlaces` entry per destination on the wall. `wallStem` is the
// polaroid photo; `extraStems` are additional angles (e.g. London2) shown only
// in the Journey popup gallery — not duplicated on the scrolling wall.
function humanizeTravelStem(stem) {
  return stem
    .replace(/_/g, ' ')
    .replace(/([A-Za-z])(\d)/g, '$1 $2')
    .trim();
}

const _travelPlaces = [
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    country: 'Costa Rica',
    coords: { x: 0.24, y: 0.48 },
    wallStem: 'Costa_Rica',
    extraStems: [],
    description:
      'Saw the Arenal Volcano, the famous resting volcano that hasn\'t been active since 2010. This trip to La Fortuna in Costa Rica was an amazing dive into nature. I remember the little Coatis (small lemur-like animals) and the yummy local foods we had.',
  },
  {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    coords: { x: 0.465, y: 0.64 },
    wallStem: 'Lisbon',
    extraStems: [],
    description:
      'Loved seeing the local city as well as the famous yellow tram! The city life was great and yellow was this city\'s color for sure.',
  },
  {
    id: 'lagos',
    name: 'Lagos',
    country: 'Portugal',
    coords: { x: 0.465, y: 0.632 },
    wallStem: 'Lagos',
    extraStems: ['Lagos2'],
    description:
      'Lagos might have been the reason why Portugal was my favorite country to visit during Study Abroad. It had both the outdoor beach adventures and night time city life adventures for us to embark on. The cave kayaking, beach frolicking, and ice cream munching leading to a STUNNING sunset (I love that picture of me thanks to Saanvi my travel bestie for taking it xoxo) and exploring the city after was a full day\'s worth of fun. Sending love to Lagos <3',
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    coords: { x: 0.485, y: 0.62 },
    wallStem: 'Barcelona',
    extraStems: [],
    description:
      'We had so much fun exploring Barcelona\'s shopping scene and trying their paella. Their nightlife is unmatched and everything is super close to the beach!',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    coords: { x: 0.52, y: 0.74 },
    wallStem: 'Paris',
    extraStems: [],
    description:
      'Nothing can beat the view of the glittering Eiffel Tower at every hour at night. The croissants and espresso here was amazing, but more than that, this is a busy tourist city that never sleeps even when it\'s dark!',
  },
  {
    id: 'nice',
    name: 'Nice',
    country: 'France',
    coords: { x: 0.531, y: 0.63 },
    wallStem: 'Nice',
    extraStems: [],
    description:
      'Nice was nice (haha)! The weather was awesome when I went in June 2025. This beach was very rocky and there wasn\'t much sand, but we still got nice pictures! I loved the beach town vibe.',
  },
  {
    id: 'monaco',
    name: 'Monaco',
    country: 'Monaco',
    coords: { x: 0.534, y: 0.632 },
    wallStem: 'Monaco',
    extraStems: [],
    description:
      'We heard this was the richest country in the world but didn\'t actually believe it until we saw it ourselves! This trip felt like a small glimpse into what retirement could look like-- breathtaking views of the land and casino nights with friends! Also, this is home to one of the famous F1 racing tracks... pose with the stone car if you\'re there.',
  },
  {
    id: 'marseille',
    name: 'Marseille',
    country: 'France',
    coords: { x: 0.528, y: 0.634 },
    wallStem: 'Marseille',
    extraStems: [],
    description:
      'This was a fun port town to eat ice cream in! The France-style town vibe was there along with their prized port area. We spent just an evening here but it was a beautiful stop.',
  },
  {
    id: 'metz',
    name: 'Metz',
    country: 'France',
    coords: { x: 0.525, y: 0.745 },
    wallStem: 'Metz',
    extraStems: [],
    description:
      'Metz stays near and dear to my heart as it was my home for 3 months! We had classes here and we stayed here for the middle of the week when we weren\'t traveling. The people here are very caring and this place was like a nicer, homey version of Paris. The town was small but the love for this place is huge :) Oh, and it\'s right in the middle of Europe, so it was quite convenient to travel to places from here!',
  },
  {
    id: 'brussels',
    name: 'Brussels',
    country: 'Belgium',
    coords: { x: 0.52, y: 0.755 },
    wallStem: 'Brussels',
    extraStems: [],
    description:
      'This city was part of our first weekend trip while studying abroad, so it stays close to my heart. Brussels is known for its great Belgian waffles, vast variety of chocolate, and Belgian fries!',
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    coords: { x: 0.525, y: 0.775 },
    wallStem: 'Amsterdam',
    extraStems: [],
    description:
      'A chilly first trip stop in the Netherlands, Amsterdam was a different vibe within itself. The leaning houses along the river and the various bridges made the name of the town really make sense. Although we were low in elevation here (-6.562\' to be exact), the serotonin here was super high :)',
  },
  {
    id: 'london',
    name: 'London',
    country: 'UK',
    coords: { x: 0.5005, y: 0.773 },
    wallStem: 'London',
    extraStems: ['London2'],
    description:
      'London was a great break from being in environments where people didn\'t speak English as their main language! The city was bustling with activity and we saw Big Ben. The bridges and buildings were so cool to see! Oh, and their chocolate strawberries are SO SO good!!!!',
  },
  {
    id: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    coords: { x: 0.555, y: 0.725 },
    wallStem: 'Prague',
    extraStems: [],
    description:
      'We were standing on Charles Bridge in Prague and enjoying the old town vibe. The chimney cakes here were great and we loved seeing the buildings with clocks on them-- there was even a crowd watching the clock chime!',
  },
  {
    id: 'munich',
    name: 'Munich',
    country: 'Germany',
    coords: { x: 0.54, y: 0.72 },
    wallStem: 'Munich',
    extraStems: [],
    description:
      'We visited the BMW Museum in Munich, a town of culture and bustling activity. The markets were the cutest, especially the assortment of flowers and mementos.',
  },
  {
    id: 'black-forest',
    name: 'Black Forest',
    country: 'Germany',
    coords: { x: 0.525, y: 0.728 },
    wallStem: 'Black_Forest',
    extraStems: [],
    description:
      'This trip was nothing short of an escape into nature and a beautiful small town. We stayed close to a waterfall and the town was based around one street on a hill. House of 1000 Clocks and Black Forest Cake tasting along with the jumbo sized pizza we got made this trip memorable after hiking up a trail to see a tranquil waterfall.',
  },
  {
    id: 'salzburg',
    name: 'Salzburg',
    country: 'Austria',
    coords: { x: 0.545, y: 0.726 },
    wallStem: 'Salzburg',
    extraStems: [],
    description:
      'Salzburg was a relatively small town but the memories we made were one of a kind. The hike up to the high view of the city was worth it and the Mozart chocolate was also so yummy! It was so cool seeing the mini market as well, great for souvenirs!',
  },
  {
    id: 'interlaken',
    name: 'Interlaken',
    country: 'Switzerland',
    coords: { x: 0.5345, y: 0.709 },
    wallStem: 'Interlaken',
    extraStems: ['Interlaken2'],
    description:
      'As it says in the name, Interlaken was a town based on its georgraphical features-- 2 lakes!! We went swimming in the river and also took pictures at the high trails that you could see the lakes from. Oh, and we went paragliding! Felt like Fortnite IRL....',
  },
  {
    id: 'grindelwald',
    name: 'Grindelwald',
    country: 'Switzerland',
    coords: { x: 0.528, y: 0.716 },
    wallStem: 'Grindelwald',
    extraStems: [],
    description:
      'Grindelwald is known for its breathtaking mountain views as you walk along the hike and sky bridges. The views were so crisp and the air felt fresh and untouched by humans. Hopefully we can keep it that way!',
  },
  {
    id: 'jungfrau',
    name: 'Jungfrau',
    country: 'Switzerland',
    coords: { x: 0.524, y: 0.719 },
    wallStem: 'Jungfrau',
    extraStems: [],
    description:
      'Visited the highest point in Europe called Jungfrau and went inside their ice cave (peep the penguins) and other exhibits. Loved the little Lindor chocolates we got at the end :)',
  },
  {
    id: 'milan',
    name: 'Milan',
    country: 'Italy',
    coords: { x: 0.545, y: 0.68 },
    wallStem: 'Milan',
    extraStems: [],
    description:
      'Milan was the destination of designer brands and luxury. The architecture was great and the gnocchi pasta was even better!',
  },
  {
    id: 'genoa',
    name: 'Genoa',
    country: 'Italy',
    coords: { x: 0.535, y: 0.674 },
    wallStem: 'Genoa',
    extraStems: [],
    description:
      'This was a small yet memorable town. We had the famous Genoa Pesto Pasta from a local shop and it was awesome. We also took pictures near the pier area where there were a lot of boats passing by.',
  },
  {
    id: 'pisa',
    name: 'Pisa',
    country: 'Italy',
    coords: { x: 0.538, y: 0.668 },
    wallStem: 'Pisa',
    extraStems: [],
    description:
      'We spent literally maybe 2 hours max here-- a short but needed stop at the iconic Leaning Tower of Pisa!',
  },
  {
    id: 'venice',
    name: 'Venice',
    country: 'Italy',
    coords: { x: 0.55, y: 0.694 },
    wallStem: 'Venice',
    extraStems: [],
    description:
      'Venice was genuinely one of the most unique cities I have been to. Their water transportation was initially a little confusing to figure out, but it was so fun to use once we got it! This city had the most beautiful water town vibes. I also had quite a lot of cappucinos here :)',
  },
  {
    id: 'murano',
    name: 'Murano',
    country: 'Italy',
    coords: { x: 0.548, y: 0.698 },
    wallStem: 'Murano',
    extraStems: [],
    description:
      'Murano is a small island we visited off the coast of Venice. They\'re known for their intricate and colorful glasswork, along with their seafood snacks and quieter residential areas in comparison to Venice. ',
  },
  {
    id: 'burano',
    name: 'Burano',
    country: 'Italy',
    coords: { x: 0.554, y: 0.6945 },
    wallStem: 'Burano',
    extraStems: ['Burano2'],
    description:
      'We stopped here during our stay in Venice. Burano is known for its colorful fisherman houses and small markets! Similar to Murano, any area I looked and there was color in each corner. The challenge is to try and get a fire picture with your fit and a matching house to go along with it :)',
  },
  {
    id: 'athens',
    name: 'Athens',
    country: 'Greece',
    coords: { x: 0.565, y: 0.624 },
    wallStem: 'Athens',
    extraStems: [],
    description:
      'It was great seeing all the beautiful architecture here in Athens. The views were beautiful and we watched the sunset and even went stargazing (some of us even saw shooting stars!)',
  },
  {
    id: 'naxos',
    name: 'Naxos',
    country: 'Greece',
    coords: { x: 0.57, y: 0.612 },
    wallStem: 'Naxos',
    extraStems: [],
    description:
      'This picture was taken after we spent hours in the waters of Naxos Island and enjoyed the beach. We enjoyed the sunset and had a dinner close to the shore. It was really, really hot here in July 2025!',
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    coords: { x: 0.575, y: 0.616 },
    wallStem: 'Santorini',
    extraStems: [],
    description:
      'This town was a beautiful stop within our ferry and flights journey. Known for its blue domes and stunning white architecture, Santorini was a one-of-a-kind destination. I miss the gyros we ate at every meal and seeing small cats in every corner!',
  },
];

// Case variants first so `Amsterdam.JPG` resolves on case-sensitive hosts.
export const travelImageExts = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'webp'];

export const travelPlaces = _travelPlaces.map((p) => ({
  ...p,
  name: p.name ?? humanizeTravelStem(p.wallStem),
}));

/** One row per destination (map + quick pickers). Same coords as `travelPlaces`. */
export const travelPins = travelPlaces.map((p) => ({
  id: p.id,
  name: p.name,
  country: p.country,
  coords: p.coords,
  imageBase: `/travel/${p.wallStem}`,
}));

/** Woodwind display case panel — YouTube embeds (video IDs + captions). */
export const woodwindsVideos = [
  {
    title: 'Recording 1',
    youtubeId: 'A0_49VTgtic',
    caption: 'Flute Solos: 0:11, 2:25 and various Piccolo features',
  },
  {
    title: 'Recording 2',
    youtubeId: 'JkudLQOzhwU',
    caption: 'Piccolo Solos: 2:32, 3:16',
  },
  {
    title: 'Recording 3',
    youtubeId: 'QJlmPC3RJIg',
    caption: 'Piccolo Solos: 10:13, 10:56',
  },
];

export const aiResearch = {
  headline: 'Responsible AI for Medical Imaging',
  lab: 'Vertically Integrated Project (VIP) — Georgia Tech',
  role: 'Undergraduate Researcher · Aug 2025 – Present',
  summary:
    'Building reliable medical-image classifiers on real-world data with severe class imbalance, with a focus on edge-case anomaly detection, failure-mode analysis, and aligning model behavior with clinician-grade reliability standards.',
  highlights: [
    {
      title: 'EfficientNet-B1 on 30k+ images',
      detail:
        'Developed and trained EfficientNet-B1 in PyTorch for pneumonia classification on 30,000+ images, with a pandas pipeline for cleaning data, class imbalance, and weighted loss.',
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
// Real prizes & recognitions. `detail` shows in the Leadership overlay only.
export const awards = [
  {
    id: 'waystar',
    title: 'Waystar Hack the SDLC — 3rd Place ($1,000)',
    org: 'Waystar Hackathon',
    year: 'Apr 2026',
    accent: '#ffb56a',
  },
  {
    id: 'woodwind',
    title: 'Outstanding Woodwind Member',
    org: 'High School Band',
    year: 'May 2024',
    accent: '#d6b4ff',
  },
  {
    id: 'technovation-2023',
    title: 'National Semifinalist — Technovation Girls',
    org: 'FitSphere: AI-based fitness social platform (team of two)',
    year: 'May 2023',
    accent: '#ff7be0',
  },
  {
    id: 'ap-distinction',
    title: 'AP Scholar with Distinction',
    org: 'College Board · South Forsyth High School',
    year: 'Jul 2023',
    accent: '#a4c46a',
    detail:
      'Granted to students who receive an average score of at least 3.5 on all AP Exams taken, and scores of 3 or higher on five or more of these exams.',
  },
  {
    id: 'gmea-2023',
    title: 'District Honor Band Placement',
    org: 'GMEA District 9 Honor Band · South Forsyth High School',
    year: 'Dec 2023',
    accent: '#7b4dd6',
  },
  {
    id: 'ap-honor',
    title: 'AP Scholar with Honor',
    org: 'College Board · South Forsyth High School',
    year: 'Jul 2022',
    accent: '#5a7d3a',
    detail:
      'Granted to students who receive scores of 3 or higher on three or more AP Exams.',
  },
  {
    id: 'gmea-2022',
    title: 'District Honor Band Placement',
    org: 'GMEA District 9 Honor Band · South Forsyth High School',
    year: 'Dec 2022',
    accent: '#7b4dd6',
  },
  {
    id: 'gmea-2021',
    title: 'District Honor Band Placement',
    org: 'GMEA District 9 Honor Band · South Forsyth High School',
    year: 'Dec 2021',
    accent: '#7b4dd6',
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
    "Highlights from my dance team's recent stage performances — pick a show below to watch.",
  videos: [
    {
      title: 'Holi Show — Aladdin Set',
      youtubeId: '67pvbjS5iCM',
      role: 'Jafar',
      year: '2026',
      caption:
        "Our most recent Holi Show performance. I'm Jafar in our Aladdin set — go to 2:55 and 7:37 to see me in action!",
    },
    {
      title: 'ATL Tamasha',
      youtubeId: '3RIWQy49JJU',
      role: 'Performer',
      year: '2025',
    },
    {
      title: 'Holi Show 2025',
      youtubeId: 'VxSggpLtMBA',
      role: 'Toph',
      year: '2025',
      caption:
        'Our theme was Avatar the Last Airbender. Go to 5:43 to see me as Toph, the Earthbender!',
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
