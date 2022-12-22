const FilmDAO = require("./filmDAO.js");
const Konfiguracija = require("../konfiguracija.js");
const ProvjeraKonfiguracije = require("../provjeraKonfiguracije.js");

const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

exports.getFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");

    let parametri = {
        stranica: zahtjev.query.stranica,
        brojFilmova: konf.dajKonf()['app.broj.stranica'],
        datum: zahtjev.query.datum,
        idZanr: zahtjev.query.zanr,
        dioNazivFilma: zahtjev.query.naziv,
        sortiraj: zahtjev.query.sortiraj
    };

    if(parametri.stranica == null || parametri.brojFilmova == null){
        odgovor.status(417);
        odgovor.send({greska: "neocekivani podaci"});
        return;
    }

    let fdao = new FilmDAO();
    fdao.dajSve(parametri).then((filmovi) => {
        console.log(filmovi);
        odgovor.send(JSON.stringify(filmovi));
    });
}

exports.postFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");

    let fdao = new FilmDAO();
    fdao.dodaj(zahtjev.body).then((filmovi) => {
        console.log(filmovi);
        odgovor.send(JSON.stringify(filmovi));
    });
}

exports.putFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

exports.getFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json");

    let id = zahtjev.params.id;

    let fdao = new FilmDAO();
    fdao.dajFilm(id).then((film) => {
        console.log(film);
        odgovor.send(JSON.stringify(film));
    });
}

exports.postFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json");

    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
}

exports.putFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json");

    let id = zahtjev.params.id;
    let podaci = zahtjev.body;

    let fdao = new FilmDAO();
    fdao.azuriraj(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.deleteFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json");

    let id = zahtjev.params.id;

    let fdao = new FilmDAO();
    fdao.obrisi(id).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}