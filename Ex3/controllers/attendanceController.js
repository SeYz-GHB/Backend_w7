import { AttendanceRecord, Student } from '../models/index.js';
import { Op } from 'sequelize';


export const markAttendance = async (studentId, classId, date, status = 'present') =>
  AttendanceRecord.upsert({ studentId, classId, date, status });


export const getAttendance = async (studentId, date) =>
  AttendanceRecord.findOne({ where: { studentId, date } });


export const listClassAttendance = async (classId, date) =>
  AttendanceRecord.findAll({
    where: date ? { classId, date } : { classId },
    include: [{ model: Student, attributes: ['id', 'name'] }]
  });


export const getStudentSummary = async (studentId) => {
  const records = await AttendanceRecord.findAll({ where: { studentId } });
  return records.reduce(
    (acc, { status }) => ({ ...acc, [status]: acc[status] + 1 }),
    { present: 0, absent: 0, late: 0 }
  );
};
