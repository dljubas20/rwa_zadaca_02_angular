import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ZanrService } from '../zanr.service';
import { IZanr } from '../../interfaces/IZanr';

@Component({
  selector: 'app-zanrovi-dijalog',
  templateUrl: './zanrovi-dijalog.component.html',
  styleUrls: ['./zanrovi-dijalog.component.scss']
})
export class ZanroviDijalogComponent {
  oznaceni = new SelectionModel<{id: number, name: string}>(true, []);

  constructor(
    public dijalogRef: MatDialogRef<ZanroviDijalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<{id: number, name: string}>,
    private zanrServis : ZanrService
  ) {

  }

  sveOznaceno() : boolean {
    if (this.oznaceni.selected.length == this.data.length) {
      return true;
    } else {
      return false;
    }
  }

  oznaciSve() : void {
    if (this.sveOznaceno()) {
      this.oznaceni.clear();
      return;
    }

    this.oznaceni.select(...this.data);
  }

  async spremi() : Promise<void> {
    let posaljiZanrove = new Array<IZanr>();
    
    for (let zanr of this.data) {
      if (this.oznaceni.isSelected(zanr)) {
        posaljiZanrove.push({id: zanr.id, naziv: zanr.name});
      }
    }
    
    let ubaceni = await this.zanrServis.spremiZanrove(posaljiZanrove);

    if (ubaceni) {
      this.dijalogRef.close();
    }
  }

  zatvori() : void {
    this.dijalogRef.close();
  }
}
