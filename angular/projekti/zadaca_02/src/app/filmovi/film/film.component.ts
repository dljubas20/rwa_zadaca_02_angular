import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KorisnikService } from '../../autentikacija/korisnik.service';
import { IFilm } from '../../interfaces/IFilm';
import { IKorisnik } from '../../interfaces/IKorisnik';
import { IZanr } from '../../interfaces/IZanr';
import { FilmService } from '../film.service';
import { ZanrService } from '../zanr.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit{
  idFilma? : number;
  film? : IFilm;
  zanrFilma? : IZanr;
  korisnik? : IKorisnik;
  putanjaPoster? : string;

  constructor(
    private korisnikServis : KorisnikService,
    private zanrServis : ZanrService,
    private route : ActivatedRoute,
    private filmServis : FilmService
  ) {

  }
  
  async ngOnInit(): Promise<void> {
    this.film = history.state;
    this.idFilma = this.route.snapshot.paramMap.get('id') as unknown as number;

    if (this.film == null || this.film == undefined || !('imdb_id' in this.film)) {
      this.film = await this.filmServis.dajFilm(this.idFilma);
    }

    this.korisnik = await this.korisnikServis.dajKorisnika(this.film?.korisnik_id as number);
    this.zanrFilma = await this.zanrServis.dajZanrFilma(this.film?.id as number);
  }
}
