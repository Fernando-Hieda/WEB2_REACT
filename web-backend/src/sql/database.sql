DROP DATABASE plshare;

CREATE DATABASE plshare;

USE plshare;

CREATE TABLE user
(
    id BINARY(16) NOT NULL,
    email VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE playlist
(
    id BINARY(16) NOT NULL,
    name VARCHAR(256) NOT NULL,
    user_id BINARY(16) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id)
        REFERENCES user(id)
);

CREATE TABLE song
(
    id BINARY(16) NOT NULL,
    link VARCHAR(256) NOT NULL,
    name VARCHAR(256) NOT NULL,
    reference BINARY(16) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(reference)
        REFERENCES playlist(id)
);