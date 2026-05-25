'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { getProducts, Product } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Marquee from '@/components/Marquee';
import Image from 'next/image';
import Link from 'next/link';

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance
      if (heroTextRef.current) {
        const texts = heroTextRef.current.children;
        gsap.fromTo(texts, 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.3, ease: 'power3.out', delay: 0.2 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts({ limit: 100 });
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, []);

  const featuredDrops = useMemo(() => products.filter((p) => p.id <= 12), [products]);
  const latestCollection = useMemo(() => products.filter((p) => !p.featured).slice(0, 6), [products]);

  return (
    <div className="w-full relative block">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <HeroScene />
        
        <div ref={heroTextRef} className="z-10 text-center flex flex-col items-center pt-20 px-4">
          <h1 className="font-playfair text-4xl sm:text-6xl md:text-[8rem] tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.3em] pl-[0.1em] sm:pl-[0.2em] md:pl-[0.3em] leading-none mb-6 text-white drop-shadow-2xl">
            ICONIC
          </h1>
          <p className="font-dm-mono text-amber-500 text-xs sm:text-sm tracking-widest uppercase bg-black/40 px-4 py-2 backdrop-blur-sm">
            Objects of legend. Authenticated.
          </p>
        </div>

        <button 
          onClick={() => {
            const el = document.getElementById('latest-drops');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bottom-12 z-10 font-dm-mono text-xs tracking-widest text-white border border-amber-500 px-8 py-4 hover:bg-amber-500 hover:text-black transition-colors duration-300"
        >
          EXPLORE THE COLLECTION ↓
        </button>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Featured Drop Section */}
      <section id="latest-drops" className="bg-[#050505] border-b border-white/5 relative py-16 md:py-32">
        <div className="px-6 md:px-24 mb-8 md:mb-12 w-full">
          <h2 className="font-playfair text-3xl md:text-6xl text-white leading-tight">LATEST DROPS</h2>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        <div className="flex gap-6 md:gap-12 px-6 md:px-24 w-full overflow-x-auto pb-12 hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
          {!loading && featuredDrops.length === 0 && (
            <p className="font-dm-mono text-white/50">No drops available right now.</p>
          )}
          {featuredDrops.map((product) => (
            <div key={product.id} className="w-[85vw] md:w-[420px] shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
          {/* Spacer to allow the last item to scroll into center on mobile */}
          <div className="w-[1px] shrink-0"></div>
        </div>
      </section>

      {/* Ocelot-Style Color Block Split */}
      <section className="w-full flex flex-col lg:flex-row min-h-[80vh]">
        <div className="w-full lg:w-1/2 bg-[#dedede] text-black p-6 sm:p-12 md:p-24 lg:p-32 flex flex-col justify-center">
          <p className="font-dm-mono text-xs tracking-[0.4em] mb-8 md:mb-12 uppercase font-semibold font-semibold">The Crown Jewels</p>
          <h2 className="font-playfair text-6xl md:text-[8rem] leading-[0.9] tracking-tighter mb-8">
            ROYAL<br />ARCHIVES
          </h2>
          <p className="font-dm-mono text-sm max-w-md leading-relaxed mb-16 opacity-80">
            A meticulous selection of artifacts belonging to the world&apos;s most powerful monarchies. From documented jewelry to personal correspondence.
          </p>
          <Link href="/collection?category=Royalty" className="inline-block border border-black px-10 py-5 font-dm-mono text-xs tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-500 w-fit">
            EXPLORE ROYALTY
          </Link>
        </div>
        <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-full">
          <Image 
            src="/images/royal_archives.png" 
            alt="Royal Necklace" 
            fill 
            className="object-cover grayscale-[40%]"
          />
        </div>
      </section>

      {/* "THE LEGENDS" Category Strip */}
      <section className="py-16 md:py-32 px-6 md:px-24 bg-[#0a0a0a]">
        <h2 className="font-playfair text-3xl md:text-4xl text-center mb-12 md:mb-16">THE LEGENDS</h2>
        <div className="flex md:flex-wrap md:justify-center gap-8 md:gap-20 overflow-x-auto pb-6 md:pb-0 hide-scrollbar w-full">
          {['MUSICIANS', 'ATHLETES', 'ACTORS', 'ROYALTY', 'DIRECTORS', 'POLITICIANS'].map((category) => {
            const categoryMap: Record<string, string> = {
              'MUSICIANS': 'Music',
              'ATHLETES': 'Sports',
              'ACTORS': 'Cinema',
              'ROYALTY': 'Royalty',
              'DIRECTORS': 'Cinema',
              'POLITICIANS': 'Politics'
            };
            
            return (
              <Link href={`/collection?category=${categoryMap[category]}`} key={category} className="flex flex-col items-center group cursor-pointer shrink-0">
                <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full overflow-hidden mb-6 border border-white/10 relative">
                  <Image 
                    src={`/images/cat_${category.toLowerCase()}.png`}
                    alt={category}
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  />
                </div>
                <span className="font-dm-mono text-[11px] tracking-widest text-white/60 group-hover:text-amber-500 transition-colors">
                  {category}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Editorial Feature Block - Squarespace Style */}
      <section className="py-16 md:py-32 px-6 md:px-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-1/2 lg:sticky lg:top-40 h-fit">
            <p className="font-dm-mono text-amber-500 text-xs tracking-[0.2em] mb-4 md:mb-6">WHY ICONIC</p>
            <h2 className="font-playfair text-3xl sm:text-5xl md:text-7xl leading-[1.1] mb-6 md:mb-8">
              History is not just read.<br />
              <span className="text-white/40 italic">It is held.</span>
            </h2>
            <p className="font-dm-mono text-white/60 mb-12 max-w-md leading-relaxed text-sm">
              We specialize in the impossible. From championship matches to sold-out stadium tours, our objects carry the energy of their legendary creators. Every artifact is verified, cataloged, and preserved for the next generation of collectors.
            </p>
            <Link href="/story" className="inline-block border border-white/20 px-8 py-4 font-dm-mono text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-500">
              READ OUR STORY
            </Link>
          </div>
          
          <div className="lg:w-1/2 flex flex-col gap-8">
            <div className="aspect-[4/5] relative w-full overflow-hidden group">
               <Image src="/images/editorial_1.png" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="Legendary Sneakers" />
            </div>
            <div className="aspect-[16/9] relative w-full overflow-hidden group">
               <Image src="/images/editorial_2.png" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="Historic Manuscript" />
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetrical Grid Collection - Squarespace Style */}
      <section className="py-16 md:py-32 px-6 md:px-24 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 border-b border-white/10 pb-6 md:pb-12 gap-8">
          <h2 className="font-playfair text-3xl sm:text-5xl md:text-7xl w-full md:w-1/2 leading-tight">
            CURATED<br/>ARCHIVES
          </h2>
          <div className="flex flex-col items-start md:items-end w-full md:w-1/2">
            <p className="font-dm-mono text-white/50 text-sm max-w-sm mb-4 md:mb-6 md:text-right">
              A meticulous selection of our most recent acquisitions. Museum-grade artifacts ready for private collections.
            </p>
            <Link href="/collection" className="font-dm-mono text-xs tracking-widest border-b border-amber-500 pb-1 text-amber-500 hover:text-white transition-colors">
              VIEW ALL INVENTORY
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
          {/* Left Column */}
          <div className="w-full md:w-1/2 flex flex-col gap-16 md:gap-24">
            {latestCollection.filter((_, i) => i % 2 === 0).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Right Column (Offset) */}
          <div className="w-full md:w-1/2 flex flex-col gap-16 md:gap-24 md:mt-48">
            {latestCollection.filter((_, i) => i % 2 !== 0).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Ocelot-Style Centered Editorial */}
      <section className="py-24 md:py-48 px-6 md:px-24 bg-[#030303] flex justify-center items-center border-t border-white/5">
        <div className="max-w-5xl text-center">
          <p className="font-dm-mono text-amber-500 text-xs tracking-[0.4em] mb-8 md:mb-12 uppercase">Our Philosophy</p>
          <h2 className="font-playfair text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.3] text-white">
            We don&apos;t just sell items. We preserve the exact moments when <span className="italic text-white/50">greatness</span> was forged.
          </h2>
        </div>
      </section>

      {/* Ocelot-Style Full Bleed Banner */}
      <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden border-y border-white/5">
        <Image 
          src="/images/the_vault.png" 
          alt="The Vault Door" 
          fill 
          className="object-cover grayscale-[80%] opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-[1500ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 pointer-events-none"></div>
        <div className="relative z-10 text-center flex flex-col items-center px-6">
          <h2 className="font-playfair text-4xl sm:text-6xl md:text-[9rem] text-white mb-8 md:mb-12 tracking-tighter drop-shadow-2xl">THE VAULT</h2>
          <Link href="/vault" className="bg-white text-black font-dm-mono text-xs tracking-[0.2em] px-8 sm:px-12 py-4 sm:py-5 hover:bg-amber-500 hover:text-white transition-colors duration-500">
            REQUEST PRIVATE ACCESS
          </Link>
        </div>
      </section>

      {/* Ocelot-Style Edge-to-Edge Grid (Journal/Instagram) */}
      <section className="w-full bg-[#050505] pt-32">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl mb-4">JOURNAL</h2>
          <p className="font-dm-mono text-xs text-white/50 tracking-[0.2em] uppercase">Follow the Hunt</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 w-full">
          {[
            { id: 1, slug: 'paul-newman-rolex-daytona-1968' },
            { id: 2, slug: 'pete-townshend-shattered-les-paul-1976' },
            { id: 3, slug: 'rocky-marciano-training-gloves-1952' },
            { id: 4, slug: 'steve-mcqueen-bomber-jacket-1963' }
          ].map((item) => (
            <Link href={`/product/${item.slug}`} key={item.id} className="aspect-square relative w-full group overflow-hidden border-r border-t border-white/5 last:border-r-0 block cursor-pointer">
              <Image 
                src={`/images/journal_${item.id}.png`} 
                alt={`Journal Artifact ${item.id}`} 
                fill 
                className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="font-dm-mono text-white text-xs tracking-widest border border-white/30 px-6 py-2 backdrop-blur-sm">DISCOVER</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
