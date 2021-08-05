"use strict";

var response = require("./res");
var pool = require("./koneksi");

exports.index = function (req, res) {
  response.ok("rest api running", res);
};

//get data
exports.tampilData = function (req, res) {
  pool.query("SELECT *FROM tb_grafana_alert", function (error, rows, fields) {
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
    "SELECT * FROM tb_grafana_alert WHERE noinduk = $1",
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

//add data ex
exports.addData = function (req, res) {
  var noinduk = req.body.noinduk;
  var nama = req.body.nama;
  var alamat = req.body.alamat;
  var hobi = req.body.hobi;

  pool.query(
    "INSERT INTO tb_grafana_alert (noinduk,nama,alamat,hobi) VALUES($1,$2,$3,$4)",
    [noinduk, nama, alamat, hobi],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("data added!", res);
      }
    }
  );
};

//update data by id
exports.updateData = function (req, res) {
  let id = req.params.id;
  //  var noinduk = req.body.noinduk;
  var nama = req.body.nama;
  var alamat = req.body.alamat;
  var hobi = req.body.hobi;

  pool.query(
    "UPDATE tb_siswa SET nama=$1 , alamat=$2 , hobi=$3 WHERE noinduk=$4",
    [nama, alamat, hobi, id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("data update", res);
      }
    }
  );
};

exports.webhook = function (req, res) {
  // var body = req.body;
  //var evalMatchesv = evalMatches.values;
  // var dashboardId = x.dashboardId;
  //var noinduk = req.body.dashboardID;
  //var x = JSON.stringify(req.body.dashboardId);
  var dashboardId = JSON.stringify(req.body.dashboardId);
  var message = JSON.stringify(req.body.message);
  var ruleName = JSON.stringify(req.body.ruleName);
  var state = JSON.stringify(req.body.state);
  var title = JSON.parse(JSON.stringify(req.body.title));
  var evalMatches = JSON.stringify(req.body.evalMatches[0]["value"]);

  pool.query(
    "INSERT INTO tb_grafana_alert (dashboardid,message,rulename,state,title) VALUES($1,$2,$3,$4,$5)",
    [dashboardId, message, ruleName, state, title],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("data webhook added!", res);
      }
    }
  );
};
