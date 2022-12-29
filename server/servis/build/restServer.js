"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Konfiguracija = require("../../konfiguracija.js");
const konst = require("../../konstante.js");
const restKorisnik = __importStar(require("./restKorisnik"));
const restFilm = __importStar(require("./restFilm"));
const restZanr = __importStar(require("./restZanr"));
const restTMDB_1 = require("./restTMDB");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server = (0, express_1.default)();
let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    if (process.argv.length == 2) {
        console.error("Potrebno je dati naziv datoteke");
    }
    else {
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    }
    process.exit();
});
function pokreniServer() {
    server.use(express_1.default.urlencoded({ extended: true }));
    server.use(express_1.default.json());
    server.use((0, cors_1.default)({
        origin: "http://localhost:4200",
        optionsSuccessStatus: 200
    }));
    const port = konf.dajKonf()['rest.port'];
    server.all("*", async (zahtjev, odgovor, dalje) => {
        if (zahtjev.headers.authorization !== undefined) {
            try {
                jsonwebtoken_1.default.verify(JSON.parse(zahtjev.headers.authorization).token, konst.tajniKljucJWT);
                dalje();
            }
            catch (e) {
                odgovor.status(401);
                odgovor.send({ greska: "neautoriziran pristup" });
            }
        }
        else {
            odgovor.status(401);
            odgovor.send({ greska: "neautoriziran pristup" });
        }
    });
    pripremiPutanjeKorisnici();
    pripremiPutanjeTMDB();
    pripremiPutanjeFilmovi();
    pripremiPutanjeZanrovi();
    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        let poruka = {
            "greska": "nema resursa"
        };
        odgovor.json(poruka);
    });
    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}
function pripremiPutanjeTMDB() {
    let restTMDB = new restTMDB_1.RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
    server.get("/api/tmdb/zanr", restTMDB.getZanr.bind(restTMDB));
    server.post("/api/tmdb/zanr", restTMDB.postZanr.bind(restTMDB));
    server.put("/api/tmdb/zanr", restTMDB.putZanr.bind(restTMDB));
    server.delete("/api/tmdb/zanr", restTMDB.deleteZanr.bind(restTMDB));
    server.get("/api/tmdb/filmovi", restTMDB.getFilmovi.bind(restTMDB));
    server.post("/api/tmdb/filmovi", restTMDB.postFilmovi.bind(restTMDB));
    server.put("/api/tmdb/filmovi", restTMDB.putFilmovi.bind(restTMDB));
    server.delete("/api/tmdb/filmovi", restTMDB.deleteFilmovi.bind(restTMDB));
}
function pripremiPutanjeKorisnici() {
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
function pripremiPutanjeFilmovi() {
    server.get("/api/filmovi", restFilm.getFilmovi);
    server.post("/api/filmovi", restFilm.postFilmovi);
    server.put("/api/filmovi", restFilm.putFilmovi);
    server.delete("/api/filmovi", restFilm.deleteFilmovi);
    server.get("/api/filmovi/:id", restFilm.getFilm);
    server.post("/api/filmovi/:id", restFilm.postFilm);
    server.put("/api/filmovi/:id", restFilm.putFilm);
    server.delete("/api/filmovi/:id", restFilm.deleteFilm);
}
function pripremiPutanjeZanrovi() {
    server.get("/api/zanr", restZanr.getZanrovi);
    server.post("/api/zanr", restZanr.postZanrovi);
    server.put("/api/zanr", restZanr.putZanrovi);
    server.delete("/api/zanr", restZanr.deleteZanrovi);
    server.get("/api/zanr/:id", restZanr.getZanr);
    server.post("/api/zanr/:id", restZanr.postZanr);
    server.put("/api/zanr/:id", restZanr.putZanr);
    server.delete("/api/zanr/:id", restZanr.deleteZanr);
}
