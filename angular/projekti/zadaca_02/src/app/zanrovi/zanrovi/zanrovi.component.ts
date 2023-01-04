import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IZanr } from '../../interfaces/IZanr';
import { ZanrService } from '../zanr.service';
import { ZanroviDijalogComponent } from '../zanrovi-dijalog/zanrovi-dijalog.component';

@Component({
  selector: 'app-zanrovi',
  templateUrl: './zanrovi.component.html',
  styleUrls: ['./zanrovi.component.scss']
})
export class ZanroviComponent implements OnInit {
  zanrovi? : Array<IZanr>;
  tmdbZanrovi? : Array<IZanr>;

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
    let dijalogRef = this.dijalog.open(ZanroviDijalogComponent, {
      data: this.tmdbZanrovi
    })
  }
}
