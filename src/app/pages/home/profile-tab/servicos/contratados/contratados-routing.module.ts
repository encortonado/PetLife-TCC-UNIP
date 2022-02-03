import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratadosPage } from './contratados.page';

const routes: Routes = [
  {
    path: '',
    component: ContratadosPage
  },
  {
    path: 'view',
    loadChildren: () => import('./servicos-contratados-view/servicos-contratados-view.module').then( m => m.ServicosContratadosViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratadosPageRoutingModule {}
