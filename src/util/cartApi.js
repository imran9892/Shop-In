export const sendCartData = async ({ cart, uid, token }) => {
  const responseData = {
    data: null,
    status: false,
    error: null,
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_DATABASE}/users/${uid}/cart.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify({
          products: cart.products,
          totalQuantity: cart.totalQuantity,
          totalPrice: cart.totalPrice,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      responseData.error = data.error;
      return responseData;
    }
    responseData.status = true;
    responseData.data = data;
    return responseData;
  } catch (err) {
    responseData.error = err;
    return responseData;
  }
};

export const getCartData = async ({ uid, token }) => {
  const responseData = {
    data: null,
    status: false,
    error: null,
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_DATABASE}/users/${uid}/cart.json?auth=${token}`
    );
    const cartData = await response.json();
    if (!response.ok) {
      responseData.error = cartData.error;
      return responseData;
    }
    responseData.data = cartData;
    responseData.status = true;
    return responseData;
  } catch (err) {
    responseData.error = err;
    return responseData;
  }
};
