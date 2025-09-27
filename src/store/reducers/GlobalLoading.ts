import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GlobalLoading = {
  show: boolean;
};

const initialState: GlobalLoading = {
  show: false,
};

const GlobalLoadingSlice = createSlice({
  name: "globalLoading",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.show = true;
    },
    hideLoading: (state) => {
      state.show = false;
    },
  },
});

export const { showLoading, hideLoading } = GlobalLoadingSlice.actions;
export default GlobalLoadingSlice.reducer;
