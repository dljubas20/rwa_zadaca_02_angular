import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { IFilm } from '../../interfaces/IFilm';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-prijedlozi-filmova',
  templateUrl: './prijedlozi-filmova.component.html',
  styleUrls: ['./prijedlozi-filmova.component.scss']
})
export class PrijedloziFilmovaComponent {
  filmovi : Array<IFilm> = new Array<IFilm>();

  @ViewChild(MatTable) tablica!: MatTable<any>;

  constructor (private filmServis : FilmService) {

  }

  ngOnInit(): void {
    this.dohvatiFilmove();
    if(this.filmovi.length == 0)
      setTimeout(this.dohvatiFilmove.bind(this), 3000);
  }

  async dohvatiFilmove() {
    this.filmovi = await this.filmServis.dajFilmovePrijedlozi();
  }

  async odobriFilm(film : IFilm) {
    let odobren = await this.filmServis.odobriFilm(film.id);

    if (odobren) {
      this.ukloniFilm(film);
    }
  }

  async ponistiFilm(film : IFilm) {
    let ponisten = await this.filmServis.ponistiFilm(film.id);
    
    if (ponisten) {
      if (ponisten) {
        this.ukloniFilm(film);
      }
    }
  }
  
  private ukloniFilm(film : IFilm) : void {
    this.filmovi.splice(this.filmovi.indexOf(film), 1);
    this.tablica.renderRows();
  }
}
