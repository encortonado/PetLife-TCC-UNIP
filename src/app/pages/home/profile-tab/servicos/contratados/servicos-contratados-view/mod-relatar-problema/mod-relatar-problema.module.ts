import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModRelatarProblemaPageRoutingModule } from './mod-relatar-problema-routing.module';

import { ModRelatarProblemaPage } from './mod-relatar-problema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModRelatarProblemaPageRoutingModule
  ],
  declarations: [ModRelatarProblemaPage]
})
export class ModRelatarProblemaPageModule {}
