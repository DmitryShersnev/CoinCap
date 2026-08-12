import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./coinsSlice";
import portfelReducer from "./portfelSlice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    portfel: portfelReducer,
  },
});
