"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../api");

var _utils = require("../utils");

var ProductScreen = {
  after_render: function after_render() {
    var request = (0, _utils.parseRequestUrl)();
    document.getElementById("add-button").addEventListener('click', function () {
      document.location.hash = "/cart/".concat(request.id);
    });
  },
  render: function render() {
    var request, product;
    return regeneratorRuntime.async(function render$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = (0, _utils.parseRequestUrl)();
            console.log(request.id);
            _context.next = 4;
            return regeneratorRuntime.awrap((0, _api.getProduct)(request.id));

          case 4:
            product = _context.sent;
            console.log(product);

            if (!product.error) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", "\n            <h1> Producto no encontrado</h1>\n        ");

          case 8:
            return _context.abrupt("return", "\n        <div class='back'>\n                <a href='/#/'>Volver</a>\n                </div>\n            <div class='content'>\n                \n                <div class='details'>\n                    <div class='details-img'>\n                        <img src='".concat(product.image, "' alt='").concat(product.name, "'/>\n                    </div>\n                    <div>\n                        <div class='details-info'>\n                            <ul>\n                                <li>\n                                    <h1> ").concat(product.name, "</h1>\n                                </li>\n                                <li>\n                                    ").concat(product.info, "\n                                </li>\n                                <li>\n                                    Precio:  <strong> ").concat(product.price, "</strong>\n                                </li>\n                            </ul>\n                        </div>\n                        <div class='details-action'>\n                            <ul>\n                            <li>\n                                Precio: ").concat(product.price, "\n                            </li>\n                            <li>\n                            Disponibilidad: \n                            ").concat(product.cantidad > 0 ? "<span class='success'> Si tenemos </span>" : "<span class=\"error\"> No hay de este pan </span>", "\n                            </li>\n                            <li>\n                            ").concat(product.cantidad > 0 ? "<button class=\"primary\" id=\"add-button\"> Agregar al Carrito </button>" : "<button class=\"primary\" id=\"add-button\" disabled> Agregar al Carrito </button>", "\n                            \n                            </li>\n                        </ul>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
var _default = ProductScreen;
exports["default"] = _default;