DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist;

CREATE TABLE regions
(
    id SERIAL,
    city TEXT
)

CREATE TABLE users
(
    id SERIAL,
    preferred_region INT REFERENCES regions
)

CREATE TABLE posts
(
    id SERIAL,
    title TEXT,
    content TEXT,
    user INT REFERENCES users
)

CREATE TABLE categories
(
    id SERIAL,
    category TEXT
)

CREATE TABLE posts_categories
(
    id SERIAL,
    posts_id INT,
    categories_id INT
)