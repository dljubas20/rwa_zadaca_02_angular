"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base32_encoding_1 = __importDefault(require("base32-encoding"));
const kodovi = __importStar(require("./kodovi"));
const totp_generator_1 = __importDefault(require("totp-generator"));
exports.kreirajTajniKljuc = function (korime) {
    let tekst = korime + new Date() + kodovi.dajNasumceBroj(10000000, 90000000);
    let hash = kodovi.kreirajSHA256(tekst);
    let tajniKljuc = base32_encoding_1.default.stringify(hash, "ABCDEFGHIJKLMNOPRSTQRYWXZ234567");
    return tajniKljuc.toUpperCase();
};
exports.provjeriTOTP = function (uneseniKod, tajniKljuc) {
    const kod = (0, totp_generator_1.default)(tajniKljuc, {
        digits: 6,
        algorithm: "SHA-512",
        period: 60
    });
    console.log(kod);
    if (uneseniKod == kod)
        return true;
    return false;
};
