import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'projekti/zadaca_02/src/environments/environment';
import { KorisnikService } from '../../autentikacija/korisnik.service';
import { IFilm } from '../../interfaces/IFilm';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-slika',
  templateUrl: './slika.component.html',
  styleUrls: ['./slika.component.scss']
})
export class SlikaComponent implements OnInit{
  
  filmovi : Array<IFilm> = new Array<IFilm>();
  slika : File | null = null;
  odabraniFilm = undefined
  pogresanTip = false;
  pogresnaVelicina = false;
  greska = false;


  constructor(private korisnikServis : KorisnikService, private router : Router, private filmServis : FilmService) {

  }
  
  async ngOnInit(): Promise<void> {
    if (!(await this.korisnikServis.jePrijavljen())) {
      this.router.navigate(['prijava']);
    }
    
    this.filmovi = await this.filmServis.dajFilmovePregled();
  }

  postavljenaSlika($event : any) {    
    if ($event.target.files.length > 0) {
      let datoteka : File = $event.target.files[0];
      let tip = datoteka.type.split("/")[1];
      let dozvoljeniTipovi = ["gif", "jpg", "png", "jpeg"];

      if (tip != undefined && dozvoljeniTipovi.includes(tip)) {
        this.pogresanTip = false;
      } else {
        this.pogresanTip = true;
      }
      
      if(datoteka.size > 500000) {
        this.pogresnaVelicina = true;
      } else {
        this.pogresnaVelicina = false;
      }

      if (!this.pogresanTip && !this.pogresnaVelicina) {
        this.slika = datoteka;
      }
    }
  }

  filmOdabran($event : any) {    
    this.odabraniFilm = $event.value;
  }
}
