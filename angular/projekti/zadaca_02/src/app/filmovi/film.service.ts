import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { IFilm } from '../interfaces/IFilm';
import { ITmdbFilm } from '../interfaces/ITmdbFilm';
import { IZanr } from '../interfaces/IZanr';
import { ZanrService } from '../zanrovi/zanr.service';

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
  prijedlozi_filmovi = new Array<IFilm>();
  svi_filmovi_id = new Array<{tmdb_id: number}>();

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
            
            if (!(rezultat instanceof Array<IFilm>)) {
              let polje = new Array<IFilm>();
              
              polje.push(rezultat);
              
              rezultat = polje;
            }
            console.log(rezultat);

            this.pocetna_filmovi.push({
              zanr: zanr,
              filmovi: (rezultat.length != 0) ? [
                rezultat[this.dajNasumceBroj(0, rezultat.length)],
                rezultat[this.dajNasumceBroj(0, rezultat.length)]
              ] : []
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

    if ((this.pregled_filmovi.constructor === ({}).constructor)) {
      let poljeFilmova = new Array<IFilm>();
      poljeFilmova.push(this.pregled_filmovi as unknown as IFilm);
      
      return poljeFilmova;
    }

    return this.pregled_filmovi;
  }

  async dajSveId() : Promise<Array<number>> {
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());
  
    let odgovor : Response = (await fetch(this.restServis + "/filmovi?stranica=1&dajSveId=1", {
      method: 'GET',
      headers: zaglavlje,
    })) as Response;

    if (odgovor.status == 200) {
      let rezultat = JSON.parse(await odgovor.text()) as Array<{tmdb_id: number}>;
      if (!(rezultat instanceof Array<{tmdb_id: number}>)) {
        this.svi_filmovi_id.push(rezultat);
      }
      else {
        this.svi_filmovi_id = rezultat;
      }
    }

    return this.svi_filmovi_id.map(o_id => o_id.tmdb_id);
  }

  async dajFilmovePrijedlozi() : Promise<Array<IFilm>> {
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());
  
    let odgovor : Response = (await fetch(this.restServis + "/filmovi?stranica=1&dajPrijedloge=1", {
      method: 'GET',
      headers: zaglavlje,
    })) as Response;

    if (odgovor.status == 200) {
      let rezultat = JSON.parse(await odgovor.text()) as Array<IFilm>;
      if (!(rezultat instanceof Array<IFilm>)) {
        this.prijedlozi_filmovi.push(rezultat);
      }
      else {
        this.prijedlozi_filmovi = rezultat;
      }
    }

    return this.prijedlozi_filmovi;
  }

  async odobriFilm(idFilma : number, putanjaPoster : string) : Promise<boolean> {
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());
  
    let odgovor : Response = (await fetch(this.restServis + "/filmovi/" + idFilma, {
      method: 'PUT',
      headers: zaglavlje,
      body: JSON.stringify({odobriFilm: true})
    })) as Response;

    if (odgovor.status == 200) {
      let z : Headers = new Headers();
      z.set("Content-Type", "application/json");
      let token = await fetch( this.appServis + "/getJWT");

      z.set("Authorization", JSON.parse(await token.text()).ok);

      let o : Response = await fetch(this.appServis + "/preuzmiPoster/" + putanjaPoster, {
        method: "GET",
        headers: z
      });

      if (o.status == 200) {
        return true;
      }

    }

    return false;
  }

  async ponistiFilm(idFilma : number) : Promise<boolean> {
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());
  
    let odgovor : Response = (await fetch(this.restServis + "/filmovi/" + idFilma, {
      method: 'DELETE',
      headers: zaglavlje
    })) as Response;

    if (odgovor.status == 200) {
      return true;
    }

    return false;
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

  async dajTmdbFilmove(kljucnaRijec : string, stranica : number) : Promise<{
    page: number,
    results: Array<ITmdbFilm>,
    total_pages: number,
    total_results: number
  }> {
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());

    let odgovor : Response = (await fetch(this.restServis + "/tmdb/filmovi?stranica=" + stranica + "&kljucnaRijec=" + kljucnaRijec, {
      method: 'GET',
      headers: zaglavlje
    })) as Response;

    return JSON.parse(await odgovor.text()) as {
      page: number,
      results: Array<ITmdbFilm>,
      total_pages: number,
      total_results: number
    };
  }

  private async dajTmdbFilm(filmId : number) : Promise<ITmdbFilm> {
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());

    let odgovor : Response = (await fetch(this.restServis + "/tmdb/filmovi/" + filmId, {
      method: 'GET',
      headers: zaglavlje
    })) as Response;

    return JSON.parse(await odgovor.text()) as ITmdbFilm;
  }

  async dodajFilm(filmId : number) : Promise<boolean> {
    let film = await this.dajTmdbFilm(filmId) as ITmdbFilm;

    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());

    let odgovor : Response = (await fetch(this.restServis + "/filmovi", {
      method: 'POST',
      headers: zaglavlje,
      body: JSON.stringify({film: film, korisnik_id: AppComponent.korisnik.id})
    })) as Response;

    return JSON.parse(await odgovor.text()) as boolean;
  }
  
  private dajNasumceBroj(min : number, max : number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }
}