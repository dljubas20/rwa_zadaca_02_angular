import { Component, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import { IKorisnik } from '../../interfaces/IKorisnik';
import { INavStavka } from '../../interfaces/INavStavka';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrls: ['./navigacija.component.scss']
})

export class NavigacijaComponent {
  stavke: Array<INavStavka> = new Array<INavStavka>(
    { naziv: "Početna", putanja: "", prijavljen: false, admin: false },
    { naziv: "Registracija", putanja: "registracija", prijavljen: false, admin: false },
    { naziv: "Pretraživanje filmova", putanja: "pretrazivanje_filmova", prijavljen: true, admin: false },
    { naziv: "Dokumentacija", putanja: "dokumentacija", prijavljen: false, admin: false },
    { naziv: "Profil", putanja: "profil", prijavljen: true, admin: false },
    { naziv: "Filmovi pregled", putanja: "filmovi_pregled", prijavljen: true, admin: false },
    { naziv: "Filmovi prijedlozi", putanja: "filmovi_prijedlozi", prijavljen: true, admin: true },
    { naziv: "Žanrovi", putanja: "zanrovi", prijavljen: true, admin: true },
  );

  jePrijavljen() : boolean {
    return AppComponent.korisnik.prijavljen;
  }

  jeAdmin() : boolean {
    return AppComponent.korisnik.admin;
  }

  dajIme() : string {
    return AppComponent.korisnik.ime;
  }

  dajPrezime() : string {
    return AppComponent.korisnik.prezime;
  }
}
