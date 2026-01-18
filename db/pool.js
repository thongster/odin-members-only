const { Pool } = require('pg');

// allow use of .env
require('dotenv').config();

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
