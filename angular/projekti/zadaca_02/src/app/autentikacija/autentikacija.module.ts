import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { RECAPTCHA_V3_SITE_KEY, RECAPTCHA_LANGUAGE, RecaptchaV3Module } from "ng-recaptcha";

import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { environment } from '../../environments/environment';
import { ProfilComponent } from './profil/profil.component';




@NgModule({
  declarations: [
    RegistracijaComponent,
    PrijavaComponent,
    ProfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RecaptchaV3Module
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptchaSiteKey
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'hr'
    }
  ]
})
export class AutentikacijaModule { }
