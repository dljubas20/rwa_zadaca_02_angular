import jwt from "jsonwebtoken";
import type { Request } from "express";
const konst = require("../../../konstante.js");

export function kreirajToken(korisnik : {korime : string}){
	let token = jwt.sign({ korime: korisnik.korime }, konst.tajniKljucJWT, { expiresIn: "15s" });
    return token;
}

export function provjeriToken(zahtjev : Request) {
    if (zahtjev.headers.authorization != null) {
        let token = zahtjev.headers.authorization;
        try {
            jwt.verify(token, konst.tajniKljucJWT);
			return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    }
    return false;
}

export function ispisiDijelove(token : string){
	let dijelovi = token.split(".");
	let zaglavlje =  dekodirajBase64(dijelovi[0]!);
	console.log(zaglavlje);
	let tijelo =  dekodirajBase64(dijelovi[1]!);
	console.log(tijelo);
	let potpis =  dekodirajBase64(dijelovi[2]!);
	console.log(potpis);
}

export function dajTijelo(token : string){
	let dijelovi = token.split(".");
	return JSON.parse(dekodirajBase64(dijelovi[1]!));
}

function dekodirajBase64(data : string){
	let buff = new Buffer(data, 'base64');
	return buff.toString('ascii');
}
