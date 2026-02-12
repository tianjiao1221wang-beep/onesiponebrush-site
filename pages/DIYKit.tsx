import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface DIYKitProps {
  onAddToCart: (product: Product) => void;
}

const DIYKit: React.FC<DIYKitProps> = ({ onAddToCart }) => {
  const [filter, setFilter] = useState<'all' | 'kit' | 'design'>('all');

  const filteredProducts = PRODUCTS.filter(p => filter === 'all' || p.category === filter);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <header className="mb-20 text-center">
        <h1 className="text-5xl font-light mb-4 ink-text uppercase tracking-widest">Our Collection</h1>
        <h2 className="chinese-text text-2xl text-stone-500 mb-12 italic">精选系列 — 匠心呈现</h2>
        
        <div className="flex justify-center flex-wrap gap-8 border-b border-stone-200 pb-6">
          {[
            { id: 'all', en: 'All Pieces', zh: '全部' },
            { id: 'kit', en: 'DIY Kits', zh: '手作套装' },
            { id: 'design', en: 'Studio Designs', zh: '文创设计' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setFilter(type.id as any)}
              className={`flex flex-col items-center transition-all ${
                filter === type.id ? 'text-stone-900 scale-110' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <span className="text-[10px] uppercase tracking-widest font-bold mb-1">{type.en}</span>
              <span className="chinese-text text-sm">{type.zh}</span>
              {filter === type.id && <div className="w-4 h-0.5 bg-stone-900 mt-2"></div>}
            </button>
          ))}
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
