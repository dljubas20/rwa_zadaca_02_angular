import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import { IFilm } from '../../interfaces/IFilm';
import { IZanr } from '../../interfaces/IZanr';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss']
})
export class PocetnaComponent implements OnInit{
  filmovi : Array<{
    zanr: IZanr,
    filmovi: Array<IFilm>
  }> = new Array<{
    zanr: IZanr,
    filmovi: Array<IFilm>
  }>();
  
  constructor(private filmServis : FilmService) {
    
  }
  
  ngOnInit(): void {
    this.dohvatiFilmove();
    if(this.filmovi.length == 0)
      setTimeout(this.dohvatiFilmove.bind(this), 3000);
  }

  async dohvatiFilmove() {
    this.filmovi = await this.filmServis.dajFilmovePocetna();
  }
}
