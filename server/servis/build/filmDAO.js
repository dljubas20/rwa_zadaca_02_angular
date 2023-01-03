"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmDAO = void 0;
const baza_1 = require("./baza");
class FilmDAO {
    baza;
    constructor() {
        this.baza = new baza_1.Baza();
    }
    dajSve = async (parametri, dajPrijedloge = false) => {
        let sql = '';
        if (dajPrijedloge) {
            sql = `SELECT * FROM film WHERE film.prijedlog=1;`;
            return await this.baza.izvrsiSelectUpit(sql);
        }
        if (parametri.idZanr != null) {
            sql = `SELECT * FROM film WHERE film.id IN (SELECT zanrovi.film_id FROM zanrovi WHERE zanrovi.film_id=film.id AND zanr_id=?) AND film.prijedlog=0;`;
            return await this.baza.izvrsiSelectUpit(sql, [parametri.idZanr]);
        }
        else {
            sql = `SELECT * FROM film WHERE film.prijedlog=0;`;
            return await this.baza.izvrsiSelectUpit(sql);
        }
    };
    dajFilm = async (id) => {
        let sql = `SELECT * FROM film WHERE id=?;`;
        return await this.baza.izvrsiSelectUpit(sql, [id]);
    };
    dodaj = async (film) => {
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
        ];
        return await this.baza.izvrsiUpit(sql, podaci);
    };
    azuriraj = async (id, odobriFilm = false, film) => {
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
    };
    obrisi = async (id) => {
        let sql = `DELETE FROM zanrovi WHERE zanrovi.film_id=?`;
        let obrisiZanrovi = await this.baza.izvrsiUpit(sql, [id]);
        sql = ``;
        if (obrisiZanrovi) {
            sql = `DELETE FROM film WHERE id=?;`;
            return await this.baza.izvrsiUpit(sql, [id]);
        }
        return false;
    };
}
exports.FilmDAO = FilmDAO;
