import { Component } from '@angular/core';
import { IKorisnik } from '../../interfaces/IKorisnik';
import { INavStavka } from '../../interfaces/INavStavka';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrls: ['./navigacija.component.scss']
})

export class NavigacijaComponent {
  stavke: Array<INavStavka> = new Array<INavStavka>(
    { naziv: "Početna", putanja: "", prijavljen: false },
    { naziv: "Registracija", putanja: "registracija", prijavljen: false },
    { naziv: "Pretraživanje filmova", putanja: "pretrazivanje_filmova", prijavljen: true },
    { naziv: "Dokumentacija", putanja: "dokumentacija", prijavljen: false },
    { naziv: "Profil", putanja: "profil", prijavljen: true },
    { naziv: "Filmovi pregled", putanja: "filmovi_pregled", prijavljen: true }
  );

  static prijavljen : boolean = true;

  korisnik : IKorisnik = {
    ime : "",
    prezime : "",
    admin : false
  };

  staticPrijavljen() : boolean {
    return NavigacijaComponent.prijavljen;
  }
}
