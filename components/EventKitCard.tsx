import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, ProductVariant, getProductInquiryPath } from '../types';
import { Mail } from 'lucide-react';
import { EVENT_SALE_LABEL, EVENT_SALE_LABEL_EN, formatPrice, getSalePrice } from '../constants';

interface EventKitCardProps {
  product: Product;
}

const EventKitCard: React.FC<EventKitCardProps> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );

  const displayImage = selectedVariant?.image ?? product.image;
  const originalPrice = selectedVariant?.price ?? product.price;
  const salePrice = getSalePrice(originalPrice);

  return (
    <div className="group relative bg-white p-4 transition-all hover:shadow-xl hover:-translate-y-1 border border-stone-100">
      <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 chinese-text">
          推荐年龄 {product.recommendedAge || '—'}
        </span>
        <span className="inline-block px-3 py-1 text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">
          制作时长 {product.estimatedHours || '—'}
        </span>
        <span className="inline-block px-3 py-1 text-xs font-medium bg-[#9d2933] text-white tracking-widest uppercase">
          {EVENT_SALE_LABEL} · {EVENT_SALE_LABEL_EN}
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
        <div className="text-right shrink-0">
          <p className="text-xs text-stone-400 line-through">${formatPrice(originalPrice)}</p>
          <p className="text-lg font-semibold text-[#9d2933]">${formatPrice(salePrice)}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-stone-500 chinese-text line-clamp-2">{product.chineseDescription}</p>
      <Link
        to={getProductInquiryPath(product, selectedVariant)}
        className="mt-6 w-full flex flex-col items-center justify-center bg-stone-900 text-white px-6 py-3 text-sm font-medium hover:bg-stone-800 transition-colors"
      >
        <span className="flex items-center tracking-widest uppercase">
          <Mail className="w-4 h-4 mr-2" />
          Contact to Buy
        </span>
        <span className="chinese-text text-xs font-normal tracking-normal mt-1 text-stone-300">联系购买 · 查询库存</span>
      </Link>
    </div>
  );
};

export default EventKitCard;
