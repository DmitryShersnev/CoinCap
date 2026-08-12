import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  coins: [],
};

export const getCoins = createAsyncThunk(
  "coincap/getCoins",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
        {
          headers: { "x-cg-demo-api-key": "CG-6Pv6zP2kBAgk2WUSeitZ3dD7" },
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoins.fulfilled, (state, action) => {
      state.coins = action.payload;
    });
  },
});

export default coinsSlice.reducer;
