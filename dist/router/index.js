"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _upload = require("./upload");

Object.keys(_upload).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _upload[key];
    }
  });
});