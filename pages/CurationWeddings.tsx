import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CurationWeddings: React.FC = () => (
  <div className="paper-bg min-h-screen py-24 md:py-32">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-stone-500 mb-2">Cultural Event Curation</p>
        <p className="chinese-text text-base text-stone-500 mb-5">文化活动策展</p>
        <h1 className="text-4xl md:text-5xl font-light ink-text mb-2">Weddings & Chinese Celebrations</h1>
        <p className="chinese-text text-2xl text-stone-700 mb-6">婚礼与中式庆典</p>
        <p className="text-lg text-stone-600 mb-2">
          Custom Chinese cultural programming for baby's 100-day celebration, Chinese wedding, family gatherings, and corporate team building.
        </p>
        <p className="chinese-text text-base text-stone-500 mb-10">
          百日宴、中式婚礼、家族欢聚、公司团建，为重要时刻注入仪式感、文化美学与难忘回忆。
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/contact"
            className="bg-stone-900 text-white px-8 py-4 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
          >
            Request a Proposal
            <span className="block chinese-text normal-case tracking-normal mt-1">申请方案</span>
          </Link>
          <Link
            to="/cultural-event-curation"
            className="bg-white border border-stone-300 text-stone-800 px-8 py-4 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-50 transition-colors"
          >
            Back to Experience Types
            <span className="block chinese-text normal-case tracking-normal mt-1">返回体验类型</span>
          </Link>
        </div>
      </div>

      {/* Example event — Ruihua Chinese School */}
      <div className="mt-20 pt-16 border-t border-stone-200">
        <p className="text-xs uppercase tracking-[0.4em] text-stone-500 mb-4 text-center">Example Event Setup</p>
        <p className="chinese-text text-sm text-stone-500 mb-6 text-center">活动策划示例</p>
        <Link
          to="/curated-events/ruihua-2025"
          className="group flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-md transition-all"
        >
          <div className="w-full sm:w-48 h-32 sm:h-28 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
            <img
              src="/images/events/event-ruihua2025-hero.png"
              alt="Ruihua Chinese School 2025 Spring Festival Temple Fair"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
            />
          </div>
          <div className="flex-grow text-left">
            <h3 className="text-xl font-light ink-text mb-2">Ruihua Chinese School 2025 Spring Festival Temple Fair & Gala</h3>
            <p className="chinese-text text-stone-600 mb-2">瑞华中文学校2025首届春节庙会暨联欢晚会</p>
            <p className="text-sm text-stone-500 mb-3">
              Stage design, temple fair venue layout, poster design, product procurement, and bilingual materials.
            </p>
            <span className="inline-flex items-center text-sm tracking-widest uppercase text-stone-900 group-hover:gap-4 gap-2 transition-all">
              View Event Setup / 查看活动策划
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default CurationWeddings;
