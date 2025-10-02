"use client";

import React, { ReactNode } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const theme = createTheme({});

type props = {
  children: ReactNode;
};

export const GlobalProviders = ({ children }: props) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};
