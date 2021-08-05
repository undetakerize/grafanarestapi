//var mysql = require("mysql");
const Pool = require("pg").Pool;
//koneksi

const pool = new Pool({
  user: "postgres",
  host: "localhost", //localhost
  database: "db_grafana",
  password: "12345",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("pg connect!");
});

module.exports = pool;
