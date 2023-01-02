import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card'; 

import { NavigacijaComponent } from './komponente/navigacija/navigacija.component';

@NgModule({
  declarations: [
    NavigacijaComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    AppRoutingModule,
    MatCardModule
  ],
  exports: [
    NavigacijaComponent,
    AppRoutingModule
  ]
})
export class AppNavigacijaModule { }
