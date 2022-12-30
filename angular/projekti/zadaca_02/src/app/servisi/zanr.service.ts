import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IZanr } from './IZanr';

@Injectable({
  providedIn: 'root'
})
export class ZanrService {
  restServis?: string = "http://localhost:" + environment.restPort + "/api";
  zanrovi = new Array<IZanr>();

  async dajZanrove(): Promise<Array<IZanr>> {
    if (this.zanrovi.length == 0) {  
        this.zanrovi = new Array<IZanr>();
        let zaglavlje : Headers = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let token = await fetch("http://localhost:12112/api/generirajToken");
        zaglavlje.set("Authorization", await token.text());

        let o : Response = (await fetch(this.restServis + "/zanr", {
          method: 'GET',
          headers: zaglavlje
        })) as Response;
        
        if (o.status == 200) {
            this.zanrovi = JSON.parse(await o.text()) as Array<IZanr>;
        }
        
        return this.zanrovi;
      
    } else {
      return this.zanrovi;
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