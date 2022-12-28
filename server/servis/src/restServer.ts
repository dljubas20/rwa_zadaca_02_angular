const Konfiguracija = require("../../konfiguracija.js");
const ProvjeraKonfiguracije = require("../../provjeraKonfiguracije.js");
import * as restKorisnik from "./restKorisnik";
import * as restFilm from "./restFilm";
import * as restZanr from "./restZanr";
import { RestTMDB } from "./restTMDB";
import type { Request, Response, NextFunction } from "express";
import express from "express";

const server = express();

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska : any) => {
    if(process.argv.length == 2){
        console.error("Potrebno je dati naziv datoteke");
    } else {
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    }
    process.exit();
});

function pokreniServer() : void {
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());

    const port = konf.dajKonf()['rest.port'];

    server.all("*", async (zahtjev : Request, odgovor : Response, dalje : NextFunction) => {
            let provjera = new ProvjeraKonfiguracije();
        
            await provjera.provjeriKorime(zahtjev.query['korime']);
            await provjera.provjeriLozinku(zahtjev.query['lozinka']);

            if (provjera.dajGreskeKorime() != "" || provjera.dajGreskeLozinka() != "" || zahtjev.query['korime'] == null || zahtjev.query['lozinka'] == null) {
                odgovor.status(400);
                odgovor.send({ greska: "nevaljani zahtjev"});
            }
            else if (zahtjev.query['korime'] != konf.dajKonf()['rest.korime'] || zahtjev.query['lozinka'] != konf.dajKonf()['rest.lozinka']) {
                odgovor.status(401);
                console.log(provjera.dajGreskeLozinka());
                odgovor.send({ greska: "neautoriziran pristup"});
            }
            else {
                dalje();
            }
    });

    pripremiPutanjeKorisnici();
    pripremiPutanjeTMDB();
    pripremiPutanjeFilmovi();
    pripremiPutanjeZanrovi();

    server.use((zahtjev : Request, odgovor : Response) => {
        odgovor.status(404);
        let poruka = {
            "greska" : "nema resursa"
        };
        odgovor.json(poruka);
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

function pripremiPutanjeTMDB() : void {
    let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
    
    server.get("/api/tmdb/zanr", restTMDB.getZanr.bind(restTMDB));
    server.post("/api/tmdb/zanr", restTMDB.postZanr.bind(restTMDB));
    server.put("/api/tmdb/zanr", restTMDB.putZanr.bind(restTMDB));
    server.delete("/api/tmdb/zanr", restTMDB.deleteZanr.bind(restTMDB));

    server.get("/api/tmdb/filmovi", restTMDB.getFilmovi.bind(restTMDB));
    server.post("/api/tmdb/filmovi", restTMDB.postFilmovi.bind(restTMDB));
    server.put("/api/tmdb/filmovi", restTMDB.putFilmovi.bind(restTMDB));
    server.delete("/api/tmdb/filmovi", restTMDB.deleteFilmovi.bind(restTMDB));
}

function pripremiPutanjeKorisnici() : void {
    server.get("/api/korisnici", restKorisnik.getKorisnici);
    server.post("/api/korisnici", restKorisnik.postKorisnici);
    server.put("/api/korisnici", restKorisnik.putKorisnici);
    server.delete("/api/korisnici", restKorisnik.deleteKorisnici);

    server.get("/api/korisnici/:korime", restKorisnik.getKorisnik);
    server.post("/api/korisnici/:korime", restKorisnik.postKorisnik);
    server.put("/api/korisnici/:korime", restKorisnik.putKorisnik);
    server.delete("/api/korisnici/:korime", restKorisnik.deleteKorisnik);

    server.get("/api/korisnici/:korime/aktivacija", restKorisnik.getKorisnikAktivacija);
    server.post("/api/korisnici/:korime/aktivacija", restKorisnik.postKorisnikAktivacija);
    server.put("/api/korisnici/:korime/aktivacija", restKorisnik.putKorisnikAktivacija);
    server.delete("/api/korisnici/:korime/aktivacija", restKorisnik.deleteKorisnikAktivacija);

    server.get("/api/korisnici/:korime/prijava", restKorisnik.getKorisnikPrijava);
    server.post("/api/korisnici/:korime/prijava", restKorisnik.postKorisnikPrijava);
    server.put("/api/korisnici/:korime/prijava", restKorisnik.putKorisnikPrijava);
    server.delete("/api/korisnici/:korime/prijava", restKorisnik.deleteKorisnikPrijava);
}

function pripremiPutanjeFilmovi() : void {
    server.get("/api/filmovi", restFilm.getFilmovi);
    server.post("/api/filmovi", restFilm.postFilmovi);
    server.put("/api/filmovi", restFilm.putFilmovi);
    server.delete("/api/filmovi", restFilm.deleteFilmovi);

    server.get("/api/filmovi/:id", restFilm.getFilm);
    server.post("/api/filmovi/:id", restFilm.postFilm);
    server.put("/api/filmovi/:id", restFilm.putFilm);
    server.delete("/api/filmovi/:id", restFilm.deleteFilm);
}

function pripremiPutanjeZanrovi() : void {
    server.get("/api/zanr", restZanr.getZanrovi);
    server.post("/api/zanr", restZanr.postZanrovi);
    server.put("/api/zanr", restZanr.putZanrovi);
    server.delete("/api/zanr", restZanr.deleteZanrovi);

    server.get("/api/zanr/:id", restZanr.getZanr);
    server.post("/api/zanr/:id", restZanr.postZanr);
    server.put("/api/zanr/:id", restZanr.putZanr);
    server.delete("/api/zanr/:id", restZanr.deleteZanr);
}