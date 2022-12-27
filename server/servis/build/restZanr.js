"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zanrDAO_1 = require("./zanrDAO");
const Konfiguracija = require("../../konfiguracija.js");
const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();
exports.getZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let zdao = new zanrDAO_1.ZanrDAO();
    zdao.dajSve().then((zanrovi) => {
        odgovor.send(JSON.stringify(zanrovi));
    });
};
exports.postZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let podaci = zahtjev.body;
    let zdao = new zanrDAO_1.ZanrDAO();
    zdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
};
exports.putZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
};
exports.deleteZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let zdao = new zanrDAO_1.ZanrDAO();
    zdao.obrisi().then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
};
exports.getZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let id = -1;
    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }
    let zdao = new zanrDAO_1.ZanrDAO();
    zdao.dajZanr(id).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
};
exports.postZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
};
exports.putZanr = function (zahtjev, odgovor) {
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
};
exports.deleteZanr = function (zahtjev, odgovor) {
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
};
