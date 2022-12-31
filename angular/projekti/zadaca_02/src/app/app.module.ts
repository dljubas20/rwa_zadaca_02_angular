import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigacijaComponent } from './komponente/navigacija/navigacija.component';
import { DokumentacijaComponent } from './komponente/dokumentacija/dokumentacija.component';
import { ProfilComponent } from './komponente/profil/profil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StranicaNijePronadenaComponent } from './komponente/stranica-nije-pronadena/stranica-nije-pronadena.component';

import { AppRoutingModule } from './app-routing.module';
import { AutentikacijaModule } from './autentikacija/autentikacija.module';
import { FilmoviModule } from './filmovi/filmovi.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigacijaComponent,
    DokumentacijaComponent,
    ProfilComponent,
    StranicaNijePronadenaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AutentikacijaModule,
    FilmoviModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
