const ds = require("fs/promises");
const ProvjeraKonfiguracije = require("./provjeraKonfiguracije.js");

class Konfiguracija {
    constructor() {
        this.konf = {};
    }

    dajKonf() {
        return this.konf;
    }

    async ucitajKonfiguraciju() {
        var podaci = await ds.readFile(process.argv[2], "utf-8");
        let provjeraKonfiguracije = new ProvjeraKonfiguracije();

        let provjeraPodataka = await new Promise((uspjeh, neuspjeh) => {
            let imajuPodaci = new RegExp("^\\n*(rest.korime=.+)\\n*(rest.lozinka=.+)\\n*(rest.port=.+)\\n*(app.broj.stranica=.+)\\n*(tmdb.apikey.v3=.+)\\n*(tmdb.apikey.v4=.+)\\n*$");
            
            if (!imajuPodaci.test(podaci))
                neuspjeh("U konfiguracijskoj datoteci nemaju potrebni podaci.");
            else {
                this.konf = pretvoriJSONkonfig(podaci);
                uspjeh();
            }
        })
        .then(await provjeraKonfiguracije.provjeriKorime(this.konf["rest.korime"]))
        .then(await provjeraKonfiguracije.provjeriLozinku(this.konf["rest.lozinka"]))
        .then(await provjeraKonfiguracije.provjeriBrojStranica(this.konf["app.broj.stranica"]))
        .then(() => {
            if (provjeraKonfiguracije.greskeKorime != "" || 
            provjeraKonfiguracije.greskeLozinka != "" ||
            provjeraKonfiguracije.greskeBroj != "") {
                throw (provjeraKonfiguracije.greskeKorime + "\n" +
                provjeraKonfiguracije.greskeLozinka + "\n" +
                provjeraKonfiguracije.greskeBroj);
            }
        })
        .catch((popisGresaka) => {
            console.log(popisGresaka);
            process.exit();
        })
    }
}

function pretvoriJSONkonfig(podaci) {
    let konf = {};
    var nizPodataka = podaci.split("\n");
    for (let podatak of nizPodataka) {
        var podatakNiz = podatak.split("=");
        var naziv = podatakNiz[0];
        var vrijednost = podatakNiz[1];
        konf[naziv] = vrijednost;
    }
    return konf;
}

module.exports = Konfiguracija;