'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { day: 'Mon', focused: 90 },
  { day: 'Tue', focused: 120 },
  { day: 'Wed', focused: 75 },
  { day: 'Thu', focused: 130 },
  { day: 'Fri', focused: 160 },
  { day: 'Sat', focused: 60 },
  { day: 'Sun', focused: 110 }
];

export default function HistoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold">Session History & Analytics</h2>
        <p className="mt-2 text-sm text-slate-500">Weekly focus minutes and productivity trend.</p>
        <div className="mt-8 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="focused" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
