import { sequelize } from './config/db.js';
import { Author }   from './models/author.js';
import { Book }     from './models/book.js';

const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('🔄  Database synced');

    // ─── Insert Authors ────────────────────────────────────────────────────
    const [ronan, kim, hok] = await Author.bulkCreate([
      { name: 'Ronan The Best', birthYear: 1990 },
      { name: 'Kim Amg',        birthYear: 1995 },
      { name: 'Hok Tim',        birthYear: 2015 }
    ], { returning: true });

    // ─── Insert Books ─────────────────────────────────────────────────────
    await Book.bulkCreate([
      
      { title: 'Power Up',   publicationYear: 2010, pages: 300, authorId: ronan.id },
      { title: 'Final Shot', publicationYear: 2012, pages: 220, authorId: ronan.id },

      { title: 'Design Life', publicationYear: 2020, pages: 150, authorId: kim.id },
      { title: 'Art Spark',   publicationYear: 2021, pages: 180, authorId: kim.id },

      { title: 'Hoky Poky', publicationYear: 2023, pages: 100, authorId: hok.id },
      { title: 'Tiny Giant', publicationYear: 2024, pages: 120, authorId: hok.id }
    ]);

    console.log('✅  Sample data inserted');
  } catch (err) {
    console.error('❌  Seeding error:', err);
  } finally {
    await sequelize.close();
    process.exit();
  }
};

seed();
