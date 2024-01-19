// config.js
require('dotenv').config();
require('colors');

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';
const PORT = +process.env.PORT || 3005;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "postgresql:///sketchbook-test"
      : process.env.DATABASE_URL || "postgresql:///sketchbook-db";
}

console.log('Sketchbook Config:'.green);
console.log('SECRET_KEY:'.yellow, SECRET_KEY);
console.log('PORT:'.yellow, PORT.toString());
console.log("Database:".yellow, getDatabaseUri());
console.log('---');

module.exports = {
  SECRET_KEY,
  PORT,
  getDatabaseUri,
};
