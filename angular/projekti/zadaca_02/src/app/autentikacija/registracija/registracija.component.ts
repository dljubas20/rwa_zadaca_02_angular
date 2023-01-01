import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

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

  constructor(private formBuilder: FormBuilder, private router: Router) {
    
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
    console.log(tijelo);
    
    if (this.regForma.value.korime == '' || this.regForma.value.lozinka == '' || this.regForma.value.email == '') {
      return;
    }
    
    let odgovor = await fetch(this.appServis + "/registracija", {
      method: "POST",
      headers: zaglavlje,
      body: tijelo
    });

    let rezultat = JSON.parse(await odgovor.text());

    if ('registracija' in rezultat) {
      if (rezultat.registracija == "OK") {
        this.router.navigate(['/prijava']);
      }
    } else {
      this.greske = rezultat;
    }
  }
  
}
