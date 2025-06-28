import { Student } from './Student.js';
import { Class } from './Class.js';
import { AttendanceRecord } from './AttendanceRecord.js';

// ─ Associations
Student.hasMany(AttendanceRecord,   { foreignKey: 'studentId' });
Class.hasMany(AttendanceRecord,     { foreignKey: 'classId'  });

AttendanceRecord.belongsTo(Student, { foreignKey: 'studentId' });
AttendanceRecord.belongsTo(Class,   { foreignKey: 'classId'  });



export { Student, Class, AttendanceRecord };
