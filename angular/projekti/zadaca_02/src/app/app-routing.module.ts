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
import { FilmComponent } from './filmovi/film/film.component';
import { PrijedloziFilmovaComponent } from './filmovi/prijedlozi-filmova/prijedlozi-filmova.component';
import { GalerijaComponent } from './filmovi/galerija/galerija.component';

const routes: Routes = [
  { title: "Početna", path: "", component: PocetnaComponent },
  { title: "Registracija", path: "registracija", component: RegistracijaComponent },
  { title: "Pretraživanje filmova", path: "pretrazivanje_filmova", component: PretrazivanjeFilmovaComponent },
  { title: "Dokumentacija", path: "dokumentacija", component: DokumentacijaComponent },
  { title: "Profil", path: "profil", component: ProfilComponent },
  { title: "Pregled filmova", path: "filmovi_pregled", children: [
      { path: "", component: FilmoviPregledComponent },
      { path: ":id", children: [
          { path: "", component: FilmComponent },
          { path: "galerija", component: GalerijaComponent }
        ]
      }
    ]
  },
  { title: "Prijava", path: "prijava", component: PrijavaComponent },
  { title: "Prijedlozi filmova", path: "filmovi_prijedlozi", component: PrijedloziFilmovaComponent },
  { title: "Stranica nije pronađena", path: "**", component: StranicaNijePronadenaComponent },
  { path: "", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
