import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { PrimitiveProduct } from '../../../core/models/product.model';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  products: PrimitiveProduct[] = [];
  totalCount = 0;
  errorMessage: string | null = null;
  sub = new Subscription();
  searchControl = new FormControl<string>('');
  sortControl = new FormControl<string>('');
  orderControl = new FormControl<string>('');

  filteredOptions!: Observable<PrimitiveProduct[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => this.productsService.getProducts(1, 10, value)),
      map(({ products }) => {
        return [...products];
      }),
    );
  }
  ngAfterViewInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((queryMap) => {
          const pageIndex = queryMap.get('strona')
            ? Number(queryMap.get('strona'))
            : 1;
          const itemsPerPage = queryMap.get('limit')
            ? Number(queryMap.get('limit'))
            : this.paginator.pageSize;
          const productName = queryMap.get('nazwa')
            ? queryMap.get('nazwa')
            : '';
          const sortElement = queryMap.get('sortuj_po')
            ? queryMap.get('sortuj_po')
            : null;
          const order = queryMap.get('sortuj') ? queryMap.get('sortuj') : null;
          const category = queryMap.get('kategoria')
            ? queryMap.get('kategoria')
            : null;
          return this.productsService.getProducts(
            pageIndex,
            itemsPerPage,
            productName,
            sortElement,
            order,
            category,
          );
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
          this.navigateToSearchParams();
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  searchProducts() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.navigateToSearchParams();
  }
  navigateToSearchParams() {
    const queryParams: { [key: string]: string | number } = {
      strona: this.paginator.pageIndex + 1,
      limit: this.paginator.pageSize,
    };
    const category = this.route.snapshot.queryParamMap.get('kategoria');
    if (category) {
      queryParams['kategoria'] = category;
    }
    if (this.searchControl.value) {
      queryParams['nazwa'] = this.searchControl.value;
    }
    if (this.sortControl.value) {
      queryParams['sortuj_po'] = this.sortControl.value;
    }
    if (this.orderControl.value) {
      queryParams['sortuj'] = this.orderControl.value;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }
}
