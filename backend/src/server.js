require('dotenv').config();
const http = require('http');
const cors = require('cors');
const express = require('express');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const focusRoutes = require('./routes/focusRoutes');
const { initSocket } = require('./services/socket');

const app = express();
const server = http.createServer(app);
initSocket(server);

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/focus', focusRoutes);

const PORT = process.env.PORT || 4000;
connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Backend running on ${PORT}`);
  });
});
