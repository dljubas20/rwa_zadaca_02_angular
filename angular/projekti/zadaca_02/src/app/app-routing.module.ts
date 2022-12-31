import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { PocetnaComponent } from './filmovi/pocetna/pocetna.component';
import { RegistracijaComponent } from './autentikacija/registracija/registracija.component';
import { PretrazivanjeFilmovaComponent } from './filmovi/pretrazivanje-filmova/pretrazivanje-filmova.component';
import { DokumentacijaComponent } from './komponente/dokumentacija/dokumentacija.component';
import { ProfilComponent } from './komponente/profil/profil.component';
import { FilmoviPregledComponent } from './filmovi/filmovi-pregled/filmovi-pregled.component';
import { PrijavaComponent } from './autentikacija/prijava/prijava.component';
import { StranicaNijePronadenaComponent } from './komponente/stranica-nije-pronadena/stranica-nije-pronadena.component';

const routes: Routes = [
  { title: "Početna", path: "", component: PocetnaComponent },
  { title: "Registracija", path: "registracija", component: RegistracijaComponent },
  { title: "Pretraživanje filmova", path: "pretrazivanje_filmova", component: PretrazivanjeFilmovaComponent },
  { title: "Dokumentacija", path: "dokumentacija", component: DokumentacijaComponent },
  { title: "Profil", path: "profil", component: ProfilComponent },
  { title: "Pregled filmova", path: "filmovi_pregled", component: FilmoviPregledComponent },
  { title: "Prijava", path: "prijava", component: PrijavaComponent },
  { title: "Stranica nije pronađena", path: "**", component: StranicaNijePronadenaComponent },
  { path: "", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
