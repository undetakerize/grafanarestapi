"use strict";

var response = require("./res");
var pool = require("./koneksi");

exports.index = function (req, res) {
  response.ok("rest api running", res);
};

//get data
exports.tampilData = function (req, res) {
  pool.query("SELECT *FROM tb_siswa", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkan semua berdasar id sample
exports.tampilById = function (req, res) {
  let id = req.params.id;
  pool.query(
    "SELECT * FROM tb_siswa WHERE noinduk = $1",
    [id],
    function (error, rows) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
