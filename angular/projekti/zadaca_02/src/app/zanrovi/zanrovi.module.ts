import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';



import { ZanroviComponent } from './zanrovi/zanrovi.component';
import { ZanroviDodajDijalogComponent } from './zanrovi-dodaj-dijalog/zanrovi-dodaj-dijalog.component';
import { ZanroviAzurirajDijalogComponent } from './zanrovi-azuriraj-dijalog/zanrovi-azuriraj-dijalog.component';
import { ZanroviPreskoceniDijalogComponent } from './zanrovi-preskoceni-dijalog/zanrovi-preskoceni-dijalog.component';



@NgModule({
  declarations: [
    ZanroviComponent,
    ZanroviDodajDijalogComponent,
    ZanroviAzurirajDijalogComponent,
    ZanroviPreskoceniDijalogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ZanroviModule { }
