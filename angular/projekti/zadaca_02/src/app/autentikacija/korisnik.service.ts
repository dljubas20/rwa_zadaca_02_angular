import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IKorisnik } from '../interfaces/IKorisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  private appServis?: string = "http://localhost:" + environment.appPort + "/api";
  private restServis?: string = "http://localhost:" + environment.restPort + "/api";

  constructor() {

  }

  async dajJWT() : Promise<string> {
    let odgovor = await (await fetch(this.appServis + "/getJWT")).text();
    let rezultat = JSON.parse(odgovor);
    if ('ok' in rezultat) {
      return rezultat.ok;
    }
    else {
      return '';
    }
  }

  async dajStatusKorisnika() : Promise<boolean> {
    let odgovor = await (await fetch(this.appServis + "/getStatusKorisnika")).text();
    let rezultat = JSON.parse(odgovor);
    if ('admin' in rezultat) {
      return rezultat.admin;
    }
    else {
      return false;
    }
  }

  async dajKorisnika(id : number) : Promise<IKorisnik> {
    let zaglavlje : Headers = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let token = await fetch( this.appServis + "/generirajToken");

    zaglavlje.set("Authorization", await token.text());

    let korisnik = JSON.parse(await (await fetch(this.restServis + "/korisnici/id/" + id, {
      method: "GET",
      headers: zaglavlje
    })).text()) as IKorisnik;

    return korisnik;
  }
}
