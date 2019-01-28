"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _compression = _interopRequireDefault(require("compression"));

var _cors = _interopRequireDefault(require("cors"));

var _config = require("./config");

var _router = require("./router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express.default)();
app.use((0, _compression.default)());
app.use((0, _cors.default)());
app.all('/', function (req, res, next) {
  res.send('Fuck your bitch !!!');
  next();
});
app.use('/static/images', _express.default.static(_path.default.join(__dirname, 'uploads_qr')));
app.use('/static/ios', _express.default.static(_path.default.join(__dirname, 'uploads')));
app.use("/".concat(_config.API.VERSION), _router.Upload);
app.listen(process.env.PORT || 80, function () {
  console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(process.env.PORT, "."));
});