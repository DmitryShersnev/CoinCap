import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  buyModalIsOpen: false,
  selectedCoin: null,
};

const buyModalSlice = createSlice({
  name: "addCoinSlice",
  initialState,
  reducers: {
    openBuyModal: (state: any, action: PayloadAction<any>) => {
      state.buyModalIsOpen = true;
      state.selectedCoin = action.payload;
    },
    closeBuyModal: (state: any) => {
      state.buyModalIsOpen = false;
      state.selectedCoin = null;
    },
  },
});

export const { openBuyModal, closeBuyModal } = buyModalSlice.actions;

export default buyModalSlice.reducer;
