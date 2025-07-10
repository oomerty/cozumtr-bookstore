export interface Category {
  id: number;
  name: string;
  created_at: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  author: string;
  description: string;
  cover: string;
  price: number;
  created_at: string;
  category_id?: number;
}

// Legacy default export for backward compatibility
const ProductType = {} as Product;
export default ProductType;
