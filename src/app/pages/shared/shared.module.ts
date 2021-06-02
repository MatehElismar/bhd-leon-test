import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    IonicModule
  ],
  exports : [MenuComponent]
})
export class SharedModule { }
