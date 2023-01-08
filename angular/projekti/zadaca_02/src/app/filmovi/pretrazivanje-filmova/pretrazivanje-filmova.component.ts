import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  async ngOnInit(): Promise<void> {
    if (!(await this.korisnikServis.jePrijavljen())) {
      this.router.navigate(['prijava']);
    }

    this.tmdbFilmovi = await this.filmServis.dajTmdbFilmove();
  }

}
