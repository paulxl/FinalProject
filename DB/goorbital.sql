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
  `enabled` TINYINT NOT NULL DEFAULT 1,
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
  `companies_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `description` VARCHAR(100) NULL,
  `range` VARCHAR(100) NULL,
  `capacity` INT NULL,
  `photo_url` VARCHAR(750) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_vehicle_provider1_idx` (`companies_id` ASC),
  CONSTRAINT `fk_vehicle_provider1`
    FOREIGN KEY (`companies_id`)
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
  `companies_id` INT NOT NULL,
  `vehicle_id` INT NOT NULL,
  `launchport_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `destination` VARCHAR(100) NULL,
  `cost` INT NULL,
  `length_trip` INT NULL,
  `trip_date` DATETIME NULL,
  `photo_url` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trip_vehicle1_idx` (`vehicle_id` ASC),
  INDEX `fktrip_provider_idx` (`companies_id` ASC),
  INDEX `fk_trip_launchport1_idx` (`launchport_id` ASC),
  CONSTRAINT `fk_trip_vehicle1`
    FOREIGN KEY (`vehicle_id`)
    REFERENCES `vehicle` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fktrip_provider`
    FOREIGN KEY (`companies_id`)
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
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (16, 'spacex', '$2a$10$TTJonTEg88AA/tz.U/RKCO31PqoGlDq0NxliGvQwe5rb8rEd5KEfm', 'space@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (17, 'unitedla', '$2a$10$fgkrOZbVzbqxeML.DuRxG.ukgjmouycSCi8iDmG3kSkXA4dpSV7Qa', 'united@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (18, 'blueorigin', '$2a$10$4bKqqXfQl8yDCzM/.cpGOuczQ.EbmpHG2m8ek/yNnXW4T9lisAPhG', 'borigin@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (19, 'virgingalactic', '$2a$10$HKBDrZBwO0Hq1nIkDzp/CO24OQY3zuOSmG0X17Kmy1YxCn3lBpL7G', 'vgalactic@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (20, 'northgrum', '$2a$10$fi1Wnar/8YucvwJiXCD5b.2BycCDeeGD7TfCNX187s/OJ2QtmWTfO', 'nortgrum@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (21, 'nasa', '$2a$10$KoVtUyHGJpRmRNpvGKhoh.OFgZ7s7IZZH0/gvMOMsCQxvBDW4eznW', 'nasa@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (22, 'bigelow', '$2a$10$vvbtoTkA5w/fMIhf60O/l.V5k6KpgUkRhCwo4x0IKmucSLirtl8Iq', 'bigelow@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (23, 'jglen', '$2a$10$.2OFGUApvuofjfYV8GltquxbkfTHo8fVIQAozgQHh9WcYJSSz8Y36', 'jglen@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (24, 'gbluford', '$2a$10$94nh341NNQVzfysq6ydOzOxDhjI32KYzQ3h4djdwntEMtzfCEnJTO', 'gbluford@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (25, 'blightyear', '$2a$10$0x5qCO/ZFCZOjeQAwwlEg.WVlaFn4oK0YAacKXYI1VkzIZ5nLFOn2', 'blightyear@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (26, 'sride', '$2a$10$6sXYqUmbFMppdFnl/9VtZewHH1nK2SnoIEsTb.3T9rnESkyGIplB2', 'sride@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (27, 'jwilliams', '$2a$10$eCf1aFhp60Gz0ApXop5xSuVqSqMN6wIFiwOrK2k7rj5RnpTK54Hcy', 'jwilliams@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (28, 'boeing', '$2a$10$fqEZEXZUMzPYxI5KsDhDMuv1XnrM7w7OYxWH/ixCPtIH0An7rr9RS', 'boeing@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (29, 'sierranc', '$2a$10$L6f2Nd33Seyk1PLAeI1uEeL73D.pCCltItbY6lpTu4A9gE1woeOHS', 'sierranc@orbtmail.com', 1, 'standard');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (30, 'admin', '$2a$10$Z0XPwJ2y3n.wkHcjNjRHkeiMSEL.bNwgtdDYQ4/CYzAHlmqzva9K.', 'admin@orbtmail.com', 1, 'admin');

COMMIT;


-- -----------------------------------------------------
-- Data for table `companies`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `companies` (`id`, `user_id`, `name`, `logo_url`, `web_url`) VALUES (1, 16, 'Space X', 'assets/img/spaceX.jpg', 'https://www.spacex.com/');
INSERT INTO `companies` (`id`, `user_id`, `name`, `logo_url`, `web_url`) VALUES (2, 17, 'United Launch Alliance', 'assets/img/ula.jpg', 'https://www.ulalaunch.com/');
INSERT INTO `companies` (`id`, `user_id`, `name`, `logo_url`, `web_url`) VALUES (3, 18, 'Blue Origin', 'assets/img/blueOrigin.jpeg', 'https://www.blueorigin.com/');
INSERT INTO `companies` (`id`, `user_id`, `name`, `logo_url`, `web_url`) VALUES (4, 19, 'Virgin Galactic', 'assets/img/virginGal.jpeg', 'https://www.virgingalactic.com');
INSERT INTO `companies` (`id`, `user_id`, `name`, `logo_url`, `web_url`) VALUES (5, 20, 'Northrup Grumman ', 'assets/img/ngorbital.jpg', 'https://www.northropgrumman.com/MediaResources/MediaKits/Space/Home.aspx?utm_source=DigitalAd&utm_medium=Redirect&utm_campaign=SpaceOrig+Redirect');
INSERT INTO `companies` (`id`, `user_id`, `name`, `logo_url`, `web_url`) VALUES (6, 21, 'NASA', 'assets/img/nasa.jpg', 'www.nasa.gov');
INSERT INTO `companies` (`id`, `user_id`, `name`, `logo_url`, `web_url`) VALUES (7, 22, 'Bigelow Aerospace ', 'assets/img/bigelow.jpeg', 'https://bigelowaerospace.com/');
INSERT INTO `companies` (`id`, `user_id`, `name`, `logo_url`, `web_url`) VALUES (8, 28, 'Boeing', 'assets/img/boeing.jpeg', 'https://www.boeing.com/space/');
INSERT INTO `companies` (`id`, `user_id`, `name`, `logo_url`, `web_url`) VALUES (9, 29, 'Sierra Nevada Corporation', 'assets/img/snc.jpg', 'https://www.sncorp.com/');

COMMIT;


-- -----------------------------------------------------
-- Data for table `vehicle`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `vehicle` (`id`, `companies_id`, `name`, `type`, `description`, `range`, `capacity`, `photo_url`) VALUES (1, 3, 'Bionic Space Vehicle', 'passenger', 'passenger and crew transports within low earth orbit', 'LEO', 8, NULL);
INSERT INTO `vehicle` (`id`, `companies_id`, `name`, `type`, `description`, `range`, `capacity`, `photo_url`) VALUES (2, 8, 'CST-100', 'passenger', 'passenger and crew transports within low earth orbit', 'LEO', 7, NULL);
INSERT INTO `vehicle` (`id`, `companies_id`, `name`, `type`, `description`, `range`, `capacity`, `photo_url`) VALUES (3, 9, 'Dream Chaser', 'passenger', 'passenger and crew transports within low earth orbit', 'LEO', 7, NULL);
INSERT INTO `vehicle` (`id`, `companies_id`, `name`, `type`, `description`, `range`, `capacity`, `photo_url`) VALUES (4, 8, 'Dragon 2', 'passenger', 'passenger and crew transports within low earth orbit', 'LEO', 7, NULL);
INSERT INTO `vehicle` (`id`, `companies_id`, `name`, `type`, `description`, `range`, `capacity`, `photo_url`) VALUES (5, 8, 'Starship', 'passenger', 'passenger and crew transports to Mars', 'Mars', 100, NULL);
INSERT INTO `vehicle` (`id`, `companies_id`, `name`, `type`, `description`, `range`, `capacity`, `photo_url`) VALUES (6, 1, 'Dragon', 'passenger', 'passenger and crew transports within low earth orbit', 'Suborbital', 6, NULL);
INSERT INTO `vehicle` (`id`, `companies_id`, `name`, `type`, `description`, `range`, `capacity`, `photo_url`) VALUES (7, 3, 'New Shepard', 'passenger', 'passenger and crew transports within low earth orbit', 'Suborbital', 6, NULL);
INSERT INTO `vehicle` (`id`, `companies_id`, `name`, `type`, `description`, `range`, `capacity`, `photo_url`) VALUES (8, 5, 'Omega', 'passenger', 'passenger and crew transports within low earth orbit', 'Suborbital', 15, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `launchport`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `launchport` (`id`, `name`, `latitude`, `longitude`) VALUES (1, 'Spaceport America', 32.99, 106.97);
INSERT INTO `launchport` (`id`, `name`, `latitude`, `longitude`) VALUES (2, 'Mojave Air and Space Port', 35.06, 118.15);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (1, 3, 1, 1, 'Lower Earth Experience', 'Earth return', 15000, 1, NULL, NULL);
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (2, 2, 2, 2, 'Mars', 'Mars for a while', 54000, 720, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `traveler`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `traveler` (`id`, `user_id`, `first_name`, `last_name`, `photo_url`) VALUES (1, 23, 'John', 'Glen', NULL);
INSERT INTO `traveler` (`id`, `user_id`, `first_name`, `last_name`, `photo_url`) VALUES (2, 24, 'Guy', 'Bluford', NULL);
INSERT INTO `traveler` (`id`, `user_id`, `first_name`, `last_name`, `photo_url`) VALUES (3, 25, 'Budd', 'Lightyear', NULL);
INSERT INTO `traveler` (`id`, `user_id`, `first_name`, `last_name`, `photo_url`) VALUES (4, 26, 'Sally', 'Ride', NULL);
INSERT INTO `traveler` (`id`, `user_id`, `first_name`, `last_name`, `photo_url`) VALUES (5, 27, 'Jeffery', 'Williams', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `traveler_trip`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (1, 1, 1, NULL, 5, 'the view was amazing', 'take favorite sunglasses');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (2, 2, 2, NULL, 4, 'kinda long', 'bring snacks');

COMMIT;

