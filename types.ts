/** 商品风格/种类选项：不同颜色、款式等 */
export interface ProductVariant {
  id: string;
  name: string;
  chineseName?: string;
  image: string;
  price?: number; /** 若与主商品不同可单独指定 */
}

export interface Product {
  id: string;
  name: string;
  chineseName: string;
  price: number;
  description: string;
  chineseDescription: string;
  image: string;
  category: 'kit' | 'design';
  /** 可选：不同风格种类，有 variants 时在商品卡显示选择器 */
  variants?: ProductVariant[];
}

export interface CartItem extends Product {
  quantity: number;
  /** 若选了变体，记录变体信息供购物车展示 */
  variantId?: string;
  variantName?: string;
  variantChineseName?: string;
}

/** 购物车行唯一标识：同商品同变体合并，不同变体分开展示 */
export function getCartItemKey(item: CartItem): string {
  return item.variantId ? `${item.id}__${item.variantId}` : item.id;
}

export interface CulturePostSection {
  title: string;
  chineseTitle: string;
  content: string;
  chineseContent: string;
  image?: string;
}

export interface CulturePost {
  id: string;
  title: string;
  chineseTitle: string;
  content: string;
  chineseContent: string;
  image?: string;
  videoUrl?: string;
  date: string;
  type: 'article' | 'video' | 'gallery';
  /** 长文分节内容，用于阅读全文 */
  sections?: CulturePostSection[];
}

export interface OrderInfo {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export type ContactSubject = 'tutorial' | 'general' | 'order' | 'partnership';
