import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Coin } from "./coinsSlice";

type StateType = {
  buyModalIsOpen: boolean;
  selectedCoin: Coin | null;
};

const initialState: StateType = {
  buyModalIsOpen: false,
  selectedCoin: null,
};

const buyModalSlice = createSlice({
  name: "addCoinSlice",
  initialState,
  reducers: {
    openBuyModal: (state: StateType, action: PayloadAction<Coin>) => {
      state.buyModalIsOpen = true;
      state.selectedCoin = action.payload;
    },
    closeBuyModal: (state: StateType) => {
      state.buyModalIsOpen = false;
      state.selectedCoin = null;
    },
  },
});

export const { openBuyModal, closeBuyModal } = buyModalSlice.actions;

export default buyModalSlice.reducer;
