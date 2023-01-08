import { Component, OnInit } from '@angular/core';
import { KorisnikService } from './autentikacija/korisnik.service';
import { IKorisnik } from './interfaces/IKorisnik';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'zadaca_02';

  static korisnik : IKorisnik = {
    ime : "",
    prezime : "",
    korime : "",
    email : "",
    id : -1,
    admin : false,
    prijavljen : false
  };

  constructor(private korisnikServis : KorisnikService) {

  }

  async ngOnInit(): Promise<void> {
    let sesija = await this.korisnikServis.dajSesijaKorisnik();

    if (typeof sesija != 'boolean') {
      AppComponent.korisnik.ime = sesija.ime;
      AppComponent.korisnik.prezime = sesija.prezime;
      AppComponent.korisnik.id = sesija.id;
      AppComponent.korisnik.korime = sesija.korime;
      AppComponent.korisnik.email = sesija.email;
      AppComponent.korisnik.admin = sesija.admin;
      AppComponent.korisnik.prijavljen = true;
    }
  }
}
