import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart: (state, action) => {
      state.products = action.payload.products;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
    },
    emptyCart: (state, action) => {
      state.products = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    addItemToCart: (state, action) => {
      state.changed = true;
      const newItem = action.payload;
      const existingItem = state.products.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.products.push({
          ...newItem,
          quantity: 1,
        });
      }
      state.totalPrice += newItem.price;
      state.totalQuantity++;
    },
    removeItemFromCart: (state, action) => {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.products.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.products = state.products.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
      state.totalPrice -= existingItem.price;
      state.totalQuantity--;
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
