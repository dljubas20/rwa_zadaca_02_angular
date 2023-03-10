import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { IKorisnik } from '../interfaces/IKorisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  private appServis?: string = "http://localhost:" + environment.appPort + "/api";
  private restServis?: string = "http://localhost:" + environment.restPort + "/api";

  constructor(private router : Router) {

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

  async jePrijavljen() : Promise<boolean> {
    if (await this.dajJWT() != '') {
      return true;
    } else {
      return false;
    }
  }

  async jeAdmin() : Promise<boolean> {
    let korisnik = await this.dajSesijaKorisnik();
    if (typeof korisnik != 'boolean' && korisnik.admin) {
      return true;
    } else {
      return false;
    }
  }

  async dajSesijaKorisnik() : Promise<{
    ime : string,
    prezime : string,
    id : number,
    korime : string,
    email : string,
    admin :boolean
  } | boolean> {
    let odgovor = await fetch(this.appServis + "/getSesijaKorisnik");
    if (odgovor.status == 200) {
      let rezultat = JSON.parse(await odgovor.text()) as {
        ime : string,
        prezime : string,
        id : number,
        korime : string,
        email : string,
        admin : boolean
      };
      return rezultat;
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

  async prijava(tijelo : string) : Promise<boolean> {
    let zaglavlje : Headers = new Headers();

    zaglavlje.set("Content-Type", "application/json");
    
    let odgovor = await fetch(this.appServis + "/prijava", {
      method: "POST",
      headers: zaglavlje,
      body: tijelo
    });

    let rezultat = JSON.parse(await odgovor.text()).prijava;
    
    if (rezultat == "OK") {
      let korisnik = await this.dajSesijaKorisnik();
      if (!(typeof korisnik == 'boolean')) {
        AppComponent.korisnik.ime = korisnik.ime;
        AppComponent.korisnik.prezime = korisnik.prezime;
        AppComponent.korisnik.id = korisnik.id;
        AppComponent.korisnik.korime = korisnik.korime;
        AppComponent.korisnik.email = korisnik.email;
        AppComponent.korisnik.admin = korisnik.admin;
        AppComponent.korisnik.prijavljen = true;
        
        return true;
      }
    }
    return false;
  }

  async odjava() : Promise<void> {
    let odgovor = await fetch(this.appServis + "/odjava");

    if (odgovor.status == 200) {
      if (JSON.parse(await odgovor.text()).odjava == 'OK') {
        AppComponent.korisnik.ime = '';
        AppComponent.korisnik.prezime = '';
        AppComponent.korisnik.prijavljen = false;
        AppComponent.korisnik.admin = false;
        this.router.navigate(['prijava']);
        return;
      }
    }
    else {
      this.router.navigate(['']);
    }
  }

  async dajSlikeKorisnici(idFilma : number) : Promise<Array<{
    korime : string,
    naziviSlika : Array<string>
  }> | boolean> {
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let jwt = await this.dajJWT();
    
    zaglavlje.set("Authorization", jwt);

    let odgovor = await fetch(this.appServis + "/filmoviSlikeKorisnici/" + idFilma, {
      method: "GET",
      headers: zaglavlje
    });

    if (odgovor.status == 200) {
      return JSON.parse(await odgovor.text()) as Array<{
        korime : string,
        naziviSlika : Array<string>
      }>;
    }

    return false;
  }

  async provjeriRecaptchu(token : string) : Promise<boolean> {
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let odgovor = await fetch(this.appServis + "/provjeriRecaptchu", {
      method: "POST",
      headers: zaglavlje,
      body: JSON.stringify({token: token})
    });

    return JSON.parse(await odgovor.text()).uspjeh;
  }

  async azurirajKorisnika(tijelo : string) : Promise<boolean> {
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let jwt = await this.dajJWT();
    
    zaglavlje.set("Authorization", jwt);

    let odgovor = await fetch(this.appServis + "/profil", {
      method: "POST",
      headers: zaglavlje,
      body: tijelo
    });

    if (JSON.parse(await odgovor.text()).azuriran) {
      let korisnik = JSON.parse(tijelo);
      console.log(korisnik);
      
      if (korisnik.ime != '') {
        AppComponent.korisnik.ime = korisnik.ime;
      }
      
      if (korisnik.prezime != '') {
        AppComponent.korisnik.prezime = korisnik.prezime;
      }

      return true;
    }

    return false;
  }
}
