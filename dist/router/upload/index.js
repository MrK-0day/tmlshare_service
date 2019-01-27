"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Upload = void 0;

var _lodash = require("lodash");

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _qrImage = _interopRequireDefault(require("qr-image"));

var _sha = _interopRequireDefault(require("crypto-js/sha512"));

var _config = require("../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Upload = _express.default.Router();

exports.Upload = Upload;

var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});

Upload.post("/uploads", (0, _multer.default)({
  storage: storage
}).array('file', 20),
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var files, qr_png;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // console.log(req.files)
            files = (0, _lodash.map)(req.files, function (file) {
              return {
                url: "".concat(_config.API.HOST, "/static/ios/").concat(file.filename)
              };
            });
            qr_png = _qrImage.default.image(JSON.stringify(files), {
              type: 'png',
              ec_level: 'H',
              margin: 1,
              parse_url: true
            });
            qr_png.pipe(_fsExtra.default.createWriteStream("src/uploads_qr/".concat((0, _sha.default)(JSON.stringify(files)).toString(), ".png")));
            res.json({
              qr_image: "".concat(_config.API.HOST, "/static/images/").concat((0, _sha.default)(JSON.stringify(files)).toString(), ".png")
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());