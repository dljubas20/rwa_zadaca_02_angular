import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DokumentacijaComponent } from './komponente/dokumentacija/dokumentacija.component';
import { ProfilComponent } from './komponente/profil/profil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StranicaNijePronadenaComponent } from './komponente/stranica-nije-pronadena/stranica-nije-pronadena.component';

import { AutentikacijaModule } from './autentikacija/autentikacija.module';
import { FilmoviModule } from './filmovi/filmovi.module';
import { ZanroviModule } from './zanrovi/zanrovi.module';
import { AppNavigacijaModule } from './app-navigacija.module';

@NgModule({
  declarations: [
    AppComponent,
    DokumentacijaComponent,
    ProfilComponent,
    StranicaNijePronadenaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AutentikacijaModule,
    FilmoviModule,
    ZanroviModule,
    AppNavigacijaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
