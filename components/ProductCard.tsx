
import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-white border border-stone-100 p-4 transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-stone-50 lg:h-80 xl:h-96">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="mt-6 flex justify-between items-start">
        <div className="pr-4">
          <h3 className="text-lg font-medium text-stone-900 leading-tight">{product.name}</h3>
          <p className="chinese-text text-base text-stone-600 mt-1">{product.chineseName}</p>
        </div>
        <p className="text-lg font-semibold text-stone-900">${product.price}</p>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-sm text-stone-500 line-clamp-1 italic">{product.description}</p>
        <p className="chinese-text text-xs text-stone-400 line-clamp-1">{product.chineseDescription}</p>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-6 w-full flex items-center justify-center bg-stone-900 text-white px-6 py-3 text-sm font-medium hover:bg-stone-800 transition-colors tracking-widest uppercase"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add to Selection
      </button>
    </div>
  );
};

export default ProductCard;
