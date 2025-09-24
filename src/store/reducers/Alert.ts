import { AlertTypes } from "@/constants/Enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

type Alert = {
  type: AlertTypes;
  text: ReactNode;
  show: boolean;
};

const initialState: Alert = {
  type: AlertTypes.Success,
  text: "",
  show: true,
};

const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Omit<Alert, "show">>) => {
      const conf = action.payload;

      state.type = conf.type;
      state.text = conf.text;
      state.show = true;
    },
    hiddenAlert: (state) => {
      state.text = "";
      state.show = false;
    },
  },
});

export const { showAlert, hiddenAlert } = AlertSlice.actions;
export default AlertSlice.reducer;
