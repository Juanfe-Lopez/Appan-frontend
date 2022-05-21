export const getCartItems=()=>{
    const cartItems= localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

    return cartItems;
};
export const setCartItems= (cartItems)=>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const getShipping = () => {
  const shipping = localStorage.getItem('shipping')
    ? JSON.parse(localStorage.getItem('shipping'))
    : {
        address: '',
        name: '',
        phone: '',
        comment: '',
      };
  return shipping;
};
export const setShipping = ({
  address = '',
  name = '',
  phone = '',
  comment = '',
}) => {
  localStorage.setItem(
    'shipping',
    JSON.stringify({ address, name, phone, comment })
  );
};
export const cleanCart = () => {
    localStorage.removeItem('cartItems');
  };
  export const setProductInfo = ({
    id = '',
    name = '',
    info = '',
    price = 0,
    cantidad = 0,
  }) => {
    localStorage.setItem(
      'productInfo',
      JSON.stringify({
        id,
        name,
        info,
        price,
        cantidad,
      })
    );
  };
  export const setAdminInfo = ({

    usuario='',
    password='',


  })=> {
    localStorage.setItem('adminInfo',
    JSON.stringify({
      usuario,
      password})
    )

  };
  export const getAdminInfo=()=>{
    return localStorage.getItem('adminInfo')?
    JSON.parse(localStorage.getItem('adminInfo')) 
    : {usuario: '', password:''}
  };
  export const clearAdmin = () => {
    localStorage.removeItem('adminInfo');
  };