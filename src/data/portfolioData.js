export const portfolioData = {
  personal: {
    name: "Sunny Haokip",
    roleDev: "Full-Stack Developer & AI Engineer",
    roleFilm: "Creative Director & Visual Storyteller",
    taglineDev: "Engineering solo end-to-end web apps, LLM/RAG systems, and intelligent agent workflows from database to interface.",
    taglineFilm: "Directing evocative cinematic narratives, solo-shot travel films, commercial edits, and kinetic motion graphics.",
    bio: "Standing at the intersection of intelligent software architecture and sensory visual storytelling. By day, I build solo end-to-end full-stack applications with Next.js and PostgreSQL, research ML/OCR models, and architect intelligent agent systems. By night, I capture light, direct solo travel films, and craft rhythm-locked commercial edits and After Effects motion design. Code engineers the intelligence; cinema breathes feeling into the story.",
    location: "New Delhi, India / Open to Remote & Worldwide",
    status: "Open to internships, freelance engineering & film collaborations",
    education: {
      institution: "Bhagwan Parshuram Institute of Technology (BPIT)",
      degree: "Bachelor of Technology (BTech) in Computer Science",
      period: "August 2023 - August 2027"
    },
    socials: {
      email: "sunnyhaokip04@gmail.com",
      linkedin: "https://www.linkedin.com/in/sunnyhaokip",
      github: "https://github.com",
      googleDrivePortfolio: "https://drive.google.com/drive/folders/1Oy9zLg7LzFMmGiX8P5NDRuiqNh6gky7A",
      techbaton: "https://techbaton.com/"
    }
  },

  // Developer Skills & Stack
  devSkills: [
    {
      category: "AI & Intelligent Systems",
      skills: ["LLM & RAG Architectures", "Intelligent Agent Tooling", "OCR Research & Pipelines", "Knowledge Engineering", "ML Models (EdTech)"]
    },
    {
      category: "Full-Stack & Web Engineering",
      skills: ["Next.js", "React", "TypeScript / JavaScript", "PostgreSQL", "Node.js / Express", "FastAPI / Python"]
    },
    {
      category: "UI/UX & Brand Design",
      skills: ["End-to-End Website UI", "Brand & Logo Identity", "Tailwind CSS", "Figma to Code", "Responsive Systems"]
    },
    {
      category: "Architecture & DevOps",
      skills: ["Database Schema Design", "Solo End-to-End Shipping", "Git & GitHub Actions", "Vercel / Cloudflare", "RESTful APIs"]
    }
  ],

  // Developer Projects
  devProjects: [
    {
      id: "dev-1",
      title: "NERCORM Project Fund Tracker",
      subtitle: "Government Undertaking Financial Oversight System",
      category: "Full-Stack Application",
      year: "2025",
      featured: true,
      description: "Solo-engineered end-to-end financial tracking system deployed for a government undertaking. Tracks project funding, capital disbursements, and overdue flags by sector.",
      longDescription: "Built completely solo from database schema to user interface. Deployed for a government undertaking (NERCORMP) to track financial allocations, project disbursements, and risk management with automated sector overdue flags. Designed for high reliability, zero data ambiguity, and seamless administrative audits.",
      metrics: "Government Deployment • 100% Solo End-to-End Build • Multi-Sector Real-Time Auditing",
      tags: ["Next.js", "PostgreSQL", "React", "TypeScript", "Tailwind CSS", "Relational DB"],
      demoUrl: "https://techbaton.com/",
      githubUrl: "https://github.com/sunnyhaokip",
      architectureNotes: "Strict relational PostgreSQL schema, optimized sector aggregation queries, and responsive Next.js dashboard.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "dev-2",
      title: "TechBaton AI Platform & Identity",
      subtitle: "Company Website UI, Logo Design & AI Engineering",
      category: "AI & Intelligent Agents",
      year: "2026",
      featured: true,
      description: "Designed and built company website UI and logo end-to-end. Contributed to ML models for EdTech, OCR research, and LLM/RAG agent systems during AI Developer internship.",
      longDescription: "Led the visual identity and web architecture of TechBaton from scratch, producing the brand logo and modern responsive web experience. As AI Developer intern, researched and implemented OCR extraction pipelines, EdTech machine learning models, and RAG knowledge systems for intelligent agents.",
      metrics: "Complete Brand & UI Build • LLM/RAG Integration • OCR Research & Tooling",
      tags: ["Next.js", "React", "Python", "LLMs / RAG", "OCR Research", "Intelligent Agents", "Branding"],
      demoUrl: "https://techbaton.com/",
      githubUrl: "https://github.com/sunnyhaokip",
      architectureNotes: "Vector embeddings with hybrid retrieval, OCR document ingestion pipeline, and interactive modern frontend.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "dev-3",
      title: "Intelligent Agent & Knowledge Systems",
      subtitle: "Autonomous Tool Calling & Multi-Step LLM Workflows",
      category: "AI & Intelligent Agents",
      year: "2026",
      featured: false,
      description: "Tooling for structured retrieval, agentic reasoning, and multi-step evaluation loops built to automate knowledge engineering.",
      longDescription: "Engineered autonomous agent pipelines utilizing function calling, schema validation, and retrieval augmented generation. Features automated verification gates, structured outputs, and reproducible prompt chaining for complex knowledge tasks.",
      metrics: "Deterministic Output Validation • Agentic Tool-Use • Sub-second Retrieval",
      tags: ["Python", "FastAPI", "RAG Pipelines", "PostgreSQL", "Prompt Engineering"],
      demoUrl: "https://techbaton.com/",
      githubUrl: "https://github.com/sunnyhaokip",
      architectureNotes: "State machine agent architecture with sandboxed tool execution and vector store memory.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
    }
  ],

  // Videography, Editing & Motion Package
  filmGear: {
    cameras: ["4K High Frame Rate Mirrorless Cinema Rig", "3-Axis Gimbal Stabilizer & Wireless Follow Focus", "Ultralight Travel Run-and-Gun Rig"],
    lenses: ["Fast Prime Lenses (Low-Light & Subject Separation)", "Wide-Angle Landscape Primes (24mm / 35mm)", "Versatile Telephoto & Macro Lenses"],
    postSoftware: ["Adobe After Effects (Motion Graphics & Kinetic VFX)", "Adobe Premiere Pro (Commercial Assembly & Rhythm Cuts)", "DaVinci Resolve Studio (Colorist & Color Grading)", "Audio DSP & Dynamic Sound Design Suite"],
    audioSupport: ["Pro Shotgun Microphone", "32-bit Float Wireless Audio Recorder", "Binaural & Ambient Field Recording Kit"]
  },

  // Videography Projects
  filmProjects: [
    {
      id: "film-1",
      title: "Welcome to Jibhi",
      client: "Independent Travel Film / Himachal Pradesh",
      category: "Travel & Narrative",
      year: "2025",
      aspectRatio: "2.39:1 Anamorphic",
      duration: "03:15",
      role: "Solo Director • Solo Cinematographer • Lead Editor • Colorist",
      featured: true,
      description: "A solo-shot cinematic journey capturing the pristine forests, emerald valleys, and nocturnal serenity of Jibhi, Himachal Pradesh.",
      longDescription: "Shot entirely solo on location with a lightweight cinema setup. Emphasizes organic natural light transitions, serene pacing, authentic mountain soundscapes, and an atmospheric color grade accentuating deep forest greens and golden high-altitude sunsets.",
      gear: "4K 10-bit Rig + Prime Lenses • DaVinci Resolve • Premiere Pro",
      posterImage: "https://drive.google.com/thumbnail?id=1h4_xclJ6z1_VdnflUMeHliRhlXoGSatM&sz=w1200",
      embedUrl: "https://drive.google.com/file/d/1h4_xclJ6z1_VdnflUMeHliRhlXoGSatM/preview",
      driveUrl: "https://drive.google.com/file/d/1h4_xclJ6z1_VdnflUMeHliRhlXoGSatM/view",
      awards: "Solo-Shot Travel Film Spotlight"
    },
    {
      id: "film-2",
      title: "Techburner Creator / Brand Reel",
      client: "Creator Collaboration & High-Energy Spot",
      category: "Commercial & Creator",
      year: "2025",
      aspectRatio: "9:16 Vertical Reel",
      duration: "00:45",
      role: "Commercial Editor • Sound Designer • Motion Graphics",
      featured: true,
      description: "High-octane creator reel packed with rhythmic match cuts, kinetic typographic callouts, sound design transients, and retention-engineered pacing.",
      longDescription: "Engineered specifically for peak engagement and audience retention. Features frame-accurate sound design, speed ramps, customized After Effects visual overlays, and punchy color contrast tuned for high-impact digital playback.",
      gear: "Adobe Premiere Pro • Adobe After Effects • Custom SFX Suite",
      posterImage: "https://drive.google.com/thumbnail?id=1v4NhhF4ybhAwfiLMtQXu5RQxSENyH3Sk&sz=w1200",
      embedUrl: "https://drive.google.com/file/d/1v4NhhF4ybhAwfiLMtQXu5RQxSENyH3Sk/preview",
      driveUrl: "https://drive.google.com/file/d/1v4NhhF4ybhAwfiLMtQXu5RQxSENyH3Sk/view",
      awards: "High-Retention Creator Reel"
    },
    {
      id: "film-3",
      title: "Commercial Client Showcase",
      client: "Brand Campaign Demonstration",
      category: "Commercial Work",
      year: "2025",
      aspectRatio: "16:9 Commercial",
      duration: "01:10",
      role: "Commercial Editor • Motion Designer • Colorist",
      featured: true,
      description: "Polished commercial spot combining clean product lighting, rhythmic pacing, and seamless brand storytelling.",
      longDescription: "Designed to showcase brand identity and product craftsmanship. Integrated custom motion graphics, macro details, and precision color balancing to deliver an elevated, broadcast-ready commercial.",
      gear: "Commercial Production Suite • After Effects • Premiere Pro",
      posterImage: "https://drive.google.com/thumbnail?id=1mzYt65QRAsfpomDwALnvpEOWOzRhbQtm&sz=w1200",
      embedUrl: "https://drive.google.com/file/d/1mzYt65QRAsfpomDwALnvpEOWOzRhbQtm/preview",
      driveUrl: "https://drive.google.com/file/d/1mzYt65QRAsfpomDwALnvpEOWOzRhbQtm/view",
      awards: "Commercial Client Delivery"
    },
    {
      id: "film-4",
      title: "AI Website & Digital Product Showcase",
      client: "TechBaton & AI Products",
      category: "Motion Graphics & UI",
      year: "2026",
      aspectRatio: "16:9 Digital",
      duration: "01:00",
      role: "Creative Director • Motion Graphics • UI Animator",
      featured: false,
      description: "Sleek product video animating web UI components, intelligent agent capabilities, and modern data visualizations.",
      longDescription: "Translates complex software algorithms and web user experiences into dynamic, visually digestible motion stories. Utilized After Effects for 2.5D camera moves, UI particle trails, and interactive interface showcases.",
      gear: "Adobe After Effects • Figma Vector Assets • Premiere Pro",
      posterImage: "https://drive.google.com/thumbnail?id=1G_VSgcTE4PMXtTPcmzqSOSCIBS1naawj&sz=w1200",
      embedUrl: "https://drive.google.com/file/d/1G_VSgcTE4PMXtTPcmzqSOSCIBS1naawj/preview",
      driveUrl: "https://drive.google.com/file/d/1G_VSgcTE4PMXtTPcmzqSOSCIBS1naawj/view",
      awards: "Tech Product Showcase"
    },
    {
      id: "film-5",
      title: "Hideaway",
      client: "Cinematic Narrative & Mood Exploration",
      category: "Personal Work",
      year: "2024",
      aspectRatio: "2.39:1 Widescreen",
      duration: "02:20",
      role: "Cinematographer • Lead Editor • Sound Designer",
      featured: false,
      description: "Moody, contemplative visual piece exploring isolated spaces, shadow play, and nuanced color tones.",
      longDescription: "Shot with subtle camera movement and natural ambient lighting. Features textured film grain emulation, selective color grades, and acoustic sound textures.",
      gear: "Cinema Camera Package • DaVinci Resolve • Premiere Pro",
      posterImage: "https://drive.google.com/thumbnail?id=1J8yY15wkWDSEU9KsP4l7aJLP6vJJBkgZ&sz=w1200",
      embedUrl: "https://drive.google.com/file/d/1J8yY15wkWDSEU9KsP4l7aJLP6vJJBkgZ/preview",
      driveUrl: "https://drive.google.com/file/d/1J8yY15wkWDSEU9KsP4l7aJLP6vJJBkgZ/view",
      awards: "Visual Tone Poem"
    },
    {
      id: "film-6",
      title: "Election Campaign Reel",
      client: "Political & Cultural Narrative Reel",
      category: "Commercial & Creator",
      year: "2024",
      aspectRatio: "9:16 Vertical Reel",
      duration: "00:50",
      role: "Lead Editor • Sound Design • Dynamic Color Grade",
      featured: false,
      description: "High-impact vertical political & community narrative reel cut with commanding pacing, impactful kinetic subtitles, and resonant sound design.",
      longDescription: "Crafted for mobile virality and high viewer retention across social media platforms. Employs fast match-cuts, voiceover normalization, and impactful visual punctuation.",
      gear: "Adobe Premiere Pro • After Effects • DaVinci Resolve",
      posterImage: "https://drive.google.com/thumbnail?id=1V8Z-eaYsCYHEj9c57BFzZm1EKJHkOipp&sz=w1200",
      embedUrl: "https://drive.google.com/file/d/1V8Z-eaYsCYHEj9c57BFzZm1EKJHkOipp/preview",
      driveUrl: "https://drive.google.com/file/d/1V8Z-eaYsCYHEj9c57BFzZm1EKJHkOipp/view",
      awards: "Political Campaign Edit"
    }
  ],

  // Showreel summary for cinema hero
  showreel: {
    title: "Sunny Haokip — Visual Storytelling & Commercial Reel",
    duration: "02:15",
    description: "A showcase of commercial direction, solo-shot travel filmmaking ('Welcome to Jibhi'), tech creator edits ('Techburner'), and After Effects motion design.",
    embedUrl: "https://drive.google.com/file/d/1h4_xclJ6z1_VdnflUMeHliRhlXoGSatM/preview",
    posterImage: "https://drive.google.com/thumbnail?id=1h4_xclJ6z1_VdnflUMeHliRhlXoGSatM&sz=w1200"
  }
};

export const personal = portfolioData.personal;
export const devSkills = portfolioData.devSkills;
export const devProjects = portfolioData.devProjects;
export const filmGear = portfolioData.filmGear;
export const filmProjects = portfolioData.filmProjects;
export const showreel = portfolioData.showreel;

export default portfolioData;
