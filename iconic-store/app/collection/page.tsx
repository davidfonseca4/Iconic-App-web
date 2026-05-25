'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { getProducts, Product } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import gsap from 'gsap';
import { useSearchParams } from 'next/navigation';

function CollectionContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All');
  const [activeEra, setActiveEra] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const activeFilterCount = (activeCategory !== 'All' ? 1 : 0) + (activeEra !== 'All' ? 1 : 0) + (search ? 1 : 0);

  // Update active category if URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

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

  const filteredProducts = products.filter(p => {
    if (p.vault) return false;
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchEra = activeEra === 'All' || p.era === activeEra;
    const matchSearch = p.person.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchEra && matchSearch;
  });

  // Fade animation when filters change
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }
  }, [activeCategory, activeEra, search, sortBy]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price ↑') return a.price - b.price;
    if (sortBy === 'Price ↓') return b.price - a.price;
    if (sortBy === 'Most Famous') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return b.id - a.id; // Newest by ID
  });

  return (
    <div className="pt-32 px-6 md:px-12 flex flex-col md:flex-row gap-12 max-w-[1800px] mx-auto">
      {/* Sidebar Filters */}
      <aside className={`w-full md:w-[240px] flex-shrink-0 md:sticky md:top-32 h-fit border-b md:border-b-0 border-white/10 pb-6 md:pb-0 transition-all duration-300 ${
        isFiltersOpen ? 'block' : 'hidden md:block'
      }`}>
        <div className="mb-8">
          <input 
            type="text" 
            placeholder="Search by person..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 pb-2 text-sm font-dm-mono focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="mb-10">
          <h3 className="font-dm-mono text-xs text-white/50 mb-4 tracking-widest">CATEGORY</h3>
          <div className="flex flex-col gap-3 font-dm-mono text-sm">
            {['All', 'Music', 'Sports', 'Cinema', 'Royalty', 'Fashion'].map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={activeCategory === cat}
                  onChange={() => setActiveCategory(cat)}
                  className="appearance-none w-4 h-4 border border-white/20 checked:bg-amber-500 checked:border-amber-500 transition-colors"
                />
                <span className={`group-hover:text-amber-500 transition-colors ${activeCategory === cat ? 'text-amber-500' : 'text-white'}`}>
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="font-dm-mono text-xs text-white/50 mb-4 tracking-widest">ERA</h3>
          <div className="flex flex-col gap-3 font-dm-mono text-sm">
            {['All', '1950s-60s', '1970s-80s', '1990s-2000s', '2010s+'].map(era => (
              <label key={era} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="era"
                  checked={activeEra === era}
                  onChange={() => setActiveEra(era)}
                  className="appearance-none w-4 h-4 rounded-full border border-white/20 checked:bg-amber-500 checked:border-amber-500 transition-colors"
                />
                <span className={`group-hover:text-amber-500 transition-colors ${activeEra === era ? 'text-amber-500' : 'text-white'}`}>
                  {era}
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow pb-32">
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-4">
          <div className="flex items-center gap-4">
            <span className="font-dm-mono text-sm text-white/60">
              {filteredProducts.length} Results
            </span>
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)} 
              className="md:hidden font-dm-mono text-xs text-amber-500 border border-amber-500/30 px-3 py-1 flex items-center gap-2 hover:bg-amber-500 hover:text-black transition-colors"
            >
              FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`} {isFiltersOpen ? '▲' : '▼'}
            </button>
          </div>
          <select 
            className="bg-transparent border-none font-dm-mono text-sm text-white focus:outline-none focus:ring-0 cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Newest" className="bg-[#0a0a0a]">Newest</option>
            <option value="Price ↑" className="bg-[#0a0a0a]">Price ↑</option>
            <option value="Price ↓" className="bg-[#0a0a0a]">Price ↓</option>
            <option value="Most Famous" className="bg-[#0a0a0a]">Most Famous</option>
          </select>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map(product => (
            <div key={product.id} className="break-inside-avoid">
              <ProductCard product={product} />
            </div>
          ))}
          {sortedProducts.length === 0 && (
            <p className="text-white/50 font-dm-mono">{loading ? 'Loading collection...' : 'No items found matching your criteria.'}</p>
          )}
        </div>
        
        {filteredProducts.length > 0 && (
          <div className="mt-20 text-center">
            <button className="font-dm-mono text-xs tracking-widest text-white border border-white/20 px-12 py-4 hover:border-amber-500 hover:text-amber-500 transition-all">
              MORE HISTORY COMING SOON
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Collection() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-white font-dm-mono">Loading collection...</div>}>
      <CollectionContent />
    </Suspense>
  );
}
