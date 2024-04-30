import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { PrimitiveProduct } from '../../../core/models/product.model';
import { map, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
  products: PrimitiveProduct[] = [];
  totalCount = 0;
  errorMessage: string | null = null;
  sub = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngAfterViewInit(): void {
    // this.productsService.getProducts().subscribe({
    //   next: ({ products, totalCount }) => {
    //     this.products = [...products];
    //     this.totalCount = totalCount;
    //   },
    // });
    //console.log('Total Products:', this.productsService.getProductsAllCount()); // 13 (if all 13 products are fetched correctly)

    this.route.queryParamMap
      .pipe(
        switchMap((queryMap) => {
          const pageIndex = queryMap.get('strona')
            ? Number(queryMap.get('strona'))
            : 1;
          const itemsPerPage = queryMap.get('limit')
            ? Number(queryMap.get('limit'))
            : this.paginator.pageSize;
          return this.productsService.getProducts(pageIndex, itemsPerPage);
        }),
        map(({ products, totalCount }) => {
          this.totalCount = totalCount;
          this.products = [...products];
        }),
      )
      .subscribe({
        error: (err) => {
          this.errorMessage = err;
        },
      });

    this.sub.add(
      this.paginator.page.subscribe({
        next: () => {
          const pageIndex = this.paginator.pageIndex + 1;
          const itemsPerPage = this.paginator.pageSize;

          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { strona: pageIndex, limit: itemsPerPage },
          });
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
