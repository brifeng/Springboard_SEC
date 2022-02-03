DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center;

CREATE TABLE medical_center
(
    id SERIAL,
    doctor TEXT,
    patient TEXT
);

CREATE TABLE doctors
(
    id SERIAL,
    name TEXT NOT NULL
);

CREATE TABLE patients
(
    id SERIAL,
    name TEXT NOT NULL,
    insurance TEXT,
    birthdate TEXT NOT NULL
);

CREATE TABLE doctors_patients
(
    id SERIAL,
    doctor_id INT NOT NULL,
    patient_id INT NOT NULL
);

CREATE TABLE diseases
(
    id SERIAL,
    name TEXT NOT NULL
);

CREATE TABLE patients_diseases
(
    id SERIAL,
    patient_id INT NOT NULL,
    disease_id INT NOT NULL
);