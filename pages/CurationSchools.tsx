import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Palette, Target } from 'lucide-react';
import { SCHOOL_WORKSHOP_SERIES } from '../constants/schoolWorkshops';
import type { WorkshopLevel } from '../constants/schoolWorkshops';

const levelColorMap = {
  green: { bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  yellow: { bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
  red: { bg: 'bg-rose-50', border: 'border-rose-200', dot: 'bg-rose-500' },
};

const WorkshopLevelCard: React.FC<{ level: WorkshopLevel }> = ({ level }) => {
  const colors = levelColorMap[level.levelColor];
  return (
    <div
      className={`rounded-xl border ${colors.border} ${colors.bg} p-6 md:p-8 text-left transition-shadow hover:shadow-md`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className={`w-3 h-3 rounded-full ${colors.dot}`} aria-hidden />
        <h3 className="text-lg font-medium ink-text">
          {level.levelLabel} <span className="chinese-text text-stone-600">/{level.levelLabelZh}</span>
        </h3>
      </div>
      <p className="text-sm text-stone-500 mb-2">{level.gradesEn}</p>
      <p className="chinese-text text-sm text-stone-600 mb-4">{level.gradesZh}</p>
      <p className="text-stone-600 mb-3">{level.descriptionEn}</p>
      <p className="chinese-text text-sm text-stone-500 mb-5">{level.descriptionZh}</p>

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 mt-0.5 shrink-0 text-stone-400" />
          <div>
            <span className="text-stone-500">{level.durationEn}</span>
            <span className="chinese-text text-stone-500 ml-2">{level.durationZh}</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Users className="w-4 h-4 mt-0.5 shrink-0 text-stone-400" />
          <div>
            <span className="text-stone-500">{level.groupSizeEn}</span>
            <span className="chinese-text text-stone-500 ml-2">{level.groupSizeZh}</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Palette className="w-4 h-4 mt-0.5 shrink-0 text-stone-400" />
          <div>
            <span className="text-stone-600">Finished products: {level.productsEn}</span>
            <span className="chinese-text text-stone-500 block mt-1">{level.productsZh}</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Target className="w-4 h-4 mt-0.5 shrink-0 text-stone-400" />
          <div>
            <p className="text-stone-600 font-medium mb-1">Learning focus:</p>
            <ul className="text-stone-500 space-y-0.5">
              {level.learningFocusEn.map((item, i) => (
                <li key={i}>
                  <span>{item}</span>
                  <span className="chinese-text ml-2 text-stone-400">{level.learningFocusZh[i]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const CurationSchools: React.FC = () => {
  return (
    <div className="paper-bg min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-stone-200 bg-white/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-stone-500 mb-2">Cultural Event Curation</p>
          <p className="chinese-text text-base text-stone-500 mb-5">文化活动策展</p>
          <h1 className="text-4xl md:text-5xl font-light ink-text mb-2">School Chinese Culture Courses</h1>
          <p className="chinese-text text-2xl text-stone-700 mb-6">学校中国文化课程</p>
          <p className="text-lg text-stone-600 mb-2">
            Educational Chinese culture and craft courses for all ages — hands-on DIY workshops.
          </p>
          <p className="chinese-text text-base text-stone-500 mb-8">
            提供各年龄段中国文化以及中国手工艺相关寓教于乐课程，课堂 DIY 课程。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-stone-900 text-white px-8 py-4 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
            >
              Book a Workshop / 预约课程
            </Link>
            <a
              href="#workshop-series"
              className="bg-white border border-stone-300 text-stone-800 px-8 py-4 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-50 transition-colors"
            >
              View Workshop Series / 查看课程系列
            </a>
            <Link
              to="/cultural-event-curation"
              className="text-stone-500 hover:text-stone-800 text-sm tracking-widest uppercase transition-colors py-4"
            >
              ← Back to Experience Types
            </Link>
          </div>
        </div>
      </section>

      {/* Quick jump & Workshop series */}
      <section id="workshop-series" className="py-16 md:py-24 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light ink-text mb-2">
              Chinese Heritage Workshop Series
            </h2>
            <p className="chinese-text text-xl text-stone-600 mb-2">中国传统工艺体验系列课程</p>
            <p className="text-stone-500 text-sm max-w-2xl mx-auto">
              Find the right workshop for your grade level. Each series offers age-appropriate options from K–5 through adult.
            </p>
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {SCHOOL_WORKSHOP_SERIES.map((s) => (
              <a
                key={s.id}
                href={`#series-${s.id}`}
                className="px-4 py-2 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors text-sm"
              >
                {s.titleEn}
              </a>
            ))}
          </div>

          {SCHOOL_WORKSHOP_SERIES.map((series) => (
            <div
              key={series.id}
              id={`series-${series.id}`}
              className="scroll-mt-24 mb-20 last:mb-0"
            >
              <h3 className="text-2xl md:text-3xl font-light ink-text mb-2">
                {series.id === 'cloisonne' ? 'Ⅰ. ' : 'Ⅱ. '}{series.titleEn}
              </h3>
              <p className="chinese-text text-lg text-stone-600 mb-8">{series.titleZh}</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {series.levels.map((level) => (
                  <WorkshopLevelCard key={level.id} level={level} />
                ))}
              </div>
            </div>
          ))}

          {/* Bottom CTA */}
          <div className="mt-16 pt-16 border-t border-stone-200 text-center">
            <p className="text-stone-600 mb-4">
              Ready to bring Chinese heritage crafts to your school?
            </p>
            <Link
              to="/contact"
              className="inline-block bg-stone-900 text-white px-8 py-4 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
            >
              Request a Proposal / 申请方案
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CurationSchools;
