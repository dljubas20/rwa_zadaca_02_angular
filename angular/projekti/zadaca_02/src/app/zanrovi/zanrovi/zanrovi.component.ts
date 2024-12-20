import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';

import { IZanr } from '../../interfaces/IZanr';
import { ZanrService } from '../zanr.service';
import { ZanroviDodajDijalogComponent } from '../zanrovi-dodaj-dijalog/zanrovi-dodaj-dijalog.component';
import { ZanroviAzurirajDijalogComponent } from '../zanrovi-azuriraj-dijalog/zanrovi-azuriraj-dijalog.component';
import { ZanroviPreskoceniDijalogComponent } from '../zanrovi-preskoceni-dijalog/zanrovi-preskoceni-dijalog.component';
import { KorisnikService } from '../../autentikacija/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zanrovi',
  templateUrl: './zanrovi.component.html',
  styleUrls: ['./zanrovi.component.scss']
})
export class ZanroviComponent implements OnInit {
  zanrovi : Array<IZanr> = new Array<IZanr>();
  tmdbZanrovi? : Array<{id: number, name: string}>;
  preskoceni : Array<IZanr> = new Array<IZanr>();

  oznaceni = new SelectionModel<IZanr>(true, []);
  @ViewChild(MatTable) tablica?: MatTable<any>;

  constructor(private dijalog : MatDialog,
    private zanrServis : ZanrService,
    private korisnikServis : KorisnikService,
    private router : Router
  ) {

  }

  async ngOnInit() : Promise<void> {
    if (!(await this.korisnikServis.jePrijavljen()) || !(await this.korisnikServis.jeAdmin())) {
      this.router.navigate(['prijava']);
    }

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
    
    try {
      dijalogRef.afterClosed().subscribe((odabraniZanrovi : {uspjeh : boolean, odabrani? : Array<IZanr>} | undefined) => {
        if (odabraniZanrovi != undefined && odabraniZanrovi.uspjeh) {
          for (let zanr of odabraniZanrovi.odabrani!) {
            let nema = true;
            this.zanrovi.forEach((z) => {
              if (z.id == zanr.id) {
                nema = false;
                this.preskoceni.push(zanr);
              }
            });
            if (nema) {
              this.zanrovi.push(zanr);
              this.zanrovi.sort();
              this.tablica?.renderRows();
            }
          }
        }
        if (this.preskoceni.length != 0) {
          this.dijalog.open(ZanroviPreskoceniDijalogComponent, {data: this.preskoceni});
        }
      });
    } catch (err) {
      
    }
  }

  otvoriAzurirajDijalog() : void {
    if (this.oznaceni.selected.length != 1) {
      alert("Označite samo jedan redak!");
      return;
    }

    let azurirajMe : IZanr;

    for (let zanr of this.zanrovi) {
      if (this.oznaceni.isSelected(zanr)) {
        azurirajMe = zanr;
      }
    }

    let dijalogRef = this.dijalog.open(ZanroviAzurirajDijalogComponent, {data: azurirajMe!});
    
    try {
      dijalogRef.afterClosed().subscribe((azuriran : IZanr | boolean) => {
        if (typeof azuriran != 'boolean' && azuriran != undefined) {
          this.zanrovi.forEach((zanr) => {
            if (zanr.id == azuriran.id) {
              zanr.naziv = azuriran.naziv;
              this.oznaceni.clear();
  
              this.tablica?.renderRows();
  
              return;
            }
          });
        }
      });
    } catch (error) {
      
    }
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

  async obrisiSve() : Promise<void> {
    if (await this.zanrServis.obrisiZanrove()) {
      await this.dohvatiZanrove();
      this.tablica?.renderRows();
    }
    window.location.reload();
  }
}
