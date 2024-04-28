export interface PrimitiveProduct {
  name: string;
  price: number;
  createAr: string;
  imageUrl: string;
  mainDesc: string;
}
export interface GetProductsResponse {
  products: PrimitiveProduct[];
  totalCount: number;
}
