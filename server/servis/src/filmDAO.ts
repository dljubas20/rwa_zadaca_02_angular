import { Baza } from "./baza";

export class FilmDAO {
    private baza : Baza;

    constructor() {
        this.baza = new Baza();
    }

    dajSve  = async (parametri : any, dajPrijedloge : boolean = false) => {
        let sql = '';
        if (dajPrijedloge) {
            sql = `SELECT * FROM film WHERE film.prijedlog=1;`
            return await this.baza.izvrsiSelectUpit(sql);
        }

        if (parametri.idZanr != null) {
            sql = `SELECT * FROM film WHERE film.id IN (SELECT zanrovi.film_id FROM zanrovi WHERE zanrovi.film_id=film.id AND zanr_id=?) AND film.prijedlog=0;`;
            return await this.baza.izvrsiSelectUpit(sql, [parametri.idZanr]);
        }
        else {
            sql = `SELECT * FROM film WHERE film.prijedlog=0;`
            return await this.baza.izvrsiSelectUpit(sql);
        }

    }

    dajFilm = async (id : number) => {
        let sql = `SELECT * FROM film WHERE id=?;`;

        return await this.baza.izvrsiSelectUpit(sql, [id]);
    }

    dodaj = async (film : {
        tmdb_id : number,
        imdb_id : number,
        naziv : string,
        sazetak : string,
        trajanje : number,
        datumIzlaska : Date,
        datumDodavanja : Date,
        dobnoOgranicenje : boolean,
        putanjaPozadina : string,
        putanjaPoster : string,
        budzet : number,
        prihod : number,
        pocetnaStranica : string,
        izvorniJezik : string,
        popularnost : number,
        status : string,
        slogan : string,
        ocjena : number,
        brojOcjenjivaca : number,
        prijedlog : boolean,
        korisnik_id : number
    }) => {
        let sql = `INSERT INTO film(tmdb_id, imdb_id, naziv, sazetak, trajanje, datumIzlaska, datumDodavanja, dobnoOgranicenje, putanjaPozadina, putanjaPoster, budzet, prihod, pocetnaStranica, izvorniJezik, popularnost, status, slogan, ocjena, brojOcjenjivaca, prijedlog, korisnik_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        let podaci = [
            film.tmdb_id,
            film.imdb_id,
            film.naziv,
            film.sazetak,
            film.trajanje,
            film.datumIzlaska,
            film.datumDodavanja,
            film.dobnoOgranicenje,
            film.putanjaPozadina,
            film.putanjaPoster,
            film.budzet,
            film.prihod,
            film.pocetnaStranica,
            film.izvorniJezik,
            film.popularnost,
            film.status,
            film.slogan,
            film.ocjena,
            film.brojOcjenjivaca,
            film.prijedlog,
            film.korisnik_id
        ]

        return await this.baza.izvrsiUpit(sql, podaci);
    }

    azuriraj = async (id : number, odobriFilm : boolean = false, film? : {
        tmdb_id : number,
        imdb_id : number,
        naziv : string,
        sazetak : string,
        trajanje : number,
        datumIzlaska : Date,
        datumDodavanja : Date,
        dobnoOgranicenje : boolean,
        putanjaPozadina : string,
        putanjaPoster : string,
        budzet : number,
        prihod : number,
        pocetnaStranica : string,
        izvorniJezik : string,
        popularnost : number,
        status : string,
        slogan : string,
        ocjena : number,
        brojOcjenjivaca : number,
        prijedlog : boolean,
        korisnik_id : number
    }) => {
        if (odobriFilm) {
            let sql = `UPDATE film SET prijedlog = 0 WHERE id = ?;`;
            return await this.baza.izvrsiUpit(sql, [id]);
        }

        let sql = `UPDATE film SET tmdb_id=?, imdb_id=?, naziv=?, sazetak=?, trajanje=?, datumIzlaska=?, datumDodavanja=?, dobnoOgranicenje=?, putanjaPozadina=?, putanjaPoster=?, budzet=?, prihod=?, pocetnaStranica=?, izvorniJezik=?, popularnost=?, status=?, slogan=?, ocjena=?, brojOcjenjivaca=?, prijedlog=?, korisnik_id=? WHERE id=?;`;
        let podaci = [
            film?.tmdb_id,
            film?.imdb_id,
            film?.naziv,
            film?.sazetak,
            film?.trajanje,
            film?.datumIzlaska,
            film?.datumDodavanja,
            film?.dobnoOgranicenje,
            film?.putanjaPozadina,
            film?.putanjaPoster,
            film?.budzet,
            film?.prihod,
            film?.pocetnaStranica,
            film?.izvorniJezik,
            film?.popularnost,
            film?.status,
            film?.slogan,
            film?.ocjena,
            film?.brojOcjenjivaca,
            film?.prijedlog,
            film?.korisnik_id,
            id
        ];
        
		return await this.baza.izvrsiUpit(sql, podaci);
    }

    obrisi = async (id : number) => {
        let sql = `DELETE FROM zanrovi WHERE zanrovi.film_id=?`
        let obrisiZanrovi = await this.baza.izvrsiUpit(sql, [id]);
		sql = ``;

        if (obrisiZanrovi) {
            sql = `DELETE FROM film WHERE id=?;`;
            return await this.baza.izvrsiUpit(sql, [id]);
        }
        return false;
	}
}