import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getCoins } from "../api/fetchCoins";

export type Coin = {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: null | number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: null | number;
  sparkline_in_7d: { price: number[] };
  symbol: string;
  total_supply: number;
  total_volume: number;
};

type StateType = {
  coins: Coin[];
  loading: boolean;
};

const initialState: StateType = {
  coins: [],
  loading: false,
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoins.fulfilled, (state, action: PayloadAction<Coin[]>) => {
        state.coins = action.payload;
        state.loading = false;
      })
      .addCase(getCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoins.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default coinsSlice.reducer;
