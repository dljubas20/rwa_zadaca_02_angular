import { KorisnikDAO } from "./korisnikDAO";
const Konfiguracija = require("../../konfiguracija.js");
import type { Request, Response } from "express";

const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

export function getKorisnici(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let kdao = new KorisnikDAO();
    kdao.dajSve().then((korisnici) => {
        odgovor.send(JSON.stringify(korisnici));
    });
}

export function postKorisnici(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");
    
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    kdao.dodaj(podaci).then((poruka) => {
        if (!(typeof poruka == "boolean")) {
            odgovor.status(409);
            odgovor.json(poruka);
            return;
        }
        odgovor.send(JSON.stringify(poruka));
    });
}

export function putKorisnici(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

export function deleteKorisnici(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

export function getKorisnik(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let kdao = new KorisnikDAO();
    let korime : string = "";
    let id : number = -1;

    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime']
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

export function postKorisnik(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
}

export function putKorisnik(zahtjev : Request, odgovor : Response) {
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

export function deleteKorisnik(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

export function getKorisnikAktivacija(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

export function postKorisnikAktivacija(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
}

export function putKorisnikAktivacija(zahtjev : Request, odgovor : Response) {
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

export function deleteKorisnikAktivacija(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

export function getKorisnikPrijava(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

export function postKorisnikPrijava(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let kdao = new KorisnikDAO();
    let korime : string = "";

    if (zahtjev.params['korime'] !== undefined) {
        korime = zahtjev.params['korime']
    }

    kdao.daj(korime).then((korisnik) => {
        if(korisnik!=null && korisnik.lozinka==zahtjev.body.lozinka)
            odgovor.send(JSON.stringify(korisnik));
        else{ 
            odgovor.status(401)
            odgovor.send(JSON.stringify({greska: "Krivi podaci!"}))
        }
    });
}

export function putKorisnikPrijava(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

export function deleteKorisnikPrijava(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}