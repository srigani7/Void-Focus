'use client';

import BlockedAppsPanel from '@/components/BlockedAppsPanel';
import RealtimeNotifications from '@/components/RealtimeNotifications';
import SessionTimer from '@/components/SessionTimer';
import { getSocket } from '@/lib/socket';
import { BlockedApp, SessionLog } from '@/types';
import { useEffect, useMemo, useState } from 'react';

const TOTAL = 45 * 60;

export default function DashboardPage() {
  const [apps, setApps] = useState<BlockedApp[]>([
    { name: 'chrome.exe', enabled: true },
    { name: 'Discord.exe', enabled: true },
    { name: 'steam.exe', enabled: false }
  ]);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL);
  const [active, setActive] = useState(false);
  const [logs, setLogs] = useState<SessionLog[]>([]);

  useEffect(() => {
    const socket = getSocket();
    socket.on('blocked-app', (payload: Omit<SessionLog, 'id'>) => {
      setLogs((curr) => [{ ...payload, id: crypto.randomUUID() }, ...curr]);
    });

    return () => {
      socket.off('blocked-app');
    };
  }, []);

  useEffect(() => {
    if (!active || secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((sec) => sec - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [active, secondsLeft]);

  const streak = useMemo(() => Math.ceil(logs.length / 2) + 4, [logs.length]);

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-6 py-10">
      <section className="grid gap-6 md:grid-cols-3">
        <SessionTimer secondsLeft={secondsLeft} total={TOTAL} />
        <BlockedAppsPanel
          apps={apps}
          onToggle={(name) => setApps((curr) => curr.map((a) => (a.name === name ? { ...a, enabled: !a.enabled } : a)))}
        />
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-semibold">Session Control</h3>
          <p className="mt-3 text-sm text-slate-500">Current streak: {streak} days</p>
          <button
            className="mt-6 w-full rounded-lg bg-brand py-3 font-semibold text-white"
            onClick={() => setActive((v) => !v)}
          >
            {active ? 'Stop Focus Session' : 'Start Focus Session'}
          </button>
        </div>
      </section>
      <RealtimeNotifications logs={logs} />
    </main>
  );
}
