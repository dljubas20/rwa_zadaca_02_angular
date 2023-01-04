const konst= require("../konstante.js");
const express = require(konst.dirModula + 'express');
const sesija = require(konst.dirModula+'express-session')
const kolacici = require(konst.dirModula+'cookie-parser')
const Konfiguracija = require("../konfiguracija");
const htmlUpravitelj = require("./htmlUpravitelj.js");
const fetchUpravitelj = require("./fetchUpravitelj.js");
const server = express();
const cors = require(konst.dirModula + 'cors');
const jwt = require(konst.dirModula + 'jsonwebtoken');

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
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
    
    pripremiPutanjeAutentifikacija();
    pripremiPutanjePretrazivanjeFilmova();
    pripremiPutanjeKorisnik();

    server.use("/posteri", express.static("posteri/"));
    server.use(express.static("angular/"));
    server.get("*", (zahtjev, odgovor) => {
        odgovor.sendFile(__dirname + '/angular/');
    });

    server.get("/filmoviPregled", htmlUpravitelj.filmoviPregled);
    server.get("/dajSveFilmove", fetchUpravitelj.dajSveFilmove);

    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        var poruka = { greska: "Stranica nije pronađena!" };
        odgovor.send(JSON.stringify(poruka));
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

function pripremiPutanjePretrazivanjeFilmova() {
    server.get('/api/filmoviPretrazivanje', htmlUpravitelj.filmoviPretrazivanje);
    server.post('/api/filmoviPretrazivanje', fetchUpravitelj.filmoviPretrazivanje);
    server.post('/api/dodajFilm', fetchUpravitelj.dodajFilm);
    server.get('/api/preuzmiPoster/:putanjaPoster', fetchUpravitelj.preuzmiPoster);
    server.get('/api/filmoviSlikeKorisnici', fetchUpravitelj.getSlikeKorisnici);
}

function pripremiPutanjeAutentifikacija() {
    server.post("/api/registracija", htmlUpravitelj.registracija);
    server.get("/api/odjava", htmlUpravitelj.odjava);
    server.get("/api/prijava", htmlUpravitelj.prijava);
    server.post("/api/prijava", htmlUpravitelj.prijava);
    server.get("/api/getJWT", fetchUpravitelj.getJWT);
    server.get("/api/getSesijaKorisnik", fetchUpravitelj.getSesijaKorisnik);
    server.get("/api/generirajToken", fetchUpravitelj.generirajToken);
    server.get("/api/aktivacijaRacuna", fetchUpravitelj.aktvacijaRacuna);
}

function pripremiPutanjeKorisnik() {
    server.get("/api/profil", htmlUpravitelj.profil);
    server.post("/api/profil", htmlUpravitelj.profil);
}