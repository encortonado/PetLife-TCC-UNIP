import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileTabPage } from './profile-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileTabPage
  },
  {
    path: 'contratados',
    loadChildren: () => import('./servicos/contratados/contratados.module').then( m => m.ContratadosPageModule)
  },
  {
    path: 'prestados',
    loadChildren: () => import('./servicos/prestados/prestados.module').then( m => m.PrestadosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileTabPageRoutingModule {}
