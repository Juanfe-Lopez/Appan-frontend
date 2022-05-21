"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../api");

var _localStorage = require("../localStorage");

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var addToCart = function addToCart(item) {
  var forceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var cartItems = (0, _localStorage.getCartItems)();
  var existItem = cartItems.find(function (x) {
    return x.product === item.product;
  });

  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map(function (x) {
        return x.product === existItem.product ? item : x;
      });
    }
  } else {
    cartItems = [].concat(_toConsumableArray(cartItems), [item]);
  }

  (0, _localStorage.setCartItems)(cartItems);

  if (forceUpdate) {
    (0, _utils.rerender)(CartScreen);
  }
};

var removeFromCart = function removeFromCart(id) {
  (0, _localStorage.setCartItems)((0, _localStorage.getCartItems)().filter(function (x) {
    return x.product !== id;
  }));

  if (id === (0, _utils.parseRequestUrl)().id) {
    document.location.hash = '/cart';
  } else {
    (0, _utils.rerender)(CartScreen);
  }
};

var CartScreen = {
  after_render: function after_render() {
    var qtySelects, deleteButtons;
    return regeneratorRuntime.async(function after_render$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            qtySelects = document.getElementsByClassName("qty-select");
            Array.from(qtySelects).forEach(function (qtySelect) {
              qtySelect.addEventListener('change', function (e) {
                var item = (0, _localStorage.getCartItems)().find(function (x) {
                  return x.product === qtySelect.id;
                });
                addToCart(_objectSpread({}, item, {
                  cantidad1: Number(e.target.value)
                }), true);
              });
            });
            deleteButtons = document.getElementsByClassName("delete-button");
            Array.from(deleteButtons).forEach(function (deleteButtons) {
              deleteButtons.addEventListener("click", function () {
                removeFromCart(deleteButtons.id);
              });
            });
            document.getElementById("checkout-button").addEventListener("click", function () {
              document.location.hash = '/shipping';
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  render: function render() {
    var request, product, cartItems;
    return regeneratorRuntime.async(function render$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            request = (0, _utils.parseRequestUrl)();

            if (!request.id) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return regeneratorRuntime.awrap((0, _api.getProduct)(request.id));

          case 4:
            product = _context2.sent;
            console.log(product);
            addToCart({
              product: product._id,
              name: product.name,
              image: product.image,
              price: product.price,
              cantidad: product.cantidad,
              cantidad1: 1
            });

          case 7:
            cartItems = (0, _localStorage.getCartItems)();
            console.log(cartItems);
            return _context2.abrupt("return", "\n            <div class='cart'>\n                <div class='cart-list'>\n                    <ul class='cart-list-container'>\n                    <a href=\"/#/\"><h2 >Volver</h2></a>\n                        <li>\n                            <h3> Carrito de Compras</h3>\n                            <div>Price</div>\n                        </li>\n                        ".concat(cartItems.length === 0 ? '<div>Ningun producto en el carrito. <a href="/#/"> Mira los productos</a>' : cartItems.map(function (item) {
              return "\n                                <li>\n                                    <div class='cart-image'>\n                                        <img src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\"/>\n                                    </div>\n                                    <div class=\"cart-name\">\n                                        <div>\n                                        <a href=\"/#/product/").concat(item.product, "\">\n                                            ").concat(item.name, "\n                                        </a>\n                                        </div>\n                                        <div>   \n                                            Cantidad: <select class=\"qty-select\" id=\"").concat(item.product, "\">\n                                                ").concat(_toConsumableArray(Array(item.cantidad).keys()).map(function (x) {
                return item.cantidad1 === x + 1 ? "<option selected value=\"".concat(x + 1, "\"> ").concat(x + 1, "</option>") : "<option  value=\"".concat(x + 1, "\"> ").concat(x + 1, "</option>");
              }), "\n                                            </select>\n                                            <button type=\"button\" class=\"delete-button\" id=\"").concat(item.product, "\">\n                                            Delete\n                                            </button>\n                                            </div>\n                                            </div>\n                                            <div class=\"cart-price\">\n                                                $").concat(item.price, "\n                                            </div>\n                                            </li>\n                                             \n                                        \n                                \n                            ");
            }).join('\n'), "\n                        \n                    </ul>\n                </div> \n                <div class=\"cart-action\">\n                        <h3>Subtotal (").concat(cartItems.reduce(function (a, c) {
              return a + c.cantidad1;
            }, 0), "  items)\n                            :\n                            $").concat(cartItems.reduce(function (a, c) {
              return a + c.price * c.cantidad1;
            }, 0), " \n                        </h3>\n                        <button id=\"checkout-button\" class=\"primary fw\"> \n                            Terminar Pedido\n                        </button>\n\n                </div>\n            </div>\n        "));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
var _default = CartScreen;
exports["default"] = _default;