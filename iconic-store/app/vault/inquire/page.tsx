'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createVaultInquiry } from '@/lib/api';

function InquireForm() {
  const searchParams = useSearchParams();
  const itemName = searchParams.get('item') || 'An Exclusive Vault Artifact';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    intent: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await createVaultInquiry({ ...formData, item: itemName });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="pt-40 px-6 md:px-24 max-w-[800px] mx-auto min-h-[70vh] flex flex-col justify-center text-center">
        <div className="border border-amber-500/30 bg-amber-500/10 p-12 md:p-24 rounded-sm">
          <p className="font-dm-mono text-amber-500 text-xs tracking-[0.4em] mb-8 uppercase">Application Received</p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-8 leading-tight">
            YOUR INQUIRY IS UNDER REVIEW
          </h1>
          <p className="font-dm-mono text-white/70 mb-12 leading-relaxed text-sm">
            We have securely registered your intent to acquire <strong>{itemName}</strong>. 
            Our team will perform the necessary background verification and contact you via email shortly.
          </p>
          <Link href="/vault" className="border border-white/20 text-white px-12 py-5 font-dm-mono text-xs tracking-[0.3em] hover:bg-amber-500 hover:border-amber-500 hover:text-black transition-all duration-500 inline-block">
            RETURN TO VAULT
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 px-6 md:px-24 max-w-[800px] mx-auto min-h-[70vh]">
      <header className="mb-16 text-center border-b border-white/10 pb-12">
        <p className="font-dm-mono text-amber-500 text-xs tracking-[0.4em] mb-4 uppercase">Level 5 Clearance Required</p>
        <h1 className="font-playfair text-4xl md:text-5xl text-white mb-6">
          ACQUISITION REQUEST
        </h1>
        <p className="font-dm-mono text-xs tracking-[0.2em] text-white/50 uppercase leading-relaxed">
          You are initiating a private inquiry for:<br/>
          <strong className="text-amber-500 mt-2 block">{itemName}</strong>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-dm-mono text-[10px] tracking-widest text-white/50 uppercase">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-transparent border-b border-white/20 pb-2 outline-none font-dm-mono text-sm text-white focus:border-amber-500 transition-colors placeholder:text-white/20"
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-dm-mono text-[10px] tracking-widest text-white/50 uppercase">Email Address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-transparent border-b border-white/20 pb-2 outline-none font-dm-mono text-sm text-white focus:border-amber-500 transition-colors placeholder:text-white/20"
              placeholder="contact@example.com"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-dm-mono text-[10px] tracking-widest text-white/50 uppercase">Phone Number (Include Country Code)</label>
          <input 
            type="tel" 
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="bg-transparent border-b border-white/20 pb-2 outline-none font-dm-mono text-sm text-white focus:border-amber-500 transition-colors placeholder:text-white/20"
            placeholder="+1 234 567 8900"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-dm-mono text-[10px] tracking-widest text-white/50 uppercase">Statement of Intent / Institution</label>
          <textarea 
            required
            value={formData.intent}
            onChange={(e) => setFormData({...formData, intent: e.target.value})}
            rows={4}
            className="bg-transparent border border-white/20 p-4 outline-none font-dm-mono text-sm text-white focus:border-amber-500 transition-colors placeholder:text-white/20 mt-2"
            placeholder="Please briefly explain your interest in this artifact and your background as a collector or institution."
          />
        </div>

        {status === 'error' && (
          <p className="text-red-500 font-dm-mono text-xs tracking-widest mt-4">An error occurred while submitting your inquiry. Please try again.</p>
        )}

        <div className="pt-8 text-center">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="border border-white/20 text-white px-12 py-5 font-dm-mono text-xs tracking-[0.3em] hover:bg-amber-500 hover:border-amber-500 hover:text-black transition-all duration-500 w-full md:w-auto disabled:opacity-50"
          >
            {status === 'loading' ? 'TRANSMITTING...' : 'SUBMIT SECURE INQUIRY'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function VaultInquirePage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center font-dm-mono text-white">Loading secure channel...</div>}>
      <InquireForm />
    </Suspense>
  );
}
