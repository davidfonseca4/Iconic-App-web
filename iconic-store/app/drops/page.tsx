'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, Product } from '@/lib/api';

export default function DropsPage() {
  // Simulate a countdown timer for the drop (approx 3 months)
  const [timeLeft, setTimeLeft] = useState({
    days: 90,
    hours: 14,
    minutes: 59,
    seconds: 59
  });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts({ limit: 100 });
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    void loadProducts();
  }, []);

  // Select two highly exclusive products for the drop
  // For example, finding a specific item or just picking the first two non-vault items
  const dropProducts = products.filter(p => !p.vault && p.price > 100000).slice(0, 2);

  return (
    <div className="pt-32 pb-24 px-6 md:px-24 min-h-screen bg-[#020202] text-white">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-24 text-center border-b border-white/10 pb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <p className="font-dm-mono text-red-600 text-xs tracking-[0.4em] uppercase font-bold">Live Drop</p>
          </div>
          <h1 className="font-playfair text-4xl sm:text-6xl md:text-[8rem] tracking-tighter text-white mb-12 drop-shadow-2xl">
            THE ARCHIVE REVEAL
          </h1>
          
          <div className="flex flex-col items-center justify-center">
            <p className="font-dm-mono text-xs tracking-[0.3em] text-white/50 uppercase mb-4">Time Remaining</p>
            <div className="flex gap-4 md:gap-8 font-dm-mono text-3xl sm:text-4xl md:text-6xl text-amber-500">
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[10px] text-white/30 tracking-widest mt-2">DAYS</span>
              </div>
              <span className="text-white/20">:</span>
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] text-white/30 tracking-widest mt-2">HRS</span>
              </div>
              <span className="text-white/20">:</span>
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] text-white/30 tracking-widest mt-2">MIN</span>
              </div>
              <span className="text-white/20">:</span>
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] text-white/30 tracking-widest mt-2">SEC</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {dropProducts.length > 0 ? (
            dropProducts.map((item) => (
              <Link href={`/product/${item.slug}`} key={item.id} className="group flex flex-col block">
                <div className="relative aspect-[4/5] bg-[#050505] border border-white/10 mb-8 overflow-hidden">
                  <Image 
                    src={item.images[0]} 
                    alt={item.name} 
                    fill 
                    className="object-cover p-12 grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute top-6 left-6 font-dm-mono text-xs tracking-widest bg-amber-500 text-black px-3 py-1 font-bold">
                    DROP EXCLUSIVE
                  </div>
                </div>
                <div>
                  <p className="font-dm-mono text-amber-500 text-xs tracking-widest mb-3">{item.category}</p>
                  <h2 className="font-playfair text-3xl md:text-4xl mb-4 group-hover:text-amber-500 transition-colors">{item.name}</h2>
                  <p className="font-dm-mono text-white/50 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center border-t border-white/10 pt-6">
                    <span className="font-dm-mono text-lg tracking-widest">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency, maximumFractionDigits: 0 }).format(item.price)}
                    </span>
                    <span className="font-dm-mono text-xs tracking-[0.2em] underline group-hover:text-amber-500">
                      SECURE NOW
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
             <div className="col-span-2 text-center py-24">
                <p className="font-dm-mono text-white/50">Curating the next historical drop...</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
