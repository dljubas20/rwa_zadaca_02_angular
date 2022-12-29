import base32 from "base32-encoding";
import * as kodovi from "./kodovi";
import totp from "totp-generator";

export function kreirajTajniKljuc(korime : string){
	let tekst = korime + new Date() + kodovi.dajNasumceBroj(10000000,90000000);
	let hash = kodovi.kreirajSHA256(tekst) as unknown as Uint8Array;
	let tajniKljuc = base32.stringify(hash, "ABCDEFGHIJKLMNOPRSTQRYWXZ234567");
	return tajniKljuc.toUpperCase();
}

export function provjeriTOTP(uneseniKod : number, tajniKljuc : string){
	const kod = totp(tajniKljuc, {
		digits: 6,
		algorithm: "SHA-512",
		period: 60
	}) as unknown as number;
	
	console.log(kod);
	if(uneseniKod == kod)
		return true;
		
    return false;
}
