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

interface OfferingItem {
  titleEn: string;
  titleZh: string;
  image: string;
  imageAlt: string;
}

const POPUP_OFFERINGS: OfferingItem[] = [
  {
    titleEn: 'Intangible Heritage Hands-On',
    titleZh: '非遗手工',
    image: '/images/events/event-lny2026-08.png',
    imageAlt: 'Cloisonné heritage craft workshop with child and instructor',
  },
  {
    titleEn: 'Live Design Interaction',
    titleZh: '设计互动',
    image: '/images/events/event-lny2026-04.png',
    imageAlt: 'Calligraphy and craft design interaction at table',
  },
  {
    titleEn: 'Culture Festival Heritage Stalls',
    titleZh: '文化节摊位',
    image: '/images/events/event-ruihua2025-02.png',
    imageAlt: 'Temple fair venue with heritage craft stalls',
  },
];

const CELEBRATION_OFFERINGS: OfferingItem[] = [
  {
    titleEn: "Baby's 100-Day Celebration",
    titleZh: '百日宴',
    image: '/images/baby-100-day-celebration.png',
    imageAlt: 'Traditional Chinese 100-day celebration display with calligraphy and red decor',
  },
  {
    titleEn: 'Chinese Wedding',
    titleZh: '中式婚礼',
    image: '/images/product-wedding-fan-red-gold.png',
    imageAlt: 'Chinese wedding round fan craft',
  },
  {
    titleEn: 'Family Gathering',
    titleZh: '家族欢聚',
    image: '/images/family-gathering.png',
    imageAlt: 'Private Chinese-style dining room for family gathering',
  },
  {
    titleEn: 'Corporate Team Building',
    titleZh: '公司团建',
    image: '/images/corporate-team-building.png',
    imageAlt: 'Chinese traditional craft workshop studio for corporate team building',
  },
];

const ENRICHMENT_PROGRAM: OfferingItem[] = [
  {
    titleEn: 'Heritage Workshops',
    titleZh: '体验课',
    image: '/images/heritage-workshops.png',
    imageAlt: 'Heritage workshop craft pouches and gift boxes',
  },
  {
    titleEn: 'Heritage Series',
    titleZh: '系列课程',
    image: '/images/heritage-series.png',
    imageAlt: 'Chinese calligraphy ink on red paper',
  },
  {
    titleEn: 'Summer Camp',
    titleZh: '夏令营',
    image: '/images/summer-camp.png',
    imageAlt: 'Chinese traditional craft summer camp workshop classroom',
  },
  {
    titleEn: 'Family Workshop',
    titleZh: '亲子',
    image: '/images/events/event-lny2026-06.png',
    imageAlt: 'Family workshop with children in traditional attire',
  },
  {
    titleEn: 'Teacher Resources',
    titleZh: '教师教材',
    image: '/images/product-copybook.png',
    imageAlt: 'Teacher resources and mindful copybook materials',
  },
  {
    titleEn: 'Student Passport',
    titleZh: '成长护照',
    image: '/images/product-embroidered-cover-cream.png',
    imageAlt: 'Student growth passport and learning journal',
  },
  {
    titleEn: 'Heritage Exhibition',
    titleZh: '成果展',
    image: '/images/events/event-lny2026-07.png',
    imageAlt: 'Heritage exhibition and cultural products display',
  },
  {
    titleEn: 'School Partnership',
    titleZh: '年度合作',
    image: '/images/events/event-ruihua2025-hero.png',
    imageAlt: 'Annual school partnership cultural program',
  },
];

const BRAND_OFFERINGS: OfferingItem[] = [
  {
    titleEn: 'Set Cultural Styling',
    titleZh: '片场文化美术指导',
    image: '/images/events/event-ruihua2025-05.png',
    imageAlt: 'Cultural styling and set direction',
  },
  {
    titleEn: 'Campaign Cultural Consulting',
    titleZh: '项目文化顾问支持',
    image: '/images/events/event-ruihua2025-03.png',
    imageAlt: 'Campaign cultural consulting at festive venue',
  },
  {
    titleEn: 'Brand Storytelling Concepts',
    titleZh: '品牌文化叙事策划',
    image: '/images/events/event-ruihua2025-hero.png',
    imageAlt: 'Brand storytelling stage and cultural narrative',
  },
];

const OfferingGrid: React.FC<{ items: OfferingItem[]; columns?: string }> = ({
  items,
  columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
}) => (
  <div className={`grid ${columns} gap-6 md:gap-8`}>
    {items.map((item) => (
      <article key={item.titleEn} className="group">
        <div className="overflow-hidden rounded-sm mb-4">
          <img
            src={item.image}
            alt={item.imageAlt}
            className="w-full h-52 md:h-56 object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
        <h4 className="text-lg font-light ink-text mb-1">{item.titleEn}</h4>
        <p className="chinese-text text-stone-500">{item.titleZh}</p>
      </article>
    ))}
  </div>
);

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
              Explore Workshops / 文化活动介绍
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

      {/* 1. Cultural Event Curation — full content on page */}
      <section id="curation" className="py-24 md:py-32 scroll-mt-24 border-b border-stone-200 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light ink-text mb-2">Cultural Event Curation</h2>
            <p className="chinese-text text-2xl text-stone-700 mb-6">文化活动策展</p>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-2">
              We design and produce immersive Chinese cultural experiences for events, celebrations, schools, and brands.
            </p>
            <p className="chinese-text text-base text-stone-500 max-w-3xl mx-auto">
              我们为活动庆典、学校项目与品牌合作打造沉浸式中华文化体验。
            </p>
          </div>

          {/* Pop-Ups */}
          <div className="mb-24">
            <div className="mb-10">
              <h3 className="text-3xl md:text-4xl font-light ink-text mb-2">Interactive Cultural Pop-Ups</h3>
              <p className="chinese-text text-xl text-stone-600 mb-4">互动文化快闪</p>
              <p className="text-stone-600 max-w-3xl">
                Hands-on activations that invite guests into Chinese arts and heritage craft.
                <span className="chinese-text block text-sm text-stone-500 mt-1">
                  沉浸式互动体验，带领宾客走入中华艺术与非遗手工艺。
                </span>
              </p>
            </div>
            <OfferingGrid items={POPUP_OFFERINGS} />
          </div>

          {/* Weddings & Celebrations */}
          <div className="mb-24">
            <div className="mb-10">
              <h3 className="text-3xl md:text-4xl font-light ink-text mb-2">Weddings & Chinese Celebrations</h3>
              <p className="chinese-text text-xl text-stone-600 mb-4">婚礼与中式庆典</p>
              <p className="text-stone-600 max-w-3xl">
                Refined cultural moments for intimate milestones, family gatherings, and corporate celebrations.
                <span className="chinese-text block text-sm text-stone-500 mt-1">
                  为重要时刻、家族欢聚与公司团建定制优雅文化仪式。
                </span>
              </p>
            </div>
            <OfferingGrid items={CELEBRATION_OFFERINGS} columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />
          </div>

          {/* Heritage Enrichment Program */}
          <div className="mb-24">
            <div className="mb-10">
              <h3 className="text-3xl md:text-4xl font-light ink-text mb-2">Chinese Heritage Enrichment Program</h3>
              <p className="chinese-text text-xl text-stone-600 mb-4">中国文化艺术素养课程</p>
              <p className="text-stone-600 max-w-3xl">
                A complete school partnership framework — from single workshops to year-long programs, teacher support, and student growth.
                <span className="chinese-text block text-sm text-stone-500 mt-1">
                  完整的学校合作体系：从单次体验到年度课程、教师支持与学生成长。
                </span>
              </p>
            </div>
            <OfferingGrid items={ENRICHMENT_PROGRAM} columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />
          </div>

          {/* Film & Brand */}
          <div className="mb-8">
            <div className="mb-10">
              <h3 className="text-3xl md:text-4xl font-light ink-text mb-2">Film & Brand Cultural Direction</h3>
              <p className="chinese-text text-xl text-stone-600 mb-4">影视与品牌文化指导</p>
              <p className="text-stone-600 max-w-3xl">
                Authentic Chinese cultural direction for campaigns, productions, and branded events.
                <span className="chinese-text block text-sm text-stone-500 mt-1">
                  为广告、影像与品牌活动提供专业且真实的中华文化指导。
                </span>
              </p>
            </div>
            <OfferingGrid items={BRAND_OFFERINGS} />
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center bg-stone-900 text-white px-10 py-4 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
            >
              Request a Proposal / 申请方案
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
