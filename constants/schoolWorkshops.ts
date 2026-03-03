/** Chinese Heritage Workshop Series — data for school bookings */

export interface WorkshopLevel {
  id: string;
  levelLabel: string;
  levelLabelZh: string;
  levelColor: 'green' | 'yellow' | 'red';
  gradesEn: string;
  gradesZh: string;
  descriptionZh: string;
  descriptionEn: string;
  durationZh: string;
  durationEn: string;
  groupSizeZh: string;
  groupSizeEn: string;
  productsZh: string;
  productsEn: string;
  learningFocusZh: string[];
  learningFocusEn: string[];
}

export interface WorkshopSeries {
  id: string;
  titleEn: string;
  titleZh: string;
  levels: WorkshopLevel[];
}

export const SCHOOL_WORKSHOP_SERIES: WorkshopSeries[] = [
  {
    id: 'cloisonne',
    titleEn: 'Cloisonné Heritage Experience Series',
    titleZh: '掐丝珐琅体验系列',
    levels: [
      {
        id: 'cloisonne-1',
        levelLabel: 'Level 1 — Elementary',
        levelLabelZh: '初级',
        levelColor: 'green',
        gradesEn: 'Grades K–5',
        gradesZh: '适合小学及以下年龄段学生',
        descriptionZh: '本阶段为上色体验课程，学生将在已完成掐丝结构的模板上进行填色创作。主题以可爱动物、植物与传统纹样为主，强调色彩搭配与创意表达。',
        descriptionEn: 'Students will complete a color-filling experience using pre-wired cloisonné templates. Themes include animals, plants, and simplified traditional motifs. Focus is placed on creativity and color exploration.',
        durationZh: '60分钟',
        durationEn: '60 minutes',
        groupSizeZh: '最多25人',
        groupSizeEn: 'Up to 25 students',
        productsZh: '冰箱贴 / 书签 / 小型挂饰',
        productsEn: 'Magnet / Bookmark / Small decorative piece',
        learningFocusZh: ['色彩搭配基础', '手部精细动作', '文化图案认识', '完整作品成就感'],
        learningFocusEn: ['Color coordination', 'Fine motor skills', 'Introduction to traditional motifs', 'Creative confidence'],
      },
      {
        id: 'cloisonne-2',
        levelLabel: 'Level 2 — Youth',
        levelLabelZh: '青少年',
        levelColor: 'yellow',
        gradesEn: 'Grades 6–12',
        gradesZh: '适合青少年阶段',
        descriptionZh: '学生将体验基础掐丝过程，从简单几何结构开始，逐步过渡到较复杂图案。课程分为两个难度阶段，可根据年龄与经验调整。',
        descriptionEn: 'Students will experience basic wire shaping, beginning with simple geometric forms and gradually progressing toward more complex patterns. Options: 60-minute wire-shaping session or two-session format (60 min shaping + 60 min coloring).',
        durationZh: '60分钟（仅掐丝体验）或 两节课程（60min 掐丝 + 60min 上色）',
        durationEn: '60 minutes (wire only) or Two sessions (60 min shaping + 60 min coloring)',
        groupSizeZh: '最多25人',
        groupSizeEn: 'Up to 25 students',
        productsZh: '书签 / 冰箱贴 / 杯垫',
        productsEn: 'Bookmark / Magnet / Coaster',
        learningFocusZh: ['线条结构理解', '对称与图案设计', '专注力与耐心', '渐进式技能提升'],
        learningFocusEn: ['Structural line thinking', 'Symmetry and pattern design', 'Focus and patience', 'Progressive skill development'],
      },
      {
        id: 'cloisonne-3',
        levelLabel: 'Level 3 — Youth to Adult',
        levelLabelZh: '青少至成人',
        levelColor: 'red',
        gradesEn: 'Grades 9–12 & Adults',
        gradesZh: '适合高年级学生与成人',
        descriptionZh: '本阶段可体验较复杂掐丝结构设计，包括立体或实用型作品。可选：60分钟纯掐丝体验 或 两节课程（掐丝 + 上色）。',
        descriptionEn: 'Explores more intricate cloisonné wire structures, including dimensional or functional pieces. Format: 60-minute wire-shaping session or two-session format (wire shaping + color filling).',
        durationZh: '60分钟 / 120分钟',
        durationEn: '60 minutes / 120 minutes',
        groupSizeZh: '最多20–25人（建议小班）',
        groupSizeEn: '20–25 participants (small group recommended)',
        productsZh: '琉璃茶盘 / 立体书签 / 冰箱贴 / 小型艺术摆件',
        productsEn: 'Glass-style tea tray / Dimensional bookmark / Magnet / Decorative art piece',
        learningFocusZh: ['精细线条控制', '复杂图案构建', '结构逻辑与美学平衡', '传统工艺深度体验'],
        learningFocusEn: ['Precision wire control', 'Complex pattern construction', 'Structural balance and aesthetics', 'Deeper craft experience'],
      },
    ],
  },
  {
    id: 'bamboo',
    titleEn: 'Bamboo Weaving Structure Series',
    titleZh: '竹编结构系列',
    levels: [
      {
        id: 'bamboo-1',
        levelLabel: 'Level 1 — Elementary',
        levelLabelZh: '初级',
        levelColor: 'green',
        gradesEn: 'Grades K–5',
        gradesZh: '适合小学阶段学生',
        descriptionZh: '通过简单平面或基础交织方式，完成小型竹编作品。',
        descriptionEn: 'Students explore basic flat weaving and pattern repetition to create small functional or decorative pieces.',
        durationZh: '30–45分钟',
        durationEn: '30–45 minutes',
        groupSizeZh: '最多25人',
        groupSizeEn: 'Up to 25 students',
        productsZh: '小风铃 / 杯垫 / 竹编画',
        productsEn: 'Wind chime / Coaster / Bamboo weaving artwork',
        learningFocusZh: ['基础交织规律', '手眼协调', '节奏与秩序感', '自然材料认知'],
        learningFocusEn: ['Basic weaving logic', 'Hand-eye coordination', 'Pattern rhythm', 'Appreciation of natural materials'],
      },
      {
        id: 'bamboo-2',
        levelLabel: 'Level 2 — Youth & Adult',
        levelLabelZh: '青少年及成人',
        levelColor: 'yellow',
        gradesEn: 'Grades 6–12 & Adults',
        gradesZh: '适合青少年及成人',
        descriptionZh: '体验结构型与立体型竹编工艺，完成更具功能性的作品。',
        descriptionEn: 'Students explore structural weaving techniques and create dimensional or functional pieces.',
        durationZh: '60分钟',
        durationEn: '60 minutes',
        groupSizeZh: '最多20–25人',
        groupSizeEn: '20–25 participants',
        productsZh: '竹编扇子 / 立体香囊 / 小型竹筐 / 竹编画',
        productsEn: 'Woven fan / Dimensional sachet / Small basket / Bamboo artwork',
        learningFocusZh: ['空间结构理解', '张力与平衡', '规律与创造结合', '传统结构美学'],
        learningFocusEn: ['Spatial structure understanding', 'Tension and balance', 'Pattern logic with creativity', 'Traditional structural aesthetics'],
      },
    ],
  },
];
