import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const savedCoins = localStorage.getItem("coinsInPortfel");

const initialState = {
  coinsInPortfel: savedCoins ? JSON.parse(savedCoins) : [],
  isOpen: false,
};

const portfelSlice = createSlice({
  name: "coinsInPortfel",
  initialState,
  reducers: {
    addInPortfel: (
      state: any,
      action: PayloadAction<{ amount: number; coin: any }>,
    ) => {
      const { amount, coin } = action.payload;
      const existing = state.coinsInPortfel.find((item) => item.id === coin.id);
      if (existing) {
        existing.amount = Number(existing.amount) + Number(amount);
      } else {
        state.coinsInPortfel.push({ ...coin, amount: amount });
      }

      localStorage.setItem(
        "coinsInPortfel",
        JSON.stringify(state.coinsInPortfel),
      );
    },
    deleteInPortfel: (state: any, action: any) => {
      state.coinsInPortfel = state.coinsInPortfel.filter(
        (item: any) => item.id !== action.payload,
      );
      localStorage.setItem(
        "coinsInPortfel",
        JSON.stringify(state.coinsInPortfel),
      );
    },
    open: (state: any) => {
      state.isOpen = true;
    },
    close: (state: any) => {
      state.isOpen = false;
    },
  },
});

export const { addInPortfel, deleteInPortfel, open, close } =
  portfelSlice.actions;

export default portfelSlice.reducer;
