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
  FOREIGN KEY (tipKorisnika_id) REFERENCES tipKorisnika(id)
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
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id)
);

CREATE TABLE IF NOT EXISTS `zanrovi` (
  `zanr_id` INTEGER NOT NULL,
  `film_id` INTEGER NOT NULL,
  PRIMARY KEY (zanr_id, film_id),
  FOREIGN KEY (zanr_id) REFERENCES zanr(id),
  FOREIGN KEY (film_id) REFERENCES film(id)
);
