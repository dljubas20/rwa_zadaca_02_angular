"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZanrDAO = void 0;
const baza_1 = require("./baza");
class ZanrDAO {
    baza;
    constructor() {
        this.baza = new baza_1.Baza();
    }
    dajSve = async () => {
        let sql = `SELECT * FROM zanr;`;
        return await this.baza.izvrsiSelectUpit(sql);
    };
    dodaj = async (podaci) => {
        let sql = `INSERT INTO zanr(naziv, opis) VALUES(?, ?)`;
        return await this.baza.izvrsiUpit(sql, [podaci.naziv, podaci.opis]);
    };
    obrisi = async () => {
        let sql = `DELETE FROM zanr WHERE NOT EXISTS (SELECT * FROM zanrovi WHERE zanrovi.zanr_id=zanr.id)`;
        return await this.baza.izvrsiUpit(sql);
    };
    dajZanr = async (id) => {
        let sql = `SELECT * FROM zanr WHERE id=?`;
        return await this.baza.izvrsiSelectUpit(sql, [id]);
    };
    dajZanrFilma = async (idFilma) => {
        let sql = `SELECT * FROM zanr WHERE id IN (SELECT zanr_id FROM zanrovi WHERE zanrovi.film_id = ?);`;
        return await this.baza.izvrsiSelectUpit(sql, [idFilma]);
    };
    azurirajZanr = async (id, zanr) => {
        let sql = `UPDATE zanr SET naziv=?, opis=? WHERE id=?`;
        return await this.baza.izvrsiUpit(sql, [zanr.naziv, zanr.opis, id]);
    };
    obrisiZanr = async (id) => {
        let sql = `DELETE FROM zanr WHERE id=?`;
        return await this.baza.izvrsiUpit(sql, [id]);
    };
}
exports.ZanrDAO = ZanrDAO;
