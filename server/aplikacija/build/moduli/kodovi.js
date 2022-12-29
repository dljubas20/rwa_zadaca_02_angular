"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dajNasumceBroj = exports.kreirajSHA256 = void 0;
const crypto_1 = __importDefault(require("crypto"));
function kreirajSHA256(tekst, sol = "") {
    const hash = crypto_1.default.createHash('sha256');
    hash.write(tekst + sol);
    var izlaz = hash.digest('hex');
    hash.end();
    return izlaz;
}
exports.kreirajSHA256 = kreirajSHA256;
function dajNasumceBroj(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
exports.dajNasumceBroj = dajNasumceBroj;
