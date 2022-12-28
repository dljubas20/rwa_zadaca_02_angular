import { ZanrDAO } from "./zanrDAO";
const Konfiguracija = require("../../konfiguracija.js");
import type { Request, Response } from "express";

const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

export function getZanrovi(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let zdao = new ZanrDAO();
    zdao.dajSve().then((zanrovi : Array<any>) => {
        odgovor.send(JSON.stringify(zanrovi));
    });
}

export function postZanrovi(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let podaci = zahtjev.body;

    let zdao = new ZanrDAO();
    zdao.dodaj(podaci).then((poruka : boolean) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

export function putZanrovi(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

export function deleteZanrovi(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let zdao = new ZanrDAO();
        zdao.obrisi().then((poruka : boolean) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

export function getZanr(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let id : number = -1;

    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }

    let zdao = new ZanrDAO();
    zdao.dajZanr(id).then((poruka : any) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

export function postZanr(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
}

export function putZanr(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");
    
    let id : number = -1;

    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }
    
    let podaci = zahtjev.body;

    let zdao = new ZanrDAO();
    zdao.azurirajZanr(id, podaci).then((poruka : boolean) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

export function deleteZanr(zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");
    
    let id : number = -1;

    if (zahtjev.params['id'] !== undefined) {
        id = parseInt(zahtjev.params['id']);
    }

    let zdao = new ZanrDAO();
    zdao.obrisiZanr(id).then((poruka : boolean) => {
        odgovor.send(JSON.stringify(poruka));
    }).catch(() => {
        odgovor.send(JSON.stringify({greska: "žanr nije moguće izbrisati jer sadrži filmove."}));
    });
}