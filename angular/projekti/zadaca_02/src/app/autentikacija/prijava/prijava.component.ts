import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AppComponent } from '../../app.component';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent {
  private appServis? : string = "http://localhost:" + environment.appPort + "/api";
  netocniPodaci : boolean = false;
  prijavaForma = this.formBuilder.group({
    korime: '',
    lozinka: ''
  });
  
  constructor(private formBuilder: FormBuilder, private router : Router, private korisnikServis : KorisnikService) {
    
  }

  async onSubmit() : Promise<void> {
    let zaglavlje : Headers = new Headers();

    zaglavlje.set("Content-Type", "application/json");

    let tijelo = JSON.stringify(this.prijavaForma.value);
    console.log(tijelo);
    
    let odgovor = await fetch(this.appServis + "/prijava", {
      method: "POST",
      headers: zaglavlje,
      body: tijelo
    });

    let rezultat = JSON.parse(await odgovor.text()).prijava;
    
    if (rezultat == "OK") {
      AppComponent.korisnik.admin = await this.korisnikServis.dajStatusKorisnika();
      AppComponent.korisnik.prijavljen = true;
      this.router.navigate(['/']);
    }
    else {
      this.netocniPodaci = true;
    }
  }
}
