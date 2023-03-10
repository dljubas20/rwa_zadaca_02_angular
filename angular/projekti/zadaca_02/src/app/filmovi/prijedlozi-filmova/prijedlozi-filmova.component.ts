import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { KorisnikService } from '../../autentikacija/korisnik.service';
import { IFilm } from '../../interfaces/IFilm';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-prijedlozi-filmova',
  templateUrl: './prijedlozi-filmova.component.html',
  styleUrls: ['./prijedlozi-filmova.component.scss']
})
export class PrijedloziFilmovaComponent implements OnInit{
  filmovi : Array<IFilm> = new Array<IFilm>();

  @ViewChild(MatTable) tablica!: MatTable<any>;

  constructor (private filmServis : FilmService, private korisnikServis : KorisnikService, private router : Router) {

  }

  async ngOnInit(): Promise<void> {
    if (!(await this.korisnikServis.jePrijavljen()) || !(await this.korisnikServis.jeAdmin())) {
      this.router.navigate(['prijava']);
    }

    await this.dohvatiFilmove();
    if(this.filmovi.length == 0)
      setTimeout(this.dohvatiFilmove.bind(this), 3000);
  }

  async dohvatiFilmove() {
    this.filmovi = await this.filmServis.dajFilmovePrijedlozi();
  }

  async odobriFilm(film : IFilm) {
    let odobren = await this.filmServis.odobriFilm(film.id, film.putanjaPoster.substring(1));

    if (odobren) {
      this.filmovi[this.filmovi.indexOf(film)].prijedlog = false;
    }
  }

  async ponistiFilm(film : IFilm) {
    let ponisten = await this.filmServis.ponistiFilm(film.id);
    
    if (ponisten) {
      this.filmovi[this.filmovi.indexOf(film)].prijedlog = false;      
      this.filmovi[this.filmovi.indexOf(film)].id = -1;      
    }  
  }
}
