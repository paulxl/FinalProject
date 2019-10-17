-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema goorbitaldb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `goorbitaldb` ;

-- -----------------------------------------------------
-- Schema goorbitaldb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `goorbitaldb` DEFAULT CHARACTER SET utf8 ;
USE `goorbitaldb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `enabled` TINYINT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `provider`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `provider` ;

CREATE TABLE IF NOT EXISTS `provider` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `name` VARCHAR(200) NULL,
  `logo_url` VARCHAR(500) NULL,
  `web_url` VARCHAR(500) BINARY NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_provider_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_provider_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vehicle`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vehicle` ;

CREATE TABLE IF NOT EXISTS `vehicle` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `provider_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `description` VARCHAR(100) NULL,
  `altitude` VARCHAR(100) NULL,
  `capacity` INT NULL,
  `height` INT NULL,
  `photo_url` VARCHAR(750) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_vehicle_provider1_idx` (`provider_id` ASC),
  CONSTRAINT `fk_vehicle_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `launchport`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `launchport` ;

CREATE TABLE IF NOT EXISTS `launchport` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `latitude` DOUBLE NULL,
  `longitude` DOUBLE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trip`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip` ;

CREATE TABLE IF NOT EXISTS `trip` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `provider_id` INT NOT NULL,
  `vehicle_id` INT NOT NULL,
  `launchport_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `destination` VARCHAR(100) NULL,
  `cost` INT NULL,
  `length_trip` INT NULL,
  `capacity` INT NULL,
  `trip_date` DATETIME NULL,
  `photo_url` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trip_vehicle1_idx` (`vehicle_id` ASC),
  INDEX `fktrip_provider_idx` (`provider_id` ASC),
  INDEX `fk_trip_launchport1_idx` (`launchport_id` ASC),
  CONSTRAINT `fk_trip_vehicle1`
    FOREIGN KEY (`vehicle_id`)
    REFERENCES `vehicle` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fktrip_provider`
    FOREIGN KEY (`provider_id`)
    REFERENCES `provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_launchport1`
    FOREIGN KEY (`launchport_id`)
    REFERENCES `launchport` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `traveler`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `traveler` ;

CREATE TABLE IF NOT EXISTS `traveler` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `photo_url` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_traveler_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_traveler_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `traveler_trip`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `traveler_trip` ;

CREATE TABLE IF NOT EXISTS `traveler_trip` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `trip_id` INT NOT NULL,
  `traveler_id` INT NOT NULL,
  `date_signed` DATETIME NULL,
  `date_completed` DATETIME NULL,
  `rating` INT NULL,
  `review` TEXT NULL,
  `trip_note` TEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_traveler_trip_trip1_idx` (`trip_id` ASC),
  INDEX `fk_traveler_trip_traveler1_idx` (`traveler_id` ASC),
  CONSTRAINT `fk_traveler_trip_trip1`
    FOREIGN KEY (`trip_id`)
    REFERENCES `trip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_traveler_trip_traveler1`
    FOREIGN KEY (`traveler_id`)
    REFERENCES `traveler` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS goorbital@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'goorbital'@'localhost' IDENTIFIED BY 'goorbital';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'goorbital'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (1, 'jgleen', '123xyz', 'jglen@buzz.com', NULL, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (2, 'blightyear', '123xyz', 'blightyear@buzz.com', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `provider`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `provider` (`id`, `user_id`, `name`, `logo_url`, `web_url`) VALUES (DEFAULT, 1, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `vehicle`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `vehicle` (`id`, `provider_id`, `name`, `type`, `description`, `altitude`, `capacity`, `height`, `photo_url`) VALUES (1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `traveler`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `traveler` (`id`, `user_id`, `first_name`, `last_name`, `photo_url`) VALUES (1, 1, 'John', 'Gleen', NULL);

COMMIT;

