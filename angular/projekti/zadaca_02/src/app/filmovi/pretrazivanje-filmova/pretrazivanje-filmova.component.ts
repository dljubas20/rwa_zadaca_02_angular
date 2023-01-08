import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'projekti/zadaca_02/src/environments/environment';
import { KorisnikService } from '../../autentikacija/korisnik.service';
import { ITmdbFilm } from '../../interfaces/ITmdbFilm';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-pretrazivanje-filmova',
  templateUrl: './pretrazivanje-filmova.component.html',
  styleUrls: ['./pretrazivanje-filmova.component.scss']
})
export class PretrazivanjeFilmovaComponent implements OnInit{
  constructor(private korisnikServis : KorisnikService, private router : Router, private filmServis : FilmService) {

  }
  
  tmdbFilmovi = new Array<ITmdbFilm>();
  posterPutanja = environment.posteriPutanja;
  stranica : number = 1;

  async ngOnInit(): Promise<void> {
    if (!(await this.korisnikServis.jePrijavljen())) {
      this.router.navigate(['prijava']);
    }

    this.tmdbFilmovi = await this.filmServis.dajTmdbFilmove("", 1);
  }

  async pretrazi($event : any) : Promise<void> {
    if (!($event.keyCode >= 112 && $event.keyCode <= 123) || ($event.keyCode >= 48 && 57)) {
      this.tmdbFilmovi = await this.filmServis.dajTmdbFilmove($event.target.value, 1);
    }
  }

  async dodaj(tmdbIdFilma : number) : Promise<void> {
    let uspjeh = await this.filmServis.dodajFilm(tmdbIdFilma);

    if (uspjeh) {
      alert("Film uspješno dodan u bazu!");
    } else {
      alert("Greška");
    }
  }
}
