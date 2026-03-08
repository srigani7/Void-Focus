'use client';

import './globals.css';
import { ReactNode, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-slate-200/80 bg-white/70 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <h1 className="text-xl font-semibold">Void Focus Mode</h1>
              <button
                onClick={() => setDark((v) => !v)}
                className="rounded-lg border border-slate-300 p-2 dark:border-slate-700"
                aria-label="Toggle theme"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
