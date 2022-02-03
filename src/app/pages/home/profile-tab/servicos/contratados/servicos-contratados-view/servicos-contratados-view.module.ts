import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicosContratadosViewPageRoutingModule } from './servicos-contratados-view-routing.module';

import { ServicosContratadosViewPage } from './servicos-contratados-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicosContratadosViewPageRoutingModule
  ],
  declarations: [ServicosContratadosViewPage]
})
export class ServicosContratadosViewPageModule {}
