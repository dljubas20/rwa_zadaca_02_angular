"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const konst = require("../konstante.js");
const express_1 = __importDefault(require("express"));
const sesija = require(konst.dirModula + 'express-session');
const kolacici = require(konst.dirModula + 'cookie-parser');
const Konfiguracija = require("../konfiguracija");
const htmlUpravitelj = require("./htmlUpravitelj.js");
const fetchUpravitelj = require("./fetchUpravitelj.js");
const server = (0, express_1.default)();
const cors = require(konst.dirModula + 'cors');
const jwt = require(konst.dirModula + 'jsonwebtoken');
let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    process.exit();
});
function pokreniServer() {
    server.use(express_1.default.urlencoded({ extended: true }));
    server.use(express_1.default.json());
    server.use(kolacici());
    server.use(sesija({
        secret: konst.tajniKljucSesija,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 3 },
        resave: false
    }));
    server.use(cors({
        origin: "http://localhost:4200",
        optionsSuccessStatus: 200
    }));
    const port = konf.dajKonf()['app.port'];
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    zaglavlje.set("Authorization", JSON.stringify({
        token: jwt.sign({ korime: konf.dajKonf()['rest.korime'] }, konst.tajniKljucJWT, { expiresIn: "15s" })
    }));
    fetch("http://localhost:" + konf.dajKonf()['rest.port'], {
        method: 'GET',
        headers: zaglavlje
    }).then((odgovor) => {
        if (odgovor.status == 400 || odgovor.status == 401) {
            console.log("Problem kod spajanja na udaljeni servis. Server se gasi.");
            process.exit();
        }
    }).catch((greska) => {
        console.log("Udaljeni servis nedostupan. Server se gasi.");
        process.exit();
    });
    server.use("/", express_1.default.static("angular/"));
    pripremiPutanjePocetna();
    pripremiPutanjeAutentifikacija();
    pripremiPutanjePretrazivanjeFilmova();
    pripremiPutanjeKorisnik();
    server.get("/dokumentacija", htmlUpravitelj.dokumentacija);
    server.get("/filmoviPregled", htmlUpravitelj.filmoviPregled);
    server.get("/dajSveFilmove", fetchUpravitelj.dajSveFilmove);
    server.use("/dokumentacija", express_1.default.static(__dirname + "/../dokumentacija"));
    server.use("/materijali", express_1.default.static(__dirname + "/materijali"));
    server.use("/js", express_1.default.static(__dirname + "/js"));
    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        var poruka = { greska: "Stranica nije pronađena!" };
        odgovor.send(JSON.stringify(poruka));
    });
    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}
function pripremiPutanjePocetna() {
    server.get("/", htmlUpravitelj.pocetna);
    server.get('/dajSveZanrove', fetchUpravitelj.dajSveZanrove);
    server.get('/dajDvaFilma', fetchUpravitelj.dajDvaFilma);
}
function pripremiPutanjePretrazivanjeFilmova() {
    server.get('/filmoviPretrazivanje', htmlUpravitelj.filmoviPretrazivanje);
    server.post('/filmoviPretrazivanje', fetchUpravitelj.filmoviPretrazivanje);
    server.post('/dodajFilm', fetchUpravitelj.dodajFilm);
}
function pripremiPutanjeAutentifikacija() {
    server.get("/registracija", htmlUpravitelj.registracija);
    server.post("/registracija", htmlUpravitelj.registracija);
    server.get("/odjava", htmlUpravitelj.odjava);
    server.get("/prijava", htmlUpravitelj.prijava);
    server.post("/prijava", htmlUpravitelj.prijava);
    server.get("/getJWT", fetchUpravitelj.getJWT);
    server.get("/generirajToken", fetchUpravitelj.generirajToken);
    server.get("/aktivacijaRacuna", fetchUpravitelj.aktvacijaRacuna);
}
function pripremiPutanjeKorisnik() {
    server.get("/profil", htmlUpravitelj.profil);
    server.post("/profil", htmlUpravitelj.profil);
}
