'use client';

import { useCartStore } from '@/store/cartStore';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { hasAuthToken } from '@/lib/session';

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem } = useCartStore();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.to(overlayRef.current, { opacity: 1, display: 'block', duration: 0.3 });
        gsap.to(sidebarRef.current, { xPercent: 0, duration: 0.5, ease: 'power3.out' });
      } else {
        gsap.to(sidebarRef.current, { xPercent: 100, duration: 0.5, ease: 'power3.in' });
        gsap.to(overlayRef.current, { opacity: 0, display: 'none', duration: 0.3, delay: 0.2 });
      }
    });
    return () => ctx.revert();
  }, [isOpen]);

  // Initial setup to ensure it starts off-screen without transition flash
  useEffect(() => {
    gsap.set(sidebarRef.current, { xPercent: 100 });
  }, []);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isAuthenticated = hasAuthToken();

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 z-[60] hidden opacity-0"
        onClick={toggleCart}
      />
      <div 
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-[100vw] md:w-[420px] bg-[#0a0a0a] border-l border-white/10 z-[70] flex flex-col"
      >
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <h2 className="font-playfair text-2xl">YOUR CART</h2>
          <button onClick={toggleCart} className="text-white/50 hover:text-amber-500 transition-colors">
            ✕
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 flex flex-col gap-6">
          {items.length === 0 ? (
            <p className="text-white/50 font-dm-mono text-sm">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-24 relative bg-[#030303] border border-white/5">
                  <Image src={item.image} alt={item.name} fill className="object-contain p-2 grayscale contrast-125" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-playfair text-lg leading-tight">{item.name}</h3>
                    <p className="font-dm-mono text-amber-500 text-xs mt-1">
                      {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}
                    </p>
                  </div>
                  <div className="flex justify-end items-center mt-4">
                    <button onClick={() => removeItem(item.id)} className="text-xs font-dm-mono text-white/50 hover:text-red-500 underline">
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-white/10">
          <div className="flex justify-between font-dm-mono text-sm mb-6">
            <span>SUBTOTAL</span>
            <span className="text-amber-500">
              {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(total)}
            </span>
          </div>
          <Link 
            href={isAuthenticated ? '/checkout' : '/login'}
            onClick={toggleCart}
            className="w-full bg-amber-500 text-black font-playfair py-4 text-lg hover:bg-amber-400 transition-colors flex justify-center items-center"
          >
            {isAuthenticated ? 'CHECKOUT' : 'SIGN IN TO CHECKOUT'}
          </Link>
          {!isAuthenticated && (
            <p className="mt-4 text-center font-dm-mono text-[10px] tracking-widest text-white/50 uppercase">
              Sign in required for secure checkout.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
