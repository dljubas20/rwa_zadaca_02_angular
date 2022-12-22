const Baza = require("./baza.js");

class ZanrDAO {
    constructor() {
        this.baza = new Baza();
    }

    dajSve = async function () {
        this.baza.spojiSeNaBazu();
        let sql = `SELECT * FROM zanr;`;
        var podaci = await this.baza.izvrsiUpit(sql, []);
        this.baza.zatvoriVezu();

        return podaci;
    }

    dodaj = async function (podaci) {
        let sql = `INSERT INTO zanr(naziv, opis) VALUES(?, ?)`;

        await this.baza.izvrsiUpit(sql, [podaci.naziv, podaci.opis]);
        return true;
    }

    obrisi = async function () {
        let sql = `DELETE FROM zanr WHERE NOT EXISTS (SELECT * FROM zanrovi WHERE zanrovi.zanr_id=zanr.id)`;
        
        await this.baza.izvrsiUpit(sql, []);
        return true;
    }

    dajZanr = async function (id) {
        this.baza.spojiSeNaBazu();
        let sql = `SELECT * FROM zanr WHERE id=?`;
        var podaci = await this.baza.izvrsiUpit(sql, [id]);
        this.baza.zatvoriVezu();

        return podaci[0];
    }

    azurirajZanr = async function (id, zanr) {
		let sql = `UPDATE zanr SET naziv=?, opis=? WHERE id=?`;
        await this.baza.izvrsiUpit(sql, [zanr.naziv, zanr.opis, id]);

        return true;
    }

    obrisiZanr = async function (id) {
        let sql = `DELETE FROM zanr WHERE id=?`;
        await this.baza.izvrsiUpit(sql, [id]);

        return true;
    }
}

module.exports = ZanrDAO;