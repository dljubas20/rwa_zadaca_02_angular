import { Component } from '@angular/core';
import { environment } from 'projekti/zadaca_02/src/environments/environment';

@Component({
  selector: 'app-dokumentacija',
  templateUrl: './dokumentacija.component.html',
  styleUrls: ['./dokumentacija.component.scss']
})
export class DokumentacijaComponent {
  appPort = environment.appPort;
  restPort = environment.restPort;
}
