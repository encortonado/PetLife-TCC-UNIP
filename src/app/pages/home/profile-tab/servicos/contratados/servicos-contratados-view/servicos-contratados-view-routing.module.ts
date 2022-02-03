import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicosContratadosViewPage } from './servicos-contratados-view.page';

const routes: Routes = [
  {
    path: '',
    component: ServicosContratadosViewPage
  },
  {
    path: 'mod-finalizar',
    loadChildren: () => import('./mod-finalizar/mod-finalizar.module').then( m => m.ModFinalizarPageModule)
  },
  {
    path: 'mod-relatar-problema',
    loadChildren: () => import('./mod-relatar-problema/mod-relatar-problema.module').then( m => m.ModRelatarProblemaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicosContratadosViewPageRoutingModule {}
