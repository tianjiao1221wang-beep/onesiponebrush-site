/** Past curated events data – sorted by date (latest first) */
export interface CuratedEvent {
  slug: string;
  titleEn: string;
  titleZh: string;
  date: string;
  dateLabel: string;
  descriptionEn: string;
  descriptionZh: string;
  photos: { src: string; alt: string }[];
  /** Chinese-inspired background color for card (e.g. vermillion, ink, celadon) */
  cardColor: string;
}

export const CURATED_EVENTS: CuratedEvent[] = [
  {
    slug: 'lunar-new-year-2026',
    titleEn: 'Lunar New Year at Little Red Schoolhouse',
    titleZh: '红屋自然中心春节活动',
    date: '2026-02-08',
    dateLabel: 'Sunday, Feb 8, 2026',
    descriptionEn:
      'A festive day of cultural crafts at Little Red Schoolhouse Nature Center — Cloisonné enamel workshops, calligraphy, traditional dress, and family engagement.',
    descriptionZh: '红屋自然中心春节文化手工日——景泰蓝、书法、传统服饰与家庭互动体验。',
    cardColor: 'bg-[#c63d2f]', // 朱砂 Vermillion
    photos: [
      { src: '/images/events/event-lny2026-01.png', alt: 'Cloisonné craft — girl in traditional dress with butterfly hair clips' },
      { src: '/images/events/event-lny2026-02.png', alt: 'Full event scene — children crafting with Cloisonné Enamel' },
      { src: '/images/events/event-lny2026-03.png', alt: 'Cultural animation and craft teaching moment' },
      { src: '/images/events/event-lny2026-04.png', alt: 'Calligraphy and craft supplies at table' },
      { src: '/images/events/event-lny2026-05.png', alt: 'Children focused on wooden cutout crafts' },
      { src: '/images/events/event-lny2026-06.png', alt: 'Children in traditional attire crafting together' },
      { src: '/images/events/event-lny2026-07.png', alt: 'Woman in qipao with cultural products display' },
      { src: '/images/events/event-lny2026-08.png', alt: 'Cloisonné workshop — adult guiding child' },
    ],
  },
  {
    slug: 'ruihua-2025',
    titleEn: 'Ruihua Chinese School 2025 Spring Festival Temple Fair & Gala',
    titleZh: '瑞华中文学校2025首届春节庙会暨联欢晚会',
    date: '2025-02-15',
    dateLabel: 'Saturday, Feb 15, 2025',
    descriptionEn:
      'Stage design, temple fair venue layout, poster design, product procurement, and bilingual (中英) materials. A vibrant celebration of Chinese New Year with performances, stalls, and community gathering.',
    descriptionZh: '舞台设计、庙会场地布局、海报设计、物料采购及中英双语物料。表演、摊位与社区团聚的春节庆典。',
    cardColor: 'bg-[#1a4d2e]', // 竹青 / 墨绿 Ink green
    photos: [
      { src: '/images/events/event-ruihua2025-hero.png', alt: 'Stage performance — fan dance with 福 and New Year banners' },
      { src: '/images/events/event-ruihua2025-01.png', alt: 'Group photo on stage with 福 and 新年快乐' },
      { src: '/images/events/event-ruihua2025-02.png', alt: 'Temple fair venue — gym with red lanterns and stalls' },
      { src: '/images/events/event-ruihua2025-03.png', alt: 'Temple fair scene — balloon booth and festive crowd' },
      { src: '/images/events/event-ruihua2025-04.png', alt: 'Participants with red festive decorations' },
      { src: '/images/events/event-ruihua2025-05.png', alt: 'Lady in qipao with flowers and red lantern decor' },
    ],
  },
];

/** Chinese-inspired solid colors for event curation category cards */
export const CURATION_CARD_COLORS = [
  'bg-[#9d2933]', // 胭脂 Rouge
  'bg-[#1a4d2e]', // 竹青 Ink green
  'bg-[#5c4a72]', // 黛色 Dark blue-purple
  'bg-[#8b4513]', // 赭石 Ochre
] as const;
