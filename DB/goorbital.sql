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
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (16, 'spacex', '$2a$10$TTJonTEg88AA/tz.U/RKCO31PqoGlDq0NxliGvQwe5rb8rEd5KEfm', 'space@orbtmail.com', 1, 'company');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (17, 'unitedla', '$2a$10$fgkrOZbVzbqxeML.DuRxG.ukgjmouycSCi8iDmG3kSkXA4dpSV7Qa', 'united@orbtmail.com', 1, 'company');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (18, 'blueorigin', '$2a$10$4bKqqXfQl8yDCzM/.cpGOuczQ.EbmpHG2m8ek/yNnXW4T9lisAPhG', 'borigin@orbtmail.com', 1, 'company');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (19, 'virgingalactic', '$2a$10$HKBDrZBwO0Hq1nIkDzp/CO24OQY3zuOSmG0X17Kmy1YxCn3lBpL7G', 'vgalactic@orbtmail.com', 1, 'company');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (21, 'nasa', '$2a$10$KoVtUyHGJpRmRNpvGKhoh.OFgZ7s7IZZH0/gvMOMsCQxvBDW4eznW', 'nasa@orbtmail.com', 1, 'company');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (22, 'bigelow', '$2a$10$vvbtoTkA5w/fMIhf60O/l.V5k6KpgUkRhCwo4x0IKmucSLirtl8Iq', 'bigelow@orbtmail.com', 1, 'company');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (23, 'jglen', '$2a$10$.2OFGUApvuofjfYV8GltquxbkfTHo8fVIQAozgQHh9WcYJSSz8Y36', 'jglen@orbtmail.com', 1, 'traveler');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (24, 'gbluford', '$2a$10$94nh341NNQVzfysq6ydOzOxDhjI32KYzQ3h4djdwntEMtzfCEnJTO', 'gbluford@orbtmail.com', 1, 'traveler');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (25, 'blightyear', '$2a$10$0x5qCO/ZFCZOjeQAwwlEg.WVlaFn4oK0YAacKXYI1VkzIZ5nLFOn2', 'blightyear@orbtmail.com', 1, 'traveler');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (26, 'sride', '$2a$10$6sXYqUmbFMppdFnl/9VtZewHH1nK2SnoIEsTb.3T9rnESkyGIplB2', 'sride@orbtmail.com', 1, 'traveler');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (27, 'jwilliams', '$2a$10$eCf1aFhp60Gz0ApXop5xSuVqSqMN6wIFiwOrK2k7rj5RnpTK54Hcy', 'jwilliams@orbtmail.com', 1, 'traveler');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (28, 'boeing', '$2a$10$fqEZEXZUMzPYxI5KsDhDMuv1XnrM7w7OYxWH/ixCPtIH0An7rr9RS', 'boeing@orbtmail.com', 1, 'company');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `enabled`, `role`) VALUES (29, 'sierranc', '$2a$10$L6f2Nd33Seyk1PLAeI1uEeL73D.pCCltItbY6lpTu4A9gE1woeOHS', 'sierranc@orbtmail.com', 1, 'company');
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

COMMIT;


-- -----------------------------------------------------
-- Data for table `launchport`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `launchport` (`id`, `name`, `latitude`, `longitude`) VALUES (1, 'Spaceport America', 32.99, 106.97);
INSERT INTO `launchport` (`id`, `name`, `latitude`, `longitude`) VALUES (2, 'Mojave Air and Space Port', 35.06, 118.15);
INSERT INTO `launchport` (`id`, `name`, `latitude`, `longitude`) VALUES (3, 'Cape Canaveral AFS', 28.39, 080.61);
INSERT INTO `launchport` (`id`, `name`, `latitude`, `longitude`) VALUES (4, 'Vandenberg AFB', 34.74, 120.57);
INSERT INTO `launchport` (`id`, `name`, `latitude`, `longitude`) VALUES (5, 'Van Horn, TX', 31.42, 104.76);
INSERT INTO `launchport` (`id`, `name`, `latitude`, `longitude`) VALUES (6, 'Boca Chica Village, TX', 25.99, 097.18);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip`
-- -----------------------------------------------------
START TRANSACTION;
USE `goorbitaldb`;
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (1, 3, 1, 1, 'Lower Earth Experience', 'LEO (Lower Earth Orbit)', 15000, 1, '20201010', 'assets/img/blueOrigin.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (2, 2, 2, 2, 'Floating above Earth', 'LEO (Space Hotel) ', 54000, 14, '20200808', 'assets/img/InteriorSpaceHotel2.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (3, 8, 3, 1, 'Above Earth', 'GEO (Geostationary Orbit)', 35000, 7, '20200704', 'assets/img/spaceXDragon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (4, 1, 4, 2, 'Overnight in Space', 'Space Hotels', 15000, 4, '20200606', 'assets/img/spaceFloating.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (5, 1, 6, 2, 'Go where Buzz went', 'Moon City', 45000, 14, '20200420', 'assets/img/spaceXmoon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (6, 2, 6, 1, 'Matt was here first', 'Mars (Martian Colony)', 75000, 1200, '20200510', 'assets/img/MarsColonybyMauricioPampin.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (7, 7, 7, 2, 'Balloning in Venus Gases', 'Venus Cloud City', 90000, 1400, '20200415', 'assets/img/venusCloudColony.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (8, 3, 3, 1, 'Quick trip point to point', 'Earth to Earth (1 hour to anywhere)', 10000, 1, '20200202', 'assets/img/earthToearth.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (9, 4, 2, 1, 'Science excursion', 'ISS (International Space Station)', 25000, 21, '20200220', 'assets/img/ISS.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (10, 1, 6, 1, 'Dream Trip to Saturn', 'Saturn', 125000, 3000, '20200314', 'assets/img/starshipSaturn.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (11, 1, 6, 2, 'Saturn the Outter Rings', 'Ring Planets', 135000, 3200, '20200310', 'assets/img/starshipSaturn.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (12, 3, 1, 1, 'Lower Earth Experience', 'LEO (Lower Earth Orbit)', 15000, 1, '20201010', 'assets/img/blueOrigin.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (13, 3, 1, 1, 'Lower Earth Experience', 'LEO (Lower Earth Orbit)', 15000, 1, '20201120', 'assets/img/blueOrigin.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (14, 3, 1, 1, 'Lower Earth Experience', 'LEO (Lower Earth Orbit)', 15000, 1, '20200808', 'assets/img/blueOrigin.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (15, 3, 1, 1, 'Lower Earth Experience', 'LEO (Lower Earth Orbit)', 15000, 1, '20201010', 'assets/img/blueOrigin.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (16, 2, 2, 2, 'Floating above Earth', 'LEO (Space Hotel) ', 54000, 14, '20200808', 'assets/img/InteriorSpaceHotel2.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (17, 8, 3, 1, 'Above Earth', 'GEO (Geostationary Orbit)', 35000, 7, '20200704', 'assets/img/spaceXDragon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (18, 1, 4, 2, 'Overnight in Space', 'Space Hotels', 15000, 4, '20200606', 'assets/img/spaceFloating.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (19, 1, 6, 2, 'Go where Buzz went', 'Moon City', 45000, 14, '20200420', 'assets/img/spaceXmoon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (20, 2, 6, 1, 'Matt was here first', 'Mars (Martian Colony)', 75000, 1200, '20200510', 'assets/img/MarsColonybyMauricioPampin.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (21, 7, 7, 2, 'Balloning in Venus Gases', 'Venus Cloud City', 90000, 1400, '20200415', 'assets/img/venusCloudColony.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (22, 3, 3, 1, 'Quick trip point to point', 'Earth to Earth (1 hour to anywhere)', 10000, 1, '20200202', 'assets/img/earthToearth.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (23, 4, 2, 1, 'Science excursion', 'ISS (International Space Station)', 25000, 21, '20200220', 'assets/img/ISS.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (24, 1, 6, 1, 'Dream Trip to Saturn', 'Saturn', 125000, 3000, '20200314', 'assets/img/starshipSaturn.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (25, 1, 6, 2, 'Saturn the Outter Rings', 'Ring Planets', 135000, 3200, '20200310', 'assets/img/starshipSaturn.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (26, 3, 1, 1, 'Lower Earth Experience', 'LEO (Lower Earth Orbit)', 15000, 1, '20201010', 'assets/img/blueOrigin.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (27, 3, 1, 1, 'Lower Earth Experience', 'LEO (Lower Earth Orbit)', 15000, 1, '20201120', 'assets/img/blueOrigin.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (28, 3, 1, 1, 'Lower Earth Experience', 'LEO (Lower Earth Orbit)', 15000, 1, '20200808', 'assets/img/blueOrigin.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (29, 2, 2, 2, 'Floating above Earth', 'LEO (Space Hotel) ', 54000, 14, '20201208', 'assets/img/InteriorSpaceHotel2.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (30, 2, 2, 2, 'Floating above Earth', 'LEO (Space Hotel) ', 54000, 14, '20201108', 'assets/img/InteriorSpaceHotel2.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (31, 2, 2, 2, 'Floating above Earth', 'LEO (Space Hotel) ', 54000, 14, '20200308', 'assets/img/InteriorSpaceHotel2.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (32, 2, 2, 2, 'Floating above Earth', 'LEO (Space Hotel) ', 54000, 14, '20200408', 'assets/img/InteriorSpaceHotel2.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (33, 2, 2, 2, 'Floating above Earth', 'LEO (Space Hotel) ', 54000, 14, '20200608', 'assets/img/InteriorSpaceHotel2.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (34, 8, 3, 1, 'Above Earth', 'GEO (Geostationary Orbit)', 35000, 7, '20200704', 'assets/img/spaceXDragon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (35, 8, 3, 1, 'Above Earth', 'GEO (Geostationary Orbit)', 35000, 7, '20200904', 'assets/img/spaceXDragon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (36, 1, 4, 2, 'Overnight in Space', 'Space Hotels', 15000, 4, '20201111', 'assets/img/spaceFloating.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (37, 1, 4, 2, 'Overnight in Space', 'Space Hotels', 15000, 4, '20201014', 'assets/img/spaceFloating.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (38, 1, 4, 2, 'Overnight in Space', 'Space Hotels', 15000, 4, '20201012', 'assets/img/spaceFloating.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (39, 1, 4, 2, 'Overnight in Space', 'Space Hotels', 15000, 4, '20200919', 'assets/img/spaceFloating.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (40, 1, 4, 2, 'Overnight in Space', 'Space Hotels', 15000, 4, '20200812', 'assets/img/spaceFloating.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (41, 1, 4, 2, 'Overnight in Space', 'Space Hotels', 15000, 4, '20200719', 'assets/img/spaceFloating.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (42, 1, 4, 2, 'Overnight in Space', 'Space Hotels', 15000, 4, '20200621', 'assets/img/spaceFloating.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (43, 1, 4, 2, 'Overnight in Space', 'Space Hotels', 15000, 4, '20200610', 'assets/img/spaceFloating.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (44, 1, 6, 2, 'Go where Buzz went', 'Moon City', 45000, 14, '20220920', 'assets/img/spaceXmoon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (45, 1, 6, 2, 'Go where Buzz went', 'Moon City', 45000, 14, '20200820', 'assets/img/spaceXmoon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (46, 1, 6, 2, 'Go where Buzz went', 'Moon City', 45000, 14, '20200720', 'assets/img/spaceXmoon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (47, 1, 6, 2, 'Go where Buzz went', 'Moon City', 45000, 14, '20200520', 'assets/img/spaceXmoon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (48, 1, 6, 2, 'Go where Buzz went', 'Moon City', 45000, 14, '20200320', 'assets/img/spaceXmoon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (49, 1, 6, 2, 'Go where Buzz went', 'Moon City', 45000, 14, '20201120', 'assets/img/spaceXmoon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (50, 1, 6, 2, 'Go where Buzz went', 'Moon City', 45000, 14, '20200520', 'assets/img/spaceXmoon.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (51, 2, 6, 1, 'Matt was here first', 'Mars (Martian Colony)', 75000, 1200, '20200610', 'assets/img/MarsColonybyMauricioPampin.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (52, 2, 6, 1, 'Matt was here first', 'Mars (Martian Colony)', 75000, 1200, '20201110', 'assets/img/MarsColonybyMauricioPampin.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (53, 7, 7, 2, 'Balloning in Venus Gases', 'Venus Cloud City', 90000, 1400, '20201115', 'assets/img/venusCloudColony.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (54, 3, 3, 1, 'Quick trip point to point', 'Earth to Earth (1 hour to anywhere)', 10000, 1, '20200203', 'assets/img/earthToearth.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (55, 3, 3, 1, 'Quick trip point to point', 'Earth to Earth (1 hour to anywhere)', 10000, 1, '20200204', 'assets/img/earthToearth.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (56, 3, 3, 1, 'Quick trip point to point', 'Earth to Earth (1 hour to anywhere)', 10000, 1, '20200205', 'assets/img/earthToearth.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (57, 3, 3, 1, 'Quick trip point to point', 'Earth to Earth (1 hour to anywhere)', 10000, 1, '20200206', 'assets/img/earthToearth.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (58, 3, 3, 1, 'Quick trip point to point', 'Earth to Earth (1 hour to anywhere)', 10000, 1, '20200207', 'assets/img/earthToearth.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (59, 3, 3, 1, 'Quick trip point to point', 'Earth to Earth (1 hour to anywhere)', 10000, 1, '20200208', 'assets/img/earthToearth.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (60, 3, 3, 1, 'Quick trip point to point', 'Earth to Earth (1 hour to anywhere)', 10000, 1, '20200209', 'assets/img/earthToearth.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (61, 4, 2, 1, 'Science excursion', 'ISS (International Space Station)', 25000, 21, '20200516', 'assets/img/ISS.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (62, 4, 2, 1, 'Science excursion', 'ISS (International Space Station)', 25000, 21, '20200719', 'assets/img/ISS.jpg');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (63, 1, 6, 1, 'Dream Trip to Saturn', 'Saturn', 125000, 3000, '20200414', 'assets/img/starshipSaturn.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (64, 1, 6, 1, 'Dream Trip to Saturn', 'Saturn', 125000, 3000, '20200514', 'assets/img/starshipSaturn.png');
INSERT INTO `trip` (`id`, `companies_id`, `vehicle_id`, `launchport_id`, `title`, `destination`, `cost`, `length_trip`, `trip_date`, `photo_url`) VALUES (65, 1, 6, 2, 'Saturn the Outter Rings', 'Ring Planets', 135000, 3200, '20201203', 'assets/img/starshipSaturn.png');

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
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (1, 1, 1, '20190101', 5, 'the view was amazing', 'take favorite sunglasses');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (2, 7, 2, '20190214', 4, 'kinda long and hot', 'bring snacks');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (3, 4, 3, '20190314', 5, 'service was impeccable', 'take pajamas and ask if there is wifi');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (4, 8, 4, '20190219', 4, 'convienent but security took longer then the flight', 'pack light');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (5, 9, 5, '20190530', 5, 'interesting views and experiments', 'find a dog sitter for these dates');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (6, 6, 2, '20190704', 4, 'better than the Grand Canyon', 'bring the good camera');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (7, 6, 4, '20190210', 3, 'it was too long and Mars was not as advertised', 'remember take own toiletries');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (8, 10, 3, '20190606', 5, 'The rings of Saturn a must see', 'take travel pillow');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (9, 2, 1, '20190909', 4, 'the of course, and floating around was cool', 'take favorite hoody');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (10, 3, 3, '20190420', 2, 'did not realize geostationary meant one location and view only ', 'take m&ms to see if they float');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (11, 5, 5, '20190919', 5, 'a bit desolate, but the view of earth was incredible', 'take camera and a new flag');
INSERT INTO `traveler_trip` (`id`, `trip_id`, `traveler_id`, `date_completed`, `rating`, `review`, `trip_note`) VALUES (12, 10, 2, '20191010', 5, 'nearly hit an astroid on the way out, so kinda exciting', 'the company said to bring diapers ');

COMMIT;

