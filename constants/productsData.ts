export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const productsData: Product[] = [
  { id: "1", name: "Product 1", price: 10, quantity: 5 },
  { id: "2", name: "Product 2", price: 20, quantity: 3 },
  { id: "3", name: "Product 3", price: 30, quantity: 8 },
];
