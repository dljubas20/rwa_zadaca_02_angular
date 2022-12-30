const FilmoviPretrazivanje = require("./filmoviPretrazivanje.js");
const jwt = require("./moduli/jwt.js");
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
        return
    } 
    odgovor.status(401);
    odgovor.send({ greska: "nemam token!" });
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

