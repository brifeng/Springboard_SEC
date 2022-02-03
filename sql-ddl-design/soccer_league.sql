DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league;

CREATE TABLE teams
(
    id SERIAL,
    name TEXT,
    location TEXT
)

CREATE TABLE players
(
    id SERIAL,
    name TEXT,
    team INT REFERENCES teams
)

CREATE TABLE matches
(
    id SERIAL,
    team1 INT REFERENCES teams,
    team2 INT REFERENCES teams,
    date TEXT
)

CREATE TABLE goals
(
    id SERIAL,
    scored_by INT REFERENCES players,
    match_id INT REFERENCES matches
)

CREATE TABLE referees
(
    id SERIAL,
    name TEXT
)

CREATE TABLE matches_referees
(
    id SERIAL,
    match_id INT REFERENCES matches,
    referees_id INT REFERENCES referees
)

CREATE TABLE season
(
    id SERIAL,
    start_date TEXT,
    end_date TEXT
)

CREATE TABLE standings
(
    id SERIAL,
    season_id INT REFERENCES season,
    team_id INT REFERENCES team,
    ranking INT
)