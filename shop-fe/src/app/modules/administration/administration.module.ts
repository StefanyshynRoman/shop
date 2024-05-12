import { NgModule } from '@angular/core';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministratorComponent } from './component/administrator/administrator.component';
import { AddCategoryFormComponent } from './component/administrator/add-category-form/add-category-form.component';
import { ManageProductsComponent } from './component/administrator/manage-products/manage-products.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { AddProductFormComponent } from './component/administrator/manage-products/add-product-form/add-product-form.component';
import { DeleteProductFormComponent } from './component/administrator/manage-products/delete-product-form/delete-product-form.component';
import { UploadedImagesComponent } from './component/administrator/manage-products/add-product-form/uploaded-images/uploaded-images.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AdministratorComponent,
    AddCategoryFormComponent,
    ManageProductsComponent,
    AddProductFormComponent,
    DeleteProductFormComponent,
    UploadedImagesComponent,
  ],
  imports: [
    SharedModule,
    AdministrationRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    AngularEditorModule,
  ],
})
export class AdministrationModule {}
