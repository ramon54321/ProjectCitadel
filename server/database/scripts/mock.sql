
-- Clear Database
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Create Tables
CREATE TABLE dummy (x INT, y INT);

-- Insert Dummy Data
INSERT INTO dummy values(6, 3);

-- Test Query
SELECT * FROM dummy