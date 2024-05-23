export interface BasketProduct {
  uuid: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  summaryPrice: number;
}
export interface GutBasketResponse {
  basketProducts: BasketProduct[];
  summaryPrice: number;
}
