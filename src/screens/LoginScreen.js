import { getAdmin } from "../api";
import axios from 'axios';
import { getAdminInfo, setAdminInfo } from "../localStorage";
import { hideLoading, showLoading } from "../utils";



const LoginScreen = {

    after_render: async () => {   
             
            document.getElementById('shipping-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        
            const usuario= document.getElementById("user").value;
            const password= document.getElementById("pass").value;
            showLoading();
            const response= await axios({
              url: 'http://localhost:5000/api/users',
              headers: {
                  "Content-Type":"application/json",
              },
        
              });
              if(!response || response.statusText!== 'OK'){
      
                  return  `<div>Error Importando datos</div>`;
              }
              const data= await response.data;
              hideLoading();
            if (usuario===data[0].user && password===data[0].password){
                setAdminInfo({usuario,password});
                console.log(getAdminInfo().usuario);
                document.location.hash='/menu'

                  } 
                  else{
                    alert("Credenciales Incorrectas");
                  }
                
              
        
          
          });
          
      },


    
    render: () => {

      if(getAdminInfo().usuario){
        document.location.hash='/menu'
      }
      return `
      <div class="form-container">
        <form id="shipping-form">
          <ul class="form-items">
            <li>
              <h1>Ingresar </h1>
            </li>
            <li>
              <label for="user">Usuario</label>
              <input type="text" name="user" id="user" placeholder="usuario" />
            </li>
            <li>
              <label for="pass">Contraseña</label>
              <input type="password" name="pass" id="pass" placeholder="contraseña" />
            </li>
            <li>
              <button type="submit" class="primary">Ingresar</button>
            </li>        
            
          </ul>
        </form>
      </div>
      `;
    },
  };
export default LoginScreen;