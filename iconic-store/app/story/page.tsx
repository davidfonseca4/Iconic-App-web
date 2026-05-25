'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro fade in
      gsap.from('.story-intro', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Sections reveal on scroll
      const sections = gsap.utils.toArray<HTMLElement>('.story-section');
      sections.forEach((section) => {
        gsap.from(section, {
          y: 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-40 pb-32 min-h-screen bg-[#060606] text-white selection:bg-amber-500/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="mb-32 text-center story-intro">
          <p className="font-dm-mono text-amber-500 text-xs tracking-[0.3em] mb-6 uppercase">The Origins</p>
          <h1 className="font-playfair text-5xl md:text-8xl mb-8 leading-tight">
            History is not just read.<br/>
            <span className="italic text-white/40">It is held.</span>
          </h1>
          <p className="font-dm-mono text-white/60 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Founded on the belief that human achievement leaves an indelible mark on the objects it touches, ICONIC is the world&apos;s premier destination for authenticated, museum-grade artifacts. We bridge the gap between institutional archives and private collections.
          </p>
        </div>

        {/* Feature Image 1 */}
        <div className="aspect-[21/9] w-full relative mb-32 story-section overflow-hidden">
          <Image 
            src="/images/editorial_2.png" 
            fill 
            alt="Historical archives" 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>

        {/* The Quest Section */}
        <div className="flex flex-col md:flex-row gap-16 mb-32 story-section">
          <div className="md:w-1/2">
            <h2 className="font-playfair text-4xl md:text-6xl mb-6">The Quest for<br/>Authenticity</h2>
          </div>
          <div className="md:w-1/2 font-dm-mono text-white/50 text-sm leading-loose space-y-6">
            <p>
              In a world flooded with replicas, provenance is everything. Our team of expert historians, appraisers, and archivists spend thousands of hours tracking the lineage of every piece that enters our vault.
            </p>
            <p>
              From the original manuscript of a Nobel laureate to the worn gloves of a heavyweight champion, every item comes with an ironclad certificate of authenticity, detailing its exact journey through time before reaching your hands.
            </p>
          </div>
        </div>

        {/* Feature Image 2 */}
        <div className="flex flex-col md:flex-row gap-8 mb-32 story-section">
          <div className="w-full md:w-1/2 aspect-square relative overflow-hidden">
            <Image 
              src="/images/editorial_1.png" 
              fill 
              alt="Curation process" 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="w-full md:w-1/2 aspect-square bg-[#0a0a0a] border border-white/5 p-12 flex flex-col justify-center">
            <p className="font-dm-mono text-amber-500 text-xs tracking-widest mb-6">01 // PRESERVATION</p>
            <h3 className="font-playfair text-3xl md:text-5xl mb-6">Museum-Grade<br/>Care</h3>
            <p className="font-dm-mono text-white/50 text-sm leading-relaxed">
              We employ climate-controlled environments, UV-filtered displays, and acid-free archival storage to ensure that whether you purchase a 13th-century manuscript or a 1990s stage outfit, it remains perfectly preserved for generations to come.
            </p>
          </div>
        </div>

        {/* Final Statement */}
        <div className="text-center py-20 border-y border-white/10 story-section">
          <h2 className="font-playfair text-4xl md:text-6xl mb-8 italic">Own a piece of the legend.</h2>
          <p className="font-dm-mono text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Our artifacts are not just investments; they are physical connections to the people and moments that shaped our world. When you acquire a piece from ICONIC, you become the custodian of history.
          </p>
        </div>

      </div>
    </div>
  );
}
