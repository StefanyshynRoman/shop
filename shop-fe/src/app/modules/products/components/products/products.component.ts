import { Component } from '@angular/core';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: Product[] = [
    {
      uid: '1234',
      name: 'Product1',
      price: 200,
      imageUrl: 'https://i.imgur.com/kHeKKij.jpg',
      active: true,
      category: 'Kategoria1',
      shortId: 12345,
    },
  ];
}
