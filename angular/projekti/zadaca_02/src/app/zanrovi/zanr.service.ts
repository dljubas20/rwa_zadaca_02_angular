import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IZanr } from '../interfaces/IZanr'; 

@Injectable({
  providedIn: 'root'
})
export class ZanrService {
  appServis?: string = "http://localhost:" + environment.appPort + "/api";
  restServis?: string = "http://localhost:" + environment.restPort + "/api";
  zanrovi = new Array<IZanr>();
  tmdbZanrovi = new Array<IZanr>();

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

  async dajTmdbZanrove() : Promise<Array<IZanr>> {
    this.tmdbZanrovi = new Array<IZanr>();
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch("http://localhost:12112/api/generirajToken");
    zaglavlje.set("Authorization", await token.text());

    let o : Response = (await fetch(this.restServis + "/tmdb/zanr", {
      method: 'GET',
      headers: zaglavlje
    })) as Response;

    if (o.status == 200) {
      this.tmdbZanrovi = JSON.parse(await o.text()).genres as Array<IZanr>;
    }

    return this.tmdbZanrovi;
  }

  async dajZanroveFilma(film_id : number) : Promise<Array<IZanr>> {
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());
    let zanrovi : Array<IZanr> = new Array<IZanr>();
    zanrovi = JSON.parse(await (await fetch(this.restServis + "/zanr/film/" + film_id, {
      method: "GET",
      headers: zaglavlje
    })).text()) as Array<IZanr>;
    
    if ((zanrovi.constructor === ({}).constructor)) {
      let poljeZanrova = new Array<IZanr>();
      poljeZanrova.push(zanrovi as unknown as IZanr);
      
      return poljeZanrova;
    }
    
    return zanrovi;
  }

  async spremiZanrove(zanrovi: Array<IZanr>) : Promise<boolean>{
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());

    let odgovor = await fetch(this.restServis + "/zanr", {
      method: "POST",
      headers: zaglavlje,
      body: JSON.stringify(zanrovi)
    });
    
    return (await odgovor.text()) as unknown as boolean;
  }
}