"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);

  app.route("/tampil").get(jsonku.tampilData);

  app.route("/tampil/:id").get(jsonku.tampilById);

  app.route("/tambah").post(jsonku.addData);

  app.route("/update/:id").put(jsonku.updateData);

  app.route("/webhook").post(jsonku.webhook);
};
