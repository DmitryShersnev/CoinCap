import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Coin } from "./coinsSlice";

const savedCoins = localStorage.getItem("coinsInPortfel");

export type CoinsInPortfel = Coin & { amount: number };

type StateType = {
  coinsInPortfel: CoinsInPortfel[];
  isOpen: boolean;
};

const initialState: StateType = {
  coinsInPortfel: savedCoins
    ? (JSON.parse(savedCoins) as CoinsInPortfel[])
    : [],
  isOpen: false,
};

const portfelSlice = createSlice({
  name: "coinsInPortfel",
  initialState,
  reducers: {
    addInPortfel: (
      state: StateType,
      action: PayloadAction<{ amount: number; coin: Coin }>,
    ) => {
      const { amount, coin } = action.payload;
      const existing = state.coinsInPortfel.find(
        (item: CoinsInPortfel) => item.id === coin.id,
      );
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
    deleteInPortfel: (state: StateType, action: PayloadAction<string>) => {
      state.coinsInPortfel = state.coinsInPortfel.filter(
        (item: CoinsInPortfel) => item.id !== action.payload,
      );
      localStorage.setItem(
        "coinsInPortfel",
        JSON.stringify(state.coinsInPortfel),
      );
    },
    open: (state: StateType) => {
      state.isOpen = true;
    },
    close: (state: StateType) => {
      state.isOpen = false;
    },
  },
});

export const { addInPortfel, deleteInPortfel, open, close } =
  portfelSlice.actions;

export default portfelSlice.reducer;
