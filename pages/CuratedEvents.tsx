import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CURATED_EVENTS } from '../constants/curatedEvents';

const CuratedEvents: React.FC = () => {
  return (
    <div className="paper-bg min-h-screen">
      <section className="py-28 md:py-36 border-b border-stone-200 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-light ink-text tracking-tight mb-2">Past Curated Events</h1>
          <p className="chinese-text text-2xl text-stone-700 mb-6">往期策划活动</p>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
            Our cultural activations, festivals, and celebrations — latest first.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <h2 className="text-3xl font-light text-stone-900 mb-5">{event.titleEn}</h2>
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

export default CuratedEvents;
