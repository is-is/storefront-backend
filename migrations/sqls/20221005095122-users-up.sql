/* Replace with your SQL commands */
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);