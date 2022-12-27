import { Component } from '@angular/core';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrls: ['./navigacija.component.scss']
})
export class NavigacijaComponent {
    stavke : Array<string> = new Array<string>(
      "Početna",
      "Registracija",
      "Pretraživanje filmova",
      "Dokumentacija",
      "Profil",
      "Filmovi pregled"
    );
}
