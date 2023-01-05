import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IZanr } from '../../interfaces/IZanr';

@Component({
  selector: 'app-zanrovi-preskoceni-dijalog',
  templateUrl: './zanrovi-preskoceni-dijalog.component.html',
  styleUrls: ['./zanrovi-preskoceni-dijalog.component.scss']
})
export class ZanroviPreskoceniDijalogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public preskoceni: Array<IZanr>) {

  }
}
