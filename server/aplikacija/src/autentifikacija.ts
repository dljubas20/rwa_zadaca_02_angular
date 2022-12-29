import * as mail from "./moduli/mail";
import * as kodovi from "./moduli/kodovi";
import * as totp from "./moduli/totp";
const Konfiguracija = require("../konfiguracija.js");

export class Autentifikacija {
    konf;
    sol : string;
    portRest : string;
    
    constructor() {
        this.konf = new Konfiguracija();
        this.konf.ucitajKonfiguraciju();
        this.sol = "jabuka";
        this.portRest = this.konf.dajKonf()['rest.port'];
    }

    async dodajKorisnika(korisnik : {
        ime : string,
        prezime : string,
        lozinka : string,
        email : string,
        korime : string
    }) {
        let tijelo : {
            ime : string,
            prezime : string,
            lozinka : string,
            email : string,
            korime : string,
            aktivacijskiKod : number,
            TOTPkljuc : string
        } = {
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            lozinka: kodovi.kreirajSHA256(korisnik.lozinka, korisnik.korime + this.sol),
            email: korisnik.email,
            korime: korisnik.korime,
            aktivacijskiKod : 0,
            TOTPkljuc : ""
        };

        let aktivacijskiKod = kodovi.dajNasumceBroj(10000, 99999);
        tijelo["aktivacijskiKod"] = aktivacijskiKod;
        let tajniTOTPkljuc = totp.kreirajTajniKljuc(korisnik.korime);
        tijelo["TOTPkljuc"] = tajniTOTPkljuc;

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        
        let odgovor = await fetch("http://localhost:" + this.portRest + "/api/korisnici?korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'], parametri);
        
        if (odgovor.status == 200) {
            console.log("Korisnik ubačen na servisu");
            let mailPoruka = "aktivacijski kod:" + aktivacijskiKod
                + " http://localhost:12112/aktivacijaRacuna?korime=" + korisnik.korime + "&kod=" + aktivacijskiKod
            mailPoruka += " TOTP Kljuc: " + tajniTOTPkljuc;
            await mail.posaljiMail("dljubas20@foi.hr", korisnik.email,
                "Aktivacijski kod", mailPoruka);
            return true;
        } else {
            console.log(odgovor.status);
            console.log(await odgovor.text());
            return false;
        }
    }

    async aktivirajKorisnickiRacun(korime : string, kod : number) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ aktivacijskiKod: kod }),
            headers: zaglavlje
        }
        
        return await fetch("http://localhost:" + this.portRest + "/api/korisnici/" + korime + "/aktivacija?korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'], parametri);
    }

    async prijaviKorisnika(korime : string, lozinka : string) {
        lozinka = kodovi.kreirajSHA256(lozinka, korime + this.sol);

        let tijelo = {
            lozinka: lozinka,
        };

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + this.portRest + "/api/korisnici/" + korime + "/prijava?korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'], parametri);
        
        if (odgovor.status == 200) {
            return await odgovor.text();
        } else {
            return false;
        }
    }

    async azurirajKorisnika(korime : string, korisnik : {
        ime : string,
        prezime : string,
        lozinka : string
    }) {
        let tijelo : any = {};
        
        if (korisnik.ime != null && korisnik.ime != '')
            tijelo['ime'] = korisnik.ime;
        
        if (korisnik.prezime != null && korisnik.prezime != '')
            tijelo['prezime'] = korisnik.prezime;
        
        if (korisnik.lozinka != null && korisnik.lozinka != '')
            tijelo['lozinka'] = kodovi.kreirajSHA256(korisnik.lozinka, korime + this.sol);

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }

        return await fetch("http://localhost:" + this.portRest + "/api/korisnici/" + korime + "?korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'], parametri);
    }

}