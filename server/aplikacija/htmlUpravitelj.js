const ds = require("fs/promises");
const jwt = require("./moduli/jwt.js")
const totp = require("./moduli/totp.js")
const Autentifikacija = require("./autentifikacija.js");
let auth = new Autentifikacija();

exports.pocetna = async function (zahtjev, odgovor) {
    let pocetna = await ucitajStranicu("pocetna");
    pocetna = await prijavaHTML(pocetna, zahtjev.session.korisnik);
    odgovor.send(pocetna);
}

exports.dokumentacija = async function (zahtjev, odgovor) {
    let [dokumentacija, nav] = await Promise.all([ds.readFile("../dokumentacija/dokumentacija.html", "UTF-8"), ucitajHTML("navigacija")]);
    dokumentacija = dokumentacija.replace("#navigacija#", nav);
    dokumentacija = await prijavaHTML(dokumentacija, zahtjev.session.korisnik);
    odgovor.send(dokumentacija);
}

exports.registracija = async function (zahtjev, odgovor) {
    if (zahtjev.method == "POST") {
        let uspjeh = await auth.dodajKorisnika(zahtjev.body);
        if (typeof uspjeh == "boolean") {
            odgovor.send(JSON.stringify({registracija: "OK"}));
            return;
        } else if (typeof uspjeh == "object") {
            odgovor.status(409);
            odgovor.send(JSON.stringify(uspjeh));
        }
    }
}

exports.odjava = async function (zahtjev, odgovor) {
    zahtjev.session.jwt = null;
    zahtjev.session.korisnik = null;
    zahtjev.session.korime = null;
    zahtjev.session.email = null;
    zahtjev.session.admin = null;
    odgovor.json({odjava: "OK"});
};

exports.prijava = async function (zahtjev, odgovor) {
    let greska = ""
    if (zahtjev.method == "POST") {
        var korime = zahtjev.body.korime;
        var lozinka = zahtjev.body.lozinka;

        var korisnik = JSON.parse(await auth.prijaviKorisnika(korime, lozinka));

        if (korisnik) {
            zahtjev.session.jwt = jwt.kreirajToken(korisnik);
            zahtjev.session.korisnik = {ime: korisnik.ime, prezime: korisnik.prezime, id: korisnik.id};
            zahtjev.session.korime = korisnik.korime;
            zahtjev.session.email = korisnik.email;
            zahtjev.session.admin = (korisnik.tipKorisnika_id == 1) ? true : false;

            odgovor.send({prijava: "OK"});
        } else {
            greska = "Netocni podaci!";
            odgovor.send({prijava: greska});
        }
    }
}


exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("filmovi_pretrazivanje");
    stranica = await prijavaHTML(stranica, zahtjev.session.korisnik);
    odgovor.send(stranica);
}

exports.profil = async function (zahtjev, odgovor) {
    if (zahtjev.method == "POST") {
        if (!jwt.provjeriToken(zahtjev)) {
            odgovor.status(401);
            odgovor.json({ greska: "neautorizirani pristup" });
        } else {
            console.log("dobio zahtjev za profil");
            let poruka = await auth.azurirajKorisnika(zahtjev.session.korime, zahtjev.body);
    
            if (poruka.status == 200) {
                odgovor.send({azuriran: await poruka.text()});
                
            } else {
                odgovor.send({azuriran: await poruka.text()});
            }
        }
        return;
    }
}

exports.filmoviPregled = async function (zahtjev, odgovor) {
    if (zahtjev.session.jwt == null) {
        odgovor.redirect("/prijava");
        return;
    }

    let stranica = await ucitajStranicu("filmovi_pregled");
    stranica = await prijavaHTML(stranica, zahtjev.session.korisnik);
    odgovor.send(stranica);
}



async function ucitajStranicu(nazivStranice, poruka = "") {
    let stranice = [ucitajHTML(nazivStranice),
    ucitajHTML("navigacija")];
    let [stranica, nav] = await Promise.all(stranice);
    stranica = stranica.replace("#navigacija#", nav);
    stranica = stranica.replace("#poruka#", poruka);
    return stranica;
}

function ucitajHTML(htmlStranica) {
    return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}

async function prijavaHTML(htmlStranica, korisnik) {
    if (korisnik) {
        htmlStranica = htmlStranica.replace("#korisnik#", korisnik);
        htmlStranica = htmlStranica.replace(
            "#prijava#",
            "<a id='odjava' href='/odjava' class='link-light h5 m-3 p-2 text-decoration-none bg-danger rounded'>Odjava</a>"
        );
    }
    else {
        htmlStranica = htmlStranica.replace("#korisnik#", "");
        htmlStranica = htmlStranica.replace(
            "#prijava#",
            "<a id='prijava' href='/prijava' class='link-light h5 m-3 p-2 text-decoration-none bg-secondary rounded'>Prijava</a>"
        );
    }
    return htmlStranica;
}