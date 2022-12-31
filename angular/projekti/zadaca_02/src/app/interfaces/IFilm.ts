export interface IFilm {
    id : number;
    tmdb_id : number,
    imdb_id : number;
    naziv : string;
    sazetak : string;
    trajanje : number;
    datumIzlaska : Date;
    datumDodavanja : Date;
    dobnoOgranicenje : boolean;
    putanjaPozadina : string;
    putanjaPoster : string;
    budzet : number;
    prihod : number;
    pocetnaStranica : string;
    izvorniJezik : string;
    popularnost : number;
    status : string;
    slogan : string;
    ocjena : number;
    brojOcjenjivaca : number;
    prijedlog : boolean;
    korisnik_id : number;
}