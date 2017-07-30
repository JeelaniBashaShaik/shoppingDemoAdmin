import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLandingComponent } from './admin-landing/admin-landing.component';

const appRoutes: Routes = [
    {path: 'admin-landing', component:AdminLandingComponent },
  
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