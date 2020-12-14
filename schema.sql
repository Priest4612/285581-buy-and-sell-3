DROP DATABASE IF EXISTS buy_and_sell_3;
CREATE DATABASE buy_and_sell_3
  WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    TEMPLATE = template0
    CONNECTION LIMIT = -1;


\connect buy_and_sell_3;

DROP TABLE IF EXISTS offer_to_categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS offer_types;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  id_user BIGSERIAL PRIMARY KEY,
  firstname CHARACTER VARYING(128),
  lastname CHARACTER VARYING(128),
  birth_date DATE,
  email CHARACTER VARYING(128),
  password CHARACTER VARYING(128)
);


CREATE TABLE offer_types
(
  id_type SERIAL PRIMARY KEY,
  name CHARACTER VARYING(100)
);


CREATE TABLE pictures
(
  id_picture BIGSERIAL PRIMARY KEY,
  name CHARACTER VARYING(128),
  path CHARACTER VARYING(256),
  user_id BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id_user)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE categories
(
  id_category BIGSERIAL PRIMARY KEY,
  name CHARACTER VARYING(128),
  picture_id BIGINT,
  FOREIGN KEY (picture_id) REFERENCES  pictures (id_picture)
    ON DELETE SET NULL
    ON UPDATE SET NULL
);


CREATE TABLE offers
(
  id_offer BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sum NUMERIC,
  create_date DATE,
  type_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  picture_id BIGINT NOT NULL,
  FOREIGN KEY (type_id) REFERENCES offer_types (id_type)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id_user)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (picture_id) REFERENCES pictures (id_picture)
    ON DELETE SET NULL
    ON UPDATE SET NULL
);


CREATE TABLE offer_to_categories (
  offer_id BIGINT NOT NULL,
  category_id BIGINT NOT NULL,
  CONSTRAINT offer_to_categories_pk PRIMARY KEY (offer_id, category_id),
  FOREIGN KEY (offer_id) REFERENCES offers (id_offer)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories (id_category)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE comments (
  id_comment BIGSERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  user_id BIGINT NOT NULL,
  offer_id BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id_user)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (offer_id) REFERENCES offers (id_offer)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
