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
                className={`relative overflow-hidden rounded-sm min-h-[320px] group flex flex-col justify-end ${event.cardColor}`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white" />
                <div className="relative p-10 md:p-12 text-white">
                  <span className="text-xs uppercase tracking-[0.4em] text-white/80 mb-4 block">Past Curated Event</span>
                  <h2 className="text-3xl font-light mb-4">{event.titleEn}</h2>
                  <p className="chinese-text text-xl text-white/90 mb-4">{event.titleZh}</p>
                  <p className="text-sm text-white/70 mb-6">{event.dateLabel}</p>
                  <p className="text-white/90 leading-relaxed mb-6 max-w-2xl">{event.descriptionEn}</p>
                  <span className="inline-flex items-center text-sm tracking-widest uppercase group-hover:gap-4 gap-2 transition-all">
                    View Gallery / 查看相册
                    <ArrowRight className="w-4 h-4" />
                  </span>
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
