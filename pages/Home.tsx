
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Feather, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { CURATED_EVENTS } from '../constants/curatedEvents';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const featuredProducts = PRODUCTS.slice(0, 3);
  return (
    <div className="paper-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
         <img
            src="/images/hero-ink-painting.png"
            alt="Chinese ink abstract painting"
            className="w-full h-full object-cover object-center opacity-50 hero-ink-fade"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fdfbf7]/30 to-[#fdfbf7]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <span className="text-xs uppercase tracking-[0.5em] text-stone-500 mb-6 block animate-fade-in">Established in Heritage</span>
          <h1 className="text-6xl md:text-9xl font-light tracking-tighter ink-text mb-2">
            ONE SIP ONE BRUSH
          </h1>
          <h2 className="chinese-text text-4xl md:text-6xl font-light text-stone-800 mb-10 tracking-[0.8em]">
            一墨一茗
          </h2>
          <p className="text-xl md:text-2xl text-stone-600 italic mb-12 max-w-3xl mx-auto leading-relaxed">
           "A drop of ink to paint the world, a sip of tea to calm the soul."<br />
            <span className="chinese-text text-lg block mt-2 not-italic">“一滴墨汁绘就世界，一盏清茶安抚灵魂。”</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center flex-wrap">
            <Link 
              to="/diy-kit" 
              className="bg-stone-900 text-white px-12 py-5 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-800 transition-all flex items-center justify-center group"
            >
              Shop Collection / 选购套装
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/cultural-event-curation" 
              className="bg-stone-800 text-white px-12 py-5 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-700 transition-all flex items-center justify-center group"
            >
              Design Your Event / 策划活动
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/about" 
              className="bg-white border border-stone-300 text-stone-800 px-12 py-5 rounded-sm text-sm tracking-widest uppercase hover:bg-stone-50 transition-all flex items-center justify-center"
            >
              Our Philosophy / 我们的理念
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-8 border border-stone-100 group-hover:border-stone-400 transition-colors duration-500">
                <Feather className="w-8 h-8 text-stone-700" />
              </div>
              <h3 className="text-2xl font-light mb-2">Traditional Chinese Culture Design</h3>
              <p className="chinese-text text-stone-400 mb-4">中国传统文化设计</p>
              <p className="text-stone-500 leading-relaxed text-sm">Modern aesthetics meeting traditional calligraphy. We design tools that inspire creativity.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-8 border border-stone-100 group-hover:border-stone-400 transition-colors duration-500">
                <BookOpen className="w-8 h-8 text-stone-700" />
              </div>
              <h3 className="text-2xl font-light mb-2">Slow Life Culture</h3>
              <p className="chinese-text text-stone-400 mb-4">慢生活文化</p>
              <p className="text-stone-500 leading-relaxed text-sm">Embracing the 'Slow Life'. Every moment is a meditation, a bridge to tranquility.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-8 border border-stone-100 group-hover:border-stone-400 transition-colors duration-500">
                <Sparkles className="w-8 h-8 text-stone-700" />
              </div>
              <h3 className="text-2xl font-light mb-2">Culture Lab</h3>
              <p className="chinese-text text-stone-400 mb-4">文创堂</p>
              <p className="text-stone-500 leading-relaxed text-sm">Our creative hub where we share the philosophical roots of our thousand-year heritage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-stone-200 pb-8">
          <div>
            <h2 className="text-4xl font-light ink-text uppercase tracking-widest mb-2">Featured Collection</h2>
            <p className="chinese-text text-xl text-stone-500">精选系列</p>
          </div>
          <Link to="/diy-kit" className="mt-4 md:mt-0 text-sm tracking-widest uppercase font-semibold text-stone-900 hover:text-stone-600 transition-colors flex items-center">
            View All Collection / 查看全部 <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
      {/* Past Curated Event Cards — latest first, photo mode */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-stone-200 pb-6">
          <h2 className="text-3xl font-light ink-text mb-2">Past Curated Events</h2>
          <Link to="/cultural-event-curation" className="mt-4 md:mt-0 text-sm tracking-widest uppercase font-semibold text-stone-900 hover:text-stone-600 transition-colors flex items-center">
            View All / 查看全部 <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
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
      </section>

      {/* Workshop Card (Coming Soon) */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative group overflow-hidden rounded-sm">
          <div className="h-[500px] md:h-[600px] w-full bg-gradient-to-br from-[#1a1a1a] via-[#2d2a26] to-[#3d3630] group-hover:from-[#252222] group-hover:via-[#35302a] group-hover:to-[#4a433a] transition-all duration-[2000ms]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
            <span className="text-white/80 uppercase tracking-[0.6em] text-xs mb-6">Experience the Ritual</span>
            <h2 className="text-5xl md:text-7xl text-white font-light mb-2 tracking-tight">Interactive Workshops</h2>
            <h3 className="chinese-text text-3xl md:text-4xl text-white/90 mb-10 tracking-[0.4em]">沉浸式艺术工坊</h3>
            <div className="inline-block border border-white/40 px-12 py-4 text-white text-lg tracking-[0.3em] uppercase bg-black/20 backdrop-blur-sm">
              Coming Soon / 敬请期待
            </div>
            <p className="text-white/80 mt-12 max-w-xl italic text-lg leading-relaxed font-light">
              "To grind ink is to grind the self. To steep tea is to steep the soul."<br />
              Join us for a journey of mindfulness and traditional ceremony.
            </p>
          </div>
        </div>
      </section>

          </div>
  );
};

export default Home;
