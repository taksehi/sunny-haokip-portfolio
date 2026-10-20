import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Clapperboard, Power, BookOpen, Radio, Monitor, Volume2 } from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';
import './InteractiveLaptop.css';

/**
 * 8-Bit Retro Interactive Laptop Component
 * 
 * Flow:
 * 1. Meadow Placement: Sits naturally on the meadow turf next to the notebook
 * 2. Perspective: Positive yaw matching the receding perspective of the notebook
 * 3. Boot State:
 *    - Off state with Unlock button
 *    - BIOS check displays:
 *      * Name: Sunny Haokip
 *      * What I do: Full-Stack Dev & AI Engineer • Filmmaker
 *      * What I like: Autonomous Agents • 35mm Cinema • Tactile Systems
 *      * System ready.
 * 4. Desktop State:
 *    - Blank screen with 4 icons like a normal Windows home page
 *    - Classic Windows taskbar with Start button, active task, and clock
 */
export default function InteractiveLaptop({
  scrollProgress = 0,
  onSelectMode,
  onOpenShowreel,
  activeMode = 'dev',
  laptopGlowIntensity = 0
}) {
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [bootStep, setBootStep] = useState(0); // 0 = off, 1 = crt flicker, 2 = bios check, 3 = windows desktop
  const [bootText, setBootText] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState('dev');
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const rigRef = useRef(null);
  const bootTimersRef = useRef([]);

  // Clean up any ongoing boot timeouts if component unmounts
  useEffect(() => {
    return () => {
      bootTimersRef.current.forEach(clearTimeout);
      bootTimersRef.current = [];
    };
  }, []);

  // Sync selected icon if external activeMode changes
  useEffect(() => {
    if (activeMode) setSelectedIcon(activeMode === 'dev' ? 'dev' : 'film');
  }, [activeMode]);

  // Subtle spring mouse parallax tilt when laptop is open (progress > 0.5)
  const handleMouseMove = (e) => {
    if (scrollProgress < 0.5) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setMouseTilt({
      x: Math.max(-3, Math.min(3, deltaY * -3)),
      y: Math.max(-4, Math.min(4, deltaX * 4))
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // 4 Desktop Program Icons (Like a normal Windows home page)
  const desktopIcons = [
    {
      id: 'dev',
      title: 'Dev Systems',
      filename: 'DEV_SYS.EXE',
      icon: Terminal,
      color: '#8dffc4', // phosphor green
      action: () => {
        if (onSelectMode) onSelectMode('dev');
        else {
          const el = document.getElementById('showcase-area') || document.getElementById('intro-story');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      id: 'film',
      title: 'Cinema Reel',
      filename: 'CINEMA.MOV',
      icon: Clapperboard,
      color: '#ffb347', // warm amber
      action: () => {
        if (onOpenShowreel) {
          onOpenShowreel();
        } else if (onSelectMode) {
          onSelectMode('film');
        } else {
          const el = document.getElementById('showcase-area') || document.getElementById('intro-story');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      id: 'journal',
      title: 'Field Notes',
      filename: 'JOURNAL.DOC',
      icon: BookOpen,
      color: '#38bdf8', // retro cyan
      action: () => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'dispatch',
      title: 'Dispatch',
      filename: 'DISPATCH.BAT',
      icon: Radio,
      color: '#ff5fa2', // retro pink
      action: () => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  const handleIconClick = (item, e) => {
    e.stopPropagation();
    try { soundFX.playMechanicalClick(); } catch (_) {}
    setSelectedIcon(item.id);
    item.action();
  };

  // Power On / Unlock Sequence
  const handleUnlockPowerOn = (e) => {
    e.stopPropagation();
    soundFX.playMechanicalClick();
    if (isPoweredOn) return;

    setIsPoweredOn(true);
    try { soundFX.playPowerHum(); } catch (_) {}
    setBootStep(1); // CRT flash

    // Step 2: BIOS Check displaying Name, What I do, What I like, System ready
    const t0 = setTimeout(() => {
      setBootStep(2);
      const biosEntries = [
        { label: "NAME", value: "Sunny Haokip" },
        { label: "WHAT I DO", value: "Full-Stack Dev & AI Engineer • Filmmaker" },
        { label: "WHAT I LIKE", value: "Autonomous Agents • 35mm Cinema • Tactile Systems" },
        { label: "STATUS", value: "SYSTEM READY." }
      ];

      biosEntries.forEach((entry, index) => {
        const tn = setTimeout(() => {
          setBootText((prev) => [...prev, entry]);
          try { 
            if (index === 0) soundFX.playFloppySeek();
            else soundFX.playMechanicalClick(); 
          } catch (_) {}

          if (index === biosEntries.length - 1) {
            // After System Ready, pause 1200ms so user can read it, then transition to Windows desktop
            const tFinal = setTimeout(() => {
              setBootStep(3); // Desktop ready state
              window.dispatchEvent(new CustomEvent('laptop:on', { detail: { ready: true } }));
            }, 1200);
            bootTimersRef.current.push(tFinal);
          }
        }, (index + 1) * 380);
        bootTimersRef.current.push(tn);
      });
    }, 450);
    bootTimersRef.current.push(t0);
  };

  // Calculate 3D transformation values based on scroll progress (0.0 = Closed on meadow, 1.0 = Centered Open)
  const p = Math.max(0, Math.min(1, scrollProgress));

  // --- 1. Natural Meadow Placement ---
  // Grounded naturally on the meadow turf beside the notebook with zero gap
  // Isometric angles coplanar with the grass slope (rx: 58deg, ry: -13deg, rz: -3deg)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const initialTx = isMobile ? 4.0 : 9.5;
  const initialTy = isMobile ? 24.5 : 26.8;
  const initialScale = isMobile ? 0.50 : 0.58;

  const tx = initialTx * (1 - p);
  const ty = initialTy * (1 - p) + 16.0 * p;
  const tz = -6 * (1 - p) + 18 * p;

  // --- 2. Screen Facing Viewer (Zero Tilt when Open, Rock Solid Level) ---
  // Closed at 58deg pitch matching lawn slope -> transitions to 64deg pitch when open.
  // Yaw (ry) and roll (rz) square up smoothly to exactly 0deg as the laptop opens into center stage.
  const alignProgress = Math.min(1, p / 0.45);
  const rx = 58 * (1 - p) + 64 * p;
  const ry = -13 * (1 - alignProgress);
  const rz = -3 * (1 - alignProgress);

  // Lid angle:
  // Closed = 0deg (folded flat over base, covering keys completely, showing retro rainbow shell)
  // Opens swiftly and smoothly into center stage so the screen faces the viewer upright
  // Full 116deg upright stance achieved cleanly by 60% scroll
  const openProgress = Math.min(1, Math.max(0, p / 0.6));
  const easeOpen = 1 - Math.pow(1 - openProgress, 2.2);
  const lidAngle = easeOpen * 116;

  // Lid & Screen Scale:
  // Exactly 1.0 at all times so the screen matches the keyboard chassis dimensions 1:1
  const lidScale = 1;

  // Rig Scale: Starts at authentic natural size (0.58) beside notebook, expands to 1.02 in center stage
  const scale = initialScale + p * (1.02 - initialScale);

  // Seamless Exit Transition at tail end of scroll (p from 0.88 to 1.0)
  // Subtle push-in through camera with smooth opacity decay so it dissolves seamlessly into the next page
  const exitProgress = Math.max(0, Math.min(1, (p - 0.88) / 0.12));
  const exitScale = 1 + exitProgress * 0.14;
  const exitTz = tz + exitProgress * 120;
  const exitOpacity = Math.max(0, 1 - exitProgress * 1.5);

  // Soft Contact Ground Shadow:
  // Tight on the grass at p=0, softens as laptop lifts into center
  const shadowOpacity = (0.75 - p * 0.35) * exitOpacity;
  const shadowScale = 1 - p * 0.15;

  // Is laptop open in center stage?
  const isFullyOpen = p > 0.65;

  return (
    <>
      {/* 3D Scroll Stage */}
      <div
        className="laptop-scroll-stage"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* 3D Master Coordinate Rig */}
        <div
          ref={rigRef}
          className="laptop-3d-rig r8-retro-casing"
          style={{
            transform: `translate3d(${tx}vw, ${ty}vh, ${exitTz}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale * exitScale})`,
            opacity: exitOpacity,
            pointerEvents: exitOpacity < 0.25 ? 'none' : 'auto',
            transformOrigin: 'center center',
            transition: 'opacity 0.1s linear'
          }}
        >
          {/* Natural Soft Contact Shadow (Directly under chassis on meadow turf) */}
          <div
            className="laptop-ground-shadow r8-meadow-shadow"
            style={{
              opacity: shadowOpacity,
              transform: `rotateX(82deg) translateZ(-26px) scale(${shadowScale})`
            }}
          />

          {/* Nocturnal Screen Light Bloom (Casts subtle neon phosphor glow on meadow grass when night falls) */}
          {laptopGlowIntensity > 0.05 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '320px',
                height: '240px',
                transform: 'translate(-50%, -15%) rotateX(80deg) translateZ(-15px)',
                background: isPoweredOn
                  ? 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.45) 0%, rgba(52, 211, 153, 0.2) 40%, transparent 75%)'
                  : 'radial-gradient(ellipse at center, rgba(147, 197, 253, 0.25) 0%, rgba(59, 130, 246, 0.12) 45%, transparent 70%)',
                filter: 'blur(22px)',
                opacity: laptopGlowIntensity * (0.4 + p * 0.6) * exitOpacity,
                pointerEvents: 'none',
                transition: 'opacity 0.6s ease'
              }}
            />
          )}

          {/* BASE / CHASSIS (Chunky Beige 8-Bit Slab & Keyboard) */}
          <div className="laptop-base r8-beige-base">
            <div className="r8-base-hinge-accent" />

            {/* Keyboard Well */}
            <div className="laptop-keyboard-well r8-retro-keyboard">
              {/* Function Row */}
              <div className="laptop-kb-row">
                <div className="laptop-key modifier r8-key-dark">ESC</div>
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="laptop-key r8-key-dark">F{i + 1}</div>
                ))}
                <div className="laptop-key modifier r8-key-dark">DEL</div>
              </div>

              {/* Number Row */}
              <div className="laptop-kb-row">
                <div className="laptop-key">~</div>
                {['1','2','3','4','5','6','7','8','9','0','-','='].map((k) => (
                  <div key={k} className="laptop-key">{k}</div>
                ))}
                <div className="laptop-key modifier r8-key-dark">BKSP</div>
              </div>

              {/* QWERTY Row */}
              <div className="laptop-kb-row">
                <div className="laptop-key modifier r8-key-dark">TAB</div>
                {['Q','W','E','R','T','Y','U','I','O','P','[',']'].map((k) => (
                  <div key={k} className="laptop-key">{k}</div>
                ))}
                <div className="laptop-key modifier r8-key-accent">RET</div>
              </div>

              {/* Home Row */}
              <div className="laptop-kb-row">
                <div className="laptop-key modifier r8-key-dark">CTRL</div>
                {['A','S','D','F','G','H','J','K','L',';','\''].map((k) => (
                  <div key={k} className="laptop-key">{k}</div>
                ))}
                <div className="laptop-key modifier r8-key-dark">SHIFT</div>
              </div>

              {/* Bottom Row with Spacebar */}
              <div className="laptop-kb-row">
                <div className="laptop-key r8-key-dark">ALT</div>
                <div className="laptop-key r8-key-dark">CODE</div>
                <div className="laptop-key spacebar r8-key-space" />
                <div className="laptop-key r8-key-dark">◄</div>
                <div className="laptop-key r8-key-dark">▲</div>
                <div className="laptop-key r8-key-dark">▼</div>
                <div className="laptop-key r8-key-dark">►</div>
              </div>
            </div>

            {/* Palm Rest with Floppy Slot & Retro Badge */}
            <div className="r8-palm-rest-bar">
              <div className="r8-floppy-bay">
                <div className="r8-floppy-slit" />
                <div className={`r8-status-led ${isPoweredOn ? 'active' : ''}`} />
              </div>

              <div className="r8-badge-plate">
                <div className="r8-mini-stripes">
                  <span className="stripe-pink" />
                  <span className="stripe-amber" />
                  <span className="stripe-green" />
                </div>
                <span className="r8-badge-label">RETRO-8 PERSONAL MICROCOMPUTER</span>
              </div>
            </div>

            {/* Glowing Screen reflection onto keyboard chassis */}
            <div
              className="laptop-keyboard-reflection"
              style={{ opacity: isPoweredOn ? 0.6 : 0.05 }}
            />
          </div>

          {/* LID & SCREEN ASSEMBLY (Hinged at top rear edge) */}
          <div
            className="laptop-lid r8-lid-assembly"
            style={{
              transform: `rotateX(${lidAngle}deg) translateZ(${p < 0.1 ? 3 : 1}px)`,
              transformOrigin: 'top center'
            }}
          >
            {/* BACK OF LID (Visible when closed at scroll = 0) */}
            <div className="laptop-lid-back r8-lid-outer-shell">
              <div className="r8-retro-rainbow-bar">
                <div className="r8-band-pink" />
                <div className="r8-band-amber" />
                <div className="r8-band-green" />
              </div>

              <div className="r8-lid-emblem-box">
                <span className="r8-emblem-main">RETRO-8</span>
                <span className="r8-emblem-sub">64KB PORTABLE SYSTEM</span>
              </div>

              <div className="r8-lid-specs-footer">
                <span>SERIES: 1984-XT</span>
                <span>CRT / DUAL 5.25"</span>
              </div>
            </div>

            {/* FRONT OF LID (Inner Display, Bezel & CRT Screen) */}
            <div
              className="laptop-lid-front r8-lid-inner-bezel"
              style={{
                opacity: p > 0.06 ? 1 : 0
              }}
            >
              {/* Top Bezel with Power LED */}
              <div className="r8-inner-bezel-top">
                <span className="r8-crt-brand">RETRO-8 HIGH RESOLUTION CRT</span>
                <div className="r8-bezel-power-group">
                  <span className={`r8-power-bulb ${isPoweredOn ? 'glow' : ''}`} />
                  <span className="r8-power-tag">POWER</span>
                </div>
              </div>

              {/* CRT Monitor Glass Container */}
              <div className={`laptop-screen-display r8-crt-frame ${bootStep === 1 ? 'crt-turning-on' : ''}`}>
                {/* CRT Scanlines Overlay */}
                <div className="r8-crt-scanlines" />
                {/* CRT Glass Curvature & Glare */}
                <div className="r8-crt-glass-glare" />

                {/* --- STATE A: SCREEN ASLEEP (OFF STATE) --- */}
                {!isPoweredOn ? (
                  <div className="r8-screen-off-wrap">
                    <div className="r8-screen-off-msg">
                      <span>[ SYSTEM SLEEPING ]</span>
                    </div>

                    {/* Unlock Button & Callout: Appears when fully open (p > 0.88) */}
                    {isFullyOpen && (
                      <div className="r8-unlock-prompt" onClick={(e) => e.stopPropagation()}>
                        <p className="r8-unlock-caption">
                          It's asleep. Press unlock to power it on.
                        </p>
                        <button
                          onClick={handleUnlockPowerOn}
                          className="r8-unlock-btn"
                          aria-label="Unlock and power on retro computer"
                          tabIndex={0}
                        >
                          <Power size={13} />
                          <span>UNLOCK &amp; POWER ON</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* --- STATE B: BOOTING & ACTIVE OS --- */
                  <div className="r8-screen-active-wrap">
                    {bootStep === 2 && (
                      <div
                        className="r8-bios-terminal"
                        onClick={() => {
                          setBootStep(3);
                          window.dispatchEvent(new CustomEvent('laptop:on', { detail: { ready: true } }));
                        }}
                        title="Click to skip to desktop"
                      >
                        <div className="r8-bios-header">
                          <span className="r8-bios-brand">RETRO-8 BIOS V1.0 (C) 1984</span>
                          <span className="r8-bios-mem">MEMORY 64K OK</span>
                        </div>
                        <div className="r8-bios-rule" />
                        <div className="r8-bios-content">
                          {bootText.map((entry, idx) => (
                            <div
                              key={idx}
                              className={`r8-bios-row ${entry.label === 'STATUS' ? 'r8-bios-ready-row' : ''}`}
                            >
                              <span className="r8-bios-tag">{entry.label}</span>
                              <span className="r8-bios-sep">:</span>
                              <span className="r8-bios-val">{entry.value}</span>
                            </div>
                          ))}
                          <span className="r8-blinking-cursor">█</span>
                        </div>
                        <div className="r8-bios-skip-hint">
                          <span>[ CLICK TO ENTER DESKTOP → ]</span>
                        </div>
                      </div>
                    )}

                    {bootStep === 3 && (
                      <div
                        className="r8-win-desktop"
                        onClick={(e) => {
                          if (!e.target.closest('.r8-win-start-button') && !e.target.closest('.r8-win-start-menu')) {
                            setIsStartMenuOpen(false);
                          }
                        }}
                      >
                        {/* 1. Blank Windows Desktop with 4 Desktop Icons on the left */}
                        <div className="r8-win-desktop-icons" role="toolbar" aria-label="Desktop icons">
                          {desktopIcons.map((item) => {
                            const IconComp = item.icon;
                            const isSelected = selectedIcon === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={(e) => handleIconClick(item, e)}
                                className={`r8-win-icon-cell ${isSelected ? 'selected' : ''}`}
                                aria-label={`Open ${item.title}`}
                                tabIndex={0}
                              >
                                <div className="r8-win-icon-graphic">
                                  <IconComp size={20} color={item.color} />
                                </div>
                                <span className="r8-win-icon-caption">{item.title}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* 2. Classic Windows Start Menu Popup */}
                        {isStartMenuOpen && (
                          <div
                            className="r8-win-start-menu"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="r8-start-menu-sidebar">
                              <span className="r8-start-side-text">SUNNY 98</span>
                            </div>
                            <div className="r8-start-menu-content">
                              {desktopIcons.map((item) => {
                                const IconComp = item.icon;
                                return (
                                  <button
                                    key={item.id}
                                    onClick={(e) => {
                                      handleIconClick(item, e);
                                      setIsStartMenuOpen(false);
                                    }}
                                    className="r8-start-menu-row"
                                  >
                                    <IconComp size={13} color={item.color} />
                                    <span>{item.title}</span>
                                  </button>
                                );
                              })}
                              <div className="r8-start-menu-divider" />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  soundFX.playMechanicalClick();
                                  setIsStartMenuOpen(false);
                                  setIsPoweredOn(false);
                                  setBootStep(0);
                                  setBootText([]);
                                }}
                                className="r8-start-menu-row sleep-row"
                              >
                                <Power size={12} color="#f43f5e" />
                                <span>Sleep / Shut Down</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 3. Classic Windows Taskbar */}
                        <div className="r8-win-taskbar">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              soundFX.playMechanicalClick();
                              setIsStartMenuOpen((prev) => !prev);
                            }}
                            className={`r8-win-start-button ${isStartMenuOpen ? 'active-pressed' : ''}`}
                            aria-label="Start menu"
                          >
                            <span className="r8-win-flag-icon">🪟</span>
                            <span>Start</span>
                          </button>

                          <div className="r8-win-active-task">
                            <Monitor size={10} color="#008080" />
                            <span>Desktop</span>
                          </div>

                          <div className="r8-win-tray-box">
                            <Volume2 size={9} color="#333333" />
                            <span className="r8-win-clock">12:00 PM</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
