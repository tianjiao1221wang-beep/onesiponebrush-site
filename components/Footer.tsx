
import React, { useState } from 'react';
import { Send } from 'lucide-react';

const apiBase = (import.meta.env.VITE_CHECKOUT_API_URL || '').trim().replace(/\/+$/, '')
  || (import.meta.env.DEV ? 'http://localhost:4242' : '');

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !apiBase) {
      setError(apiBase ? 'Please enter your email.' : 'Newsletter is not configured.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        setSubscribed(true);
        setEmail('');
      } else {
        setError(data?.message || 'Subscription failed. Please try again.');
      }
    } catch {
      setError('Could not connect. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-stone-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-xl font-semibold tracking-widest uppercase">One Sip One Brush</span>
              <span className="chinese-text text-sm text-stone-400">一墨一茗</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs italic">
              "Fostering a creative bridge between traditional heritage and modern living."
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-8 text-stone-400">The Studio</h4>
            <ul className="space-y-4 text-sm text-stone-300">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Culture Lab</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Workshops</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest mb-8 text-stone-400">Support</h4>
            <ul className="space-y-4 text-sm text-stone-300">
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Care Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-widest text-stone-400">Subscribe to Feeds</h4>
            <p className="text-sm text-stone-300 italic">Get monthly updates on Chinese art, culture, and new product drops.</p>
            {subscribed ? (
              <div className="text-green-400 text-sm animate-pulse">Welcome to the inner circle!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex border-b border-stone-700 pb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="Your Email"
                    className="bg-transparent text-sm w-full outline-none placeholder:text-stone-600"
                    required
                    disabled={loading}
                  />
                  <button type="submit" disabled={loading} className="text-stone-400 hover:text-white transition-colors disabled:opacity-50">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-500 uppercase tracking-widest">
          <p>© 2024 ONE SIP ONE BRUSH. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#">Instagram</a>
            <a href="#">WeChat</a>
            <a href="#">Xiaohongshu</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
