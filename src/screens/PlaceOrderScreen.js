import {
    getCartItems,
    getShipping,
    cleanCart,
  } from '../localStorage.js';

  import { createOrder, sendMessage } from '../api.js';
import { hideLoading, showLoading, showMessage } from '../utils.js';
  
  const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if (orderItems.length === 0) {
      document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if (!shipping.address) {
      document.location.hash = '/shipping';
    }
    const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.cantidad1, 0);
    const totalPrice = itemsPrice;
    return {
      orderItems,
      shipping,
      itemsPrice,
      totalPrice
    };
  };
  const PlaceOrderScreen = {
    after_render: async () => {
      document
        .getElementById('placeorder-button')
        .addEventListener('click', async () => {
          showLoading();
          const order = convertCartToOrder();
          const data = await createOrder(order);
          if (data.error) {
            showMessage(data.error);
          } else {
            const {
              orderItems,
              shipping,
              totalPrice
            } = convertCartToOrder();
            const carrito =[];
            const domicilio= new String("Direccion: "+shipping.address+"\n Nombre: "+shipping.name+"\n Telefono: "+shipping.phone+"\n"+ shipping.comment);
            for (let i = 0; i < orderItems.length; i++) {
              carrito[i] = orderItems[i].name +" Cantidad: "+orderItems[i].cantidad1 +" Precio: "+orderItems[i].price * orderItems[i].cantidad1+"\n";
            }
            
            const total= "\n TOTAL:"+ totalPrice;
            
            console.log(carrito.toString()+"\n "+ domicilio.toString()+"\n"+ total);
            const msg= (carrito.toString()+"\n "+ domicilio.toString()+"\n"+ total).toString();
            if(sendMessage(msg)){

              createOrder(orderItems, shipping, totalPrice);
              cleanCart();
              hideLoading();
              showMessage("Pedido enviado correctamente");
            }else{
              hideLoading();
              showMessage("Se puteo todo");
            }

            document.location.hash = '/';
          }
        });
    },
    render: () => {
      const {
        orderItems,
        shipping,
        itemsPrice,
        totalPrice
      } = convertCartToOrder();
      return `
      <div>
        
        <div class="order">
          <div class="order-info">
            <div>
            <a href="/#/shipping"> <h4>Volver</h4></a>
            <h1>Ya casi termina, Confirme los siguientes datos </h1>
              <h2>Datos Domicilio:</h2>
              <div>
              ${shipping.address}, ${shipping.name}, ${shipping.phone}, 
              ${shipping.comment}
              </div>
            </div>
            <div>
              <ul class="cart-list-container">
                <li>
                  <h2>Shopping Cart</h2>
                  <div>Price</div>
                </li>
                ${orderItems
                  .map(
                    (item) => `
                  <li>
                    <div class="cart-image">
                      <img src="${item.image}" alt="${item.name}" />
                    </div>
                    <div class="cart-name">
                      <div>
                        <a href="/#/product/${item.product}">${item.name} </a>
                      </div>
                      <div> Qty: ${item.cantidad1} </div>
                    </div>
                    <div class="cart-price"> $${item.price}</div>
                  </li>
                  `
                  )
                  .join('\n')}
              </ul>
            </div>
          </div>
          <div class="order-action">
             <ul>
                  <li>
                    <h2>Resumen del pedido</h2>
                   </li>
                   
                   <li class="total"><div>Total</div><div>$${totalPrice}</div></li> 
                   <li>
                   <button id="placeorder-button" class="primary fw">
                   Terminar
                   </button>
          </div>
        </div>
      </div>
      `;
    },
  };
  export default PlaceOrderScreen;