'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { getProductBySlug, Product } from '@/lib/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { hasAuthToken } from '@/lib/session';


export default function ProductDetail({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const { addItem } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getProductBySlug(params.slug);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [params.slug]);

  if (loading) {
    return <div className="pt-32 text-center font-playfair text-3xl">Loading product...</div>;
  }

  if (!product) return <div className="pt-32 text-center font-playfair text-3xl">Product not found</div>;

  const handleAddToCart = () => {
    if (!hasAuthToken()) {
      setAuthError('Sign in required to add artifacts to your cart.');
      router.push('/login');
      return;
    }

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
    setAuthError('');
  };

  return (
    <div className="flex flex-col w-full bg-[#050505]">
      <div className="flex flex-col lg:flex-row w-full min-h-screen pt-24">
        
        {/* Left: Images / 3D Viewer */}
        <div className="w-full lg:w-[55%] relative flex items-center justify-center bg-[#0a0a0a] border-r border-white/10 p-4 sm:p-8 lg:p-0 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
          <div className="absolute top-6 left-6 sm:left-8 z-10 bg-amber-500 text-black font-dm-mono text-[10px] tracking-widest px-4 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
            CERTIFIED AUTHENTIC · REGISTRY #{product.id.toString().padStart(4, '0')}
          </div>

            <div className="relative w-full max-w-[600px] aspect-[4/5] overflow-hidden group cursor-crosshair bg-[#030303]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain p-8 grayscale-[10%] contrast-[1.1] transition-transform duration-700 group-hover:scale-125"
              />
            </div>
        </div>

        {/* Right: Info Panel */}
        <div className="w-full lg:w-[45%] p-6 sm:p-12 lg:p-20 pt-12 lg:pt-12 pb-24 lg:pb-32">
          <p className="font-dm-mono text-xs tracking-widest text-white/50 mb-6 uppercase">
            {product.category} / {product.subcategory}
          </p>
          
          <h1 className="font-playfair text-5xl lg:text-6xl mb-6 leading-[1.1]">
            {product.name}
          </h1>

          <p className="font-dm-mono text-amber-500 text-sm mb-12">
            Used by {product.person} · {product.year}
          </p>

          <p className="font-playfair text-4xl mb-8">
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price)}
          </p>

          <p className="font-dm-mono text-sm leading-relaxed text-white/80 mb-12 max-w-xl">
            {product.description}
          </p>

          <div className="mb-12 border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="font-dm-mono text-xs text-white/50 mb-4 tracking-widest">PROVENANCE CHAIN</h3>
            <ul className="space-y-4">
              {product.provenance.split('·').map((step, idx) => (
                <li key={idx} className="flex gap-4 font-dm-mono text-sm items-start">
                  <span className="text-amber-500 mt-1">↳</span>
                  <span className="text-white/80">{step.trim()}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-amber-500 text-black h-[60px] font-playfair text-xl hover:bg-amber-400 hover:scale-[1.02] transition-all duration-300"
          >
            ADD TO CART
          </button>

          {authError && (
            <p className="mt-4 font-dm-mono text-xs tracking-wider text-red-400">{authError}</p>
          )}

          <div className="mt-6 text-center">
            <button className="font-dm-mono text-[10px] text-white/50 tracking-widest underline hover:text-white transition-colors">
              REQUEST AUTHENTICATION REPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
