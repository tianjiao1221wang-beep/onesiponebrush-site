
export interface Product {
  id: string;
  name: string;
  chineseName: string;
  price: number;
  description: string;
  chineseDescription: string;
  image: string;
  category: 'kit' | 'design';
}

export interface CartItem extends Product {
  quantity: number;
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
}

export interface OrderInfo {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export type ContactSubject = 'tutorial' | 'general' | 'order' | 'partnership';
