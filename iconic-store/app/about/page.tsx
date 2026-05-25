'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro sequence
      gsap.from('.about-intro', {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
      });

      // Parallax images
      gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((img) => {
        gsap.to(img, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // Fade-up sections
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-40 pb-32 bg-[#030303] text-white min-h-screen selection:bg-amber-500/30">
      
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-40 text-center">
        <p className="about-intro font-dm-mono text-amber-500 text-xs tracking-[0.3em] uppercase mb-8">About Iconic</p>
        <h1 className="about-intro font-playfair text-5xl md:text-8xl leading-[1.1] mb-12">
          Curators of the <br className="hidden md:block"/>
          <span className="italic text-white/40">extraordinary.</span>
        </h1>
        <p className="about-intro font-dm-mono text-white/60 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          ICONIC is the world&apos;s premier destination for authenticated objects of legend. 
          We source, authenticate, and curate the physical fragments of history left behind by those who shaped our world, 
          making them accessible to the most discerning private collectors.
        </p>
      </section>

      {/* Royal Gallery Section */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto mb-40">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-8">
          
          <div className="w-full md:w-5/12 flex flex-col gap-16">
            <div className="fade-up relative w-full aspect-[4/5] overflow-hidden border border-white/5">
              <Image 
                src="/images/princess-diana-diamond-tiara-1991.png" 
                alt="Princess Diana Diamond Tiara" 
                fill 
                className="parallax-img object-cover scale-[1.2] grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 font-dm-mono text-xs text-white/80 tracking-widest">DIANA&apos;S TIARA, 1991</div>
            </div>
            
            <div className="fade-up font-dm-mono text-sm leading-loose text-white/50 pl-4 md:pl-12 border-l border-amber-500/50">
              <p>
                From the private vaults of European monarchs to the heavily guarded archives of modern empires, our sourcing network spans the globe. We specialize in acquiring items that were never meant to be sold.
              </p>
            </div>
          </div>

          <div className="w-full md:w-7/12 flex flex-col gap-16 md:-mt-32">
            <div className="fade-up">
              <h2 className="font-playfair text-4xl md:text-6xl mb-6">A Legacy of Royalty</h2>
              <p className="font-dm-mono text-white/60 text-sm leading-relaxed max-w-lg mb-8">
                Our Royal Collection represents the pinnacle of human craftsmanship and historical weight. When you acquire a piece of royalty, you don&apos;t just buy an object; you inherit a lineage.
              </p>
            </div>
            
            <div className="fade-up relative w-full aspect-video overflow-hidden border border-white/5">
              <Image 
                src="/images/tsar-nicholas-ii-sapphire-brooch-1953.png" 
                alt="Tsar Nicholas II Sapphire Brooch" 
                fill 
                className="parallax-img object-cover scale-[1.2] grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
              <div className="absolute bottom-6 right-6 font-dm-mono text-xs text-white/80 tracking-widest text-right">
                TSAR NICHOLAS II<br/>SAPPHIRE BROOCH
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* The Standard Section */}
      <section className="bg-[#0a0a0a] border-y border-white/10 py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 items-center">
          
          <div className="w-full md:w-1/2 fade-up relative aspect-square max-w-[500px]">
             <Image 
                src="/images/grace-kelly-silver-tea-set-1953.png" 
                alt="Grace Kelly Silver Tea Set" 
                fill 
                className="object-contain p-8 grayscale-[50%]"
              />
              {/* Decorative circles */}
              <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-12 border border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
          </div>

          <div className="w-full md:w-1/2 fade-up">
            <h2 className="font-playfair text-4xl md:text-5xl mb-8">The ICONIC Standard</h2>
            <div className="space-y-8 font-dm-mono text-sm text-white/60 leading-relaxed">
              <p>
                Every artifact in our inventory is backed by the ICONIC Standard—a rigorous authentication protocol that exceeds museum requirements. We collaborate with independent forensic experts, master appraisers, and historical estates.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <h4 className="text-white font-playfair text-xl mb-2">01. Provenance</h4>
                  <p className="text-xs">Unbroken chain of custody documentation dating back to the origin.</p>
                </div>
                <div>
                  <h4 className="text-white font-playfair text-xl mb-2">02. Materials</h4>
                  <p className="text-xs">Forensic material analysis to verify period-accurate compositions.</p>
                </div>
                <div>
                  <h4 className="text-white font-playfair text-xl mb-2">03. Legality</h4>
                  <p className="text-xs">Strict compliance with international cultural heritage and export laws.</p>
                </div>
                <div>
                  <h4 className="text-white font-playfair text-xl mb-2">04. Preservation</h4>
                  <p className="text-xs">Climate-controlled transit and archival-grade packaging.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="text-center pt-32 pb-16 px-6 fade-up">
         <p className="font-dm-mono text-amber-500 text-xs tracking-widest mb-6">BECOME A CUSTODIAN</p>
         <h2 className="font-playfair text-4xl md:text-6xl mb-12">History awaits.</h2>
         <a href="/collection" className="inline-block border border-white/20 px-12 py-5 font-dm-mono text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-500">
           EXPLORE THE ARCHIVES
         </a>
      </section>
      
    </div>
  );
}
