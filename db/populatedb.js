#! /usr/bin/env node

const { Client } = require('pg');

// allow use of .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  is_member BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS  messages (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

INSERT INTO users (email, password_hash, first_name, last_name, is_member, is_admin)
VALUES
(
  'thatguy@leafvillage.com',
  '$2b$10$wH9jZ5nE0QzqQx9YcPzGHeeX3l7v3V2dJ9F0Y4R1U5ZQ6sD9QZx2y',
  'Tom',
  'Hanks',
  TRUE,
  FALSE
),
(
  'jb@gmail.com',
  '$2b$10$ZcX7v6Yc1K1q9T5dPZ8sEw2LZyE3C8N1B0Y4XJ3UQz2T9WkL6mZQ',
  'Justin',
  'Bieber',
  TRUE,
  TRUE
);

INSERT INTO messages (user_id, title, body)
VALUES
(
  1,
  'Krillin is the strongest human',
  'Some say it''s Tien or even Master Roshi but Krillin is the only one who really kept up with the gang before he became a dad.'
),
(
  1,
  'Favorite Jutsu',
  'Thousand years of pain is the best jutsu in Naruto, of course.'
),
(
  2,
  'Anime is weird',
  'I don''t like anime, I''m more of a k-drama guy.'
);



`;

async function main() {
  const dbUrl = process.argv[2] || process.env.DATABASE_URL;
  console.log('seeding...');
  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
