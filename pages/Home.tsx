import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { CURATED_EVENTS } from '../constants/curatedEvents';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

const CURATION_EXPERIENCES = [
  {
    titleEn: 'Interactive Cultural Pop-Ups',
    titleZh: '互动文化快闪',
    descriptionEn:
      'Hands-on activations that invite guests into Chinese arts and heritage craft — live intangible heritage, design interaction, and festival stalls.',
    descriptionZh: '沉浸式互动体验：现场非遗手工、设计互动，以及文化节摊位。',
    path: '/cultural-event-curation/popups',
    image: '/images/events/event-lny2026-02.png',
    imageAlt: 'Children crafting at a cultural pop-up event',
  },
  {
    titleEn: 'Weddings & Chinese Celebrations',
    titleZh: '婚礼与中式庆典',
    descriptionEn:
      'Refined cultural moments for intimate milestones — 100-day celebrations, Chinese weddings, and family gatherings.',
    descriptionZh: '为百日宴、中式婚礼与家族欢聚定制优雅文化仪式。',
    path: '/cultural-event-curation/weddings',
    image: '/images/events/event-ruihua2025-05.png',
    imageAlt: 'Celebration styling with traditional attire and festive decor',
  },
  {
    titleEn: 'School Chinese Culture Courses',
    titleZh: '学校中国文化课程',
    descriptionEn:
      'Chinese Heritage Workshop Series — Cloisonné & bamboo weaving for K–12 and beyond. Age-appropriate, hands-on DIY classrooms.',
    descriptionZh: '中国传统工艺体验系列 — 掐丝珐琅与竹编，为各年级定制课堂 DIY 课程。',
    path: '/cultural-event-curation/schools',
    image: '/images/events/event-lny2026-08.png',
    imageAlt: 'Adult guiding a child through a Cloisonné workshop',
  },
  {
    titleEn: 'Film & Brand Cultural Direction',
    titleZh: '影视与品牌文化指导',
    descriptionEn:
      'Authentic Chinese cultural direction for campaigns, productions, and branded events — styling, consulting, and storytelling.',
    descriptionZh: '为广告、影像与品牌活动提供真实专业的中华文化指导与叙事策划。',
    path: '/cultural-event-curation/brand-production',
    image: '/images/events/event-ruihua2025-hero.png',
    imageAlt: 'Stage performance and cultural brand storytelling',
  },
];

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const diyKits = PRODUCTS.filter((p) => p.category === 'kit').slice(0, 3);
  const culturalProducts = PRODUCTS.filter((p) => p.category === 'design').slice(0, 3);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="paper-bg min-h-screen">
      {/* Hero — workshops first */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-ink-painting.png"
            alt="Chinese ink abstract painting"
            className="w-full h-full object-cover object-center opacity-50 hero-ink-fade"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fdfbf7]/30 to-[#fdfbf7]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <span className="text-xs uppercase tracking-[0.5em] text-stone-500 mb-6 block animate-fade-in">
            Chinese Culture Workshops
          </span>
          <h1 className="text-6xl md:text-9xl font-light tracking-tighter ink-text mb-2">
            ONE SIP ONE BRUSH
          </h1>
          <h2 className="chinese-text text-4xl md:text-6xl font-light text-stone-800 mb-10 tracking-[0.8em]">
            一墨一茗
          </h2>
          <p className="text-xl md:text-2xl text-stone-600 italic mb-12 max-w-3xl mx-auto leading-relaxed">
            Immersive Chinese heritage workshops for schools, events, and celebrations.
            <span className="chinese-text text-lg block mt-2 not-italic">
              为学校、活动与庆典打造沉浸式中华文化工作坊。
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center flex-wrap">
            <button
              type="button"
              onClick={() => scrollTo('curation')}
              className="bg-stone-900 text-white px-12 py-5 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-800 transition-all flex items-center justify-center group"
            >
              Explore Workshops / 看看我们有什么 Workshop
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo('shop')}
              className="bg-white border border-stone-300 text-stone-800 px-12 py-5 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-50 transition-all flex items-center justify-center group"
            >
              Shop Kits / 选购套装
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 1. Cultural Event Curation — text + images */}
      <section id="curation" className="py-24 md:py-32 scroll-mt-24 border-b border-stone-200 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-light ink-text mb-2">Cultural Event Curation</h2>
            <p className="chinese-text text-2xl text-stone-700 mb-6">文化活动策展</p>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-2">
              We design and produce immersive Chinese cultural experiences for events, celebrations, schools, and brands.
            </p>
            <p className="chinese-text text-base text-stone-500 max-w-3xl mx-auto">
              我们为活动庆典、学校项目与品牌合作打造沉浸式中华文化体验。
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {CURATION_EXPERIENCES.map((item, index) => {
              const imageLeft = index % 2 === 0;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center group"
                >
                  <div className={`overflow-hidden rounded-sm ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-[280px] md:h-[360px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className={`text-left ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                    <h3 className="text-3xl font-light ink-text mb-2">{item.titleEn}</h3>
                    <p className="chinese-text text-xl text-stone-600 mb-5">{item.titleZh}</p>
                    <p className="text-stone-600 leading-relaxed mb-3">{item.descriptionEn}</p>
                    <p className="chinese-text text-sm text-stone-500 mb-8">{item.descriptionZh}</p>
                    <span className="inline-flex items-center text-sm tracking-widest uppercase text-stone-900 group-hover:gap-4 gap-2 transition-all">
                      Learn More / 了解更多
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/cultural-event-curation"
              className="inline-flex items-center bg-stone-900 text-white px-10 py-4 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
            >
              View All Experience Types / 查看全部体验类型
              <ArrowRight className="ml-3 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Past curated events */}
      <section id="past-events" className="py-24 md:py-32 scroll-mt-24 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-stone-200 pb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-light ink-text mb-2">Past Curated Events</h2>
              <p className="chinese-text text-xl text-stone-600">往期策划活动</p>
            </div>
            <Link
              to="/cultural-event-curation"
              className="mt-4 md:mt-0 text-sm tracking-widest uppercase font-semibold text-stone-900 hover:text-stone-600 transition-colors flex items-center"
            >
              View All / 查看全部 <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {CURATED_EVENTS.map((event) => (
              <Link
                key={event.slug}
                to={`/curated-events/${event.slug}`}
                className="relative overflow-hidden rounded-sm border border-stone-200 bg-white group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  <div className="h-[280px] lg:h-auto min-h-[280px]">
                    <img
                      src={event.heroImage}
                      alt={event.heroAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-10 md:p-12 flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-[0.4em] text-stone-500 mb-5">Past Curated Event</span>
                    <h3 className="text-3xl font-light text-stone-900 mb-5">{event.titleEn}</h3>
                    <p className="chinese-text text-stone-500 text-xl mb-6">{event.titleZh}</p>
                    <p className="text-sm text-stone-500 mb-2">{event.dateLabel}</p>
                    <p className="text-stone-600 leading-relaxed mb-8">{event.descriptionEn}</p>
                    <span className="inline-flex items-center text-sm tracking-widest uppercase text-stone-900 group-hover:gap-4 gap-2 transition-all">
                      View Gallery / 查看相册
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Shop — DIY Kits + cultural finished products */}
      <section id="shop" className="py-24 md:py-32 scroll-mt-24 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light ink-text uppercase tracking-widest mb-2">Shop</h2>
            <p className="chinese-text text-xl text-stone-500">套装商店</p>
          </div>

          {/* DIY Kits */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-stone-200 pb-6">
              <div>
                <h3 className="text-3xl font-light ink-text uppercase tracking-widest mb-2">DIY Kits</h3>
                <p className="chinese-text text-lg text-stone-500">手作套装</p>
              </div>
              <Link
                to="/shop"
                className="mt-4 md:mt-0 text-sm tracking-widest uppercase font-semibold text-stone-900 hover:text-stone-600 transition-colors flex items-center"
              >
                View All DIY Kits / 查看全部 <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {diyKits.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>

          {/* Cultural finished products */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-stone-200 pb-6">
              <div>
                <h3 className="text-3xl font-light ink-text uppercase tracking-widest mb-2">Cultural Products</h3>
                <p className="chinese-text text-lg text-stone-500">文化成品</p>
              </div>
              <Link
                to="/shop"
                className="mt-4 md:mt-0 text-sm tracking-widest uppercase font-semibold text-stone-900 hover:text-stone-600 transition-colors flex items-center"
              >
                View All Products / 查看全部 <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {culturalProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
