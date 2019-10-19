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
  `enabled` TINYINT NOT NULL,
  `role` VARCHAR(45) NOT NULL DEFAULT 'standard',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `companies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `companies` ;

CREATE TABLE IF NOT EXISTS `companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(200) NULL DEFAULT NULL,
  `logo_url` VARCHAR(500) NULL DEFAULT NULL,
  `web_url` VARCHAR(500) BINARY NULL DEFAULT NULL,
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
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `type` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  `range` VARCHAR(100) NULL DEFAULT NULL,
  `capacity` INT NULL DEFAULT NULL,
  `photo_url` VARCHAR(750) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_vehicle_provider1_idx` (`provider_id` ASC),
  CONSTRAINT `fk_vehicle_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `companies` (`id`)
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
  `latitude` DOUBLE NULL DEFAULT NULL,
  `longitude` DOUBLE NULL DEFAULT NULL,
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
  `destination` VARCHAR(100) NULL DEFAULT NULL,
  `cost` INT NULL DEFAULT NULL,
  `length_trip` INT NULL DEFAULT NULL,
  `trip_date` DATETIME NULL DEFAULT NULL,
  `photo_url` VARCHAR(1000) NULL DEFAULT NULL,
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
    REFERENCES `companies` (`id`)
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
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `photo_url` VARCHAR(1000) NULL DEFAULT NULL,
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
  `date_completed` DATETIME NULL DEFAULT NULL,
  `rating` INT NULL DEFAULT NULL,
  `review` TEXT NULL DEFAULT NULL,
  `trip_note` TEXT NULL DEFAULT NULL,
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
