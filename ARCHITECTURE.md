# Portfolio Backbone Architecture

This repository is engineered with a **headless, decoupled backbone**. The state management, data schema, media handling, and business logic are completely separated from the UI design layer, making it easy to reskin or swap the visual design whenever you have your UI inspiration.

---

## 📁 Project Directory Structure

```text
portfolio/
├── src/
│   ├── context/
│   │   └── PortfolioContext.jsx   <-- Global state engine (modes, filters, modal popups)
│   ├── data/
│   │   └── portfolioData.js       <-- Single source of truth (projects, bio, gear, links)
│   ├── utils/
│   │   └── mediaUtils.js          <-- Video embed parsers, aspect ratio math, formatters
│   ├── styles/
│   │   └── theme.css              <-- Design tokens (colors, fonts, glows, borders)
│   ├── components/
│   │   ├── Navbar.jsx             <-- Navigation & mode toggle
│   │   ├── DualHero.jsx           <-- Split-persona gateway hero
│   │   ├── dev/
│   │   │   └── DevShowcase.jsx    <-- Code projects & tech stack matrix
│   │   ├── film/
│   │   │   └── FilmShowcase.jsx   <-- Video cards, showreel, gear package
│   │   └── shared/
│   │       ├── ProjectModal.jsx   <-- Universal case study & video player modal
│   │       ├── AboutSection.jsx   <-- Code + Cinema synergy story
│   │       ├── ContactSection.jsx <-- Dual-discipline inquiry form
│   │       └── Footer.jsx         <-- Footer & back-to-top
│   ├── App.jsx                    <-- Backbone application orchestrator
│   ├── main.jsx                   <-- React entry point
│   └── index.css                  <-- Global resets & layout utilities
├── index.html                     <-- HTML5 entry & SEO metadata
├── vite.config.js                 <-- Vite build configuration
└── package.json                   <-- Dependencies & build scripts
```

---

## ⚡ How the Backbone Operates

### 1. State Engine (`PortfolioContext.jsx`)
Any UI component can consume the global portfolio state using a single hook:
```jsx
import { usePortfolio } from '../context/PortfolioContext';

function MyCustomComponent() {
  const { 
    activeMode,        // 'dev' | 'film'
    setActiveMode,     // Switch active persona
    devProjects,       // List of coding projects
    filmProjects,      // List of video projects
    openDevProject,    // Triggers deep-dive case study modal
    openFilmProject,   // Triggers video player modal
    openShowreel       // Triggers featured reel
  } = usePortfolio();
}
```

### 2. Design Tokens (`src/styles/theme.css`)
When you bring your UI design inspiration, you can change the visual identity simply by adjusting CSS tokens:
- `--dev-accent` (e.g. Electric Cyan, Terminal Green, or Minimal Monochrome)
- `--film-accent` (e.g. Warm Amber, Cinema Crimson, or Kodak Gold)
- `--font-display`, `--font-cinema`, `--font-mono` (Typography pairings)
- `--radius-sm`, `--radius-md`, `--radius-lg` (Sharp vs rounded corners)

### 3. Data Schema (`src/data/portfolioData.js`)
All portfolio content is decoupled from components. You can add or modify:
- **Coding projects**: Title, subtitle, metrics, tags, GitHub link, Live Demo link, architecture highlights.
- **Videography projects**: Title, client, aspect ratio, duration, roles (Director, Editor, Colorist), poster image, preview loop video, YouTube/Vimeo embed URL, camera/editing software used, awards.
- **Gear list & Skills**: Camera bodies, cinema primes, DaVinci Resolve / Premiere suite, tech stack.
