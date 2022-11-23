const { Pool } = require("pg");
//bunch of config data
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1234",
  database: "recepies",
});

module.exports = pool;