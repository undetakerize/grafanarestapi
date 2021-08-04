"use strict";

module.exports = function (app) {
  var json = require("./controller");

  app.routes("/").get(json.index);
};
