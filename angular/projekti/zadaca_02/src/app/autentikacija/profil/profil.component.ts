import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AppComponent } from '../../app.component';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit{
  profilForma = this.formBuilder.group({
    ime: '',
    prezime: '',
    lozinka: '',
  });

  uspjeh : null | boolean = null;
  korime? : string = AppComponent.korisnik.korime;
  email? : string = AppComponent.korisnik.email;

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private korisnikServis : KorisnikService,
    private recaptchaV3Servis : ReCaptchaV3Service,
  ) {

  }

  async ngOnInit(): Promise<void> {
    if (!(await this.korisnikServis.jePrijavljen())) {
      this.router.navigate(['prijava']);
    }

    this.korime = AppComponent.korisnik.korime;
    this.email = AppComponent.korisnik.email;
  }

  onSubmit() : void {
    let tijelo = JSON.stringify(this.profilForma.value);

    this.recaptchaV3Servis.execute('profil').subscribe((token: string) => {
      this.korisnikServis.provjeriRecaptchu(token).then((uspjeh) => {
        if (uspjeh) {
          this.korisnikServis.azurirajKorisnika(tijelo).then((azuriran) => {
            if (azuriran) {
              this.uspjeh = true;
            } else {
              this.uspjeh = false;
            }
          });
        }
      });
    });
  }
}
