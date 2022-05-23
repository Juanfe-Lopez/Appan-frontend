import { getProduct } from '../api.js';
import {parseRequestUrl} from '../utils.js';
const ProductScreen={

    after_render: ()=>{

        const request= parseRequestUrl();
        document.getElementById("add-button").addEventListener('click',
        ()=>{
            document.location.hash =`/cart/${request.id}`; 
        } 
        );
    },
    render: async()=>{
        
        const request= parseRequestUrl();
        console.log(request.id);
        const product= await getProduct((request.id));
        console.log(product);
        if(product.error){
            return`
            <h1> Producto no encontrado</h1>
        `;
        }
        return`
        <div class='back'>
                <a href='/#/'>Volver</a>
                </div>
            <div class='content'>
                
                <div class='details'>
                    <div class='details-img'>
                        <img src='${product.image}' alt='${product.name}'/>
                    </div>
                    <div>
                        <div class='details-info'>
                            <ul>
                                <li>
                                    <h1> ${product.name}</h1>
                                </li>
                                <li>
                                    ${product.info}
                                </li>
                                <li>
                                    Precio:  <strong> ${product.price}</strong>
                                </li>
                            </ul>
                        </div>
                        <div class='details-action'>
                            <ul>
                            <li>
                                Precio: ${product.price}
                            </li>
                            <li>
                            Disponibilidad: 
                            ${product.cantidad > 0 ? 
                                `<span class='success'> Si tenemos </span>`:
                            `<span class="error"> No hay de este pan </span>`}
                            </li>
                            <li>
                            ${product.cantidad >0 ? 
                                `<button class="primary" id="add-button"> Agregar al Carrito </button>`:
                                `<button class="primary" id="add-button" disabled> Agregar al Carrito </button>`
                            }
                            
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

};
export default ProductScreen;