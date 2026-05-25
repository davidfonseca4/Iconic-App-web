'use client';

import Link from 'next/link';
import { useState } from 'react';
import { subscribeEmail } from '@/lib/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      await subscribeEmail(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Ocelot-Style Newsletter Section */}
      <section className="w-full bg-[#f4f4f4] text-black py-32 md:py-48 px-6 md:px-24 relative z-50">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div>
            <h2 className="font-playfair text-6xl md:text-[7rem] leading-[0.9] tracking-tighter mb-8">
              JOIN THE<br />SYNDICATE.
            </h2>
            <p className="font-dm-mono text-sm max-w-md opacity-80 leading-relaxed">
              Receive private access to unlisted artifacts, editorial pieces, and VIP events before the public. We only email when history is made.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubscribe} className="flex border-b-2 border-black pb-4 group relative">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none font-dm-mono text-sm md:text-base tracking-[0.2em] placeholder:text-black/30 text-black disabled:opacity-50"
                required
                disabled={status === 'loading' || status === 'success'}
              />
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="font-dm-mono text-sm tracking-[0.2em] hover:text-amber-600 transition-colors flex-shrink-0 ml-4 font-bold disabled:opacity-50"
              >
                {status === 'loading' ? 'SECURING...' : status === 'success' ? 'JOINED' : 'SUBMIT'}
              </button>
            </form>
            {status === 'success' && (
              <p className="text-amber-600 font-dm-mono text-xs tracking-widest mt-4">Welcome to the Syndicate. Check your inbox.</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 font-dm-mono text-xs tracking-widest mt-4">Error processing request. Please try again.</p>
            )}
          </div>
        </div>
      </section>

      {/* Main Minimal Footer */}
      <footer className="w-full bg-[#050505] border-t border-white/10 pt-24 pb-12 px-6 md:px-24 relative z-50">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          {/* Brand / About */}
          <div className="md:col-span-2">
            <Link href="/" className="font-playfair text-4xl tracking-[0.3em] text-white block mb-6">
              ICONIC
            </Link>
            <p className="font-dm-mono text-sm text-white/50 max-w-md leading-relaxed">
              The world&apos;s premier destination for authenticated objects of legend. 
              We preserve history by connecting extraordinary artifacts with those who appreciate their timeless legacy.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-dm-mono text-amber-500 text-xs tracking-widest mb-6 uppercase">
              Contact Us
            </h3>
            <ul className="font-dm-mono text-sm text-white/70 space-y-4">
              <li>iconicthevault@gmail.com</li>
              <li>+44 (0) 20 7946 0847</li>
              <li className="pt-4">125 New Bond Street</li>
              <li>London, W1S 1SR</li>
              <li>United Kingdom</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-dm-mono text-amber-500 text-xs tracking-widest mb-6 uppercase">
              Legal & Info
            </h3>
            <ul className="font-dm-mono text-sm text-white/70 space-y-4 flex flex-col">
              <Link href="/authentication" className="hover:text-amber-500 transition-colors">Authentication Process</Link>
              <Link href="/shipping" className="hover:text-amber-500 transition-colors">Shipping & Returns</Link>
              <Link href="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
              <Link href="/story" className="hover:text-amber-500 transition-colors">Our History</Link>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1600px] mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center font-dm-mono text-[10px] text-white/40 tracking-widest">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} ICONIC STORE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-500 transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-amber-500 transition-colors">X (TWITTER)</a>
          </div>
        </div>
      </footer>
    </>
  );
}
