import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-zanrovi-dijalog',
  templateUrl: './zanrovi-dijalog.component.html',
  styleUrls: ['./zanrovi-dijalog.component.scss']
})
export class ZanroviDijalogComponent {
  constructor(
    public dijalogRef: MatDialogRef<ZanroviDijalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<{id: number, name: string}>
  ) {

  }

  onNoClick() : void {
    this.dijalogRef.close();
  }
}
