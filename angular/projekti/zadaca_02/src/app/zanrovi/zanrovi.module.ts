import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog'; 

import { ZanroviComponent } from './zanrovi/zanrovi.component';
import { ZanroviDijalogComponent } from './zanrovi-dijalog/zanrovi-dijalog.component';



@NgModule({
  declarations: [
    ZanroviComponent,
    ZanroviDijalogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class ZanroviModule { }
