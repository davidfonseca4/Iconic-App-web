'use client';

import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createCheckoutRequest } from '@/lib/api';
import { hasAuthToken } from '@/lib/session';

export default function CheckoutPage() {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  useEffect(() => {
    const authenticated = hasAuthToken();
    setIsAuthenticated(authenticated);
    setMounted(true);

    if (!authenticated) {
      router.replace('/login');
    }
  }, [router]);

  if (!mounted || !isAuthenticated) return <div className="min-h-screen bg-[#060606]"></div>;

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-32 min-h-[70vh] bg-[#060606] text-white flex flex-col items-center justify-center">
        <h1 className="font-playfair text-4xl mb-6">Your Vault is Empty</h1>
        <p className="font-dm-mono text-white/50 mb-12">You have not selected any artifacts for acquisition.</p>
        <button onClick={() => router.push('/collection')} className="border border-white/20 px-8 py-4 font-dm-mono text-xs tracking-widest hover:bg-white hover:text-black transition-colors">
          RETURN TO ARCHIVES
        </button>
      </div>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCheckoutRequest({ ...formData, items, total });
      router.push('/order-confirmation');
    } catch (error) {
      console.error(error);
      router.push('/order-confirmation');
    }
  };

  return (
    <div className="pt-32 pb-32 min-h-screen bg-[#050505] text-white selection:bg-amber-500/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16">
        
        {/* Left Form Column */}
        <div className="w-full lg:w-3/5">
          <h1 className="font-playfair text-4xl md:text-5xl mb-12">Secure Checkout</h1>
          
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-16">
            
            {/* Identity */}
            <section>
              <h2 className="font-dm-mono text-amber-500 text-xs tracking-[0.2em] mb-8 uppercase">01 // Identity Verification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input required type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-4 font-dm-mono text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                <input required type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-4 font-dm-mono text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                <input required type="email" placeholder="Secure Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-4 font-dm-mono text-sm focus:outline-none focus:border-amber-500 transition-colors md:col-span-2" />
              </div>
            </section>

            <section>
              <h2 className="font-dm-mono text-amber-500 text-xs tracking-[0.2em] mb-8 uppercase">02 // Contact Information</h2>
              <p className="font-dm-mono text-white/40 text-xs mb-8 leading-loose max-w-lg">
                Due to the exceptional value of our inventory, all acquisitions are finalized in person at our secure collection center. Please provide a reliable contact number for our concierge to arrange your private viewing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input required type="tel" placeholder="Primary Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-4 font-dm-mono text-sm focus:outline-none focus:border-amber-500 transition-colors md:col-span-2" />
                <input type="text" placeholder="Preferred Contact Time (Optional)" className="w-full bg-transparent border-b border-white/20 pb-4 font-dm-mono text-sm focus:outline-none focus:border-amber-500 transition-colors md:col-span-2" />
              </div>
            </section>
            
          </form>
        </div>

        {/* Right Summary Column */}
        <div className="w-full lg:w-2/5">
          <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 sticky top-32">
            <h2 className="font-playfair text-2xl mb-8">Acquisition Summary</h2>
            
            <div className="flex flex-col gap-6 mb-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 relative bg-[#030303] border border-white/5 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2 grayscale contrast-125" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-playfair text-sm leading-tight mb-1">{item.name}</h3>
                    <p className="font-dm-mono text-white/50 text-[10px]">QTY: {item.quantity}</p>
                    <p className="font-dm-mono text-amber-500 text-xs mt-2">
                      {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8 space-y-4 font-dm-mono text-sm mb-8">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(total)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>In-Person Finalization</span>
                <span>Required</span>
              </div>
              <div className="flex justify-between text-lg pt-4 border-t border-white/10">
                <span>TOTAL</span>
                <span className="text-amber-500">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(total)}</span>
              </div>
            </div>

            <button type="submit" form="checkout-form" disabled={loading} className="w-full flex justify-center items-center bg-amber-500 text-black font-playfair py-5 text-xl hover:bg-amber-400 transition-colors disabled:opacity-50">
              {loading ? 'SECURING REQUEST...' : 'REQUEST ACQUISITION'}
            </button>
            <p className="font-dm-mono text-[10px] text-white/40 text-center mt-6 uppercase tracking-widest leading-relaxed">
              No payment is required online.<br/>
              Payment will be secured at our physical center.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
