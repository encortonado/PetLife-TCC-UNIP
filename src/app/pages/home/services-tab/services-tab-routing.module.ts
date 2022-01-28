import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesTabPage } from './services-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesTabPage,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
    ]
  },
  {
    path: 'register',
    loadChildren: () => import('./register-service/register-service/register-service.module').then( m => m.RegisterServicePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./register-service-update/register-service-update.module').then( m => m.RegisterServiceUpdatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesTabPageRoutingModule {}
