const jwt = require('jsonwebtoken');

const signToken = (user) => jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

module.exports = { signToken };
