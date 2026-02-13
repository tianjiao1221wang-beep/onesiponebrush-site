import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import { CURATED_EVENTS } from '../constants/curatedEvents';

const CuratedEventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const index = CURATED_EVENTS.findIndex((e) => e.slug === slug);
  const event = index >= 0 ? CURATED_EVENTS[index] : null;
  const prevEvent = index > 0 ? CURATED_EVENTS[index - 1] : null;
  const nextEvent = index >= 0 && index < CURATED_EVENTS.length - 1 ? CURATED_EVENTS[index + 1] : null;

  if (!event) {
    return (
      <div className="paper-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-stone-900 mb-4">Event not found</h1>
          <Link to="/curated-events" className="text-stone-600 hover:text-stone-900 underline">
            Back to Curated Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-bg min-h-screen">
      <div className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/curated-events"
              className="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2 text-sm uppercase tracking-widest"
            >
              <X className="w-4 h-4" />
              All Events
            </Link>
            <nav className="flex items-center gap-2 text-sm text-stone-500">
              <span className="hidden sm:inline">—</span>
              {prevEvent ? (
                <Link
                  to={`/curated-events/${prevEvent.slug}`}
                  className="flex items-center gap-1 hover:text-stone-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {prevEvent.titleEn}
                </Link>
              ) : (
                <span className="text-stone-300">—</span>
              )}
              <span className="text-stone-300 px-1">|</span>
              {nextEvent ? (
                <Link
                  to={`/curated-events/${nextEvent.slug}`}
                  className="flex items-center gap-1 hover:text-stone-900 transition-colors"
                >
                  {nextEvent.titleEn}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-stone-300">—</span>
              )}
            </nav>
          </div>
          <div>
            <h1 className="text-xl font-light text-stone-900">{event.titleEn}</h1>
            <p className="chinese-text text-stone-500">{event.titleZh}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-stone-500 mb-8">{event.dateLabel}</p>
        <p className="text-stone-600 leading-relaxed mb-10 max-w-2xl">{event.descriptionEn}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.photos.map((photo) => (
            <figure key={photo.alt} className="bg-white border border-stone-200 overflow-hidden">
              <img src={photo.src} alt={photo.alt} className="w-full h-56 object-cover" />
              <figcaption className="text-sm text-stone-600 p-4">{photo.alt}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-stone-200 flex flex-wrap gap-6 justify-between items-center">
          {prevEvent ? (
            <Link
              to={`/curated-events/${prevEvent.slug}`}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" />
              {prevEvent.titleEn}
            </Link>
          ) : (
            <span />
          )}
          <Link
            to="/curated-events"
            className="text-sm uppercase tracking-widest text-stone-500 hover:text-stone-900"
          >
            All Events / 全部活动
          </Link>
          {nextEvent ? (
            <Link
              to={`/curated-events/${nextEvent.slug}`}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm uppercase tracking-widest"
            >
              {nextEvent.titleEn}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
};

export default CuratedEventDetail;
