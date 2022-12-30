const kodovi = require("./moduli/kodovi.js")
const Konfiguracija = require("../konfiguracija.js");

class FilmoviZanroviPretrazivanje {

    constructor () {
        this.konf = new Konfiguracija();
        this.konf.ucitajKonfiguraciju().then(() => {
            this.url = "http://localhost:" + this.konf.dajKonf()['rest.port'] + "/api";
        });
    }

    async dohvatiFilmove(stranica, kljucnaRijec = "") {
        let putanja = this.url + "/tmdb/filmovi?stranica=" + stranica + "&kljucnaRijec=" + kljucnaRijec + "&korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'];

        console.log(putanja)
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        console.log(filmovi)
        return filmovi;
    }

    async dohvatiSveFilmove() {
        let putanja = this.url + "/filmovi?stranica=1&brojFilmova=" + this.konf.dajKonf()['app.broj.stranica'] + "&korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'];

        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);

        return filmovi;
    }
}

module.exports = FilmoviZanroviPretrazivanje;