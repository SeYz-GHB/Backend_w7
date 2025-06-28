import express from 'express';
import {
  markAttendance,
  getAttendance,
  listClassAttendance,
  getStudentSummary
} from '../controllers/attendanceController.js';

const router = express.Router();

/* POST /attendance?studentId=1&classId=2&date=2025-06-17&status=late */
router.post('/attendance', async (req, res) => {
  try {
    const { studentId, classId, date, status } = req.query;
    const record = await markAttendance(studentId, classId, date, status);
    res.status(201).json({ success: true, record });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

/* GET /attendance?studentId=1&date=2025-06-17 */
router.get('/attendance', async (req, res) => {
  try {
    const { studentId, date } = req.query;
    const record = await getAttendance(studentId, date);
    if (!record) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, record });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

/* GET /classes/:id/attendance  (+ ?date=2025-06-17 optional) */
router.get('/classes/:id/attendance', async (req, res) => {
  try {
    const records = await listClassAttendance(req.params.id, req.query.date);
    res.json({ success: true, records });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

/* GET /students/:id/attendance  → summary */
router.get('/students/:id/attendance', async (req, res) => {
  try {
    const summary = await getStudentSummary(req.params.id);
    res.json({ success: true, summary });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

export default router;
