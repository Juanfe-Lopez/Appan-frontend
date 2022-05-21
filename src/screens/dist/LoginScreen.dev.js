"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _api = require("../api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LoginScreen = {
  after_render: function after_render() {
    return regeneratorRuntime.async(function after_render$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            document.getElementById('shipping-form').addEventListener('submit', function _callee(e) {
              var usuario, password;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      e.preventDefault();
                      usuario = document.getElementById("user").value;
                      password = document.getElementById("pass").value;

                      if (usuario !== "admin" || password !== "1234") {
                        alert("Credenciales incorrectas, por favor intentelo nuevamente");
                      } else {
                        document.location.hash = '/menu';
                      }

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  render: function render() {
    return "\n      <div class=\"form-container\">\n        <form id=\"shipping-form\">\n          <ul class=\"form-items\">\n            <li>\n              <h1>Ingresar </h1>\n            </li>\n            <li>\n              <label for=\"user\">Usuario</label>\n              <input type=\"text\" name=\"user\" id=\"user\" placeholder=\"usuario\" />\n            </li>\n            <li>\n              <label for=\"pass\">Contrase\xF1a</label>\n              <input type=\"password\" name=\"pass\" id=\"pass\" placeholder=\"contrase\xF1a\" />\n            </li>\n            <li>\n              <button type=\"submit\" class=\"primary\">Ingresar</button>\n            </li>        \n            \n          </ul>\n        </form>\n      </div>\n      ";
  }
};
var _default = LoginScreen;
exports["default"] = _default;