export type Gender = 'Men' | 'Women' | 'Unisex';
export type Department = 'Sneakers' | 'Loafers' | 'Boots' | 'High-Tops' | 'Slides';

export interface ShoeProduct {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number; // In INR ₹
  originalPrice?: number;
  gender: Gender;
  department: Department;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: number[]; // UK/IND sizes: 6, 7, 8, 9, 10, 11
  description: string;
  craftDetails: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  heroTag?: string;
}

export interface CartItem {
  product: ShoeProduct;
  selectedColor: string;
  selectedSize: number;
  quantity: number;
}

// Runtime exports for Vite ESM resolver compatibility
export const ShoeProduct = {};
export const CartItem = {};
export const Department = {};
export const Gender = {};
