import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface DIYKitProps {
  onAddToCart: (product: Product) => void;
}

type TypeFilter = 'all' | 'kit' | 'design';
type PriceFilter = 'all' | 'under20' | '20-40' | '40-60' | '60+';

const DIYKit: React.FC<DIYKitProps> = ({ onAddToCart }) => {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    const typeMatch = typeFilter === 'all' || p.category === typeFilter;
    const priceMatch =
      priceFilter === 'all' ||
      (priceFilter === 'under20' && p.price < 20) ||
      (priceFilter === '20-40' && p.price >= 20 && p.price < 40) ||
      (priceFilter === '40-60' && p.price >= 40 && p.price < 60) ||
      (priceFilter === '60+' && p.price >= 60);
    return typeMatch && priceMatch;
  });

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <header className="mb-20 text-center">
        <h1 className="text-5xl font-light mb-4 ink-text uppercase tracking-widest">Our Collection</h1>
        <h2 className="chinese-text text-2xl text-stone-500 mb-12 italic">精选系列 — 匠心呈现</h2>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center flex-wrap gap-4 sm:gap-8 border-b border-stone-200 pb-6">
            <span className="text-xs uppercase tracking-widest text-stone-400">Type / 品类</span>
            {[
              { id: 'all' as TypeFilter, en: 'All Pieces', zh: '全部' },
              { id: 'kit' as TypeFilter, en: 'DIY Kits', zh: '手作套装' },
              { id: 'design' as TypeFilter, en: 'Studio Designs', zh: '文创设计' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setTypeFilter(type.id)}
                className={`flex flex-col items-center transition-all ${
                  typeFilter === type.id ? 'text-stone-900 scale-110' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <span className="text-[10px] uppercase tracking-widest font-bold mb-1">{type.en}</span>
                <span className="chinese-text text-sm">{type.zh}</span>
                {typeFilter === type.id && <div className="w-4 h-0.5 bg-stone-900 mt-2"></div>}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center flex-wrap gap-4 sm:gap-6">
            <span className="text-xs uppercase tracking-widest text-stone-400">Price / 价格</span>
            {[
              { id: 'all' as PriceFilter, en: 'All', zh: '全部' },
              { id: 'under20' as PriceFilter, en: 'Under $20', zh: '$20以下' },
              { id: '20-40' as PriceFilter, en: '$20–$40', zh: '$20–$40' },
              { id: '40-60' as PriceFilter, en: '$40–$60', zh: '$40–$60' },
              { id: '60+' as PriceFilter, en: '$60+', zh: '$60以上' }
            ].map((price) => (
              <button
                key={price.id}
                onClick={() => setPriceFilter(price.id)}
                className={`px-4 py-2 text-sm transition-all border rounded-sm ${
                  priceFilter === price.id
                    ? 'border-stone-900 text-stone-900 bg-stone-50'
                    : 'border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-700'
                }`}
              >
                <span className="ink-text">{price.en}</span>
                <span className="chinese-text text-stone-400 ml-1">/ {price.zh}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default DIYKit;
