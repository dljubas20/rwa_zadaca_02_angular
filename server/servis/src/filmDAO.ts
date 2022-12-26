import { Database } from 'sqlite3';

class FilmDAO {
    private baza : Database;

    constructor() {
        this.baza = new Database('baza.sqlite');
        this.baza.exec(`PRAGMA foreign_keys = ON;`);
    }

    dajSve  = async (parametri : {idZanr : number}) => {
        let sql = this.baza.prepare(`SELECT * FROM film WHERE film.id IN (SELECT zanrovi.film_id FROM zanrovi WHERE zanrovi.film_id=film.id AND zanr_id=?);`);

        var podaci = sql.run([
            parametri.idZanr
        ]);

        return podaci;
    }

    dajFilm = async (id : number) => {
        let sql = this.baza.prepare(`SELECT * FROM film WHERE id=?;`);
        var podaci = sql.run([id]);

        return podaci;
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
        let sql = this.baza.prepare(`INSERT INTO film(tmdb_id, imdb_id, naziv, sazetak, trajanje, datumIzlaska, datumDodavanja, dobnoOgranicenje, putanjaPozadina, putanjaPoster, budzet, prihod, pocetnaStranica, izvorniJezik, popularnost, status, slogan, ocjena, brojOcjenjivaca, prijedlog, korisnik_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`);

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

        sql.run(podaci);
        return true;
    }

    azuriraj = async (id : number, film : {
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
        let sql = this.baza.prepare(`UPDATE korisnik SET tmdb_id=?, imdb_id=?, naziv=?, sazetak=?, trajanje=?, datumIzlaska=?, datumDodavanja=?, dobnoOgranicenje=?, putanjaPozadina=?, putanjaPoster=?, budzet=?, prihod=?, pocetnaStranica=?, izvorniJezik=?, popularnost=?, status=?, slogan=?, ocjena=?, brojOcjenjivaca=?, prijedlog=?, korisnik_id=? WHERE id=?;`);
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
            film.korisnik_id,
            id
        ];
        
		sql.run(podaci);
		return true;
    }

    obrisi = async (id : number) => {
		let sql = this.baza.prepare(`DELETE FROM film WHERE id=?;`);
		sql.run([id]);
		return true;
	}
}

module.exports = FilmDAO;