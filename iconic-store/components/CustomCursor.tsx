'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      // Lerp (0.5 for much faster, snappier movement)
      cursorX += (mouseX - cursorX) * 0.5;
      cursorY += (mouseY - cursorY) * 0.5;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
        xPercent: -50,
        yPercent: -50,
      });

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden md:block fixed top-0 left-0 w-[30px] h-[30px] rounded-full bg-white pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'difference' }}
    />
  );
}
