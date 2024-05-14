import { Component, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { PrimitiveProduct } from '../../../../../core/models/product.model';
import { ProductsService } from '../../../../../core/services/products.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-delete-product-form',
  templateUrl: './delete-product-form.component.html',
  styleUrls: ['./delete-product-form.component.scss'],
})
export class DeleteProductFormComponent implements OnInit {
  filteredOptions!: Observable<PrimitiveProduct[]>;
  searchControl = new FormControl<string>('');

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
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

  openDeleteProduct(productName: string, productCreationDate: string) {
    const date = productCreationDate.replaceAll('-', '');
    const dialog = this.dialog.open(DeleteProductDialogComponent, {
      data: { name: productName, date },
      panelClass: 'dialog',
    });
    dialog.afterClosed().subscribe({
      next: () => {
        this.searchControl.reset();
      },
    });
  }
}
