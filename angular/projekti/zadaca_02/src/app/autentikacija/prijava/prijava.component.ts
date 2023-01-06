import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ReCaptchaV3Service } from 'ng-recaptcha';

import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent {
  netocniPodaci : boolean = false;
  prijavaForma = this.formBuilder.group({
    korime: '',
    lozinka: ''
  });
  
  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private korisnikServis : KorisnikService,
    private recaptchaV3Servis : ReCaptchaV3Service,
  ) {
    
  }

  async onSubmit() : Promise<void> {
    let tijelo = JSON.stringify(this.prijavaForma.value);

    this.recaptchaV3Servis.execute('prijava').subscribe((token: string) => {
      this.korisnikServis.provjeriRecaptchu(token).then((uspjeh) => {
        if (uspjeh) {
          this.korisnikServis.prijava(tijelo).then((prijavljen) => {
            if (prijavljen) {
              this.router.navigate(['/']);
            } else {
              this.netocniPodaci = true;
            }
          });
        }
      });
    });
  }
}
