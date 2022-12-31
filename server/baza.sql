CREATE TABLE IF NOT EXISTS `tipKorisnika` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  `naziv` VARCHAR(30) NOT NULL,
  `opis` VARCHAR(200) NULL
);

CREATE TABLE IF NOT EXISTS `korisnik` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  `ime` VARCHAR(50) NULL,
  `prezime` VARCHAR(60) NULL,
  `korime` VARCHAR(50) NOT NULL,
  `lozinka` TEXT NOT NULL,
  `email` VARCHAR(320) NOT NULL,
  `aktiviran` TINYINT NULL,
  `blokiran` TINYINT NULL,
  `adresa` TEXT NULL,
  `datumRodenja` DATE NULL,
  `tipKorisnika_id` INTEGER NOT NULL,
  `aktivacijskiKod` INTEGER NULL,
  `totpKljuc` TEXT NULL,
  FOREIGN KEY (tipKorisnika_id) REFERENCES tipKorisnika(id),
  UNIQUE (korime, email)
);

CREATE TABLE IF NOT EXISTS `zanr` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  `naziv` VARCHAR(50) NOT NULL,
  `opis` VARCHAR(200) NULL
);

CREATE TABLE IF NOT EXISTS `film` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  `tmdb_id` INTEGER NOT NULL,
  `imdb_id` INTEGER NOT NULL,
  `naziv` VARCHAR(100) NOT NULL,
  `sazetak` TEXT NULL,
  `trajanje` INTEGER NULL,
  `datumIzlaska` DATE NULL,
  `datumDodavanja` DATETIME NULL,
  `dobnoOgranicenje` TINYINT NULL,
  `putanjaPozadina` TEXT NULL,
  `putanjaPoster` TEXT NULL,
  `budzet` BIGINT NULL,
  `prihod` BIGINT NULL,
  `pocetnaStranica` VARCHAR(350) NULL,
  `izvorniJezik` VARCHAR(70) NULL,
  `popularnost` FLOAT NULL,
  `status` VARCHAR(50) NULL,
  `slogan` VARCHAR(250) NULL,
  `ocjena` FLOAT NULL,
  `brojOcjenjivaca` INTEGER NULL,
  `prijedlog` TINYINT NULL,
  `korisnik_id` INTEGER NOT NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id),
  UNIQUE (tmdb_id, imdb_id)
);

CREATE TABLE IF NOT EXISTS `zanrovi` (
  `zanr_id` INTEGER NOT NULL,
  `film_id` INTEGER NOT NULL,
  PRIMARY KEY (zanr_id, film_id),
  FOREIGN KEY (zanr_id) REFERENCES zanr(id),
  FOREIGN KEY (film_id) REFERENCES film(id)
);

INSERT INTO tipKorisnika(naziv, opis) VALUES("administrator", "admin moze sve");
INSERT INTO tipKorisnika(naziv, opis) VALUES("obican", "obican korisnik moze samo nesto");

INSERT INTO zanr(naziv, opis) VALUES("action", "action");
INSERT INTO zanr(naziv, opis) VALUES("drama", "drama");
INSERT INTO zanr(naziv, opis) VALUES("horror", "horror");

INSERT INTO film(tmdb_id, imdb_id, naziv, sazetak, trajanje, datumIzlaska, datumDodavanja, dobnoOgranicenje, putanjaPozadina, putanjaPoster, budzet, prihod, pocetnaStranica, izvorniJezik, popularnost, status, slogan, ocjena, brojOcjenjivaca, prijedlog, korisnik_id) VALUES(1, 1, "Movie1", "sazetak", 120, "2015-12-31 11:00:00", NULL, 0, NULL, NULL, 120000, 150000, NULL, "English", 75, "released", "nema slogan", 4.5, 500, 0, 1);
INSERT INTO film(tmdb_id, imdb_id, naziv, sazetak, trajanje, datumIzlaska, datumDodavanja, dobnoOgranicenje, putanjaPozadina, putanjaPoster, budzet, prihod, pocetnaStranica, izvorniJezik, popularnost, status, slogan, ocjena, brojOcjenjivaca, prijedlog, korisnik_id) VALUES(2, 2, "Movie2", "sazetak", 120, "2015-12-31 11:00:00", NULL, 0, NULL, NULL, 120000, 150000, NULL, "English", 75, "released", "nema slogan", 4.5, 500, 0, 1);
INSERT INTO film(tmdb_id, imdb_id, naziv, sazetak, trajanje, datumIzlaska, datumDodavanja, dobnoOgranicenje, putanjaPozadina, putanjaPoster, budzet, prihod, pocetnaStranica, izvorniJezik, popularnost, status, slogan, ocjena, brojOcjenjivaca, prijedlog, korisnik_id) VALUES(3, 3, "Movie3", "sazetak", 120, "2015-12-31 11:00:00", NULL, 0, NULL, NULL, 120000, 150000, NULL, "English", 75, "released", "nema slogan", 4.5, 500, 0, 1);
INSERT INTO film(tmdb_id, imdb_id, naziv, sazetak, trajanje, datumIzlaska, datumDodavanja, dobnoOgranicenje, putanjaPozadina, putanjaPoster, budzet, prihod, pocetnaStranica, izvorniJezik, popularnost, status, slogan, ocjena, brojOcjenjivaca, prijedlog, korisnik_id) VALUES(4, 4, "Movie4", "sazetak", 120, "2015-12-31 11:00:00", NULL, 0, NULL, NULL, 120000, 150000, NULL, "English", 75, "released", "nema slogan", 4.5, 500, 0, 1);
INSERT INTO film(tmdb_id, imdb_id, naziv, sazetak, trajanje, datumIzlaska, datumDodavanja, dobnoOgranicenje, putanjaPozadina, putanjaPoster, budzet, prihod, pocetnaStranica, izvorniJezik, popularnost, status, slogan, ocjena, brojOcjenjivaca, prijedlog, korisnik_id) VALUES(5, 5, "Movie5", "sazetak", 120, "2015-12-31 11:00:00", NULL, 0, NULL, NULL, 120000, 150000, NULL, "English", 75, "released", "nema slogan", 4.5, 500, 0, 1);
INSERT INTO film(tmdb_id, imdb_id, naziv, sazetak, trajanje, datumIzlaska, datumDodavanja, dobnoOgranicenje, putanjaPozadina, putanjaPoster, budzet, prihod, pocetnaStranica, izvorniJezik, popularnost, status, slogan, ocjena, brojOcjenjivaca, prijedlog, korisnik_id) VALUES(6, 6, "Movie6", "sazetak", 120, "2015-12-31 11:00:00", NULL, 0, NULL, NULL, 120000, 150000, NULL, "English", 75, "released", "nema slogan", 4.5, 500, 0, 1);

INSERT INTO film(tmdb_id, imdb_id, naziv, sazetak, trajanje, datumIzlaska, datumDodavanja, dobnoOgranicenje, putanjaPozadina, putanjaPoster, budzet, prihod, pocetnaStranica, izvorniJezik, popularnost, status, slogan, ocjena, brojOcjenjivaca, prijedlog, korisnik_id) VALUES(7, 7, "Movie7", "sazetak", 120, "2015-12-31 11:00:00", NULL, 0, NULL, NULL, 120000, 150000, NULL, "English", 75, "released", "nema slogan", 4.5, 500, 0, 1);

INSERT INTO zanrovi(zanr_id, film_id) VALUES(1, 1);
INSERT INTO zanrovi(zanr_id, film_id) VALUES(1, 2);
INSERT INTO zanrovi(zanr_id, film_id) VALUES(2, 3);
INSERT INTO zanrovi(zanr_id, film_id) VALUES(2, 4);
INSERT INTO zanrovi(zanr_id, film_id) VALUES(3, 5);
INSERT INTO zanrovi(zanr_id, film_id) VALUES(3, 6);

INSERT INTO zanrovi(zanr_id, film_id) VALUES(1, 7);

SELECT * FROM zanr;

SELECT * FROM zanrovi;

SELECT * FROM korisnik;

SELECT * FROM film;

SELECT * FROM tipKorisnika;