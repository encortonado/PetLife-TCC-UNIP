import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicosPrestadosViewPageRoutingModule } from './servicos-prestados-view-routing.module';

import { ServicosPrestadosViewPage } from './servicos-prestados-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicosPrestadosViewPageRoutingModule
  ],
  declarations: [ServicosPrestadosViewPage]
})
export class ServicosPrestadosViewPageModule {}
