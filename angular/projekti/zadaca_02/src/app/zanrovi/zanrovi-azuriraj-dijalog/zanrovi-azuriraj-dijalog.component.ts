import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IZanr } from '../../interfaces/IZanr';
import { ZanrService } from '../zanr.service';

@Component({
  selector: 'app-zanrovi-azuriraj-dijalog',
  templateUrl: './zanrovi-azuriraj-dijalog.component.html',
  styleUrls: ['./zanrovi-azuriraj-dijalog.component.scss']
})
export class ZanroviAzurirajDijalogComponent {
  azurirajZanrForma = this.formBuilder.group({
    naziv: ''
  });

  constructor(private formBuilder : FormBuilder,
    private zanrServis: ZanrService,
    @Inject(MAT_DIALOG_DATA) public zanr: IZanr,
    public dijalogRef: MatDialogRef<ZanroviAzurirajDijalogComponent>,
  ) {
    
  }

  async azuriraj() : Promise<void> {
    if (this.azurirajZanrForma.value.naziv != "") {
      if (await this.zanrServis.azurirajZanr({
        id: this.zanr.id,
        naziv: this.azurirajZanrForma.value.naziv!,
        opis: this.zanr.opis
      } as IZanr)) {
        this.dijalogRef.close({id: this.zanr.id, naziv: this.azurirajZanrForma.value.naziv});
      }
      else {
        this.dijalogRef.close(false);
      }
    } else {
      this.dijalogRef.close(false);
    }
  }
}
