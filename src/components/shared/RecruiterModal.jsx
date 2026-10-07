import React, { useState, useEffect } from 'react';
import { X, Printer, Copy, Check, Briefcase, Mail, ExternalLink, Github, Sparkles, Award, Code2, Film, ShieldCheck } from 'lucide-react';
import soundFX from '../../utils/soundEffects';

export default function RecruiterModal({ isOpen, onClose, personal, devProjects, filmProjects }) {
  const [targetRole, setTargetRole] = useState('fullstack'); // 'fullstack' | 'ai' | 'film'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const roleProfiles = {
    fullstack: {
      title: 'Full-Stack Software Engineer',
      tagline: 'Solo End-to-End Delivery • Relational DBs • Production Reliability',
      summary: 'Computer Science engineer with verified production deployments for government entities (NERCORMP). Builds solo end-to-end applications from PostgreSQL schema design and RESTful APIs to responsive Next.js interfaces with high auditability.',
      highlights: [
        '100% Solo Delivery: Built government project fund oversight system end-to-end.',
        'High-Performance Stack: Next.js 14, TypeScript, PostgreSQL (Neon Serverless), Tailwind CSS.',
        'Architecture Discipline: Relational data integrity, low-latency queries, zero data ambiguity.'
      ],
      skills: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Node.js', 'REST APIs', 'Vercel / Cloudflare', 'Tailwind CSS'],
      topProjects: [
        {
          title: 'NERCORM Project Fund Tracker',
          role: 'Solo Full-Stack Engineer',
          metric: 'Live Government Undertaking Deployment',
          desc: 'Comprehensive capital allocation and risk oversight dashboard with automated sector overdue flagging.',
          url: 'https://techbaton.com/'
        },
        {
          title: 'TechBaton Platform Ecosystem',
          role: 'Lead Full-Stack Developer',
          metric: 'End-to-End Brand, UI & Core Web Infrastructure',
          desc: 'High-performance corporate web platform engineered with Next.js and custom interactive UI components.',
          url: 'https://techbaton.com/'
        }
      ]
    },
    ai: {
      title: 'AI & Intelligent Systems Engineer',
      tagline: 'LLM Architectures • RAG Pipelines • Autonomous Agent Tooling',
      summary: 'Systems engineer researching and deploying applied machine learning pipelines. Experienced in multi-step agent tool calling, OCR token extraction, vector retrieval optimization, and hallucination reduction workflows.',
      highlights: [
        'Autonomous Agent Tooling: Architected multi-step reasoning systems with dynamic tool selection.',
        'Document Intelligence: Engineered OCR parsing pipelines for complex unstructured documentation.',
        'Production RAG: Hybrid semantic retrieval with low-latency embedding cache layers.'
      ],
      skills: ['LLM Orchestration', 'RAG Pipelines', 'Autonomous Agents', 'Python / FastAPI', 'OCR Extraction', 'Postgres + pgvector', 'Tool Calling'],
      topProjects: [
        {
          title: 'Intelligent Agentic Tool-Use Workflows',
          role: 'AI Systems Architect',
          metric: 'Multi-Step Autonomous Tool Calling',
          desc: 'Engineered self-correcting agent graphs with dynamic fallback routes and strict structured outputs.',
          url: 'https://github.com/sunnyhaokip'
        },
        {
          title: 'EdTech ML & Document Intelligence',
          role: 'ML & Data Engineer',
          metric: 'High-Accuracy OCR & Content Structuring',
          desc: 'Pipeline transforming messy raw educational documents and diagrams into clean queryable knowledge vectors.',
          url: 'https://github.com/sunnyhaokip'
        }
      ]
    },
    film: {
      title: 'Cinematographer & Commercial Editor',
      tagline: 'Sony Cinema Line • DaVinci Color • Rhythm-Locked Narrative',
      summary: 'Visual storyteller with experience directing solo-shot travel documentaries, high-energy commercial spots, and cinematic music edits. Master of DaVinci Resolve color science (S-Log3 to Kodak 500T LUTs) and After Effects motion typography.',
      highlights: [
        'Solo Run-and-Gun Mastery: High-production-value travel and commercial films captured solo.',
        'Color Science: Custom film-emulation node trees in DaVinci Resolve Studio.',
        'Kinetic Pacing: Precise musical beat-matching, sound design, and speed-ramp transitions.'
      ],
      skills: ['Sony FX/Alpha 4K', 'DaVinci Resolve Studio', 'Kodak 500T Color Science', 'Premiere Pro', 'After Effects', 'Kinetic Sound FX'],
      topProjects: [
        {
          title: 'Solo Travel Cinematic: North East India',
          role: 'Director, DP & Lead Editor',
          metric: 'Solo-Shot 4K 10-Bit Cinematic Narrative',
          desc: 'Evocative visual essay capturing the rugged mist-covered terrain and people of North East India.',
          url: 'https://drive.google.com/drive/folders/1Oy9zLg7LzFMmGiX8P5NDRuiqNh6gky7A'
        },
        {
          title: 'Cinematic Visual Showreel 2025',
          role: 'Lead Cinematographer & Colorist',
          metric: 'Multi-Project Highlight Montage',
          desc: 'Comprehensive showcase of dynamic camerawork, gimbal execution, and organic film grain grading.',
          url: 'https://drive.google.com/drive/folders/1Oy9zLg7LzFMmGiX8P5NDRuiqNh6gky7A'
        }
      ]
    }
  };

  const active = roleProfiles[targetRole];

  const handleCopyPitch = () => {
    soundFX.playMechanicalClick();
    const text = `Candidate Dossier: ${personal.name} — ${active.title}\n` +
      `Summary: ${active.summary}\n` +
      `Education: ${personal.education.degree}, ${personal.education.institution} (${personal.education.period})\n` +
      `Email: ${personal.socials.email} | Portfolio: https://sunny-haokip.vercel.app/`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    soundFX.playMechanicalClick();
    window.print();
  };

  return (
    <div
      className="modal-backdrop-custom"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        className="editorial-panel recruiter-dossier-card"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-hairline)',
          borderRadius: '12px',
          padding: 'clamp(1.25rem, 3vw, 2.25rem)',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid var(--border-hairline)',
          paddingBottom: '1.25rem',
          marginBottom: '1.5rem',
          gap: '1rem'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-compass)',
              letterSpacing: 'var(--tracking-code)',
              textTransform: 'uppercase',
              marginBottom: '0.4rem'
            }}>
              <ShieldCheck size={14} />
              <span>// RECRUITER DOSSIER & VERIFIED METRICS</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              {personal.name}
            </h2>
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginTop: '0.2rem'
            }}>
              {personal.education.institution} • {personal.education.degree} ({personal.education.period})
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handlePrint}
              title="Print Clean ATS PDF Sheet"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-hairline)',
                color: 'var(--text-primary)',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              <Printer size={14} />
              <span className="desktop-only">Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-hairline)',
                color: 'var(--text-muted)',
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Target Role Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.75rem',
          padding: '0.35rem',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
          border: '1px solid var(--border-hairline)'
        }}>
          {[
            { id: 'fullstack', label: 'Full-Stack Engineer', icon: <Code2 size={13} /> },
            { id: 'ai', label: 'AI & Agent Systems', icon: <Sparkles size={13} /> },
            { id: 'film', label: 'Cinema & Video Director', icon: <Film size={13} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playMechanicalClick();
                setTargetRole(tab.id);
              }}
              style={{
                flex: 1,
                minWidth: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                padding: '0.55rem 0.75rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: targetRole === tab.id ? 500 : 400,
                background: targetRole === tab.id ? 'var(--text-primary)' : 'transparent',
                color: targetRole === tab.id ? '#000000' : 'var(--text-muted)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Role Executive Summary */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-hairline)',
          borderRadius: '8px',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-code)',
            marginBottom: '0.4rem'
          }}>
            // Role Value Proposition
          </div>
          <div style={{
            fontSize: '1.05rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            {active.tagline}
          </div>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            margin: 0
          }}>
            {active.summary}
          </p>
        </div>

        {/* Verifiable Proof Points */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-code)',
            marginBottom: '0.75rem'
          }}>
            // Verified Highlights & Impact
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {active.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.5
                }}
              >
                <div style={{
                  color: 'var(--accent-compass)',
                  flexShrink: 0,
                  marginTop: '0.2rem'
                }}>
                  •
                </div>
                <div>{h}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Case Studies for this Role */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-code)',
            marginBottom: '0.75rem'
          }}>
            // Key Selected Deliverables
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
            {active.topProjects.map((p, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '6px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent-compass)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.25rem'
                  }}>
                    {p.metric}
                  </div>
                  <div style={{ fontWeight: 500, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
                    {p.desc}
                  </div>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.78rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none'
                  }}
                >
                  <span>View Proof / Link</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Pills */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-code)',
            marginBottom: '0.65rem'
          }}>
            // Primary Stack & Tooling
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {active.skills.map((s, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.78rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-hairline)',
                  color: 'var(--text-primary)'
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-hairline)'
        }}>
          <button
            onClick={handleCopyPitch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'transparent',
              border: '1px solid var(--border-hairline)',
              color: 'var(--text-primary)',
              padding: '0.55rem 1rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            {copied ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Recruiter One-Pager'}</span>
          </button>

          <a
            href={`mailto:${personal.socials.email}?subject=Interview%20Inquiry%20for%20${encodeURIComponent(active.title)}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'var(--text-primary)',
              color: '#000000',
              textDecoration: 'none',
              padding: '0.55rem 1.15rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            <Mail size={14} />
            <span>Contact Candidate Directly</span>
          </a>
        </div>
      </div>
    </div>
  );
}
