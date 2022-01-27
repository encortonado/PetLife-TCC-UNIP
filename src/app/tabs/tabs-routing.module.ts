import { HomeTabPage } from './../pages/home/home-tab/home-tab.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./../pages/home/home-tab/home-tab.module').then(m => m.HomeTabPageModule)},
      { path: 'services', loadChildren: () => import('./../pages/home/services-tab/services-tab.module').then(m => m.ServicesTabPageModule)},
      { path: 'pet', loadChildren: () => import('./../pages/home/pet-tab/pet-tab.module').then(m => m.PetTabPageModule)},
      { path: 'profile', loadChildren: () => import('./../pages/home/profile-tab/profile-tab.module').then(m => m.ProfileTabPageModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
