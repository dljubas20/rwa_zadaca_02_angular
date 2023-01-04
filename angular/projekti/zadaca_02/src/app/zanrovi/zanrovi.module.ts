import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


import { ZanroviComponent } from './zanrovi/zanrovi.component';
import { ZanroviDijalogComponent } from './zanrovi-dijalog/zanrovi-dijalog.component';



@NgModule({
  declarations: [
    ZanroviComponent,
    ZanroviDijalogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ZanroviModule { }
