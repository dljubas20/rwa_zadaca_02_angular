const FilmoviPretrazivanje = require("./filmoviPretrazivanje.js");
const jwt = require("./moduli/jwt.js");
const kodovi = require("./moduli/kodovi.js");
const konst = require("../konstante.js");
const noviFetch = require("./noviFetch.js");
const ds = require("fs");
const formidable = require('formidable');
const dateformat = require("./noviDateFormat");
const Autentifikacija = require("./autentifikacija.js");
const Konfiguracija = require("../konfiguracija");
let auth = new Autentifikacija();
let fp = new FilmoviPretrazivanje();
let konf = new Konfiguracija();

exports.aktvacijaRacuna = async function (zahtjev, odgovor) {
    console.log(zahtjev.query);
    let korime = zahtjev.query.korime;
    let kod = zahtjev.query.kod;

    let poruka = await auth.aktivirajKorisnickiRacun(korime, kod);
    console.log(poruka)

    if (poruka.status == 200) {
        odgovor.send(await poruka.text());
    } else {
        odgovor.send(await poruka.text());
    }
}

exports.dajSveFilmove = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dohvatiSveFilmove());
}

exports.getJWT = async function (zahtjev, odgovor) {
    odgovor.type('json')
    if (zahtjev.session.jwt != null) {
        let k = { korime: jwt.dajTijelo(zahtjev.session.jwt).korime };
        let noviToken = jwt.kreirajToken(k)
        odgovor.send({ ok: noviToken });
        return;
    } 
    odgovor.status(401);
    odgovor.send({ greska: "nemam token!" });
}

exports.getSesijaKorisnik = async function (zahtjev, odgovor) {
    odgovor.type('json')
    if (zahtjev.session.jwt != null) {
        odgovor.send({ 
            ime: zahtjev.session.korisnik.ime,
            prezime: zahtjev.session.korisnik.prezime,
            id: zahtjev.session.korisnik.id,
            korime: zahtjev.session.korime,
            email: zahtjev.session.email,
            admin: zahtjev.session.admin
        });
        
        return;
    } 
    odgovor.status(401);
    odgovor.send({ greska: "korisnik nije prijavljen!" });
}

exports.generirajToken = async function (zahtjev, odgovor) {
    odgovor.type('json')
    konf.ucitajKonfiguraciju().then(() => {
        let k = { korime: konf.dajKonf()['rest.korime'] };
        let noviToken = jwt.kreirajToken(k)
        odgovor.send({ token: noviToken });
    });
    return;
}

exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
        if (!jwt.provjeriToken(zahtjev)) {
            odgovor.status(401);
            odgovor.json({ greska: "neautorizirani pristup" });
        } else {
            let str = zahtjev.query.str;
            let filter = zahtjev.query.filter;
            console.log(zahtjev.query)
            odgovor.json(await fp.dohvatiFilmove(str,filter))
        }
}

exports.dodajFilm = async function (zahtjev, odgovor) {
    if (!jwt.provjeriToken(zahtjev)) {
        odgovor.status(401);
        odgovor.json({ greska: "neautorizirani pristup" });
     } else {
        //TODO obradi zahtjev

        odgovor.json({ok: "OK"});
     }
}

exports.preuzmiPoster = async function (zahtjev, odgovor) {
    if (!jwt.provjeriToken(zahtjev)) {
        odgovor.status(401);
        odgovor.json({ greska: "neautorizirani pristup" });
     } else {
        let putanjaPoster = konst.putanjaPosteri + "/" + zahtjev.params.putanjaPoster;

        let datoteka = ds.createWriteStream("./posteri/" + zahtjev.params.putanjaPoster);

        let o = await noviFetch.fetch(putanjaPoster);

        o.body.pipe(datoteka);

        datoteka.on("finish", () => {
            datoteka.close();
            odgovor.json({ok: "OK"});
        });
        datoteka.on("error", () => {
            odgovor.status(404);
            odgovor.json({greska: "greska u preuzimanju postera"});
        });
     }
}

exports.postaviSliku = async function (zahtjev, odgovor) {
    let forma = new formidable.IncomingForm();
    if (zahtjev.session.korime == null) {
        odgovor.redirect("/prijava");
    }

    forma.parse(zahtjev, async (err, polja, datoteke) => {
        if (err) {
            console.log(err);
            return;
        }
        let privremenaPutanja = datoteke.slika.filepath;

        if (!ds.existsSync("slike")) {
            ds.mkdirSync("slike");
        }
        
        if (!ds.existsSync("slike/" + polja.idFilma)) {
            ds.mkdirSync("slike/" + polja.idFilma);
        }
        
        if (!ds.existsSync("slike/" + polja.idFilma + "/" + zahtjev.session.korime)) {
            ds.mkdirSync("slike/" + polja.idFilma + "/" + zahtjev.session.korime);
        }
        
        let novaPutanja = "slike/" + polja.idFilma + "/" + zahtjev.session.korime;
        
        let nazivSlike = "";
        let datumSlike = await dateformat.dateFormat(Date.now(), "yyyy-MM-dd");


        let hash = kodovi.kreirajSHA256(datumSlike, zahtjev.session.korime);
        
        nazivSlike = datumSlike.toString() + "_" + hash.slice(kodovi.dajNasumceBroj(0, 5), kodovi.dajNasumceBroj(35, 40)) + "." + datoteke.slika.mimetype.split("/")[1];
        console.log(nazivSlike);

        ds.copyFileSync(privremenaPutanja, novaPutanja + "/" + nazivSlike);

        odgovor.redirect("/filmovi_pregled/" + polja.idFilma + "/galerija");
        return;
    });
}

exports.getSlikeKorisnici = async function (zahtjev, odgovor) {
    if (!jwt.provjeriToken(zahtjev)) {
        odgovor.status(401);
        odgovor.json({ greska: "neautorizirani pristup" });
    } else {
        if (zahtjev.params.idFilma == undefined) {
             odgovor.status(404);
             odgovor.json({greska: "nema resursa!"});
        }

        let idFilma = zahtjev.params.idFilma;
        
        if (!ds.existsSync("slike/")) {
            odgovor.status(404);
            odgovor.json({greska: "nema resursa!"});
            return;
        }
        
        if (!ds.existsSync("slike/" + idFilma)) {
            odgovor.status(404);
            odgovor.json({greska: "nema resursa!"});
            return;
        }

        let direktoriji = (await ds.promises.readdir("slike/" + idFilma, { withFileTypes: true })).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

        await new Promise(async (uspjeh, neuspjeh) => {
            let rezultat = [];
            for (let korime of direktoriji) {
                if (!ds.existsSync("slike/" + idFilma + "/" + korime)) {
                    continue;
                }
                
                let slike = (await (ds.promises.readdir("slike/" + idFilma + "/" + korime, { withFileTypes: true }))).filter(dirent => !dirent.isDirectory()).map(dirent => dirent.name);
                
                rezultat.push({
                    korime: korime,
                    naziviSlika: slike
                });
            }

            if (rezultat.length > 0) {
                uspjeh(rezultat);
            }
            else {
                neuspjeh();
            }

        }).then((rezultat) => {
            odgovor.json(rezultat);
        }).catch(() => {
            odgovor.status(404);
            odgovor.json({greska: "nema resursa!"});
        });
     }
}

exports.provjeriRecaptchu = async function(zahtjev, odgovor) {
    let token = zahtjev.body.token;
    
    let uspjeh = await auth.provjeriRecaptchu(token);

    odgovor.json({uspjeh: uspjeh});
}