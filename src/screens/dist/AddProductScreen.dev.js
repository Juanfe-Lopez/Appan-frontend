"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _api = require("../api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
  
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
  });*/
var AddProductScreen = {
  after_render: function after_render() {
    return regeneratorRuntime.async(function after_render$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            document.getElementById('shipping-form').addEventListener('submit', function _callee(e) {
              var data;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      e.preventDefault();
                      _context.next = 3;
                      return regeneratorRuntime.awrap((0, _api.createProduct)({
                        name: document.getElementById("name").value,
                        info: document.getElementById("info").value,
                        image: "/images/product-1.jpeg",
                        price: document.getElementById("price").value,
                        cantidad: document.getElementById("cantidad").value
                      }));

                    case 3:
                      data = _context.sent;

                      if (data.error) {
                        alert(data.error);
                      } else {
                        document.location.hash = '/';
                      }

                    case 5:
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
    return "\n      <div class=\"form-container\">\n        <form id=\"shipping-form\">\n          <ul class=\"form-items\">\n            <li>\n              <h1>Crear Producto </h1>\n            </li>\n            <li>\n              <label for=\"name\">Nombre</label>\n              <input type=\"text\" name=\"name\" id=\"name\"  />\n            </li>\n            <li>\n              <label for=\"info\">Informacion</label>\n              <input type=\"text\" name=\"info\" id=\"info\" />\n            </li>\n            <li>\n              <label for=\"img\">Imagen</label>\n              <input type=\"file\" name=\"img\" id=\"img\"  />\n            </li>\n            <li>\n              <label for=\"price\">Precio:</label>\n              <input type=\"number\" name=\"price\" id=\"price\" />\n            </li>\n            <li>\n            <label for=\"cantidad\">Cantidad:</label>\n            <input type=\"number\" name=\"cantidad\" id=\"cantidad\" />\n          </li>\n            <li>\n              <button type=\"submit\" class=\"primary\">Guardar</button>\n            </li>        \n            \n          </ul>\n        </form>\n      </div>\n      ";
  }
};
var _default = AddProductScreen;
exports["default"] = _default;