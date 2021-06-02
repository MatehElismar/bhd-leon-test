import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login/login.page';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
