import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewCatalogComponent } from './view-catalog/view-catalog.component';

const appRoutes: Routes = [
    {path: '',component:AdminLandingComponent },
    {path: 'admin-landing', component:AdminLandingComponent },
    {path: 'add-product', component:AddProductComponent },
    {path: 'view-catalog', component:ViewCatalogComponent }
  
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule {}