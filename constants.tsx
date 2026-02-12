
import { Product, CulturePost } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Eternal Ink Starter Kit',
    chineseName: '永恒之墨入门套装',
    price: 88,
    description: 'A complete set featuring a hand-carved stone seal, premium pine soot ink, and two professional-grade brushes.',
    chineseDescription: '完整套装，包含手工雕刻石印、高级松烟墨和两支专业级毛笔。',
    image: '/images/product-eternal-ink.svg',
    category: 'kit'
  },
  {
    id: '2',
    name: 'Mountain Mist Tea Set',
    chineseName: '山雾茶具套装',
    price: 125,
    description: 'Minimalist ceramic Gaiwan and three tasting cups designed to capture the slow rhythm of the afternoon.',
    chineseDescription: '简约陶瓷盖碗和三个品茗杯，旨在捕捉午后的慢节奏。',
    image: '/images/product-mountain-tea.svg',
    category: 'design'
  },
  {
    id: '3',
    name: 'Bamboo Grove Brush Set',
    chineseName: '竹林听雨笔庄',
    price: 65,
    description: 'Three brushes of varying stiffness made from sustainable bamboo and ethically sourced goat hair.',
    chineseDescription: '三支不同硬度的毛笔，由可持续竹材和道德采购的羊毫制成。',
    image: '/images/product-bamboo-brush.svg',
    category: 'kit'
  },
  {
    id: '4',
    name: 'Whispering Silk Scrolls',
    chineseName: '丝绸长卷',
    price: 45,
    description: 'High-quality silk paper scrolls treated for longevity, perfect for landscape painting.',
    chineseDescription: '经过长寿处理的高质量绢本卷轴，非常适合山水画。',
    image: '/images/product-silk-scroll.svg',
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
    image: '/images/culture-soul-ink.svg',
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
