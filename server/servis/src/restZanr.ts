const ZanrDAO = require("./zanrDAO.js");
const Konfiguracija = require("../konfiguracija.js");
import type { Request, Response } from "express";

const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

exports.getZanrovi = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let zdao = new ZanrDAO();
    zdao.dajSve().then((zanrovi : Array<any>) => {
        odgovor.send(JSON.stringify(zanrovi));
    });
}

exports.postZanrovi = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let podaci = zahtjev.body;

    let zdao = new ZanrDAO();
    zdao.dodaj(podaci).then((poruka : boolean) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.putZanrovi = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" };
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteZanrovi = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let zdao = new ZanrDAO();
        zdao.obrisi().then((poruka : boolean) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.getZanr = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let id = zahtjev.params['id'];

    let zdao = new ZanrDAO();
    zdao.dajZanr(id).then((poruka : any) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.postZanr = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" };
    odgovor.send(JSON.stringify(poruka));
}

exports.putZanr = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let id = zahtjev.params['id'];
    let podaci = zahtjev.body;

    let zdao = new ZanrDAO();
    zdao.azurirajZanr(id, podaci).then((poruka : boolean) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.deleteZanr = function (zahtjev : Request, odgovor : Response) {
    odgovor.type("application/json");

    let id = zahtjev.params['id'];

    let zdao = new ZanrDAO();
    zdao.obrisiZanr(id).then((poruka : boolean) => {
        odgovor.send(JSON.stringify(poruka));
    }).catch(() => {
        odgovor.send(JSON.stringify({greska: "žanr nije moguće izbrisati jer sadrži filmove."}));
    });
}