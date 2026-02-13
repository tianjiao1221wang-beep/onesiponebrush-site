
import { Product, CulturePost } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fan Book Lamp DIY',
    chineseName: '扇形书灯 DIY（光 · 空间）',
    price: 68,
    description: 'Inspired by the folding fan and scroll, this DIY book lamp unfolds like a landscape. Through making and light, it invites a slower, more intentional moment.',
    chineseDescription: '以折扇与书卷为灵感，这是一套可亲手完成的东方书灯。展开如山水，点亮成境，让制作与光影成为一段慢下来的时刻。',
    image: '/images/product-fan-book-lamp.jpg',
    category: 'kit'
  },
  {
    id: '2',
    name: 'Koi Peace Buckle',
    chineseName: '锦鲤平安扣（佩戴 · 守护）',
    price: 68,
    description: 'Inspired by the koi and the traditional peace buckle, this piece carries symbols of fortune and wholeness. A blessing not only meant to be wished — but worn.',
    chineseDescription: '以锦鲤与平安扣为意象，将吉祥与圆满化为可随身佩戴的符号。让东方祝福，不只是寓意，而是日常的一部分。',
    image: '/images/product-koi-buckle.jpg',
    category: 'design',
    variants: [
      { id: 'classic', name: 'Classic Gold', chineseName: '经典金', image: '/images/product-koi-buckle.jpg' },
      { id: 'ink', name: 'Ink Black', chineseName: '墨色', image: '/images/product-koi-buckle.jpg' },
    ]
  },
  {
    id: '3',
    name: 'Zen Hanging Incense Holder',
    chineseName: '禅意倒挂线香炉（静 · 呼吸）',
    price: 68,
    description: 'A lotus-shaped hanging incense holder designed for inverted burning. As the incense gently falls, it creates a quiet rhythm that slows the space and the mind. Inspired by Eastern Zen philosophy, the lotus symbolizes purity and inner clarity. The inverted design transforms incense from fragrance into ritual — an everyday practice of stillness and awareness.',
    chineseDescription: '以莲花为形，线香倒悬而燃。一件让时间慢下来的香器，让空间在烟雾升落之间回归安静。灵感源自东方禅意与"静观自省"的生活哲学。莲象征清净与初心，倒挂点香使香灰自然垂落，将日常焚香转化为一场关于专注与呼吸的仪式。',
    image: '/images/product-zen-incense.jpg',
    category: 'design'
  },
  {
    id: '4',
    name: 'Round Fan Wedding DIY',
    chineseName: '团扇婚礼 DIY（礼 · 仪式）',
    price: 68,
    description: 'A DIY bridal round fan inspired by traditional Chinese wedding customs. Through each stitch and detail, it becomes a personal expression of blessing and celebration. The round fan symbolizes unity and harmony in Chinese tradition. By crafting it by hand, ritual transforms from decoration into meaningful participation.',
    chineseDescription: '以中式团扇为形，这是一套可亲手完成的婚礼喜扇 DIY 套装。一针一线之间，将祝福与心意缝入仪式之中。团扇自古象征团圆与圆满，是东方婚礼中的温柔意象。通过亲手制作，让传统礼俗不止停留在形式，而成为可被参与、被记住的文化时刻。',
    image: '/images/product-wedding-fan-white-pearl.png',
    category: 'kit',
    variants: [
      { id: 'white-pearl', name: 'White Pearl', chineseName: '白钻款', image: '/images/product-wedding-fan-white-pearl.png' },
      { id: 'elegant-silver', name: 'Elegant Silver', chineseName: '典雅银白', image: '/images/product-wedding-fan-elegant.png' },
      { id: 'cream-gold', name: 'Cream Gold 囍', chineseName: '米金囍字', image: '/images/product-wedding-fan-cream-gold.png' },
      { id: 'red-gold', name: 'Festive Red Gold', chineseName: '喜庆红金', image: '/images/product-wedding-fan-red-gold.png' },
    ]
  },
  {
    id: '5',
    name: 'Small Script Brush',
    chineseName: '小楷毛笔（写 · 修心）',
    price: 68,
    description: 'A fine-tip brush designed for small regular script and mindful copying. Soft yet precise, it turns writing into a quiet dialogue with oneself. Rooted in the tradition of the Four Treasures of the Study, this brush is not only for calligraphy — but for cultivating focus and inner stillness.',
    chineseDescription: '一支为小楷与抄经而生的细尖毛笔。笔锋轻柔，落墨安静，让书写成为与自己对话的片刻。灵感源自传统文房四宝中的修习精神。在一笔一画之间，练的不只是字，而是专注与沉静——让书写回归初心。',
    image: '/images/product-small-brush.jpg',
    category: 'design'
  },
  {
    id: '6',
    name: 'Mindful Copybook',
    chineseName: '静心抄写本（练 · 沉淀）',
    price: 68,
    description: 'A mindful copybook designed for small script and running script practice. Soft-toned paper and restrained grid lines guide the hand back to rhythm and focus. Inspired by the tradition of meditative copying in Chinese culture, it is not only for handwriting — but for cultivating inner structure and calm.',
    chineseDescription: '为小楷与行书临摹而设计的静心抄写本。纸色温润，格线克制，让书写回归专注与节奏。灵感来自东方"抄经修习"的传统。在反复书写之间，不只是练字，更是在建立内在的秩序与安静。',
    image: '/images/product-copybook.jpg',
    category: 'design'
  },
  {
    id: '7',
    name: 'Golden Branches Jade Leaves · Embroidered Book Cover',
    chineseName: '金枝玉叶 · 刺绣布书衣（藏 · 承载）',
    price: 68,
    description: 'A handcrafted embroidered book cover inspired by the motif "Golden Branches and Jade Leaves." Designed to wrap journals and copybooks in a layer of softness and protection. Rooted in traditional Chinese embroidery, the golden threads and floral forms symbolize growth and quiet refinement. More than a cover, it honors the act of writing and self-reflection.',
    chineseDescription: '以"金枝玉叶"为意象的立体刺绣布书衣。将日常笔记、手账或抄写本包裹其中，让书写拥有一层温柔的守护。刺绣源自东方织绣传统，金线与花叶象征珍贵与生长。它不仅是封套，更是对自我记录与内在世界的一种珍视。',
    image: '/images/product-embroidered-cover.jpg',
    category: 'design'
  }
];

export const CULTURE_POSTS: CulturePost[] = [
  {
    id: 'p1',
    title: 'The Soul of Ink',
    chineseTitle: '墨之魂',
    content: 'In traditional Chinese culture, ink is not just a medium, but a reflection of the artist\'s spirit.',
    chineseContent: '在中国传统文化中，墨不仅是一种媒介，更是艺术家精神的反映。',
    image: '/images/culture-soul-ink.jpg',
    date: '2024-05-15',
    type: 'article'
  },
  {
    id: 'p2',
    title: 'Slow Life: The Art of Tea',
    chineseTitle: '慢生活：茶道艺术',
    content: 'Waiting for the water to reach the perfect temperature is the first lesson in patience.',
    chineseContent: '等待水温达到完美状态是关于耐心的第一课。',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    date: '2024-05-10',
    type: 'video'
  }
];
