# Void Focus Mode

Void Focus Mode is a full-stack productivity platform that blocks selected desktop apps during an active focus session.

## Architecture

```text
void-focus-mode/
  frontend/  (Next.js + Tailwind + Framer Motion + Socket.IO client)
  backend/   (Express + JWT + MongoDB + Socket.IO)
  monitor/   (Python psutil process monitor)
  database/  (collection reference docs)
```

## Feature Coverage

- Animated landing page with focus concept and transitions.
- Login/signup UI and JWT-ready backend authentication endpoints.
- Focus dashboard with app toggles, timer, progress bar, streak summary, and live alerts.
- Session history analytics page with charts.
- Dark/light theme support.
- Block list persistence per user.
- Focus session start/stop APIs and session history tracking.
- Monitor service that scans every second, kills blocked apps, and logs events.
- Real-time notifications via Socket.IO (`blocked-app` events).
- Whitelist support, custom timer duration, and extensible modular structure.

## Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB local or cloud instance

## 1) Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend default URL: `http://localhost:4000`

## 2) Frontend setup

```bash
cd frontend
npm install
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000 npm run dev
```

Frontend default URL: `http://localhost:3000`

## 3) Monitor setup

```bash
cd monitor
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python service.py
```

Set `USER_ID` in `monitor/.env` to the authenticated user's MongoDB `_id`.

## API quick map

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/focus/blocked-apps`
- `PUT /api/focus/blocked-apps`
- `POST /api/focus/session/start`
- `POST /api/focus/session/stop`
- `GET /api/focus/sessions`
- `GET /api/focus/logs`
- `GET /api/focus/monitor/config/:userId` (monitor key)
- `POST /api/focus/monitor/log` (monitor key)

## Notes

- The monitor service currently uses process names (`chrome.exe`, `discord.exe`, etc.).
- For early-stop password protection and report export (CSV/PDF), backend extension points are available via session and logs models.
