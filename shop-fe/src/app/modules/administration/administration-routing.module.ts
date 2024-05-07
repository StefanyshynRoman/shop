import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './component/administrator/administrator.component';
import { AddCategoryFormComponent } from './component/administrator/add-category-form/add-category-form.component';
import { ManageProductsComponent } from './component/administrator/manage-products/manage-products.component';

const routes: Routes = [
  {
    path: 'zarzadzaj',
    component: AdministratorComponent,
    children: [
      { path: 'kategorie', component: AddCategoryFormComponent },
      { path: 'produkty', component: ManageProductsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
