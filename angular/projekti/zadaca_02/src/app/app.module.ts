import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { PocetnaComponent } from './pocetna/pocetna.component';

const routes:Routes = [
  /* {path: "pocetna", component:PopisFilmovaComponent},
  {path: "detalji", component:DetaljiFilmaComponent},
  {path: "detalji/:naziv", component:DetaljiFilmaComponent}, */
  {path: "", redirectTo:"popis", pathMatch:"full"}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigacijaComponent,
    PocetnaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
