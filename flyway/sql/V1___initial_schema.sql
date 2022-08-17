CREATE TABLE names (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender TEXT NOT NULL,
  message TEXT NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  completed BOOLEAN
);

ALTER TABLE tasks ALTER COLUMN completed SET DEFAULT false;

CREATE TABLE work_entries (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES tasks(id),
  started_on TIMESTAMP WITH TIME ZONE,
  finished_on TIMESTAMP WITH TIME ZONE
);

CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE shopping_list_items (
  id SERIAL PRIMARY KEY,
  shopping_list_id INTEGER REFERENCES shopping_lists(id),
  name TEXT NOT NULL,
  collected BOOLEAN DEFAULT FALSE
);

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    reported_on TIMESTAMP WITH TIME ZONE,
    resolved_on TIMESTAMP WITH TIME ZONE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  note TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  balance NUMERIC(100, 2),
  user_id INTEGER REFERENCES users(id)
);

ALTER TABLE accounts ALTER COLUMN balance SET DEFAULT 0;

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE user_roles (
  role_id INTEGER REFERENCES roles(id),
  user_id INTEGER REFERENCES users(id)
);