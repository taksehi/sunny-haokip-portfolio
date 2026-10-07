import { initDatabase, sql, isNeonConfigured } from './db.js';
import { portfolioData } from '../src/data/portfolioData.js';

const { devProjects, filmProjects, personal } = portfolioData;

export async function seedDatabase() {
  console.log('--- NEON DATABASE SEEDER ---');
  if (!isNeonConfigured()) {
    return { ok: false, message: 'DATABASE_URL is not configured in .env' };
  }

  console.log('1. Initializing schema on Neon...');
  const initRes = await initDatabase();
  if (!initRes.ok) {
    console.error('Failed to initialize database:', initRes.error);
    return { ok: false, error: initRes.error };
  }
  console.log('Schema confirmed.');

  console.log('2. Seeding Developer Projects into Neon...');
  for (let i = 0; i < devProjects.length; i++) {
    const p = devProjects[i];
    await sql`
      INSERT INTO projects (
        id, discipline, title, category, description, long_description,
        image, tags, architecture_notes, github_url, demo_url, year, sort_order
      ) VALUES (
        ${p.id}, 'dev', ${p.title}, ${p.category}, ${p.description}, ${p.longDescription || p.description},
        ${p.image}, ${JSON.stringify(p.tags || [])}, ${p.architectureNotes || ''}, ${p.githubUrl || ''}, ${p.demoUrl || ''}, ${p.year || '2025'}, ${i}
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        long_description = EXCLUDED.long_description,
        image = EXCLUDED.image,
        tags = EXCLUDED.tags,
        architecture_notes = EXCLUDED.architecture_notes,
        github_url = EXCLUDED.github_url,
        demo_url = EXCLUDED.demo_url;
    `;
    console.log(`  + Dev Project: ${p.title}`);
  }

  console.log('3. Seeding Film Projects into Neon...');
  for (let i = 0; i < filmProjects.length; i++) {
    const p = filmProjects[i];
    await sql`
      INSERT INTO projects (
        id, discipline, title, category, description, long_description,
        image, preview_video, embed_url, aspect_ratio, duration,
        role, client_name, year, awards, gear, sort_order
      ) VALUES (
        ${p.id}, 'film', ${p.title}, ${p.category}, ${p.description}, ${p.longDescription || p.description},
        ${p.posterImage}, ${p.previewVideo || ''}, ${p.embedUrl || ''}, ${p.aspectRatio || '16:9'}, ${p.duration || '02:00'},
        ${p.role || ''}, ${p.client || ''}, ${p.year || '2025'}, ${p.awards || ''}, ${p.gear || ''}, ${i}
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        image = EXCLUDED.image,
        preview_video = EXCLUDED.preview_video,
        embed_url = EXCLUDED.embed_url,
        aspect_ratio = EXCLUDED.aspect_ratio,
        duration = EXCLUDED.duration,
        role = EXCLUDED.role,
        client_name = EXCLUDED.client_name,
        year = EXCLUDED.year,
        gear = EXCLUDED.gear,
        awards = EXCLUDED.awards;
    `;
    console.log(`  + Film Project: ${p.title}`);
  }

  console.log('4. Seeding Site Profile...');
  await sql`
    INSERT INTO site_profile (
      id, name, title_dev, title_film, tagline_dev, tagline_film,
      bio_dev, bio_film, location, email, socials
    ) VALUES (
      'main', ${personal.name}, ${personal.roleDev}, ${personal.roleFilm},
      ${personal.taglineDev}, ${personal.taglineFilm}, ${personal.bio}, ${personal.bio},
      ${personal.location}, ${personal.socials?.email || ''}, ${JSON.stringify(personal.socials || {})}
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      tagline_dev = EXCLUDED.tagline_dev,
      tagline_film = EXCLUDED.tagline_film,
      email = EXCLUDED.email;
  `;
  console.log('  + Site profile updated.');

  console.log('All data seeded into Neon successfully!');
  return { ok: true, message: 'All data seeded into Neon successfully!' };
}

// If executed directly from command line (npm run db:seed)
if (process.argv[1]?.replace(/\\/g, '/').endsWith('server/seed.js')) {
  seedDatabase().then(res => {
    if (!res.ok) {
      console.error('Seed error:', res.error || res.message);
      process.exit(1);
    }
    process.exit(0);
  }).catch(err => {
    console.error('Seed script error:', err);
    process.exit(1);
  });
}
