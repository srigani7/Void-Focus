const BlockedApps = require('../models/BlockedApps');
const FocusSession = require('../models/FocusSession');

const monitorConfig = async (req, res) => {
  const { userId } = req.params;
  const activeSession = await FocusSession.findOne({ userId, active: true });
  const blockedAppsDoc = await BlockedApps.findOne({ userId });

  return res.json({
    active: Boolean(activeSession),
    blocked: (blockedAppsDoc?.blocked || []).filter((app) => app.enabled).map((app) => app.name.toLowerCase()),
    whitelist: (blockedAppsDoc?.whitelist || []).map((name) => name.toLowerCase())
  });
};

module.exports = { monitorConfig };
