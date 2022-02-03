import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModRelatarProblemaPage } from './mod-relatar-problema.page';

const routes: Routes = [
  {
    path: '',
    component: ModRelatarProblemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModRelatarProblemaPageRoutingModule {}
