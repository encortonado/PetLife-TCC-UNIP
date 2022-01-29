import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUpdatePetPage } from './update-pet-view.page'

const routes: Routes = [
  {
    path: '',
    component: ViewUpdatePetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUpdatePetPageRoutingModule {}
