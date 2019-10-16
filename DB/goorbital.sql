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
-- Table `destination`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `destination` ;

CREATE TABLE IF NOT EXISTS `destination` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `provider_id` INT NOT NULL,
  `description` VARCHAR(100) NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trips`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trips` ;

CREATE TABLE IF NOT EXISTS `trips` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `destination` VARCHAR(45) NULL,
  `cost` INT NULL,
  `length_trip` INT NULL,
  `capacity` INT NULL,
  `provider_id` INT NULL,
  `date` DATETIME NULL,
  `vehicle_id` INT NULL,
  `description` VARCHAR(100) NULL,
  `user_id` INT NULL,
  `launchport_id` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `provider`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `provider` ;

CREATE TABLE IF NOT EXISTS `provider` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vehicle_id` INT NULL,
  `user_rating` INT NULL,
  `trip_id` INT NULL,
  `reward_id` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `traveler`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `traveler` ;

CREATE TABLE IF NOT EXISTS `traveler` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `trips_pending` VARCHAR(100) NULL,
  `trips_done` VARCHAR(100) NULL,
  `review_id` INT NULL,
  `trip_notes` VARCHAR(100) NULL,
  `trip_id` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `review`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `review` ;

CREATE TABLE IF NOT EXISTS `review` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(100) NULL,
  `title` VARCHAR(45) NULL,
  `trip_id` INT NULL,
  `traveler_id` INT NULL,
  `destination_id` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vehicle`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vehicle` ;

CREATE TABLE IF NOT EXISTS `vehicle` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(100) NULL,
  `altitude` VARCHAR(100) NULL,
  `capacity` INT NULL,
  `height` INT NULL,
  `trip_id` INT NULL,
  `photo_url` VARCHAR(750) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `fname` VARCHAR(45) NULL,
  `lname` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `reward`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reward` ;

CREATE TABLE IF NOT EXISTS `reward` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `launchport`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `launchport` ;

CREATE TABLE IF NOT EXISTS `launchport` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `location` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
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
-- Data for table `destination`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `destination` (`id`, `provider_id`, `description`, `name`) VALUES (1, 1, '15 person, weekend trip', 'moon');

COMMIT;


-- -----------------------------------------------------
-- Data for table `provider`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `provider` (`id`, `vehicle_id`, `user_rating`, `trip_id`, `reward_id`) VALUES (1, 1, 5, 1, '1');

COMMIT;


-- -----------------------------------------------------
-- Data for table `review`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `review` (`id`, `description`, `title`, `trip_id`, `traveler_id`, `destination_id`) VALUES (1, NULL, NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `user` (`id`, `email`, `password`, `fname`, `lname`) VALUES (1, 'java@me.com', 'xyz', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `launchport`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `launchport` (`id`, `name`, `location`) VALUES (1, 'spaceport', 'new mexico');

COMMIT;

