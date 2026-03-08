'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingHero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold leading-tight md:text-5xl">Enter deep work with Void Focus Mode</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Block distracting apps, track your focus streak, and receive instant alerts when distractions are auto-closed.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/auth" className="rounded-lg bg-brand px-5 py-3 font-semibold text-white">
            Get Started
          </Link>
          <Link href="/dashboard" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold dark:border-slate-700">
            Live Dashboard
          </Link>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-wider text-brand">Active Session</p>
          <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-800">
            <motion.div
              className="h-4 rounded-full bg-brand"
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
          </div>
          <p className="text-3xl font-bold">32:18</p>
          <p className="text-sm text-slate-500">Discord closed 4 times · You are on a 6-day streak.</p>
        </div>
      </motion.div>
    </section>
  );
}
