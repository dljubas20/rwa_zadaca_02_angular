"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Baza = void 0;
const sqlite3_1 = require("sqlite3");
class Baza {
    baza;
    constructor() {
        this.baza = new sqlite3_1.Database('../baza.sqlite');
        this.baza.exec(`PRAGMA foreign_keys = ON;`);
    }
    izvrsiUpit = async (upit, podaci = []) => {
        let vratiMe = false;
        let sql = this.baza.prepare(upit);
        await new Promise((uspjeh, neuspjeh) => {
            sql.run(podaci, function (err) {
                (err != null) ? neuspjeh(err) : uspjeh(true);
            });
        }).then(() => {
            vratiMe = true;
        }).catch(() => {
            vratiMe = false;
        });
        return vratiMe;
    };
    izvrsiSelectUpit = async (sql, podaci = []) => {
        let vratiMe = [];
        await new Promise((uspjeh, neuspjeh) => {
            this.baza.all(sql, podaci, function (err, rezultat) {
                (err != null) ? neuspjeh(err) : uspjeh(rezultat);
            });
        }).then((rez) => {
            vratiMe = (rez.length == 1) ? rez[0] : rez;
        }).catch(() => {
            vratiMe = [];
        });
        return vratiMe;
    };
}
exports.Baza = Baza;
