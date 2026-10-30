'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Lock, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-950 border border-[#800000]/60 p-8 rounded-2xl shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-[#800000]/20 border border-[#800000] mx-auto flex items-center justify-center text-rose-500 mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-center text-white uppercase tracking-wider mb-6">
          Admin Sign In
        </h1>

        {errorMsg && (
          <div className="p-3 mb-4 rounded bg-red-950/60 border border-red-800 text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#800000]"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#800000]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-[#800000] hover:bg-rose-900 text-white font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}