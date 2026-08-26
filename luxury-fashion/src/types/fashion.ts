export type Gender = 'Men' | 'Women' | 'All';
export type SubCategory = 'All' | 'Shirts' | 'T-Shirts' | 'Trousers' | 'Dresses' | 'Outerwear' | 'Bags' | 'Footwear';
export type PageTab = 'home' | 'shop' | 'collections' | 'journal' | 'about';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  gender: 'Men' | 'Women' | 'Unisex';
  category: 'Couture' | 'Ready-To-Wear' | 'Leather Goods' | 'Footwear';
  subCategory: 'Shirts' | 'T-Shirts' | 'Trousers' | 'Dresses' | 'Outerwear' | 'Bags' | 'Footwear';
  priceINR: number;
  image: string;
  gallery: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabric: string;
  origin: string;
  details: string[];
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

export interface CategoryCollection {
  id: string;
  name: string;
  gender: 'Men' | 'Women' | 'All';
  subCategory: SubCategory;
  count: string;
  image: string;
  description: string;
  bgColor: string;
}
