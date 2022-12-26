"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZanrDAO = void 0;
const sqlite3_1 = require("sqlite3");
class ZanrDAO {
    baza;
    constructor() {
        this.baza = new sqlite3_1.Database('../baza.sqlite');
        this.baza.exec(`PRAGMA foreign_keys = ON;`);
    }
    dajSve = async () => {
        let sql = `SELECT * FROM zanr;`;
        let podaci = new Array();
        this.baza.all(sql, (err, rezultat) => {
            podaci = rezultat;
        });
        return podaci;
    };
    dodaj = async (podaci) => {
        let sql = this.baza.prepare(`INSERT INTO zanr(naziv, opis) VALUES(?, ?)`);
        sql.run([podaci.naziv, podaci.opis]);
        return true;
    };
    obrisi = async () => {
        let sql = this.baza.prepare(`DELETE FROM zanr WHERE NOT EXISTS (SELECT * FROM zanrovi WHERE zanrovi.zanr_id=zanr.id)`);
        sql.run();
        return true;
    };
    dajZanr = async (id) => {
        let sql = `SELECT * FROM zanr WHERE id=?`;
        var podaci;
        this.baza.get(sql, [id], (err, rezultat) => {
            podaci = rezultat;
        });
        return podaci;
    };
    azurirajZanr = async (id, zanr) => {
        let sql = this.baza.prepare(`UPDATE zanr SET naziv=?, opis=? WHERE id=?`);
        sql.run([zanr.naziv, zanr.opis, id]);
        return true;
    };
    obrisiZanr = async (id) => {
        let sql = this.baza.prepare(`DELETE FROM zanr WHERE id=?`);
        sql.run([id]);
        return true;
    };
}
exports.ZanrDAO = ZanrDAO;
