import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, Mail, ShoppingBag, ArrowRight, Leaf, PenTool, Coffee, CreditCard, Wallet, ShieldCheck, Truck, PlayCircle } from 'lucide-react';
import { NavLink } from './types';

// --- Icons & Assets ---
// Using Lucide icons imported above.
type ProductItem = {
  id: string;
  name: string;
  nameCN: string;
  price: number;
  category: 'DIY Kit' | 'Gift' | 'Seasonal';
  image: string;
};

type CartItem = {
  product: ProductItem;
  quantity: number;
};

const formatPrice = (value: number) => `$${value.toFixed(2)}`;
// --- Components ---

type NavigationProps = {
  cartCount: number;
};

const Navigation: React.FC<NavigationProps> = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const links: NavLink[] = [
    { label: 'Home', labelCN: '首页', path: '/' },
    { label: 'Products', labelCN: '产品', path: '/products' },
    { label: 'About', labelCN: '关于我们', path: '/about' },
    { label: 'Contact', labelCN: '联系', path: '/contact' },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
const scrollToCulture = () => {
    const section = document.getElementById('culture');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCultureClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToCulture, 100);
      return;
    }
    scrollToCulture();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-rice-white/90 backdrop-blur-sm border-b border-stone-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <span className="text-2xl font-serif font-bold text-ink-black tracking-wide group-hover:text-tea-brown transition-colors">
              One Sip One Brush
            </span>
            <span className="text-xs font-serif text-ink-grey tracking-[0.2em] mt-0.5">
              一墨一茗
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center group ${
                  location.pathname === link.path ? 'text-tea-brown' : 'text-ink-grey'
                }`}
              >
                <span className="text-sm font-medium tracking-wide uppercase transition-colors group-hover:text-tea-brown">
                  {link.label}
                </span>
                <span className="text-[10px] text-stone-400 group-hover:text-tea-light transition-colors">
                  {link.labelCN}
                </span>
              </Link>
            ))}
            <button
              type="button"
              onClick={handleCultureClick}
              className="ml-4 inline-flex items-center gap-2 text-ink-grey hover:text-tea-brown transition-colors text-xs uppercase tracking-widest"
              aria-label="Chinese art & culture videos"
            >
               <PlayCircle size={20} />
              Culture Lab 文艺堂
            </button>
            <Link
              to="/cart"
              className={`relative flex items-center gap-2 text-xs uppercase tracking-widest ${
                location.pathname === '/cart' ? 'text-tea-brown' : 'text-ink-grey'
              }`}
            >
              <ShoppingBag size={18} />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-tea-brown text-white text-[10px] rounded-full px-1.5 py-0.5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ink-black hover:text-tea-brown focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-rice-white border-b border-stone-100 absolute w-full left-0 animate-fade-in-down shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-center py-2"
              >
                <span className="block text-lg text-ink-black font-serif">{link.label}</span>
                <span className="block text-xs text-stone-400">{link.labelCN}</span>
              </Link>
            ))}
            <div className="flex justify-center pt-4">
               <button
                type="button"
                onClick={handleCultureClick}
                className="inline-flex items-center gap-2 px-6 py-2 bg-ink-black text-white text-sm uppercase tracking-widest"
              >
                <PlayCircle size={16} /> Culture Lab 文艺堂
              </button>
            </div>
            <div className="flex justify-center pt-2">
              <Link to="/cart" className="relative inline-flex items-center gap-2 text-sm uppercase tracking-widest text-ink-black">
                <ShoppingBag size={18} />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-tea-brown text-white text-[10px] rounded-full px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-paper-beige pt-16 pb-8 border-t border-stone-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-serif font-bold text-ink-black mb-2">One Sip One Brush</h3>
            <p className="text-sm text-ink-grey mb-6 max-w-sm">
              Exploring the quiet beauty of Chinese slow living through tea, ink, and handmade crafts.
              <br/>
              <span className="text-xs text-stone-400 mt-1 block">体验东方慢生活美学</span>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-ink-grey hover:text-tea-brown transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-ink-grey hover:text-tea-brown transition-colors"><Mail size={20} /></a>
              <Link to="/products" className="text-ink-grey hover:text-tea-brown transition-colors"><ShoppingBag size={20} /></Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-ink-black mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-ink-grey">
              <li><Link to="/products" className="hover:text-tea-brown">DIY Kits</Link></li>
              <li><Link to="/workshops" className="hover:text-tea-brown">Workshops</Link></li>
              <li><Link to="/about" className="hover:text-tea-brown">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-ink-black mb-4">Newsletter</h4>
            <p className="text-xs text-stone-500 mb-3">Subscribe for workshops, kits, and biweekly Chinese art & culture lifestyle updates.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
              />
              <button className="bg-ink-black text-white text-xs uppercase tracking-widest py-2 hover:bg-tea-brown transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>
        <div className="border-t border-stone-300 pt-8 text-center text-xs text-stone-500 font-sans">
          &copy; {new Date().getFullYear()} One Sip One Brush. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const Home: React.FC = () => {
    const videoHighlights = [
    {
      title: 'Chinese Calligraphy Basics',
      titleCN: '书法入门介绍',
      description: 'Learn the history, tools, and beginner-friendly strokes of calligraphy.',
      descriptionCN: '了解书法的历史、工具与基础笔画。',
      videoId: 'Q6Nq0KxV2vQ',
    },
    {
      title: 'Ink Wash Painting',
      titleCN: '水墨画文化',
      description: 'A gentle introduction to ink wash landscapes and expressive brushwork.',
      descriptionCN: '认识水墨山水与写意笔法的魅力。',
      videoId: 'wq5U0vC4p0M',
    },
    {
      title: 'Tea Ceremony & Slow Living',
      titleCN: '茶道与慢生活',
      description: 'Discover the calming rituals and etiquette behind Chinese tea culture.',
      descriptionCN: '走进中国茶文化的仪式感与静心之美。',
      videoId: 'rF3vQqQG7Xk',
    },
  ];
  const cultureWritings = [
    {
      title: 'Ink, Tea, and the Quiet Mind',
      titleCN: '墨与茶的静心之道',
      excerpt: 'Notes on finding calm through brushwork and ritual tea preparation.',
      excerptCN: '记录用笔墨与茶仪式寻找平静的心得。',
    },
    {
      title: 'Artifacts & Motifs in Daily Design',
      titleCN: '器物纹样与日常设计',
      excerpt: 'How ancient patterns inspire modern home objects and textiles.',
      excerptCN: '古老纹样如何启发当代家居与织物设计。',
    },
    {
      title: 'Color Stories from Classical Paintings',
      titleCN: '传统绘画中的色彩故事',
      excerpt: 'A palette study from Song and Yuan dynasty landscapes.',
      excerptCN: '从宋元山水画中提炼色彩的研究。',
    },
  ];
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/tea_ceremony/1920/1080" 
            alt="Chinese Tea Ceremony" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-stone-900/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-rice-white via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-sm md:text-base text-white tracking-[0.3em] uppercase mb-4 drop-shadow-md">
            Oriental Aesthetics · Tea · Ink · Slow Living
          </h2>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-medium mb-2 drop-shadow-lg leading-tight">
            One Sip <br className="md:hidden" /> One Brush
          </h1>
          <p className="text-2xl md:text-3xl font-serif text-white/90 font-light mb-8">
            一墨一茗
          </p>
          <p className="text-white/90 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto drop-shadow-sm">
            We bring peaceful Chinese lifestyle and art experiences to families in North America.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/workshops" 
              className="px-8 py-3 bg-white/90 hover:bg-white text-ink-black text-sm uppercase tracking-widest transition-all duration-300 backdrop-blur-sm"
            >
              Join a Workshop
            </Link>
            <Link 
              to="/products" 
              className="px-8 py-3 bg-ink-black/80 hover:bg-ink-black text-white text-sm uppercase tracking-widest transition-all duration-300 backdrop-blur-sm"
            >
              Shop Kits
            </Link>
          </div>
        </div>
      </div>

      {/* Introduction / Philosophy */}
      <section className="py-20 md:py-28 px-6 bg-rice-white text-center">
        <div className="max-w-2xl mx-auto">
          <Leaf className="mx-auto text-tea-brown mb-6" size={24} strokeWidth={1.5} />
          <h2 className="text-3xl md:text-4xl font-serif text-ink-black mb-6">
            Quiet Strength in Slow Living
          </h2>
          <p className="text-ink-grey leading-relaxed text-lg font-light mb-8">
            In a fast-paced world, we offer a sanctuary of creativity. Our workshops and kits are designed not just to make art, but to cultivate patience, focus, and inner peace through the timeless traditions of Chinese aesthetics.
          </p>
          <p className="text-tea-brown text-sm font-serif italic">
            "Art and tea bring quiet strength and emotional comfort"
          </p>
        </div>
      </section>
{/* Culture Video Highlights */}
      <section id="culture" className="py-20 px-4 bg-paper-beige scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-ink-black mb-4">Culture Lab 文艺堂</h2>
            <p className="text-ink-grey">
              Videos and writings introducing Chinese art, artifacts, and my design thoughts.
              <span className="block text-sm text-stone-400 mt-2">分享中国艺术、器物与设计思考的视频与文字</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoHighlights.map((video) => (
              <div key={video.videoId} className="bg-white border border-stone-200 shadow-sm">
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-serif text-ink-black">{video.title}</h3>
                  <p className="text-xs text-stone-400 mb-3">{video.titleCN}</p>
                  <p className="text-sm text-ink-grey mb-1">{video.description}</p>
                  <p className="text-xs text-stone-400">{video.descriptionCN}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {cultureWritings.map((writing) => (
              <div key={writing.title} className="bg-white border border-stone-200 p-5 shadow-sm">
                <h3 className="text-lg font-serif text-ink-black">{writing.title}</h3>
                <p className="text-xs text-stone-400 mb-3">{writing.titleCN}</p>
                <p className="text-sm text-ink-grey mb-1">{writing.excerpt}</p>
                <p className="text-xs text-stone-400">{writing.excerptCN}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sections Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <Link to="/products" className="group block relative overflow-hidden aspect-[3/4] md:aspect-[4/5]">
            <img 
              src="https://picsum.photos/seed/crafts1/800/1000" 
              alt="DIY Kits" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-serif mb-1">DIY Kits</h3>
              <p className="text-xs uppercase tracking-widest opacity-80 mb-2">Cultural Crafts at Home</p>
              <span className="inline-flex items-center text-sm border-b border-white/50 pb-1">Shop Now <ArrowRight size={14} className="ml-2"/></span>
            </div>
          </Link>

          {/* Card 2 */}
          <Link to="/workshops" className="group block relative overflow-hidden aspect-[3/4] md:aspect-[4/5] md:-mt-12">
            <img 
              src="https://picsum.photos/seed/kids_art/800/1000" 
              alt="Kids Workshops" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
             <span className="absolute top-4 left-4 bg-ink-black/80 text-white text-[10px] uppercase tracking-widest px-2 py-1">
              Coming Soon
            </span>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-serif mb-1">Workshops</h3>
              <p className="text-xs uppercase tracking-widest opacity-80 mb-2">Kids & Parents</p>
              <span className="inline-flex items-center text-sm border-b border-white/50 pb-1">Book Class <ArrowRight size={14} className="ml-2"/></span>
            </div>
          </Link>

          {/* Card 3 */}
          <Link to="/workshops" className="group block relative overflow-hidden aspect-[3/4] md:aspect-[4/5]">
            <img 
              src="https://picsum.photos/seed/tea_set/800/1000" 
              alt="Adult Slow Living" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
             <span className="absolute top-4 left-4 bg-ink-black/80 text-white text-[10px] uppercase tracking-widest px-2 py-1">
              Coming Soon
            </span>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-serif mb-1">Slow Living</h3>
              <p className="text-xs uppercase tracking-widest opacity-80 mb-2">Adult Art Sessions</p>
              <span className="inline-flex items-center text-sm border-b border-white/50 pb-1">Learn More <ArrowRight size={14} className="ml-2"/></span>
            </div>
          </Link>

        </div>
      </section>

      {/* Founder Teaser */}
      <section className="py-20 bg-paper-beige">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
             <img 
              src="https://picsum.photos/seed/portrait_artist/800/800" 
              alt="Founder" 
              className="w-full h-auto object-cover shadow-xl max-w-md mx-auto"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-serif text-ink-black mb-4">Meet the Founder</h2>
            <p className="text-ink-grey mb-6 leading-relaxed">
              With a background in architecture and a deep passion for traditional Chinese culture, I founded One Sip One Brush to share the therapeutic power of art. 
            </p>
            <Link to="/about" className="text-tea-brown font-serif italic text-lg hover:underline">
              Read the full story &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 px-4 text-center bg-ink-black text-rice-white">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-serif mb-2">Join Our Community</h2>
          <p className="text-stone-400 mb-8 font-light">
            Receive early access to workshops and DIY kits, plus biweekly updates on Chinese art, artifacts, and slow living.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 bg-stone-800 border border-stone-700 text-white focus:outline-none focus:border-tea-brown"
            />
            <button className="px-8 py-3 bg-tea-brown hover:bg-tea-light hover:text-ink-black transition-colors uppercase tracking-widest text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

type ProductsProps = {
  products: ProductItem[];
  onAddToCart: (product: ProductItem) => void;
};

const Products: React.FC<ProductsProps> = ({ products, onAddToCart }) => {
 
    const categories = ['All', 'DIY Kit', 'Gift', 'Seasonal'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="pt-12 pb-24 px-4 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif text-ink-black mb-2">Curated Shop</h1>
        <p className="text-ink-grey">Tools for creativity and cultural gifts.</p>
        <p className="text-sm text-stone-400 mt-2">精选文创与礼品</p>
      </div>

      {/* Filter */}
      <div className="flex justify-center space-x-8 mb-12 border-b border-stone-200 pb-4 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm uppercase tracking-widest pb-4 border-b-2 transition-colors whitespace-nowrap ${
              activeCategory === cat 
                ? 'border-ink-black text-ink-black' 
                : 'border-transparent text-stone-400 hover:text-ink-grey'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="group cursor-pointer"
            role="button"
            tabIndex={0}
             type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onAddToCart(product);
                }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onAddToCart(product);
              }
            }}
          >
            <div className="relative aspect-square overflow-hidden bg-stone-100 mb-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onAddToCart(product);
                }}
                className="absolute bottom-4 right-4 bg-white text-ink-black p-2 rounded-full shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingBag size={18} />
              </button>
            </div>
            <h3 className="text-lg font-serif text-ink-black group-hover:text-tea-brown transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-stone-400 mb-1">{product.nameCN}</p>
             <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-ink-grey">{formatPrice(product.price)}</p>
              <button
                onClick={() => onAddToCart(product)}
                className="text-xs uppercase tracking-widest text-ink-black border-b border-ink-black/40 hover:text-tea-brown hover:border-tea-brown"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Workshops: React.FC = () => {
   const isEventsOpen = false;
  const events = [
    {
      id: 1,
      title: "Kids Creative Chinese Art",
      titleCN: "少儿创意国风美术",
      desc: "A fun introduction to ink painting and paper crafts tailored for young minds.",
      learn: "Brush holding techniques, simple ink animals, paper cutting.",
      price: "$45 / session",
      duration: "90 mins",
      image: "https://picsum.photos/seed/kids_class/800/500",
      tags: ["Ages 4-15", "Beginner"]
    },
    {
      id: 2,
      title: "Adult Tea & Ink Slow Living",
      titleCN: "成人茶墨慢生活",
      desc: "Escape the city noise. Enjoy premium tea while learning the meditative art of calligraphy.",
      learn: "Tea tasting ceremony, basic calligraphy strokes, mindfulness.",
      price: "$65 / session",
      duration: "2 hours",
      image: "https://picsum.photos/seed/tea_adult/800/500",
      tags: ["Adults", "Relaxation"]
    },
    {
      id: 3,
      title: "Outdoor Summer Sketching",
      titleCN: "夏季户外写生",
      desc: "Connect with nature. We take our easels to the park for a breath of fresh air.",
      learn: "Landscape composition, observing nature, watercolor techniques.",
      price: "$50 / session",
      duration: "2 hours",
      image: "https://picsum.photos/seed/outdoor_art/800/500",
      tags: ["Seasonal", "Outdoor"]
    },
    {
      id: 4,
      title: "College Pop-up & Team Building",
      titleCN: "高校快闪 & 团建",
      desc: "Bring cultural creativity to your campus or office. Customizable crafts.",
      learn: "Team collaboration, creative expression, cultural history.",
      price: "Custom Pricing",
      duration: "2-4 hours",
      image: "https://picsum.photos/seed/team_art/800/500",
      tags: ["Group", "Social"]
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-paper-beige py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-serif text-ink-black mb-4">Workshops & Events</h1>
        <p className="text-ink-grey max-w-2xl mx-auto">
          Immersive experiences designed to slow down time and spark creativity.
          <br/>
          <span className="text-sm text-stone-400 mt-2 block">沉浸式艺术体验</span>
        </p>
         <div className="mt-6 inline-flex flex-col items-center bg-white/80 border border-stone-200 px-6 py-3 text-sm text-ink-black">
          <span className="uppercase tracking-widest text-xs text-stone-500">Opening Soon</span>
          <span className="mt-1">Event registration is opening soon. Join our newsletter for early access.</span>
          <span className="text-xs text-stone-400 mt-1">活动报名即将开放，欢迎订阅获取优先通知。</span>
        </div>
      </div>

      {/* List */}
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        {events.map((evt, idx) => (
          <div key={evt.id} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}>
            
            <div className="w-full md:w-1/2">
              <div className="relative overflow-hidden aspect-video shadow-lg">
                <img 
                  src={evt.image} 
                  alt={evt.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex flex-wrap gap-2">
                {evt.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-500 text-[10px] uppercase tracking-wider rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                <h2 className="text-2xl font-serif text-ink-black">{evt.title}</h2>
                <h3 className="text-base text-stone-400 font-serif mb-2">{evt.titleCN}</h3>
              </div>
              <p className="text-ink-grey font-light leading-relaxed">
                {evt.desc}
              </p>
              <div className="bg-stone-50 p-4 border-l-2 border-tea-brown space-y-2 text-sm text-stone-600">
                <p><strong className="text-ink-black">Learn:</strong> {evt.learn}</p>
                <div className="flex justify-between items-center pt-2">
                  <span><strong className="text-ink-black">Duration:</strong> {evt.duration}</span>
                  <span className="text-lg font-serif text-tea-brown">{evt.price}</span>
                </div>
              </div>
              <button
                disabled={!isEventsOpen}
                className="px-6 py-2 border border-ink-black text-ink-black text-xs uppercase tracking-widest hover:bg-ink-black hover:text-white transition-colors disabled:border-stone-300 disabled:text-stone-400 disabled:hover:bg-transparent"
              >
                {isEventsOpen ? 'Book Now' : 'Coming Soon'}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center mb-16">
          <span className="text-tea-brown uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-serif text-ink-black mb-6">Between Ink & Tea</h1>
          <div className="w-20 h-1 bg-stone-200 mx-auto"></div>
        </div>

        <div className="prose prose-stone mx-auto text-center md:text-left">
          <p className="text-lg leading-relaxed text-ink-grey mb-8 font-light">
            Founded by a former architect with a deep-rooted passion for Chinese heritage, <strong>One Sip One Brush</strong> was born from a simple desire: to find stillness in a chaotic world.
          </p>
          
          <div className="my-12 relative">
             <img 
              src="https://picsum.photos/seed/artist_work/1200/600" 
              alt="Founder working" 
              className="w-full h-auto shadow-sm"
            />
             <p className="text-center text-xs text-stone-400 mt-2 italic">Capturing the moment of creation</p>
          </div>

          <h3 className="text-2xl font-serif text-ink-black mt-12 mb-4 text-center">Philosophy</h3>
          <p className="text-ink-grey leading-relaxed mb-8 text-center max-w-2xl mx-auto">
            We believe that art is not just about the final product, but the process. Just as tea requires patience to brew, true creativity requires a quiet mind. Our mission is to make the sophisticated beauty of Chinese slow-living culture accessible to families in North America, bridging cultures through the universal language of art.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
             <div className="p-6 bg-stone-50">
               <PenTool className="mx-auto mb-4 text-tea-brown" size={32} />
               <h4 className="font-serif text-lg mb-2">Craftsmanship</h4>
               <p className="text-sm text-stone-500">Dedication to handmade quality.</p>
             </div>
             <div className="p-6 bg-stone-50">
               <Coffee className="mx-auto mb-4 text-tea-brown" size={32} />
               <h4 className="font-serif text-lg mb-2">Slow Living</h4>
               <p className="text-sm text-stone-500">Savoring every moment.</p>
             </div>
             <div className="p-6 bg-stone-50">
               <Leaf className="mx-auto mb-4 text-tea-brown" size={32} />
               <h4 className="font-serif text-lg mb-2">Culture</h4>
               <p className="text-sm text-stone-500">Bridging East and West.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in bg-rice-white min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto px-4 py-16 w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-serif text-ink-black mb-6">Get in Touch</h1>
          <p className="text-ink-grey mb-8 font-light">
            Interested in a private workshop, a collaboration, or just want to say hello? We'd love to hear from you.
          </p>
          
          <div className="bg-white border border-stone-200 p-5 mb-8">
            <h2 className="text-base font-serif text-ink-black mb-2">DIY Kit Help</h2>
            <p className="text-sm text-stone-500 mb-3">
              Bought a DIY kit and need help? Send your questions here and we’ll guide you.
            </p>
            <p className="text-xs text-stone-400">DIY套装使用问题欢迎咨询，我们会尽快回复。</p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="mt-1 text-tea-brown" size={20} />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-ink-black">Email</h4>
                <p className="text-stone-500">hello@onesiponebrush.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Instagram className="mt-1 text-tea-brown" size={20} />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-ink-black">Socials</h4>
                <p className="text-stone-500">@OneSipOneBrush</p>
                <p className="text-xs text-stone-400">Instagram / Xiaohongshu / TikTok</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-100">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Name</label>
                <input type="text" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-tea-brown transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Subject</label>
                <select className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-tea-brown transition-colors text-stone-600">
                  <option>General Inquiry</option>
                  <option>Workshop Booking</option>
                  <option>Collaboration</option>
                   <option>DIY Kit Help</option>
                  <option>Product Question</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Email</label>
              <input type="email" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-tea-brown transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Message</label>
              <textarea rows={5} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-tea-brown transition-colors"></textarea>
            </div>
            <button className="w-full bg-ink-black text-white text-xs uppercase tracking-widest py-4 hover:bg-tea-brown transition-colors">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
type CartProps = {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
};

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onClear }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [items]
  );
  const shipping = items.length > 0 ? 8 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) {
      return;
    }
    setOrderPlaced(true);
    onClear();
  };

  return (
    <div className="bg-rice-white min-h-[80vh] animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-ink-black mb-3">Shopping Cart</h1>
          <p className="text-ink-grey">Review your selections and choose a payment method.</p>
        </div>

        {orderPlaced && (
          <div className="mb-10 bg-tea-light/40 border border-tea-light text-ink-black px-6 py-4 flex items-center gap-3">
            <ShieldCheck size={20} className="text-tea-brown" />
            <p className="text-sm">Thank you! Your order request has been received. We'll email your confirmation shortly.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {items.length === 0 ? (
              <div className="bg-white border border-stone-200 p-8 text-center">
                <p className="text-ink-grey mb-4">Your cart is empty. Explore our curated kits to begin.</p>
                <Link to="/products" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-ink-black border-b border-ink-black/50">
                  Browse products <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              items.map(item => (
                <div key={item.product.id} className="bg-white border border-stone-200 p-4 md:p-6 flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-32 h-32 overflow-hidden bg-stone-100">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-serif text-ink-black">{item.product.name}</h3>
                        <p className="text-xs text-stone-400">{item.product.nameCN}</p>
                      </div>
                      <span className="text-sm font-medium text-ink-grey">{formatPrice(item.product.price)}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <label className="text-xs uppercase tracking-widest text-stone-500">Quantity</label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(event) => onUpdateQuantity(item.product.id, Number(event.target.value))}
                        className="w-20 bg-stone-50 border border-stone-200 px-2 py-1 text-sm focus:outline-none focus:border-tea-brown"
                      />
                      <button
                        type="button"
                        onClick={() => onRemove(item.product.id)}
                        className="text-xs uppercase tracking-widest text-stone-400 hover:text-tea-brown"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-sm text-stone-500">
                      Line total: <span className="text-ink-black font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-white border border-stone-200 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-serif text-ink-black mb-2">Order Summary</h2>
              <div className="space-y-2 text-sm text-stone-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-ink-black">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-ink-black">{items.length ? formatPrice(shipping) : formatPrice(0)}</span>
                </div>
                <div className="flex justify-between text-base font-medium text-ink-black pt-2 border-t border-stone-200">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
                <Truck size={14} /> Complimentary gift wrap on orders over $60.
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-sm uppercase tracking-widest text-ink-black mb-2">Shipping Details</h3>
                <div className="space-y-3">
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Street address"
                    className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      placeholder="City"
                      className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
                    />
                    <input
                      required
                      type="text"
                      placeholder="State / Province"
                      className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Postal code"
                      className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Country"
                      className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-widest text-ink-black mb-2">Payment Method</h3>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-3 border border-stone-200 px-3 py-2 bg-stone-50">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <CreditCard size={16} className="text-stone-500" />
                    Credit / Debit Card
                  </label>
                  <label className="flex items-center gap-3 border border-stone-200 px-3 py-2 bg-stone-50">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                    />
                    <Wallet size={16} className="text-stone-500" />
                    PayPal
                  </label>
                  <label className="flex items-center gap-3 border border-stone-200 px-3 py-2 bg-stone-50">
                    <input
                      type="radio"
                      name="payment"
                      value="apple"
                      checked={paymentMethod === 'apple'}
                      onChange={() => setPaymentMethod('apple')}
                    />
                    <Wallet size={16} className="text-stone-500" />
                    Apple Pay
                  </label>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <input
                    required
                    type="text"
                    placeholder="Cardholder name"
                    className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Card number"
                    inputMode="numeric"
                    className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      placeholder="MM / YY"
                      className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
                    />
                    <input
                      required
                      type="text"
                      placeholder="CVC"
                      inputMode="numeric"
                      className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-tea-brown"
                    />
                  </div>
                </div>
              )}

              {paymentMethod !== 'card' && (
                <p className="text-xs text-stone-500">
                  You will be redirected to complete your {paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'} payment securely.
                </p>
              )}

              <button
                type="submit"
                disabled={!items.length}
                className="w-full bg-ink-black text-white text-xs uppercase tracking-widest py-3 hover:bg-tea-brown transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
              <p className="text-[11px] text-stone-400 flex items-center gap-2">
                <ShieldCheck size={12} /> Secure checkout · Your payment details are encrypted.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const products: ProductItem[] = [
    { id: '1', name: 'Cream Glue Phone Case Kit', nameCN: '奶油胶手机壳DIY', price: 25, category: 'DIY Kit', image: 'https://picsum.photos/seed/phonecase/600/600' },
    { id: '2', name: 'Traditional Fan Painting Set', nameCN: '团扇绘画套装', price: 30, category: 'DIY Kit', image: 'https://picsum.photos/seed/fan/600/600' },
    { id: '3', name: 'Chinese Jewelry Making Kit', nameCN: '古风首饰DIY', price: 45, category: 'DIY Kit', image: 'https://picsum.photos/seed/jewelry/600/600' },
    { id: '4', name: 'Plaster Figurine Paint Set', nameCN: '石膏娃娃彩绘', price: 18, category: 'DIY Kit', image: 'https://picsum.photos/seed/plaster/600/600' },
    { id: '5', name: 'Hand-painted Canvas Bag', nameCN: '手绘帆布袋', price: 22, category: 'Gift', image: 'https://picsum.photos/seed/bag/600/600' },
    { id: '6', name: 'Aroma Stone Gift Set', nameCN: '香薰扩香石', price: 35, category: 'Gift', image: 'https://picsum.photos/seed/aroma/600/600' },
    { id: '7', name: 'Mid-Autumn Lantern Kit', nameCN: '中秋花灯DIY', price: 28, category: 'Seasonal', image: 'https://picsum.photos/seed/lantern/600/600' },
    { id: '8', name: 'CNY Couplet Writing Set', nameCN: '新春对联套装', price: 20, category: 'Seasonal', image: 'https://picsum.photos/seed/cny/600/600' },
  ];
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: ProductItem) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.product.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemove = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen font-sans text-ink-black selection:bg-tea-light selection:text-ink-black">
        <Navigation cartCount={cartCount} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/cart"
              element={
                <Cart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                  onClear={handleClearCart}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
