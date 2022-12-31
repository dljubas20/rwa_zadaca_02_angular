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
    let greska = "";
    if (zahtjev.method == "POST") {
        let uspjeh = await auth.dodajKorisnika(zahtjev.body);
        if (uspjeh) {
            odgovor.redirect("/prijava");
            return;
        } else {
            greska = "Dodavanje nije uspjelo provjerite podatke!";
            odgovor.json({greska: greska});
        }
    }
}

exports.odjava = async function (zahtjev, odgovor) {
    zahtjev.session.jwt = null;
    zahtjev.session.korisnik = null;
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
            zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
            zahtjev.session.korime = korisnik.korime;
            zahtjev.session.email = korisnik.email;
            odgovor.json({prijava: "OK"});
        } else {
            greska = "Netocni podaci!";
            odgovor.json({prijava: greska});
        }
    }
}


exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("filmovi_pretrazivanje");
    stranica = await prijavaHTML(stranica, zahtjev.session.korisnik);
    odgovor.send(stranica);
}

exports.profil = async function (zahtjev, odgovor) {
    if (zahtjev.session.jwt == null) {
        odgovor.redirect("/prijava");
        return;
    }

    if (zahtjev.method == "POST") {
        if (!jwt.provjeriToken(zahtjev)) {
            odgovor.status(401);
            odgovor.json({ greska: "neautorizirani pristup" });
        } else {
            console.log("Dobiveni zahtjev body za azuriranje profila je: ");
            console.log(zahtjev.body);
            let poruka = await auth.azurirajKorisnika(zahtjev.session.korime, zahtjev.body);
    
            if (poruka.status == 200) {
                odgovor.send(await poruka.text());
                
            } else {
                odgovor.send(await poruka.text());
            }
        }
        return;
    }

    let stranica = await ucitajStranicu("profil");
    stranica = await prijavaHTML(stranica, zahtjev.session.korisnik);

    stranica = stranica.replace("#ime#", zahtjev.session.korisnik.split(" ")[0]);
    stranica = stranica.replace("#prezime#", zahtjev.session.korisnik.split(" ")[1]);
    stranica = stranica.replace("#korime#", zahtjev.session.korime);
    stranica = stranica.replace("#email#", zahtjev.session.email);

    odgovor.send(stranica);
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