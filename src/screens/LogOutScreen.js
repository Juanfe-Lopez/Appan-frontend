import { clearAdmin } from "../localStorage";
import { hideLoading, showLoading } from "../utils";

const LogOutScreen = {
    render: () => {
        showLoading();
        clearAdmin();
        document.location.hash="/";
        hideLoading();
    }
  }
  export default LogOutScreen;