import { Database, Statement } from 'sqlite3';

export class Baza {
    private baza : Database;

    constructor() {
        this.baza = new Database('../baza.sqlite');
        this.baza.exec(`PRAGMA foreign_keys = ON;`);
    }

    izvrsiUpit = async (upit: string, podaci : any[] = []) => {
		let vratiMe: boolean = false;
        let sql : Statement = this.baza.prepare(upit);

		await new Promise<boolean>((uspjeh, neuspjeh) => {
			sql.run(podaci, function (err) {
				(err != null) ? neuspjeh(err) : uspjeh(true);
			});
		}).then(() => {
			vratiMe = true;
		}).catch(() => {
			vratiMe = false;
		});

		return vratiMe;
	}

    izvrsiSelectUpit = async (sql: string, podaci : any[] = []) => {
		let vratiMe: any = [];

		await new Promise((uspjeh, neuspjeh) => {
			this.baza.all(sql, podaci, function (err : any, rezultat : any) {
				(err != null) ? neuspjeh(err) : uspjeh(rezultat);
			});
		}).then((rez : any) => {
            
			vratiMe = (rez.length == 1) ? rez[0] : rez;
		}).catch(() => {
			vratiMe = [];
		});

		return vratiMe;
	}
}