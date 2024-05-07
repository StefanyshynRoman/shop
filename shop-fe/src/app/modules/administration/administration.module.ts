import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministratorComponent } from './component/administrator/administrator.component';
import { AddCategoryFormComponent } from './component/administrator/add-category-form/add-category-form.component';
import { ManageProductsComponent } from './component/administrator/manage-products/manage-products.component';


@NgModule({
  declarations: [
    AdministratorComponent,
    AddCategoryFormComponent,
    ManageProductsComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
