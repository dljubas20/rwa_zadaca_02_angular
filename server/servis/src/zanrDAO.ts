import { Database } from 'sqlite3';

export class ZanrDAO {
    private baza : Database;

    constructor() {
        this.baza = new Database('../baza.sqlite');
        this.baza.exec(`PRAGMA foreign_keys = ON;`);
    }

    dajSve = async () => {
        let sql = `SELECT * FROM zanr;`;
        
        let podaci : Array<any> | any = new Array<any>();
        this.baza.all(sql, (err, rezultat) => {
            podaci = rezultat;
        });

        return podaci;
    }

    dodaj = async (podaci : {
        naziv : string,
        opis : string
    }) => {
        let sql = this.baza.prepare(`INSERT INTO zanr(naziv, opis) VALUES(?, ?)`);

        sql.run([podaci.naziv, podaci.opis]);
        return true;
    }

    obrisi = async () => {
        let sql = this.baza.prepare(`DELETE FROM zanr WHERE NOT EXISTS (SELECT * FROM zanrovi WHERE zanrovi.zanr_id=zanr.id)`);
        
        sql.run();
        return true;
    }

    dajZanr = async (id : number) => {
        let sql = `SELECT * FROM zanr WHERE id=?`;
        var podaci : any;
        
        this.baza.get(sql, [id], (err, rezultat) => {
            podaci = rezultat;
        });

        return podaci;
    }

    azurirajZanr = async (id : number, zanr : {
        naziv : string,
        opis : string
    }) => {
		let sql = this.baza.prepare(`UPDATE zanr SET naziv=?, opis=? WHERE id=?`);
        sql.run([zanr.naziv, zanr.opis, id]);

        return true;
    }

    obrisiZanr = async (id : number) => {
        let sql = this.baza.prepare(`DELETE FROM zanr WHERE id=?`);
        sql.run([id]);

        return true;
    }
}