import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewUpdatePetPage } from './update-pet-view.page';

import { ViewUpdatePetPageRoutingModule } from './update-pet-view-routing.module';


const routes: Routes = [
  {
    path: '',
    component: ViewUpdatePetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes,
    ),
    ReactiveFormsModule,
    ViewUpdatePetPageRoutingModule
  ],
  declarations: [ViewUpdatePetPage]
})
export class ViewUpdatePetPageModule {}