
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', chinese: '首页', path: '/' },
    { name: 'Cultural Event Curation', chinese: '文化活动策展', path: '/cultural-event-curation' },
    { name: 'Past Events', chinese: '往期活动', path: '/curated-events' },
    { name: 'Shop', chinese: '商店', path: '/shop' },
    { name: 'Culture Lab', chinese: '文创堂', path: '/culture-lab' },
    { name: 'About', chinese: '关于', path: '/about' },
    { name: 'Contact', chinese: '联系我们', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex flex-col items-start">
              <span className="text-xl font-semibold tracking-widest uppercase ink-text">One Sip One Brush</span>
              <span className="chinese-text text-xs text-stone-500 tracking-[0.4em]">一墨一茗</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center transition-colors duration-200 ${
                  location.pathname === link.path 
                    ? 'text-stone-900 font-semibold' 
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <span className="text-[11px] uppercase tracking-widest leading-none mb-1">{link.name}</span>
                <span className="chinese-text text-sm leading-none">{link.chinese}</span>
                {location.pathname === link.path && <div className="w-4 h-0.5 bg-stone-900 mt-1"></div>}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative group p-2">
              <ShoppingBag className="w-6 h-6 text-stone-700 group-hover:text-stone-900 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-stone-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#fdfbf7] border-b border-stone-200 py-6 px-4 space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-stone-700 hover:text-stone-900 py-2 border-b border-stone-50"
            >
              <div className="flex items-baseline space-x-2">
                <span className="chinese-text text-lg">{link.chinese}</span>
                <span className="text-xs uppercase tracking-widest text-stone-400">{link.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
