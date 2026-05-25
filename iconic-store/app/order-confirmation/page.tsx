'use client';

import { useCartStore } from '@/store/cartStore';
import type { CartItem } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useSearchParams } from 'next/navigation';

export default function OrderConfirmationPage() {
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [confirmedItems, setConfirmedItems] = useState<CartItem[]>([]);
  const searchParams = useSearchParams();
  const previewUrl = searchParams?.get('preview');

  useEffect(() => {
    setMounted(true);
    // Snapshot the items for the confirmation page, then clear the cart
    // if the cart wasn't already empty (to prevent re-clearing and losing data on refresh).
    if (items.length > 0) {
      setConfirmedItems(items);
      clearCart();
    }
  }, [items, clearCart]);

  if (!mounted) return <div className="min-h-screen bg-[#060606]"></div>;

  // Use confirmedItems if available, otherwise fallback to empty state
  const displayItems = confirmedItems.length > 0 ? confirmedItems : items;

  if (displayItems.length === 0) {
    return (
      <div className="pt-40 pb-32 min-h-[70vh] bg-[#060606] text-white flex flex-col items-center justify-center">
        <h1 className="font-playfair text-4xl mb-6">No Active Requests</h1>
        <Link href="/collection" className="border border-white/20 px-8 py-4 font-dm-mono text-xs tracking-widest hover:bg-white hover:text-black transition-colors">
          RETURN TO ARCHIVES
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 min-h-screen bg-[#050505] text-white selection:bg-amber-500/30">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Success Header */}
        <div className="text-center mb-16 border-b border-white/10 pb-16 w-full">
          <div className="w-16 h-16 rounded-full border border-amber-500 flex items-center justify-center mx-auto mb-8 bg-amber-500/10">
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl mb-4">Acquisition Request Secured</h1>
          <p className="font-dm-mono text-white/50 text-sm mb-8">Request ID: #ICN-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
          
          {previewUrl && (
            <a 
              href={previewUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-amber-500 text-black px-8 py-3 font-dm-mono text-xs tracking-[0.2em] font-bold hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              VIEW EMAIL RECEIPT (TEST)
            </a>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full mb-16">
          <h2 className="font-dm-mono text-amber-500 text-xs tracking-[0.2em] mb-8 uppercase">Reserved Artifacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayItems.map((item) => (
              <div key={item.id} className="bg-[#0a0a0a] border border-white/5 p-6 flex gap-6">
                <div className="w-24 h-32 relative bg-[#030303] border border-white/5 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-contain p-2 grayscale contrast-125" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-playfair text-lg mb-2">{item.name}</h3>
                  <p className="font-dm-mono text-white/40 text-[10px] mb-4 uppercase">Registry #{item.id.toString().padStart(4, '0')}</p>
                  <p className="font-dm-mono text-amber-500 text-sm">
                    {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collection & Payment Instructions */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/5 p-8 md:p-12 border border-white/10">
          
          <div>
            <h2 className="font-dm-mono text-amber-500 text-xs tracking-[0.2em] mb-6 uppercase">Collection Center</h2>
            <p className="font-dm-mono text-white/60 text-sm leading-loose mb-6">
              Due to the immense value and security risks associated with transit, this transaction must be finalized in person. Our concierge will contact you shortly to schedule your private viewing and handover.
            </p>
            <div className="font-dm-mono text-sm border-l border-amber-500 pl-4 space-y-2">
              <p className="text-white">ICONIC Secure Vault HQ</p>
              <p className="text-white/50">1254 Rue de la Paix</p>
              <p className="text-white/50">Geneva, Switzerland, 1204</p>
            </div>
          </div>

          <div>
            <h2 className="font-dm-mono text-amber-500 text-xs tracking-[0.2em] mb-6 uppercase">Approved Payment Methods</h2>
            <p className="font-dm-mono text-white/60 text-sm leading-loose mb-8">
              Payment is exclusively accepted on-site after artifact inspection. We accept high-limit credit cards and verified cryptographic transfers.
            </p>
            
            {/* Payment Logos */}
            <div className="flex flex-wrap gap-4">
              {/* Visa */}
              <div className="bg-white px-4 py-2 rounded-sm flex items-center justify-center h-[40px] w-[64px]">
                <span className="font-black italic text-[#1A1F71] text-xl tracking-tighter leading-none pr-1">VISA</span>
              </div>
              
              {/* Mastercard */}
              <div className="bg-white px-4 py-2 rounded-sm flex items-center justify-center h-[40px] w-[64px]">
                <svg viewBox="0 0 36 24" className="h-6" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#EB001B"/>
                  <circle cx="24" cy="12" r="10" fill="#F79E1B"/>
                  <path d="M18,18.3c-2.4-1.6-4-4.3-4-7.3s1.6-5.7,4-7.3c2.4,1.6,4,4.3,4,7.3S20.4,16.7,18,18.3z" fill="#FF5F00"/>
                </svg>
              </div>

              {/* AMEX */}
              <div className="bg-[#2671B9] px-2 py-1 rounded-sm flex flex-col items-center justify-center h-[40px] w-[64px] border border-white/20 leading-[0.9]">
                <span className="font-bold text-white text-[7px] tracking-widest uppercase">American</span>
                <span className="font-bold text-white text-[7px] tracking-widest uppercase">Express</span>
              </div>

              {/* Crypto */}
              <div className="bg-black border border-white/20 px-4 py-2 rounded-sm flex items-center justify-center gap-2">
                <svg className="h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.75 0C5.26 0 0 5.26 0 11.75C0 18.24 5.26 23.5 11.75 23.5C18.24 23.5 23.5 18.24 23.5 11.75C23.5 5.26 18.24 0 11.75 0ZM17.43 13.9C17.43 16.5 14.86 17.65 11.83 17.65H8.7V5.7H11.87C14.73 5.7 16.94 6.78 16.94 9.17C16.94 10.55 16.03 11.49 14.8 11.86C16.32 12.18 17.43 13.06 17.43 13.9ZM10.51 7.23H11.96C13.43 7.23 14.77 7.7 14.77 8.94C14.77 10.15 13.72 10.66 12.04 10.66H10.51V7.23ZM10.51 16.14H12.12C14.07 16.14 15.35 15.54 15.35 14.15C15.35 12.8 13.88 12.11 11.96 12.11H10.51V16.14Z"/>
                </svg>
                <span className="font-dm-mono text-white text-[10px] tracking-widest font-bold">CRYPTO</span>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-16">
          <Link href="/" className="font-dm-mono text-xs tracking-[0.2em] border-b border-amber-500 pb-1 text-amber-500 hover:text-white transition-colors">
            RETURN TO HOME
          </Link>
        </div>

      </div>
    </div>
  );
}
