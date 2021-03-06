import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestadosPage } from './prestados.page';

const routes: Routes = [
  {
    path: '',
    component: PrestadosPage
  },
  {
    path: 'view',
    loadChildren: () => import('./servicos-prestados-view/servicos-prestados-view.module').then( m => m.ServicosPrestadosViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestadosPageRoutingModule {}
