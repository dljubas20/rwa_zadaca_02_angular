import { Baza } from "./baza";

export class ZanrDAO {
    private baza : Baza;

    constructor() {
        this.baza = new Baza();
    }

    dajSve = async () => {
        let sql = `SELECT * FROM zanr;`;

        return await this.baza.izvrsiSelectUpit(sql);
    }

    dodaj = async (podaci : {
        naziv : string,
        opis : string
    }) => {
        let sql = `INSERT INTO zanr(naziv, opis) VALUES(?, ?)`;

        return await this.baza.izvrsiUpit(sql, [podaci.naziv, podaci.opis]);
    }

    obrisi = async () => {
        let sql = `DELETE FROM zanr WHERE NOT EXISTS (SELECT * FROM zanrovi WHERE zanrovi.zanr_id=zanr.id)`;
        
        return await this.baza.izvrsiUpit(sql);
    }

    dajZanr = async (id : number) => {
        let sql = `SELECT * FROM zanr WHERE id=?`;


        return await this.baza.izvrsiSelectUpit(sql, [id]);
    }

    azurirajZanr = async (id : number, zanr : {
        naziv : string,
        opis : string
    }) => {
		let sql = `UPDATE zanr SET naziv=?, opis=? WHERE id=?`;

        return await this.baza.izvrsiUpit(sql, [zanr.naziv, zanr.opis, id]);
    }

    obrisiZanr = async (id : number) => {
        let sql = `DELETE FROM zanr WHERE id=?`;

        return await this.baza.izvrsiUpit(sql, [id]);
    }
}