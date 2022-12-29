const konst= require("../konstante.js");
import express, { Request, Response } from "express";
const sesija = require(konst.dirModula+'express-session')
const kolacici = require(konst.dirModula+'cookie-parser')
const Konfiguracija = require("../konfiguracija");
const htmlUpravitelj = require("./htmlUpravitelj.js");
const fetchUpravitelj = require("./fetchUpravitelj.js");
const server = express();
const cors = require(konst.dirModula + 'cors');
const jwt = require(konst.dirModula + 'jsonwebtoken');

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska : any) => {
    console.log(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    process.exit()
});

function pokreniServer() {
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(kolacici())
    server.use(sesija({
        secret: konst.tajniKljucSesija, 
        saveUninitialized: true,
        cookie: {  maxAge: 1000 * 60 * 60 * 3 },
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

    server.use("/", express.static("angular/"));

    pripremiPutanjePocetna();
    pripremiPutanjeAutentifikacija();
    pripremiPutanjePretrazivanjeFilmova();
    pripremiPutanjeKorisnik();
    server.get("/dokumentacija", htmlUpravitelj.dokumentacija);
    server.get("/filmoviPregled", htmlUpravitelj.filmoviPregled);
    server.get("/dajSveFilmove", fetchUpravitelj.dajSveFilmove);

    server.use("/dokumentacija", express.static(__dirname + "/../dokumentacija"));
    server.use("/materijali", express.static(__dirname + "/materijali"));

    server.use("/js", express.static(__dirname + "/js"));
    server.use((zahtjev : Request, odgovor : Response) => {
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