const konst = require("../konstante.js");
const portRest = require(konst.dirPortova + "portovi_rest.js").dljubas20;
const url = "http://spider.foi.hr:" + portRest + "/api";
const kodovi = require("./moduli/kodovi.js")
const Konfiguracija = require("../konfiguracija.js");

class FilmoviZanroviPretrazivanje {

    constructor () {
        this.konf = new Konfiguracija();
        this.konf.ucitajKonfiguraciju();
    }

    async dohvatiFilmove(stranica, kljucnaRijec = "") {
        let putanja = url + "/tmdb/filmovi?stranica=" + stranica + "&kljucnaRijec=" + kljucnaRijec + "&korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'];

        console.log(putanja)
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        console.log(filmovi)
        return filmovi;
    }

    async dohvatiSveZanrove() {
        let putanja = url + "/zanr" + "?korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'];
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let zanrovi = JSON.parse(podaci);

        return zanrovi;
    }

    async dohvatiNasumceFilm(idZanr) {
        let putanja = url + "/filmovi?stranica=1&brojFilmova=" + this.konf.dajKonf()['app.broj.stranica'] + "&korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'] + "&zanr=" + idZanr;
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        let rez = [filmovi[kodovi.dajNasumceBroj(0, filmovi.length)],
                    filmovi[kodovi.dajNasumceBroj(0, filmovi.length)]];

        return rez;
    }

    async dohvatiSveFilmove() {
        let putanja = url + "/filmovi?stranica=1&brojFilmova=" + this.konf.dajKonf()['app.broj.stranica'] + "&korime=" + this.konf.dajKonf()['rest.korime'] + "&lozinka=" + this.konf.dajKonf()['rest.lozinka'];

        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);

        return filmovi;
    }
}



module.exports = FilmoviZanroviPretrazivanje;