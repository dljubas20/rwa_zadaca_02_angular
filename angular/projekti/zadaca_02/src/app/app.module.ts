import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigacijaComponent } from './komponente/navigacija/navigacija.component';
import { PocetnaComponent } from './komponente/pocetna/pocetna.component';
import { RegistracijaComponent } from './komponente/registracija/registracija.component';
import { PretrazivanjeFilmovaComponent } from './komponente/pretrazivanje-filmova/pretrazivanje-filmova.component';
import { DokumentacijaComponent } from './komponente/dokumentacija/dokumentacija.component';
import { ProfilComponent } from './komponente/profil/profil.component';
import { FilmoviPregledComponent } from './komponente/filmovi-pregled/filmovi-pregled.component';
import { PrijavaComponent } from './komponente/prijava/prijava.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  { path: "", component: PocetnaComponent },
  { path: "registracija", component: RegistracijaComponent },
  { path: "pretrazivanje_filmova", component: PretrazivanjeFilmovaComponent },
  { path: "dokumentacija", component: DokumentacijaComponent },
  { path: "profil", component: ProfilComponent },
  { path: "filmovi_pregled", component: FilmoviPregledComponent },
  { path: "prijava", component: PrijavaComponent },
  { path: "odjava", redirectTo: "", pathMatch: "full" },
  { path: "", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigacijaComponent,
    PocetnaComponent,
    RegistracijaComponent,
    PretrazivanjeFilmovaComponent,
    DokumentacijaComponent,
    ProfilComponent,
    FilmoviPregledComponent,
    PrijavaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
