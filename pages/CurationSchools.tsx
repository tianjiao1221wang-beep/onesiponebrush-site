import React from 'react';
import { Link } from 'react-router-dom';
import WorkshopSeriesSection from '../components/WorkshopSeriesSection';

const CurationSchools: React.FC = () => (
  <div className="paper-bg min-h-screen">
    <section className="py-16 md:py-24 border-b border-stone-200 bg-white/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-stone-500 mb-2">Cultural Event Curation</p>
        <p className="chinese-text text-base text-stone-500 mb-5">文化活动策展</p>
        <h1 className="text-4xl md:text-5xl font-light ink-text mb-2">Chinese Heritage Enrichment Program</h1>
        <p className="chinese-text text-2xl text-stone-700 mb-6">中国文化艺术素养课程</p>
        <p className="text-lg text-stone-600 mb-2">
          A complete school partnership framework — Heritage Workshops, Series, Summer Camp, Family Workshop, Teacher Resources, Student Passport, Exhibition, and annual School Partnership.
        </p>
        <p className="chinese-text text-base text-stone-500 mb-8">
          完整学校合作体系：体验课、系列课程、夏令营、亲子、教师教材、成长护照、成果展与年度合作。
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
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
    <WorkshopSeriesSection bottomCtaText="Ready to bring Chinese heritage crafts to your school?" />
  </div>
);

export default CurationSchools;
