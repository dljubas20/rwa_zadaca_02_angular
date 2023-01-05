import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from '../../autentikacija/korisnik.service';
import { IFilm } from '../../interfaces/IFilm';
import { IKorisnik } from '../../interfaces/IKorisnik';
import { IZanr } from '../../interfaces/IZanr';
import { FilmService } from '../film.service';
import { ZanrService } from '../../zanrovi/zanr.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit{
  idFilma? : number;
  film? : IFilm;
  zanroviFilma? : Array<IZanr>;
  korisnik? : IKorisnik;
  putanjaPoster? : string;

  constructor(
    private korisnikServis : KorisnikService,
    private zanrServis : ZanrService,
    private router : Router,
    private route : ActivatedRoute,
    private filmServis : FilmService
  ) {

  }
  
  async ngOnInit(): Promise<void> {
    if (!(await this.korisnikServis.jePrijavljen())) {
      this.router.navigate(['prijava']);
    }

    this.film = history.state;
    this.idFilma = this.route.snapshot.paramMap.get('id') as unknown as number;

    if (this.film == null || this.film == undefined || !('imdb_id' in this.film)) {
      this.film = await this.filmServis.dajFilm(this.idFilma);
    }

    this.korisnik = await this.korisnikServis.dajKorisnika(this.film?.korisnik_id as number);
    console.log(this.korisnik);
    
    this.zanroviFilma = await this.zanrServis.dajZanroveFilma(this.film?.id as number);
  }
}
