import { HomeTabPage } from './../pages/home/home-tab/home-tab.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'home-tab', pathMatch: 'full' },
      { path: 'home-tab', loadChildren: () => import('./../pages/home/home-tab/home-tab.module').then(m => m.HomeTabPageModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
