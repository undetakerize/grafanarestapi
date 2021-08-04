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
      pool.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
