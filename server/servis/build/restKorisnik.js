"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const korisnikDAO_1 = require("./korisnikDAO");
const Konfiguracija = require("../../konfiguracija.js");
const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();
exports.getKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let kdao = new korisnikDAO_1.KorisnikDAO();
    kdao.dajSve().then((korisnici) => {
        odgovor.send(JSON.stringify(korisnici));
    });
};
exports.postKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let podaci = zahtjev.body;
    let kdao = new korisnikDAO_1.KorisnikDAO();
    kdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
};
exports.putKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
};
exports.deleteKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
};
exports.getKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let kdao = new korisnikDAO_1.KorisnikDAO();
    let korime = "";
    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime'];
    }
    kdao.daj(korime).then((korisnik) => {
        console.log(korisnik);
        odgovor.send(JSON.stringify(korisnik));
    });
};
exports.postKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
};
exports.putKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let korime = "";
    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime'];
    }
    let podaci = zahtjev.body;
    let kdao = new korisnikDAO_1.KorisnikDAO();
    kdao.azuriraj(korime, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
};
exports.deleteKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
};
exports.getKorisnikAktivacija = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
};
exports.postKorisnikAktivacija = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
};
exports.putKorisnikAktivacija = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let kdao = new korisnikDAO_1.KorisnikDAO();
    let korime = "";
    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime'];
    }
    let podaci = zahtjev.body;
    kdao.aktiviraj(korime, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
};
exports.deleteKorisnikAktivacija = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
};
exports.getKorisnikPrijava = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
};
exports.postKorisnikPrijava = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let kdao = new korisnikDAO_1.KorisnikDAO();
    let korime = "";
    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime'];
    }
    kdao.daj(korime).then((korisnik) => {
        console.log(korisnik);
        console.log(zahtjev.body);
        if (korisnik != null && korisnik.lozinka == zahtjev.body.lozinka)
            odgovor.send(JSON.stringify(korisnik));
        else {
            odgovor.status(401);
            odgovor.send(JSON.stringify({ greska: "Krivi podaci!" }));
        }
    });
};
exports.putKorisnikPrijava = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
};
exports.deleteKorisnikPrijava = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
};
