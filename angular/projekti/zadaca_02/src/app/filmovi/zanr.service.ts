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
}