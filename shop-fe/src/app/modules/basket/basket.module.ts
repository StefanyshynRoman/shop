import { NgModule } from '@angular/core';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './components/basket/basket.component';
import { BasketProductComponent } from './components/basket/basket-product/basket-product.component';
import { SharedModule } from '../shared/shared.module';
import { CreateOrderComponent } from './components/create-order/create-order.component';

@NgModule({
  declarations: [BasketComponent, BasketProductComponent, CreateOrderComponent],
  imports: [SharedModule, BasketRoutingModule],
})
export class BasketModule {}
