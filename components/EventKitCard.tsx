import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { Plus } from 'lucide-react';

interface EventKitCardProps {
  product: Product;
  onAddToCart: (product: Product, variant?: ProductVariant) => void;
}

const EventKitCard: React.FC<EventKitCardProps> = ({ product, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );

  const displayImage = selectedVariant?.image ?? product.image;
  const displayPrice = selectedVariant?.price ?? product.price;

  const handleAdd = () => {
    if (product.variants?.length && !selectedVariant) return;
    const item = {
      ...product,
      image: selectedVariant?.image ?? product.image,
      price: selectedVariant?.price ?? product.price,
    };
    onAddToCart(item, selectedVariant);
  };

  return (
    <div className="group relative bg-white p-4 transition-all hover:shadow-xl hover:-translate-y-1 border border-stone-100">
      <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 chinese-text">
          推荐年龄 {product.recommendedAge || '—'}
        </span>
        <span className="inline-block px-3 py-1 text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">
          制作时长 {product.estimatedHours || '—'}
        </span>
      </div>
      <div className="aspect-[4/3] w-full overflow-hidden flex items-center justify-center bg-stone-50">
        <img
          src={displayImage}
          alt={product.name}
          className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      {product.variants && product.variants.length > 0 && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {product.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelectedVariant(v)}
              className={`w-10 h-10 rounded-sm overflow-hidden border-2 transition-all ${
                selectedVariant?.id === v.id ? 'border-stone-900 ring-1 ring-stone-900' : 'border-stone-200 hover:border-stone-400'
              }`}
              title={`${v.name}${v.chineseName ? ` / ${v.chineseName}` : ''}`}
            >
              <img src={v.image} alt={v.name} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
      <div className="mt-6 flex justify-between items-start">
        <div className="pr-4">
          <h3 className="text-lg font-medium text-stone-900 leading-tight">{product.name}</h3>
          <p className="chinese-text text-base text-stone-600 mt-1">
            {product.chineseName}
            {selectedVariant?.chineseName && ` · ${selectedVariant.chineseName}`}
          </p>
        </div>
        <p className="text-lg font-semibold text-stone-900">${displayPrice}</p>
      </div>
      <p className="mt-3 text-sm text-stone-500 chinese-text line-clamp-2">{product.chineseDescription}</p>
      <button
        onClick={handleAdd}
        className="mt-6 w-full flex items-center justify-center bg-stone-900 text-white px-6 py-3 text-sm font-medium hover:bg-stone-800 transition-colors tracking-widest uppercase"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add to Selection
      </button>
    </div>
  );
};

export default EventKitCard;
