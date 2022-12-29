import nodemailer from "nodemailer";

let mailer = nodemailer.createTransport({
    host: 'mail.foi.hr',
    port: 25,
   /* auth: {
		user: "",
        pass: ""
    }*/
})

export async function posaljiMail(salje : string, prima : string, predmet : string, poruka : string){
	let message = {
		from: salje,
		to: prima,
		subject: predmet,
		text: poruka
	}
	
	let odgovor = await mailer.sendMail(message);
	console.log(odgovor);
	return odgovor;
}
