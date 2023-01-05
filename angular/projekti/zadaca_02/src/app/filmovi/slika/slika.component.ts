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
  postaviSliku = this.formBuilder.group({
    filmovi: undefined,
    slika: new FormControl<File>(null as unknown as File)
  });
  
  filmovi : Array<IFilm> = new Array<IFilm>();
  slika : File | null = null;
  odabraniFilm = this.postaviSliku.value.filmovi
  pogresanTip = false;
  pogresnaVelicina = false;
  


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

  postavljenaSlika($event : any) {    
    if ($event.target.files.length > 0) {
      let datoteka : File = $event.target.files[0];
      let tip = datoteka.type.split("/")[1];
      let dozvoljeniTipovi = ["gif", "jpg", "png", "jpeg"];

      if (tip != undefined && dozvoljeniTipovi.includes(tip)) {
        this.pogresanTip = false;
      } else {
        this.pogresanTip = true;
      }
      
      if(datoteka.size > 500000) {
        this.pogresnaVelicina = true;
      } else {
        this.pogresnaVelicina = false;
      }

      if (!this.pogresanTip && !this.pogresnaVelicina) {
        this.slika = datoteka;
      }
    }
  }

  filmOdabran($event : any) {    
    this.odabraniFilm = $event.value;
  }

  async posaljiSliku() : Promise<void> {
    
  }
}
