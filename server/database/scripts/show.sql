
SET search_path TO mock;

-- Test Query
SELECT * FROM app_user;
SELECT * FROM user_session;
SELECT * FROM card;

-- SELECT app_user.id, data FROM app_user INNER JOIN user_session ON app_user.id = user_session.app_user_id WHERE user_session.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFudG9uIiwiaWF0IjoxNTU0NjYxNzg4fQ.IkOMwUE8XX_NebgYpthhzF__fkK7MBSUB2PNjZqixoo'

-- DELETE FROM user_session;