import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const AttendanceRecord = sequelize.define('AttendanceRecord', {
  id:     { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  date:   { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('present', 'absent', 'late'), defaultValue: 'present' }
});
