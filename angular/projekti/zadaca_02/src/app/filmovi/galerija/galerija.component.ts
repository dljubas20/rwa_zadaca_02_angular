import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KorisnikService } from '../../autentikacija/korisnik.service';

@Component({
  selector: 'app-galerija',
  templateUrl: './galerija.component.html',
  styleUrls: ['./galerija.component.scss']
})
export class GalerijaComponent implements OnInit{
  slikePutanja? : Array<{
    korime : string,
    naziviSlika : Array<string>
  }> = new Array<{
    korime : string,
    naziviSlika : Array<string>
  }>();

  idFilma? : number;

  constructor(private korisnikServis : KorisnikService, private route : ActivatedRoute) {

  }
  
  async ngOnInit(): Promise<void> {
    this.idFilma = this.route.snapshot.paramMap.get('id') as unknown as number;
    await this.dohvatiSlikeKorisnici();
    if (this.slikePutanja?.length == 0)
      setTimeout(this.dohvatiSlikeKorisnici.bind(this), 3000);

    
  }

  async dohvatiSlikeKorisnici() {
    let slikeKorisnici = await this.korisnikServis.dajSlikeKorisnici(this.idFilma!);
    console.log(slikeKorisnici);
    
    if (typeof slikeKorisnici != "boolean") {
      this.slikePutanja = slikeKorisnici;
    }
  }
  
}
