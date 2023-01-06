import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'; 
import { MatChipsModule } from '@angular/material/chips'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input';


import { PocetnaComponent } from './pocetna/pocetna.component';
import { FilmoviPregledComponent } from './filmovi-pregled/filmovi-pregled.component';
import { PretrazivanjeFilmovaComponent } from './pretrazivanje-filmova/pretrazivanje-filmova.component';
import { FilmComponent } from './film/film.component';
import { PrijedloziFilmovaComponent } from './prijedlozi-filmova/prijedlozi-filmova.component';
import { GalerijaComponent } from './galerija/galerija.component';
import { SlikaComponent } from './slika/slika.component';

@NgModule({
  declarations: [
    PocetnaComponent,
    FilmoviPregledComponent,
    PretrazivanjeFilmovaComponent,
    FilmComponent,
    PrijedloziFilmovaComponent,
    GalerijaComponent,
    SlikaComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class FilmoviModule { }
