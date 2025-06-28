import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Class = sequelize.define('Class', {
  id:     { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title:  { type: DataTypes.STRING,  allowNull: false },    // “Math 101”
  room:   { type: DataTypes.STRING },
  schedule: DataTypes.STRING                                // “Mon 08:00–09:30”
});
