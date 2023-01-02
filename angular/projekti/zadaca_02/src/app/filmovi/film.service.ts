import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IFilm } from '../interfaces/IFilm';
import { IZanr } from '../interfaces/IZanr';
import { ZanrService } from './zanr.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  restServis?: string = "http://localhost:" + environment.restPort + "/api";
  appServis?: string = "http://localhost:" + environment.appPort + "/api";
  pocetna_filmovi = new Array<{
    zanr: IZanr,
    filmovi: Array<IFilm>
  }>();

  pregled_filmovi = new Array<IFilm>();

  constructor(private zanrServis : ZanrService) {

  }

  async dajFilmovePocetna() : Promise<Array<{
    zanr: IZanr,
    filmovi: Array<IFilm>
  }>> {
    if (this.pocetna_filmovi.length == 0) {  
        this.pocetna_filmovi = new Array<{
          zanr: IZanr,
          filmovi: Array<IFilm>
        }>();

        let zaglavlje : Headers = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let token = await fetch( this.appServis + "/generirajToken");

        zaglavlje.set("Authorization", await token.text());
        
        let zanrovi : Array<IZanr> = await this.zanrServis.dajZanrove();

        for (let zanr of zanrovi) {
          let odgovor : Response = (await fetch(this.restServis + "/filmovi?stranica=1&brojFilmova=10&zanr=" + zanr.id, {
            method: 'GET',
            headers: zaglavlje
          })) as Response;

          if (odgovor.status == 200) {
            let rezultat = JSON.parse(await odgovor.text()) as Array<IFilm>;

            this.pocetna_filmovi.push({
              zanr: zanr,
              filmovi: [
                rezultat[this.dajNasumceBroj(0, rezultat.length)],
                rezultat[this.dajNasumceBroj(0, rezultat.length)]
              ]
            });
          }
        }
        return this.pocetna_filmovi;
      
    } else {
      return this.pocetna_filmovi;
    }
  }

  async dajFilmovePregled() : Promise<Array<IFilm>> {
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());
  
    let odgovor : Response = (await fetch(this.restServis + "/filmovi?stranica=1&brojFilmova=10", {
      method: 'GET',
      headers: zaglavlje
    })) as Response;

    if (odgovor.status == 200) {
      this.pregled_filmovi = JSON.parse(await odgovor.text()) as Array<IFilm>;
    }

    return this.pregled_filmovi;
  }

  async dajFilm(idFilma : number) : Promise<IFilm> {
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());
  
    let odgovor : Response = (await fetch(this.restServis + "/filmovi/" + idFilma, {
      method: 'GET',
      headers: zaglavlje
    })) as Response;

    return JSON.parse(await odgovor.text()) as IFilm;
  }

  private dajNasumceBroj(min : number, max : number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }
}