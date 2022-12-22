const Baza = require("./baza.js");

class FilmDAO {
    constructor() {
        this.baza = new Baza();
    }

    dajSve = async function (parametri) {
        this.baza.spojiSeNaBazu();
        let sql = `SELECT * FROM film WHERE film.id IN (SELECT zanrovi.film_id FROM zanrovi WHERE zanrovi.film_id=film.id AND zanr_id=?)`;

        var podaci = await this.baza.izvrsiUpit(sql, [
            parametri.idZanr
        ]);
        this.baza.zatvoriVezu();

        return podaci;
    }

    dajFilm = async function (id) {
        this.baza.spojiSeNaBazu();
        let sql = `SELECT * FROM film WHERE id=?`;
        var podaci = await this.baza.izvrsiUpit(sql, [id]);
        this.baza.zatvoriVezu();

        return podaci[0];
    }

    dodaj = async function (film) {
        let sql = `INSERT INTO film(tmdb_id, imdb_id, naziv, sazetak, trajanje, datumIzlaska, datumDodavanja, dobnoOgranicenje, putanjaPozadina, putanjaPoster, budzet, prihod, pocetnaStranica, izvorniJezik, popularnost, status, slogan, ocjena, brojOcjenjivaca, prijedlog, korisnik_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

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

        await this.baza.izvrsiUpit(sql, podaci);
        return true;
    }

    azuriraj = async function (id, film) {
        let sql = `UPDATE korisnik SET tmdb_id=?, imdb_id=?, naziv=?, sazetak=?, trajanje=?, datumIzlaska=?, datumDodavanja=?, dobnoOgranicenje=?, putanjaPozadina=?, putanjaPoster=?, budzet=?, prihod=?, pocetnaStranica=?, izvorniJezik=?, popularnost=?, status=?, slogan=?, ocjena=?, brojOcjenjivaca=?, prijedlog=?, korisnik_id=? WHERE id=?`;
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

		await this.baza.izvrsiUpit(sql, podaci);
		return true;
    }

    obrisi = async function (id) {
		let sql = "DELETE FROM film WHERE id=?";
		await this.baza.izvrsiUpit(sql, [id]);
		return true;
	}
}

module.exports = FilmDAO;