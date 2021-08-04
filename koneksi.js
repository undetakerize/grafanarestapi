var mysql = require("mysql");

//koneksi

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "postres",
  database: "db",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("mysql connect!");
});

module.export = conn;
