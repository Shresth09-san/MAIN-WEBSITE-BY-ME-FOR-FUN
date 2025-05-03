export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  bookings: number;
  quantity?: number;
  selectedDate?: Date | null;
}

export interface CartState {
  items: Product[];
}
