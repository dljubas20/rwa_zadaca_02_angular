import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PretrazivanjeFilmovaComponent } from './pretrazivanje-filmova/pretrazivanje-filmova.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { ProfilComponent } from './profil/profil.component';
import { FilmoviPregledComponent } from './filmovi-pregled/filmovi-pregled.component';
import { PrijavaComponent } from './prijava/prijava.component';

const routes: Routes = [
  { path: "", component: PocetnaComponent },
  { path: "registracija", component: RegistracijaComponent },
  { path: "pretrazivanje_filmova", component: PretrazivanjeFilmovaComponent },
  { path: "dokumentacija", component: DokumentacijaComponent },
  { path: "profil", component: ProfilComponent },
  { path: "filmovi_pregled", component: FilmoviPregledComponent },
  /* {path: "detalji", component:DetaljiFilmaComponent},
  {path: "detalji/:naziv", component:DetaljiFilmaComponent}, */
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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
