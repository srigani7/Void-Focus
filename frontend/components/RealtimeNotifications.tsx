'use client';

import { SessionLog } from '@/types';

export default function RealtimeNotifications({ logs }: { logs: SessionLog[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold">Real-time Alerts</h3>
      <ul className="space-y-2 text-sm">
        {logs.slice(0, 6).map((log) => (
          <li key={log.id} className="rounded-md bg-rose-50 px-3 py-2 text-rose-900 dark:bg-rose-900/40 dark:text-rose-100">
            {new Date(log.timestamp).toLocaleTimeString()} · Blocked {log.appName}
          </li>
        ))}
      </ul>
    </div>
  );
}
