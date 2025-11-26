export interface Product {
  id: string;
  name: string;
  nameCN: string;
  category: 'DIY Kit' | 'Gift' | 'Seasonal';
  price: string;
  image: string;
  description: string;
}

export interface Workshop {
  id: string;
  title: string;
  titleCN: string;
  targetAudience: string;
  learn: string;
  price: string;
  duration: string;
  image: string;
  category: 'Kids' | 'Adult' | 'Team' | 'Outdoor';
}

export interface NavLink {
  label: string;
  labelCN: string;
  path: string;
}