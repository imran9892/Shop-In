import { cartActions } from "../store/cart-slice";
import { getCartData, sendCartData } from "./cartApi";

export const fetchCartData = ({ uid, token }) => {
  return async (dispatch) => {
    const fetchData = await getCartData({ uid, token });
    if (!fetchData.status) {
      return fetchData.error;
    }
    if (fetchData.data) {
      dispatch(cartActions.replaceCart(fetchData.data));
    }
  };
};

export const sendCart = ({ cart, uid, token }) => {
  return async (dispatch) => {
    const sendData = await sendCartData({ cart, uid, token });
    if (!sendData.status) {
      if (sendData.error === "Permission denied") {
        // dispatch(authActions.logoutUser());
        window.location.reload();
      }
    }
    // console.log(sendData.data);
  };
};
