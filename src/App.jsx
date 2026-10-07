import React from 'react';
import Navbar from './components/Navbar';
import PixelArtLanding from './components/gateway/PixelArtLanding';
import DisciplineSelector from './components/gateway/DisciplineSelector';
import AmbientCanvas from './components/gateway/AmbientCanvas';
import DevShowcase from './components/dev/DevShowcase';
import FilmShowcase from './components/film/FilmShowcase';
import AboutSection from './components/shared/AboutSection';
import ContactSection from './components/shared/ContactSection';
import Footer from './components/shared/Footer';
import ProjectModal from './components/shared/ProjectModal';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

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
    openDevProject,
    openFilmProject,
    openShowreel,
    closeModal
  } = usePortfolio();

  const handleSelectModeAndScroll = (mode) => {
    setActiveMode(mode);
    setTimeout(() => {
      const el = document.getElementById('showcase-area');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleScrollToSelector = () => {
    const el = document.getElementById('discipline-selector');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {/* Screen 1: CoFounder-Inspired Animated Pixel Art Landing Cover */}
        <PixelArtLanding
          onSelectMode={handleSelectModeAndScroll}
          onScrollDown={handleScrollToSelector}
          onOpenShowreel={openShowreel}
        />

        {/* Screen 2: Two-Option Choice Gateway [ Dev ] [ Film ] */}
        <DisciplineSelector
          activeMode={activeMode}
          onSelectMode={setActiveMode}
        />

        {/* Screen 3: Selected Discipline Showcase World */}
        <div id="showcase-area" style={{ scrollMarginTop: '5rem' }}>
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
        <ProjectModal
          project={selectedProject}
          type={modalType}
          onClose={closeModal}
        />
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
