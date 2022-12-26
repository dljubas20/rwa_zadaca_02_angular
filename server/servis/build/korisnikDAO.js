"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikDAO = void 0;
const sqlite3_1 = require("sqlite3");
class KorisnikDAO {
    baza;
    constructor() {
        this.baza = new sqlite3_1.Database('../baza.sqlite');
        this.baza.exec(`PRAGMA foreign_keys = ON;`);
    }
    dajSve = async () => {
        let sql = "SELECT * FROM korisnik;";
        var podaci = new Array();
        this.baza.all(sql, [], (err, rezultat) => {
            podaci = rezultat;
        });
        return podaci;
    };
    daj = async (korime) => {
        let sql = "SELECT * FROM korisnik WHERE korime=?;";
        let podaci;
        this.baza.get(sql, [korime], (err, rezultat) => {
            podaci = rezultat;
        });
        return podaci;
    };
    dodaj = async (korisnik) => {
        let sql = this.baza.prepare(`INSERT INTO korisnik (ime, prezime, lozinka, email, korime, tipKorisnika_id, aktivacijskiKod, totpKljuc) VALUES (?,?,?,?,?,?,?,?)`);
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
        sql.run(podaci);
        return true;
    };
    obrisi = async (korime) => {
        let sql = this.baza.prepare("DELETE FROM korisnik WHERE korime=?");
        sql.run([korime]);
        return true;
    };
    azuriraj = async (korime, korisnik) => {
        if (korisnik.ime == null && korisnik.prezime == null && korisnik.lozinka == null)
            return false;
        let podaci = [];
        let upit = `UPDATE korisnik SET `;
        if (korisnik.ime != null) {
            upit += `ime=?`;
            podaci.push(korisnik.ime);
        }
        if (korisnik.prezime != null) {
            if (korisnik.ime != null)
                upit += `, `;
            upit += `prezime=?`;
            podaci.push(korisnik.prezime);
        }
        if (korisnik.lozinka != null) {
            if (korisnik.ime != null || korisnik.prezime != null)
                upit += `, `;
            upit += `lozinka=? `;
            podaci.push(korisnik.lozinka);
        }
        upit += ` WHERE korime=?`;
        podaci.push(korime);
        let sql = this.baza.prepare(upit);
        sql.run(podaci);
        return true;
    };
    aktiviraj = async (korime, kod) => {
        let dohvatiKod = `SELECT aktivacijskiKod FROM korisnik WHERE korime=?`;
        let aktivacijskiKod = { aktivacijskiKod: 0 };
        this.baza.get(dohvatiKod, [korime], (err, rezultat) => {
            aktivacijskiKod = rezultat;
        });
        console.log(aktivacijskiKod);
        if (aktivacijskiKod.aktivacijskiKod == kod.aktivacijskiKod) {
            let sql = this.baza.prepare(`UPDATE korisnik SET aktiviran=? WHERE korime=?`);
            let podaci = [1, korime];
            sql.run(podaci);
            return true;
        }
        else {
            return false;
        }
    };
}
exports.KorisnikDAO = KorisnikDAO;
