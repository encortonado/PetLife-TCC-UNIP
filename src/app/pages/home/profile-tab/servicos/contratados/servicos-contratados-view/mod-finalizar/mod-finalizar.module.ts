import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModFinalizarPageRoutingModule } from './mod-finalizar-routing.module';

import { ModFinalizarPage } from './mod-finalizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModFinalizarPageRoutingModule
  ],
  declarations: [ModFinalizarPage]
})
export class ModFinalizarPageModule {}
