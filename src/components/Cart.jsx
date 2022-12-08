import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <Box width="47vh" padding={3}>
      <Typography variant="h4">Your Cart</Typography>
      <Stack direction="column" gap={2} marginTop={2} marginBottom={3}>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </Stack>
      <Typography variant="h6" textAlign="end">
        Total Price:{" "}
        <Typography variant="span" color="green" fontStyle="italic">
          ${totalPrice.toLocaleString()}
        </Typography>
      </Typography>
      <Stack direction="row" justifyContent="flex-end" gap={2} marginTop={5}>
        <Button variant="outlined" color="error" onClick={onClose}>
          Back
        </Button>
        <Button variant="contained" color="secondary">
          Order
        </Button>
      </Stack>
    </Box>
  );
};

export default Cart;
