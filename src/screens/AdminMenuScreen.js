import { getAdminInfo } from "../localStorage.js";

const AdminMenuScreen = {

    after_render: async () => {   
             
            document.getElementById('shipping-form').addEventListener('clicked', async (e) => {
        e.preventDefault();
        if(document.getElementById('add').clicked == true)
        {
           document.location.hash="/add"
        }
        else if(document.getElementById('edit').clicked == true)
        {
           document.location.hash="/edit"
        }
        else if(document.getElementById('delete').clicked == true)
        {
           document.location.hash="/delete"
        }
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
            <li>
              <h1>Menu </h1>
            </li>
            <li>
              <a href="/#/add">
                <input type="button" name="edit" id="edit" value="Agregar producto" class="primary"/>

              </a>
            </li>
            <li>
            <a href="/#/edit">
              <input type="button" name="edit" id="edit" value="Editar producto" class="primary"/>
            </a>
              </li>
            <li>
            <a href="/#/delete">
              <input type="button" name="delete" id="delete" value="Eliminar producto" class="primary"/>
            </a>
             
            
          </ul>
        </form>
      </div>
      `;
    },
  };
export default AdminMenuScreen;