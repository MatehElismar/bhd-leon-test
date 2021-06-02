import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomePagesPage } from './welcome-pages.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomePagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePagesPageRoutingModule {}
