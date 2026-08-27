import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import EventKitCard from '../components/EventKitCard';
import { ArrowRight } from 'lucide-react';

type TypeFilter = 'all' | 'kit' | 'design';

const DIYKit: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    return typeFilter === 'all' || p.category === typeFilter;
  });

  const eventDIYkits = PRODUCTS.filter((p) => p.category === 'kit');

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <header className="mb-20 text-center">
        <h1 className="text-5xl font-light mb-4 ink-text uppercase tracking-widest">Our Collection</h1>
        <h2 className="chinese-text text-2xl text-stone-500 mb-6 italic">精选系列 — 匠心呈现</h2>
        <p className="text-stone-600 max-w-2xl mx-auto mb-2">
          Online checkout is currently paused. Contact us to buy any product or check availability.
        </p>
        <p className="chinese-text text-stone-500 mb-12">线上暂不开放支付。如需购买或查询库存，请联系我们。</p>

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
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Event DIY Kit Options — 中国非遗手工和传统工艺 */}
      <section className="mt-32 pt-20 border-t border-stone-200">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light ink-text uppercase tracking-widest mb-3">Event DIY Kit Options</h2>
          <p className="chinese-text text-xl text-stone-600">活动 DIY 套装选配</p>
          <p className="chinese-text text-lg text-amber-700/90 mt-4 font-medium">中国非遗手工和传统工艺</p>
          <p className="text-sm text-stone-500 mt-2 max-w-2xl mx-auto">
            For event hosts — browse options with recommended age for your guests. / 活动策划者可按推荐年龄为来宾选配
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {eventDIYkits.map((product) => (
            <EventKitCard key={product.id} product={product} />
          ))}
        </div>

        {/* Curate an Event — we can curate events with these DIY kits + workshops */}
        <div className="mt-24 pt-16 border-t border-stone-200">
          <div className="rounded-xl border border-stone-200 bg-gradient-to-br from-stone-50 to-white p-8 md:p-12 text-center">
            <h3 className="text-2xl font-light ink-text mb-2">Curate Your Event with DIY Kits + Workshops</h3>
            <p className="chinese-text text-lg text-stone-600 mb-4">用 DIY 套装与工作坊策划您的活动</p>
            <p className="text-stone-600 max-w-2xl mx-auto mb-6">
              Combine these DIY kits with our Chinese Heritage Workshop Series — Cloisonné and bamboo weaving — for school events, pop-ups, weddings, or brand activations. We help design and deliver tailored experiences.
            </p>
            <p className="chinese-text text-sm text-stone-500 mb-8">
              将 DIY 套装与掐丝珐琅、竹编等传统工艺工作坊结合，为学校、快闪、婚礼或品牌活动定制沉浸式文化体验。
            </p>
            <Link
              to="/cultural-event-curation"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
            >
              Design Your Event / 策划活动
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DIYKit;
