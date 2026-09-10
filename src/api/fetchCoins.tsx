import { createAppAsyncThunk } from "../redux/hooks/hooks";
import type { Coin } from "../redux/coinsSlice";

const key: string = import.meta.env.VITE_API_KEY;
const url: string = import.meta.env.VITE_API_URL;

export const getCoins = createAppAsyncThunk<Coin[], void>(
  "coincap/getCoins",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(url, {
        headers: { "x-cg-demo-api-key": key },
      });
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
