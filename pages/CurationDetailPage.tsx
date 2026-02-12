import React from 'react';
import { Link } from 'react-router-dom';

interface CurationDetailPageProps {
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
}

const CurationDetailPage: React.FC<CurationDetailPageProps> = ({ titleEn, titleZh, descriptionEn, descriptionZh }) => {
  return (
    <div className="paper-bg min-h-screen py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-stone-500 mb-2">Cultural Event Curation</p>
        <p className="chinese-text text-base text-stone-500 mb-5">文化活动策展</p>
        <h1 className="text-4xl md:text-5xl font-light ink-text mb-2">{titleEn}</h1>
        <p className="chinese-text text-2xl text-stone-700 mb-6">{titleZh}</p>
        <p className="text-lg text-stone-600 mb-2">{descriptionEn}</p>
        <p className="chinese-text text-base text-stone-500 mb-10">{descriptionZh}</p>
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
    </div>
  );
};

export default CurationDetailPage;
