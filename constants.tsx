
import { Product, CulturePost } from './types';

/** 一墨一茗品牌文章 - 分节内容及英译 */
const YIMOYIMING_SECTIONS = [
  {
    title: 'Prologue',
    chineseTitle: '开篇',
    content: 'Lin Yutang wrote in My Country and My People that Chinese aesthetics embodies a "wisdom of leisure" — an ability to loosen time and settle the heart. Chiang Hsun said in Ten Lectures on Life, "If life has no feeling, it is left with only a busy body." What One Sip One Brush hopes to do is bring feeling back into life.',
    chineseContent: '林语堂在《吾国吾民》中形容中国人的美学是一种"闲适的智慧"，是一种让时间松弛、让心安顿的能力。蒋勋在《生活十讲》中说，"生活若没有感受，便只剩下一具忙碌的身体。"而「一墨一茗」想做的，是让感受重新回到生活。',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80'
  },
  {
    title: 'Art is not a skill, but a way of being',
    chineseTitle: '艺术，不是一种技艺，是一种存在方式',
    content: 'The art we practice is not limited to any single medium — ink, watercolor, gold leaf, canvas, wood, paper, clay, metal, print… They are all merely vehicles for touching the soul. We care less about "making a good piece" and more about the relationship one rebuilds with oneself and the world while creating. Art is: the warmth of fingers touching material; the memory a color evokes in the heart; the arc of a single stroke that determines the direction of emotion; the emergence of form from nothing, a second breath of life. A child creating discovers the world. An adult creating rediscovers themselves. A foreigner creating in an Eastern style meets another culture with tenderness. A Chinese person creating returns to the inner landscape of their heart. Art is a universal language.',
    chineseContent: '我们所做的艺术，不被限定于某种材料——墨、水彩、金箔、布面、木材、纸张、黏土、金属、印刷……它们都只是触碰心灵的媒介。我们在乎的不是"做好一个作品"，而是 人在创造时，与自己和世界重新建立的关系。艺术，是：手指触碰材质的温度；颜色在心里唤起的记忆；一笔线条的弧度决定了情绪的方向；形状从无到有，是生命的第二次呼吸。一个孩子在创作时，是在发现世界。一个成年人在创作时，是在重新发现自己。一个外国人在创作东方风格的作品时，是在与另一种文化温柔地相遇。一个中国人在创作时，是在回到自己内心深处的山水。艺术，是一种通用语言。',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80'
  },
  {
    title: 'Slow is not standing still, but letting the soul catch up',
    chineseTitle: '慢，并非止步，而是让灵魂跟上脚步',
    content: 'Eastern aesthetics value negative space. The painting has unpainted places; the calligraphy has unspoken meaning; the tea has a temperature left unsaid. Slowness is an attitude: letting life unfold in detail rather than be hastily closed. In the One Sip One Brush experience, some capture light with a sheet of gold leaf, some shape form with a piece of wood, some steady the heart with a cup of tea. Every material reminds us: beauty is not produced — it is felt.',
    chineseContent: '东方的美，讲究留白。画有未画之处，字有未写之意，茶有未说出口的温度。慢，是一种态度：让生活在细节里展开，而不是被匆忙合上。在一墨一茗的体验里，有人用一片金箔捕捉光，有人用一块木板塑造形状，有人用一杯茶安顿心绪。每一种材料都在提醒人：美不是生产出来的，是被感受出来的。',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80'
  },
  {
    title: 'Tea: stillness within time, distance between hearts',
    chineseTitle: '茶：时间之内的静，心灵之间的距',
    content: 'Tea is the gentlest ritual in Eastern life. It does not dazzle, does not clamor, neither rushes nor stalls. It tells us: some things only have flavor when we give them time. Tea faces all cultures, needing no words: The Chinese recall home in tea; foreigners understand "the Eastern breath" in tea; children learn to wait in its fragrance; adults find a moment of peace in its vapor. Tea and art are both arts of time. Both require presence.',
    chineseContent: '茶，是东方生活里最温柔的仪式。它不炫目，不喧哗，不急也不慢。它告诉我们：有些事，只有花时间，才会有味道。茶面向所有文化，无需语言：中国人会从茶里想起故乡；外国人会从茶里理解"东方的呼吸"；孩子会从茶香学会等待；大人会在茶气里找到片刻安宁。茶与艺术都是时间的艺术。都需要人 在场。',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80'
  },
  {
    title: 'One Sip One Brush: where East and West meet in beauty',
    chineseTitle: '一墨一茗：让东西方在美里相遇',
    content: 'We are not a traditional calligraphy studio, nor an ordinary handicraft class. We are more like — a place where the world becomes soft again. Here: Chinese children see culture in modern form; foreign friends experience the depth of Eastern aesthetics; adults regain the courage to create; children build an intuitive sense of beauty in freedom; families find rare stillness and warmth in shared creation. Art is connection, tea is warmth, culture is the bridge. One Sip One Brush hopes to be a way for Chinese culture to reach the world, and a door for the world to enter Eastern aesthetics.',
    chineseContent: '我们不是传统的书画机构，也不是普通的手作教室。我们更像是——一个让世界重新变柔软的地方。在这里：中国孩子能看到文化的现代形态；外国朋友能体验东方审美的深度；大人能重拾创作的勇气；孩子能在自由中建立美的直觉；家庭能在共同创作中拥有难得的静与暖。艺术是连接，茶是温度，文化是桥梁。一墨一茗希望成为中国文化走向世界的方式，也是世界走进东方美学的一扇门。',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80'
  },
  {
    title: 'One Sip One Brush: lighting a small Eastern light for every rhythm of life',
    chineseTitle: '一墨一茗：为每一种生活节奏，点亮一小盏东方之光',
    content: 'Our wish is simple: May you still have a corner to slow down amid the fast pace; may you still meet beauty amid pressure; may you see yourself again in creation; may you understand in tea\'s fragrance that life need not be loud. One sip, one breath — let life have warmth again, let the world have aesthetics again, let the heart have space again.',
    chineseContent: '我们的愿望很简单：愿你在快节奏中，仍有一隅可以慢下来；愿你在压力之中，仍能与美相遇；愿你在创作里，重新看见自己；愿你在茶香里，理解生活不必喧哗。一墨一茗，一念一息，让生活重新有温度、让世界重新有审美、让心重新有空间。',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fan Book Lamp DIY',
    chineseName: '扇形书灯 DIY（光 · 空间）',
    price: 19,
    description: 'Inspired by the folding fan and scroll, this DIY book lamp unfolds like a landscape. Through making and light, it invites a slower, more intentional moment.',
    chineseDescription: '以折扇与书卷为灵感，这是一套可亲手完成的东方书灯。展开如山水，点亮成境，让制作与光影成为一段慢下来的时刻。',
    image: '/images/product-fan-book-lamp-lanting.png',
    category: 'kit',
    variants: [
      { id: 'lanting', name: 'Orchid Pavilion', chineseName: '兰亭序', image: '/images/product-fan-book-lamp-lanting.png' },
      { id: 'qianli', name: 'Thousand Li Mountains', chineseName: '千里江山图', image: '/images/product-fan-book-lamp-qianli.png' },
    ]
  },
  {
    id: '2',
    name: 'Koi Peace Buckle',
    chineseName: '锦鲤平安扣（佩戴 · 守护）',
    price: 59,
    description: 'Inspired by the koi and the traditional peace buckle, this piece carries symbols of fortune and wholeness. A blessing not only meant to be wished — but worn.',
    chineseDescription: '以锦鲤与平安扣为意象，将吉祥与圆满化为可随身佩戴的符号。让东方祝福，不只是寓意，而是日常的一部分。',
    image: '/images/product-koi-buckle.png',
    category: 'design',
    variants: [
      { id: 'necklace', name: 'Necklace Set', chineseName: '项链款', image: '/images/product-koi-buckle.png' },
      { id: 'bracelet', name: 'Bracelet Set', chineseName: '手链款', image: '/images/product-koi-buckle.png' },
    ]
  },
  {
    id: '3',
    name: 'Zen Hanging Incense Holder',
    chineseName: '禅意倒挂线香炉（静 · 呼吸）',
    price: 39,
    description: 'A lotus-shaped hanging incense holder designed for inverted burning. Incense included. As the incense gently falls, it creates a quiet rhythm that slows the space and the mind. Inspired by Eastern Zen philosophy, the lotus symbolizes purity and inner clarity. The inverted design transforms incense from fragrance into ritual — an everyday practice of stillness and awareness.',
    chineseDescription: '以莲花为形，线香倒悬而燃。含线香。一件让时间慢下来的香器，让空间在烟雾升落之间回归安静。灵感源自东方禅意与"静观自省"的生活哲学。莲象征清净与初心，倒挂点香使香灰自然垂落，将日常焚香转化为一场关于专注与呼吸的仪式。',
    image: '/images/product-zen-incense-zen.png',
    category: 'design',
    variants: [
      { id: 'zen', name: 'Zen Character', chineseName: '禅字款', image: '/images/product-zen-incense-zen.png' },
      { id: 'chuxin', name: 'Original Heart', chineseName: '初心款', image: '/images/product-zen-incense-chuxin.png' },
    ]
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
    price: 19,
    description: 'A fine-tip brush designed for small regular script and mindful copying. Soft yet precise, it turns writing into a quiet dialogue with oneself. Rooted in the tradition of the Four Treasures of the Study, this brush is not only for calligraphy — but for cultivating focus and inner stillness.',
    chineseDescription: '一支为小楷与抄经而生的细尖毛笔。笔锋轻柔，落墨安静，让书写成为与自己对话的片刻。灵感源自传统文房四宝中的修习精神。在一笔一画之间，练的不只是字，而是专注与沉静——让书写回归初心。',
    image: '/images/product-small-brush.png',
    category: 'design'
  },
  {
    id: '6',
    name: 'Mindful Copybook',
    chineseName: '静心抄写本（练 · 沉淀）',
    price: 29,
    description: 'A mindful copybook designed for small script and running script practice. 10 sheets, 34×69cm (13.4"×27.2"). Soft-toned paper and restrained grid lines guide the hand back to rhythm and focus. Inspired by the tradition of meditative copying in Chinese culture, it is not only for handwriting — but for cultivating inner structure and calm.',
    chineseDescription: '为小楷与行书临摹而设计的静心抄写本，10张装，单张约34×69cm（约13.4×27.2英寸）。纸色温润，格线克制，让书写回归专注与节奏。灵感来自东方"抄经修习"的传统。',
    image: '/images/product-copybook.png',
    category: 'design'
  },
  {
    id: '7',
    name: 'Golden Branches Jade Leaves · Embroidered Book Cover',
    chineseName: '金枝玉叶 · 刺绣布书衣（藏 · 承载）',
    price: 38,
    description: 'A handcrafted embroidered book cover inspired by the motif "Golden Branches and Jade Leaves." Comes with A5-size blank page infill. Designed to wrap journals and copybooks in a layer of softness and protection. Rooted in traditional Chinese embroidery, the golden threads and floral forms symbolize growth and quiet refinement.',
    chineseDescription: '以"金枝玉叶"为意象的立体刺绣布书衣，内衬 A5 尺寸空白页。将日常笔记、手账或抄写本包裹其中，让书写拥有一层温柔的守护。刺绣源自东方织绣传统，金线与花叶象征珍贵与生长。',
    image: '/images/product-embroidered-cover-cream.png',
    category: 'design',
    variants: [
      { id: 'cream', name: 'Cream Gold', chineseName: '奶油金枝', image: '/images/product-embroidered-cover-cream.png' },
      { id: 'black', name: 'Black Gold', chineseName: '墨黑金枝', image: '/images/product-embroidered-cover-black.png' },
      { id: 'floral-wave', name: 'Floral Wave', chineseName: '花漾水韵', image: '/images/product-embroidered-cover-floral-wave.png' },
      { id: 'mythical', name: 'Mythical Crane', chineseName: '祥瑞仙鹤', image: '/images/product-embroidered-cover-mythical.png' },
      { id: 'cream-peony', name: 'Cream Peony', chineseName: '米金牡丹流苏', image: '/images/product-embroidered-cover-cream-peony.png' },
    ]
  },
  {
    id: '8',
    name: 'Embroidery DIY Kit',
    chineseName: '刺绣 DIY 材料包（绣 · 专注）',
    price: 29,
    description: 'A beginner embroidery DIY kit inspired by traditional Chinese stitching. With each thread and stitch, the hands slow — and the mind follows. Rooted in Eastern embroidery heritage, it transforms craft into a practice of patience, focus, and quiet presence.',
    chineseDescription: '一套以传统绣艺为灵感的入门刺绣 DIY 材料包。在一针一线之间，让双手慢下来，让心绪沉静。刺绣源自东方织绣传统，将图案与时间层层叠加于布面。它不仅是手作练习，更是一种关于耐心与专注的生活修习。',
    image: '/images/product-embroidery-kit-bird-flower.png',
    category: 'kit',
    variants: [
      { id: 'bird-flower', name: 'Bird and Flowers', chineseName: '鸟语花香', image: '/images/product-embroidery-kit-bird-flower.png' },
      { id: 'xianghun', name: 'Xianghun', chineseName: '香魂', image: '/images/product-embroidery-kit-xianghun.png' },
    ]
  },
  {
    id: '9',
    name: 'Blessing Sachet DIY',
    chineseName: '祈福香囊 DIY（福 · 随身）',
    price: 25,
    description: 'A DIY blessing sachet inspired by the Dragon Boat Festival tradition. Through handcrafting, fragrance and intention are woven into everyday life. In Chinese culture, sachets symbolize protection and well-being. By making it yourself, tradition becomes personal — a gentle blessing carried close.',
    chineseDescription: '一套以端午祈福传统为灵感的香囊 DIY 材料包。在手工编织之间，将香气与祝福缝入日常。香囊自古寓意平安与守护。通过亲手制作，让节气与心意不止停留于仪式，而成为可随身携带的温柔象征。',
    image: '/images/product-sachet-crochet-pink.png',
    category: 'kit',
    variants: [
      { id: 'pink', name: 'Pink Flower', chineseName: '粉花款', image: '/images/product-sachet-crochet-pink.png' },
      { id: 'green', name: 'Green Flower', chineseName: '绿花款', image: '/images/product-sachet-crochet-green.png' },
    ]
  },
  {
    id: '10',
    name: 'Suzhou Embroidery Handkerchief DIY',
    chineseName: '苏绣手帕 DIY（赠 · 心意）',
    price: 28,
    description: 'A DIY embroidered handkerchief inspired by Suzhou embroidery. With each delicate stitch, intention quietly takes shape. Suzhou embroidery is known for refinement and subtlety. More than a craft, it transforms time and care into something meant to be given.',
    chineseDescription: '一套以苏绣传统为灵感的手帕刺绣 DIY 材料包。在细密针脚之间，将心意悄然织入布面。苏绣讲究精细与含蓄，一针一线不仅是图案的呈现，更是情感的沉淀。亲手完成，让赠予不止于礼物，而是一段被认真对待的时间。',
    image: '/images/product-handkerchief-orchid.png',
    category: 'kit',
    variants: [
      { id: 'orchid', name: 'Orchid', chineseName: '兰花', image: '/images/product-handkerchief-orchid.png' },
      { id: 'plum', name: 'Red Plum', chineseName: '红梅', image: '/images/product-handkerchief-plum.png' },
    ]
  },
  {
    id: '11',
    name: 'Cross-Stitch DIY Kit',
    chineseName: '十字绣 DIY（织 · 时间）',
    price: 26,
    description: 'A cross-stitch DIY kit inspired by classical motifs. Through steady repetition, time gradually takes form on fabric. Built on rhythm and structure, each stitch becomes a quiet practice of patience and balance.',
    chineseDescription: '一套以古风图案为灵感的十字绣 DIY 材料包。在规律交织之间，让时间在布面缓缓显现。十字绣以重复与秩序构成画面。一针一线的叠加，不只是图案的完成，更是一种关于耐心与节奏的修习。',
    image: '/images/product-crossstitch-lotus.png',
    category: 'kit',
    variants: [
      { id: 'lotus', name: 'Lotus', chineseName: '荷花', image: '/images/product-crossstitch-lotus.png' },
      { id: 'goldfoil', name: 'Gold Foil Motifs', chineseName: '金箔款', image: '/images/product-crossstitch-goldfoil.png' },
    ]
  },
  {
    id: '12',
    name: 'Embroidered Bookmark DIY',
    chineseName: '刺绣书签 DIY（阅 · 留痕）',
    price: 5,
    description: 'A set of embroidered bookmark DIY kits where stitching meets reading. Between fabric and page, texture and time quietly unfold. More than a page marker, each stitch preserves a moment of reflection within the act of reading.',
    chineseDescription: '一套刺绣书签 DIY 材料包，将针线与阅读相遇。在布面与书页之间，留下属于自己的纹理与时间。书签不仅标记页码，更标记一段阅读的心境。一针一线的叠加，让书写与手作在日常中彼此呼应。',
    image: '/images/product-bookmark-lavender.png',
    category: 'kit',
    variants: [
      { id: 'lavender', name: 'Lavender', chineseName: '薰衣草', image: '/images/product-bookmark-lavender.png' },
      { id: 'bellflower', name: 'Bellflower', chineseName: '风铃草', image: '/images/product-bookmark-bellflower.png' },
      { id: 'cow-parsley', name: 'Cow Parsley', chineseName: '牛欧芹', image: '/images/product-bookmark-cowparsley.png' },
      { id: 'feverfew', name: 'Feverfew', chineseName: '雏菊', image: '/images/product-bookmark-feverfew.png' },
      { id: 'digitalis', name: 'Digitalis', chineseName: '毛地黄', image: '/images/product-bookmark-digitalis.png' },
    ]
  },
  {
    id: '13',
    name: 'Water-Pattern Round Fan DIY',
    chineseName: '水纹团扇 DIY（风 · 流动）',
    price: 32,
    description: 'A fan DIY kit inspired by flowing water motifs. Through layered textures and movement, it captures a quiet sense of rhythm. In Chinese tradition, the fan represents refinement and seasonal grace. By crafting it by hand, heritage becomes tactile — and personal.',
    chineseDescription: '一套以水波纹为灵感的国风团扇 DIY 材料包。在层层笔触与结构之间，让风与纹理自然流动。扇自古象征文雅与节气之美。通过亲手制作，使传统意象不再停留于观赏，而成为可被触摸与参与的生活片刻。',
    image: '/images/product-water-fan-apricot.png',
    category: 'kit',
    variants: [
      { id: 'apricot', name: 'Apricot Blossom', chineseName: '杏花水扇', image: '/images/product-water-fan-apricot.png' },
      { id: 'ephemeral', name: 'Ephemeral Flower', chineseName: '昙花水扇', image: '/images/product-water-fan-ephemeral.png' },
    ]
  },
  {
    id: '14',
    name: 'Gold Foil Art DIY',
    chineseName: '金箔画 DIY（映 · 光泽）',
    price: 38,
    description: 'A DIY gold-foil art kit inspired by traditional gilding techniques. Through pressing and layering, patterns emerge in luminous detail. Gold foil has long symbolized light and refinement in Chinese culture. By crafting it yourself, heritage transforms into a tangible, contemporary expression.',
    chineseDescription: '一套以金箔拓印工艺为灵感的手作材料包。在轻贴与烧箔之间，让图案在光泽中缓缓浮现。金箔自古象征尊贵与光明。通过亲手完成，使传统工艺不再遥远，而成为触手可及的日常创作。',
    image: '/images/product-goldfoil-art.png',
    category: 'kit'
  }
];

export const CULTURE_POSTS: CulturePost[] = [
  {
    id: 'yimoyiming',
    title: 'One Sip One Brush: Where Slowness Meets the Soul',
    chineseTitle: '一墨一茗：让感受重新回到生活',
    content: 'We live in an age of constant acceleration. Time is sliced into schedules, people are pushed forward, even breathing feels rushed. Yet in Eastern culture there is another rhythm: slow, delicate, implicit — like ink spreading on paper, like tea fragrance rising gently in the air.',
    chineseContent: '我们生活在一个不断加速的时代。时间被切割成一格格日程，人被推着前进，连呼吸都显得仓促。可东方文化里，有另一种节奏：缓慢、细腻、含蓄，如水墨在纸上散开，如茶香在空气中缓缓升起。',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    date: '2025-02-13',
    type: 'article',
    sections: YIMOYIMING_SECTIONS
  }
];
