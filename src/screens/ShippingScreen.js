import { getShipping, setShipping, cleanCart } from '../localStorage.js';
import { hideLoading, showLoading, showMessage } from '../utils.js';

const ShippingScreen = {
  after_render: () => {
    document
      .getElementById('shipping-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        if(document.getElementById("address").value==="" || 
            document.getElementById("city").value==="" ||
            document.getElementById("postalCode").value==="" ||
            document.getElementById("country").value==="" ){
              showMessage("Por favor ingrese No deje ningun espacio vació");
              hideLoading();
            }
          else if(document.getElementById("postalCode").value<0){
            showMessage("Por favor ingrese un valor correcto para el telefono ");
            hideLoading();
          }

          else{

          setShipping({
            address: document.getElementById('address').value,
            name: document.getElementById('city').value,
            phone: document.getElementById('postalCode').value,
            comment: document.getElementById('country').value,
          });
          hideLoading();
          document.location.hash = '/order';
      }
      });
  },
  render: () => {
    
    const { address, name, phone, comment } = getShipping();
    return `
    <div class="form-container">
      <form id="shipping-form">
        <ul class="form-items">
          <li>
          <a href="/#/cart"> <h4>Volver</h4></a>

            <h1>Shipping</h1>
          </li>
          <li>
            <label for="address">Direccion</label>
            <input type="text" name="address" id="address" value="${address}" />
          </li>
          <li>
            <label for="city">Nombre cliente</label>
            <input type="text" name="name" id="city" value="${name}" />
          </li>
          <li>
            <label for="postalCode">Telefono</label>
            <input type="number" name="phone" id="postalCode" value="${phone}" />
          </li>
          <li>
            <label for="country">Comentarios:</label>
            <input type="text" name="comment" id="country" value="${comment}" />
          </li>
          <li>
            <button type="submit" class="primary">Continue</button>
          </li>        
        </ul>
      </form>
    </div>
    `;
  },
};
export default ShippingScreen;