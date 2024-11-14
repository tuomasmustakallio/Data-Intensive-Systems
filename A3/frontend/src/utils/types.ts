export interface Customer {
  id: number;
  name: string;
  address: string;
  email: string;
}
export interface Order {
  id: number;
  customerId: number;
  productId: number;
  orderDate: string;
  quantity: number;
}
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}
export interface Supplier {
  id: number;
  name: string;
  contact: string;
  city: string;
  productId: number;
}
