import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetTabPage } from './pet-tab.page';

const routes: Routes = [
  {
    path: '',
    component: PetTabPage,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
    ]
  },
  {
    path: 'register',
    loadChildren: () => import('./register-pet/register-pet.module').then( m => m.RegisterPetPageModule)
   },
  {
    path: 'update',
    loadChildren: () => import('./update-pet-view/update-pet-view.module').then( m => m.ViewUpdatePetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetTabPageRoutingModule {}
