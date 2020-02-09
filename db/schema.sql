DROP TABLE IF EXISTS burgers;
DROP SCHEMA IF EXISTS burgers_db;

CREATE SCHEMA burgers_db;
USE burgers_db;

CREATE TABLE burgers (
    id INTEGER AUTO_INCREMENT,
    burger_name VARCHAR(30) NOT NULL,
    devoured BOOLEAN,
    PRIMARY KEY (id));