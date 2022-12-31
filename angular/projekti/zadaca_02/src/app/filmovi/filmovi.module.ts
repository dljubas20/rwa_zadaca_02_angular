import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { PocetnaComponent } from './pocetna/pocetna.component';
import { FilmoviPregledComponent } from './filmovi-pregled/filmovi-pregled.component';
import { PretrazivanjeFilmovaComponent } from './pretrazivanje-filmova/pretrazivanje-filmova.component';

@NgModule({
  declarations: [
    PocetnaComponent,
    FilmoviPregledComponent,
    PretrazivanjeFilmovaComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class FilmoviModule { }
