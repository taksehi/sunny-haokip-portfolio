import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioData as initialData } from '../data/portfolioData';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  // Current active persona: 'dev' (Developer) or 'film' (Videographer/Editor)
  const [activeMode, setActiveMode] = useState('dev');

  // Dynamic portfolio data state (synced with Neon DB if configured)
  const [data, setData] = useState(initialData);
  const [dataSource, setDataSource] = useState('static'); // 'static' | 'neon'

  // Modal state
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalType, setModalType] = useState('dev');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [devFilter, setDevFilter] = useState('All');
  const [filmFilter, setFilmFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch dynamic portfolio data from Neon API endpoint on mount
  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(resData => {
        if (resData && resData.devProjects && resData.filmProjects) {
          setData(prev => ({
            ...prev,
            devProjects: resData.devProjects,
            filmProjects: resData.filmProjects,
            personal: resData.personal || prev.personal,
            devSkills: resData.devSkills || prev.devSkills,
            filmGear: resData.filmGear || prev.filmGear,
            showreel: resData.showreel || prev.showreel
          }));
          setDataSource(resData.source || 'static');
        }
      })
      .catch(err => {
        console.info('Using static portfolio data (Neon offline or unconfigured).', err.message);
      });
  }, []);

  // Synchronize CSS class on document body for theme styling
  useEffect(() => {
    document.body.classList.remove('mode-dev', 'mode-film');
    document.body.classList.add(`mode-${activeMode}`);
  }, [activeMode]);

  // Modal Handlers
  const openDevProject = (project) => {
    setSelectedProject(project);
    setModalType('dev');
    setIsModalOpen(true);
  };

  const openFilmProject = (project) => {
    setSelectedProject(project);
    setModalType('film');
    setIsModalOpen(true);
  };

  const openShowreel = () => {
    setSelectedProject({
      title: data.showreel.title,
      category: "Cinematography & Editorial",
      aspectRatio: "2.39:1 Cinematic",
      duration: data.showreel.duration,
      role: "Director of Photography • Lead Editor • Colorist",
      description: data.showreel.description,
      longDescription: "A comprehensive montage demonstrating range across commercial spots, narrative visual essays, syncopated kinetic cuts, and custom DaVinci Resolve color grading.",
      embedUrl: data.showreel.embedUrl,
      gear: "Sony FX3 + RED Komodo + DaVinci Resolve Studio",
      awards: "Featured Showreel 2025"
    });
    setModalType('film');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Filtered lists
  const filteredDevProjects = data.devProjects.filter((item) => {
    const matchesCategory = devFilter === 'All' || item.category.toLowerCase().includes(devFilter.toLowerCase());
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const filteredFilmProjects = data.filmProjects.filter((item) => {
    const matchesCategory = filmFilter === 'All' || item.category === filmFilter;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.role && item.role.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const value = {
    // Data
    data,
    dataSource,
    personal: data.personal,
    devProjects: filteredDevProjects,
    filmProjects: filteredFilmProjects,
    devSkills: data.devSkills,
    filmGear: data.filmGear,
    showreel: data.showreel,

    // Modes & Switchers
    activeMode,
    setActiveMode,
    toggleMode: () => setActiveMode(prev => prev === 'dev' ? 'film' : 'dev'),

    // Modals
    selectedProject,
    modalType,
    isModalOpen,
    openDevProject,
    openFilmProject,
    openShowreel,
    closeModal,

    // Filters
    devFilter,
    setDevFilter,
    filmFilter,
    setFilmFilter,
    searchQuery,
    setSearchQuery
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
