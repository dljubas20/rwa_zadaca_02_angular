import { Baza } from "./baza";
const dateformat = require("../../aplikacija/noviDateFormat.js");

export class FilmDAO {
    private baza : Baza;

    constructor() {
        this.baza = new Baza();
    }

    dajSve = async (parametri : any, dajPrijedloge : boolean = false, dajSveId : boolean = false) => {
        let sql = '';
        if (dajPrijedloge) {
            sql = `SELECT * FROM film WHERE film.prijedlog=1;`
            return await this.baza.izvrsiSelectUpit(sql);
        }

        if (dajSveId) {
            sql = `SELECT tmdb_id FROM film;`
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

    dodaj = async (tijelo : {
        film : {
            id : number,
            imdb_id : number,
            adult : boolean,
            backdrop_path : string,
            belongs_to_collection : any,
            budget : number,
            genres : any,
            homepage : string,
            original_language : string,
            original_title : string,
            overview : string,
            popularity : number,
            poster_path : string,
            production_companies : any,
            production_countries : any,
            release_date : Date,
            revenue : number,
            runtime : number,
            spoken_languages : any,
            status : string,
            tagline : string,
            title : string,
            video : boolean,
            vote_average : number,
            vote_count : number
        },
        korisnik_id : number
    }) => {
        let sql = `INSERT INTO film(tmdb_id, imdb_id, naziv, sazetak, trajanje, datumIzlaska, datumDodavanja, dobnoOgranicenje, putanjaPozadina, putanjaPoster, budzet, prihod, pocetnaStranica, izvorniJezik, popularnost, status, slogan, ocjena, brojOcjenjivaca, prijedlog, korisnik_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        let podaci = [
            tijelo.film.id,
            tijelo.film.imdb_id,
            tijelo.film.title,
            tijelo.film.overview,
            tijelo.film.runtime,
            tijelo.film.release_date,
            await dateformat.dateFormat(Date.now(), 'yyyy-mm-dd HH:MM:ss'),
            tijelo.film.adult,
            tijelo.film.backdrop_path,
            tijelo.film.poster_path,
            tijelo.film.budget,
            tijelo.film.revenue,
            tijelo.film.homepage,
            tijelo.film.original_language,
            tijelo.film.popularity,
            tijelo.film.status,
            tijelo.film.tagline,
            tijelo.film.vote_average,
            tijelo.film.vote_count,
            1,
            tijelo.korisnik_id
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