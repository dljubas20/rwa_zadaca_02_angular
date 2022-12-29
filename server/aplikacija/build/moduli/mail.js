"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posaljiMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
let mailer = nodemailer_1.default.createTransport({
    host: 'mail.foi.hr',
    port: 25,
    /* auth: {
         user: "",
         pass: ""
     }*/
});
async function posaljiMail(salje, prima, predmet, poruka) {
    let message = {
        from: salje,
        to: prima,
        subject: predmet,
        text: poruka
    };
    let odgovor = await mailer.sendMail(message);
    console.log(odgovor);
    return odgovor;
}
exports.posaljiMail = posaljiMail;
