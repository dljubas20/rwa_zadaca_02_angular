import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent {
  appServis? : string = "http://localhost:" + environment.appPort + "/api";
  netocniPodaci : boolean = false;

  constructor(private formBuilder: FormBuilder, private router : Router) {
    
  }

  prijavaForma = this.formBuilder.group({
    korime: '',
    lozinka: ''
  });
  
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
      this.router.navigate(['/']);
    }
    else {
      this.netocniPodaci = true;
    }
  }
}
