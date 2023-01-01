import { Component } from '@angular/core';
import { IKorisnik } from './interfaces/IKorisnik';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zadaca_02';

  static korisnik : IKorisnik = {
    ime : "",
    prezime : "",
    admin : false,
    prijavljen : false
  };
}
