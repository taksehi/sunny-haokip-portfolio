import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import PixelArtLanding from './components/gateway/PixelArtLanding';
import IntroStorySection from './components/gateway/IntroStorySection';
import DisciplineSelector from './components/gateway/DisciplineSelector';
import AmbientCanvas from './components/gateway/AmbientCanvas';
import DevShowcase from './components/dev/DevShowcase';
import FilmShowcase from './components/film/FilmShowcase';
import AboutSection from './components/shared/AboutSection';
import ContactSection from './components/shared/ContactSection';
import Footer from './components/shared/Footer';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { useGamepadNavigation } from './hooks/useGamepadNavigation';
// Dynamic code splitting for heavy modal components
const ProjectModal = lazy(() => import('./components/shared/ProjectModal'));
const RecruiterModal = lazy(() => import('./components/shared/RecruiterModal'));

function PortfolioApp() {
  const {
    activeMode,
    setActiveMode,
    personal,
    devProjects,
    filmProjects,
    devSkills,
    filmGear,
    showreel,
    selectedProject,
    modalType,
    isModalOpen,
    isRecruiterModalOpen,
    setIsRecruiterModalOpen,
    openDevProject,
    openFilmProject,
    openShowreel,
    closeModal
  } = usePortfolio();

  const { gamepadConnected } = useGamepadNavigation({
    onToggleMode: setActiveMode,
    activeMode,
    closeModal,
    isModalOpen
  });

  // Smooth programmatic scroll interpolation with user interruption and accessibility support
  const smoothScrollTo = (targetY, duration = 850) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, targetY);
      return;
    }

    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    if (Math.abs(distance) < 5) return;
    const startTime = performance.now();
    let isCancelled = false;

    const cancel = () => {
      isCancelled = true;
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
    };

    window.addEventListener('wheel', cancel, { passive: true, once: true });
    window.addEventListener('touchstart', cancel, { passive: true, once: true });

    const step = (now) => {
      if (isCancelled) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeInOutCubic: buttery acceleration and deceleration
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.removeEventListener('wheel', cancel);
        window.removeEventListener('touchstart', cancel);
      }
    };

    requestAnimationFrame(step);
  };

  const handleSelectModeAndScroll = (mode) => {
    setActiveMode(mode);
    setTimeout(() => {
      const el = document.getElementById('showcase-area');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 68;
        smoothScrollTo(top, 900);
      }
    }, 60);
  };

  const handleScrollToIntro = () => {
    const el = document.getElementById('intro-story');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 68;
      smoothScrollTo(top, 850);
    }
  };

  const handleScrollToSelector = () => {
    const el = document.getElementById('discipline-selector');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 68;
      smoothScrollTo(top, 850);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Ambient background atmosphere layer for showcase sections */}
      <div className="bg-ambient-layer">
        <div className="subtle-grid" />
        <AmbientCanvas activeMode={activeMode} />
      </div>

      {/* Navigation Header */}
      <Navbar
        activeMode={activeMode}
        onToggleMode={setActiveMode}
        personal={personal}
        onOpenRecruiterModal={() => setIsRecruiterModalOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {/* Screen 1: CoFounder-Inspired Animated Pixel Art Landing Cover */}
        <PixelArtLanding
          onSelectMode={handleSelectModeAndScroll}
          onScrollDown={handleScrollToIntro}
          onOpenShowreel={openShowreel}
        />

        {/* Screen 2: Two-Option Choice Gateway [ Dev ] [ Film ] */}
        <IntroStorySection
          personal={personal}
          activeMode={activeMode}
          onSelectMode={handleSelectModeAndScroll}
          onOpenShowreel={openShowreel}
        />

        <DisciplineSelector
          activeMode={activeMode}
          onSelectMode={setActiveMode}
        />

        {/* Screen 3: Selected Discipline Showcase World */}
        <div id="showcase-area" style={{ scrollMarginTop: '5rem' }}>
          <div key={activeMode} className="showcase-mode-transition">
            {activeMode === 'dev' ? (
              <DevShowcase
                projects={devProjects}
                skills={devSkills}
                onSelectProject={openDevProject}
              />
            ) : (
              <FilmShowcase
                projects={filmProjects}
                gear={filmGear}
                showreel={showreel}
                onSelectProject={openFilmProject}
                onOpenShowreel={openShowreel}
              />
            )}
          </div>
        </div>

        {/* Shared Creative & Technical Philosophy */}
        <AboutSection
          personal={personal}
          activeMode={activeMode}
        />

        {/* Interactive Inquiries */}
        <ContactSection
          personal={personal}
          activeMode={activeMode}
        />
      </main>

      {/* Footer */}
      <Footer
        personal={personal}
        activeMode={activeMode}
      />

      {/* Unified Case Study & Video Player Modal */}
      {isModalOpen && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            type={modalType}
            onClose={closeModal}
          />
        </Suspense>
      )}

      {/* Recruiter Lens Dossier & Clean ATS Resume Exporter */}
      {isRecruiterModalOpen && (
        <Suspense fallback={null}>
          <RecruiterModal
            isOpen={isRecruiterModalOpen}
            onClose={() => setIsRecruiterModalOpen(false)}
            personal={personal}
            devProjects={devProjects}
            filmProjects={filmProjects}
          />
        </Suspense>
      )}

      {/* Smart TV / Console Gamepad HUD Badge */}
      {gamepadConnected && (
        <div style={{
          position: 'fixed',
          bottom: '1.25rem',
          right: '1.25rem',
          zIndex: 90,
          background: 'rgba(10, 10, 10, 0.92)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--action-primary)',
          color: '#faf8f5',
          borderRadius: '9999px',
          padding: '0.45rem 1rem',
          fontSize: '0.74rem',
          fontFamily: 'var(--font-mono)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)'
        }}>
          <span>🎮 TV CONTROLLER: D-Pad Scroll • (B) Close • (LB/RB) Mode</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
