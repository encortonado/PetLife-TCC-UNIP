import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterServicePage } from './register-service.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterServicePageRoutingModule {}
