import { createProduct } from '../api';
import axios from 'axios';
import { getAdminInfo } from '../localStorage';


const EditProductScreen = {

    render: async()=>{
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
        <h1>Escoja el producto que desea editar </h1>
        <ul class="products">
        ${products.map((product)=>` 
            <li>
            <div class="product">
                            <a href="/#/edit/${product._id}">
                                <img src="${product.image}" alt="${product.name}"/>
                            </a>
                        <div class="product-name">
                            <a href="/#/edit/${product._id}">
                                ${product.name}
                            </a>
                        </div>
                        <div class="product-info">
                            
                                ${product.info}
                            
                        </div>
                        <div class="product-price">
                            
                        $${product.price}
                        </div>
                        </div>
            </li>
        `).join('\n')}
        `
    }
}
export default EditProductScreen;