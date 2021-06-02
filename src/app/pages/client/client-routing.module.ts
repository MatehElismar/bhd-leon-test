import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {
    path: "tabs", 
    loadChildren: () => import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'offices',
    loadChildren: () => import('./offices/offices.module').then( m => m.OfficesPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./products-details/products-details.module').then( m => m.ProductsDetailsPageModule)
  },
  {
    path : '',
    redirectTo : 'tabs',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
