"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _localStorage = require("../localStorage");

var _api = require("../api");

var convertCartToOrder = function convertCartToOrder() {
  var orderItems = (0, _localStorage.getCartItems)();

  if (orderItems.length === 0) {
    document.location.hash = '/cart';
  }

  var shipping = (0, _localStorage.getShipping)();

  if (!shipping.address) {
    document.location.hash = '/shipping';
  }

  var itemsPrice = orderItems.reduce(function (a, c) {
    return a + c.price * c.cantidad1;
  }, 0);
  var totalPrice = itemsPrice;
  return {
    orderItems: orderItems,
    shipping: shipping,
    itemsPrice: itemsPrice,
    totalPrice: totalPrice
  };
};

var PlaceOrderScreen = {
  after_render: function after_render() {
    return regeneratorRuntime.async(function after_render$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            document.getElementById('placeorder-button').addEventListener('click', function _callee() {
              var order, data, _convertCartToOrder, orderItems, shipping, totalPrice, carrito, domicilio, i, total;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      order = convertCartToOrder();
                      _context.next = 3;
                      return regeneratorRuntime.awrap((0, _api.createOrder)(order));

                    case 3:
                      data = _context.sent;

                      if (data.error) {
                        showMessage(data.error);
                      } else {
                        _convertCartToOrder = convertCartToOrder(), orderItems = _convertCartToOrder.orderItems, shipping = _convertCartToOrder.shipping, totalPrice = _convertCartToOrder.totalPrice;
                        carrito = [];
                        domicilio = new String("Direccion: " + shipping.address + "\n Nombre: " + shipping.name + "\n Telefono: " + shipping.phone + "\n" + shipping.comment);

                        for (i = 0; i < orderItems.length; i++) {
                          carrito[i] = orderItems[i].name + " Cantidad: " + orderItems[i].cantidad1 + " Precio: " + orderItems[i].price * orderItems[i].cantidad1 + "\n";
                        }

                        total = "\n TOTAL:" + totalPrice;
                        console.log(carrito.toString() + "\n " + domicilio.toString() + "\n" + total);
                        (0, _localStorage.cleanCart)();
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
    var _convertCartToOrder2 = convertCartToOrder(),
        orderItems = _convertCartToOrder2.orderItems,
        shipping = _convertCartToOrder2.shipping,
        itemsPrice = _convertCartToOrder2.itemsPrice,
        totalPrice = _convertCartToOrder2.totalPrice;

    return "\n      <div>\n        \n        <div class=\"order\">\n          <div class=\"order-info\">\n            <div>\n            <h1>Ya casi termina, Confirme los siguientes datos </h1>\n              <h2>Datos Domicilio:</h2>\n              <div>\n              ".concat(shipping.address, ", ").concat(shipping.name, ", ").concat(shipping.phone, ", \n              ").concat(shipping.comment, "\n              </div>\n            </div>\n            <div>\n              <ul class=\"cart-list-container\">\n                <li>\n                  <h2>Shopping Cart</h2>\n                  <div>Price</div>\n                </li>\n                ").concat(orderItems.map(function (item) {
      return "\n                  <li>\n                    <div class=\"cart-image\">\n                      <img src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\" />\n                    </div>\n                    <div class=\"cart-name\">\n                      <div>\n                        <a href=\"/#/product/").concat(item.product, "\">").concat(item.name, " </a>\n                      </div>\n                      <div> Qty: ").concat(item.cantidad1, " </div>\n                    </div>\n                    <div class=\"cart-price\"> $").concat(item.price, "</div>\n                  </li>\n                  ");
    }).join('\n'), "\n              </ul>\n            </div>\n          </div>\n          <div class=\"order-action\">\n             <ul>\n                  <li>\n                    <h2>Resumen del pedido</h2>\n                   </li>\n                   \n                   <li class=\"total\"><div>Total</div><div>$").concat(totalPrice, "</div></li> \n                   <li>\n                   <button id=\"placeorder-button\" class=\"primary fw\">\n                   Terminar\n                   </button>\n          </div>\n        </div>\n      </div>\n      ");
  }
};
var _default = PlaceOrderScreen;
exports["default"] = _default;