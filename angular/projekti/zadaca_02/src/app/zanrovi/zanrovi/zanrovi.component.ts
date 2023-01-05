import { Component, DoCheck, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';

import { IZanr } from '../../interfaces/IZanr';
import { ZanrService } from '../zanr.service';
import { ZanroviDodajDijalogComponent } from '../zanrovi-dodaj-dijalog/zanrovi-dodaj-dijalog.component';
import { ZanroviAzurirajDijalogComponent } from '../zanrovi-azuriraj-dijalog/zanrovi-azuriraj-dijalog.component';

@Component({
  selector: 'app-zanrovi',
  templateUrl: './zanrovi.component.html',
  styleUrls: ['./zanrovi.component.scss']
})
export class ZanroviComponent implements OnInit, DoCheck {
  zanrovi : Array<IZanr> = new Array<IZanr>();
  tmdbZanrovi? : Array<{id: number, name: string}>;

  oznaceni = new SelectionModel<IZanr>(true, []);
  @ViewChild(MatTable) tablica?: MatTable<any>;

  constructor(private dijalog : MatDialog, private zanrServis : ZanrService) {

  }

  ngDoCheck(): void {
    console.log("promjena");
    
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

  otvoriDodajDijalog() : void {
    let dijalogRef = this.dijalog.open(ZanroviDodajDijalogComponent);

    dijalogRef.afterClosed().subscribe((odabraniZanrovi : {uspjeh : boolean, odabrani? : Array<IZanr>}) => {
      if (odabraniZanrovi.uspjeh) {
        for (let zanr of odabraniZanrovi.odabrani!) {
          let nema = true;
          this.zanrovi.forEach((z) => {
            if (z.id == zanr.id) {
              nema = false;
            }
          });
          if (nema) {
            this.zanrovi.push(zanr);
            this.zanrovi.sort();
            this.tablica?.renderRows();
          }
        }
      }
    });
  }

  otvoriAzurirajDijalog() : void {
    let dijalogRef = this.dijalog.open(ZanroviAzurirajDijalogComponent);
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
