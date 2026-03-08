const mongoose = require('mongoose');

const blockedAppsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    blocked: [
      {
        name: String,
        enabled: { type: Boolean, default: true }
      }
    ],
    whitelist: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlockedApps', blockedAppsSchema);
