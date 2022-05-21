import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import { parseRequestUrl } from "./utils.js";
import CartScreen from "./screens/CartScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import AddProductScreen from "./screens/AddProductScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import AdminMenuScreen from "./screens/AdminMenuScreen.js";
import EditProductScreen from "./screens/EditProductScreen.js";
import EditProductScreen2 from "./screens/EditProductScreen2.js";
import DeleteProductScreen from "./screens/DeleteProductScreen.js";
import Footer from "./components/Footer.js";
import LogOutScreen from "./screens/LogOutScreen.js";

const routes ={
    "/": HomeScreen,
    "/product/:id": ProductScreen,
    "/cart/:id": CartScreen,
    "/cart": CartScreen,
    '/shipping': ShippingScreen,
    '/order': PlaceOrderScreen,
    '/login': LoginScreen,
    '/menu' : AdminMenuScreen,
    '/add' : AddProductScreen,
    '/edit': EditProductScreen,
    "/edit/:id": EditProductScreen2,
    '/delete': DeleteProductScreen,
    '/logout': LogOutScreen,

};
const router= async() =>{
    const request= parseRequestUrl();
    const parseUrl= 
    (request.resource ? `/${request.resource}` : '/') + 
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` :  '');
    const screen= routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const footer= document.getElementById('footer-container');
    footer.innerHTML= await Footer.render();

    const main= document.getElementById('main-container');
    main.innerHTML=await screen.render();
    await screen.after_render(); 

};
window.addEventListener('load',router);
window.addEventListener('hashchange', router);

