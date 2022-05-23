import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import { parseRequestUrl, rerender } from "../utils.js";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
      if (forceUpdate) {
        cartItems = cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      }
    } else {
      cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate) {
      rerender(CartScreen);
    }
  };
const removeFromCart=(id)=>{

    setCartItems(getCartItems().filter(x=> x.product!==id));
    if(id===parseRequestUrl().id){
        document.location.hash= '/cart';

    }
    else{
        rerender(CartScreen);
    }
}
const CartScreen={
    after_render:async()=>{
        const qtySelects= document.getElementsByClassName("qty-select");
        Array.from(qtySelects).forEach(qtySelect =>{
            qtySelect.addEventListener('change',(e)=>{
                const item= getCartItems().find(x=> x.product=== qtySelect.id);
                addToCart({...item, cantidad1: Number(e.target.value)}, true)
            });
        });

        const deleteButtons= document.getElementsByClassName("delete-button");
        Array.from(deleteButtons).forEach(deleteButtons=>{

            deleteButtons.addEventListener("click", ()=>{

                removeFromCart(deleteButtons.id);
            })
        })
        document.getElementById("checkout-button").addEventListener("click", ()=>{

            document.location.hash='/shipping';
        })
    },
    render: async()=>{
        const request= parseRequestUrl();
        if(request.id){
            const product= await getProduct(request.id);
            console.log(product);
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                cantidad: product.cantidad,
                cantidad1: 1,


            });

        }
        const cartItems=getCartItems();
        console.log(cartItems);

        return `
            <div class='cart'>
                <div class='cart-list'>
                    <ul class='cart-list-container'>
                    <a href="/#/"><h2 >Volver</h2></a>
                        <li>
                            <h3> Carrito de Compras</h3>
                            <div>Price</div>
                        </li>
                        ${
                            cartItems.length === 0 ? 
                            '<div>Ningun producto en el carrito. <a href="/#/"> Mira los productos</a>':    
                            cartItems.map(item=>`
                                <li>
                                    <div class='cart-image'>
                                        <img src="${item.image}" alt="${item.name}"/>
                                    </div>
                                    <div class="cart-name">
                                        <div>
                                        <a href="/#/product/${item.product}">
                                            ${item.name}
                                        </a>
                                        </div>
                                        <div>   
                                            Cantidad: <select class="qty-select" id="${item.product}">
                                                ${
                                                    [...Array(item.cantidad).keys()].map(x=>item.cantidad1=== x+1?
                                                            `<option selected value="${x +1}"> ${x+1}</option>`
                                                            :`<option  value="${x +1}"> ${x+1}</option>`

                                                        )
                                                }
                                            </select>
                                            <button type="button" class="delete-button" id="${item.product}">
                                            Delete
                                            </button>
                                            </div>
                                            </div>
                                            <div class="cart-price">
                                                $${item.price}
                                            </div>
                                            </li>
                                             
                                        
                                
                            `

                                ).join('\n')
                        }
                        
                    </ul>
                </div> 
                <div class="cart-action">
                        <h3>Subtotal (${cartItems.reduce((a,c) =>a +c.cantidad1, 0)}  items)
                            :
                            $${cartItems.reduce((a,c)=> a+c.price*c.cantidad1, 0)} 
                        </h3>
                        <button id="checkout-button" class="primary fw"> 
                            Terminar Pedido
                        </button>

                </div>
            </div>
        `;
 
    

    },

};
export default CartScreen;