
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="paper-bg min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-20">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-5xl font-light ink-text uppercase tracking-widest mb-4">Our Essence</h1>
          <h2 className="chinese-text text-3xl font-light text-stone-700 tracking-[0.4em]">品牌初衷</h2>
          <div className="w-24 h-px bg-stone-300 mx-auto mt-12"></div>
        </header>

        {/* Lin Yutang Section */}
        <section className="bg-white p-12 md:p-20 shadow-sm border border-stone-100 rounded-sm">
          <div className="max-w-2xl mx-auto">
            <blockquote className="space-y-8">
              <p className="text-2xl md:text-3xl text-stone-800 leading-relaxed font-light italic text-center">
                "The Chinese soul is found in the 'Slow Life'—the simple joy of tea, poetry, and painting."
              </p>
              <p className="chinese-text text-xl md:text-2xl text-stone-600 leading-relaxed text-center">
                “中国人的灵魂在于‘慢生活’——品茶、作诗、作画的简单快乐。”
              </p>
              <footer className="text-center pt-8">
                <cite className="text-stone-500 uppercase tracking-widest text-sm">— Lin Yutang, <span className="italic">My Country and My People</span> / 林语堂 《吾国与吾民》</cite>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Story Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-light ink-text">Bridging Worlds</h3>
              <h4 className="chinese-text text-xl text-stone-500">连接古今与东西</h4>
            </div>
            <div className="text-stone-600 leading-relaxed space-y-6">
              <p>
                At One Sip One Brush (一墨一茗), our mission is to bring the timeless elegance of Chinese art and culture to the United States. We believe that the thousand-year-old rituals of ink and tea are not just ancient history, but vital practices for the modern soul.
              </p>
              <p className="chinese-text">
                我们的使命是将中国艺术和文化的永恒优雅带到美国。我们相信，千百年来的墨香与茶韵不仅是古老历史，更是现代灵魂的重要修行。
              </p>
              <p>
                We design and curate tools that make these traditional ceremonies accessible and touchable. From DIY calligraphy kits to artisanal tea sets, we invite you to pause, breathe, and create.
              </p>
              <p className="chinese-text">
                我们设计并策划让这些传统仪式触手可及的工具。从书法手作套装到匠心茶具，我们邀请您驻足、呼吸，并开启创作。
              </p>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <img 
              src="/images/logo.png" 
              className="w-full max-w-xs h-auto object-contain"  
              alt="One Sip One Brush Logo"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
