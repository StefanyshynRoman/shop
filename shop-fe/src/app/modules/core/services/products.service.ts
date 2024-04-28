import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GetProductsResponse, PrimitiveProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = `${environment.apiUrl1}/product`;

  constructor(private http: HttpClient) {}

  getProducts(
    pageIndex = 1,
    itemsPerPage = 5,
  ): Observable<GetProductsResponse> {
    const params = new HttpParams()
      .append('_page', pageIndex)
      .append('_limit', itemsPerPage);

    return this.http
      .get<PrimitiveProduct[]>(`${this.apiUrl}`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          if (!response.body) return { products: [], totalCount: 0 };
          console.log(response.headers.get('Connection'));
          console.log(response.headers.get('X-Total-Count'));
          console.log(response.body.length);
          console.log(response.headers.getAll('X-Total-Count'));
          const totalCount = Number(response.headers.get('X-Total-Count'));
          console.log({ products: [...response.body], totalCount });
          return { products: [...response.body], totalCount };
        }),
      );
  }
}
