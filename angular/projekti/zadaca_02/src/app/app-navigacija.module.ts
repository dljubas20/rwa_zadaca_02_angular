import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { AppRoutingModule } from './app-routing.module';

import { NavigacijaComponent } from './komponente/navigacija/navigacija.component';

@NgModule({
  declarations: [
    NavigacijaComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  exports: [
    NavigacijaComponent,
    AppRoutingModule
  ]
})
export class AppNavigacijaModule { }
