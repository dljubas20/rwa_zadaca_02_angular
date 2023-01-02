"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteKorisnikPrijava = exports.putKorisnikPrijava = exports.postKorisnikPrijava = exports.getKorisnikPrijava = exports.deleteKorisnikAktivacija = exports.putKorisnikAktivacija = exports.postKorisnikAktivacija = exports.getKorisnikAktivacija = exports.deleteKorisnik = exports.putKorisnik = exports.postKorisnik = exports.getKorisnik = exports.deleteKorisnici = exports.putKorisnici = exports.postKorisnici = exports.getKorisnici = void 0;
const korisnikDAO_1 = require("./korisnikDAO");
const Konfiguracija = require("../../konfiguracija.js");
const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();
function getKorisnici(zahtjev, odgovor) {
    odgovor.type("application/json");
    let kdao = new korisnikDAO_1.KorisnikDAO();
    kdao.dajSve().then((korisnici) => {
        odgovor.send(JSON.stringify(korisnici));
    });
}
exports.getKorisnici = getKorisnici;
function postKorisnici(zahtjev, odgovor) {
    odgovor.type("application/json");
    let podaci = zahtjev.body;
    let kdao = new korisnikDAO_1.KorisnikDAO();
    kdao.dodaj(podaci).then((poruka) => {
        if (!(typeof poruka == "boolean")) {
            odgovor.status(409);
            odgovor.json(poruka);
            return;
        }
        odgovor.send(JSON.stringify(poruka));
    });
}
exports.postKorisnici = postKorisnici;
function putKorisnici(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}
exports.putKorisnici = putKorisnici;
function deleteKorisnici(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}
exports.deleteKorisnici = deleteKorisnici;
function getKorisnik(zahtjev, odgovor) {
    odgovor.type("application/json");
    let kdao = new korisnikDAO_1.KorisnikDAO();
    let korime = "";
    let id = -1;
    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime'];
    }
    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
        kdao.daj("", id).then((korisnik) => {
            odgovor.send(JSON.stringify(korisnik));
        });
        return;
    }
    kdao.daj(korime, -1).then((korisnik) => {
        odgovor.send(JSON.stringify(korisnik));
    });
}
exports.getKorisnik = getKorisnik;
function postKorisnik(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
}
exports.postKorisnik = postKorisnik;
function putKorisnik(zahtjev, odgovor) {
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
}
exports.putKorisnik = putKorisnik;
function deleteKorisnik(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}
exports.deleteKorisnik = deleteKorisnik;
function getKorisnikAktivacija(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}
exports.getKorisnikAktivacija = getKorisnikAktivacija;
function postKorisnikAktivacija(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
}
exports.postKorisnikAktivacija = postKorisnikAktivacija;
function putKorisnikAktivacija(zahtjev, odgovor) {
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
}
exports.putKorisnikAktivacija = putKorisnikAktivacija;
function deleteKorisnikAktivacija(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}
exports.deleteKorisnikAktivacija = deleteKorisnikAktivacija;
function getKorisnikPrijava(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}
exports.getKorisnikPrijava = getKorisnikPrijava;
function postKorisnikPrijava(zahtjev, odgovor) {
    odgovor.type("application/json");
    let kdao = new korisnikDAO_1.KorisnikDAO();
    let korime = "";
    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime'];
    }
    kdao.daj(korime).then((korisnik) => {
        if (korisnik != null && korisnik.lozinka == zahtjev.body.lozinka)
            odgovor.send(JSON.stringify(korisnik));
        else {
            odgovor.status(401);
            odgovor.send(JSON.stringify({ greska: "Krivi podaci!" }));
        }
    });
}
exports.postKorisnikPrijava = postKorisnikPrijava;
function putKorisnikPrijava(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}
exports.putKorisnikPrijava = putKorisnikPrijava;
function deleteKorisnikPrijava(zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}
exports.deleteKorisnikPrijava = deleteKorisnikPrijava;
