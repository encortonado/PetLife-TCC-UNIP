import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModFinalizarPage } from './mod-finalizar.page';

const routes: Routes = [
  {
    path: '',
    component: ModFinalizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModFinalizarPageRoutingModule {}
