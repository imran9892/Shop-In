import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: null,
  uid: null,
  isLoggedIn: false,
  //   refresh: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    // addCookieData: (state, action) => {
    //   state.token = action.payload.idToken;
    //   state.uid = action.payload.localId;
    //   state.isLoggedIn = !!state.token;
    //   state.refresh = true;
    // },
    loginUser: (state, action) => {
      state.token = action.payload.idToken;
      state.uid = action.payload.localId;
      state.isLoggedIn = !!state.token;
    },
    logoutUser: (state, action) => {
      state.token = null;
      state.uid = null;
      state.isLoggedIn = !!state.token;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
