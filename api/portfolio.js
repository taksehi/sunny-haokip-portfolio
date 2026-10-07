import { isNeonConfigured, fetchNeonPortfolioData } from '../server/db.js';
import { portfolioData } from '../src/data/portfolioData.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const { devProjects, filmProjects, personal, devSkills, filmGear, showreel } = portfolioData;

  if (isNeonConfigured()) {
    try {
      const dbData = await fetchNeonPortfolioData();
      if (dbData && dbData.devProjects && dbData.devProjects.length > 0) {
        return res.status(200).json({
          source: 'neon',
          devProjects: dbData.devProjects,
          filmProjects: dbData.filmProjects,
          personal,
          devSkills,
          filmGear,
          showreel
        });
      }
    } catch (err) {
      console.warn('Neon query error on Vercel, falling back to static:', err.message);
    }
  }

  return res.status(200).json({
    source: 'static',
    devProjects,
    filmProjects,
    personal,
    devSkills,
    filmGear,
    showreel
  });
}
