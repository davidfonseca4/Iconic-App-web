'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { label: 'MUSICIANS', value: 'Music', img: '/images/cobain_guitar.png' },
  { label: 'ATHLETES', value: 'Sports', img: '/images/jordan_shoe.png' },
  { label: 'ACTORS', value: 'Cinema', img: '/images/marilyn_dress.png' },
  { label: 'ROYALTY', value: 'Royalty', img: '/images/diana_bracelet.png' },
  { label: 'DIRECTORS', value: 'Cinema', img: '/images/editorial_2.png' },
  { label: 'POLITICIANS', value: 'Politics', img: '/images/editorial_1.png' }
];

export default function LegendsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.legend-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.legend-desc', { y: 30, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
      gsap.from('.legend-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <div className="text-center mb-24 max-w-3xl mx-auto">
        <h1 className="legend-title font-playfair text-6xl md:text-8xl mb-8">The Legends</h1>
        <p className="legend-desc font-dm-mono text-white/60 leading-relaxed text-sm md:text-base">
          Explore the lives of the individuals who shaped our culture. 
          From legendary musicians to iconic athletes, discover the stories behind the artifacts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link 
            href={`/collection?category=${cat.value}`} 
            key={cat.label}
            className="legend-card group relative aspect-[4/3] overflow-hidden border border-white/5 flex items-center justify-center bg-[#0a0a0a]"
          >
            {/* Background Image (Hover Effect) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 z-0">
               <Image 
                 src={cat.img} 
                 alt={cat.label} 
                 fill 
                 className="object-cover grayscale mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-1000"
               />
               <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-8 text-center flex flex-col items-center gap-4">
              <span className="font-dm-mono tracking-[0.3em] text-white/80 group-hover:text-amber-500 transition-colors duration-500 text-sm">
                {cat.label}
              </span>
              <div className="w-0 h-[1px] bg-amber-500 group-hover:w-12 transition-all duration-500"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
