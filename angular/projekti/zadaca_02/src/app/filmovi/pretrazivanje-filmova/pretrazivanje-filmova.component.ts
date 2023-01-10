import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

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
  brojStranica : number = 1;
  ubaceniId : Array<number> = new Array<number>();
  ukupanBrojRezultata : number = 0;

  pretraga : string = "";

  async ngOnInit(): Promise<void> {
    if (!(await this.korisnikServis.jePrijavljen())) {
      this.router.navigate(['prijava']);
    }

    let rezultat = await this.filmServis.dajTmdbFilmove("", 1);
    this.stranica = rezultat.page;
    this.brojStranica = rezultat.total_pages;
    this.ukupanBrojRezultata = rezultat.total_results;
    
    this.tmdbFilmovi = (await this.filmServis.dajTmdbFilmove("", this.stranica)).results;
    this.tmdbFilmovi = rezultat.results;

    for (let id of await this.filmServis.dajSveId()) {
      this.ubaceniId.push(id)
    }
  }

  async pretrazi($event : any) : Promise<void> {
    if (!($event.keyCode >= 112 && $event.keyCode <= 123) || ($event.keyCode >= 48 && 57)) {
      this.pretraga = $event.target.value;

      let rezultat = await this.filmServis.dajTmdbFilmove($event.target.value, 1);
      this.stranica = rezultat.page;
      this.brojStranica = rezultat.total_pages;
      this.ukupanBrojRezultata = rezultat.total_results;

      this.tmdbFilmovi = (await this.filmServis.dajTmdbFilmove(this.pretraga, this.stranica)).results;
    }
  }

  async dodaj(tmdbIdFilma : number) : Promise<void> {
    let uspjeh = await this.filmServis.dodajFilm(tmdbIdFilma);

    if (uspjeh) {
      this.ubaceniId.push(tmdbIdFilma);
    } else {
      alert("Došlo je do greške. Pokušajte ponovno kasnije.")
    }
  }

  async prebaciStranicu($event : PageEvent) : Promise<void> {
    this.stranica = $event.pageIndex + 1;
    console.log(this.stranica);
    

    this.tmdbFilmovi = (await this.filmServis.dajTmdbFilmove(this.pretraga, this.stranica)).results;
  }
}
