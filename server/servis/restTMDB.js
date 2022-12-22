const TMDBklijent = require("./klijentTMDB.js");
const Konfiguracija = require("../konfiguracija.js");
const ProvjeraKonfiguracije = require("../provjeraKonfiguracije.js");

const konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

class RestTMDB {

    constructor(api_kljuc) {
        this.tmdbKlijent = new TMDBklijent(api_kljuc);
        console.log(api_kljuc);
        
        //this.tmdbKlijent.dohvatiFilm(500).then(console.log).catch(console.log);
    }

    getZanr(zahtjev, odgovor) {
        odgovor.type("application/json");
        
        console.log(this);
        this.tmdbKlijent.dohvatiZanrove().then((zanrovi) => {
            //console.log(zanrovi);
            
            odgovor.send(zanrovi);
        }).catch((greska) => {
            odgovor.json(greska);
        });
    }

    postZanr(zahtjev, odgovor) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }

    putZanr(zahtjev, odgovor) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }

    deleteZanr(zahtjev, odgovor) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }

    getFilmovi(zahtjev, odgovor) {
        odgovor.type("application/json")
        
        console.log(this);
        
        let stranica = zahtjev.query.stranica;
        let rijeci = zahtjev.query.kljucnaRijec;

        if(stranica == null || rijeci==null){
            odgovor.status("417");
            odgovor.send({greska: "neocekivani podaci"});
            return;
        }

        this.tmdbKlijent.pretraziFilmove(rijeci,stranica).then((filmovi) => {
            //console.log(filmovi);
            odgovor.send(filmovi);
        }).catch((greska) => {
            console.log("GREŠKA")
            odgovor.json(greska);
        });
    }

    postFilmovi(zahtjev, odgovor) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }

    putFilmovi(zahtjev, odgovor) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }

    deleteFilmovi(zahtjev, odgovor) {
        odgovor.type("application/json");

        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        odgovor.send(JSON.stringify(poruka));
    }
}

module.exports = RestTMDB;