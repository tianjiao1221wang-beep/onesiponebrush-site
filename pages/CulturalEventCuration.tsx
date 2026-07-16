import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CURATION_CARD_COLORS, CURATED_EVENTS } from '../constants/curatedEvents';

const categories = [
  {
    titleEn: 'Interactive Cultural Pop-Ups',
    titleZh: '互动文化快闪',
    descriptionEn: 'Hands-on activations that invite guests into Chinese arts and heritage craft.',
    descriptionZh: '沉浸式互动体验，带领宾客走入中华艺术与非遗手工艺。',
    path: '/cultural-event-curation/popups',
    subEvents: [
      { en: 'Intangible heritage hands-on', zh: '非遗手工' },
      { en: 'Live design interaction', zh: '设计互动' },
      { en: 'Culture festival heritage stalls', zh: '文化节摊位' },
    ],
  },
  {
    titleEn: 'Weddings & Chinese Celebrations',
    titleZh: '婚礼与中式庆典',
    descriptionEn: 'Refined cultural moments for intimate milestones, family gatherings, and corporate celebrations.',
    descriptionZh: '为重要时刻、家族欢聚与公司团建定制优雅文化仪式。',
    path: '/cultural-event-curation/weddings',
    subEvents: [
      { en: "Baby's 100-day celebration", zh: '百日宴' },
      { en: 'Chinese wedding', zh: '中式婚礼' },
      { en: 'Family gathering', zh: '家族欢聚' },
      { en: 'Corporate team building', zh: '公司团建' },
    ],
  },
  {
    titleEn: 'Chinese Heritage Enrichment Program',
    titleZh: '中国文化艺术素养课程',
    descriptionEn: 'A complete school partnership framework — workshops, series, camps, family sessions, and year-long support.',
    descriptionZh: '完整的学校合作体系：体验课、系列课程、夏令营、亲子课与年度支持。',
    path: '/cultural-event-curation/schools',
    subEvents: [
      { en: 'Heritage Workshops', zh: '体验课' },
      { en: 'Heritage Series', zh: '系列课程' },
      { en: 'Summer Camp', zh: '夏令营' },
      { en: 'Family Workshop', zh: '亲子' },
      { en: 'Teacher Resources', zh: '教师教材' },
      { en: 'Student Passport', zh: '成长护照' },
      { en: 'Heritage Exhibition', zh: '成果展' },
      { en: 'School Partnership', zh: '年度合作' },
    ],
  },
  {
    titleEn: 'Film & Brand Cultural Direction',
    titleZh: '影视与品牌文化指导',
    descriptionEn: 'Authentic Chinese cultural direction for campaigns, productions, and branded events.',
    descriptionZh: '为广告、影像与品牌活动提供专业且真实的中华文化指导。',
    path: '/cultural-event-curation/brand-production',
    subEvents: [
      { en: 'Set cultural styling', zh: '片场文化美术指导' },
      { en: 'Campaign cultural consulting', zh: '项目文化顾问支持' },
      { en: 'Brand storytelling concepts', zh: '品牌文化叙事策划' },
    ],
  },
];

const CulturalEventCuration: React.FC = () => {
  return (
    <div className="paper-bg min-h-screen">
      <section className="py-28 md:py-36 border-b border-stone-200 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-light ink-text tracking-tight mb-2">Cultural Event Curation</h1>
          <p className="chinese-text text-2xl text-stone-700 mb-6">文化活动策展</p>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto mb-2">
            We design and produce immersive Chinese cultural experiences for events, celebrations, schools, and brands.
          </p>
          <p className="chinese-text text-base text-stone-500 max-w-3xl mx-auto mb-10">
            我们为活动庆典、学校项目与品牌合作打造沉浸式中华文化体验。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-stone-900 text-white px-8 py-4 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
            >
              Request a Proposal
              <span className="block chinese-text normal-case tracking-normal mt-1">申请方案</span>
            </Link>
            <button
              type="button"
              onClick={() => document.getElementById('what-we-curate')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white border border-stone-300 text-stone-800 px-8 py-4 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-50 transition-colors"
            >
              View Experience Types
              <span className="block chinese-text normal-case tracking-normal mt-1">查看体验类型</span>
            </button>
          </div>
        </div>
      </section>

      <section id="what-we-curate" className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light ink-text mb-2">What We Curate</h2>
          <p className="chinese-text text-xl text-stone-600 mb-10">我们策划的内容</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, i) => (
              <Link
                key={category.path}
                to={category.path}
                className={`curation-card relative overflow-hidden min-h-[320px] group rounded-xl ${CURATION_CARD_COLORS[i % CURATION_CARD_COLORS.length]}`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-stone-100" />
                <div className="relative h-full p-7 flex flex-col justify-end text-left">
                  <h3 className="text-2xl font-light mb-3 min-h-[92px] ink-text">
                    <span className="block">{category.titleEn}</span>
                    <span className="block chinese-text text-lg text-stone-600 mt-1">{category.titleZh}</span>
                  </h3>
                  <p className="text-stone-700 mb-4 min-h-[82px]">
                    <span className="block">{category.descriptionEn}</span>
                    <span className="block chinese-text text-sm text-stone-600 mt-1">{category.descriptionZh}</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-stone-600">
                    {category.subEvents.map((subEvent) => (
                      <li key={subEvent.en}>
                        <span className="block">{subEvent.en}</span>
                        <span className="block chinese-text text-xs text-stone-500 mt-1">{subEvent.zh}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="past-events" className="py-20 md:py-24 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light ink-text mb-2">Past Curated Events</h2>
          <p className="chinese-text text-xl text-stone-600 mb-10">往期策划活动</p>
          <div className="grid grid-cols-1 gap-8">
            {CURATED_EVENTS.map((event) => (
              <Link
                key={event.slug}
                to={`/curated-events/${event.slug}`}
                className="relative overflow-hidden rounded-sm border border-stone-200 bg-white group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  <div className="h-[320px] lg:h-auto">
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
    </div>
  );
};

export default CulturalEventCuration;
