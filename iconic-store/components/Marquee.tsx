import React from 'react';

export default function Marquee() {
  const text = "AUTHENTICATED · EST. 2024 · VERIFIED PROVENANCE · ICONIC OBJECTS · LIVING HISTORY · AUTHENTICATED · EST. 2024 · VERIFIED PROVENANCE · ICONIC OBJECTS · LIVING HISTORY · ";
  
  return (
    <div className="w-full overflow-hidden flex bg-[#0a0a0a] border-y border-white/10 py-4 group">
      <div className="animate-marquee flex-shrink-0 font-dm-mono text-[13px] text-white/40 tracking-widest whitespace-nowrap px-2 group-hover:[animation-play-state:paused]">
        {text}
      </div>
      <div className="animate-marquee flex-shrink-0 font-dm-mono text-[13px] text-white/40 tracking-widest whitespace-nowrap px-2 group-hover:[animation-play-state:paused]">
        {text}
      </div>
    </div>
  );
}
