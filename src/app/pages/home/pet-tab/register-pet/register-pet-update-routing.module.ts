import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPetPage } from './register-pet.page'

const routes: Routes = [
  {
    path: '',
    component: RegisterPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPetPageRoutingModule {}
