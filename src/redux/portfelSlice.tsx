import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coinsInPortfel: [],
  isOpen: false,
};

const portfelSlice = createSlice({
  name: "coinsInPortfel",
  initialState,
  reducers: {
    addInPortfel: (state: any, action: any) => {
      state.coinsInPortfel.push({ ...action.payload, amount: 1 });
    },
    deleteInPortfel: (state: any, action: any) => {
      state.coinsInPortfel.filter((item: any) => item !== action.payload);
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
