const { Pool } = require("pg");
//bunch of config data
const pool = new Pool({
  host: "mouse.db.elephantsql.com",
  port: 5432,
  user: "kllhkqyd",
  password: "dppUlbeSA9Qut_7xc9UioGiDVzEO6JUS",
  database: "kllhkqyd",
});

module.exports = pool;