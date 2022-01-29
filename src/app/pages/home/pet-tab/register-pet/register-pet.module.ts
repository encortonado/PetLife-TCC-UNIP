import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterPetPage } from './register-pet.page';

import { RegisterPetPageRoutingModule } from './register-pet-update-routing.module';

const routes: Routes = [
  {
    path: '',
    component: RegisterPetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RegisterPetPageRoutingModule
  ],
  declarations: [RegisterPetPage]
})
export class RegisterPetPageModule {}