const express = require('express');
const auth = require('../middleware/auth');
const {
  upsertBlockedApps,
  getBlockedApps,
  startSession,
  stopSession,
  getSessions,
  addMonitorLog,
  getSessionLogs
} = require('../controllers/focusController');
const { monitorConfig } = require('../controllers/monitorController');

const router = express.Router();

router.get('/blocked-apps', auth, getBlockedApps);
router.put('/blocked-apps', auth, upsertBlockedApps);
router.post('/session/start', auth, startSession);
router.post('/session/stop', auth, stopSession);
router.get('/sessions', auth, getSessions);
router.get('/logs', auth, getSessionLogs);

router.post('/monitor/log', (req, res, next) => {
  if (req.headers['x-monitor-key'] !== process.env.MONITOR_SHARED_KEY) {
    return res.status(401).json({ message: 'Invalid monitor key' });
  }

  return next();
}, addMonitorLog);

router.get('/monitor/config/:userId', (req, res, next) => {
  if (req.headers['x-monitor-key'] !== process.env.MONITOR_SHARED_KEY) {
    return res.status(401).json({ message: 'Invalid monitor key' });
  }

  return next();
}, monitorConfig);

module.exports = router;
