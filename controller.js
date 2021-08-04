"use strict";

var response = require("./res");
var connection = require("./koneksi");

exports.index = function (req, res) {
  response.ok("rest api running", res);
};

//get data
exports.tampilData = function (req, res) {
  connection.query("SELECT *FROM tb_siswa", function (error, rows, fields) {
    if (error) {
      connection.log(error);
    } else {
      response.ok(rows, response);
    }
  });
};
