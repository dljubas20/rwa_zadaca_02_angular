"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filmDAO_1 = require("./filmDAO");
const Konfiguracija = require("../../konfiguracija.js");
const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();
exports.getFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let parametri = {
        stranica: zahtjev.query['stranica'],
        brojFilmova: konf.dajKonf()['app.broj.stranica'],
        datum: zahtjev.query['datum'],
        idZanr: zahtjev.query['zanr'],
        dioNazivFilma: zahtjev.query['naziv'],
        sortiraj: zahtjev.query['sortiraj']
    };
    if (parametri.stranica == null || parametri.brojFilmova == null) {
        odgovor.status(417);
        odgovor.send({ greska: "neocekivani podaci" });
        return;
    }
    let fdao = new filmDAO_1.FilmDAO();
    fdao.dajSve(parametri).then((filmovi) => {
        console.log(filmovi);
        odgovor.send(JSON.stringify(filmovi));
    });
};
exports.postFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let fdao = new filmDAO_1.FilmDAO();
    fdao.dodaj(zahtjev.body).then((uspjeh) => {
        console.log(uspjeh);
        odgovor.send(JSON.stringify(uspjeh));
    });
};
exports.putFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
};
exports.deleteFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
};
exports.getFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let id = -1;
    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }
    let fdao = new filmDAO_1.FilmDAO();
    fdao.dajFilm(id).then((film) => {
        console.log(film);
        odgovor.send(JSON.stringify(film));
    });
};
exports.postFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
};
exports.putFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let id = -1;
    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }
    let podaci = zahtjev.body;
    let fdao = new filmDAO_1.FilmDAO();
    fdao.azuriraj(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
};
exports.deleteFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let id = -1;
    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }
    let fdao = new filmDAO_1.FilmDAO();
    fdao.obrisi(id).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
};
