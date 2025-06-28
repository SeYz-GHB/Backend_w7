import { sequelize } from './config/db.js';
import { Author }    from './models/author.js';
import { Book }      from './models/book.js';


const fetchBooksByAuthor = async (authorName) => {
  const author = await Author.findOne({
    where: { name: authorName },
    include: { model: Book, attributes: ['title', 'publicationYear', 'pages'] }
  });

  if (!author) return console.log(`❌  No author named "${authorName}"`);

  console.log(`\n📚  Books by ${author.name}:`);
  author.Books.forEach(b =>
    console.log(`• ${b.title} (${b.publicationYear}, ${b.pages} pages)`)
  );
};

const createNewBookForAuthor = async (authorName, newBook) => {
  const author = await Author.findOne({ where: { name: authorName } });
  if (!author) return console.log(`❌  No author named "${authorName}"`);

  const book = await author.createBook(newBook);
  console.log(`✅  Added "${book.title}" to ${author.name}`);
};

// ─── Demo flow ─────────────────────────────────────────────────────────────
const run = async () => {
  try {
    await sequelize.authenticate();

    await fetchBooksByAuthor('Kim Amg');

    await createNewBookForAuthor('Kim Amg', {
      title: 'Code Ninja',
      publicationYear: 2025,
      pages: 210
    });

    await fetchBooksByAuthor('Kim Amg');
  } catch (e) {
    console.error('❌  Query error:', e);
  } finally {
    await sequelize.close();
  }
};

run();
