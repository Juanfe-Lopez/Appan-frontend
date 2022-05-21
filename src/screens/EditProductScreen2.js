import axios from 'axios';
import {  updateProduct } from '../api';
import { getProduct } from '../api';
import { getAdminInfo } from '../localStorage';
import {hideLoading, parseRequestUrl, showLoading, showMessage} from '../utils';
const EditProductScreen2 = {

    after_render: async () => {   
             
            document.getElementById('shipping-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
            showLoading();
            if(document.getElementById("name").value==="" || 
            document.getElementById("info").value==="" ||
            document.getElementById("price").value==="" ||
            document.getElementById("cantidad").value==="" ){
              showMessage("Por favor ingrese No deje ningun espacio vació");
              hideLoading();
            }
            else if(parseFloat(document.getElementById("price").value) < 0 || parseInt(document.getElementById("cantidad").value) <0 ){
              showMessage("Por favor ingrese un valor postivio para las casillas de precio y cantidad");
              hideLoading();
            }
            else{
              const data= await updateProduct({
                  id: document.getElementById("id").value,
                  name: document.getElementById("name").value,
                  info: document.getElementById("info").value,
                  price: document.getElementById("price").value,
                  cantidad: document.getElementById("cantidad").value

              });
              hideLoading();
              
              if (data.error !== "Request failed with status code 500") {
                alert(data.error);
              }
              else{
                showMessage("Producto editado con exito");
                document.location.hash ='/';
              }
          }
          });
          
      },


    
    render: async() => {
      if(!getAdminInfo().usuario){
        document.location.hash='/'
      }
        const request= parseRequestUrl();
        console.log(request.id);
        const product= await getProduct((request.id));
        console.log(product);
        if(product.error){
            return`
            <h1> Producto no encontrado</h1>
        `;
        }
      
      return `
      
      <div class="form-container">
        <form id="shipping-form">
          <ul class="form-items">
          <a href="/#/menu">Volver</a>
            <li>
              <h1>Editar Producto </h1>
              <input type="text" name="name" id="id" value="${product._id}" disabled/>

            </li>
            <li>
              <label for="name">Nombre</label>
              <input type="text" name="name" id="name" value="${product.name}" />
            </li>
            <li>
              <label for="info">Informacion</label>
              <input type="text" name="info" id="info" value="${product.info}"/>
            </li>
            
            <li>
              <label for="price">Precio:</label>
              <input type="number" name="price" id="price" value="${product.price}"/>
            </li>
            <li>
            <label for="cantidad">Cantidad:</label>
            <input type="number" name="cantidad" id="cantidad" value="${product.cantidad}"/>
          </li>
            <li>
              <button type="submit" class="primary">Guardar</button>
            </li>        
            
          </ul>
        </form>
      </div>
      `;
    },
  };
export default EditProductScreen2;