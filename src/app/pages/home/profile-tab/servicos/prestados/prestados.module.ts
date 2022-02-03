import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrestadosPageRoutingModule } from './prestados-routing.module';

import { PrestadosPage } from './prestados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrestadosPageRoutingModule
  ],
  declarations: [PrestadosPage]
})
export class PrestadosPageModule {}
