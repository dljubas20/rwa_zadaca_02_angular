import { FilmDAO } from "./filmDAO";
const Konfiguracija = require("../../konfiguracija.js");
import type { Request, Response } from "express";

const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

export function getFilmovi(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let parametri = {
        stranica: zahtjev.query['stranica'],
        brojFilmova: konf.dajKonf()['app.broj.stranica'],
        datum: zahtjev.query['datum'],
        idZanr: zahtjev.query['zanr'],
        dioNazivFilma: zahtjev.query['naziv'],
        sortiraj: zahtjev.query['sortiraj']
    };

    if(parametri.stranica == null || parametri.brojFilmova == null){
        odgovor.status(417);
        odgovor.send({greska: "neocekivani podaci"});
        return;
    }

    let fdao = new FilmDAO();
    fdao.dajSve(parametri).then((filmovi : Array<any> | any) => {
        odgovor.send(JSON.stringify(filmovi));
    });
}

export function postFilmovi(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let fdao = new FilmDAO();
    fdao.dodaj(zahtjev.body).then((uspjeh : boolean) => {
        odgovor.send(JSON.stringify(uspjeh));
    });
}

export function putFilmovi(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

export function deleteFilmovi(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

export function getFilm(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let id : number = -1;

    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }

    let fdao = new FilmDAO();
    fdao.dajFilm(id).then((film : any) => {
        odgovor.send(JSON.stringify(film));
    });
}

export function postFilm(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
}

export function putFilm(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let id : number = -1;

    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }

    let podaci = zahtjev.body;

    let fdao = new FilmDAO();
    fdao.azuriraj(id, podaci).then((poruka : any) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

export function deleteFilm(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let id : number = -1;

    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }

    let fdao = new FilmDAO();
    fdao.obrisi(id).then((poruka : any) => {
        odgovor.send(JSON.stringify(poruka));
    });
}