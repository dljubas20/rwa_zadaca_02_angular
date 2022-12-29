"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dajTijelo = exports.ispisiDijelove = exports.provjeriToken = exports.kreirajToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const konst = require("../../../konstante.js");
function kreirajToken(korisnik) {
    let token = jsonwebtoken_1.default.sign({ korime: korisnik.korime }, konst.tajniKljucJWT, { expiresIn: "15s" });
    return token;
}
exports.kreirajToken = kreirajToken;
function provjeriToken(zahtjev) {
    if (zahtjev.headers.authorization != null) {
        let token = zahtjev.headers.authorization;
        try {
            jsonwebtoken_1.default.verify(token, konst.tajniKljucJWT);
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    return false;
}
exports.provjeriToken = provjeriToken;
function ispisiDijelove(token) {
    let dijelovi = token.split(".");
    let zaglavlje = dekodirajBase64(dijelovi[0]);
    console.log(zaglavlje);
    let tijelo = dekodirajBase64(dijelovi[1]);
    console.log(tijelo);
    let potpis = dekodirajBase64(dijelovi[2]);
    console.log(potpis);
}
exports.ispisiDijelove = ispisiDijelove;
function dajTijelo(token) {
    let dijelovi = token.split(".");
    return JSON.parse(dekodirajBase64(dijelovi[1]));
}
exports.dajTijelo = dajTijelo;
function dekodirajBase64(data) {
    let buff = new Buffer(data, 'base64');
    return buff.toString('ascii');
}
