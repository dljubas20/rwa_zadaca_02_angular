"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmDAO = void 0;
const sqlite3_1 = require("sqlite3");
class FilmDAO {
    baza;
    constructor() {
        this.baza = new sqlite3_1.Database('../baza.sqlite');
        this.baza.exec(`PRAGMA foreign_keys = ON;`);
    }
    dajSve = async (parametri) => {
        let sql = `SELECT * FROM film WHERE film.id IN (SELECT zanrovi.film_id FROM zanrovi WHERE zanrovi.film_id=film.id AND zanr_id=?);`;
        let podaci = new Array();
        this.baza.all(sql, [parametri.idZanr], (err, rezultat) => {
            podaci = rezultat;
        });
        return podaci;
    };
    dajFilm = async (id) => {
        let sql = `SELECT * FROM film WHERE id=?;`;
        let podaci;
        this.baza.get(sql, [id], (err, rezultat) => {
            podaci = rezultat;
        });
        return podaci;
    };
    dodaj = async (film) => {
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
        ];
        sql.run(podaci);
        return true;
    };
    azuriraj = async (id, film) => {
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
    };
    obrisi = async (id) => {
        let sql = this.baza.prepare(`DELETE FROM film WHERE id=?;`);
        sql.run([id]);
        return true;
    };
}
exports.FilmDAO = FilmDAO;
