const mail = require("./moduli/mail.js")
const kodovi = require("./moduli/kodovi.js")
const totp = require("./moduli/totp.js")
const Konfiguracija = require("../konfiguracija.js");

class Autentifikacija {
    constructor() {
        this.konf = new Konfiguracija();
        this.portRest = "";
        this.portApp = "";
        this.sol = "jabuka";
        this.konf.ucitajKonfiguraciju().then(() => {
            this.portRest = this.konf.dajKonf()['rest.port'];
            this.portApp = this.konf.dajKonf()['app.port'];
        });
    }

    async dodajKorisnika(korisnik) {
        let tijelo = {
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            lozinka: kodovi.kreirajSHA256(korisnik.lozinka, korisnik.korime + this.sol),
            email: korisnik.email,
            korime: korisnik.korime
        };

        let aktivacijskiKod = kodovi.dajNasumceBroj(10000, 99999);
        tijelo["aktivacijskiKod"] = aktivacijskiKod;
        let tajniTOTPkljuc = totp.kreirajTajniKljuc(korisnik.korime);
        tijelo["TOTPkljuc"] = tajniTOTPkljuc;

        let zaglavlje = new Headers();
        
        zaglavlje.set("Content-Type", "application/json");
        let token = await fetch("http://localhost:" + this.portApp + "/api/generirajToken");
        zaglavlje.set("Authorization", await token.text());

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        
        let odgovor = await fetch("http://localhost:" + this.portRest + "/api/korisnici", parametri);
        
        if (odgovor.status == 200) {

            /* let mailPoruka = "aktivacijski kod:" + aktivacijskiKod
                + " http://localhost:" + this.portApp + "/aktivacijaRacuna?korime=" + korisnik.korime + "&kod=" + aktivacijskiKod
            mailPoruka += " TOTP Kljuc: " + tajniTOTPkljuc;
            let poruka = await mail.posaljiMail("dljubas20@foi.hr", korisnik.email,
                "Aktivacijski kod", mailPoruka); */
            return true;
        } else {
            return JSON.parse(await odgovor.text());
        }
    }

    async aktivirajKorisnickiRacun(korime, kod) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ aktivacijskiKod: kod }),
            headers: zaglavlje
        }
        
        return await fetch("http://localhost:" + this.portRest + "/api/korisnici/" + korime + "/aktivacija?korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'], parametri);
    }

    async prijaviKorisnika(korime, lozinka) {
        lozinka = kodovi.kreirajSHA256(lozinka, korime + this.sol);

        let tijelo = {
            lozinka: lozinka,
        };

        let zaglavlje = new Headers();
        
        zaglavlje.set("Content-Type", "application/json");
        let token = await fetch("http://localhost:" + this.portApp + "/api/generirajToken");
        zaglavlje.set("Authorization", await token.text());

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + this.portRest + "/api/korisnici/" + korime + "/prijava", parametri);
        
        if (odgovor.status == 200) {
            return await odgovor.text();
        } else {
            return false;
        }
    }

    async azurirajKorisnika(korime, korisnik) {
        let tijelo = {};
        
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

module.exports = Autentifikacija;