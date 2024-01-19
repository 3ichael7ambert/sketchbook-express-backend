// db.js
const { Pool } = require('pg');
const { getDatabaseUri } = require('./config');

let db;

if (process.env.NODE_ENV === 'production') {
  db = new Pool({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Use SQLite for development
  db = new Pool({
    connectionString: getDatabaseUri(),
  });
}

db.connect();

module.exports = db;
