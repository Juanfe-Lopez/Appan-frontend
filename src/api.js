import { apiUrl } from "./config";
import axios from 'axios';

export const getProduct= async (id)=>{

    try{
        const response= await axios({
            url:  `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error (response.data.message);
        }
        return response.data;
    }
    catch(err){
        console.log(err);
        return {error: err.message};
    }


}

export const createProduct = async ({name,info,image,price,cantidad}) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/products`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data:{
        
        name,
        info,
        image,
        price,
        cantidad
      }
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};
export const deleteProduct = async (productId) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/products/${productId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const updateProduct = async ({id,name,info,price,cantidad}) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/products/${id}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      data:{
        name,
        info,
        price,
        cantidad
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};


export const createOrder = async (orderItems,shipping,totalPrice) => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/orders`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'        },
        data: 
        orderItems,
        shipping,
        totalPrice,

      });
      if (response.statusText !== 'Created') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response ? err.response.data.message : err.message };
    }
  };
  export const getOrders = async () => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/orders`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
  };
  export const createAdmin = async ({user,pass}) => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/users`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data:{
          
          user,
          pass
        }
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  };
  export const getAdmin= async ()=>{

    try{
        const response= await axios({
            url:  `${apiUrl}/api/users`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error (response.data.message);
        }
        return response.data;
    }
    catch(err){
        console.log(err);
        return {error: err.message};
    }



}
export const sendMessage= async (body)=>{

  try{
      const response= await axios({
          url:  `${apiUrl}/api/twilio`,
          method: 'POST',
          
          data:{
          
            body
            
          }
      });
      if(response.statusText !== 'OK'){
          throw new Error (response.data.message);
      }
      return response.data;
  }
  catch(err){
      console.log(err);
      return {error: err.message};
  }



}
export const uploadProductImage = async (formData) => {
  try {
    
    const response = await axios({
      url: `${apiUrl}/api/uploads`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    } else {
      return response.data;
    }
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

