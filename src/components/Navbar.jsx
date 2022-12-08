import { Button, Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import classes from "./Navbar.module.css";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { authActions } from "../store/auth-slice";
import { cartActions } from "../store/cart-slice";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies();

  const toggleDrawer = (open) => {
    setShowCart(open);
  };

  const logoutHandler = () => {
    removeCookie("tokenData");
    dispatch(cartActions.emptyCart());
    dispatch(authActions.logoutUser());
    navigate("/");
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      height={32}
      sx={{
        position: "sticky",
        background: "#fff",
        top: 0,
        justifyContent: "space-between",
        zIndex: 2,
      }}
    >
      <Link to="/" className={classes.logo}>
        <img src={logo} alt="logo" height={40} />
        <Typography component="h1">Shop-In</Typography>
      </Link>
      <Stack
        direction="row"
        alignItems="center"
        gap={3}
        color="grey"
        mr={3}
        className={classes.navLink}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          <Button>Home</Button>
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? classes.active : "")}
          end
        >
          <Button>Shop</Button>
        </NavLink>

        {!isLoggedIn && (
          <NavLink
            to="/auth"
            className={({ isActive }) => (isActive ? classes.active : "")}
            end
          >
            <Button>Login</Button>
          </NavLink>
        )}

        {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}

        {isLoggedIn && (
          <>
            <Button
              onClick={() => toggleDrawer(true)}
              sx={{ position: "relative" }}
              className={classes.cart}
            >
              Cart
              <Badge badgeContent={cartQuantity} color="info">
                <ShoppingCartSharpIcon />
              </Badge>
            </Button>
            <Drawer
              anchor="right"
              open={showCart}
              onClose={() => toggleDrawer(false)}
            >
              <Cart onClose={() => toggleDrawer(false)} />
            </Drawer>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Navbar;
