import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicosPrestadosViewPage } from './servicos-prestados-view.page';

const routes: Routes = [
  {
    path: '',
    component: ServicosPrestadosViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicosPrestadosViewPageRoutingModule {}
