import { Baza } from "./baza";
import type { IKorisnik } from './klase/IKorisnik';

export class KorisnikDAO {
    private baza : Baza;

	constructor() {
        this.baza = new Baza();
	}

	dajSve = async () => {
		let sql = "SELECT * FROM korisnik;";

		return await this.baza.izvrsiSelectUpit(sql);
	}

	daj = async (korime : string) => {
		let sql = "SELECT * FROM korisnik WHERE korime=?;";

		return await this.baza.izvrsiSelectUpit(sql, [korime]);
	}

	dodaj = async (korisnik : {
		ime : string,
		prezime : string,
		lozinka : string,
		email : string,
		korime : string,
		aktivacijskiKod : string,
		TOTPkljuc : string
	}) => {
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
		
		return await this.baza.izvrsiUpit(sql, podaci);
	}

	obrisi = async (korime : string) => {
		let sql = "DELETE FROM korisnik WHERE korime=?";
		this.baza.izvrsiUpit(sql, [korime]);
		return true;
	}

	azuriraj = async (korime : string, korisnik : {
		ime : string,
		prezime : string,
		lozinka : string,
	}) => {
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

		sql += ` WHERE korime=?;`
		podaci.push(korime);

		this.baza.izvrsiUpit(sql, podaci);
		return true;
	}

	aktiviraj = async (korime : string, kod : {aktivacijskiKod : number}) => {
		let dohvatiKod = `SELECT aktivacijskiKod FROM korisnik WHERE korime=?`;
		let aktivacijskiKod : IKorisnik = await this.baza.izvrsiSelectUpit(dohvatiKod, [korime]) as IKorisnik;

		console.log(aktivacijskiKod);
		
		if (aktivacijskiKod.aktivacijskiKod == kod.aktivacijskiKod) {
			let sql = `UPDATE korisnik SET aktiviran=? WHERE korime=?`;
			let podaci = [1, korime];
			await this.baza.izvrsiUpit(sql, podaci);
			return true;
		}
		else{
			return false;
		}
	}
}