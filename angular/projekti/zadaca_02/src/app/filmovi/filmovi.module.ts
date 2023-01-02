import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'; 
import { MatChipsModule } from '@angular/material/chips'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'


import { PocetnaComponent } from './pocetna/pocetna.component';
import { FilmoviPregledComponent } from './filmovi-pregled/filmovi-pregled.component';
import { PretrazivanjeFilmovaComponent } from './pretrazivanje-filmova/pretrazivanje-filmova.component';
import { FilmComponent } from './film/film.component';

@NgModule({
  declarations: [
    PocetnaComponent,
    FilmoviPregledComponent,
    PretrazivanjeFilmovaComponent,
    FilmComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    RouterModule
  ]
})
export class FilmoviModule { }
