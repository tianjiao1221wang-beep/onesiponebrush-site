
import React, { useState } from 'react';
import { Send, MessageCircle, Mail, HelpCircle } from 'lucide-react';
import { ContactSubject } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general' as ContactSubject,
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="paper-bg min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-20">
          <h1 className="text-5xl font-light ink-text uppercase tracking-widest mb-4">Connect With Us</h1>
          <h2 className="chinese-text text-3xl font-light text-stone-700">联系我们</h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Section */}
          <div className="space-y-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-light ink-text">How can we help?</h3>
              <p className="text-stone-600 leading-relaxed text-lg">
                Whether you're looking for guidance on using your <strong>DIY Kit</strong>, have questions about traditional ceremonies, or just want to say hello—we're here for you.
              </p>
              <p className="chinese-text text-stone-500">
                无论您是需要<strong>手作套装</strong>的使用指导，还是对传统仪式有任何疑问，或是只想打个招呼——我们都在这里。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 bg-white border border-stone-100 rounded-sm">
                <HelpCircle className="w-8 h-8 text-stone-400 mb-4" />
                <h4 className="font-semibold mb-2">Tutorial Help</h4>
                <p className="text-xs text-stone-500 uppercase tracking-widest mb-2">教程咨询</p>
                <p className="text-sm text-stone-600 italic">Need help with your brush technique or ink ratio?</p>
              </div>
              <div className="p-6 bg-white border border-stone-100 rounded-sm">
                <MessageCircle className="w-8 h-8 text-stone-400 mb-4" />
                <h4 className="font-semibold mb-2">Community</h4>
                <p className="text-xs text-stone-500 uppercase tracking-widest mb-2">社交媒体</p>
                <p className="text-sm text-stone-600">Join our journey on Instagram & WeChat.</p>
              </div>
            </div>

            <div className="bg-stone-900 text-white p-10 rounded-sm space-y-6">
              <h4 className="text-xl font-light tracking-widest uppercase">Subscribe to the Feed</h4>
              <p className="text-stone-400 text-sm">Join our newsletter for monthly insights into Chinese art, slow living tips, and exclusive kit updates.</p>
              <form className="flex border-b border-stone-700 pb-2">
                <input 
                  type="email" 
                  placeholder="Your Email / 您的邮箱" 
                  className="bg-transparent text-sm w-full outline-none placeholder:text-stone-600"
                />
                <button type="button" className="text-stone-400 hover:text-white transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white p-10 md:p-12 shadow-sm border border-stone-100 rounded-sm">
            {isSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8">
                  <Send className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-light mb-4 ink-text">Message Received</h3>
                <p className="chinese-text text-xl text-stone-500 mb-4">信息已收到</p>
                <p className="text-stone-400">We will get back to your inquiry shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3">Your Name / 姓名</label>
                  <input
                    required
                    type="text"
                    className="w-full border-b border-stone-200 py-3 outline-none focus:border-stone-900 transition-colors text-lg"
                    placeholder="Enter your name..."
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3">Email Address / 邮箱</label>
                  <input
                    required
                    type="email"
                    className="w-full border-b border-stone-200 py-3 outline-none focus:border-stone-900 transition-colors text-lg"
                    placeholder="name@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3">Subject / 主题</label>
                  <select
                    className="w-full border-b border-stone-200 py-3 outline-none focus:border-stone-900 transition-colors bg-transparent appearance-none"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value as ContactSubject})}
                  >
                    <option value="general">General Inquiry / 一般咨询</option>
                    <option value="tutorial">DIY Kit Tutorial Help / 套装教程求助</option>
                    <option value="order">Order Question / 订单问题</option>
                    <option value="partnership">Collaboration / 合作事宜</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3">Your Message / 留言</label>
                  <textarea
                    required
                    className="w-full border-b border-stone-200 py-3 outline-none focus:border-stone-900 transition-colors min-h-[150px] resize-none text-lg"
                    placeholder="How can we assist you today?..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white py-5 rounded-sm text-sm tracking-widest uppercase font-bold hover:bg-stone-800 transition-all flex items-center justify-center space-x-3"
                >
                  <span>SEND MESSAGE</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
