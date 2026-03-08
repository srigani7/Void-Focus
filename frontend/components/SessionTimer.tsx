'use client';

import { motion } from 'framer-motion';

export default function SessionTimer({ secondsLeft, total }: { secondsLeft: number; total: number }) {
  const pct = Math.max(0, Math.min(100, ((total - secondsLeft) / total) * 100));
  const min = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, '0');
  const sec = (secondsLeft % 60).toString().padStart(2, '0');

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-500">Focus Countdown</p>
      <p className="mt-2 text-4xl font-bold">{min}:{sec}</p>
      <div className="mt-4 h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800">
        <motion.div className="h-3 rounded-full bg-brand" animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
      </div>
      <p className="mt-2 text-sm text-slate-500">{pct.toFixed(0)}% complete</p>
    </div>
  );
}
