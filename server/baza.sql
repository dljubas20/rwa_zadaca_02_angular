CREATE TABLE IF NOT EXISTS `RWA2022dljubas20`.`film` (
  `id` INTEGER NOT NULL AUTOINCREMENT,
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
  PRIMARY KEY (`id`),
  INDEX `fk_film_korisnik1_idx` (`korisnik_id` ASC) VISIBLE,
  CONSTRAINT `fk_film_korisnik1`
    FOREIGN KEY (`korisnik_id`)
    REFERENCES `RWA2022dljubas20`.`korisnik` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)



CREATE TABLE IF NOT EXISTS `RWA2022dljubas20`.`korisnik` (
  `id` INTEGER NOT NULL AUTOINCREMENT,
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
  PRIMARY KEY (`id`),
  INDEX `fk_korisnik_tipKorisnika1_idx` (`tipKorisnika_id` ASC) VISIBLE,
  CONSTRAINT `fk_korisnik_tipKorisnika1`
    FOREIGN KEY (`tipKorisnika_id`)
    REFERENCES `RWA2022dljubas20`.`tipKorisnika` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)



CREATE TABLE IF NOT EXISTS `RWA2022dljubas20`.`tipKorisnika` (
  `id` INTEGER NOT NULL AUTOINCREMENT,
  `naziv` VARCHAR(30) NOT NULL,
  `opis` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))



CREATE TABLE IF NOT EXISTS `RWA2022dljubas20`.`zanr` (
  `id` INTEGER NOT NULL AUTOINCREMENT,
  `naziv` VARCHAR(50) NOT NULL,
  `opis` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))



CREATE TABLE IF NOT EXISTS `RWA2022dljubas20`.`zanrovi` (
  `zanr_id` INTEGER NOT NULL,
  `film_id` INTEGER NOT NULL,
  PRIMARY KEY (`film_id`, `zanr_id`),
  INDEX `fk_zanr_has_film_film1_idx` (`film_id` ASC) VISIBLE,
  INDEX `fk_zanr_has_film_zanr_idx` (`zanr_id` ASC) VISIBLE,
  CONSTRAINT `fk_zanr_has_film_zanr`
    FOREIGN KEY (`zanr_id`)
    REFERENCES `RWA2022dljubas20`.`zanr` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_zanr_has_film_film1`
    FOREIGN KEY (`film_id`)
    REFERENCES `RWA2022dljubas20`.`film` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

