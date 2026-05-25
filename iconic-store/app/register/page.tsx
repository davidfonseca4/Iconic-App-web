'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('loading');

    try {
      await registerUser(formData);
      router.push('/login');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-[560px] border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md p-10 md:p-14">
        <p className="font-dm-mono text-amber-500 text-xs tracking-[0.3em] mb-5 uppercase">Collector Registry</p>
        <h1 className="font-playfair text-4xl md:text-5xl mb-10">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block font-dm-mono text-[11px] tracking-widest text-white/50 uppercase mb-3">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full bg-transparent border-b border-white/20 pb-3 font-dm-mono text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block font-dm-mono text-[11px] tracking-widest text-white/50 uppercase mb-3">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full bg-transparent border-b border-white/20 pb-3 font-dm-mono text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="collector@email.com"
            />
          </div>

          <div>
            <label className="block font-dm-mono text-[11px] tracking-widest text-white/50 uppercase mb-3">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              className="w-full bg-transparent border-b border-white/20 pb-3 font-dm-mono text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="Minimum 8 characters"
            />
          </div>

          <div>
            <label className="block font-dm-mono text-[11px] tracking-widest text-white/50 uppercase mb-3">Phone</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full bg-transparent border-b border-white/20 pb-3 font-dm-mono text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="+52 477 123 4567"
            />
          </div>

          {status === 'error' && (
            <p className="font-dm-mono text-xs text-red-400 tracking-wider">Unable to create account. Verify data and try again.</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-amber-500 text-black h-[56px] font-dm-mono text-xs tracking-[0.2em] font-bold hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'CREATING...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <p className="font-dm-mono text-xs text-white/50 mt-8 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-amber-500 hover:text-amber-400 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
