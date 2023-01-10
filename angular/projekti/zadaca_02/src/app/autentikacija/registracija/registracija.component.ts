import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ReCaptchaV3Service } from 'ng-recaptcha';

import { environment } from '../../../environments/environment';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent {
  appServis?: string = "http://localhost:" + environment.appPort + "/api";
  greske?: {
    korime: string,
    email: string
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private recaptchaV3Servis : ReCaptchaV3Service,
    private korisnikServis : KorisnikService,
  ) {
    
  }

  regForma = this.formBuilder.group({
    ime: '',
    prezime: '',
    lozinka: '',
    email: '',
    korime: ''
  });
  
  async onSubmit() : Promise<void> {
    let zaglavlje : Headers = new Headers();

    zaglavlje.set("Content-Type", "application/json");

    let tijelo = JSON.stringify(this.regForma.value);
    
    if (this.regForma.value.korime == '' || this.regForma.value.lozinka == '' || this.regForma.value.email == '') {
      return;
    }

    this.recaptchaV3Servis.execute('registracija').subscribe((token: string) => {
      this.korisnikServis.provjeriRecaptchu(token).then((uspjeh) => {
        if (uspjeh) {
          fetch(this.appServis + "/registracija", {
            method: "POST",
            headers: zaglavlje,
            body: tijelo
          }).then((odgovor) => {
            odgovor.text().then((rezultat) => {
              if ('registracija' in JSON.parse(rezultat) && JSON.parse(rezultat).registracija == "OK") {
                this.router.navigate(['/prijava']);
              } else {
                  this.greske = JSON.parse(rezultat);
              }
            });
          });
        }
      });
    });
  }
  
}
