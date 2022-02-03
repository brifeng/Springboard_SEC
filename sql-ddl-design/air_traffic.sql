-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE traveler
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE airport
(
  id SERIAL PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  traveler_id INT NOT NULL REFERENCES traveler,
  seat TEXT NOT NULL,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline TEXT NOT NULL,
  from_airport INT NOT NULL REFERENCES airport,
  to_airport INT NOT NULL REFERENCES airport
);

INSERT INTO traveler
(first_name, last_name)
VALUES
('Jennifer', 'Finch'),
('Thadeus', 'Gathercoal'),
('Sonja', 'Pauley'),
('Waneta', 'Skeleton'),
('Berkie', 'Wycliff'),
('Alvin', 'Leathes'),
('Cory', 'Squibbes');

INSERT INTO airport
(city, country)
VALUES
('Washington DC', 'United States'),
('Seattle', 'United States'),
('Tokyo', 'Japan'),
('London', 'United Kingdom'),
('Los Angeles', 'United States'),
('Las Vegas', 'United States'),
('Mexico City', 'Mexico'),
('Paris', 'France'),
('Casablanca', 'Morocco'),
('Dubai', 'UAE'),
('Beijing', 'China'),
('New York', 'United States'),
('Charlotte', 'United States'),
('Cedar Rapids', 'United States'),
('Chicago', 'United States'),
('New Orleans', 'United States'),
('Sao Paolo', 'Brazil'),
('Santiago', 'Chile');

INSERT INTO tickets
  (traveler_id, seat, departure, arrival, airline, from_airport, to_airport)
VALUES
  (1, '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 'United', 1, 2),
  (2, '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 'British Airways', 3, 4),
  (3, '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 'Delta', 5, 6),
  (1, '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 'Delta', 2, 7),
  (4, '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 'TUI Fly Belgium', 8, 9),
  (2, '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 'Air China', 10, 11),
  (5, '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 'United', 12, 13),
  (6, '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 'American Airlines', 14, 15),
  (5, '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 'American Airlines', 13, 16),
  (7, '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 'Avianca Brasil', 17, 18);