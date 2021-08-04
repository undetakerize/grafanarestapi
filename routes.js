"use strict";

module.exports = function (app) {
  var json = require("./controller");

  app.router("/").get(json.index);
};
