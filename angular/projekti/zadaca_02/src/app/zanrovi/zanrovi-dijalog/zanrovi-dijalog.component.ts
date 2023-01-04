import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ZanrService } from '../zanr.service';
import { IZanr } from '../../interfaces/IZanr';

@Component({
  selector: 'app-zanrovi-dijalog',
  templateUrl: './zanrovi-dijalog.component.html',
  styleUrls: ['./zanrovi-dijalog.component.scss']
})
export class ZanroviDijalogComponent implements OnInit {
  oznaceni = new SelectionModel<{id: number, name: string}>(true, []);
  spremiZanrove = new Array<IZanr>();
  tmdbZanrovi = new Array<{id: number, name: string}>();

  constructor(
    public dijalogRef: MatDialogRef<ZanroviDijalogComponent>,
    private zanrServis : ZanrService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.tmdbZanrovi = await this.zanrServis.dajTmdbZanrove();
  }

  sveOznaceno() : boolean {
    if (this.oznaceni.selected.length == this.tmdbZanrovi.length) {
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

    this.oznaceni.select(...this.tmdbZanrovi);
  }

  async spremi() : Promise<void> {
    this.spremiZanrove = new Array<IZanr>();
    
    for (let zanr of this.tmdbZanrovi) {
      if (this.oznaceni.isSelected(zanr)) {
        this.spremiZanrove.push({id: zanr.id, naziv: zanr.name} as IZanr);
      }
    }
    
    let ubaceno = await this.zanrServis.spremiZanrove(this.spremiZanrove);
    
    if (ubaceno) {
      this.dijalogRef.close(this.spremiZanrove);
    }
  }

  zatvori() : void {
    this.dijalogRef.close();
  }
}
