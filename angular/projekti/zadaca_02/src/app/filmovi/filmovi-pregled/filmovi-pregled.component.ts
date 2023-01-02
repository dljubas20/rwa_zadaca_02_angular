import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilm } from '../../interfaces/IFilm';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-filmovi-pregled',
  templateUrl: './filmovi-pregled.component.html',
  styleUrls: ['./filmovi-pregled.component.scss']
})
export class FilmoviPregledComponent implements OnInit{
  filmovi : Array<IFilm> = new Array<IFilm>();

  constructor (private filmServis : FilmService, private router : Router, private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    this.dohvatiFilmove();
    if(this.filmovi.length == 0)
      setTimeout(this.dohvatiFilmove.bind(this), 3000);
  }

  async dohvatiFilmove() {
    this.filmovi = await this.filmServis.dajFilmovePregled();
  }

  prikaziDetalje(red : IFilm) {
    this.router.navigate([red.id], {relativeTo: this.route, state: red});
  }
}
