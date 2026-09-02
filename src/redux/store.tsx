import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./coinsSlice";
import portfelReducer from "./portfelSlice";
import buyModalReducer from "./buyModalSlice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    portfel: portfelReducer,
    buyModal: buyModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
