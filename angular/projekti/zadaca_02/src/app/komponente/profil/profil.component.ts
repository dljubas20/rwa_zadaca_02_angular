import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../../autentikacija/korisnik.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit{
  constructor(private korisnikServis : KorisnikService, private router : Router) {

  }

  async ngOnInit(): Promise<void> {
    if (!(await this.korisnikServis.jePrijavljen())) {
      this.router.navigate(['prijava']);
    }
  }
}
