import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserAuthApi } from "../services/UserAuthApi";
import userReducer from "../features/UserSlice";
import authReducer from "../features/AuthSlice";
export const store = configureStore({
  reducer: {
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware().concat(UserAuthApi.middleware),
});
setupListeners(store.dispatch);
