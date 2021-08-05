"use strict";

var response = require("./res");
var pool = require("./koneksi");
const { default: axios } = require("axios");

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

/*exports.webhook = function (req, res) {
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
        console.log(res);
        response.ok("data webhook added!", res);
      }
    }
  );
};
*/

exports.webhook = function (req, res) {
  // var body = req.body;
  //var evalMatchesv = evalMatches.values;
  // var dashboardId = x.dashboardId;
  //var noinduk = req.body.dashboardID;
  //var x = JSON.stringify(req.body.dashboardId);
  var dashboardId = JSON.stringify(req.body.dashboardId);
  var message = JSON.parse(JSON.stringify(req.body.message));
  var ruleName = JSON.stringify(req.body.ruleName);
  var state = JSON.parse(JSON.stringify(req.body.state));
  var title = JSON.parse(JSON.stringify(req.body.title));
  var evalMatches = JSON.stringify(req.body.evalMatches[0]["value"]);

  var postData = {
    message: title + "\r\n" + message + "\r\n" + state,
    to: "6281321474678",
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "LICENSE-API-KEY": "p3rb@r1nd0",
    },
  };

  axios
    .post(
      "http://wapi.dak.web.id/api/whatsapp/send_message",
      postData,
      axiosConfig
    )
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};

/*
exports.webhook = function (req, res) {
  // var body = req.body;
  //var evalMatchesv = evalMatches.values;
  // var dashboardId = x.dashboardId;
  //var noinduk = req.body.dashboardID;
  //var x = JSON.stringify(req.body.dashboardId);
  var dashboardId = JSON.stringify(req.body.dashboardId);
  var message = JSON.stringify(req.body.message);
  var ruleName = JSON.stringify(req.body.ruleName);
  var state = JSON.parse(JSON.stringify(req.body.state));
  var title = JSON.parse(JSON.stringify(req.body.title));
  var evalMatches = JSON.stringify(req.body.evalMatches[0]["value"]);

  axios({
    method: "post",
    url: "http://wapi.dak.web.id/api/whatsapp/send_message",
    data: {
      message: "hi all",
      to: "6281321474678",
    },
    headers: {
      "Content-type": "application/json",
      "LICENSE-API-KEY": "p3rb@r1nd0",
    },
  })
    .then((res) => {
      //  console.log(`statusCode: ${res.status}`);
      res.sendStatus(200);
      // response.ok("ok!", res);
    })
    .catch((error) => {
      console.error(error);
    });
};
*/
