'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, Product } from '@/lib/api';

export default function Vault() {
  const [stage, setStage] = useState(0); // 0: scanning, 1: granted, 2: content
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate high-security clearance delay
    const t1 = setTimeout(() => setStage(1), 3000);
    const t2 = setTimeout(() => setStage(2), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts({ limit: 100, vault: true });
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    void loadProducts();
  }, []);

  const vaultProducts = products.filter(p => p.vault);

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      {/* Security Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center transition-all duration-1000 ${
          stage === 2 ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 border border-white/10 relative flex items-center justify-center mb-8 overflow-hidden bg-[#0a0a0a]">
            {/* Scanning line animation */}
            <div className={`absolute left-0 w-full h-[2px] bg-amber-500 shadow-[0_0_20px_rgba(245,166,35,0.8)] transition-all duration-[3000ms] ease-linear ${
              stage === 0 ? 'top-[-10%] animate-[scan_3s_linear]' : 'top-[50%] opacity-0'
            }`}></div>
            
            {/* Inner text */}
            <div className="text-center z-10">
              <span className={`font-dm-mono tracking-[0.4em] transition-colors duration-500 ${
                stage >= 1 ? 'text-amber-500 font-bold' : 'text-white/40 text-xs'
              }`}>
                {stage === 0 ? 'DECRYPTING...' : 'ACCESS GRANTED'}
              </span>
            </div>
          </div>
          <p className="font-dm-mono text-xs text-white/30 tracking-[0.5em] uppercase">
            Encrypted Connection
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`pt-48 px-6 md:px-24 transition-opacity duration-1000 delay-500 ${stage === 2 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-[1600px] mx-auto">
          <header className="mb-32 text-center border-b border-white/10 pb-24">
            <p className="font-dm-mono text-amber-500 text-xs tracking-[0.4em] mb-8 uppercase">Level 5 Clearance</p>
            <h1 className="font-playfair text-4xl sm:text-6xl md:text-[9rem] tracking-tighter text-white mb-6 drop-shadow-2xl">
              THE VAULT
            </h1>
            <p className="font-dm-mono text-sm tracking-[0.2em] text-white/50 uppercase max-w-xl mx-auto leading-relaxed">
              These items are strictly confidential and not available to the general public. All acquisitions require background verification.
            </p>
          </header>

          <div className="space-y-32 md:space-y-48 pb-48">
            {vaultProducts.map((item, index) => (
              <div key={item.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-32 items-center`}>
                <div className="w-full lg:w-1/2 aspect-[4/5] relative group">
                  <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-1000"></div>
                  <Image src={item.images[0]} alt={item.name} fill className="object-cover border border-white/5 grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
                  
                  {/* Four corner brackets for sci-fi/secure vault aesthetic */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-amber-500/50"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-amber-500/50"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-amber-500/50"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-amber-500/50"></div>
                </div>
                
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <p className="font-dm-mono text-amber-500 text-xs tracking-[0.4em] mb-6">{item.year} — {item.person}</p>
                  <h2 className="font-playfair text-5xl md:text-7xl leading-tight mb-8 text-white">{item.name}</h2>
                  <p className="font-dm-mono text-sm text-white/50 leading-relaxed mb-12 max-w-md">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-col gap-2 mb-12 border-l-2 border-white/10 pl-6">
                    <span className="font-dm-mono text-[10px] text-white/30 tracking-widest uppercase">Est. Valuation</span>
                    <span className="font-dm-mono text-lg tracking-[0.2em] text-white">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency, maximumFractionDigits: 0 }).format(item.price)}
                    </span>
                  </div>
                  
                  <Link href={`/vault/inquire?item=${encodeURIComponent(item.name)}`} className="border border-white/20 text-white px-12 py-5 font-dm-mono text-xs tracking-[0.3em] hover:bg-amber-500 hover:border-amber-500 hover:text-black transition-all duration-500 w-fit inline-block text-center">
                    INQUIRE PRIVATELY
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 1; }
          50% { top: 100%; opacity: 1; }
          50.01% { top: 0%; opacity: 0; }
          100% { top: 0%; opacity: 0; }
        }
        .animate-[scan_3s_linear] {
          animation: scan 3s linear infinite;
        }
      `}} />
    </div>
  );
}
