
-- Clear Database
DROP SCHEMA mock CASCADE;
CREATE SCHEMA mock;

SET search_path TO mock;

-- Create Tables
CREATE TABLE app_user (
 id SERIAL NOT NULL PRIMARY KEY,
 data Json NOT NULL
);

CREATE TABLE user_session (
 id SERIAL NOT NULL PRIMARY KEY,
 app_user_id INTEGER NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
 token VARCHAR NOT NULL
);

CREATE TABLE card (
 id SERIAL NOT NULL PRIMARY KEY,
 app_user_id INTEGER NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
 data Json NOT NULL
);

-- Insert Dummy Data
INSERT INTO app_user (id, data) VALUES (2, '{"email": "anton@gmail.com", "password": "anton", "salt": "1234"}');
INSERT INTO app_user (id, data) VALUES (6, '{"email": "ramon@gmail.com", "password": "admin", "salt": "5678"}');
INSERT INTO card (app_user_id, data) VALUES (2, '{"english": "tree / wood", "finnish": "puu"}');
INSERT INTO card (app_user_id, data) VALUES (2, '{"english": "to check", "finnish": "tarkista"}');
INSERT INTO card (app_user_id, data) VALUES (2, '{"english": "to grant / to issue", "finnish": "myöntää"}');
INSERT INTO card (app_user_id, data) VALUES (6, '{"english": "to go", "finnish": "mennä"}');
INSERT INTO card (app_user_id, data) VALUES (6, '{"english": "to run", "finnish": "juosta"}');
INSERT INTO card (app_user_id, data) VALUES (6, '{"english": "to jump", "finnish": "hypätä"}');
INSERT INTO card (app_user_id, data) VALUES (6, '{"english": "to fly", "finnish": "lentää"}');

-- DELETE FROM app_user WHERE app_user.data->>'email' = 'anton@gmail.com';

-- Test Query
SELECT * FROM app_user;
SELECT * FROM user_session;
SELECT * FROM card;
