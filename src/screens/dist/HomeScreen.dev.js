"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HomeScreen = {
  render: function render() {
    var response, products;
    return regeneratorRuntime.async(function render$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap((0, _axios["default"])({
              url: 'http://localhost:5000/api/products',
              headers: {
                "Content-Type": "application/json"
              }
            }));

          case 2:
            response = _context.sent;

            if (!(!response || response.statusText !== 'OK')) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", "<div>Error Importando datos</div>");

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(response.data);

          case 7:
            products = _context.sent;
            return _context.abrupt("return", "\n        <ul class=\"products\">\n        ".concat(products.map(function (product) {
              return " \n            <li>\n            <div class=\"product\">\n                            <a href=\"/#/product/".concat(product._id, "\">\n                                <img src=\"").concat(product.image, "\" alt=\"").concat(product.name, "\"/>\n                            </a>\n                        <div class=\"product-name\">\n                            <a href=\"/#/product/").concat(product._id, "\">\n                                ").concat(product.name, "\n                            </a>\n                        </div>\n                        <div class=\"product-info\">\n                            \n                                ").concat(product.info, "\n                            \n                        </div>\n                        <div class=\"product-price\">\n                            \n                        $").concat(product.price, "\n                        </div>\n                        </div>\n            </li>\n        ");
            }).join('\n'), "\n        "));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
var _default = HomeScreen;
exports["default"] = _default;