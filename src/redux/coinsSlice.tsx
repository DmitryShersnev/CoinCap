import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { createAppAsyncThunk } from "./hooks/hooks";

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

export const getCoins = createAppAsyncThunk<Coin[], void>(
  "coincap/getCoins",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true",
        {
          headers: { "x-cg-demo-api-key": "CG-6Pv6zP2kBAgk2WUSeitZ3dD7" },
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      return data;
    } catch (e) {
      const error = e as { message: string };
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

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
