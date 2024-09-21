import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};
export const AuthSlice = createSlice({
  name: "Auth_token",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload.token;
    },
    unsetUserToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});
export const { setUserToken, unsetUserToken } = AuthSlice.actions;
export default AuthSlice.reducer;
