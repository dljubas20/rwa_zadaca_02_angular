import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IFilm } from './IFilm';
import { IZanr } from './IZanr';
import { ZanrService } from './zanr.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  restServis?: string = "http://localhost:" + environment.restPort + "/api";
  zanr_filmovi = new Array<{
    zanr: IZanr,
    filmovi: Array<IFilm>
  }>();

  constructor(private zanrServis : ZanrService) {

  }

  async dajFilmove(): Promise<Array<{
    zanr: IZanr,
    filmovi: Array<IFilm>
  }>> {
    if (this.zanr_filmovi.length == 0) {  
        this.zanr_filmovi = new Array<{
          zanr: IZanr,
          filmovi: Array<IFilm>
        }>();

        let zaglavlje : Headers = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let token = await fetch("http://localhost:12112/generirajToken");
        zaglavlje.set("Authorization", await token.text());
        
        let zanrovi : Array<IZanr> = await this.zanrServis.dajZanrove();

        for (let zanr of zanrovi) {
          let o : Response = (await fetch(this.restServis + "/filmovi?stranica=1&brojFilmova=10&zanr=" + zanr.id, {
            method: 'GET',
            headers: zaglavlje
          })) as Response;
          if (o.status == 200) {
              this.zanr_filmovi.push({
                zanr: zanr,
                filmovi: JSON.parse(await o.text()) as Array<IFilm>
              });
              console.log(this.zanr_filmovi);
          }
        }

        
        
        return this.zanr_filmovi;
      
    } else {
      return this.zanr_filmovi;
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