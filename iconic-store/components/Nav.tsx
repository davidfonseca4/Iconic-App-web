'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getMe } from '@/lib/api';
import { AUTH_EVENT, clearAuthToken, getAuthToken } from '@/lib/session';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Nav() {
  const cartItems = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const validateSession = async () => {
      const token = getAuthToken();
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await getMe(token);
        setIsAuthenticated(true);
      } catch {
        clearAuthToken();
        setIsAuthenticated(false);
      }
    };

    const onAuthChanged = () => {
      void validateSession();
    };

    void validateSession();
    window.addEventListener(AUTH_EVENT, onAuthChanged);
    return () => window.removeEventListener(AUTH_EVENT, onAuthChanged);
  }, [pathname]);

  const handleLogout = () => {
    clearAuthToken();
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="font-playfair text-3xl tracking-[0.3em] text-white z-50" onClick={() => setIsMenuOpen(false)}>
            ICONIC
          </Link>

          <nav className="hidden md:flex gap-12 font-dm-mono text-xs tracking-[0.2em] text-white uppercase">
            <Link href="/collection" className="hover:text-amber-500 transition-colors">Collection</Link>
            <Link href="/drops" className="hover:text-amber-500 transition-colors">Drops</Link>
            <Link href="/legends" className="hover:text-amber-500 transition-colors">Legends</Link>
            <Link href="/about" className="hover:text-amber-500 transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-6 text-white z-50">
            <div className="hidden md:flex items-center gap-4 font-dm-mono text-[11px] tracking-[0.2em] uppercase">
              {isAuthenticated ? (
                <>
                  <span className="text-amber-500">Signed In</span>
                  <button onClick={handleLogout} className="hover:text-amber-500 transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-amber-500 transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="hover:text-amber-500 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </div>
            <button className="hover:text-amber-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button onClick={toggleCart} className="relative hover:text-amber-500 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Button (Mobile only) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden text-white focus:outline-none flex flex-col justify-center gap-1.5 w-6 h-6"
              aria-label="Toggle Menu"
            >
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-center items-center px-12 transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 font-playfair text-3xl tracking-widest text-white uppercase text-center w-full mb-12">
          <Link href="/collection" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors py-2 border-b border-white/5 w-full block">Collection</Link>
          <Link href="/drops" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors py-2 border-b border-white/5 w-full block">Drops</Link>
          <Link href="/legends" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors py-2 border-b border-white/5 w-full block">Legends</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors py-2 border-b border-white/5 w-full block">About</Link>
        </nav>

        {/* Mobile Authentication Links */}
        <div className="flex flex-col items-center gap-4 font-dm-mono text-xs tracking-[0.2em] uppercase text-white/80 border-t border-white/10 pt-6 w-full max-w-[240px] text-center">
          {isAuthenticated ? (
            <>
              <span className="text-amber-500">Signed In</span>
              <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="hover:text-amber-500 transition-colors mt-2">
                Logout
              </button>
            </>
          ) : (
            <div className="flex justify-center gap-8 w-full">
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors">
                Login
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-8 text-center font-dm-mono text-[9px] text-white/30 tracking-widest uppercase">
          Objects of legend. Authenticated.
        </div>
      </div>
    </>
  );
}
