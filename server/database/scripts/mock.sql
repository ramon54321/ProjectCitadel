
-- Clear Database
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Create Tables
CREATE TABLE cards (
  data Json NOT NULL
);

-- Insert Dummy Data
-- INSERT INTO dummy values(6, 3);

-- Test Query
-- SELECT * FROM dummy