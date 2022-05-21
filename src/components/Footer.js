import { clearAdmin, getAdminInfo, getUserInfo } from '../localStorage';
import { parseRequestUrl } from '../utils';

const Footer = {
  render: () => {
    const { usuario } = getAdminInfo();
    return ` 
   
    <div>
    ${usuario
    ? `<a href="/#/menu">Admin menu</a>` 
    :`<a href="/#/login">login</a>`
    }
</div>
<div> 
${usuario
  ?  `<a href="/#/logout">LogOut</a>`
  :`<a href="https://api.whatsapp.com/send?phone=573224164333">Whatsapp</a> `
}
    
</div>`;
  }
}
export default Footer;