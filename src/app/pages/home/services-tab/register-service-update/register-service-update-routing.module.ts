import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterServiceUpdatePage } from './register-service-update.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterServiceUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterServiceUpdatePageRoutingModule {}
