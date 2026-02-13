
import React, { useState } from 'react';
import { CULTURE_POSTS } from '../constants';
import { CulturePost, CulturePostSection } from '../types';
import { Calendar, ArrowRight, X, Languages } from 'lucide-react';

const CultureLab: React.FC = () => {
  const [expandedPost, setExpandedPost] = useState<CulturePost | null>(null);
  const [langEn, setLangEn] = useState(false);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <header className="text-center mb-32">
        <h1 className="text-6xl font-light ink-text uppercase tracking-[0.2em] mb-4">Culture Lab</h1>
        <h2 className="chinese-text text-4xl font-light text-stone-800 tracking-[0.4em]">文创堂</h2>
        <div className="w-32 h-px bg-stone-300 mx-auto mt-12"></div>
        <p className="mt-12 text-stone-600 max-w-2xl mx-auto italic leading-relaxed text-lg">
          "Exploring the intersections of traditional Chinese aesthetics and the modern search for quietude."<br/>
          <span className="chinese-text block mt-4 not-italic">在传统中国美学与现代对宁静的追求之间，探索交汇之美。</span>
        </p>
      </header>

      <div className="space-y-40">
        {CULTURE_POSTS.map((post) => (
          <article key={post.id} className="group">
            <div className="flex flex-col md:flex-row gap-16 items-start">
              <div className="w-full md:w-1/2 relative">
                {post.type === 'video' ? (
                  <div className="aspect-video relative overflow-hidden">
                    <video 
                      className="w-full h-full object-cover" 
                      controls 
                      poster="/images/culture-video-poster.svg"
                    >
                      <source src={post.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div className="aspect-[4/5] overflow-hidden transition-all duration-700">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                )}
              </div>
              
              <div className="w-full md:w-1/2 pt-4">
                <div className="flex items-center space-x-6 text-[10px] text-stone-400 uppercase tracking-[0.3em] mb-8">
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-2" /> {post.date}</span>
                  <span className="px-3 py-1 border border-stone-200 rounded-full">
                    {post.type}
                  </span>
                </div>
                <h3 className="text-4xl font-light ink-text mb-4 tracking-tight group-hover:text-stone-700 transition-colors">
                  {post.title}
                </h3>
                <h4 className="chinese-text text-2xl text-stone-500 mb-8">{post.chineseTitle}</h4>
                <div className="space-y-4 mb-12">
                  <p className="text-stone-600 leading-relaxed text-lg italic">
                    {post.content}
                  </p>
                  <p className="chinese-text text-stone-500 leading-relaxed">
                    {post.chineseContent}
                  </p>
                </div>
                {post.sections ? (
                  <button 
                    onClick={() => { setExpandedPost(post); setLangEn(false); }}
                    className="flex items-center text-stone-900 border-b-2 border-stone-900 pb-2 text-sm font-bold tracking-[0.2em] uppercase hover:text-stone-400 hover:border-stone-200 transition-all"
                  >
                    Read Story / 阅读全文 <ArrowRight className="ml-3 w-4 h-4" />
                  </button>
                ) : (
                  <button className="flex items-center text-stone-900 border-b-2 border-stone-900 pb-2 text-sm font-bold tracking-[0.2em] uppercase hover:text-stone-400 hover:border-stone-200 transition-all">
                    Read Story / 阅读全文 <ArrowRight className="ml-3 w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Modal */}
      {expandedPost?.sections && (
        <div 
          className="fixed inset-0 z-50 bg-stone-50/95 backdrop-blur-sm overflow-y-auto"
          onClick={() => setExpandedPost(null)}
        >
          <div 
            className="max-w-3xl mx-auto py-16 px-4 sm:px-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-light ink-text">
                {expandedPost.title}
              </h2>
              <button
                onClick={() => setExpandedPost(null)}
                className="p-2 text-stone-500 hover:text-stone-900 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Translate Toggle */}
            <div className="flex items-center gap-3 mb-16 pb-6 border-b border-stone-200">
              <Languages className="w-5 h-5 text-stone-500" />
              <span className="text-sm text-stone-500 uppercase tracking-wider">Language / 语言</span>
              <button
                onClick={() => setLangEn(false)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${!langEn ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
              >
                中文
              </button>
              <button
                onClick={() => setLangEn(true)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${langEn ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
              >
                English
              </button>
            </div>

            <div className="space-y-24">
              {expandedPost.sections.map((section: CulturePostSection, idx: number) => (
                <section key={idx} className="space-y-6">
                  {section.image && (
                    <div className="aspect-[16/10] overflow-hidden rounded-sm">
                      <img 
                        src={section.image} 
                        alt={langEn ? section.title : section.chineseTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className={`text-2xl font-light ${langEn ? 'ink-text' : 'chinese-text'}`}>
                    {langEn ? section.title : section.chineseTitle}
                  </h3>
                  <div className="space-y-4">
                    <p className={`leading-relaxed ${langEn ? 'text-stone-700' : 'chinese-text text-stone-600'}`}>
                      {langEn ? section.content : section.chineseContent}
                    </p>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CultureLab;
