import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    category: string;
    subcategory: string;
    price: number;
    images: string[];
  };
  small?: boolean;
}

export default function ProductCard({ product, small = false }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group block relative overflow-hidden bg-[#0a0a0a]">
      <div className={`relative w-full ${small ? 'aspect-square' : 'aspect-[4/5]'} overflow-hidden bg-[#030303]`}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain p-6 grayscale-[20%] contrast-[1.1] transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
      <div className="p-6 relative">
        <p className="font-dm-mono text-[10px] text-white/60 tracking-widest uppercase mb-2">
          {product.category} · {product.subcategory}
        </p>
        <h3 className={`font-playfair ${small ? 'text-xl' : 'text-2xl'} mb-2 text-white`}>
          {product.name}
        </h3>
        <p className="font-dm-mono text-amber-500 text-sm">
          {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price)}
        </p>
        {/* Animated line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </div>
    </Link>
  );
}
