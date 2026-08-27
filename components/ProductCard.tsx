import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, ProductVariant, getProductInquiryPath } from '../types';
import { Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { EVENT_SALE_LABEL, EVENT_SALE_LABEL_EN, formatPrice, getSalePrice } from '../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [expanded, setExpanded] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const descRef = useRef<HTMLDivElement>(null);

  const displayImage = selectedVariant?.image ?? product.image;
  const originalPrice = selectedVariant?.price ?? product.price;
  const salePrice = getSalePrice(originalPrice);

  useEffect(() => {
    const checkOverflow = () => {
      const el = descRef.current;
      if (!el) return;
      if (expanded) {
        setShowExpand(true);
        return;
      }
      const overflowing = el.scrollHeight > el.clientHeight;
      setShowExpand(overflowing);
    };
    checkOverflow();
    const timer = setTimeout(checkOverflow, 0);
    return () => clearTimeout(timer);
  }, [product.description, product.chineseDescription, expanded]);

  return (
    <div className="group relative bg-white p-4 transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-[4/3] w-full overflow-hidden flex items-center justify-center bg-stone-50 relative">
        <span className="absolute top-3 left-3 z-10 bg-[#9d2933] text-white text-[10px] tracking-widest uppercase px-2.5 py-1">
          {EVENT_SALE_LABEL} · {EVENT_SALE_LABEL_EN}
        </span>
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
          {product.category === 'kit' && product.estimatedHours && (
            <p className="text-xs text-stone-500 mt-1">制作时长 / Est. {product.estimatedHours}</p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-stone-400 line-through">${formatPrice(originalPrice)}</p>
          <p className="text-lg font-semibold text-[#9d2933]">${formatPrice(salePrice)}</p>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <div
          ref={descRef}
          className={`text-sm text-stone-500 italic space-y-0.5 ${!expanded ? 'line-clamp-2' : ''}`}
        >
          <p>{product.description}</p>
          <p className="chinese-text text-xs text-stone-400 not-italic">{product.chineseDescription}</p>
        </div>
        {showExpand && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-stone-500 hover:text-stone-700 chinese-text mt-1 flex items-center gap-1"
          >
            {expanded ? (
              <>收起 <ChevronUp className="w-3 h-3" /></>
            ) : (
              <>展开 <ChevronDown className="w-3 h-3" /></>
            )}
          </button>
        )}
      </div>
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

export default ProductCard;
