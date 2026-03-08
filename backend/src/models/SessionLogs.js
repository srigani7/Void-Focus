const mongoose = require('mongoose');

const sessionLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'FocusSession' },
    appName: String,
    action: { type: String, enum: ['blocked', 'warning'], default: 'blocked' },
    message: String,
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SessionLogs', sessionLogSchema);
