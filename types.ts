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
  /** 推荐年龄，用于活动选配展示，如 "6+", "8-12", "成人" */
  recommendedAge?: string;
  /** 预计制作时长，用于 DIY 商品，如 "1–2 hrs", "2–3 hrs" */
  estimatedHours?: string;
}

/** Contact form link for product purchase / availability inquiries */
export function getProductInquiryPath(
  product: Pick<Product, 'name' | 'chineseName'>,
  variant?: Pick<ProductVariant, 'name' | 'chineseName'>
): string {
  const params = new URLSearchParams();
  params.set('subject', 'product');
  params.set('name', product.name);
  if (product.chineseName) params.set('chineseName', product.chineseName);
  if (variant?.name) params.set('variant', variant.name);
  if (variant?.chineseName) params.set('variantZh', variant.chineseName);
  return `/contact?${params.toString()}`;
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

export type ContactSubject = 'tutorial' | 'general' | 'order' | 'partnership' | 'product';
