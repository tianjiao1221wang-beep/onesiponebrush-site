import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    titleEn: 'Interactive Cultural Pop-Ups',
    titleZh: '互动文化快闪',
    descriptionEn: 'Hands-on activations that invite guests into Chinese arts and heritage craft.',
    descriptionZh: '沉浸式互动体验，带领宾客走入中华艺术与非遗手工艺。',
    path: '/cultural-event-curation/popups',
    image:
      '/images/curation-popups.svg',
    subEvents: [
      { en: 'Live intangible heritage hands-on', zh: '现场体验非遗手工' },
      { en: 'Live design interaction', zh: '现场设计互动' },
      { en: 'School Chinese culture festival with heritage stalls', zh: '学校中国文化节提供非遗摊位' },
    ],
  },
  {
    titleEn: 'Weddings & Chinese Celebrations',
    titleZh: '婚礼与中式庆典',
    descriptionEn: 'Refined cultural moments designed for intimate milestones and family gatherings.',
    descriptionZh: '为重要时刻与家族欢聚定制优雅文化仪式。',
    path: '/cultural-event-curation/weddings',
    image:
      '/images/curation-weddings.svg',
    subEvents: [
      { en: "Baby's 100-day celebration", zh: '孩子百日宴' },
      { en: 'Chinese wedding', zh: '中式婚礼' },
      { en: 'Chinese celebration', zh: '中式庆典' },
    ],
  },
  {
    titleEn: 'School Chinese Culture Courses',
    titleZh: '学校中国文化课程',
    descriptionEn: 'Educational Chinese culture and craft courses for all ages, hands-on DIY classes.',
    descriptionZh: '提供各年龄段中国文化以及中国手工艺相关寓教于乐课程，课堂 DIY 课程。',
    path: '/cultural-event-curation/schools',
    image:
      '/images/curation-schools.svg',
    subEvents: [
      { en: 'Age-appropriate Chinese culture curriculum', zh: '各年龄段中国文化课程' },
      { en: 'Chinese craft hands-on learning', zh: '中国手工艺寓教于乐' },
      { en: 'Classroom DIY workshops', zh: '课堂 DIY 课程' },
    ],
  },
  {
    titleEn: 'Film & Brand Cultural Direction',
    titleZh: '影视与品牌文化指导',
    descriptionEn: 'Authentic Chinese cultural direction for campaigns, productions, and branded events.',
    descriptionZh: '为广告、影像与品牌活动提供专业且真实的中华文化指导。',
    path: '/cultural-event-curation/brand-production',
    image:
      '/images/curation-brand.svg',
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
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="relative overflow-hidden min-h-[320px] group"
              >
                <img
                  src={category.image}
                  alt={category.titleEn}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-900/55 group-hover:bg-stone-900/45 transition-colors" />
                <div className="relative h-full p-7 text-white flex flex-col justify-end text-left">
                  <h3 className="text-2xl font-light mb-3 min-h-[92px]">
                    <span className="block">{category.titleEn}</span>
                    <span className="block chinese-text text-lg text-stone-200 mt-1">{category.titleZh}</span>
                  </h3>
                  <p className="text-stone-100 mb-4 min-h-[82px]">
                    <span className="block">{category.descriptionEn}</span>
                    <span className="block chinese-text text-sm text-stone-200 mt-1">{category.descriptionZh}</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-stone-100">
                    {category.subEvents.map((subEvent) => (
                      <li key={subEvent.en}>
                        <span className="block">{subEvent.en}</span>
                        <span className="block chinese-text text-xs text-stone-200">{subEvent.zh}</span>
                      </li>
                    ))}
                  </ul>
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
