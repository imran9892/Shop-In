import {
  Button,
  Drawer,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
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
import { deleteUser } from "../util/authApi";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);

  const [showProfile, setShowProfile] = useState(null);
  const openProfile = Boolean(showProfile);

  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn, token: idToken, uid } = auth;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies();

  const profileMenuOpenHandler = (event) => {
    setShowProfile(event.currentTarget);
  };

  const profileMenuCloseHandler = () => {
    setShowProfile(null);
  };

  const deleteAccountHandler = async () => {
    profileMenuCloseHandler();
    if (window.confirm("Are you sure you want to delete this account")) {
      removeCookie("tokenData");
      const response = await deleteUser({ idToken, uid });
      if (!response.status) {
        alert("Something went wrong. Try to delete the account again");
        return;
      }
      console.log("deleted");
      dispatch(cartActions.emptyCart());
      dispatch(authActions.logoutUser());
      navigate("/");
    }
  };

  const toggleDrawer = (open) => {
    setShowCart(open);
  };

  const logoutHandler = () => {
    console.log("logging out");
    profileMenuCloseHandler();
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

        {isLoggedIn && (
          <>
            <Button
              id="profile-button"
              aria-controls={openProfile ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openProfile ? "true" : undefined}
              onClick={profileMenuOpenHandler}
            >
              Profile
            </Button>
            <Menu
              id="profile-menu"
              anchorEl={showProfile}
              open={openProfile}
              onClose={profileMenuCloseHandler}
              aria-labelledby="profile-button"
              //   MenuListProps={{
              //     "aria-labelledby": "profile-button",
              //   }}
            >
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              <MenuItem onClick={deleteAccountHandler}>Delete account</MenuItem>
            </Menu>
          </>
        )}

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
