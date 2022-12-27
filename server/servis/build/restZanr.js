"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ZanrDAO = require("./zanrDAO.js");
const Konfiguracija = require("../../konfiguracija.js");
const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();
exports.getZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let zdao = new ZanrDAO();
    zdao.dajSve().then((zanrovi) => {
        odgovor.send(JSON.stringify(zanrovi));
    });
};
exports.postZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let podaci = zahtjev.body;
    let zdao = new ZanrDAO();
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
    let zdao = new ZanrDAO();
    zdao.obrisi().then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
};
exports.getZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let id = zahtjev.params['id'];
    let zdao = new ZanrDAO();
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
    let id = zahtjev.params['id'];
    let podaci = zahtjev.body;
    let zdao = new ZanrDAO();
    zdao.azurirajZanr(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
};
exports.deleteZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let id = zahtjev.params['id'];
    let zdao = new ZanrDAO();
    zdao.obrisiZanr(id).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    }).catch(() => {
        odgovor.send(JSON.stringify({ greska: "žanr nije moguće izbrisati jer sadrži filmove." }));
    });
};
