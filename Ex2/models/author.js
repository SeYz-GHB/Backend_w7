import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Book } from './book.js';   // circular ref OK with Sequelize v7

export const Author = sequelize.define('Author', {
  name:       { type: DataTypes.STRING,  allowNull: false },
  birthYear:  { type: DataTypes.INTEGER, allowNull: false }
});

// ─── Associations ──────────────────────────────────────────────────────────
Author.hasMany(Book, {
  foreignKey: { name: 'authorId', allowNull: false },
  onDelete:   'CASCADE'
});
