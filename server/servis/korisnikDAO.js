const Baza = require("./baza.js");

class KorisnikDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik WHERE korime=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (korisnik) {
		let sql = `INSERT INTO korisnik (ime, prezime, lozinka, email, korime, tipKorisnika_id, aktivacijskiKod, totpKljuc) VALUES (?,?,?,?,?,?,?,?)`;
        
		let podaci = [
			korisnik.ime,
			korisnik.prezime,
			korisnik.lozinka,
			korisnik.email,
			korisnik.korime,
			2,
			korisnik.aktivacijskiKod,
			korisnik.TOTPkljuc
		];

		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}

	obrisi = async function (korime) {
		let sql = "DELETE FROM korisnik WHERE korime=?";
		await this.baza.izvrsiUpit(sql, [korime]);
		return true;
	}

	azuriraj = async function (korime, korisnik) {
		if (korisnik.ime == null && korisnik.prezime == null && korisnik.lozinka == null)
			return false;
		let podaci = [];
		let sql = `UPDATE korisnik SET `;
		if (korisnik.ime != null){
			sql += `ime=?`
			podaci.push(korisnik.ime);
		}

		if (korisnik.prezime != null) {
			if (korisnik.ime != null)
				sql += `, `;
			sql += `prezime=?`
			podaci.push(korisnik.prezime);
		}

		if (korisnik.lozinka != null) {
			if (korisnik.ime != null || korisnik.prezime != null)
				sql += `, `
			sql += `lozinka=? `
			podaci.push(korisnik.lozinka);
		}

		sql += ` WHERE korime=?`
		podaci.push(korime)

		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}

	aktiviraj = async function (korime, kod) {
		let dohvatiKod = `SELECT aktivacijskiKod FROM korisnik WHERE korime=?`;
		this.baza.spojiSeNaBazu();
		let aktivacijskiKod = await this.baza.izvrsiUpit(dohvatiKod, korime);

		if (aktivacijskiKod[0].aktivacijskiKod == kod.aktivacijskiKod) {
			let sql = `UPDATE korisnik SET aktiviran=? WHERE korime=?`;
			let podaci = [1, korime];
			await this.baza.izvrsiUpit(sql, podaci);
			this.baza.zatvoriVezu();
			return true;
		}
		else{
			this.baza.zatvoriVezu();
			return false;
		}
	}
}

module.exports = KorisnikDAO;