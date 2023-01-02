"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteZanr = exports.putZanr = exports.postZanr = exports.getZanrFilm = exports.getZanr = exports.deleteZanrovi = exports.putZanrovi = exports.postZanrovi = exports.getZanrovi = void 0;
const zanrDAO_1 = require("./zanrDAO");
const Konfiguracija = require("../../konfiguracija.js");
const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();
function getZanrovi(zahtjev, odgovor) {
    odgovor.type("application/json");
    let zdao = new zanrDAO_1.ZanrDAO();
    zdao.dajSve().then((zanrovi) => {
        odgovor.send(JSON.stringify(zanrovi));
    });
}
exports.getZanrovi = getZanrovi;
function postZanrovi(zahtjev, odgovor) {
    odgovor.type("application/json");
    let podaci = zahtjev.body;
    let zdao = new zanrDAO_1.ZanrDAO();
    zdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
exports.postZanrovi = postZanrovi;
function putZanrovi(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}
exports.putZanrovi = putZanrovi;
function deleteZanrovi(zahtjev, odgovor) {
    odgovor.type("application/json");
    let zdao = new zanrDAO_1.ZanrDAO();
    zdao.obrisi().then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
exports.deleteZanrovi = deleteZanrovi;
function getZanr(zahtjev, odgovor) {
    odgovor.type("application/json");
    let id = -1;
    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }
    let zdao = new zanrDAO_1.ZanrDAO();
    zdao.dajZanr(id).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
exports.getZanr = getZanr;
function getZanrFilm(zahtjev, odgovor) {
    odgovor.type("application/json");
    let idFilma = -1;
    if (zahtjev.params['idFilma'] !== undefined) {
        idFilma = parseInt(zahtjev.params['idFilma']);
    }
    let zdao = new zanrDAO_1.ZanrDAO();
    zdao.dajZanrFilma(idFilma).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
exports.getZanrFilm = getZanrFilm;
function postZanr(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
}
exports.postZanr = postZanr;
function putZanr(zahtjev, odgovor) {
    odgovor.type("application/json");
    let id = -1;
    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }
    let podaci = zahtjev.body;
    let zdao = new zanrDAO_1.ZanrDAO();
    zdao.azurirajZanr(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
exports.putZanr = putZanr;
function deleteZanr(zahtjev, odgovor) {
    odgovor.type("application/json");
    let id = -1;
    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }
    let zdao = new zanrDAO_1.ZanrDAO();
    zdao.obrisiZanr(id).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    }).catch(() => {
        odgovor.send(JSON.stringify({ greska: "žanr nije moguće izbrisati jer sadrži filmove." }));
    });
}
exports.deleteZanr = deleteZanr;
