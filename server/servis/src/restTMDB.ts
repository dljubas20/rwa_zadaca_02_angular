import { TMDBklijent } from "./klijentTMDB";
const Konfiguracija = require("../../konfiguracija.js");
import type { Request, Response } from "express";


const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

export class RestTMDB {
    private tmdbKlijent : TMDBklijent;

    constructor(api_kljuc : string) {
        this.tmdbKlijent = new TMDBklijent(api_kljuc);
        console.log(api_kljuc);
        
        //this.tmdbKlijent.dohvatiFilm(500).then(console.log).catch(console.log);
    }

    getZanr(zahtjev : Request, odgovor : Response) {
        odgovor.type("application/json");
        
        console.log(this);
        this.tmdbKlijent.dohvatiZanrove().then((zanrovi) => {
            //console.log(zanrovi);
            
            odgovor.send(zanrovi);
        }).catch((greska) => {
            odgovor.json(greska);
        });
    }

    postZanr(zahtjev : Request, odgovor : Response) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }

    putZanr(zahtjev : Request, odgovor : Response) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }

    deleteZanr(zahtjev : Request, odgovor : Response) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }

    getFilmovi(zahtjev : Request, odgovor : Response) {
        odgovor.type("application/json")
        
        console.log(this);
        
        let stranica : number = parseInt(zahtjev.query['stranica'] as string);
        let rijeci : string = zahtjev.query['kljucnaRijec'] as string;

        if(stranica == null || rijeci==null){
            odgovor.status(417);
            odgovor.send({greska: "neocekivani podaci"});
            return;
        }

        this.tmdbKlijent.pretraziFilmove(rijeci, stranica).then((filmovi) => {
            //console.log(filmovi);
            odgovor.send(filmovi);
        }).catch((greska) => {
            console.log("GREŠKA")
            odgovor.json(greska);
        });
    }

    postFilmovi(zahtjev : Request, odgovor : Response) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }

    putFilmovi(zahtjev : Request, odgovor : Response) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }

    deleteFilmovi(zahtjev : Request, odgovor : Response) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }
}