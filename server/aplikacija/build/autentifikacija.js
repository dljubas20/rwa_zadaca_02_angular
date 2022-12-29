"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autentifikacija = void 0;
const mail = __importStar(require("./moduli/mail"));
const kodovi = __importStar(require("./moduli/kodovi"));
const totp = __importStar(require("./moduli/totp"));
const Konfiguracija = require("../konfiguracija.js");
class Autentifikacija {
    konf;
    sol;
    portRest;
    constructor() {
        this.konf = new Konfiguracija();
        this.konf.ucitajKonfiguraciju();
        this.sol = "jabuka";
        this.portRest = this.konf.dajKonf()['rest.port'];
    }
    async dodajKorisnika(korisnik) {
        let tijelo = {
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            lozinka: kodovi.kreirajSHA256(korisnik.lozinka, korisnik.korime + this.sol),
            email: korisnik.email,
            korime: korisnik.korime,
            aktivacijskiKod: 0,
            TOTPkljuc: ""
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
        };
        let odgovor = await fetch("http://localhost:" + this.portRest + "/api/korisnici?korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'], parametri);
        if (odgovor.status == 200) {
            console.log("Korisnik ubačen na servisu");
            let mailPoruka = "aktivacijski kod:" + aktivacijskiKod
                + " http://localhost:12112/aktivacijaRacuna?korime=" + korisnik.korime + "&kod=" + aktivacijskiKod;
            mailPoruka += " TOTP Kljuc: " + tajniTOTPkljuc;
            await mail.posaljiMail("dljubas20@foi.hr", korisnik.email, "Aktivacijski kod", mailPoruka);
            return true;
        }
        else {
            console.log(odgovor.status);
            console.log(await odgovor.text());
            return false;
        }
    }
    async aktivirajKorisnickiRacun(korime, kod) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ aktivacijskiKod: kod }),
            headers: zaglavlje
        };
        return await fetch("http://localhost:" + this.portRest + "/api/korisnici/" + korime + "/aktivacija?korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'], parametri);
    }
    async prijaviKorisnika(korime, lozinka) {
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
        };
        let odgovor = await fetch("http://localhost:" + this.portRest + "/api/korisnici/" + korime + "/prijava?korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'], parametri);
        if (odgovor.status == 200) {
            return await odgovor.text();
        }
        else {
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
        };
        return await fetch("http://localhost:" + this.portRest + "/api/korisnici/" + korime + "?korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'], parametri);
    }
}
exports.Autentifikacija = Autentifikacija;
