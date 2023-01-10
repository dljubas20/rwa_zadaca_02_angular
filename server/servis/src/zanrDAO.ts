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

    dodaj = async (podaci : Array<{
        id : number,
        naziv : string,
        opis? : string
    }>) => {
        let sviUbaceni = true;

        for (let zanr of podaci) {
            let sql = `INSERT OR IGNORE INTO zanr(id, naziv, opis) VALUES(?, ?, ?);`;
    
            let ubacen = await this.baza.izvrsiUpit(sql, [zanr.id, zanr.naziv, zanr.opis]);

            if (!ubacen) {
                sviUbaceni = false;
            }
        }

        return sviUbaceni;
    }

    obrisi = async () => {
        let sql = `DELETE FROM zanr WHERE NOT EXISTS (SELECT * FROM zanrovi WHERE zanrovi.zanr_id=zanr.id);`;
        
        return await this.baza.izvrsiUpit(sql);
    }

    dajZanr = async (id : number) => {
        let sql = `SELECT * FROM zanr WHERE id=?`;


        return await this.baza.izvrsiSelectUpit(sql, [id]);
    }

    dajZanrFilma = async (idFilma : number) => {
        let sql = `SELECT * FROM zanr WHERE id IN (SELECT zanr_id FROM zanrovi WHERE zanrovi.film_id = ?);`;
        return await this.baza.izvrsiSelectUpit(sql, [idFilma]);
    }

    azurirajZanr = async (id : number, zanr : {
        naziv : string
    }) => {
		let sql = `UPDATE zanr SET naziv=? WHERE id=?`;

        return await this.baza.izvrsiUpit(sql, [zanr.naziv, id]);
    }

    obrisiZanr = async (id : number) => {
        let sql = `DELETE FROM zanr WHERE id=?`;

        return await this.baza.izvrsiUpit(sql, [id]);
    }
}