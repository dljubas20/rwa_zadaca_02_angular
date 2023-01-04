import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../../autentikacija/korisnik.service';

@Component({
  selector: 'app-galerija',
  templateUrl: './galerija.component.html',
  styleUrls: ['./galerija.component.scss']
})
export class GalerijaComponent implements OnInit{
  slikePutanja? : Array<{
    korime : string,
    nazivSlike : Array<string>
  }> = new Array<{
    korime : string,
    nazivSlike : Array<string>
  }>();

  constructor(private korisnikServis : KorisnikService) {

  }
  
  ngOnInit(): void {
    let korisniciKorime = this.korisnikServis.dajSlikeKorisnici();
  }
  
}
