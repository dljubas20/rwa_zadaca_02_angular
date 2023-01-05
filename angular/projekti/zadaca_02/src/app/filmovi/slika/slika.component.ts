import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from '../../autentikacija/korisnik.service';
import { IFilm } from '../../interfaces/IFilm';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-slika',
  templateUrl: './slika.component.html',
  styleUrls: ['./slika.component.scss']
})
export class SlikaComponent {
  filmovi : Array<IFilm> = new Array<IFilm>();

  postaviSliku = this.formBuilder.group({
    filmovi: '---',
    slika: new FormControl()
  });

  constructor(private formBuilder : FormBuilder,
    private korisnikServis : KorisnikService,
    private router : Router,
    private filmServis : FilmService
  ) {

  }
  
  async ngOnInit(): Promise<void> {
    if (!(await this.korisnikServis.jePrijavljen())) {
      this.router.navigate(['prijava']);
    }
    
    this.filmovi = await this.filmServis.dajFilmovePregled();
  }

  async posaljiSliku() : Promise<void> {
    console.log(this.postaviSliku.value);
    
  }
}
