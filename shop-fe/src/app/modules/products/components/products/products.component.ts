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
    {
      uid: '1234',
      name: 'Product1',
      price: 200,
      imageUrl:
        'https://www.labstudio.pl/wp-content/uploads/2017/08/578A9691-1024x682.jpg',
      active: true,
      category: 'Kategoria1',
      shortId: 12345,
    },
    {
      uid: '1234',
      name: 'Product1',
      price: 200,
      imageUrl:
        'https://www.labstudio.pl/wp-content/uploads/2017/08/Pizza-fotografia-kulinarna-578A3166.jpg',
      active: true,
      category: 'Kategoria1',
      shortId: 12345,
    },
    {
      uid: '1234',
      name: 'Product1',
      price: 200,
      imageUrl:
        'https://www.labstudio.pl/wp-content/uploads/2017/08/sushi1_S.jpg',
      active: true,
      category: 'Kategoria1',
      shortId: 12345,
    },
    {
      uid: '1234',
      name: 'Product1',
      price: 200,
      imageUrl:
        'https://www.labstudio.pl/wp-content/uploads/2017/08/578A1385-Edit-Edit-Edit.jpg',
      active: true,
      category: 'Kategoria1',
      shortId: 12345,
    },
    {
      uid: '1234',
      name: 'Product1',
      price: 200,
      imageUrl: 'https://i.imgur.com/kHeKKij.jpg',
      active: true,
      category: 'Kategoria1',
      shortId: 12345,
    },
    {
      uid: '1234',
      name: 'Product1',
      price: 200,
      imageUrl: 'https://i.imgur.com/kHeKKij.jpg',
      active: true,
      category: 'Kategoria1',
      shortId: 12345,
    },
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
