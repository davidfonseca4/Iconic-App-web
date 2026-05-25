'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api';
import { setAuthToken } from '@/lib/session';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('loading');

    try {
      const result = await loginUser({ email, password });
      setAuthToken(result.data.token);
      router.push('/collection');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-[520px] border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md p-10 md:p-14">
        <p className="font-dm-mono text-amber-500 text-xs tracking-[0.3em] mb-5 uppercase">Private Access</p>
        <h1 className="font-playfair text-4xl md:text-5xl mb-10">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block font-dm-mono text-[11px] tracking-widest text-white/50 uppercase mb-3">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 pb-3 font-dm-mono text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="collector@email.com"
            />
          </div>

          <div>
            <label className="block font-dm-mono text-[11px] tracking-widest text-white/50 uppercase mb-3">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 pb-3 font-dm-mono text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="********"
            />
          </div>

          {status === 'error' && (
            <p className="font-dm-mono text-xs text-red-400 tracking-wider">Invalid email or password.</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-amber-500 text-black h-[56px] font-dm-mono text-xs tracking-[0.2em] font-bold hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'VERIFYING...' : 'ACCESS ARCHIVE'}
          </button>
        </form>

        <p className="font-dm-mono text-xs text-white/50 mt-8 text-center">
          No account yet?{' '}
          <Link href="/register" className="text-amber-500 hover:text-amber-400 transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
