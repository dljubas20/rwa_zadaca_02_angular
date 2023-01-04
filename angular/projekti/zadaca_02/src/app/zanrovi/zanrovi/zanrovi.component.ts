import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { IZanr } from '../../interfaces/IZanr';
import { ZanrService } from '../zanr.service';
import { ZanroviDodajDijalogComponent } from '../zanrovi-dodaj-dijalog/zanrovi-dodaj-dijalog.component';

@Component({
  selector: 'app-zanrovi',
  templateUrl: './zanrovi.component.html',
  styleUrls: ['./zanrovi.component.scss']
})
export class ZanroviComponent implements OnInit {
  zanrovi : Array<IZanr> = new Array<IZanr>();
  tmdbZanrovi? : Array<{id: number, name: string}>;

  oznaceni = new SelectionModel<IZanr>(true, []);
  @ViewChild(MatTable) tablica?: MatTable<any>;

  constructor(private dijalog : MatDialog, private zanrServis : ZanrService) {

  }

  async ngOnInit() : Promise<void> {
    await this.dohvatiZanrove();
    if(this.tmdbZanrovi?.length == 0)
      setTimeout(this.dohvatiZanrove.bind(this), 3000);      
  }
    
  async dohvatiZanrove() {
    this.zanrovi = await this.zanrServis.dajZanrove();
    this.tmdbZanrovi = await this.zanrServis.dajTmdbZanrove();
  }

  otvoriDijalog() : void {
    let dijalogRef = this.dijalog.open(ZanroviDodajDijalogComponent);

    dijalogRef.afterClosed().subscribe(odabraniZanrovi => {
      this.dohvatiZanrove();
      this.tablica?.renderRows();
    });
  }

  sveOznaceno() : boolean {
    if (this.oznaceni.selected.length == this.zanrovi!.length) {
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

    this.oznaceni.select(...this.zanrovi!);
  }
}
