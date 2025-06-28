import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api', attendanceRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();          // { alter: true } during dev if needed
    console.log(' MySQL connected & synced');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(` API running on http://localhost:${PORT}`));
  } catch (err) { console.error(' DB connection error:', err); }
})();
