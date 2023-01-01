import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  appServis?: string = "http://localhost:" + environment.appPort + "/api";

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
}
