import axios from "axios";
import { deleteProduct, getProduct } from "../api.js";
import { getAdminInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const DeleteProductScreen = {

    after_render: async () => {   
             
            document.getElementById('prod').addEventListener('change', async (e) => {
            e.preventDefault();
            showLoading();
            document.getElementById('deleteButton').disabled = false;
        

            const deletedId= document.getElementById("prod").value;
            const product= await getProduct(deletedId);
            document.getElementById('name').value= product.name;
            document.getElementById('info').value= product.info;
            document.getElementById('price').value= product.price;
            document.getElementById('cantidad').value= product.cantidad;
            hideLoading();

           
            
          });
          document.getElementById('deleteButton').addEventListener('click', async (e) => {
            e.preventDefault();

            const deletedId= document.getElementById("prod").value;
            const product= await getProduct(deletedId);

            if(confirm("Seguro qué quieres borrar este producto: \n"+product.name +"\n"+product.info)){    
                const data= deleteProduct(deletedId);

                if (data.error) {
                    alert(data.error);
                }
                else{
                  showMessage('Producto eliminado');
                    document.location.hash ='/';
                }
            }
            
        });
          
      },


    
    render: async() => {
      if(!getAdminInfo().usuario){
        document.location.hash='/'
      }
        const response= await axios({
            url: 'https://appan-dinamita.herokuapp.com/api/products',
            headers: {
                "Content-Type":"application/json",
            },
      
            });
            if(!response || response.statusText!== 'OK'){
    
                return  `<div>Error Importando datos</div>`;
            }
            const products= await response.data;
      return `
      <div class="form-container">
        <form id="shipping-form">
          <ul class="form-items">
          <a href="/#/menu">Volver</a>
            <li>
              <h1>Borrar Producto </h1>
            </li>
            <li>
             <label for="prod">Escoge el producto:</label>

             <select name="prod" id="prod">
             
                <option disabled selected>Escoge el producto</option>
                ${products.map((product)=>`
                <option value="${product._id}">${product.name}</option>
                `).join('\n')}
            </select>
            <li>
              <label for="name">Nombre</label>
              <input type="text" name="name" id="name"  disabled  />
            </li>
            <li>
              <label for="info">Informacion</label>
              <input type="text" name="info" id="info" disabled/>
            </li>
            
            <li>
              <label for="price">Precio:</label>
              <input type="number" name="price" id="price" disabled/>
            </li>
            <li>
            <label for="cantidad">Cantidad:</label>
            <input type="number" name="cantidad" id="cantidad" disabled/>
          </li>
          
            <li>
              <button type="submit" id='deleteButton' class="primary" disabled>Borrar</button>
            </li>        
            
          </ul>
        </form>
      </div>
      `;
    },
  };
export default DeleteProductScreen;