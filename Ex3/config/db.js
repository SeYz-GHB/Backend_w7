import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,           // e.g. attendance_db
  process.env.DB_USER,           // e.g. root
  process.env.DB_PASS,           // e.g. password
  {
    host: process.env.DB_HOST,   // e.g. localhost
    dialect: 'mysql',
    logging: false               // turn on if you want SQL logs
  }
);
