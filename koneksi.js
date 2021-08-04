var mysql = require("mysql");
var pg = require("pg");
//koneksi

const pool = new pg.Pool({
  user: "postgres",
  host: "127.0.0.1", //localhost
  database: "db_siswa",
  password: "12345",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("pg connect!");
});

module.export = pool;
