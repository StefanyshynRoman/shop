import { NgModule } from '@angular/core';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministratorComponent } from './component/administrator/administrator.component';
import { AddCategoryFormComponent } from './component/administrator/add-category-form/add-category-form.component';
import { ManageProductsComponent } from './component/administrator/manage-products/manage-products.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdministratorComponent,
    AddCategoryFormComponent,
    ManageProductsComponent,
  ],
  imports: [
    SharedModule,
    AdministrationRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AdministrationModule {}
