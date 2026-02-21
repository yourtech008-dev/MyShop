export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  address: string;
  total_amount: number;
  payment_method: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  created_at: string;
}
