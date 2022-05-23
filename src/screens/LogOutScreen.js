import { clearAdmin } from "../localStorage.js";
import { hideLoading, showLoading } from "../utils.js";

const LogOutScreen = {
    render: () => {
        showLoading();
        clearAdmin();
        document.location.hash="/";
        hideLoading();
    }
  }
  export default LogOutScreen;