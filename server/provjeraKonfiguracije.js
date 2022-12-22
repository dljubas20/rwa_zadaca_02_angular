class ProvjeraKonfiguracije {
    constructor() {
        this.greskeKorime = "";
        this.greskeLozinka = "";
        this.greskeBroj = "";
    }

    dajGreskeKorime() {
        return this.greskeKorime;
    }

    dajGreskeLozinka() {
        return this.greskeLozinka;
    }

    async provjeriKorime(korime) {
        return new Promise((uspjeh, neuspjeh) => {
            let duzinaKorime = new RegExp("^.{15,20}$")

            if (!duzinaKorime.test(korime))
                this.greskeKorime += "Korisničko ime mora sadržavati najmanje 15 znakova, a najviše 20 znakova.\n";
            
            uspjeh();
        })
        .then(() => {
            let sadrzajKorime = new RegExp("^[A-Za-zčćšđžČĆŠĐŽ0-9]+$");
            
            if (!sadrzajKorime.test(korime))
                this.greskeKorime += "Korisničko ime može sadržavati samo slova i brojeve.\n";
        })
        .then(() => {
            let imaSlovaKorime = new RegExp("^.*[A-Za-zčćšđžČĆŠĐŽ]+.*[A-Za-zčćšđžČĆŠĐŽ]+.*$");
            
            if (!imaSlovaKorime.test(korime))
                this.greskeKorime += "Korisničko ime mora sadržavati barem 2 slova.\n";

        })
        .then(() => {
            let imaZnamenkeKorime = new RegExp("^.*\\d+.*\\d+.*$");
            
            if (!imaZnamenkeKorime.test(korime))
                this.greskeKorime += "Korisničko ime mora sadržavati barem 2 broja.\n";
        })
    }

    async provjeriLozinku(lozinka) {
        return new Promise((uspjeh, neuspjeh) => {
            let duzinaLozinka = new RegExp("^.{20,100}$");

            if (!duzinaLozinka.test(lozinka))
                this.greskeLozinka += "Lozinka mora sadržavati najmanje 20 znakova, a najviše 100 znakova.\n";
            
            uspjeh();
        })
        .then(() => {
            let imaSlovaLozinka = new RegExp("^.*[A-Za-zčćšđžČĆŠĐŽ]+.*[A-Za-zčćšđžČĆŠĐŽ]+.*[A-Za-zčćšđžČĆŠĐŽ]+.*$");

            if (!imaSlovaLozinka.test(lozinka))
                this.greskeLozinka += "Lozinka mora sadržavati barem 3 slova.\n";
        })
        .then(() => {
            let imaZnamenkeLozinka = new RegExp("^.*\\d+.*\\d+.*\\d.*$");

            if (!imaZnamenkeLozinka.test(lozinka))
                this.greskeLozinka += "Lozinka mora sadržavati barem 3 broja.\n";
        })
        .then(() => {
            let imaSpecijalneZnakoveLozinka = new RegExp("^.*[^a-zA-Z0-9čćšđžČĆŠĐŽ]+.*[^a-zA-Z0-9čćšđžČĆŠĐŽ]+.*[^a-zA-Z0-9čćšđžČĆŠĐŽ]+.*$");

            if (!imaSpecijalneZnakoveLozinka.test(lozinka))
                this.greskeLozinka += "Lozinka mora sadržavati barem 3 specijalna znaka.\n";
        })
    }
    
    async provjeriBrojStranica(brojStranica) {
    
        return new Promise((uspjeh, neuspjeh) => {
            let ispravanBroj = new RegExp("(^[5-9]$)|(^\\d\\d$)|(^100$)");

            if (!ispravanBroj.test(brojStranica))
                this.greskeBroj += "Broj mora biti u intervalu od 5 do 100.";
            
            uspjeh();
        })
    }
}

module.exports = ProvjeraKonfiguracije;