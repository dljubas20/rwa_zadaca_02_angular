import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../servisi/film.service';
import { IFilm } from '../../servisi/IFilm';
import { IZanr } from '../../servisi/IZanr';

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
    this.filmovi = await this.filmServis.dajFilmove();
  }
}
