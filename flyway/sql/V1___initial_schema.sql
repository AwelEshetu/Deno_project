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