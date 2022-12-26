import { KorisnikDAO } from "./korisnikDAO";
const Konfiguracija = require("../../konfiguracija.js");
import type { Request, Response } from "express";

const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

exports.getKorisnici = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let kdao = new KorisnikDAO();
    kdao.dajSve().then((korisnici) => {
        console.log(korisnici);
        odgovor.send(JSON.stringify(korisnici));
    });
}

exports.postKorisnici = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");
    
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    kdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.putKorisnici = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteKorisnici = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

exports.getKorisnik = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let kdao = new KorisnikDAO();
    let korime : string = "";

    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime']
    }

    kdao.daj(korime).then((korisnik) => {
        console.log(korisnik);
        odgovor.send(JSON.stringify(korisnik));
    });
}

exports.postKorisnik = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
}

exports.putKorisnik = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let korime : string = "";

    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime']
    }

    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    kdao.azuriraj(korime, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.deleteKorisnik = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

exports.getKorisnikAktivacija = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

exports.postKorisnikAktivacija = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
}

exports.putKorisnikAktivacija = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let kdao = new KorisnikDAO();
    let korime : string = "";

    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime']
    }
    let podaci : any = zahtjev.body;
    
    kdao.aktiviraj(korime, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.deleteKorisnikAktivacija = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

exports.getKorisnikPrijava = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

exports.postKorisnikPrijava = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let kdao = new KorisnikDAO();
    let korime : string = "";

    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime']
    }

    kdao.daj(korime).then((korisnik) => {
        console.log(korisnik)
        console.log(zahtjev.body)
        if(korisnik!=null && korisnik.lozinka==zahtjev.body.lozinka)
            odgovor.send(JSON.stringify(korisnik));
        else{ 
            odgovor.status(401)
            odgovor.send(JSON.stringify({greska: "Krivi podaci!"}))
        }
    });
}

exports.putKorisnikPrijava = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteKorisnikPrijava = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}