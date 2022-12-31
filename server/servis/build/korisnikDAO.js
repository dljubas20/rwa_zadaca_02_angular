"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikDAO = void 0;
const baza_1 = require("./baza");
class KorisnikDAO {
    baza;
    constructor() {
        this.baza = new baza_1.Baza();
    }
    dajSve = async () => {
        let sql = "SELECT * FROM korisnik;";
        return await this.baza.izvrsiSelectUpit(sql);
    };
    daj = async (korime) => {
        let sql = "SELECT * FROM korisnik WHERE korime=?;";
        return await this.baza.izvrsiSelectUpit(sql, [korime]);
    };
    dodaj = async (korisnik) => {
        let provjeraKorime = `SELECT * FROM korisnik WHERE korime=?`;
        let provjeraEmail = `SELECT * FROM korisnik WHERE email=?`;
        let greske = { korime: '', email: '' };
        let rezultatKorime = await this.baza.izvrsiSelectUpit(provjeraKorime, [korisnik.korime]);
        let rezultatEmail = await this.baza.izvrsiSelectUpit(provjeraEmail, [korisnik.email]);
        if (rezultatKorime.length != 0) {
            greske.korime = 'Korisničko ime je zauzeto!';
        }
        if (rezultatEmail.length != 0) {
            greske.email = 'Email je zauzet!';
        }
        if (greske.korime != '' || greske.email != '') {
            return greske;
        }
        let sql = `INSERT INTO korisnik (ime, prezime, lozinka, email, korime, tipKorisnika_id, aktivacijskiKod, totpKljuc) VALUES (?,?,?,?,?,?,?,?)`;
        let podaci = [
            korisnik.ime,
            korisnik.prezime,
            korisnik.lozinka,
            korisnik.email,
            korisnik.korime,
            2,
            korisnik.aktivacijskiKod,
            korisnik.TOTPkljuc
        ];
        return await this.baza.izvrsiUpit(sql, podaci);
    };
    obrisi = async (korime) => {
        let sql = "DELETE FROM korisnik WHERE korime=?";
        this.baza.izvrsiUpit(sql, [korime]);
        return true;
    };
    azuriraj = async (korime, korisnik) => {
        if (korisnik.ime == null && korisnik.prezime == null && korisnik.lozinka == null)
            return false;
        let podaci = [];
        let sql = `UPDATE korisnik SET `;
        if (korisnik.ime != null) {
            sql += `ime=?`;
            podaci.push(korisnik.ime);
        }
        if (korisnik.prezime != null) {
            if (korisnik.ime != null)
                sql += `, `;
            sql += `prezime=?`;
            podaci.push(korisnik.prezime);
        }
        if (korisnik.lozinka != null) {
            if (korisnik.ime != null || korisnik.prezime != null)
                sql += `, `;
            sql += `lozinka=? `;
            podaci.push(korisnik.lozinka);
        }
        sql += ` WHERE korime=?;`;
        podaci.push(korime);
        this.baza.izvrsiUpit(sql, podaci);
        return true;
    };
    aktiviraj = async (korime, kod) => {
        let dohvatiKod = `SELECT aktivacijskiKod FROM korisnik WHERE korime=?`;
        let aktivacijskiKod = await this.baza.izvrsiSelectUpit(dohvatiKod, [korime]);
        console.log(aktivacijskiKod);
        if (aktivacijskiKod.aktivacijskiKod == kod.aktivacijskiKod) {
            let sql = `UPDATE korisnik SET aktiviran=? WHERE korime=?`;
            let podaci = [1, korime];
            await this.baza.izvrsiUpit(sql, podaci);
            return true;
        }
        else {
            return false;
        }
    };
}
exports.KorisnikDAO = KorisnikDAO;
