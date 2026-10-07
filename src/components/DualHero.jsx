import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, Compass, Terminal, Film, Sliders, Ratio, Check, Clock, Cpu, Eye } from 'lucide-react';

export default function DualHero({ activeMode, onToggleMode, personal, onOpenShowreel }) {
  const isDev = activeMode === 'dev';

  // Live Local Time Clock
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Developer Interactive Terminal State
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'Hyperstudio Architecture Console v2.5 initialized.' },
    { type: 'system', text: 'Type a command or click a quick chip below:' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalBottomRef = useRef(null);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...terminalHistory, { type: 'user', text: `sunny@terminal:~$ ${cmd}` }];

    if (trimmed === 'clear') {
      setTerminalHistory([]);
      setInputVal('');
      return;
    } else if (trimmed === 'skills' || trimmed === 'stack') {
      newHistory.push({
        type: 'response',
        text: 'CORE ARCHITECTURE:\n  • Frontend: React, Next.js, TypeScript, Three.js / WebGL, Tailwind\n  • Backend: Node.js, FastAPI (Python), Redis Streams, PostgreSQL\n  • Systems: Docker, WebSockets, Event-driven Queues, AWS S3'
      });
    } else if (trimmed === 'projects' || trimmed === 'repos') {
      newHistory.push({
        type: 'response',
        text: 'FEATURED REPOSITORIES:\n  [1] Lumina Studio Engine — WebGL Color & Lighting Suite\n  [2] PulseFlow API — Distributed Asynchronous Task Queue\n  [3] Chronicle CMS — Real-Time Collaborative Headless Studio'
      });
    } else if (trimmed === 'benchmark') {
      newHistory.push({
        type: 'response',
        text: 'RUNNING CLIENT TELEMETRY BENCHMARK...\n  ✓ Shader Pipeline: 60.0 FPS stable\n  ✓ Queue Latency: 3.4ms\n  ✓ Memory Heap: 24.8 MB\n  RESULT: Optimal'
      });
    } else if (trimmed === 'help') {
      newHistory.push({
        type: 'response',
        text: 'AVAILABLE COMMANDS:\n  skills     - View engineering stack & systems radar\n  projects   - Inspect featured software repositories\n  benchmark  - Execute live performance diagnostics\n  clear      - Clear the console buffer'
      });
    } else {
      newHistory.push({
        type: 'response',
        text: `Command not recognized: '${trimmed}'. Type 'help' for available commands.`
      });
    }

    setTerminalHistory(newHistory);
    setInputVal('');
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  // Filmmaker Living Canvas State
  const [aspectRatio, setAspectRatio] = useState('2.39 / 1'); // '2.39 / 1' | '16 / 9' | '4 / 3'
  const [aspectName, setAspectName] = useState('2.39:1 Anamorphic');
  const [activeLut, setActiveLut] = useState('graded'); // 'graded' | 'raw-log'

  const handleSetAspect = (ratio, name) => {
    setAspectRatio(ratio);
    setAspectName(name);
  };

  return (
    <section id="hero" style={{
      padding: '4.5rem 0 3.5rem',
      position: 'relative'
    }}>
      <div className="container">
        {/* Dynamic Telemetry Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          borderBottom: '1px solid var(--border-hairline)',
          paddingBottom: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: 'var(--tracking-code)'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: isDev ? 'var(--accent-compass)' : 'var(--action-primary)'
            }}></span>
            <span>STATUS: {personal.status}</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '0.78rem',
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: 'var(--tracking-code)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={13} />
              <span>SF // {timeStr || '12:00:00'} PST</span>
            </div>
            <div>LATENCY: 3.4MS</div>
            <div>SYS: {isDev ? 'HYPERSTUDIO' : 'aF-1 NOIR'}</div>
          </div>
        </div>

        {/* Dynamic Editorial Headline Area */}
        <div className="hero-fade-enter" key={activeMode} style={{ maxWidth: '980px', marginBottom: '2.5rem' }}>
          {isDev ? (
            <div>
              <div style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.011em',
                marginBottom: '1.25rem',
                color: 'var(--text-primary)'
              }}>
                Systems & algorithms carved in light on obsidian.
              </div>
              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: '720px',
                fontWeight: 400
              }}>
                {personal.taglineDev} Architecting resilient microservices, high-throughput pipelines, and real-time WebGL engines with hairline precision.
              </p>
            </div>
          ) : (
            <div>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 6vw, 4.6rem)',
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: '-0.018em',
                marginBottom: '1.25rem',
                color: 'var(--text-primary)'
              }}>
                Remember when every shot was a moment to cherish?
              </div>
              <p style={{
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: '720px',
                fontWeight: 400
              }}>
                {personal.taglineFilm} Capturing light through anamorphic glass, sculpting emotional tempo in the edit suite, and delivering bespoke film color grades.
              </p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          {isDev ? (
            <>
              <a href="#projects" className="btn btn-primary">
                <span>Explore Repositories</span>
                <ArrowRight size={15} />
              </a>

              <button
                onClick={() => onToggleMode('film')}
                className="btn btn-outline"
              >
                <span>Switch to Filmmaker Mode</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onOpenShowreel}
                className="btn btn-primary"
              >
                <Play size={15} fill="currentColor" />
                <span>Watch 2025 Showreel</span>
              </button>

              <button
                onClick={() => onToggleMode('dev')}
                className="btn btn-outline"
              >
                <span>Switch to Developer Mode</span>
              </button>
            </>
          )}
        </div>

        {/* ========================================================= */}
        {/* DYNAMIC WIDGET SECTION: TERMINAL (DEV) vs LIVING FRAME (FILM) */}
        {/* ========================================================= */}
        {isDev ? (
          /* DEVELOPER MODE: Interactive Terminal Blueprint */
          <div className="editorial-panel" style={{
            background: 'var(--bg-deep)',
            border: '1px solid var(--border-hairline)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            {/* Terminal Header Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 1rem',
              borderBottom: '1px solid var(--border-hairline)',
              background: 'var(--bg-canvas)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff5f56' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ffbd2e' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#27c93f' }} />
                <span style={{
                  marginLeft: '0.5rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-faint)',
                  letterSpacing: 'var(--tracking-code)'
                }}>
                  terminal-cli v2.5 — ~/sunny-haokip (main)
                </span>
              </div>

              <div style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-compass)',
                letterSpacing: 'var(--tracking-code)'
              }}>
                INTERACTIVE CLI
              </div>
            </div>

            {/* Quick Command Chips */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              padding: '0.75rem 1rem',
              borderBottom: '1px solid var(--border-hairline)',
              background: 'rgba(255, 255, 255, 0.015)'
            }}>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', alignSelf: 'center', marginRight: '0.25rem' }}>
                Quick Run:
              </span>
              {['skills', 'projects', 'benchmark', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '4px',
                    padding: '0.2rem 0.55rem',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--border-focus)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-hairline)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  $ {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Body */}
            <div style={{
              padding: '1.25rem',
              maxHeight: '260px',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              lineHeight: 1.6,
              color: 'var(--text-primary)'
            }}>
              {terminalHistory.map((item, index) => (
                <div key={index} style={{ marginBottom: '0.45rem' }}>
                  {item.type === 'user' ? (
                    <div style={{ color: 'var(--text-primary)' }}>{item.text}</div>
                  ) : item.type === 'system' ? (
                    <div style={{ color: 'var(--text-faint)' }}>{item.text}</div>
                  ) : (
                    <div style={{
                      color: 'var(--accent-compass)',
                      whiteSpace: 'pre-wrap',
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '4px',
                      borderLeft: '2px solid var(--accent-compass)',
                      margin: '0.35rem 0'
                    }}>
                      {item.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={terminalBottomRef} />

              {/* Live Input Line */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                <span style={{ color: 'var(--accent-compass)' }}>sunny@terminal:~$</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="type 'skills', 'benchmark', 'projects'..."
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    flex: 1
                  }}
                />
                <span className="terminal-cursor" />
              </div>
            </div>
          </div>
        ) : (
          /* FILMMAKER MODE: Living Cinema Canvas with Aspect & LUT Morphing */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Aspect Ratio & LUT Controls Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '0.65rem 1rem',
              borderRadius: '10px',
              border: '1px solid var(--border-hairline)',
              background: 'var(--bg-surface)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem'
            }}>
              {/* Aspect Ratio Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: 'var(--text-faint)' }}>FRAME FORMAT:</span>
                <button
                  onClick={() => handleSetAspect('2.39 / 1', '2.39:1 Anamorphic')}
                  style={{
                    background: aspectRatio === '2.39 / 1' ? 'rgba(0, 47, 255, 0.15)' : 'transparent',
                    border: aspectRatio === '2.39 / 1' ? '1px solid var(--action-primary)' : '1px solid var(--border-hairline)',
                    color: aspectRatio === '2.39 / 1' ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderRadius: '4px',
                    padding: '0.2rem 0.55rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  2.39:1 Anamorphic
                </button>
                <button
                  onClick={() => handleSetAspect('16 / 9', '16:9 Commercial')}
                  style={{
                    background: aspectRatio === '16 / 9' ? 'rgba(0, 47, 255, 0.15)' : 'transparent',
                    border: aspectRatio === '16 / 9' ? '1px solid var(--action-primary)' : '1px solid var(--border-hairline)',
                    color: aspectRatio === '16 / 9' ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderRadius: '4px',
                    padding: '0.2rem 0.55rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  16:9 Commercial
                </button>
                <button
                  onClick={() => handleSetAspect('4 / 3', '4:3 Vintage Grain')}
                  style={{
                    background: aspectRatio === '4 / 3' ? 'rgba(0, 47, 255, 0.15)' : 'transparent',
                    border: aspectRatio === '4 / 3' ? '1px solid var(--action-primary)' : '1px solid var(--border-hairline)',
                    color: aspectRatio === '4 / 3' ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderRadius: '4px',
                    padding: '0.2rem 0.55rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  4:3 Vintage
                </button>
              </div>

              {/* Color Grade LUT Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: 'var(--text-faint)' }}>COLOR GRADE:</span>
                <button
                  onClick={() => setActiveLut('graded')}
                  style={{
                    background: activeLut === 'graded' ? 'rgba(0, 47, 255, 0.15)' : 'transparent',
                    border: activeLut === 'graded' ? '1px solid var(--action-primary)' : '1px solid var(--border-hairline)',
                    color: activeLut === 'graded' ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderRadius: '4px',
                    padding: '0.2rem 0.55rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  Final Film Grade
                </button>
                <button
                  onClick={() => setActiveLut('raw-log')}
                  style={{
                    background: activeLut === 'raw-log' ? 'rgba(0, 47, 255, 0.15)' : 'transparent',
                    border: activeLut === 'raw-log' ? '1px solid var(--action-primary)' : '1px solid var(--border-hairline)',
                    color: activeLut === 'raw-log' ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderRadius: '4px',
                    padding: '0.2rem 0.55rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  Camera RAW S-Log3
                </button>
              </div>
            </div>

            {/* Living Cinema Frame */}
            <div
              onClick={onOpenShowreel}
              style={{
                width: '100%',
                aspectRatio: aspectRatio,
                borderRadius: 'var(--radius-media)',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid var(--border-hairline)',
                background: '#040404',
                cursor: 'pointer',
                transition: 'aspect-ratio var(--transition-smooth)'
              }}
            >
              {/* Silent Looping HD Footage with Dynamic LUT */}
              <video
                src="https://assets.mixkit.co/videos/preview/mixkit-tokyo-traffic-at-night-4228-large.mp4"
                loop
                autoPlay
                muted
                playsInline
                className={activeLut === 'graded' ? 'lut-graded' : 'lut-raw-log'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Vignette Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)',
                pointerEvents: 'none'
              }} />

              {/* Center Trigger */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                <div style={{
                  background: 'var(--action-primary)',
                  color: 'var(--action-text)',
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(0, 47, 255, 0.4)'
                }}>
                  <Play size={22} fill="currentColor" style={{ marginLeft: '2px' }} />
                </div>
              </div>

              {/* Frame Metadata Cues */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.5rem',
                display: 'flex',
                gap: '0.5rem',
                pointerEvents: 'none'
              }}>
                <span className="meta-tag">{aspectName}</span>
                <span className="meta-tag">
                  {activeLut === 'graded' ? 'LUT: KODAK 2383 D65' : 'RAW: SONY S-LOG3'}
                </span>
                <span className="meta-tag">24.000 FPS</span>
              </div>

              <div style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#ffffff',
                letterSpacing: 'var(--tracking-code)',
                pointerEvents: 'none'
              }}>
                CLICK TO LAUNCH COMPLETE 2025 SHOWREEL
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
