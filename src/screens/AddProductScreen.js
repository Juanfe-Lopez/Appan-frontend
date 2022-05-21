import axios from 'axios';
import { createProduct, uploadProductImage } from '../api';
import { getAdminInfo } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';


const AddProductScreen = {

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
              const data= await createProduct({

                  name: document.getElementById("name").value,
                  info: document.getElementById("info").value,
                  image: '/images/product-1.jpeg',
                  price: document.getElementById("price").value,
                  cantidad: document.getElementById("cantidad").value

                });
                hideLoading();
            
              
              if (data.error) {
                alert(data.error);
              }
              else{
                showMessage("Producto Agregado con exito");
                document.location.hash ='/';
              }
          }
          });
          document
          .getElementById('image-file')
          .addEventListener('change', async (e) => {
            const file = e.target.files[0];
            const name = document.getElementById('image-file').value;
            const formData = new FormData();  
            formData.append('image-file', file);
            showLoading();
            //const data = await uploadProductImage(formData);
            hideLoading();
            /*if (data.error) {
              showMessage(data.error);
            } else {*/
              showMessage('Image uploaded successfully.');
              document.getElementById('image').value = name;
            //}
          });

          
      },


    
    render: () => {
      if(!getAdminInfo().usuario){
        document.location.hash='/'
      }
      
      return `
      <div class="form-container">
        <form id="shipping-form">
          <ul class="form-items">
          <a href="/#/menu">Volver</a>
            <li>
              <h1>Crear Producto </h1>
            </li>
            <li>
              <label for="name">Nombre</label>
              <input type="text" name="name" id="name"  />
            </li>
            <li>
              <label for="info">Informacion</label>
              <input type="text" name="info" id="info" />
            </li>
            <li>
              <label for="img">Imagen</label>
              <input type="text" name="image" id="image"  disabled/>
              <input type="file" name="image-file" id="image-file" />
            </li>
            <li>
              <label for="price">Precio:</label>
              <input type="number" name="price" id="price" />
            </li>
            <li>
            <label for="cantidad">Cantidad:</label>
            <input type="number" name="cantidad" id="cantidad" />
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
export default AddProductScreen;