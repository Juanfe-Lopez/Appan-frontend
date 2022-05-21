"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _localStorage = require("../localStorage");

var ShippingScreen = {
  after_render: function after_render() {
    document.getElementById('shipping-form').addEventListener('submit', function _callee(e) {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              (0, _localStorage.setShipping)({
                address: document.getElementById('address').value,
                name: document.getElementById('city').value,
                phone: document.getElementById('postalCode').value,
                comment: document.getElementById('country').value
              });
              document.location.hash = '/order';

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  },
  render: function render() {
    var _getShipping = (0, _localStorage.getShipping)(),
        address = _getShipping.address,
        name = _getShipping.name,
        phone = _getShipping.phone,
        comment = _getShipping.comment;

    return "\n    <div class=\"form-container\">\n      <form id=\"shipping-form\">\n        <ul class=\"form-items\">\n          <li>\n            <h1>Shipping</h1>\n          </li>\n          <li>\n            <label for=\"address\">Direccion</label>\n            <input type=\"text\" name=\"address\" id=\"address\" value=\"".concat(address, "\" />\n          </li>\n          <li>\n            <label for=\"city\">Nombre cliente</label>\n            <input type=\"text\" name=\"name\" id=\"city\" value=\"").concat(name, "\" />\n          </li>\n          <li>\n            <label for=\"postalCode\">Telefono</label>\n            <input type=\"text\" name=\"phone\" id=\"postalCode\" value=\"").concat(phone, "\" />\n          </li>\n          <li>\n            <label for=\"country\">Comentarios:</label>\n            <input type=\"text\" name=\"comment\" id=\"country\" value=\"").concat(comment, "\" />\n          </li>\n          <li>\n            <button type=\"submit\" class=\"primary\">Continue</button>\n          </li>        \n        </ul>\n      </form>\n    </div>\n    ");
  }
};
var _default = ShippingScreen;
exports["default"] = _default;