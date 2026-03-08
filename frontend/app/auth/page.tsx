'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [signup, setSignup] = useState(false);

  return (
    <main className="mx-auto grid max-w-4xl place-items-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold">{signup ? 'Create account' : 'Welcome back'}</h2>
        <form className="mt-6 space-y-4">
          <input className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700" placeholder="Email" />
          <input className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700" placeholder="Password" type="password" />
          {signup && <input className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700" placeholder="Confirm Password" type="password" />}
          <button className="w-full rounded-lg bg-brand py-3 font-semibold text-white">{signup ? 'Sign up' : 'Login'}</button>
        </form>
        <button className="mt-4 text-sm text-brand" onClick={() => setSignup((v) => !v)}>
          {signup ? 'Already have an account? Login' : 'Need an account? Sign up'}
        </button>
      </div>
    </main>
  );
}
