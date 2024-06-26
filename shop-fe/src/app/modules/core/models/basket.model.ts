import { ServerResponseModel } from './server-response.model';

export interface BasketProduct {
  uuid: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  summaryPrice: number;
}
export interface GetBasketResponse {
  basketProducts: BasketProduct[];
  summaryPrice: number;
}
export interface PostBasketBody {
  product: string;
  quantity: number;
}

export interface BasketResponse {
  body: ServerResponseModel | GetBasketResponse | null;
  totalCount: number;
}
