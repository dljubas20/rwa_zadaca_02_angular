import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent {
  appServis?: string = "http://localhost:" + environment.appPort + "/api";

  constructor(private formBuilder: FormBuilder) {
    
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
    
    let odgovor = await fetch(this.appServis + "/registracija", {
      method: "POST",
      headers: zaglavlje,
      body: tijelo
    });

    let rezultat = JSON.parse(await odgovor.text()).registracija;
    
    if (rezultat == "OK") {
      location.replace("http://localhost:" + environment.appPort + "/prijava");
    }
  }
  
}
