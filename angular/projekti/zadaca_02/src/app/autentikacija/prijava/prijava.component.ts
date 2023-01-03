import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
  
  constructor(private formBuilder: FormBuilder, private router : Router, private korisnikServis : KorisnikService) {
    
  }

  async onSubmit() : Promise<void> {
    let tijelo = JSON.stringify(this.prijavaForma.value);

    if (await this.korisnikServis.prijava(tijelo)) {
      this.router.navigate(['/']);
    }
    else {
      this.netocniPodaci = true;
    }
  }
}
