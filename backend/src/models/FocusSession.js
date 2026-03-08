const mongoose = require('mongoose');

const focusSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startedAt: { type: Date, required: true },
    endedAt: Date,
    durationMinutes: Number,
    active: { type: Boolean, default: true },
    endedReason: { type: String, default: 'timer' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FocusSession', focusSessionSchema);
