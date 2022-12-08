import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./pages/RootLayout";
import ShopPage, { loader as productsLoader } from "./pages/ShopPage";
import { useCookies } from "react-cookie";
import { authActions } from "./store/auth-slice";
import ProductDetailPage, {
  loader as productLoader,
} from "./pages/ProductDetailPage";
import { fetchCartData, sendCart } from "./util/cartActions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage />, loader: productsLoader },
      {
        path: "/shop/:productId",
        element: <ProductDetailPage />,
        loader: productLoader,
      },
      {
        path: "auth",
        element: <LoginPage />,
      },
      { path: "/*", element: <Navigate to="/" /> },
    ],
  },
]);

function App() {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const { uid, token, isLoggedIn } = auth;
  const [cookies] = useCookies();
  const dispatch = useDispatch();

  const { changed } = cart;
  const { tokenData } = cookies;

  useEffect(() => {
    if (isLoggedIn && changed) {
      dispatch(sendCart({ cart, uid, token }));
    }
  }, [changed, isLoggedIn, dispatch, cart, uid, token]);

  useEffect(() => {
    if (!isLoggedIn && tokenData) {
      dispatch(authActions.loginUser(tokenData));
    }
  }, [isLoggedIn, tokenData, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartData({ uid, token }));
    }
  }, [isLoggedIn, uid, token, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
