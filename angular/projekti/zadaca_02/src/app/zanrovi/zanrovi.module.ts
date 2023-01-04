import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


import { ZanroviComponent } from './zanrovi/zanrovi.component';
import { ZanroviDodajDijalogComponent } from './zanrovi-dodaj-dijalog/zanrovi-dodaj-dijalog.component';



@NgModule({
  declarations: [
    ZanroviComponent,
    ZanroviDodajDijalogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ZanroviModule { }
