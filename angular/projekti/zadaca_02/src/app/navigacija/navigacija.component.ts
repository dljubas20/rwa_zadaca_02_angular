import { Component } from '@angular/core';
import { IKorisnik } from '../servisi/IKorisnik';
import { INavStavka } from '../servisi/INavStavka';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrls: ['./navigacija.component.scss']
})

export class NavigacijaComponent {
  stavke: Array<INavStavka> = new Array<INavStavka>(
    { naziv: "Početna", putanja: "pocetna", admin: false },
    { naziv: "Registracija", putanja: "registracija", admin: false },
    { naziv: "Pretraživanje filmova", putanja: "pretrazivanje_filmova", admin: true },
    { naziv: "Dokumentacija", putanja: "dokumentacija", admin: false },
    { naziv: "Profil", putanja: "profil", admin: true },
    { naziv: "Filmovi pregled", putanja: "filmovi_pregled", admin: true }
  );

  static prijavljen : boolean = false;

  korisnik : IKorisnik = {
    ime : "",
    prezime : "",
    admin : false
  };

  staticPrijavljen() : boolean {
    return NavigacijaComponent.prijavljen;
  }
}
