'use client';

import { BlockedApp } from '@/types';

export default function BlockedAppsPanel({ apps, onToggle }: { apps: BlockedApp[]; onToggle: (name: string) => void }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold">Blocked Apps</h3>
      <div className="space-y-3">
        {apps.map((app) => (
          <label key={app.name} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800">
            <span>{app.name}</span>
            <button
              className={`h-7 w-14 rounded-full transition ${app.enabled ? 'bg-brand' : 'bg-slate-400'}`}
              onClick={() => onToggle(app.name)}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white transition ${app.enabled ? 'translate-x-7' : 'translate-x-1'}`}
              />
            </button>
          </label>
        ))}
      </div>
    </div>
  );
}
