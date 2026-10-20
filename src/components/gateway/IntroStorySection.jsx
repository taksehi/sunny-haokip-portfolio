import React, { useState } from 'react';
import { 
  Terminal, 
  Clapperboard, 
  Compass, 
  Cpu, 
  Film, 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Play, 
  Award, 
  Code2, 
  Sliders,
  Calendar,
  Eye,
  Camera
} from 'lucide-react';
import soundFX from '../../utils/soundEffects';
import './IntroStorySection.css';

export default function IntroStorySection({ personal, activeMode, onSelectMode, onOpenShowreel }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'code', 'cinema', 'timeline'
  const isDev = activeMode === 'dev';

  const handleTabChange = (tab) => {
    if (tab === 'code') soundFX.playMechanicalClick();
    else if (tab === 'cinema') soundFX.playShutterClick();
    else soundFX.playPaperRustle();
    setActiveTab(tab);
  };

  const handleSelectDev = () => {
    soundFX.playMechanicalClick();
    if (onSelectMode) onSelectMode('dev');
  };

  const handleSelectFilm = () => {
    soundFX.playShutterClick();
    if (onSelectMode) onSelectMode('film');
  };

  return (
    <section id="intro-story" className="intro-story-section">
      <div className="container">
        
        {/* Section Header & Manifesto */}
        <div className="intro-story-header">
          {/* Identity Badge with Live Radar Ping */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.42rem 1.15rem',
              background: 'rgba(20, 24, 32, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '9999px',
              marginBottom: '1.5rem',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 10px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Live Radar Beacon Ping */}
            <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  backgroundColor: '#34d399',
                  opacity: 0.75,
                  animation: 'heroPing 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}
              />
              <span
                style={{
                  position: 'relative',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#34d399',
                  boxShadow: '0 0 10px #34d399'
                }}
              />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                fontWeight: 500,
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ color: '#ffffff', fontWeight: 600 }}>SUNNY HAOKIP</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>//</span>
              <span style={{ color: '#6ee7b7' }}>FULL-STACK &amp; AI</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
              <span style={{ color: '#fde68a' }}>CREATIVE DIRECTOR</span>
            </span>
          </div>

          <h2 className="intro-headline">
            Architecting Intelligence. <br className="hidden-mobile" />
            <span className="intro-headline-highlight">Directing Light.</span>
          </h2>

          <p className="intro-subheadline" style={{ maxWidth: '740px', fontSize: 'clamp(1.05rem, 1.4vw, 1.22rem)', lineHeight: 1.68 }}>
            Engineering solo end-to-end web apps, LLM/RAG systems, and intelligent agent workflows — while directing evocative 4K travel films and rhythm-cut commercial cinema.
          </p>

          {/* Luxury CTA Action Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
            marginBottom: '1.75rem'
          }}>
            <button
              onClick={handleSelectDev}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0.88rem 1.85rem',
                borderRadius: '9999px',
                background: '#ffffff',
                color: '#080808',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                letterSpacing: '0.01em',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.95), 0 10px 28px rgba(0, 0, 0, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 14px 36px rgba(52, 211, 153, 0.45)';
                e.currentTarget.style.background = '#34d399';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'inset 0 1px 1px rgba(255, 255, 255, 0.95), 0 10px 28px rgba(0, 0, 0, 0.4)';
                e.currentTarget.style.background = '#ffffff';
              }}
            >
              <Terminal size={15} style={{ strokeWidth: 2.5 }} />
              <span>Explore Dev &amp; AI</span>
            </button>

            <button
              onClick={handleSelectFilm}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0.88rem 1.85rem',
                borderRadius: '9999px',
                background: 'rgba(20, 24, 32, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                color: '#ffffff',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                letterSpacing: '0.01em',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 8px 24px rgba(0, 0, 0, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(245, 158, 11, 0.22)';
                e.currentTarget.style.borderColor = '#fbbf24';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 14px 36px rgba(245, 158, 11, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(20, 24, 32, 0.85)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 8px 24px rgba(0, 0, 0, 0.4)';
              }}
            >
              <Clapperboard size={15} style={{ strokeWidth: 2.2, color: '#fbbf24' }} />
              <span>Explore Cinema</span>
            </button>

            <button
              onClick={onOpenShowreel}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.88rem 1.45rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                color: 'rgba(255, 255, 255, 0.92)',
                fontSize: '0.86rem',
                fontFamily: 'var(--font-mono)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fbbf24';
                e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.6)';
                e.currentTarget.style.background = 'rgba(251, 191, 36, 0.12)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.92)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Play size={12} fill="#fbbf24" color="#fbbf24" />
              <span>Watch Reel</span>
              <span style={{
                fontSize: '0.72rem',
                padding: '0.12rem 0.4rem',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.75)'
              }}>
                02:15
              </span>
            </button>
          </div>

          {/* Tactile Hardware Glass Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.55rem',
              marginBottom: '2.5rem'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                background: 'rgba(20, 24, 32, 0.65)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                color: 'rgba(255, 255, 255, 0.88)'
              }}
            >
              <span style={{ color: '#34d399', fontSize: '0.8rem' }}>⚡</span>
              <span>BTech CS @ BPIT '27</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                background: 'rgba(20, 24, 32, 0.65)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                color: 'rgba(255, 255, 255, 0.88)'
              }}
            >
              <span style={{ color: '#38bdf8', fontSize: '0.8rem' }}>✦</span>
              <span>AI Dev @ TechBaton</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                background: 'rgba(20, 24, 32, 0.65)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                color: 'rgba(255, 255, 255, 0.88)'
              }}
            >
              <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>❖</span>
              <span>Govt NERCORMP Deploy</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                background: 'rgba(20, 24, 32, 0.65)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                color: 'rgba(255, 255, 255, 0.88)'
              }}
            >
              <span style={{ color: '#c084fc', fontSize: '0.8rem' }}>🎬</span>
              <span>DaVinci Studio &amp; 4K</span>
            </div>
          </div>

          {/* Interactive Chapter Navigation Pills */}
          <div className="intro-chapter-nav" role="tablist">
            <button
              onClick={() => handleTabChange('overview')}
              className={`intro-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'overview'}
            >
              <Layers size={13} />
              <span>01 // DUAL SYNTHESIS</span>
            </button>

            <button
              onClick={() => handleTabChange('code')}
              className={`intro-nav-btn dev ${activeTab === 'code' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'code'}
            >
              <Terminal size={13} />
              <span>02 // THE ARCHITECT</span>
            </button>

            <button
              onClick={() => handleTabChange('cinema')}
              className={`intro-nav-btn film ${activeTab === 'cinema' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'cinema'}
            >
              <Clapperboard size={13} />
              <span>03 // THE DIRECTOR</span>
            </button>

            <button
              onClick={() => handleTabChange('timeline')}
              className={`intro-nav-btn ${activeTab === 'timeline' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'timeline'}
            >
              <Calendar size={13} />
              <span>04 // EXPEDITIONS</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display Area */}
        <div className="intro-tab-content">
          
          {/* TAB 1: THE DUAL SYNTHESIS (Side-by-Side Dual Engine) */}
          {activeTab === 'overview' && (
            <div className="intro-deck-grid animate-fade-in">
              {/* Left Card: The Systems Architect */}
              <div className="intro-pillar-card dev" onClick={handleSelectDev}>
                <div className="pillar-header">
                  <div className="pillar-tag">
                    <Terminal size={14} />
                    <span>SYS.ARCH // FULL-STACK &amp; AI</span>
                  </div>
                  <span className="pillar-metric-pill">100% Solo Shipping</span>
                </div>

                <h3 className="pillar-title">Full-Stack &amp; AI Engineer</h3>
                
                <p className="pillar-desc">
                  Engineering solo end-to-end web applications with Next.js and PostgreSQL, 
                  architecting LLM &amp; RAG pipelines, and deploying intelligent agent tooling. 
                  From database schema design to clean, performant interfaces.
                </p>

                <div className="pillar-bullet-list">
                  <div className="pillar-bullet-item">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>Government Undertaking Deployment (NERCORMP Fund Tracker)</span>
                  </div>
                  <div className="pillar-bullet-item">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>OCR Document Intelligence &amp; EdTech ML Research at TechBaton</span>
                  </div>
                  <div className="pillar-bullet-item">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>BTech Computer Science (BPIT Delhi • 2023–2027)</span>
                  </div>
                </div>

                <div className="pillar-footer">
                  <div className="pillar-tags">
                    <span>Next.js</span>
                    <span>PostgreSQL</span>
                    <span>TypeScript</span>
                    <span>FastAPI</span>
                    <span>RAG</span>
                  </div>
                  <span className="pillar-cta-text">
                    Explore Engineering →
                  </span>
                </div>
              </div>

              {/* Right Card: The Visual Storyteller */}
              <div className="intro-pillar-card film" onClick={handleSelectFilm}>
                <div className="pillar-header">
                  <div className="pillar-tag">
                    <Clapperboard size={14} />
                    <span>CINEMA.SUITE // DIRECTION &amp; POST</span>
                  </div>
                  <span className="pillar-metric-pill amber">4K 10-Bit Anamorphic</span>
                </div>

                <h3 className="pillar-title">Creative Director &amp; Filmmaker</h3>
                
                <p className="pillar-desc">
                  Directing solo-shot atmospheric travel films, rhythm-locked commercial creator reels, 
                  and kinetic motion graphics. Every cut is engineered with frame-accurate sound design, 
                  organic natural light, and nuanced DaVinci Resolve color grading.
                </p>

                <div className="pillar-bullet-list">
                  <div className="pillar-bullet-item">
                    <CheckCircle2 size={13} className="text-amber" />
                    <span>Solo-Shot Travel Spotlight: "Welcome to Jibhi" (Himachal Pradesh)</span>
                  </div>
                  <div className="pillar-bullet-item">
                    <CheckCircle2 size={13} className="text-amber" />
                    <span>High-Retention Creator Commercials (Techburner collaboration)</span>
                  </div>
                  <div className="pillar-bullet-item">
                    <CheckCircle2 size={13} className="text-amber" />
                    <span>After Effects Motion Graphics &amp; 32-bit Float Sound Design</span>
                  </div>
                </div>

                <div className="pillar-footer">
                  <div className="pillar-tags">
                    <span>DaVinci Resolve</span>
                    <span>Premiere Pro</span>
                    <span>After Effects</span>
                    <span>Solo Directing</span>
                  </div>
                  <span className="pillar-cta-text amber">
                    Enter Cinema Suite →
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THE ARCHITECT (Deep Dive into Engineering) */}
          {activeTab === 'code' && (
            <div className="intro-code-deep-dive animate-fade-in">
              <div className="deep-dive-grid">
                <div className="deep-dive-copy">
                  <span className="deep-dive-category-tag dev">
                    <Terminal size={13} />
                    <span>THE ENGINEERING PHILOSOPHY</span>
                  </span>

                  <h3 className="deep-dive-title">
                    Zero-Friction Solo Architecture
                  </h3>

                  <p className="deep-dive-body">
                    I believe great software doesn't come from fragmented hand-offs between siloed teams. 
                    By mastering the full stack—from normalized PostgreSQL schemas, atomic database transactions, 
                    and FastAPI endpoints to tactile UI components and intelligent LLM function calling—I ship 
                    resilient applications with speed and structural integrity.
                  </p>

                  <div className="deep-dive-features">
                    <div className="deep-feature-card">
                      <div className="feature-icon-box dev">
                        <Cpu size={16} />
                      </div>
                      <div>
                        <h4>Deterministic Intelligence</h4>
                        <p>Architecting RAG pipelines, OCR extraction models, and state machine agents with automated verification gates.</p>
                      </div>
                    </div>

                    <div className="deep-feature-card">
                      <div className="feature-icon-box dev">
                        <Layers size={16} />
                      </div>
                      <div>
                        <h4>Relational Precision</h4>
                        <p>Strict PostgreSQL schemas, sector aggregation queries, and sub-millisecond data indexing for mission-critical deployments.</p>
                      </div>
                    </div>
                  </div>

                  <div className="deep-dive-cta-row">
                    <button onClick={handleSelectDev} className="intro-primary-btn dev">
                      <Terminal size={14} />
                      <span>Explore Developer Projects</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Interactive Mini Terminal Card */}
                <div className="deep-dive-visual">
                  <div className="intro-terminal-mockup">
                    <div className="terminal-header">
                      <div className="terminal-dots">
                        <span className="dot red" />
                        <span className="dot amber" />
                        <span className="dot green" />
                      </div>
                      <span className="terminal-title">sunny@hyperstudio: ~/stack-overview</span>
                      <span className="terminal-env-tag">NODE 22 // PG 16</span>
                    </div>

                    <div className="terminal-body font-mono">
                      <p className="term-line comment">// Sunny Haokip — Systems Profile</p>
                      <p className="term-line">
                        <span className="kw">const</span> developer = &#123;
                      </p>
                      <p className="term-line indent">
                        name: <span className="str">"{personal.name}"</span>,
                      </p>
                      <p className="term-line indent">
                        education: <span className="str">"BPIT Computer Science (2023-2027)"</span>,
                      </p>
                      <p className="term-line indent">
                        location: <span className="str">"{personal.location}"</span>,
                      </p>
                      <p className="term-line indent">
                        provenance: [
                      </p>
                      <p className="term-line indent-2">
                        <span className="str">"Government Financial Oversight (NERCORMP)"</span>,
                      </p>
                      <p className="term-line indent-2">
                        <span className="str">"TechBaton AI Platform &amp; OCR Research"</span>,
                      </p>
                      <p className="term-line indent-2">
                        <span className="str">"Intelligent Multi-Step LLM Agents"</span>
                      </p>
                      <p className="term-line indent">],</p>
                      <p className="term-line indent">
                        status: <span className="accent">"READY_FOR_PRODUCTION"</span>
                      </p>
                      <p className="term-line">&#125;;</p>
                      <p className="term-line output">
                        &gt; System check: 0 vulnerabilities, 100% solo velocity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: THE DIRECTOR (Deep Dive into Filmmaking) */}
          {activeTab === 'cinema' && (
            <div className="intro-cinema-deep-dive animate-fade-in">
              <div className="deep-dive-grid">
                <div className="deep-dive-copy">
                  <span className="deep-dive-category-tag film">
                    <Clapperboard size={13} />
                    <span>THE CINEMATIC MANIFESTO</span>
                  </span>

                  <h3 className="deep-dive-title">
                    Light, Texture &amp; Rhythm
                  </h3>

                  <p className="deep-dive-body">
                    Cinema is the language of sensory resonance. Whether packing solo run-and-gun cinema rigs 
                    into Himalayan valleys for "Welcome to Jibhi", or sculpting high-velocity creator reels with 
                    frame-accurate match cuts, I treat light, cadence, and sound design as visceral engineering components.
                  </p>

                  <div className="deep-dive-features">
                    <div className="deep-feature-card">
                      <div className="feature-icon-box film">
                        <Camera size={16} />
                      </div>
                      <div>
                        <h4>Solo Direction &amp; Natural Light</h4>
                        <p>Handling direction, cinematography, and grading as an uncompromised solo vision with 4K 10-bit prime glass.</p>
                      </div>
                    </div>

                    <div className="deep-feature-card">
                      <div className="feature-icon-box film">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <h4>Rhythm-Locked Post Production</h4>
                        <p>Rhythmic sound design, speed ramps, customized After Effects typographic callouts, and DaVinci Resolve color.</p>
                      </div>
                    </div>
                  </div>

                  <div className="deep-dive-cta-row">
                    <button onClick={handleSelectFilm} className="intro-primary-btn film">
                      <Clapperboard size={14} />
                      <span>View Cinema Portfolio</span>
                      <ArrowRight size={14} />
                    </button>
                    {onOpenShowreel && (
                      <button onClick={onOpenShowreel} className="intro-secondary-btn">
                        <Play size={13} fill="currentColor" />
                        <span>Watch Reel (02:15)</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Film Celluloid Mockup */}
                <div className="deep-dive-visual">
                  <div className="intro-film-slate-card">
                    <div className="slate-top-bar">
                      <span className="slate-badge">SCENE 01 // 24 FPS</span>
                      <span className="slate-badge">ANAMORPHIC 2.39:1</span>
                      <span className="slate-badge">REC ●</span>
                    </div>

                    <div className="slate-preview-box">
                      <img 
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop" 
                        alt="Cinematic Mountain Landscape"
                        className="slate-img"
                      />
                      <div className="slate-gradient-overlay" />
                      <div className="slate-caption">
                        <span className="slate-title">Welcome to Jibhi</span>
                        <span className="slate-sub">Himachal Pradesh • Solo Direction</span>
                      </div>
                    </div>

                    <div className="slate-meta-row font-mono">
                      <span>FPS: 24.00</span>
                      <span>SHUTTER: 1/48</span>
                      <span>COLOR: DAVINCI WIDE GAMUT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXPEDITIONS (Timeline & Milestones) */}
          {activeTab === 'timeline' && (
            <div className="intro-timeline-view animate-fade-in">
              <div className="timeline-header-wrap">
                <h3 className="timeline-section-title">Lived Chapters &amp; Milestones</h3>
                <p className="timeline-section-desc">
                  A chronicle of academic grounding, engineering shipments, and cinematic expeditions.
                </p>
              </div>

              <div className="timeline-track">
                {/* Milestone 1 */}
                <div className="timeline-card">
                  <div className="timeline-dot" />
                  <div className="timeline-date-badge font-mono">2023 — 2027</div>
                  <h4 className="timeline-card-title">Computer Science Engineering</h4>
                  <p className="timeline-card-inst">Bhagwan Parshuram Institute of Technology (BPIT), Delhi</p>
                  <p className="timeline-card-desc">
                    Deep immersion into data structures, algorithms, operating systems, and distributed system design. 
                    Building the structural mathematical foundation for high-performance software.
                  </p>
                </div>

                {/* Milestone 2 */}
                <div className="timeline-card highlight-film">
                  <div className="timeline-dot film" />
                  <div className="timeline-date-badge font-mono film">2024 — 2025</div>
                  <h4 className="timeline-card-title">Solo Cinema: "Welcome to Jibhi"</h4>
                  <p className="timeline-card-inst">Himachal Pradesh Travel Expedition</p>
                  <p className="timeline-card-desc">
                    Traveled solo with a 4K prime rig, gimbal, and 32-bit float audio kit. Directed, shot, edited, 
                    and graded an atmospheric narrative spotlight capturing mountain silence and pine canopy mist.
                  </p>
                </div>

                {/* Milestone 3 */}
                <div className="timeline-card highlight-dev">
                  <div className="timeline-dot dev" />
                  <div className="timeline-date-badge font-mono dev">2025</div>
                  <h4 className="timeline-card-title">NERCORMP Fund Tracker Deployment</h4>
                  <p className="timeline-card-inst">Government Undertaking Financial Oversight</p>
                  <p className="timeline-card-desc">
                    Solo-engineered an institutional financial tracker deployed for NERCORMP. Features PostgreSQL schema 
                    rigor, overdue disbursement flags, and real-time administrative audit transparency.
                  </p>
                </div>

                {/* Milestone 4 */}
                <div className="timeline-card">
                  <div className="timeline-dot" />
                  <div className="timeline-date-badge font-mono">2025 — 2026</div>
                  <h4 className="timeline-card-title">AI Platform &amp; Brand Architecture</h4>
                  <p className="timeline-card-inst">TechBaton &amp; Commercial Partnerships</p>
                  <p className="timeline-card-desc">
                    Crafted complete company UI and logo identity; conducted OCR model research, RAG pipeline integration, 
                    and commercial creator edits (including Techburner collaboration).
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
