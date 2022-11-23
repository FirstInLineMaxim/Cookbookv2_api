const { Client } = require("pg");
//bunch of config data
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1234",
  database: "recepies",
});

module.exports = client;