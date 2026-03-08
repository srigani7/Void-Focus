const FocusSession = require('../models/FocusSession');
const BlockedApps = require('../models/BlockedApps');
const SessionLogs = require('../models/SessionLogs');
const { emitToUser } = require('../services/socket');

const upsertBlockedApps = async (req, res) => {
  const userId = req.user.userId;
  const { blocked = [], whitelist = [] } = req.body;

  const doc = await BlockedApps.findOneAndUpdate(
    { userId },
    { blocked, whitelist },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return res.json(doc);
};

const getBlockedApps = async (req, res) => {
  const userId = req.user.userId;
  const apps = await BlockedApps.findOne({ userId });
  return res.json(apps || { blocked: [], whitelist: [] });
};

const startSession = async (req, res) => {
  const userId = req.user.userId;
  const { durationMinutes = 45 } = req.body;

  await FocusSession.updateMany({ userId, active: true }, { active: false, endedAt: new Date(), endedReason: 'restarted' });
  const session = await FocusSession.create({ userId, durationMinutes, startedAt: new Date(), active: true });

  return res.status(201).json(session);
};

const stopSession = async (req, res) => {
  const userId = req.user.userId;
  const session = await FocusSession.findOneAndUpdate(
    { userId, active: true },
    { active: false, endedAt: new Date(), endedReason: 'manual' },
    { new: true }
  );

  if (!session) return res.status(404).json({ message: 'No active session' });
  return res.json(session);
};

const getSessions = async (req, res) => {
  const userId = req.user.userId;
  const sessions = await FocusSession.find({ userId }).sort({ createdAt: -1 }).limit(100);
  return res.json(sessions);
};

const addMonitorLog = async (req, res) => {
  const { userId, appName, action = 'blocked', message = '' } = req.body;
  const session = await FocusSession.findOne({ userId, active: true });
  const log = await SessionLogs.create({ userId, appName, action, message, sessionId: session?._id });

  emitToUser(userId, 'blocked-app', {
    appName,
    action,
    message,
    timestamp: log.timestamp
  });

  return res.status(201).json(log);
};

const getSessionLogs = async (req, res) => {
  const userId = req.user.userId;
  const logs = await SessionLogs.find({ userId }).sort({ timestamp: -1 }).limit(200);
  return res.json(logs);
};

module.exports = {
  upsertBlockedApps,
  getBlockedApps,
  startSession,
  stopSession,
  getSessions,
  addMonitorLog,
  getSessionLogs
};
