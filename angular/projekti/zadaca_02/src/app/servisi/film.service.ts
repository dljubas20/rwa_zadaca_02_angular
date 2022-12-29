import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IFilm } from './IFilm';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  restServis?: string = "http://localhost:" + environment.restPort + "/api";
  filmovi = new Array<IFilm>();

  /* constructor() {
    let filmovi = localStorage.getItem("filmovi");
    if (filmovi == null) {
      this.osvjeziFilmove(1, "");
    } else {
      this.filmoviTMDB = JSON.parse(filmovi) as FilmoviTmdbI;
    }
  }

  async osvjeziFilmove(stranica: number, kljucnaRijec: string) {
    let parametri = "?stranica=" + stranica + "&kljucnaRijec=" + kljucnaRijec;
    let o = (await fetch(this.restServis + "tmdb/filmovi" + parametri)) as Response;
    if (o.status == 200) {
      let r = JSON.parse(await o.text()) as FilmoviTmdbI;
      console.log(r);
      this.filmoviTMDB = r;
      localStorage.setItem("filmovi",JSON.stringify(r));
    }
  } */

  async dajFilmove(): Promise<Array<IFilm>> {
    if (this.filmovi.length == 0) {  
        this.filmovi = new Array<IFilm>();
        let zaglavlje : Headers = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let token = await fetch("http://localhost:12112/generirajToken");
        zaglavlje.set("Authorization", await token.text());
        console.log(zaglavlje.get("Authorization"));
        let o : Response = (await fetch(this.restServis + "/filmovi?stranica=1&brojFilmova=10", {
          method: 'GET',
          headers: zaglavlje
        })) as Response;
        
        if (o.status == 200) {
            this.filmovi = JSON.parse(await o.text()) as Array<IFilm>;
            console.log(this.filmovi);
        }
        
        return this.filmovi;
      
    } else {
      return this.filmovi;
    }
  }

  /* async dajFilm(naziv: string): IFilm | null {
    if (this.filmoviTMDB == undefined)
      return null;
    if (this.filmoviTMDB.results.length == 0)
      return null;
    for (let film of this.filmoviTMDB.results) {
      if (film.original_title == naziv) {
        return film;
      }
    }
    return null;
  } */
}