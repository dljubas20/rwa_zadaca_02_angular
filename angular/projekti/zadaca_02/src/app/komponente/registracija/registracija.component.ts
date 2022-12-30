import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent {
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
    
    console.log(this.regForma.value);
  }
  
}
